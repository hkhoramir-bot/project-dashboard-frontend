// src/services/project.service.ts
import axios from 'axios';

const BASE_URL = 'https://project-dashboard-backend-0wdl.onrender.com/api/v1';

const API = axios.create({ baseURL: BASE_URL });

API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers = config.headers ?? {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const ProjectService = {
  getProjects: async () => {  // ✅ type annotation حذف شد
    const response = await API.get('/projects');
    return response.data;
  },

  getProjectById: async (id) => {  // ✅ type annotation حذف شد
    const response = await API.get(`/projects/${id}`);
    return response.data;
  },

  createProject: async (dto) => {  // ✅ type annotation حذف شد
    const response = await API.post('/projects', dto);
    return response.data;
  }
};
