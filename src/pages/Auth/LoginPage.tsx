// src/pages/Auth/LoginPage.tsx (نسخه Tailwind)

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthService } from '../../services/auth.service';

const LoginPage: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        try {
            await AuthService.login(email, password);
            navigate('/'); 
        } catch (err) {
            console.error(err);
            setError('ورود ناموفق بود. ایمیل یا رمز عبور اشتباه است.');
        }
    };

    return (
        // 💡 استفاده از کلاس‌های Tailwind برای مرکز قرارگیری و پس‌زمینه
        <div className="flex justify-center items-center min-h-screen bg-gray-100 rtl">
            <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-2xl">
                
                <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">ورود به داشبورد</h2>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                    {error && <p className="p-3 bg-red-100 text-red-700 rounded-lg text-sm">{error}</p>}
                    
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="email">ایمیل</label>
                        <input
                            type="email"
                            placeholder="ایمیل"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            // 💡 کلاس‌های Tailwind برای فیلد
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>
                    
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="password">رمز عبور</label>
                        <input
                            type="password"
                            placeholder="رمز عبور"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            // 💡 کلاس‌های Tailwind برای فیلد
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>
                    
                    <button type="submit" className="w-full py-3 bg-indigo-600 text-white rounded-lg font-semibold shadow-md hover:bg-indigo-700 transition duration-150">
                        ورود
                    </button>
                </form>
                
                {/* 💡 این بخش اکنون به درستی در JSX قرار گرفته است */}
                <p className="mt-4 text-center text-sm text-gray-600">
                    حساب کاربری ندارید؟ 
                    <button 
                        onClick={() => navigate('/register')} 
                        type="button" 
                        className="text-indigo-600 hover:text-indigo-800 font-medium mr-1"
                    >
                        ثبت نام کنید
                    </button>
                </p>

            </div>
        </div>
    );
};

export default LoginPage;