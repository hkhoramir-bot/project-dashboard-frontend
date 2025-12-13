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
            await AuthService.register(formData.name, formData.email, formData.password, formData.role);
            alert('ثبت‌نام با موفقیت انجام شد. حالا وارد شوید.');
            navigate('/login');
        } catch (err) {
            alert('خطا در ثبت‌نام');
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