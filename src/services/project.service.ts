// src/services/project.service.ts (تأکید بر Named Export)

import axios from 'axios';
// import { Project } from '../types/models'; // فرض بر وجود نوع Project

// ⚠️ این آدرس را چک کنید. اگر در NestJS از Global Prefix استفاده می‌کنید، نیازی به /api/v1 نیست.
const BASE_URL = 'https://project-dashboard-backend-0wdl.onrender.com/api/v1'; 

const API = axios.create({ baseURL: BASE_URL });

// افزودن Interceptors برای توکن (همانند قبل)
API.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers = config.headers ?? {};
        config.headers.Authorization = `Bearer ${token}`; 
    }
    return config;
});

// ✅ توجه: همه متدها به عنوان Named Export از یک شیء خارج می‌شوند
export const ProjectService = {
    getProjects: async (): Promise<any[]> => { // برای سادگی از any[] استفاده می‌کنم
        const response = await API.get('/projects');
        return response.data;
    },

    getProjectById: async (id: number): Promise<any> => {
        const response = await API.get(`/projects/${id}`);
        return response.data;
    },

    createProject: async (dto: any): Promise<any> => {
        const response = await API.post('/projects', dto);
        return response.data;
    }
};