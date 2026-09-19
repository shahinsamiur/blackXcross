"use client";

import { FiPlus, FiMinus, FiCrosshair } from "react-icons/fi";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { mapMarkers } from "../_mock/blackxcross";

const pinIcon = L.divIcon({
  className: "",
  html: `<div style="width:14px;height:14px;border-radius:9999px;background:var(--primary);box-shadow:0 0 6px var(--primary);border:2px solid rgba(0,0,0,0.6)"></div>`,
  iconSize: [14, 14],
  iconAnchor: [7, 7],
});

function MapControls() {
  const map = useMap();

  return (
    <div className="absolute bottom-3 left-3 z-1000 flex flex-col gap-1.5">
      <button
        type="button"
        aria-label="Zoom in"
        onClick={() => map.zoomIn()}
        className="flex h-7 w-7 items-center justify-center rounded-md border border-border bg-card text-foreground/80 hover:text-primary"
      >
        <FiPlus size={14} />
      </button>
      <button
        type="button"
        aria-label="Zoom out"
        onClick={() => map.zoomOut()}
        className="flex h-7 w-7 items-center justify-center rounded-md border border-border bg-card text-foreground/80 hover:text-primary"
      >
        <FiMinus size={14} />
      </button>
      <button
        type="button"
        aria-label="Locate"
        onClick={() => map.setView([20, 0], 2)}
        className="flex h-7 w-7 items-center justify-center rounded-md border border-border bg-card text-foreground/80 hover:text-primary"
      >
        <FiCrosshair size={14} />
      </button>
    </div>
  );
}

function percentToLatLng(top: string, left: string): [number, number] {
  const t = parseFloat(top) / 100;
  const l = parseFloat(left) / 100;
  const lat = 85 - t * 170;
  const lng = -180 + l * 360;
  return [lat, lng];
}

export default function LeafletMap() {
  return (
    <MapContainer
      center={[20, 0]}
      zoom={2}
      zoomControl={false}
      attributionControl={false}
      className="h-full w-full bg-background"
    >
      <TileLayer url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png" />
      {mapMarkers.map((marker) => (
        <Marker
          key={marker.id}
          position={percentToLatLng(marker.top, marker.left)}
          icon={pinIcon}
        />
      ))}
      <MapControls />
    </MapContainer>
  );
}
