import { useEffect, useRef, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from 'react-router-dom';
import ProfileModal from "./ProfileModal";
import ConfirmLogout from "./ConfirmLogout";
import SavedAddressModal from "./AddressModal";

const ProfileDropdown = () => {
  const dropdownRef = useRef(null);
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isConfirmLogoutOpen, setIsConfirmLogoutOpen] = useState(false);
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close dropdown when any modal opens
  useEffect(() => {
    if (isProfileModalOpen || isConfirmLogoutOpen || isAddressModalOpen) {
      setIsOpen(false);
    }
  }, [isProfileModalOpen, isConfirmLogoutOpen, isAddressModalOpen]);

  const handleOrdersClick = () => {
    setIsOpen(false);
    navigate('/my-orders');
  };

  const handleModalOpen = (modalSetter) => {
    return () => {
      setIsOpen(false); // Close dropdown first
      setTimeout(() => { // Small delay for smooth transition
        modalSetter(true);
      }, 100);
    };
  };

  const menuItems = [
    { 
      icon: '/profiledropdown.svg', 
      label: 'Profile', 
      onClick: handleModalOpen(setIsProfileModalOpen)
    },
    { 
      icon: '/orderdropdown.svg', 
      label: 'Orders', 
      onClick: handleOrdersClick
    },
    { 
      icon: '/addressdropdown.svg', 
      label: 'My Address', 
      onClick: handleModalOpen(setIsAddressModalOpen)
    },
    { 
      icon: '/logoutdropdown.svg', 
      label: 'Logout', 
      onClick: handleModalOpen(setIsConfirmLogoutOpen)
    }
  ];

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 focus:outline-none"
      >
        <div className="w-10 h-10 rounded-full overflow-hidden">
          <img
            src="/profile.svg"
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-60 bg-white rounded-lg shadow-lg py-2 z-50 transform transition-transform duration-200 ease-out">
          {menuItems.map((item, index) => (
            <button
              key={index}
              onClick={item.onClick}
              className="w-full px-4 py-3 flex items-center space-x-3 hover:bg-gray-50 transition-colors border-b last:border-b-0"
            >
              <img src={item.icon} alt={item.label} className="w-5 h-5" />
              <span className="text-black text-sm font-medium">{item.label}</span>
            </button>
          ))}
        </div>
      )}

      <ProfileModal 
        isOpen={isProfileModalOpen} 
        onClose={() => setIsProfileModalOpen(false)}
      />
      <ConfirmLogout 
        isOpen={isConfirmLogoutOpen} 
        onClose={() => setIsConfirmLogoutOpen(false)}
        onConfirm={logout}
      />
      <SavedAddressModal 
        isOpen={isAddressModalOpen} 
        onClose={() => setIsAddressModalOpen(false)}
      />
    </div>
  );
};

export default ProfileDropdown;