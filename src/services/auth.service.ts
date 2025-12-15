import axios from 'axios';

const BASE_URL = 'https://project-dashboard-backend-0wdl.onrender.com/api/v1';

const API = axios.create({ 
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    }
});

// ✅ حل مشکل اصلی: اضافه کردن Interceptor برای ارسال خودکار توکن در هر درخواست
API.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

// ✅ مدیریت خودکار خطای ۴۰۱ (اگر توکن منقضی شد، کاربر را به لاگین بفرست)
API.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            AuthService.logout();
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

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

    logout: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    },

    getToken: () => localStorage.getItem('token'),

    getCurrentUser: () => {
        const user = localStorage.getItem('user');
        return user ? JSON.parse(user) : null;
    },
};

export default API;