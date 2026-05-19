"use client";

import { useEffect, useMemo, useRef } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Polyline,
  CircleMarker,
  useMap
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import type { LifeEvent } from "@/lib/types";
import { interpolatePosition } from "@/lib/utils";

interface MapViewProps {
  events: LifeEvent[];
  currentMs: number;
  currentIndex: number;
  showHeatmap: boolean;
  onSelectEvent: (index: number) => void;
}

/** Custom event marker built from a div icon (CSS-styled). */
function eventIcon(type: LifeEvent["type"], active: boolean) {
  return L.divIcon({
    className: `timmie-marker ${type}`,
    html: `<div class="dot ${active ? "active" : ""}" aria-hidden="true"></div>`,
    iconSize: [14, 14],
    iconAnchor: [7, 7]
  });
}

const whaleIcon = L.divIcon({
  className: "whale-position",
  html: `<div class="ring" aria-hidden="true"></div>`,
  iconSize: [28, 28],
  iconAnchor: [14, 14]
});

/** Smoothly fly the map to the active position. */
function MapFollower({
  position,
  enabled
}: {
  position: [number, number];
  enabled: boolean;
}) {
  const map = useMap();
  const lastPos = useRef<string>("");

  useEffect(() => {
    if (!enabled) return;
    const key = position.join(",");
    if (key === lastPos.current) return;
    lastPos.current = key;
    map.flyTo(position, map.getZoom(), { duration: 0.8, easeLinearity: 0.4 });
  }, [position, enabled, map]);

  return null;
}

/** Force Leaflet to recompute layout when the parent resizes. */
function MapResizeHandler() {
  const map = useMap();
  useEffect(() => {
    const handler = () => map.invalidateSize();
    window.addEventListener("resize", handler);
    // Initial fix in case the map was created before its container had size.
    const t = setTimeout(handler, 100);
    return () => {
      window.removeEventListener("resize", handler);
      clearTimeout(t);
    };
  }, [map]);
  return null;
}

export default function MapView({
  events,
  currentMs,
  currentIndex,
  showHeatmap,
  onSelectEvent
}: MapViewProps) {
  const positions = useMemo<[number, number][]>(
    () => events.map((e) => e.coordinates),
    [events]
  );

  const whalePos = useMemo<[number, number]>(
    () => interpolatePosition(events, currentMs),
    [events, currentMs]
  );

  // Bounds for the initial view.
  const bounds = useMemo<L.LatLngBoundsExpression>(() => {
    const lats = positions.map((p) => p[0]);
    const lons = positions.map((p) => p[1]);
    return [
      [Math.min(...lats) - 4, Math.min(...lons) - 4],
      [Math.max(...lats) + 4, Math.max(...lons) + 4]
    ];
  }, [positions]);

  return (
    <MapContainer
      bounds={bounds}
      scrollWheelZoom
      worldCopyJump
      zoomControl
      className="h-full w-full"
      attributionControl
    >
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/">OSM</a> &copy; <a href="https://carto.com/">CARTO</a>'
        subdomains={["a", "b", "c", "d"]}
        maxZoom={18}
      />
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/dark_only_labels/{z}/{x}/{y}{r}.png"
        subdomains={["a", "b", "c", "d"]}
        maxZoom={18}
        opacity={0.9}
      />

      {/* Full route polyline (faded) */}
      <Polyline
        positions={positions}
        pathOptions={{
          color: "#1f9bff",
          weight: 1.5,
          opacity: 0.35,
          dashArray: "2 6",
          lineCap: "round"
        }}
      />

      {/* Travelled portion (solid) up to current event */}
      <Polyline
        positions={[
          ...positions.slice(0, currentIndex + 1),
          interpolatePosition(events, currentMs)
        ]}
        pathOptions={{
          color: "#4fb6ff",
          weight: 2.5,
          opacity: 0.9,
          lineCap: "round"
        }}
      />

      {/* Heatmap of activity (CircleMarkers sized by significance) */}
      {showHeatmap &&
        events.map((e, i) => {
          const intensity =
            e.type === "feeding"
              ? 1
              : e.type === "social"
                ? 0.85
                : e.type === "threat"
                  ? 0.9
                  : 0.5;
          return (
            <CircleMarker
              key={`heat-${e.id}`}
              center={e.coordinates}
              radius={10 + intensity * 18}
              pathOptions={{
                color: "transparent",
                fillColor:
                  e.type === "threat"
                    ? "#ff5470"
                    : e.type === "feeding"
                      ? "#ffc857"
                      : e.type === "social"
                        ? "#c084fc"
                        : "#1f9bff",
                fillOpacity: 0.12 + intensity * 0.1
              }}
              interactive={false}
            />
          );
        })}

      {/* Event markers */}
      {events.map((e, i) => (
        <Marker
          key={e.id}
          position={e.coordinates}
          icon={eventIcon(e.type, i === currentIndex)}
          eventHandlers={{ click: () => onSelectEvent(i) }}
        />
      ))}

      {/* Animated whale current-position */}
      <Marker position={whalePos} icon={whaleIcon} interactive={false} />

      <MapFollower position={whalePos} enabled />
      <MapResizeHandler />
    </MapContainer>
  );
}
