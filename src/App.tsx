// src/App.tsx

import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthService } from './services/auth.service';

// --- صفحات ---
import LoginPage from './pages/Auth/LoginPage';
// نیاز به ساخت:
const DashboardPage = () => <h1>داشبورد اصلی (نیاز به پیاده‌سازی)</h1>; 
const RegisterPage = () => <h1>صفحه ثبت نام (نیاز به پیاده‌سازی)</h1>; 
// ---

// کامپوننت برای محافظت از مسیرها: اگر توکن نباشد، به صفحه ورود هدایت می‌کند
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    // چک کردن وجود توکن
    if (!AuthService.getToken()) {
        // Replace برای حذف مسیر فعلی از History مرورگر
        return <Navigate to="/login" replace />; 
    }
    return <>{children}</>;
};

const App: React.FC = () => {
    return (
        <BrowserRouter>
            <Routes>
                {/* مسیرهای عمومی */}
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />

                {/* مسیرهای محافظت شده (باید لاگین شده باشید) */}
                <Route
                    path="/"
                    element={
                        <ProtectedRoute>
                            <DashboardPage />
                        </ProtectedRoute>
                    }
                />
                {/* /projects/:id و سایر مسیرهای مدیریت پروژه در اینجا قرار می‌گیرند */}
            </Routes>
        </BrowserRouter>
    );
};

export default App;