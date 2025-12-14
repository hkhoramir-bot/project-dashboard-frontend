import axios from 'axios';

const BASE_URL = 'https://project-dashboard-backend-0wdl.onrender.com/api/v1';
const API = axios.create({ baseURL: BASE_URL });

export const AuthService = {
  getToken: (): string | null => localStorage.getItem('token'),

  login: async (dto: { email: string; password: string }) => {
    const response = await API.post('/auth/login', dto);
    const { access_token, user } = response.data;

    if (access_token) {
      localStorage.setItem('token', access_token);
      localStorage.setItem('user', JSON.stringify(user));
      API.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
    }

    return { access_token, user };
  },

  register: async (dto: { name: string; email: string; password: string; role?: string }) => {
    const response = await API.post('/auth/register', dto);
    return response.data;
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    delete API.defaults.headers.common['Authorization'];
  },

  getCurrentUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },
};

export default API;
