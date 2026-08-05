export type ScreenType = 'login' | 'register' | 'home' | 'activity' | 'score' | 'profile';

export interface User {
  id: string;
  studentId: string;
  fullName: string;
  email: string;
  faculty: string;
  avatarUrl: string;
  level: number;
  totalXp: number;
  maxXp: number;
  grade: string;
  rankTitle: string;
  gpa: number;
  attendanceRate: number;
  completedTasks: number;
  totalTasks: number;
}

export interface ClassSession {
  id: string;
  code: string;
  title: string;
  instructor: string;
  time: string;
  location: string;
  status: 'กำลังเรียน' | 'ถัดไป' | 'เสร็จสิ้น';
  day: string;
}

export interface AttendanceRecord {
  id: string;
  courseCode: string;
  courseName: string;
  date: string;
  time: string;
  status: 'เข้าเรียน' | 'สาย' | 'ขาดเรียน';
  lateMinutes?: number;
}

export interface Assignment {
  id: string;
  title: string;
  courseCode: string;
  courseName: string;
  dueDate: string;
  dueTimestampText: string;
  isUrgent?: boolean;
  score?: string;
  maxScore?: number;
  status: 'ยังไม่ส่ง' | 'ส่งแล้ว' | 'รอตรวจ' | 'ตรวจแล้ว';
  teacherFeedback?: string;
  submissionLink?: string;
  submittedAt?: string;
}

export interface QAQuestion {
  id: number;
  text: string;
  timeAgo: string;
  votes: number;
  userVoted: boolean;
  createdAt: Date;
}

export interface MicroTask {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  submittedUrl?: string;
  isSubmitted: boolean;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: 'class' | 'grade' | 'task' | 'system';
}
