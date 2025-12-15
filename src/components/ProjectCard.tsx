// src/components/ProjectCard.tsx

import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, CheckCircle2, Users } from 'lucide-react'; // 💡 آیکون‌های جدید برای جزئیات

// ✅ تعریف نوع Project برای رفع خطای "Project is not defined"
interface Project {
    id: string;
    name: string;
    status: 'ACTIVE' | 'PENDING' | 'COMPLETED' | 'CANCELED';
    startDate: string; // تاریخ شروع (مثلاً ISO string)
    endDate: string; // تاریخ پایان
    progress: number; // درصد پیشرفت (۰ تا ۱۰۰)
    tasks: { id: string }[];
    team: { id: string }[];
}

interface Props {
    project: Project;
}

// 💡 تابع کمکی برای تعیین رنگ وضعیت
const getStatusBadge = (status: Project['status']) => {
    switch (status) {
        case 'ACTIVE':
            return { text: 'فعال', color: 'bg-green-100 text-green-700' };
        case 'PENDING':
            return { text: 'در انتظار', color: 'bg-yellow-100 text-yellow-700' };
        case 'COMPLETED':
            return { text: 'تکمیل شده', color: 'bg-indigo-100 text-indigo-700' };
        default:
            return { text: 'سایر', color: 'bg-gray-100 text-gray-600' };
    }
};

const ProjectCard: React.FC<Props> = ({ project }) => {
    
    const totalTasks = project.tasks?.length || 0;
    const progressPercentage = project.progress || 0; // استفاده از فیلد progress جدید
    const statusBadge = getStatusBadge(project.status);

    return (
        <div className="bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 p-6 border border-gray-100 hover:border-indigo-200">
            
            {/* عنوان و وضعیت */}
            <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-extrabold text-gray-900 leading-tight">{project.name}</h3>
                <span className={`px-3 py-1 text-xs font-semibold rounded-full ${statusBadge.color}`}>
                    {statusBadge.text}
                </span>
            </div>
            
            {/* جزئیات کلیدی */}
            <div className="grid grid-cols-2 gap-y-3 gap-x-4 text-sm text-gray-600 mb-5 border-b pb-4 border-gray-100">
                
                <div className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-indigo-500" />
                    <span>تسک‌ها: **{totalTasks}**</span>
                </div>
                
                <div className="flex items-center gap-2">
                    <Users size={16} className="text-indigo-500" />
                    <span>تیم: **{project.team?.length || 0} نفر**</span>
                </div>
                
                <div className="flex items-center gap-2">
                    <Calendar size={16} className="text-gray-400" />
                    <span>شروع: {project.startDate ? new Date(project.startDate).toLocaleDateString('fa-IR') : '-'}</span>
                </div>
                 
                <div className="flex items-center gap-2">
                    <Calendar size={16} className="text-gray-400" />
                    <span>پایان: {project.endDate ? new Date(project.endDate).toLocaleDateString('fa-IR') : '-'}</span>
                </div>
                
            </div>
            
            {/* Progress Bar مدرن */}
            <div className="mb-5">
                <div className="flex justify-between items-center text-xs font-medium text-gray-500 mb-1">
                    <span>پیشرفت</span>
                    <span className="text-indigo-600 font-bold">{progressPercentage}%</span>
                </div>
                <div className="h-2.5 bg-gray-200 rounded-full">
                    <div 
                        className="h-2.5 bg-indigo-600 rounded-full transition-all duration-500" 
                        style={{ width: `${progressPercentage}%` }}
                    ></div>
                </div>
            </div>
            
            {/* لینک مشاهده جزئیات */}
            <div className="mt-4 pt-4 border-t border-gray-100 text-right">
                <Link 
                    to={`/projects/${project.id}`} 
                    className="inline-flex items-center gap-1 text-indigo-600 font-bold hover:text-indigo-800 transition duration-150"
                >
                    مشاهده پروژه
                    <span className="mr-1 text-lg">←</span>
                </Link>
            </div>
        </div>
    );
};

export default ProjectCard;