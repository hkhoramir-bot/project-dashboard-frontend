// src/services/auth.service.ts

import axios from 'axios';
import type { User } from '../types/models';

// ⚠️⚠️ این آدرس را با آدرس نهایی بک‌اند (Render URL) خود جایگزین کنید!
const BASE_URL = 'https://project-dashboard-backend-0wdl.onrender.com/api/v1'; 
const API = axios.create({ baseURL: BASE_URL });

export const AuthService = {
    // گرفتن توکن از Local Storage
    getToken: (): string | null => localStorage.getItem('token'),
    
    // ۱. متد Login
    login: async (email: string, password: string): Promise<User> => {
        const response = await API.post('/auth/login', { email, password });
        const { token, user } = response.data;

        if (token) {
            localStorage.setItem('token', token);
            // توکن را در هدر دیفالت Axios تنظیم کنید تا نیازی به پاس دادن مکرر نباشد
            API.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        }

        return user as User;
    },

    // ۲. متد Register
    register: async (
        name: string,
        email: string,
        password: string,
        role: string
    ) => {
        const response = await API.post('/auth/register', {
            name,
            email,
            password,
            role
        });
        return response.data;
    },

    // ۳. خروج از حساب
    logout: () => {
        localStorage.removeItem('token');
        delete API.defaults.headers.common['Authorization'];
    }
};
