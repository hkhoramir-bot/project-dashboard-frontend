// src/components/ProjectCard.tsx

import React from 'react';
import { Link } from 'react-router-dom';
import { Project } from '../types/models';

interface Props {
    project: Project;
}

const ProjectCard: React.FC<Props> = ({ project }) => {
    return (
        <div style={{
            border: '1px solid #ddd',
            borderRadius: '8px',
            padding: '15px',
            marginBottom: '15px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
            <h3>{project.name}</h3>
            <p>تعداد تسک‌ها: {project.tasks?.length || 0}</p>
            {/* اینجا می‌توانیم Progress Bar اضافه کنیم */}
            <Link to={`/projects/${project.id}`}>مشاهده جزئیات</Link>
        </div>
    );
};

export default ProjectCard;