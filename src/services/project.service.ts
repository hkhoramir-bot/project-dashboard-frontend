// src/services/project.service.ts

import axios from 'axios';
// 💡 حذف شده: دیگر نیازی به این خط نیست چون Type Project اکنون Global است.
// import { Project } from '../types/models.ts';

// آدرس بک‌اند رندر شما
const BASE_URL = 'https://project-dashboard-backend-0wdl.onrender.com/api/v1';

const API = axios.create({ baseURL: BASE_URL });

// افزودن توکن به تمام درخواست‌های این سرویس
API.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers = config.headers ?? {};
        // 💡 مطمئن می‌شویم که Authorization وجود دارد
        config.headers.Authorization = `Bearer ${token}`; 
    }
    return config;
});

export const ProjectService = {
    // ۱. گرفتن لیست پروژه‌ها
    // (Type Project اکنون Global است)
    getProjects: async (): Promise<Project[]> => {
        const response = await API.get('/projects');
        return response.data;
    },

    // ۲. گرفتن پروژه با آیدی
    // (Type Project اکنون Global است)
    getProjectById: async (id: number): Promise<Project> => {
        const response = await API.get(`/projects/${id}`);
        return response.data;
    },

    // ۳. ایجاد پروژه جدید
    // (Type Project اکنون Global است)
    createProject: async (
        name: string,
        description: string,
        startDate: Date,
        endDate: Date
    ): Promise<Project> => {
        const response = await API.post('/projects', {
            name,
            description,
            startDate,
            endDate
        });
        return response.data; // شیء پروژه جدید
    }
};