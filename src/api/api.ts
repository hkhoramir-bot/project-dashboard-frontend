// src/services/api.ts
import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://project-dashboard-backend-0wdl.onrender.com/api/v1',
});

// 🔐 اضافه کردن توکن به همه درخواست‌ها
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
