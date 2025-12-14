// src/App.tsx

import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import MainLayout from './layouts/MainLayout';
// 💡 کامپوننت‌هایی که نیاز دارید را اضافه می‌کنیم
import CreateProjectPage from './pages/Projects/CreateProjectPage';
import LoginPage from './pages/Auth/LoginPage';
import RegisterPage from './pages/Auth/RegisterPage'; // 💡 ایمپورت RegisterPage
import DashboardPage from './pages/Dashboard/DashboardPage'; // 💡 ایمپورت DashboardPage

const App = () => {
  return (
    <Routes>

      {/* 🔓 مسیرهای عمومی */}
      <Route path="/login" element={<LoginPage />} />
      {/* 💡 مسیر ثبت نام را اضافه کردیم */}
      <Route path="/register" element={<RegisterPage />} /> 

      {/* 🔐 مسیرهای محافظت‌شده */}
      <Route element={<ProtectedRoute><MainLayout /></ProtectedRoute>}>
        {/* 💡 مسیر اصلی (داشبورد) را به DashboardPage متصل کردیم */}
        <Route path="/" element={<DashboardPage />} /> 
        <Route path="/projects/new" element={<CreateProjectPage />} />
        {/* ... مسیرهای دیگر ... */}
      </Route>

      {/* 💡 fallback: اگر مسیر پیدا نشد، کاربر را به /login هدایت کن */}
      {/* ما این را تنها در صورتی فعال می‌کنیم که کاربر لاگین نباشد، اما برای سادگی، فعلا به /login هدایت می‌کنیم */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};

export default App;