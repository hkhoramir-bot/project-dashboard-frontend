// src/services/project.service.ts

import axios from 'axios';
import { Project } from '../types/models';

// آدرس بک‌اند رندر شما
const BASE_URL = 'https://your-render-backend-url.onrender.com/api/v1';

const API = axios.create({ baseURL: BASE_URL });

// افزودن توکن به تمام درخواست‌های این سرویس
API.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const ProjectService = {
    // ۱. دریافت لیست تمام پروژه‌ها
    getAllProjects: async () => {
        const response = await API.get('/projects');
        return response.data as Project[];
    },

    // ۲. دریافت جزئیات یک پروژه خاص
    getProjectById: async (id: string) => {
        const response = await API.get(`/projects/${id}`);
        return response.data as Project;
    }
};