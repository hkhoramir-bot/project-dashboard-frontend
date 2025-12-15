import axios from 'axios';

const BASE_URL = 'https://project-dashboard-backend-0wdl.onrender.com/api/v1';
const API = axios.create({ baseURL: BASE_URL });

export const AuthService = {
  login: async (dto: { email: string; password: string }) => {
    const response = await API.post('/auth/login', dto);

    const { access_token, user } = response.data;

    // ❗ اگر بک توکن نداد، خطا بده
    if (!access_token) {
      throw new Error('Login failed: no token received');
    }

    // ✅ ذخیره قطعی
    localStorage.setItem('token', access_token);
    localStorage.setItem('user', JSON.stringify(user));

    // ✅ ست هدر برای درخواست‌های بعدی
    API.defaults.headers.common.Authorization = `Bearer ${access_token}`;

    return { access_token, user };
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    delete API.defaults.headers.common.Authorization;
  },

  getToken: () => localStorage.getItem('token'),

  getCurrentUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },
};

export default API;
