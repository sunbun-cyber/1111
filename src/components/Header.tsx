import React from 'react';
import { User, NotificationItem, ScreenType } from '../types';

interface HeaderProps {
  user: User;
  notifications: NotificationItem[];
  onOpenNotifications: () => void;
  onNavigateProfile: () => void;
  currentScreen: ScreenType;
}

export const Header: React.FC<HeaderProps> = ({
  notifications,
  onOpenNotifications,
  onNavigateProfile,
}) => {
  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <header className="fixed top-0 w-full z-50 bg-[#f7f9fb]/80 backdrop-blur-xl pt-safe shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
      <div className="h-16 px-margin-mobile flex items-center justify-between">
        {/* Brand Logo & Name */}
        <div className="flex items-center gap-xs cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <div className="w-8 h-8 rounded-lg bg-[#00236f] flex items-center justify-center shadow-sm">
            <span className="material-symbols-outlined text-white text-[20px]">pulse_alert</span>
          </div>
          <span className="font-bold text-[22px] text-[#00236f] tracking-tight">ClassPulse</span>
        </div>

        {/* Action icons */}
        <div className="flex items-center gap-md">
          {/* Notification button with badge */}
          <button
            onClick={onOpenNotifications}
            className="w-10 h-10 flex items-center justify-center relative text-[#444651] hover:text-[#00236f] hover:bg-[#eceef0] rounded-full transition-colors active:scale-95"
            title="การแจ้งเตือน"
            aria-label="การแจ้งเตือน"
          >
            <span className="material-symbols-outlined text-[24px]">notifications</span>
            {unreadCount > 0 && (
              <div className="absolute top-2 right-2 w-2.5 h-2.5 bg-[#9d4300] rounded-full ring-2 ring-[#f7f9fb] animate-pulse" />
            )}
          </button>

          {/* User profile avatar */}
          <button
            onClick={onNavigateProfile}
            className="w-8 h-8 rounded-full bg-[#00236f] flex items-center justify-center ring-2 ring-[#dce1ff] hover:ring-[#00236f] transition-all active:scale-95 overflow-hidden"
            title="โปรไฟล์ของคุณ"
            aria-label="โปรไฟล์ของคุณ"
          >
            <span className="material-symbols-outlined text-white text-[18px]">person</span>
          </button>
        </div>
      </div>
    </header>
  );
};
