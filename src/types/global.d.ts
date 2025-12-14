// src/types/global.d.ts

interface Role {
    USER: 'USER';
    ADMIN: 'ADMIN';
}

interface User {
    id: number;
    name: string;
    email: string;
    role: Role['USER'] | Role['ADMIN']; 
}

interface TaskStatus {
    TO_DO: 'TO_DO';
    IN_PROGRESS: 'IN_PROGRESS';
    DONE: 'DONE';
}

interface TaskPriority {
    Low: 'Low';
    Medium: 'Medium';
    High: 'High';
}

interface Task {
    id: number;
    title: string;
    userId: number;
    projectId: number;
    status: TaskStatus['TO_DO'] | TaskStatus['IN_PROGRESS'] | TaskStatus['DONE'];
    priority: TaskPriority['Low'] | TaskPriority['Medium'] | TaskPriority['High'];
    deadline: string;
}

interface Project {
    id: number;
    name: string;
    tasks: Task[];
    // اضافه کردن فیلدهای دیگر مانند start_date, status
}