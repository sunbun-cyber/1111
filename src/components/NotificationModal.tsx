import React from 'react';
import { NotificationItem } from '../types';

interface NotificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: NotificationItem[];
  onMarkAllRead: () => void;
}

export const NotificationModal: React.FC<NotificationModalProps> = ({
  isOpen,
  onClose,
  notifications,
  onMarkAllRead,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-start justify-end p-2 sm:p-4">
      <div className="bg-white w-full max-w-sm rounded-2xl shadow-2xl overflow-hidden border border-[#eceef0] animate-fade-in-up mt-14 sm:mt-12">
        {/* Header */}
        <div className="p-4 border-b border-[#eceef0] flex items-center justify-between bg-[#f7f9fb]">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#00236f]">notifications</span>
            <h3 className="text-[16px] font-bold text-[#191c1e]">การแจ้งเตือน</h3>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={onMarkAllRead}
              className="text-[12px] font-semibold text-[#00236f] hover:underline"
            >
              อ่านทั้งหมด
            </button>
            <button
              onClick={onClose}
              className="w-7 h-7 rounded-full flex items-center justify-center text-[#444651] hover:bg-[#e0e3e5]"
            >
              <span className="material-symbols-outlined text-[18px]">close</span>
            </button>
          </div>
        </div>

        {/* List */}
        <div className="max-h-[60vh] overflow-y-auto divide-y divide-[#eceef0]">
          {notifications.length === 0 ? (
            <div className="p-6 text-center text-[#757682] text-[14px]">
              ไม่มีการแจ้งเตือนใหม่
            </div>
          ) : (
            notifications.map((notif) => (
              <div
                key={notif.id}
                className={`p-4 flex gap-3 transition-colors ${
                  !notif.read ? 'bg-[#dce1ff]/30' : 'hover:bg-[#f7f9fb]'
                }`}
              >
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 ${
                    notif.type === 'class'
                      ? 'bg-[#dce1ff] text-[#00164e]'
                      : notif.type === 'grade'
                      ? 'bg-[#ffdbca] text-[#9d4300]'
                      : 'bg-[#d3e4fe] text-[#0b1c30]'
                  }`}
                >
                  <span className="material-symbols-outlined text-[18px]">
                    {notif.type === 'class'
                      ? 'school'
                      : notif.type === 'grade'
                      ? 'emoji_events'
                      : 'assignment'}
                  </span>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start">
                    <h4 className="text-[14px] font-bold text-[#191c1e]">{notif.title}</h4>
                    <span className="text-[10px] text-[#757682]">{notif.time}</span>
                  </div>
                  <p className="text-[12px] text-[#444651] mt-0.5 leading-relaxed">
                    {notif.message}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
