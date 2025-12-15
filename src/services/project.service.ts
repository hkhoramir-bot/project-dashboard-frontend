// src/services/project.service.ts

import axios, { AxiosInstance } from 'axios';

// ⚠️ نوع Project
export interface Task {
  id: number;
  title: string;
  status: 'To Do' | 'In Progress' | 'Done';
}

export interface Project {
  id: number;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  status: 'To Do' | 'In Progress' | 'Done';
  tasks: Task[];
  ownerId?: string; // ⚡️ اختیاری برای فیلتر پروژه‌های کاربر
}

// آدرس Base URL
const BASE_URL = 'https://project-dashboard-backend-0wdl.onrender.com/api/v1';

// ساخت instance Axios
const API: AxiosInstance = axios.create({ baseURL: BASE_URL });

// Interceptor برای اضافه کردن JWT از localStorage
API.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers = config.headers ?? {};
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => Promise.reject(error));

// ✅ Named export با متدهای async و type-safe
export const ProjectService = {
    // GET: همه پروژه‌ها
    getProjects: async (): Promise<Project[]> => {
        try {
            const response = await API.get<Project[]>('/projects');
            return response.data;
        } catch (error: any) {
            console.error('Error fetching projects:', error.response?.data || error.message);
            throw error;
        }
    },

    // GET: پروژه بر اساس id
    getProjectById: async (id: number): Promise<Project> => {
        try {
            const response = await API.get<Project>(`/projects/${id}`);
            return response.data;
        } catch (error: any) {
            console.error(`Error fetching project id=${id}:`, error.response?.data || error.message);
            throw error;
        }
    },

    // POST: ایجاد پروژه جدید
    createProject: async (dto: Partial<Omit<Project, 'id' | 'tasks' | 'status'>> & { startDate: string, endDate: string }): Promise<Project> => {
        try {
            const response = await API.post<Project>('/projects', dto);
            return response.data;
        } catch (error: any) {
            console.error('Error creating project:', error.response?.data || error.message);
            throw error;
        }
    }
};
