// src/pages/Dashboard/DashboardPage.tsx

import React, { useEffect, useState } from 'react';
// ✅ اصلاح شد: از Named Import استفاده کنید
import { ProjectService } from '../../services/project.service'; 
// import { Project } from '../../types/models'; // فرض بر وجود این نوع داده است

const DashboardPage: React.FC = () => {
    // ... (وضعیت‌های state) ...
    const [projects, setProjects] = useState<Project[]>([]); // فرض بر تعریف نوع Project
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                // ✅ اکنون ProjectService.getProjects یک تابع قابل فراخوانی است
                const data = await ProjectService.getProjects(); 
                setProjects(data);
                setError(null);
            } catch (err) {
                // با توجه به خطاهای 500 قبلی، اینجا بهتر است پیام خطا نمایش داده شود
                setError('خطا در بارگذاری پروژه‌ها. (سرور 500 یا 401). لطفا بک‌اند را بررسی کنید.');
                console.error("Error fetching projects:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchProjects();
    }, []);

    if (loading) return (
        <div className="p-8 text-center text-indigo-600">در حال بارگذاری...</div>
    );
    if (error) return (
        <div className="p-8 m-8 bg-red-100 text-red-700 rounded-xl border border-red-200">
            {error}
        </div>
    );

    return (
        <div className="p-8 font-sans rtl" dir="rtl">
            <h1 className="text-3xl font-black text-gray-900 mb-6">داشبورد پروژه‌ها</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map(project => (
                    <ProjectCard key={project.id} project={project} />
                ))}
            </div>
            {projects.length === 0 && (
                <div className="text-center p-10 bg-white rounded-xl shadow-lg mt-8">
                    <p className="text-gray-500">پروژه‌ای برای نمایش وجود ندارد. با کلیک بر روی 'ایجاد پروژه' شروع کنید.</p>
                </div>
            )}
        </div>
    );
};

// ⚠️ نیاز به ایمپورت ProjectCard در اینجا
import ProjectCard from '../../components/ProjectCard';

export default DashboardPage;