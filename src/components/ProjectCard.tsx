// src/components/ProjectCard.tsx


import React from 'react';
import { Link } from 'react-router-dom';
// 💡 حذف شده: دیگر نیازی به این خط نیست.
// import { Project } from '../types/models.ts'; 

interface Props {
    project: Project; // 💡 Project اکنون به صورت Global تعریف شده است.
}
const ProjectCard: React.FC<Props> = ({ project }) => {
    // پیاده‌سازی Tailwind
    const totalTasks = project.tasks?.length || 0;
    
    return (
        <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-6 border-t-4 border-indigo-600">
            
            <h3 className="text-xl font-bold text-gray-900 mb-2">{project.name}</h3>
            
            <p className="text-sm text-gray-500 mb-4">تعداد تسک‌ها: {totalTasks}</p>
            
            {/* Progress Bar */}
            <div className="h-2 bg-gray-200 rounded-full mb-4">
                <div className="h-2 bg-indigo-500 rounded-full" style={{ width: '40%' }}></div>
            </div>
            
            {/* لینک مشاهده جزئیات */}
            <div className="mt-4 pt-3 border-t border-gray-100">
                 <Link 
                    to={`/projects/${project.id}`} 
                    className="text-indigo-600 hover:text-indigo-800 font-medium transition duration-150"
                >
                    مشاهده جزئیات
                </Link>
            </div>
        </div>
    );
};

export default ProjectCard;