import React, { useState, useRef, useEffect } from 'react';
import { 
  LogOut, 
  User as UserIcon, 
  ChevronDown
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

function ProfileDropdown() {
  const { userDetails, logout, token } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  

  
  useEffect(() => {
    console.log('User data from context:', userDetails);
    console.log('token data from context:', token);
    console.log('Session storage data:', {
      userDetails: JSON.parse(sessionStorage.getItem('userDetails')),
      token: sessionStorage.getItem('token')
    });
  }, [userDetails, token]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!userDetails) return null;

  const handleLogout = async () => {
    try {
      await logout();
      console.log('Logged out successfully');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-3 focus:outline-none bg-white rounded-lg px-4 py-2 hover:bg-gray-50"
      >
        {userDetails.profile_picture
 ? (
          <img
            src={userDetails.profile_picture
            }
            alt={userDetails.name}
            className="w-10 h-10 rounded-full object-cover"
          />
        ) : (
          <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
            <span className="text-gray-600 font-semibold text-sm">
              {userDetails.first_name}
            </span>
          </div>
        )}
        
        <div className="text-left">
          <div className="text-sm font-medium text-gray-900">{userDetails.first_name}</div>
          <div className="text-xs text-gray-500">{userDetails.email_address}</div>
        </div>
        <ChevronDown className={`w-4 h-4 text-gray-500 ${isOpen ? 'transform rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1">
          <button
            onClick={handleLogout}
            className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Sign out
          </button>
        </div>
      )}
    </div>
  );
}

export default ProfileDropdown;