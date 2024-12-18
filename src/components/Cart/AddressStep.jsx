import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Search, MapPin, X, MoreVertical } from 'lucide-react';

// Fix for default marker icon in Leaflet
import L from 'leaflet';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

const DefaultIcon = new Icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

const AddressStep = ({ onNext }) => {
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [mapCenter, setMapCenter] = useState([23.0225, 72.5714]); // Ahmedabad coordinates
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDeliveryInstruction, setSelectedDeliveryInstruction] = useState(null);

  const savedAddresses = [
    {
      id: 1,
      name: 'Gokuldhaam Society',
      address: '99 Highway, Ahmedabad, Gujarat, India',
      distance: '20.6 km',
      coordinates: [23.0350, 72.5714]
    },
    {
      id: 2,
      name: 'Anjali Complex',
      address: 'B 202 Gate, Ahmedabad, Gujarat, India',
      distance: '18.0 km',
      coordinates: [23.0225, 72.5850]
    },
    {
      id: 3,
      name: 'Vgec boy hostel 2',
      address: 'visat, Ahmedabad, Gujarat, India',
      distance: '18.0 km',
      coordinates: [25.2225, 80.5850]
    }
  ];

  const filteredAddresses = savedAddresses.filter(address => 
    address.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    address.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddressSelect = (address) => {
    setSelectedAddress(address.id);
    setMapCenter(address.coordinates);
  };

  const handleDeliveryInstructionSelect = (instruction) => {
    setSelectedDeliveryInstruction(instruction);
  };

  return (
    <div className="flex flex-col overflow-y-auto pb-5 bg-white">
      {/* Map Container */}
      <div className="relative h-48 bg-gray-100">
        <div className="absolute top-4 right-4 z-10">
          <button className="p-2 bg-white rounded-full shadow-md">
            <X className="w-5 h-5 text-gray-700" />
          </button>
        </div>
        
        <MapContainer 
          center={mapCenter} 
          zoom={12} 
          scrollWheelZoom={false}
          className="w-full h-full"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {filteredAddresses.map((address) => (
            <Marker 
              key={address.id} 
              position={address.coordinates}
            >
              <Popup>{address.name}</Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-4 pt-4 pb-20">
        {/* Search Bar */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search your location"
            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 text-sm"
          />
        </div>

        {/* Delivery Instructions */}
        <div className="mb-6">
          <h3 className="text-base font-semibold mb-3">Delivery Instructions</h3>
          <div className="grid grid-cols-3 gap-2">
            {['Leave at door', 'Avoid ringing', 'Avoid calling'].map((instruction) => (
              <button 
                key={instruction}
                onClick={() => handleDeliveryInstructionSelect(instruction)}
                className={`p-3 border border-gray-200 rounded-xl text-center hover:border-red-500 hover:text-red-500 flex flex-col items-center ${
                  selectedDeliveryInstruction === instruction ? 'border-red-500 bg-red-50' : ''
                }`}
              >
                <div className="w-8 h-8 bg-red-50 rounded-full flex items-center justify-center mb-1">
                  <MapPin className="w-4 h-4 text-red-500" />
                </div>
                <span className="text-xs">{instruction}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Saved Addresses */}
        <div>
          <h3 className="text-base font-semibold mb-3">Saved Addresses</h3>
          <div className="space-y-3">
            {filteredAddresses.map((addr) => (
              <button
                key={addr.id}
                onClick={() => handleAddressSelect(addr)}
                className={`w-full p-4 border rounded-xl flex items-start gap-3 ${
                  selectedAddress === addr.id ? 'border-red-500 bg-red-50' : 'border-gray-200'
                }`}
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  selectedAddress === addr.id ? 'bg-red-100' : 'bg-gray-100'
                }`}>
                  <MapPin className={`w-5 h-5 ${
                    selectedAddress === addr.id ? 'text-red-500' : 'text-gray-400'
                  }`} />
                </div>
                <div className="flex-1 text-left">
                  <p className="font-medium">{addr.name}</p>
                  <p className="text-sm text-gray-500 mt-1">{addr.address}</p>
                  <p className="text-sm text-gray-400 mt-1">{addr.distance}</p>
                </div>
                <MoreVertical className="w-5 h-5 text-gray-400" />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Fixed Bottom Button */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t">
        <button
          onClick={onNext}
          disabled={!selectedAddress || !selectedDeliveryInstruction}
          className="w-full py-3.5 bg-red-600 text-white rounded-xl font-medium hover:bg-red-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AddressStep;