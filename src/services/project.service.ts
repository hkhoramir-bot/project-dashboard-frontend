// src/services/project.service.ts

import axios from 'axios';
import type { Project } from '../types/models';

// آدرس بک‌اند رندر شما
const BASE_URL = 'https://project-dashboard-backend-0wdl.onrender.com/api/v1';

const API = axios.create({ baseURL: BASE_URL });

// افزودن توکن به تمام درخواست‌های این سرویس
API.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers = config.headers ?? {};
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const ProjectService = {
    // ۱. گرفتن لیست پروژه‌ها
    getProjects: async (): Promise<Project[]> => {
        const response = await API.get('/projects');
        return response.data;
    },

    // ۲. گرفتن پروژه با آیدی
    getProjectById: async (id: number): Promise<Project> => {
        const response = await API.get(`/projects/${id}`);
        return response.data;
    },

    // ۳. ایجاد پروژه جدید
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
