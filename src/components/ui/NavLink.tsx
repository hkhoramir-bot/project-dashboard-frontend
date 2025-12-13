// src/components/ui/NavLink.tsx

import React from 'react';
import { NavLink as RouterLink } from 'react-router-dom';

interface NavLinkProps {
    to: string;
    children: React.ReactNode;
    icon?: React.ReactNode; 
}

const NavLink: React.FC<NavLinkProps> = ({ to, children, icon }) => {
    return (
        <RouterLink
            to={to}
            className={({ isActive }) => 
                `flex items-center p-3 text-base rounded-lg transition-colors duration-200 
                ${isActive 
                    ? 'bg-indigo-600 text-white shadow-md' 
                    : 'text-gray-400 hover:bg-gray-700 hover:text-white'
                }`
            }
        >
            {icon && <span className="ml-3 text-xl">{icon}</span>}
            <span className="font-medium text-sm">{children}</span>
        </RouterLink>
    );
};

export default NavLink;