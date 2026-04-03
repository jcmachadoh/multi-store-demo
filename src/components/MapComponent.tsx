// src/components/MapComponent.tsx
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

// 1. Importamos nuestra interfaz de Coordenadas
import type { Coordinates } from '../interfaces/types';

// Arreglo para iconos de Leaflet en producción
const DefaultIcon = L.icon({ 
  iconUrl: icon, 
  shadowUrl: iconShadow, 
  iconSize: [25,41], 
  iconAnchor: [12,41] 
});
L.Marker.prototype.options.icon = DefaultIcon;

// 2. Le decimos a TypeScript qué datos (props) recibe este componente
interface MapComponentProps {
  coords?: Coordinates; // Es opcional (?) por si los datos aún están cargando
  address?: string;
}

export default function MapComponent({ coords, address }: MapComponentProps) {
  if (!coords) return <div className="h-60 bg-gray-200 animate-pulse rounded-lg">Loading Map...</div>;

  // 3. Leaflet exige que la posición sea estrictamente un arreglo de dos números
  const position: [number, number] = [coords.lat, coords.lng];

  return (
    <div className="h-60 md:h-80 w-full rounded-lg overflow-hidden shadow-inner border border-gray-200 dark:border-gray-700">
      <MapContainer center={position} zoom={13} scrollWheelZoom={false} className="h-full w-full">
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position}>
          <Popup>{address}</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}