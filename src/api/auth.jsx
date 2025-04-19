import axios from 'axios';

const API_URL = 'https://www.devopsbatch.cloud/api'; // Production URL
// const API_URL = 'http://www.devopsbatch.cloud:3001';

export const register = async (userData) => {
  const response = await axios.post(`${API_URL}/users`, userData);
  return response.data;
};

export const login = async (credentials) => {
  // Check if user exists
  const { data: users } = await axios.get(`${API_URL}/users?email=${credentials.email}`);
  if (users.length === 0) throw new Error('User not found');
  
  const user = users[0];
  if (user.password !== credentials.password) throw new Error('Invalid credentials');
  
  // Store auth token (simplified for demo)
  const authResponse = await axios.post(`${API_URL}/auth`, { userId: user.id });
  return { user, token: authResponse.data.id };
};

export const getCurrentUser = async (token) => {
  const { data: auth } = await axios.get(`${API_URL}/auth/${token}`);
  const { data: user } = await axios.get(`${API_URL}/users/${auth.userId}`);
  return user;
};

export const logout = async (token) => {
  await axios.delete(`${API_URL}/auth/${token}`);
};