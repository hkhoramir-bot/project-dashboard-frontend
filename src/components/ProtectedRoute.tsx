import React from 'react';
import { Navigate } from 'react-router-dom';
import { AuthService } from '../services/auth.service'; // 💡 ایمپورت کردن سرویس احراز هویت

interface ProtectedRouteProps {
    children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    // ✅ استفاده از متد getToken از AuthService برای تمرکز منطق
    const token = AuthService.getToken(); 

    // اگر توکن در LocalStorage وجود نداشته باشد
    if (!token) {
        // هدایت به صفحه ورود
        return <Navigate to="/login" replace />;
    }

    // در صورت وجود توکن، محتوای مورد نظر را نمایش بده
    return <>{children}</>;
};

export default ProtectedRoute;