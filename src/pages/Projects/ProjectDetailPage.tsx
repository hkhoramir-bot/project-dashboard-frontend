// src/pages/Projects/ProjectDetailPage.tsx

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ProjectService } from '../../services/project.service';
import { Project } from '../../types/models';

const ProjectDetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [project, setProject] = useState<Project | null>(null);

    useEffect(() => {
        if (id) {
            ProjectService.getProjectById(id).then(setProject).catch(console.error);
        }
    }, [id]);

    if (!project) return <div>در حال بارگذاری جزئیات پروژه...</div>;

    return (
        <div style={{ padding: '20px' }}>
            <h1>پروژه: {project.name}</h1>
            <div style={{ display: 'flex', gap: '20px' }}>
                {/* ستون‌های کانبان (نمای ساده فعلاً) */}
                <div style={{ flex: 1, background: '#f4f4f4', padding: '10px' }}>
                    <h3>To Do</h3>
                    {/* لیست تسک‌ها اینجا قرار می‌گیرد */}
                </div>
                <div style={{ flex: 1, background: '#f4f4f4', padding: '10px' }}>
                    <h3>In Progress</h3>
                </div>
                <div style={{ flex: 1, background: '#f4f4f4', padding: '10px' }}>
                    <h3>Done</h3>
                </div>
            </div>
        </div>
    );
};

export default ProjectDetailPage;