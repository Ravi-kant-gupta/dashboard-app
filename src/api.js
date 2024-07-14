import axios from 'axios';

const API_URL = 'http://localhost:3307/api/dashboard';

export const getMenus = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching menus', error);
    throw error;
  }
};

// Add other CRUD operations...
