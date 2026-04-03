// src/components/MapComponent.jsx
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
// Arreglo para iconos de Leaflet en produccion
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
let DefaultIcon = L.icon({ iconUrl: icon, shadowUrl: iconShadow, iconSize: [25,41], iconAnchor: [12,41] });
L.Marker.prototype.options.icon = DefaultIcon;

export default function MapComponent({ coords, address }) {
  if (!coords) return <div className="h-60 bg-gray-200 animate-pulse rounded-lg">Loading Map...</div>;

  return (
    <div className="h-60 md:h-80 w-full rounded-lg overflow-hidden shadow-inner border border-gray-200 dark:border-gray-700">
      <MapContainer center={[coords.lat, coords.lng]} zoom={13} scrollWheelZoom={false} className="h-full w-full">
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[coords.lat, coords.lng]}>
          <Popup>{address}</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}