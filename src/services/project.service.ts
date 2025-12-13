// src/services/project.service.ts

import axios from 'axios';
import { Project } from '../types/models';

// آدرس بک‌اند رندر شما
const BASE_URL = 'https://project-dashboard-backend-0wdl.onrender.com/api/v1';

const API = axios.create({ baseURL: BASE_URL });

// افزودن توکن به تمام درخواست‌های این سرویس
API.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// src/services/project.service.ts

// ... (ایمپورت‌ها و تنظیمات BASE_URL و API همان می‌ماند)

export const ProjectService = {
    // ... (متدهای قبلی)

    // ۳. ایجاد پروژه جدید
    createProject: async (name: string, description: string, startDate: Date, endDate: Date) => {
        const response = await API.post('/projects', {
            name,
            description,
            startDate,
            endDate
        });
        return response.data; // شیء پروژه جدید
    }
};