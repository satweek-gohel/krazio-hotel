import axios from 'axios';

const API_BASE_URL = 'https://sandbox.vovpos.com:3002/web';

export const calculateOrder = async (payload) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/orderCalculation`, payload);
    return response.data;
  } catch (error) {
    console.error('Error calculating order:', error);
    throw error;
  }
};