const API_BASE_URL = 'https://sandbox.vovpos.com:3002/web';

export const addressService = {
  createAddress: async (addressData) => {
    try {
      const token = sessionStorage.getItem('token'); 
      if (!token) throw new Error('No authentication token found');

      const response = await fetch(`${API_BASE_URL}/createAddress`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` 
        },
        body: JSON.stringify(addressData)
      });

      if (!response.ok) {
        throw new Error('Failed to create address');
      }

      return await response.json();
    } catch (error) {
      console.error('Error creating address:', error);
      throw error;
    }
  },

  updateAddress: async (addressData) => {
    try {
      const token = sessionStorage.getItem('token'); 
      if (!token) throw new Error('No authentication token found');

      const response = await fetch(`${API_BASE_URL}/updateAddress`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` 
        },
        body: JSON.stringify(addressData)
      });

      if (!response.ok) {
        throw new Error('Failed to update address');
      }

      return await response.json();
    } catch (error) {
      console.error('Error updating address:', error);
      throw error;
    }
  }
};
