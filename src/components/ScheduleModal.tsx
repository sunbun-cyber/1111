import React, { useState } from 'react';
import { ClassSession } from '../types';

interface ScheduleModalProps {
  isOpen: boolean;
  onClose: () => void;
  classes: ClassSession[];
}

export const ScheduleModal: React.FC<ScheduleModalProps> = ({ isOpen, onClose, classes }) => {
  const [selectedDay, setSelectedDay] = useState<string>('จันทร์');

  if (!isOpen) return null;

  const days = ['จันทร์', 'อังคาร', 'พุธ', 'พฤหัสบดี', 'ศุกร์'];

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="bg-[#f7f9fb] w-full max-w-lg rounded-t-3xl sm:rounded-3xl max-h-[90vh] flex flex-col overflow-hidden shadow-2xl animate-fade-in-up border border-[#eceef0]">
        {/* Modal Header */}
        <div className="p-4 bg-white border-b border-[#eceef0] flex items-center justify-between sticky top-0 z-10">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#00236f] flex items-center justify-center text-white">
              <span className="material-symbols-outlined text-[20px]">calendar_month</span>
            </div>
            <h3 className="text-[18px] font-bold text-[#191c1e]">ตารางเรียนประจำสัปดาห์</h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-[#444651] hover:bg-[#eceef0]"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Day Switcher */}
        <div className="p-3 bg-white border-b border-[#eceef0] flex gap-2 overflow-x-auto no-scrollbar">
          {days.map((day) => {
            const isActive = selectedDay === day;
            return (
              <button
                key={day}
                onClick={() => setSelectedDay(day)}
                className={`px-4 py-2 rounded-xl text-[14px] font-semibold transition-all whitespace-nowrap ${
                  isActive
                    ? 'bg-[#00236f] text-white shadow-sm'
                    : 'bg-[#f2f4f6] text-[#444651] hover:bg-[#e0e3e5]'
                }`}
              >
                วัน{day}
              </button>
            );
          })}
        </div>

        {/* Schedule List */}
        <div className="p-4 flex flex-col gap-3 overflow-y-auto max-h-[60vh]">
          {classes.map((cls) => (
            <div
              key={cls.id}
              className="bg-white rounded-2xl p-4 shadow-sm border border-[#eceef0] flex flex-col gap-2 relative overflow-hidden"
            >
              <div
                className={`absolute left-0 top-0 w-1.5 h-full ${
                  cls.status === 'กำลังเรียน' ? 'bg-[#fd761a]' : 'bg-[#00236f]'
                }`}
              />

              <div className="flex justify-between items-start pl-2">
                <div>
                  <span
                    className={`inline-block text-[12px] font-semibold px-2.5 py-0.5 rounded-md mb-1 ${
                      cls.status === 'กำลังเรียน'
                        ? 'bg-[#ffdbca] text-[#9d4300]'
                        : 'bg-[#dce1ff] text-[#00164e]'
                    }`}
                  >
                    {cls.status} ({cls.day})
                  </span>
                  <h4 className="text-[16px] font-bold text-[#191c1e]">
                    {cls.code} {cls.title}
                  </h4>
                  <p className="text-[14px] text-[#444651] mt-0.5">{cls.instructor}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 pl-2 pt-2 border-t border-[#eceef0] text-[12px] text-[#444651]">
                <div className="flex items-center gap-1 font-semibold">
                  <span className="material-symbols-outlined text-[16px] text-[#00236f]">schedule</span>
                  <span>{cls.time}</span>
                </div>
                <div className="flex items-center gap-1 font-semibold">
                  <span className="material-symbols-outlined text-[16px] text-[#00236f]">meeting_room</span>
                  <span>{cls.location}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-white border-t border-[#eceef0]">
          <button
            onClick={onClose}
            className="w-full h-11 bg-[#00236f] text-white text-[14px] font-semibold rounded-xl hover:bg-[#1e3a8a]"
          >
            ปิดหน้าตารางเรียน
          </button>
        </div>
      </div>
    </div>
  );
};
