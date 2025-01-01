import React from 'react';
import { MoreVertical, X } from 'lucide-react';

const AddressCard = ({ image, title, address, onMoreClick }) => (
  <div className="border border-gray-200 rounded-lg p-4 mb-3 flex items-start justify-between">
    <div className="flex gap-3">
      <img src={image} alt={title} className="w-5 h-5 rounded-full mt-1" />
      <div>
        <h3 className="text-lg font-medium text-gray-900">{title}</h3>
        <p className="text-gray-500 text-sm">{address}</p>
      </div>
    </div>
    <button 
      onClick={onMoreClick}
      className="text-gray-400 hover:text-gray-600"
    >
      <MoreVertical size={20} />
    </button>
  </div>
);

const SavedAddressModal = ({
  isOpen,
  onClose,
  addresses = [],
  onAddressSelect,
  onDone
}) => {
  if (!isOpen) return null;

  // If no addresses provided, use default demo data
  const defaultAddresses = [
    {
      id: 1,
      image: '/addressmodalhome.svg',
      title: 'Gokuldham Society',
      address: 'SG Highway, Ahemdabad, Gujarat, India'
    },
    {
      id: 2,
      image: '/addressmodalhome.svg',
      title: 'Nilgiri Heights',
      address: 'SG Highway, Ahemdabad, Gujarat, India'
    },
    {
      id: 3,
      image: '/addressmodaloffice.svg',
      title: 'Business Square',
      address: 'SG Highway, Ahemdabad, Gujarat, India'
    }
  ];

  const addressList = addresses.length > 0 ? addresses : defaultAddresses;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl w-full max-w-lg">
        {/* Header */}
        <div className="flex justify-between items-center p-4  border-gray-200">
          <h2 className="text-2xl font-bold">Saved Address</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 bg-black rounded-full p-1"
          >
            <X size={15} className='text-white bg-black' />
          </button>
        </div>

        {/* Address List */}
        <div className="p-4">
          {addressList.map((address) => (
            <AddressCard
              key={address.id}
              image={address.image}
              title={address.title}
              address={address.address}
              onMoreClick={() => onAddressSelect?.(address)}
            />
          ))}
        </div>

        {/* Footer */}
        <div className="p-4 flex gap-3 border-t border-gray-200">
          <button
            onClick={onClose}
            className="flex-1 py-3 px-4 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-medium"
          >
            Cancel
          </button>
          <button
            onClick={onDone}
            className="flex-1 py-3 px-4 bg-primary text-white rounded-lg hover:bg-red-700 font-medium"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};

export default SavedAddressModal;