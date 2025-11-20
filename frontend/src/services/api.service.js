import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

export const searchMedia = async (query, source, apiKey = null) => {
  try {
    const params = { query, source };
    if (apiKey) {
      params.apiKey = apiKey;
    }
    const response = await axios.get(`${API_BASE_URL}/search`, { params });
    return response.data;
  } catch (error) {
    console.error('Search error:', error);
    throw error;
  }
};

export const getMediaDetails = async (id, source, apiKey = null) => {
  try {
    const params = apiKey ? { apiKey } : {};
    const response = await axios.get(`${API_BASE_URL}/details/${source}/${id}`, { params });
    return response.data;
  } catch (error) {
    console.error('Details error:', error);
    throw error;
  }
};

export const validateTmdbKey = async (apiKey) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/validate-tmdb-key`, { apiKey });
    return response.data;
  } catch (error) {
    console.error('Validation error:', error);
    if (error.response?.data) {
      return error.response.data;
    }
    throw error;
  }
};
