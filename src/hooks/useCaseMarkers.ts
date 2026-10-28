"use client";

import { useEffect, useMemo, useState } from "react";
import { useGetCasesQuery } from "../state/redux/api/cases";

export type CaseMarker = {
  id: string;
  position: [number, number];
};

type Coords = [number, number] | null;
type GeoCache = Record<string, Coords>;

const CACHE_KEY = "bxc_geocode_cache_v1";
const REQUEST_GAP_MS = 1100; // Nominatim allows max 1 request/second

const normalize = (value: string) => value.trim().toLowerCase();

function readCache(): GeoCache {
  try {
    return JSON.parse(localStorage.getItem(CACHE_KEY) || "{}");
  } catch {
    return {};
  }
}

function writeCache(cache: GeoCache) {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify(cache));
  } catch {
    // storage unavailable, ignore
  }
}

async function searchPlace(query: string): Promise<Coords> {
  const res = await fetch(
    `https://nominatim.openstreetmap.org/search?format=json&limit=1&q=${encodeURIComponent(query)}`,
  );
  if (!res.ok) throw new Error(`Geocoding failed: ${res.status}`);
  const results = await res.json();
  if (!Array.isArray(results) || results.length === 0) return null;
  return [parseFloat(results[0].lat), parseFloat(results[0].lon)];
}

async function geocode(location: string): Promise<Coords> {
  const full = await searchPlace(location);
  if (full) return full;

  // Fallback: use the last part, e.g. "Alpine Region, Switzerland" -> "Switzerland"
  const parts = location.split(",").map((p) => p.trim());
  const last = parts[parts.length - 1];
  if (parts.length > 1 && last) {
    await new Promise((r) => setTimeout(r, REQUEST_GAP_MS));
    return searchPlace(last);
  }
  return null;
}

export function useCaseMarkers(): CaseMarker[] {
  const { data } = useGetCasesQuery({ limit: 50 });
  const [coords, setCoords] = useState<GeoCache>({});

  const locations = useMemo(() => {
    const map = new Map<string, string>();
    (data?.items ?? []).forEach((item) => {
      if (item.location && item.location.trim()) {
        map.set(normalize(item.location), item.location.trim());
      }
    });
    return map;
  }, [data]);

  useEffect(() => {
    if (locations.size === 0) return;

    let cancelled = false;
    const cache = readCache();
    setCoords((prev) => ({ ...cache, ...prev }));

    const missing = [...locations.entries()].filter(
      ([key]) => !(key in cache),
    );

    (async () => {
      for (const [key, original] of missing) {
        if (cancelled) return;
        try {
          const result = await geocode(original);
          if (cancelled) return;
          cache[key] = result;
          writeCache(cache);
          setCoords((prev) => ({ ...prev, [key]: result }));
        } catch {
          return; // network/rate-limit error: stop, retry on next visit
        }
        await new Promise((r) => setTimeout(r, REQUEST_GAP_MS));
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [locations]);

  return useMemo(() => {
    const markers: CaseMarker[] = [];
    (data?.items ?? []).forEach((item) => {
      if (!item.location) return;
      const position = coords[normalize(item.location)];
      if (position) markers.push({ id: item.id, position });
    });
    return markers;
  }, [data, coords]);
}