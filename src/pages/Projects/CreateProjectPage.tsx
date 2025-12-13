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

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            await ProjectService.createProject(
                formData.name,
                formData.description,
                new Date(formData.startDate),
                new Date(formData.endDate)
            );
            
            alert('پروژه با موفقیت ایجاد شد.');
            navigate('/'); // هدایت به داشبورد پس از ایجاد موفقیت‌آمیز
        } catch (err) {
            setError('خطا در ایجاد پروژه. لطفاً دوباره تلاش کنید.');
            console.error('Project Creation Error:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-lg">
            <h1 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-3">ایجاد پروژه جدید</h1>
            
            <form onSubmit={handleSubmit} className="space-y-6">
                
                {error && <div className="p-3 bg-red-100 text-red-700 rounded-lg">{error}</div>}

                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">نام پروژه</label>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                    />
                </div>

                <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">توضیحات</label>
                    <textarea
                        name="description"
                        id="description"
                        onChange={handleChange}
                        rows={4}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-1">تاریخ شروع</label>
                        <input
                            type="date"
                            name="startDate"
                            id="startDate"
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>
                    <div>
                        <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-1">تاریخ پایان مورد انتظار</label>
                        <input
                            type="date"
                            name="endDate"
                            id="endDate"
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>
                </div>
                
                <button
                    type="submit"
                    disabled={loading}
                    className={`w-full py-3 rounded-lg font-semibold shadow-md transition duration-150 ${
                        loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-indigo-600 text-white hover:bg-indigo-700'
                    }`}
                >
                    {loading ? 'در حال ارسال...' : 'ایجاد پروژه'}
                </button>
            </form>
        </div>
    );
};

export default CreateProjectPage;