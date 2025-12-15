// src/pages/Dashboard/DashboardPage.tsx (با بهبودهای UI)

import React, { useEffect, useState } from 'react';
import ProjectCard from '../../components/ProjectCard'; // ✅ ایمپورت به بالا منتقل شد
import { ProjectService } from '../../services/project.service'; 
// import { Project } from '../../types/models'; // فرض بر وجود این نوع داده است

// 💡 برای UI بهتر، ProjectCard را اینجا import می‌کنیم
// ⚠️ شما باید مطمئن شوید که نوع داده Project تعریف شده باشد.
type Project = any; 

const DashboardPage: React.FC = () => {
    // ... (وضعیت‌های state) ...
    const [projects, setProjects] = useState<Project[]>([]); 
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const data = await ProjectService.getProjects(); 
                setProjects(data);
                setError(null);
            } catch (err: any) {
                let errorMessage = 'خطا در بارگذاری پروژه‌ها.';
                if (err.response?.status === 401 || err.response?.status === 403) {
                    errorMessage = '⚠️ دسترسی رد شد! برای مشاهده پروژه‌ها، مطمئن شوید که لاگین کرده‌اید و نقش مناسب دارید.';
                } else if (err.response?.status === 500) {
                    errorMessage = '❌ خطای سرور 500: مشکل در اتصال دیتابیس یا منطق بک‌اند.';
                }
                setError(errorMessage);
                console.error("Error fetching projects:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchProjects();
    }, []);

    // 💡 متد موقت برای هدایت به صفحه ایجاد پروژه
    const handleCreateProject = () => {
        // ⚠️ اینجا باید منطق مسیریابی شما به صفحه CreateProjectPage اجرا شود (مثلا با useNavigate)
        console.log("هدایت به صفحه ایجاد پروژه...");
    };

    if (loading) return (
        // Placeholder بارگذاری شیک‌تر
        <div className="p-8 font-sans rtl" dir="rtl">
            <h1 className="text-3xl font-black text-gray-900 mb-6">داشبورد پروژه‌ها</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
                {/* شبیه‌سازی کارت‌ها در حین بارگذاری */}
                <div className="bg-gray-100 h-48 rounded-2xl shadow-md"></div>
                <div className="bg-gray-100 h-48 rounded-2xl shadow-md"></div>
                <div className="bg-gray-100 h-48 rounded-2xl shadow-md"></div>
            </div>
        </div>
    );
    
    if (error) return (
        <div className="p-8 m-8 bg-red-100 text-red-700 rounded-xl border border-red-200">
            {error}
        </div>
    );

    return (
        <div className="p-8 font-sans rtl" dir="rtl">
            
            {/* ✅ بهبود Layout: عنوان و دکمه در کنار هم */}
            <div className="flex justify-between items-center mb-8 pb-4 border-b border-gray-200">
                <h1 className="text-3xl font-extrabold text-gray-800">📊 داشبورد پروژه‌ها</h1>
                <button
                    onClick={handleCreateProject}
                    className="flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-xl transition duration-300 shadow-lg shadow-indigo-200 focus:outline-none focus:ring-4 focus:ring-indigo-300"
                >
                    <svg className="w-5 h-5 rtl:mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
                    <span>ایجاد پروژه جدید</span>
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {projects.map(project => (
                    // ⚠️ فرض بر این است که ProjectCard طراحی جذابی دارد
                    <ProjectCard key={project.id} project={project} /> 
                ))}
            </div>

            {/* ✅ بهبود پیام نبود پروژه */}
            {projects.length === 0 && (
                <div className="text-center p-16 bg-white rounded-2xl shadow-xl border border-gray-100 mt-12">
                    <svg className="w-16 h-16 mx-auto text-indigo-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-3-3v6M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path></svg>
                    <p className="text-2xl font-semibold text-gray-700 mb-3">هنوز پروژه‌ای ایجاد نشده است!</p>
                    <p className="text-gray-500 mb-6">به نظر می‌رسد زمان شروع کار است. اولین پروژه خود را ایجاد کنید.</p>
                    <button
                        onClick={handleCreateProject}
                        className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-6 rounded-xl transition duration-300 shadow-md shadow-green-200"
                    >
                        شروع کنید: ایجاد پروژه
                    </button>
                </div>
            )}
        </div>
    );
};

export default DashboardPage;