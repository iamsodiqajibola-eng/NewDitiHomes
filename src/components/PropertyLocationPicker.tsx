import { useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  useMapEvents,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

type PropertyLocationPickerProps = {
  latitude: number | null;
  longitude: number | null;
  onLocationSelect: (latitude: number, longitude: number) => void;
};

const markerIcon = L.icon({
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

function MapClickHandler({
  onLocationSelect,
}: {
  onLocationSelect: (latitude: number, longitude: number) => void;
}) {
  useMapEvents({
    click(event) {
      onLocationSelect(event.latlng.lat, event.latlng.lng);
    },
  });

  return null;
}

function MapUpdater({
  latitude,
  longitude,
}: {
  latitude: number | null;
  longitude: number | null;
}) {
  const map = useMap();

  useEffect(() => {
    if (latitude !== null && longitude !== null) {
      map.flyTo([latitude, longitude], 16);
    }
  }, [latitude, longitude, map]);

  return null;
}

export default function PropertyLocationPicker({
  latitude,
  longitude,
  onLocationSelect,
}: PropertyLocationPickerProps) {
  const defaultCenter: [number, number] = [6.5244, 3.3792];

  return (
    <div className="space-y-3">
      <div className="overflow-hidden rounded-xl border border-(--dh-border)">
        <MapContainer
          center={
            latitude !== null && longitude !== null
              ? [latitude, longitude]
              : defaultCenter
          }
          zoom={12}
          scrollWheelZoom
          style={{ height: "380px", width: "100%" }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <MapClickHandler onLocationSelect={onLocationSelect} />

          <MapUpdater latitude={latitude} longitude={longitude} />

          {latitude !== null && longitude !== null && (
            <Marker position={[latitude, longitude]} icon={markerIcon} />
          )}
        </MapContainer>
      </div>

      <p className="text-sm text-(--dh-muted)">
        Click on the map to mark the property's location. You can adjust the
        marker by clicking another position.
      </p>

      {latitude !== null && longitude !== null && (
        <p className="text-xs text-(--dh-muted)">
          Location selected: {latitude.toFixed(6)}, {longitude.toFixed(6)}
        </p>
      )}
    </div>
  );
}
