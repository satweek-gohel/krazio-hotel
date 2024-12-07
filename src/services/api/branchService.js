import axios from 'axios';
const BASE_URL = 'https://sandbox.vovpos.com:3002/web';

export const getBranchDetails = async (restaurantId, branchId) => {
  try {
    const response = await fetch(`${BASE_URL}/getBranchDetails`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        restaurant_id: restaurantId,
        branch_id: branchId,
      }),
    });

    const data = await response.json();
    if (data.STATUS === "1") {
      return data.RESULT;
    }
    throw new Error(data.MESSAGE || 'Failed to fetch branch details');
  } catch (error) {
    console.error('Error fetching branch details:', error);
    throw error;
  }
};


export async function loginUser(email, password) {
  try {
    const response = await axios.post(`${BASE_URL}/login`, {
      email_address:email,
      password:password
    });
    return response.data;
  }  catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.MESSAGE || 'Login failed');
    }
    throw error;
  }
};


export async function logoutUser() {
  try {
    const token = sessionStorage.getItem('token');
    await axios.post(`${BASE_URL}/logout`, {}, {
      headers: { Authorization: `Bearer ${token}` }
    });
  } catch (error) {
    console.error('Logout error:', error);
  }
}

export const getBranches = async (restaurantId) => {
  try {
    const response = await fetch(`${BASE_URL}/home`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        restaurant_id:2,
      
      }),
    });

    const data = await response.json();
    if (data.STATUS === "1") {
      return data.RESULT;
    }
    throw new Error(data.MESSAGE || 'Failed to fetch branch details');
  } catch (error) {
    console.error('Error fetching branch details:', error);
    throw error;
  }
};
