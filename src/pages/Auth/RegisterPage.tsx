// src/pages/Auth/RegisterPage.tsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthService } from '../../services/auth.service';

const RegisterPage: React.FC = () => {
    const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'USER' });
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await AuthService.register(formData);
            alert('ثبت‌نام موفق! حالا وارد شوید.');
            navigate('/login');
        } catch (err) {
            alert('خطا در ثبت‌نام (احتمالاً ایمیل تکراری است)');
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-slate-50 font-sans rtl" dir="rtl">
            <div className="w-full max-w-md bg-white p-10 rounded-3xl shadow-xl border border-gray-100">
                <h2 className="text-3xl font-black text-gray-800 text-center mb-8">ایجاد حساب کاربری</h2>
                <form onSubmit={handleSubmit} className="space-y-5">
                    <input 
                        className="w-full px-5 py-3 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 outline-none transition-all"
                        type="text" placeholder="نام و نام خانوادگی" 
                        onChange={e => setFormData({...formData, name: e.target.value})} required 
                    />
                    <input 
                        className="w-full px-5 py-3 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 outline-none transition-all"
                        type="email" placeholder="آدرس ایمیل" 
                        onChange={e => setFormData({...formData, email: e.target.value})} required 
                    />
                    <input 
                        className="w-full px-5 py-3 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 outline-none transition-all"
                        type="password" placeholder="رمز عبور (حداقل ۶ کاراکتر)" 
                        onChange={e => setFormData({...formData, password: e.target.value})} required 
                    />
                    <select 
                        className="w-full px-5 py-3 border border-gray-200 rounded-2xl bg-white outline-none focus:ring-4 focus:ring-indigo-100"
                        onChange={e => setFormData({...formData, role: e.target.value})}
                    >
                        <option value="USER">عضو تیم پروژه</option>
                        <option value="ADMIN">مدیر ارشد پروژه</option>
                    </select>
                    <button type="submit" className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-bold text-lg shadow-lg shadow-indigo-200 hover:bg-indigo-700 active:scale-95 transition-all">
                        تأیید و ثبت نام
                    </button>
                </form>
                <p className="mt-8 text-center text-gray-500">
                    قبلاً ثبت‌نام کرده‌اید؟ <Link to="/login" className="text-indigo-600 font-bold hover:underline">وارد شوید</Link>
                </p>
            </div>
        </div>
    );
};
export default RegisterPage;