// src/pages/Dashboard/DashboardPage.tsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ProjectService } from '../../services/project.service';
import ProjectCard from '../../components/ProjectCard';

const DashboardPage: React.FC = () => {
    const [projects, setProjects] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        ProjectService.getProjects()
            .then(data => setProjects(data))
            .finally(() => setLoading(false));
    }, []);

    return (
        <div className="p-8 bg-slate-50 min-h-screen font-sans rtl" dir="rtl">
            <header className="flex flex-col md:flex-row justify-between items-center bg-white p-6 rounded-3xl shadow-sm mb-10 gap-4 border border-gray-100">
                <div>
                    <h1 className="text-3xl font-black text-gray-900">میز کار من</h1>
                    <p className="text-gray-500 mt-1">مدیریت و نظارت بر پروژه‌های فعال</p>
                </div>
                <button 
                    onClick={() => navigate('/projects/new')}
                    className="px-8 py-3 bg-indigo-600 text-white rounded-2xl font-bold shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all transform hover:-translate-y-1"
                >
                    + تعریف پروژه جدید
                </button>
            </header>

            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-indigo-600"></div>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.length > 0 ? (
                        projects.map(p => <ProjectCard key={p.id} project={p} />)
                    ) : (
                        <div className="col-span-full bg-white border-2 border-dashed border-gray-200 rounded-3xl p-16 text-center">
                            <div className="text-6xl mb-4">📂</div>
                            <p className="text-xl text-gray-400 font-bold">هنوز هیچ پروژه‌ای ثبت نکرده‌اید</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};
export default DashboardPage;