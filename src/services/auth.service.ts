import axios from 'axios';

// ⚠️ این آدرس را با URL نهایی بک‌اند Render خود جایگزین کنید
const BASE_URL = 'https://project-dashboard-backend-0wdl.onrender.com/api/v1';
const API = axios.create({ baseURL: BASE_URL });

// اگر نوع User global تعریف شده است، نیازی به import نیست
export const AuthService = {
  // گرفتن توکن از localStorage
  getToken: (): string | null => localStorage.getItem('token'),

  // ۱. متد Login
  login: async (email: string, password: string) => {
    const response = await API.post('/auth/login', { email, password });
    const { access_token, user } = response.data; // ⚠️ فیلد access_token

    if (access_token) {
      localStorage.setItem('token', access_token);
      localStorage.setItem('user', JSON.stringify(user)); // ذخیره اطلاعات کاربر (اختیاری)
      API.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
    }

    return { access_token, user };
  },

  // ۲. متد Register
  register: async (name: string, email: string, password: string, role = 'USER') => {
    const response = await API.post('/auth/register', { name, email, password, role });
    return response.data;
  },

  // ۳. خروج از حساب
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    delete API.defaults.headers.common['Authorization'];
  },

  // ۴. گرفتن کاربر فعلی
  getCurrentUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },
};

export default API; // در صورت نیاز برای استفاده axios instance
