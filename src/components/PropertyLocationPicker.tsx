import { useState } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

type Coordinates = {
  latitude: number;
  longitude: number;
};

type PropertyLocationPickerProps = {
  value?: Coordinates | null;
  onChange: (coordinates: Coordinates) => void;
};

const defaultPosition: [number, number] = [6.5244, 3.3792];

const propertyMarker = L.divIcon({
  className: "",
  html: `
    <div style="
      width: 34px;
      height: 34px;
      background: #d6ad55;
      border: 3px solid white;
      border-radius: 50% 50% 50% 0;
      transform: rotate(-45deg);
      box-shadow: 0 2px 8px rgba(0,0,0,.35);
    "></div>
  `,
  iconSize: [34, 34],
  iconAnchor: [17, 34],
});

function MapClickHandler({
  onSelect,
}: {
  onSelect: (position: Coordinates) => void;
}) {
  useMapEvents({
    click(event) {
      onSelect({
        latitude: event.latlng.lat,
        longitude: event.latlng.lng,
      });
    },
  });

  return null;
}

function MapPositionUpdater({ position }: { position: [number, number] }) {
  const map = useMapEvents({});

  // Keep the map centred when the selected location changes.
  map.setView(position, map.getZoom());

  return null;
}

function PropertyLocationPicker({
  value,
  onChange,
}: PropertyLocationPickerProps) {
  const [position, setPosition] = useState<[number, number]>(
    value ? [value.latitude, value.longitude] : defaultPosition,
  );

  const [hasSelectedLocation, setHasSelectedLocation] = useState(
    Boolean(value),
  );

  function updatePosition(latitude: number, longitude: number) {
    const nextPosition: [number, number] = [latitude, longitude];

    setPosition(nextPosition);
    setHasSelectedLocation(true);

    onChange({ latitude, longitude });
  }

  return (
    <div className="space-y-4">
      <div>
        <h3 className="font-semibold text-(--dh-white)">
          Select Property Location
        </h3>

        <p className="mt-1 text-sm leading-6 text-(--dh-muted)">
          Click anywhere on the map to place a marker at the property's
          location. You can also drag the marker to adjust it.
        </p>
      </div>

      <div className="overflow-hidden rounded-2xl border border-(--dh-border)">
        <MapContainer
          center={position}
          zoom={12}
          scrollWheelZoom
          className="h-90 w-full"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <MapClickHandler
            onSelect={(coordinates) =>
              updatePosition(coordinates.latitude, coordinates.longitude)
            }
          />

          <MapPositionUpdater position={position} />

          {hasSelectedLocation && (
            <Marker
              position={position}
              icon={propertyMarker}
              draggable
              eventHandlers={{
                dragend(event) {
                  const marker = event.target;
                  const coordinates = marker.getLatLng();

                  updatePosition(coordinates.lat, coordinates.lng);
                },
              }}
            />
          )}
        </MapContainer>
      </div>

      <div className="rounded-xl border border-(--dh-border) bg-(--dh-bg-secondary) p-4">
        {hasSelectedLocation ? (
          <>
            <p className="text-sm font-medium text-(--dh-success)">
              Location selected
            </p>

            <div className="mt-2 grid grid-cols-1 gap-3 text-sm sm:grid-cols-2">
              <div>
                <p className="text-(--dh-muted)">Latitude</p>
                <p className="mt-1 font-medium text-(--dh-white)">
                  {position[0].toFixed(6)}
                </p>
              </div>

              <div>
                <p className="text-(--dh-muted)">Longitude</p>
                <p className="mt-1 font-medium text-(--dh-white)">
                  {position[1].toFixed(6)}
                </p>
              </div>
            </div>
          </>
        ) : (
          <p className="text-sm text-(--dh-muted)">
            No location selected yet. Click on the map to choose the property
            location.
          </p>
        )}
      </div>
    </div>
  );
}

export default PropertyLocationPicker;
