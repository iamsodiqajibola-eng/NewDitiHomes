import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { useEffect } from "react";
import L from "leaflet";
import { Link } from "react-router-dom";

import type { Property } from "../data/properties";

type PropertyMapProps = {
  properties: Property[];
  height?: string;
};

const defaultPosition: [number, number] = [6.5244, 3.3792];

const propertyIcon = L.divIcon({
  className: "",
  html: `
    <div style="
      background: #D6AD55;
      color: #111315;
      border: 2px solid white;
      border-radius: 999px;
      padding: 7px 10px;
      font-size: 12px;
      font-weight: 700;
      white-space: nowrap;
      box-shadow: 0 3px 10px rgba(0,0,0,.25);
    ">Diti</div>
  `,
  iconSize: [48, 34],
  iconAnchor: [24, 17],
});

// Automatically adjusts the map to show available properties.
function MapViewController({ positions }: { positions: [number, number][] }) {
  const map = useMap();

  useEffect(() => {
    if (positions.length === 0) {
      map.setView(defaultPosition, 11);
      return;
    }

    if (positions.length === 1) {
      map.setView(positions[0], 12);
      return;
    }

    const uniquePositions = new Set(
      positions.map(([latitude, longitude]) => `${latitude},${longitude}`),
    );

    if (uniquePositions.size === 1) {
      map.setView(positions[0], 12);
      return;
    }

    map.fitBounds(positions, {
      padding: [40, 40],
      maxZoom: 12,
    });
  }, [map, positions]);

  return null;
}

function PropertyMap({ properties, height = "520px" }: PropertyMapProps) {
  const mappedProperties = properties.filter(
    (property) =>
      typeof property.latitude === "number" &&
      typeof property.longitude === "number" &&
      Number.isFinite(property.latitude) &&
      Number.isFinite(property.longitude),
  );

  // Round public coordinates to avoid revealing exact property locations.
  const publicPositions: [number, number][] = mappedProperties.map(
    (property) => [
      Number(property.latitude!.toFixed(2)),
      Number(property.longitude!.toFixed(2)),
    ],
  );

  return (
    <div
      className="relative w-full overflow-hidden rounded-2xl border border-(--dh-border)"
      style={{ height }}
    >
      <MapContainer
        center={defaultPosition}
        zoom={11}
        scrollWheelZoom
        className="h-full w-full"
      >
        <MapViewController positions={publicPositions} />

        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {mappedProperties.map((property, index) => (
          <Marker
            key={property.id}
            position={publicPositions[index]}
            icon={propertyIcon}
          >
            <Popup>
              <div className="min-w-44">
                <p className="font-semibold">{property.title}</p>

                <p className="mt-1 text-sm">Approximate property area</p>

                <p className="mt-2 font-bold">{property.price}</p>

                <Link
                  to={`/properties/${property.id}`}
                  className="mt-3 inline-block text-sm font-semibold"
                >
                  View property →
                </Link>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      <div className="absolute left-4 top-4 z-1000 rounded-xl border border-(--dh-border) bg-(--dh-surface) px-4 py-3 shadow-lg">
        <p className="text-xs text-(--dh-muted)">Properties on map</p>

        <p className="text-lg font-bold text-(--dh-white)">
          {mappedProperties.length}
        </p>
      </div>

      {mappedProperties.length === 0 && (
        <div className="absolute bottom-4 left-4 right-4 z-1000 rounded-xl border border-(--dh-border) bg-(--dh-surface) p-4 shadow-lg">
          <p className="text-sm font-semibold text-(--dh-white)">
            No mapped properties yet
          </p>

          <p className="mt-1 text-xs text-(--dh-muted)">
            Properties will appear here once location coordinates are available.
          </p>
        </div>
      )}
    </div>
  );
}

export default PropertyMap;
