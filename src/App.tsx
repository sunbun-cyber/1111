import React, { useState } from 'react';
import {
  ScreenType,
  User,
  ClassSession,
  AttendanceRecord,
  Assignment,
  QAQuestion,
  MicroTask,
  NotificationItem,
} from './types';
import {
  INITIAL_USER,
  INITIAL_CLASSES,
  INITIAL_ATTENDANCE_HISTORY,
  INITIAL_ASSIGNMENTS,
  INITIAL_QUESTIONS,
  INITIAL_MICRO_TASK,
  INITIAL_NOTIFICATIONS,
} from './data';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { LoginScreen } from './components/LoginScreen';
import { RegisterScreen } from './components/RegisterScreen';
import { HomeScreen } from './components/HomeScreen';
import { ActivityScreen } from './components/ActivityScreen';
import { ScoreScreen } from './components/ScoreScreen';
import { ProfileScreen } from './components/ProfileScreen';
import { ScheduleModal } from './components/ScheduleModal';
import { NotificationModal } from './components/NotificationModal';
import { AssignmentModal } from './components/AssignmentModal';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('home');

  // Core state
  const [user, setUser] = useState<User>(INITIAL_USER);
  const [classes] = useState<ClassSession[]>(INITIAL_CLASSES);
  const [attendanceHistory, setAttendanceHistory] = useState<AttendanceRecord[]>(
    INITIAL_ATTENDANCE_HISTORY
  );
  const [assignments, setAssignments] = useState<Assignment[]>(INITIAL_ASSIGNMENTS);
  const [questions, setQuestions] = useState<QAQuestion[]>(INITIAL_QUESTIONS);
  const [microTask, setMicroTask] = useState<MicroTask>(INITIAL_MICRO_TASK);
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);

  // Modals state
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [isNotificationModalOpen, setIsNotificationModalOpen] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState<Assignment | null>(null);

  // Toast alert feedback state
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  // Auth Handlers
  const handleLogin = (studentId: string) => {
    setIsLoggedIn(true);
    setUser((prev) => ({
      ...prev,
      studentId: studentId || prev.studentId,
    }));
    setCurrentScreen('home');
    showToast(`เข้าสู่ระบบสำเร็จ! ยินดีต้อนรับนักศึกษา ${studentId}`);
  };

  const handleRegisterSuccess = (data: { studentId: string; fullName: string; email: string }) => {
    setUser((prev) => ({
      ...prev,
      studentId: data.studentId,
      fullName: data.fullName,
      email: data.email,
    }));
    setIsLoggedIn(true);
    setCurrentScreen('home');
    showToast('สร้างบัญชีสำเร็จ! ยินดีต้อนรับสู่ ClassPulse');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentScreen('login');
    showToast('ออกจากระบบเรียบร้อยแล้ว');
  };

  // Home Screen Handlers
  const handleAddAttendance = (newRecord: AttendanceRecord) => {
    setAttendanceHistory((prev) => [newRecord, ...prev]);

    // Reward XP for checking in
    setUser((prev) => {
      const newXp = prev.totalXp + 20;
      return {
        ...prev,
        totalXp: newXp,
      };
    });

    // Add notification
    setNotifications((prev) => [
      {
        id: `notif-${Date.now()}`,
        title: 'เช็กชื่อสำเร็จ!',
        message: `คุณได้เช็กชื่อเข้าเรียนวิชา ${newRecord.courseCode} (${newRecord.time})`,
        time: 'เมื่อครู่นี้',
        read: false,
        type: 'class',
      },
      ...prev,
    ]);

    showToast('เช็กชื่อสำเร็จ! (+20 XP)');
  };

  // Activity Screen Handlers
  const handleAddQuestion = (text: string) => {
    const newQ: QAQuestion = {
      id: Date.now(),
      text,
      timeAgo: 'เมื่อครู่นี้',
      votes: 1,
      userVoted: true,
      createdAt: new Date(),
    };
    setQuestions((prev) => [newQ, ...prev]);
    showToast('ส่งคำถามเรียบร้อยแล้ว');
  };

  const handleToggleVoteQuestion = (qId: number) => {
    setQuestions((prev) =>
      prev.map((q) => {
        if (q.id === qId) {
          const updatedUserVoted = !q.userVoted;
          const updatedVotes = updatedUserVoted ? q.votes + 1 : Math.max(0, q.votes - 1);
          return {
            ...q,
            userVoted: updatedUserVoted,
            votes: updatedVotes,
          };
        }
        return q;
      })
    );
  };

  const handleSubmitMicroTask = (url: string) => {
    setMicroTask((prev) => ({
      ...prev,
      submittedUrl: url,
      isSubmitted: true,
    }));

    // Reward XP
    setUser((prev) => ({
      ...prev,
      totalXp: prev.totalXp + 30,
      completedTasks: prev.completedTasks + 1,
    }));

    showToast('ส่งงานย่อย Micro-Task เรียบร้อย! (+30 XP)');
  };

  // Assignment Modal Handler
  const handleSubmitAssignment = (assignmentId: string, link: string) => {
    setAssignments((prev) =>
      prev.map((asg) => {
        if (asg.id === assignmentId) {
          return {
            ...asg,
            status: 'รอตรวจ',
            submissionLink: link,
            submittedAt: 'เมื่อครู่นี้',
            dueTimestampText: 'ส่งแล้ว เมื่อครู่นี้',
          };
        }
        return asg;
      })
    );

    setUser((prev) => ({
      ...prev,
      totalXp: prev.totalXp + 50,
      completedTasks: prev.completedTasks + 1,
    }));

    showToast('บันทึกการส่งงานเรียบร้อยแล้ว (+50 XP)');
  };

  const handleMarkAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    showToast('อ่านการแจ้งเตือนทั้งหมดแล้ว');
  };

  const currentClass = classes[0];

  // If not logged in, show Auth screens
  if (!isLoggedIn) {
    if (currentScreen === 'register') {
      return (
        <RegisterScreen
          onRegisterSuccess={handleRegisterSuccess}
          onGoToLogin={() => setCurrentScreen('login')}
        />
      );
    }
    return (
      <LoginScreen
        onLogin={handleLogin}
        onGoToRegister={() => setCurrentScreen('register')}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#f7f9fb] text-[#191c1e] flex flex-col items-center justify-start relative">
      {/* Toast Alert Popup */}
      {toastMessage && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-[100] bg-[#00236f] text-white px-5 py-3 rounded-2xl shadow-xl flex items-center gap-2 text-[14px] font-semibold animate-fade-in-up border border-[#90a8ff]/30">
          <span className="material-symbols-outlined text-[20px] text-[#ffdbca] fill-1">stars</span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Header */}
      <Header
        user={user}
        notifications={notifications}
        onOpenNotifications={() => setIsNotificationModalOpen(true)}
        onNavigateProfile={() => setCurrentScreen('profile')}
        currentScreen={currentScreen}
      />

      {/* Main Body Content according to active screen tab */}
      <main className="w-full max-w-lg mx-auto pt-16 min-h-[calc(100vh-64px)] relative">
        {currentScreen === 'home' && (
          <HomeScreen
            currentClass={currentClass}
            assignments={assignments}
            attendanceHistory={attendanceHistory}
            onOpenSchedule={() => setIsScheduleModalOpen(true)}
            onOpenAssignments={() => setCurrentScreen('activity')}
            onSelectAssignment={(asg) => setSelectedAssignment(asg)}
            onAddAttendance={handleAddAttendance}
          />
        )}

        {currentScreen === 'activity' && (
          <ActivityScreen
            questions={questions}
            microTask={microTask}
            onAddQuestion={handleAddQuestion}
            onToggleVoteQuestion={handleToggleVoteQuestion}
            onSubmitMicroTask={handleSubmitMicroTask}
          />
        )}

        {currentScreen === 'score' && (
          <ScoreScreen
            user={user}
            attendanceHistory={attendanceHistory}
            assignments={assignments}
          />
        )}

        {currentScreen === 'profile' && (
          <ProfileScreen
            user={user}
            onLogout={handleLogout}
            onUpdateProfile={(updated) => setUser((prev) => ({ ...prev, ...updated }))}
          />
        )}
      </main>

      {/* Bottom Navigation */}
      <BottomNav
        currentScreen={currentScreen}
        onNavigate={(screen) => setCurrentScreen(screen)}
      />

      {/* Schedule Modal */}
      <ScheduleModal
        isOpen={isScheduleModalOpen}
        onClose={() => setIsScheduleModalOpen(false)}
        classes={classes}
      />

      {/* Notifications Drawer Modal */}
      <NotificationModal
        isOpen={isNotificationModalOpen}
        onClose={() => setIsNotificationModalOpen(false)}
        notifications={notifications}
        onMarkAllRead={handleMarkAllNotificationsRead}
      />

      {/* Assignment Detail & Submission Modal */}
      <AssignmentModal
        assignment={selectedAssignment}
        onClose={() => setSelectedAssignment(null)}
        onSubmitAssignment={handleSubmitAssignment}
      />
    </div>
  );
}
