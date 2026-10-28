"use client";

import { FiPlus, FiMinus, FiCrosshair } from "react-icons/fi";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import type { CaseMarker } from "../hooks/useCaseMarkers";

const pinIcon = L.divIcon({
  className: "",
  html: `<svg width="28" height="36" viewBox="0 0 24 32" xmlns="http://www.w3.org/2000/svg"><path d="M12 0C5.4 0 0 5.4 0 12c0 9 12 20 12 20s12-11 12-20C24 5.4 18.6 0 12 0z" style="fill:var(--primary);stroke:rgba(0,0,0,0.6);stroke-width:1.5"/><circle cx="12" cy="12" r="4.5" fill="rgba(0,0,0,0.65)"/></svg>`,
  iconSize: [28, 36],
  iconAnchor: [14, 36],
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

type LeafletMapProps = {
  markers?: CaseMarker[];
};

export default function LeafletMap({ markers = [] }: LeafletMapProps) {
  return (
    <MapContainer
      center={[20, 0]}
      zoom={2}
      minZoom={2}
      maxBounds={[
        [-85, -180],
        [85, 180],
      ]}
      maxBoundsViscosity={1.0}
      zoomControl={false}
      attributionControl={false}
      className="h-full w-full bg-background"
    >
      <TileLayer
        url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
        className="filter-[invert(1)_hue-rotate(180deg)_brightness(0.9)_contrast(0.9)]"
        noWrap
      />
      {markers.map((marker) => (
        <Marker key={marker.id} position={marker.position} icon={pinIcon} />
      ))}
      <MapControls />
    </MapContainer>
  );
}