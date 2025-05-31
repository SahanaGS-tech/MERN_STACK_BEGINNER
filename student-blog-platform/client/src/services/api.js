import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api";

// SOLUTION: Create axios instance with base URL
const api = axios.create({
  baseURL: API_BASE_URL,
});

// SOLUTION: Implement API functions
export const postAPI = {
  // SOLUTION: Get all posts with optional filters
  getAllPosts: async (filters = {}) => {
    const response = await api.get("/posts", { params: filters });
    return response.data;
  },

  // SOLUTION: Get single post by ID
  getPostById: async (id) => {
    const response = await api.get(`/posts/${id}`);
    return response.data;
  },

  // SOLUTION: Create new post
  createPost: async (postData) => {
    const response = await api.post("/posts", postData);
    return response.data;
  },

  // SOLUTION: Update existing post
  updatePost: async (id, postData) => {
    const response = await api.put(`/posts/${id}`, postData);
    return response.data;
  },

  // SOLUTION: Delete post
  deletePost: async (id) => {
    const response = await api.delete(`/posts/${id}`);
    return response.data;
  },

  // SOLUTION: Toggle publish status
  togglePublish: async (id) => {
    const response = await api.patch(`/posts/${id}/publish`);
    return response.data;
  },
};
