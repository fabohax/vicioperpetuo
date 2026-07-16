import React, { useEffect, useMemo, useState } from 'react';
import L from 'leaflet';
import { MapContainer, Marker, TileLayer, useMap, useMapEvents } from 'react-leaflet';

const DEFAULT_CENTER = [-12.0464, -77.0428];

const pinIcon = L.divIcon({
  className: '',
  html: '<div class="delivery-map-pin"></div>',
  iconSize: [28, 28],
  iconAnchor: [14, 28],
});

const ClickMarker = ({ value, onSelect }) => {
  useMapEvents({
    click: (event) => {
      onSelect(event.latlng.lat, event.latlng.lng);
    },
  });

  if (!value.lat || !value.lng) return null;

  return <Marker position={[value.lat, value.lng]} icon={pinIcon} />;
};

const RecenterMap = ({ center, hasPin }) => {
  const map = useMap();

  useEffect(() => {
    map.setView(center, hasPin ? 16 : 12);
  }, [center, hasPin, map]);

  return null;
};

const DeliveryLocationPicker = ({ value, onChange, disabled }) => {
  const [query, setQuery] = useState(value.address || '');
  const [results, setResults] = useState([]);
  const [searching, setSearching] = useState(false);
  const [message, setMessage] = useState('');

  const center = useMemo(() => {
    if (value.lat && value.lng) return [value.lat, value.lng];
    return DEFAULT_CENTER;
  }, [value.lat, value.lng]);

  const updateLocation = (nextValue) => {
    onChange({
      address: value.address,
      lat: value.lat,
      lng: value.lng,
      placeId: value.placeId,
      ...nextValue,
    });
  };

  const searchLocation = async () => {
    const trimmedQuery = query.trim();
    if (!trimmedQuery) {
      setMessage('Escribe una direccion para buscar.');
      return;
    }

    setSearching(true);
    setMessage('');

    try {
      const params = new URLSearchParams({
        q: trimmedQuery,
        format: 'json',
        addressdetails: '1',
        limit: '5',
        countrycodes: 'pe',
      });
      const response = await fetch(`https://nominatim.openstreetmap.org/search?${params.toString()}`);
      const data = await response.json();
      setResults(Array.isArray(data) ? data : []);
      if (!data?.length) setMessage('No encontramos resultados. Prueba con distrito o referencia.');
    } catch (error) {
      console.error('Error searching delivery location:', error);
      setMessage('No pudimos buscar la direccion. Intentalo otra vez.');
    } finally {
      setSearching(false);
    }
  };

  const reverseGeocode = async (lat, lng) => {
    updateLocation({ lat, lng, placeId: '' });

    try {
      const params = new URLSearchParams({
        lat: String(lat),
        lon: String(lng),
        format: 'json',
        addressdetails: '1',
      });
      const response = await fetch(`https://nominatim.openstreetmap.org/reverse?${params.toString()}`);
      const data = await response.json();
      if (data?.display_name) {
        updateLocation({
          address: data.display_name,
          lat,
          lng,
          placeId: data.place_id ? String(data.place_id) : '',
        });
        setQuery(data.display_name);
        setResults([]);
      }
    } catch (error) {
      console.error('Error reverse geocoding delivery location:', error);
    }
  };

  const selectResult = (result) => {
    const lat = Number(result.lat);
    const lng = Number(result.lon);
    const address = result.display_name || query;
    updateLocation({
      address,
      lat,
      lng,
      placeId: result.place_id ? String(result.place_id) : '',
    });
    setQuery(address);
    setResults([]);
    setMessage('');
  };

  const handleAddressChange = (event) => {
    const address = event.target.value;
    setQuery(address);
    updateLocation({ address });
  };

  return (
    <div className="mb-4 rounded-lg border border-[#333] bg-[#080808] p-3">
      <label className="mb-2 block text-sm text-[#ddd]" htmlFor="delivery-address">
        Direccion de entrega
      </label>
      <div className="flex gap-2">
        <input
          id="delivery-address"
          name="deliveryAddress"
          type="text"
          placeholder="Busca tu direccion o marca el mapa"
          value={query}
          onChange={handleAddressChange}
          className="min-w-0 flex-1 rounded-lg border border-[#333] bg-black px-3 py-3 text-white hover:bg-black hover:text-white"
          disabled={disabled}
        />
        <button
          type="button"
          onClick={searchLocation}
          className="shrink-0 rounded-lg border border-[#333] px-3 py-3 text-sm text-white hover:bg-[#f5f5f5] hover:text-black"
          disabled={disabled || searching}
        >
          {searching ? '...' : 'Buscar'}
        </button>
      </div>

      {results.length > 0 && (
        <ul className="mt-2 max-h-32 overflow-y-auto rounded-lg border border-[#333] bg-black text-left text-sm">
          {results.map((result) => (
            <li key={result.place_id}>
              <button
                type="button"
                onClick={() => selectResult(result)}
                className="block w-full px-3 py-2 text-left text-white hover:bg-[#171717]"
                disabled={disabled}
              >
                {result.display_name}
              </button>
            </li>
          ))}
        </ul>
      )}

      {message && <p className="mt-2 text-sm text-[#fca5a5]">{message}</p>}

      <div className="delivery-map mt-3 overflow-hidden rounded-lg border border-[#333]">
        <MapContainer center={center} zoom={value.lat && value.lng ? 16 : 12} scrollWheelZoom={false} className="h-full w-full">
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <RecenterMap center={center} hasPin={Boolean(value.lat && value.lng)} />
          <ClickMarker value={value} onSelect={reverseGeocode} />
        </MapContainer>
      </div>

      {value.lat && value.lng && (
        <p className="mt-2 break-words text-xs text-[#aaa]">
          Pin: {Number(value.lat).toFixed(6)}, {Number(value.lng).toFixed(6)}
        </p>
      )}
    </div>
  );
};

export default DeliveryLocationPicker;
