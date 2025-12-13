// src/pages/Dashboard/DashboardPage.tsx

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // 💡 ایمپورت useNavigate برای مسیریابی
import { Project } from '../../types/models';
import { ProjectService } from '../../services/project.service';
import ProjectCard from '../../components/ProjectCard';

const DashboardPage: React.FC = () => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate(); // 💡 تعریف useNavigate

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                // 💡 فرض می‌کنیم getAllProjects در ProjectService وجود دارد.
                const data = await ProjectService.getAllProjects();
                setProjects(data);
            } catch (err) {
                // اگر خطا 401 باشد، کاربر را به صفحه ورود هدایت می‌کنیم
                // اگرچه ProtectedRoute باید این کار را انجام دهد، اما اینجا برای اطمینان بیشتر است.
                if (err && (err as any).response?.status === 401) {
                    setError('نشست کاربری منقضی شده است. لطفا مجدداً وارد شوید.');
                    // navigate('/login'); // اگرچه ProtectedRoute این را هندل می‌کند، بهتر است اینجا فقط خطا نمایش داده شود.
                } else {
                    setError('خطا در دریافت لیست پروژه‌ها. (اتصال API را بررسی کنید)');
                }
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchProjects();
    }, []);

    // 💡 پیاده‌سازی متد هدایت به صفحه ایجاد پروژه
    const handleCreateNewProject = () => {
        navigate('/projects/new');
    };

    if (loading) {
        // 💡 استایل‌دهی Tailwind برای حالت بارگذاری
        return <div className="text-center py-10 text-lg text-indigo-600">در حال بارگذاری پروژه‌ها...</div>;
    }
    
    if (error) {
        // 💡 استایل‌دهی Tailwind برای خطا
        return <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg mx-auto max-w-lg mt-10 text-center">{error}</div>;
    }

    return (
        <div className="p-6 bg-gray-50 min-h-full">
            <header className="flex justify-between items-center pb-6 border-b border-gray-200 mb-8">
                {/* 💡 استفاده از کلاس‌های Tailwind برای سایز و فونت */}
                <h1 className="text-3xl font-extrabold text-gray-900">داشبورد پروژه‌ها</h1>
                
                {/* 💡 اتصال دکمه به مسیر ایجاد پروژه و استفاده از کلاس‌های Tailwind */}
                <button 
                    onClick={handleCreateNewProject}
                    className="px-6 py-2 bg-indigo-600 text-white rounded-lg font-semibold shadow-md hover:bg-indigo-700 transition duration-150 transform hover:scale-105"
                >
                    + پروژه جدید
                </button>
            </header>

            {/* 💡 نمایش کارت‌های پروژه */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {projects.length > 0 ? (
                    projects.map(project => (
                        <ProjectCard key={project.id} project={project} />
                    ))
                ) : (
                    // 💡 پیام نمایش داده شده در صورت عدم وجود پروژه
                    <p className="col-span-full text-center text-gray-500 p-10 border border-dashed rounded-lg bg-white shadow-sm">
                        هیچ پروژه‌ای یافت نشد. اولین پروژه خود را ایجاد کنید!
                    </p>
                )}
            </div>
        </div>
    );
};

export default DashboardPage;