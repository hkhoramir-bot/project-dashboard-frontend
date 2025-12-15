import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthService } from '../../services/auth.service';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false); // وضعیت ارسال
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      const result = await AuthService.login({ email, password });

      if (result.access_token) {
        navigate('/', { replace: true }); // ✅ هدایت به داشبورد
      } else {
        setError('ایمیل یا رمز عبور اشتباه است.');
      }
    } catch (err) {
      // این خطا معمولاً 401 است که در Interceptor مدیریت می‌شود، اما برای سایر خطاها
      const errorMessage = (err as any).response?.data?.message || 'خطا در ورود به سیستم. (اتصال اینترنت را بررسی کنید)';
      setError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-slate-50 font-sans rtl" dir="rtl">
      {/* Container */}
      <div className="w-full max-w-md bg-white p-10 rounded-3xl shadow-2xl border border-gray-100">
        <h2 className="text-3xl font-black text-gray-800 text-center mb-8">ورود به پنل</h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && <p className="p-3 bg-red-100 text-red-700 rounded-xl text-sm border border-red-200">{error}</p>}
          
          {/* Email Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">ایمیل</label>
            <input
              type="email"
              placeholder="example@domain.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-5 py-3 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 outline-none transition-all"
            />
          </div>
          
          {/* Password Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">رمز عبور</label>
            <input
              type="password"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-5 py-3 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 outline-none transition-all"
            />
          </div>
          
          {/* Submit Button */}
          <button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-bold text-lg shadow-lg shadow-indigo-200 hover:bg-indigo-700 active:scale-95 transition-all disabled:bg-indigo-400"
          >
            {isSubmitting ? 'در حال ورود...' : 'ورود به سیستم'}
          </button>
        </form>

        <p className="mt-8 text-center text-gray-500">
          حساب کاربری ندارید؟ 
          <Link 
            to="/register" 
            className="text-indigo-600 font-bold hover:underline mr-1"
          >
            ثبت نام کنید
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;