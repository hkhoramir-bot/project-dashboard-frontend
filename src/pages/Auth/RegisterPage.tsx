// src/pages/Auth/RegisterPage.tsx

import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthService } from '../../services/auth.service';

const RegisterPage: React.FC = () => {
    // role: 'USER' به عنوان نقش پیش فرض
    const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'USER' });
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            // ✅ اصلاح کلیدی: ارسال شیء formData به صورت کامل به متد register
            await AuthService.register(formData); 
            
            alert('ثبت‌نام با موفقیت انجام شد. حالا وارد شوید.');
            navigate('/login');
        } catch (err) {
            console.error('Registration Error:', err); // بهتر است خطا را لاگ کنیم
            alert('خطا در ثبت‌نام. (اطلاعات را بررسی کنید یا ممکن است ایمیل تکراری باشد.)');
        }
    };

    return (
        <div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px', border: '1px solid #ddd' }}>
            <h2>ثبت‌نام در سامانه</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="نام" onChange={e => setFormData({...formData, name: e.target.value})} required /><br/><br/>
                <input type="email" placeholder="ایمیل" onChange={e => setFormData({...formData, email: e.target.value})} required /><br/><br/>
                <input type="password" placeholder="رمز عبور" onChange={e => setFormData({...formData, password: e.target.value})} required /><br/><br/>
                <select onChange={e => setFormData({...formData, role: e.target.value})}>
                    <option value="USER">عضو تیم</option>
                    <option value="ADMIN">مدیر پروژه</option>
                </select><br/><br/>
                <button type="submit">ایجاد حساب</button>
            </form>
            <p>حساب دارید؟ <Link to="/login">وارد شوید</Link></p>
        </div>
    );
};

export default RegisterPage;