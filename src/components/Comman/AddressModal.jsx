import React, { useEffect, useState } from 'react';
import { MoreVertical, X, Pencil, Trash2 } from 'lucide-react';
import AddressModal from '../Checkout/Address/AddressModal';


const AddressCard = ({ image, title, address, onMoreClick, showMenu, onEdit, onDelete, onCloseMenu }) => (
  <div className="border border-gray-200 rounded-lg p-4 mb-3 flex items-start justify-between relative">
    <div className="flex gap-3">
      <img src={image} alt={title} className="w-5 h-5 rounded-full mt-1" />
      <div>
        <h3 className="text-lg font-medium text-gray-900">{title}</h3>
        <p className="text-gray-500 text-sm">{address}</p>
      </div>
    </div>
    <div className="relative">
      <button 
        onClick={onMoreClick}
        className="text-gray-400 hover:text-gray-600"
      >
        <MoreVertical size={20} />
      </button>
      
      {showMenu && (
        <>
          <div 
            className="fixed inset-0" 
            onClick={onCloseMenu}
          />
          <div className="absolute right-0 top-8 w-36 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-10">
            <button
              onClick={onEdit}
              className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
            >
              <Pencil size={16} />
              Edit
            </button>
            <button
              onClick={onDelete}
              className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-gray-50 flex items-center gap-2"
            >
              <Trash2 size={16} />
              Delete
            </button>
          </div>
        </>
      )}
    </div>
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

  const [address, setAddress] = useState([]);
  const [activeMenu, setActiveMenu] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);

  useEffect(() => {
    const addressesString = sessionStorage.getItem("addresses");
    if (addressesString) {
      setAddress(JSON.parse(addressesString));
    }
  }, []);

  const handleMoreClick = (addressId) => {
    setActiveMenu(activeMenu === addressId ? null : addressId);
  };

  const handleEdit = (address) => {
    setSelectedAddress(address);
    setShowEditModal(true);
    setActiveMenu(null);
  };

  const handleDelete = async (addressId) => {
    // Implement delete functionality here
    setActiveMenu(null);
  };

  const handleSaveAddress = (updatedAddress) => {
    // Update the addresses list after edit
    const updatedAddresses = address.map(addr => 
      addr.user_address_id === updatedAddress.user_address_id ? updatedAddress : addr
    );
    setAddress(updatedAddresses);
    sessionStorage.setItem("addresses", JSON.stringify(updatedAddresses));
    setShowEditModal(false);
  };
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl w-full max-w-lg">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-gray-200">
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
          {address.map((addr) => {
            const formattedAddress = `${addr.street_1}, ${addr.street_2}, ${addr.landmark}, ${addr.location_name}, ${addr.city_name}, ${addr.state_name}, ${addr.country_name}, ${addr.pincode}`;
            const title = `${addr.user_name} - ${addr.address_type === '0' ? 'Home' : addr.address_type === '1' ? 'Work' : 'Other'}`;
            return (
              <AddressCard
                key={addr.user_address_id}
                image={'/addressmodalhome.svg'}
                title={title}
                address={formattedAddress}
                showMenu={activeMenu === addr.user_address_id}
                onMoreClick={() => handleMoreClick(addr.user_address_id)}
                onEdit={() => handleEdit(addr)}
                onDelete={() => handleDelete(addr.user_address_id)}
                onCloseMenu={() => setActiveMenu(null)}
              />
            );
          })}
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

      {showEditModal && (
        <AddressModal
          onClose={() => setShowEditModal(false)}
          onSave={handleSaveAddress}
          initialData={selectedAddress}
        />
      )}
    </div>
  );
};

export default SavedAddressModal;