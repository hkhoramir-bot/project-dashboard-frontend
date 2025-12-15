// src/pages/Projects/ProjectDetailPage.tsx (اصلاح شده به Tailwind)

import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ProjectService } from '../../services/project.service';
// import { Project } from '../../types/models'; // ✅ فرض می‌کنیم این ایمپورت درست است
import { ListChecks, Clock, Calendar, Users } from 'lucide-react'; // آیکون‌های جدید

// ⚠️ فرض می‌کنیم Project Model شبیه این است:
interface Project {
    id: string;
    name: string;
    description: string;
    status: string;
    startDate: string;
    endDate: string;
    tasks: { id: string, title: string, status: string }[];
}

const ProjectDetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [project, setProject] = useState<Project | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (id) {
            setLoading(true);
            ProjectService.getProjectById(Number(id))
                .then(data => {
                    setProject(data);
                    setError(null);
                })
                .catch(err => {
                    setError('خطا در بارگذاری جزئیات پروژه. شاید آیدی اشتباه باشد یا سرور خاموش است.');
                    console.error("Error fetching project:", err);
                })
                .finally(() => setLoading(false));
        }
    }, [id]);

    if (loading) return <div className="p-8 text-center text-indigo-600">در حال بارگذاری جزئیات پروژه...</div>;
    if (error) return <div className="p-8 text-center bg-red-100 text-red-700 rounded-xl m-8">{error}</div>;
    if (!project) return <div className="p-8 text-center text-gray-500">پروژه یافت نشد.</div>;

    // گروه‌بندی تسک‌ها بر اساس وضعیت
    const tasksByStatus = project.tasks.reduce((acc, task) => {
        const statusKey = task.status || 'To Do';
        if (!acc[statusKey]) {
            acc[statusKey] = [];
        }
        acc[statusKey].push(task);
        return acc;
    }, {} as Record<string, typeof project.tasks>);

    const statusColumns = ['To Do', 'In Progress', 'Done']; // ترتیب ستون‌ها

    return (
        <div className="p-8 bg-gray-100 min-h-full font-sans rtl" dir="rtl">
            
            {/* ⏫ هدر پروژه */}
            <header className="bg-white p-6 rounded-3xl shadow-xl mb-8 border border-gray-200">
                <h1 className="text-4xl font-black text-gray-900 mb-2">{project.name}</h1>
                <p className="text-gray-500 mb-4">{project.description}</p>
                
                {/* 💡 وضعیت و تاریخ‌ها */}
                <div className="flex items-center gap-6 text-sm text-gray-600 border-t pt-4 mt-4">
                    <span className="flex items-center gap-2 bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full font-medium">
                        <ListChecks size={16} /> وضعیت: {project.status}
                    </span>
                    <span className="flex items-center gap-2">
                        <Calendar size={16} /> شروع: {new Date(project.startDate).toLocaleDateString('fa-IR')}
                    </span>
                    <span className="flex items-center gap-2">
                        <Clock size={16} /> پایان: {new Date(project.endDate).toLocaleDateString('fa-IR')}
                    </span>
                </div>
            </header>

            {/* 🗺️ نمای کانبان (Kanban Board) */}
            <div className="flex gap-6 overflow-x-auto pb-4">
                {statusColumns.map((status) => (
                    <div 
                        key={status}
                        className="flex-shrink-0 w-80 bg-white rounded-xl shadow-lg border border-gray-200 p-4"
                    >
                        {/* هدر ستون */}
                        <h3 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">
                            {status} 
                            <span className="bg-gray-200 text-gray-700 text-xs px-2 py-0.5 rounded-full mr-2">
                                {(tasksByStatus[status] || []).length}
                            </span>
                        </h3>
                        
                        {/* لیست تسک‌ها */}
                        <div className="space-y-4 min-h-[50px]">
                            {(tasksByStatus[status] || []).map(task => (
                                <div key={task.id} className="p-4 bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition cursor-pointer">
                                    <p className="font-medium text-gray-800">{task.title}</p>
                                    <span className="text-xs text-indigo-500 mt-1 block">جزئیات تسک...</span>
                                </div>
                            ))}
                            
                            {/* دکمه افزودن تسک */}
                            <button className="w-full text-indigo-500 hover:text-indigo-700 py-2 border-t border-dashed border-gray-300 mt-4 text-sm font-medium">
                                + افزودن تسک جدید
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProjectDetailPage;