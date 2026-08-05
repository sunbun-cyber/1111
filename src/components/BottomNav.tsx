import React from 'react';
import { ScreenType } from '../types';

interface BottomNavProps {
  currentScreen: ScreenType;
  onNavigate: (screen: ScreenType) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ currentScreen, onNavigate }) => {
  const tabs = [
    { id: 'home' as ScreenType, label: 'หน้าแรก', icon: 'home' },
    { id: 'activity' as ScreenType, label: 'กิจกรรม', icon: 'event_note' },
    { id: 'score' as ScreenType, label: 'คะแนน', icon: 'military_tech' },
    { id: 'profile' as ScreenType, label: 'โปรไฟล์', icon: 'account_circle' },
  ];

  return (
    <nav className="fixed bottom-0 w-full z-50 pb-safe bg-[#eceef0]/90 backdrop-blur-xl shadow-[0_-1px_8px_rgba(0,0,0,0.04)] border-t border-[#e0e3e5]/50">
      <div className="flex justify-around items-center h-16">
        {tabs.map((tab) => {
          const isActive = currentScreen === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onNavigate(tab.id)}
              className={`flex flex-col items-center justify-center w-full h-full transition-colors active:scale-95 ${
                isActive ? 'text-[#00236f] font-bold' : 'text-[#444651] hover:text-[#00236f]'
              }`}
            >
              <span className={`material-symbols-outlined text-[24px] ${isActive ? 'fill-1' : ''}`}>
                {tab.icon}
              </span>
              <span className="text-[12px] leading-[16px] font-medium mt-0.5">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
