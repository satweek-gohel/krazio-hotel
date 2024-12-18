import axios from 'axios';

const API_BASE_URL = 'https://sandbox.vovpos.com:3002/web';

export const getItemSteps = async (restaurantId, branchId, itemId) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/itemSteps`, {
      restaurant_id: restaurantId,
      branch_id: branchId,
      item_id: itemId
    });
    
    return response.data?.RESULT;
  } catch (error) {
    console.error('Error fetching item steps:', error);
    throw error;
  }
};