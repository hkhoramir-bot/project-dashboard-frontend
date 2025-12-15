// src/App.tsx

import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import MainLayout from './layouts/MainLayout';
// 💡 کامپوننت‌هایی که نیاز دارید را اضافه می‌کنیم
import CreateProjectPage from './pages/Projects/CreateProjectPage';
import LoginPage from './pages/Auth/LoginPage';
import RegisterPage from './pages/Auth/RegisterPage';
import DashboardPage from './pages/Dashboard/DashboardPage';
// ✅ ایمپورت سرویس احراز هویت برای تصمیم‌گیری در Fallback
import { AuthService } from './services/auth.service';

const App = () => {
  // ✅ تعیین مقصد Fallback بر اساس وجود توکن
  const isAuthenticated = AuthService.getToken();
  const fallbackDestination = isAuthenticated ? '/' : '/login';

  return (
    <Routes>

      {/* 🔓 مسیرهای عمومی */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} /> 

      {/* 🔐 مسیرهای محافظت‌شده */}
      <Route element={<ProtectedRoute><MainLayout /></ProtectedRoute>}>
        <Route path="/" element={<DashboardPage />} /> 
        <Route path="/projects/new" element={<CreateProjectPage />} />
        {/* می‌توانید مسیرهای لیست پروژه‌ها و تیم را هم اضافه کنید */}
        <Route path="/projects" element={<div>صفحه لیست پروژه‌ها</div>} />
        <Route path="/team" element={<div>صفحه اعضای تیم</div>} />
      </Route>

      {/* 💡 Fallback بهینه‌شده: 
          اگر لاگین بود -> به / هدایت کن
          اگر لاگین نبود -> به /login هدایت کن
      */}
      <Route path="*" element={<Navigate to={fallbackDestination} replace />} />
    </Routes>
  );
};

export default App;