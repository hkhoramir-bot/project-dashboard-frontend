// src/services/auth.service.ts

import axios from 'axios';

const BASE_URL = 'https://project-dashboard-backend-0wdl.onrender.com/api/v1';
const API = axios.create({ 
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    }
});

// 1. Request Interceptor: Auto-attach Token
API.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export const AuthService = {
    register: async (dto: { name: string; email: string; password: string; role: string }) => {
        const response = await API.post('/auth/register', dto);
        return response.data;
    },

    login: async (dto: { email: string; password: string }) => {
        const response = await API.post('/auth/login', dto);
        const { access_token, user } = response.data;
        if (access_token) {
            localStorage.setItem('token', access_token);
            localStorage.setItem('user', JSON.stringify(user));
        }
        return { access_token, user };
    },

    // ✅ اصلاح کلیدی: اضافه کردن هدایت (Redirect) به تابع logout
    logout: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/login'; // <--- مطمئن شدن از هدایت
    },

    getToken: () => localStorage.getItem('token'),
    getCurrentUser: () => {
        const user = localStorage.getItem('user');
        return user ? JSON.parse(user) : null;
    },
};


// 2. Response Interceptor: Handle 401
API.interceptors.response.use(
    (response) => response,
    (error) => {
        // اگر خطای 401 داشتیم، تابع logout را صدا می‌زنیم که هم پاکسازی می‌کند و هم هدایت (Redirect)
        if (error.response && error.response.status === 401) {
            AuthService.logout();
            // نیازی به window.location.href مجزا نیست
        }
        return Promise.reject(error);
    }
);

export default API;