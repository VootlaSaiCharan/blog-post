import axios from 'axios';

const API_URL = 'https://www.devopsbatch.cloud/api'; // Production URL
// const API_URL = 'http://www.devopsbatch.cloud:3001';

export const getBlogs = async (page = 2, limit = 7) => {
  const response = await axios.get(`${API_URL}/blogs?_page=${page}&_limit=${limit}&_sort=createdAt&_order=desc`);
  return {
    blogs: response.data,
    totalCount: response.headers['x-total-count']
  };
};

export const getBlogById = async (id) => {
  const response = await axios.get(`${API_URL}/blogs/${id}`);
  return response.data;
};

export const createBlog = async (blogData, token) => {
  const response = await axios.post(`${API_URL}/blogs`, blogData, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

export const updateBlog = async (id, blogData, token) => {
  const response = await axios.put(`${API_URL}/blogs/${id}`, blogData, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

export const deleteBlog = async (id, token) => {
  await axios.delete(`${API_URL}/blogs/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
};