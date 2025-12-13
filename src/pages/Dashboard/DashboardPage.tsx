// src/pages/Dashboard/DashboardPage.tsx

import React, { useEffect, useState } from 'react';
import { Project } from '../../types/models';
import { ProjectService } from '../../services/project.service';
import ProjectCard from '../../components/ProjectCard';

const DashboardPage: React.FC = () => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const data = await ProjectService.getAllProjects();
                setProjects(data);
            } catch (err) {
                setError('خطا در دریافت لیست پروژه‌ها');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchProjects();
    }, []);

    if (loading) return <div>در حال بارگذاری پروژه‌ها...</div>;
    if (error) return <div style={{ color: 'red' }}>{error}</div>;

    return (
        <div style={{ padding: '20px' }}>
            <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h1>داشبورد پروژه‌ها</h1>
                <button style={{ padding: '10px 20px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '5px' }}>
                    + پروژه جدید
                </button>
            </header>

            <hr />

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px', marginTop: '20px' }}>
                {projects.length > 0 ? (
                    projects.map(project => (
                        <ProjectCard key={project.id} project={project} />
                    ))
                ) : (
                    <p>هیچ پروژه‌ای یافت نشد. اولین پروژه خود را ایجاد کنید!</p>
                )}
            </div>
        </div>
    );
};

export default DashboardPage;