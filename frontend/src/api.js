import axios from 'axios'; 

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

console.log('API URL:', API_URL);

const API = axios.create({ 
    baseURL: API_URL, 
}); 

export const getItems = () => API.get('/items'); 
export const createItem = (data) => API.post('/items', data); 
export const deleteItem = (id) => API.delete(`/items/${id}`); 
export const updateItem = (id, data) => API.put(`/items/${id}`, data);