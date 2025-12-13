// src/types/models.ts
export type Role = 'USER' | 'ADMIN';

export interface User {
  id: number;
  name: string;
  email: string;
  role: Role;
}

export type TaskStatus = 'TO_DO' | 'IN_PROGRESS' | 'DONE';
export type TaskPriority = 'Low' | 'Medium' | 'High';

export interface Task {
  id: number;
  title: string;
  userId: number;       // کاربر تخصیص داده شده
  projectId: number;
  status: TaskStatus;
  priority: TaskPriority;
  deadline: string;     // تاریخ Deadline
}

export interface Project {
  id: number;
  name: string;
  tasks: Task[];
  // اضافه کردن فیلدهای دیگر مانند start_date, status
}