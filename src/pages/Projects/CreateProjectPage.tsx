// src/pages/Projects/CreateProjectPage.tsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ProjectService } from '../../services/project.service';

const CreateProjectPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    startDate: '',
    endDate: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  // ⚡️ کنترل تغییرات فرم
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ⚡️ ارسال فرم
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await ProjectService.createProject({
        name: formData.name,
        description: formData.description,
        startDate: formData.startDate,
        endDate: formData.endDate,
      });

      alert('پروژه با موفقیت ایجاد شد.');
      navigate('/'); // ⚡️ بازگشت به داشبورد یا صفحه اصلی
    } catch (err: any) {
      console.error('Project Creation Error:', err);
      const apiMessage =
        err.response?.data?.message ||
        err.message ||
        'خطا در ارتباط با سرور. مطمئن شوید مسیر و متد POST در بک‌اند درست است.';
      setError(`خطا در ایجاد پروژه: ${apiMessage}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 bg-gray-100 min-h-full font-sans rtl" dir="rtl">
      <div className="max-w-4xl mx-auto bg-white p-10 rounded-3xl shadow-2xl border border-gray-200">
        <h1 className="text-3xl font-black text-gray-900 mb-2">تعریف پروژه جدید</h1>
        <p className="text-gray-500 mb-8">تمام جزئیات لازم برای راه‌اندازی پروژه را وارد کنید.</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="p-4 bg-red-100 text-red-700 rounded-xl text-sm border border-red-200">
              {error}
            </div>
          )}

          {/* نام پروژه */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              نام پروژه
            </label>
            <input
              type="text"
              name="name"
              id="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="نام پروژه..."
              className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:ring-indigo-500 focus:border-indigo-500 transition-all"
            />
          </div>

          {/* توضیحات */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              توضیحات
            </label>
            <textarea
              name="description"
              id="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              required
              placeholder="شرح اهداف و محدوده پروژه..."
              className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:ring-indigo-500 focus:border-indigo-500 transition-all"
            ></textarea>
          </div>

          {/* تاریخ‌ها */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-1">
                تاریخ شروع
              </label>
              <input
                type="date"
                name="startDate"
                id="startDate"
                value={formData.startDate}
                onChange={handleChange}
                required
                className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:ring-indigo-500 focus:border-indigo-500 transition-all"
              />
            </div>
            <div>
              <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-1">
                تاریخ پایان مورد انتظار
              </label>
              <input
                type="date"
                name="endDate"
                id="endDate"
                value={formData.endDate}
                onChange={handleChange}
                required
                className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:ring-indigo-500 focus:border-indigo-500 transition-all"
              />
            </div>
          </div>

          {/* دکمه ارسال */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-xl font-bold text-lg shadow-lg shadow-indigo-200 transition-all active:scale-98 ${
              loading ? 'bg-indigo-400 cursor-not-allowed' : 'bg-indigo-600 text-white hover:bg-indigo-700'
            }`}
          >
            {loading ? 'در حال ارسال...' : 'ایجاد و ذخیره پروژه'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateProjectPage;
