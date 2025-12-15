// src/services/project.service.ts (اصلاح شده)

import axios from 'axios';

// ✅ تعریف Type ساده DTO برای CreateProject
interface CreateProjectDto {
    name: string;
    description: string;
    startDate: string; // انتظار رشته تاریخ (از input type="date")
    endDate: string;
}

// ⚠️ مطمئن شوید که BASE_URL شما به درستی به /api/v1 ختم شود
const BASE_URL = 'https://project-dashboard-backend-0wdl.onrender.com/api/v1'; 

const API = axios.create({ baseURL: BASE_URL });
// ... [بخش Interceptors بدون تغییر] ...

export const ProjectService = {
    // ... [getProjects و getProjectById بدون تغییر] ...

    // ۳. ایجاد پروژه جدید
    createProject: async (dto: CreateProjectDto): Promise<any> => { 
        // ✅ ارسال DTO به صورت مستقیم
        // این کار خطای 404 یا 500 ناشی از فرمت تاریخ را برطرف می‌کند
        const response = await API.post('/projects', dto); 
        return response.data; 
    }
};