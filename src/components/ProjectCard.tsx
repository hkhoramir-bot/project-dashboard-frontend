// src/components/ProjectCard.tsx (نسخه نهایی با طراحی جذاب‌تر)

import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, CheckCircle2, Users, AlertTriangle } from 'lucide-react'; // 💡 اضافه کردن آیکون هشدار برای Pending

// ✅ تعریف نوع Project
interface Project {
    id: string;
    name: string;
    status: 'ACTIVE' | 'PENDING' | 'COMPLETED' | 'CANCELED';
    startDate: string; 
    endDate: string; 
    progress: number; 
    tasks: { id: string }[];
    team: { id: string }[];
}

interface Props {
    project: Project;
}

// 💡 تابع کمکی برای تعیین رنگ وضعیت (با رنگ‌های پررنگ‌تر)
const getStatusBadge = (status: Project['status']) => {
    switch (status) {
        case 'ACTIVE':
            return { text: 'فعال', color: 'bg-green-500 text-white', icon: CheckCircle2 };
        case 'PENDING':
            return { text: 'در انتظار', color: 'bg-yellow-500 text-white', icon: AlertTriangle };
        case 'COMPLETED':
            return { text: 'تکمیل شده', color: 'bg-indigo-600 text-white', icon: CheckCircle2 };
        case 'CANCELED':
            return { text: 'لغو شده', color: 'bg-red-500 text-white', icon: AlertTriangle };
        default:
            return { text: 'سایر', color: 'bg-gray-400 text-white', icon: CheckCircle2 };
    }
};

const ProjectCard: React.FC<Props> = ({ project }) => {
    
    const totalTasks = project.tasks?.length || 0;
    const progressPercentage = Math.min(100, project.progress || 0); 
    const statusBadge = getStatusBadge(project.status);

    // 💡 تعیین رنگ Progress Bar بر اساس درصد
    const progressColor = progressPercentage === 100 ? 'bg-green-600' : 'bg-indigo-600';
    
    // 💡 آیکون وضعیت
    const StatusIcon = statusBadge.icon; 

    return (
        <div className="relative bg-white rounded-3xl shadow-2xl hover:shadow-indigo-300/50 transition-all duration-500 p-6 border border-gray-100 cursor-pointer overflow-hidden transform hover:-translate-y-1">
            
            {/* ✅ خط رنگی در بالای کارت */}
            <div className={`absolute top-0 right-0 left-0 h-2 rounded-t-3xl ${statusBadge.color}`}></div>

            {/* عنوان و وضعیت */}
            <div className="flex justify-between items-start mb-4 pt-2">
                <h3 className="text-xl font-extrabold text-gray-900 leading-snug">{project.name}</h3>
                
                {/* ✅ بهبود ظاهر Badge */}
                <span className={`flex items-center gap-1 px-3 py-1 text-xs font-bold rounded-full shadow-md ${statusBadge.color}`}>
                    <StatusIcon size={12} className="text-white"/>
                    {statusBadge.text}
                </span>
            </div>
            
            {/* جزئیات کلیدی */}
            <div className="grid grid-cols-2 gap-y-3 gap-x-4 text-sm text-gray-600 mb-5 border-b pb-4 border-gray-100">
                
                <div className="flex items-center gap-2 font-semibold">
                    <CheckCircle2 size={16} className="text-indigo-500" />
                    <span>تسک‌ها: <span className="text-gray-800">{totalTasks}</span></span>
                </div>
                
                <div className="flex items-center gap-2 font-semibold">
                    <Users size={16} className="text-indigo-500" />
                    <span>تیم: <span className="text-gray-800">{project.team?.length || 0} نفر</span></span>
                </div>
                
                <div className="flex items-center gap-2 text-xs">
                    <Calendar size={16} className="text-gray-400" />
                    <span dir="ltr">شروع: {project.startDate ? new Date(project.startDate).toLocaleDateString('fa-IR') : '-'}</span>
                </div>
                    
                <div className="flex items-center gap-2 text-xs">
                    <Calendar size={16} className="text-gray-400" />
                    <span dir="ltr">پایان: {project.endDate ? new Date(project.endDate).toLocaleDateString('fa-IR') : '-'}</span>
                </div>
                
            </div>
            
            {/* Progress Bar مدرن و پویا */}
            <div className="mb-5">
                <div className="flex justify-between items-center text-xs font-medium text-gray-500 mb-1">
                    <span>پیشرفت</span>
                    <span className={`font-bold ${progressPercentage === 100 ? 'text-green-600' : 'text-indigo-600'}`}>
                        {progressPercentage}%
                    </span>
                </div>
                <div className="h-2.5 bg-gray-200 rounded-full">
                    <div 
                        className={`h-2.5 rounded-full transition-all duration-500 ease-out ${progressColor}`} 
                        style={{ width: `${progressPercentage}%` }}
                    ></div>
                </div>
            </div>
            
            {/* لینک مشاهده جزئیات */}
            <div className="mt-4 pt-4 border-t border-gray-100 text-right">
                <Link 
                    to={`/projects/${project.id}`} 
                    className="inline-flex items-center gap-1 text-indigo-700 font-extrabold hover:text-indigo-900 transition duration-150"
                >
                    مشاهده جزئیات
                    <span className="rtl:mr-1 text-lg">←</span>
                </Link>
            </div>
        </div>
    );
};

export default ProjectCard;