import React, { useState, useEffect } from 'react';
import { ClassSession, Assignment, AttendanceRecord } from '../types';

interface HomeScreenProps {
  currentClass: ClassSession;
  assignments: Assignment[];
  attendanceHistory: AttendanceRecord[];
  onOpenSchedule: () => void;
  onOpenAssignments: () => void;
  onSelectAssignment: (assignment: Assignment) => void;
  onAddAttendance: (newRecord: AttendanceRecord) => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  currentClass,
  assignments,
  attendanceHistory,
  onOpenSchedule,
  onOpenAssignments,
  onSelectAssignment,
  onAddAttendance,
}) => {
  const [isCheckedIn, setIsCheckedIn] = useState(true);
  const [checkInTime, setCheckInTime] = useState('09:03 น.');
  const [isCheckInAnimating, setIsCheckInAnimating] = useState(false);
  const [circleOffset, setCircleOffset] = useState('251.2');

  // Calculate actual attendance rate
  const totalPresent = attendanceHistory.filter((a) => a.status === 'เข้าเรียน' || a.status === 'สาย').length;
  const totalAbsent = attendanceHistory.filter((a) => a.status === 'ขาดเรียน').length;
  const totalClasses = attendanceHistory.length || 1;
  const calculatedPercentage = Math.round((totalPresent / totalClasses) * 100);

  useEffect(() => {
    // Animate progress circle on load
    const timer = setTimeout(() => {
      // 85% is approximately 38 dash offset for r=40 (2 * pi * 40 = 251.32)
      const targetOffset = 251.2 * (1 - calculatedPercentage / 100);
      setCircleOffset(targetOffset.toString());
    }, 150);

    return () => clearTimeout(timer);
  }, [calculatedPercentage]);

  const handleToggleCheckIn = () => {
    setIsCheckInAnimating(true);
    if (!isCheckedIn) {
      const now = new Date();
      const formattedTime = `${now.getHours().toString().padStart(2, '0')}:${now
        .getMinutes()
        .toString()
        .padStart(2, '0')} น.`;
      setCheckInTime(formattedTime);
      setIsCheckedIn(true);

      onAddAttendance({
        id: `att-${Date.now()}`,
        courseCode: currentClass.code,
        courseName: currentClass.title,
        date: 'วันนี้',
        time: formattedTime,
        status: 'เข้าเรียน',
      });
    } else {
      setIsCheckedIn(false);
    }

    setTimeout(() => {
      setIsCheckInAnimating(false);
    }, 1000);
  };

  return (
    <div className="flex flex-col w-full gap-8 px-margin-mobile pb-28 pt-4 animate-fade-in-up">
      {/* Quick Action / Check In */}
      <div className="w-full relative mt-2">
        <button
          onClick={handleToggleCheckIn}
          className={`w-full relative overflow-hidden text-[#5c2400] rounded-2xl p-6 flex flex-col items-center justify-center gap-2 shadow-md transition-all active:scale-95 touch-manipulation group ${
            isCheckedIn
              ? 'bg-[#fd761a] text-[#5c2400]'
              : 'bg-[#eceef0] text-[#191c1e] hover:bg-[#e0e3e5]'
          }`}
          id="checkInBtn"
          aria-label="เช็กชื่อเข้าเรียน"
        >
          <div className="absolute inset-0 bg-white/20 opacity-0 group-active:opacity-100 transition-opacity" />

          {/* Pulse Animation Rings */}
          {isCheckedIn && (
            <>
              <div className="absolute w-28 h-28 bg-white/30 rounded-full animate-[ping_2s_cubic-bezier(0,0,0.2,1)_infinite] pointer-events-none" />
              <div className="absolute w-20 h-20 bg-white/40 rounded-full animate-[ping_2s_cubic-bezier(0,0,0.2,1)_infinite_0.5s] pointer-events-none" />
            </>
          )}

          <div
            className={`w-16 h-16 rounded-full flex items-center justify-center relative z-10 shadow-sm transition-transform ${
              isCheckInAnimating ? 'scale-110' : ''
            } ${isCheckedIn ? 'bg-white text-[#fd761a]' : 'bg-[#00236f] text-white'}`}
          >
            <span
              className={`material-symbols-outlined text-[32px] font-bold ${
                isCheckedIn ? 'text-[#00236f] animate-bounce fill-1' : 'text-white'
              }`}
            >
              {isCheckedIn ? 'check_circle' : 'location_on'}
            </span>
          </div>

          <div className="flex flex-col items-center text-center relative z-10">
            <span className="text-[20px] font-bold mb-1">
              {isCheckedIn ? 'เช็กชื่อสำเร็จแล้ว!' : 'แตะเพื่อเช็กชื่อเข้าเรียน'}
            </span>
            <span className="text-[16px] opacity-90">
              {isCheckedIn
                ? `บันทึกเวลาเรียบร้อยแล้ว (${checkInTime})`
                : 'แตะเพื่อบันทึกเวลาเรียนและพิกัดของคุณ'}
            </span>
          </div>
        </button>
        <p className="text-center text-[12px] font-medium text-[#444651] mt-2 flex items-center justify-center gap-1">
          <span className="material-symbols-outlined text-[14px] text-[#fd761a] animate-spin">my_location</span>
          <span>กำลังบันทึกพิกัดอัตโนมัติ (GPS Verified)...</span>
        </p>
      </div>

      {/* Current Class */}
      <section className="w-full">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-[20px] font-bold text-[#191c1e]">คลาสเรียนวันนี้</h2>
          <button
            onClick={onOpenSchedule}
            className="text-[14px] font-semibold text-[#00236f] hover:underline flex items-center gap-0.5"
          >
            <span>ดูตารางเต็ม</span>
            <span className="material-symbols-outlined text-[16px]">chevron_right</span>
          </button>
        </div>

        <div className="bg-[#eceef0] rounded-2xl p-4 shadow-sm relative overflow-hidden border border-[#e0e3e5]">
          {/* Decorative accent bar */}
          <div className="absolute top-0 left-0 w-2 h-full bg-[#00236f]" />
          <div className="pl-2">
            <div className="flex justify-between items-start mb-4">
              <div>
                <span className="inline-block bg-[#1e3a8a] text-[#90a8ff] text-[12px] font-medium px-2.5 py-1 rounded-md mb-1">
                  {currentClass.status}
                </span>
                <h3 className="text-[20px] font-bold text-[#191c1e] mt-1">
                  {currentClass.code} {currentClass.title}
                </h3>
                <p className="text-[16px] text-[#444651] mt-1">{currentClass.instructor}</p>
              </div>

              <button
                onClick={onOpenSchedule}
                className="w-10 h-10 rounded-full bg-[#e6e8ea] hover:bg-[#d8dadc] flex items-center justify-center text-[#444651] transition-colors"
                title="ตัวเลือกเพิ่มเติม"
              >
                <span className="material-symbols-outlined text-[20px]">more_vert</span>
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#c5c5d3]/40">
              <div className="flex items-center gap-1.5 text-[#444651]">
                <span className="material-symbols-outlined text-[18px] text-[#00236f]">schedule</span>
                <span className="text-[14px] font-semibold">{currentClass.time}</span>
              </div>
              <div className="flex items-center gap-1.5 text-[#444651]">
                <span className="material-symbols-outlined text-[18px] text-[#00236f]">meeting_room</span>
                <span className="text-[14px] font-semibold">{currentClass.location}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Attendance Summary */}
      <section className="w-full">
        <div className="bg-[#00236f] text-white rounded-2xl p-6 shadow-sm flex items-center justify-between relative overflow-hidden">
          <div className="flex flex-col z-10">
            <h2 className="text-[20px] font-bold mb-1">เปอร์เซ็นต์การเข้าเรียน</h2>
            <p className="text-[16px] opacity-90 mb-4">เทอม 1/2566</p>
            <div className="flex gap-2">
              <div className="bg-white/20 backdrop-blur-md rounded-lg px-2.5 py-1 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-white" />
                <span className="text-[12px] font-medium">มาเรียน {totalPresent}</span>
              </div>
              <div className="bg-white/20 backdrop-blur-md rounded-lg px-2.5 py-1 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#fd761a]" />
                <span className="text-[12px] font-medium">ขาด {totalAbsent}</span>
              </div>
            </div>
          </div>

          <div className="relative w-24 h-24 flex-shrink-0 z-10">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              {/* Background circle */}
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="transparent"
                stroke="rgba(255,255,255,0.2)"
                strokeWidth="8"
              />
              {/* Progress circle */}
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="transparent"
                stroke="white"
                strokeWidth="8"
                strokeDasharray="251.2"
                strokeDashoffset={circleOffset}
                strokeLinecap="round"
                className="transition-all duration-1000 ease-out"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center flex-col">
              <span className="text-[28px] font-bold leading-none">
                {calculatedPercentage}
                <span className="text-[16px]">%</span>
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Notifications / Tasks */}
      <section className="w-full">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-[20px] font-bold text-[#191c1e]">งานที่ต้องส่งเร็วๆ นี้</h2>
          <button
            onClick={onOpenAssignments}
            className="text-[14px] font-semibold text-[#00236f] hover:underline"
          >
            ดูทั้งหมด
          </button>
        </div>

        <div className="flex flex-col gap-3">
          {assignments
            .filter((a) => a.status === 'ยังไม่ส่ง')
            .map((task) => (
              <div
                key={task.id}
                onClick={() => onSelectAssignment(task)}
                className="bg-white rounded-2xl p-4 shadow-sm flex items-start gap-4 relative overflow-hidden border border-[#eceef0] cursor-pointer hover:shadow-md transition-shadow group"
              >
                <div
                  className={`absolute top-0 left-0 w-1.5 h-full ${
                    task.isUrgent ? 'bg-[#9d4300]' : 'bg-[#00236f]'
                  }`}
                />
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                    task.isUrgent
                      ? 'bg-[#ffdad6] text-[#93000a]'
                      : 'bg-[#d3e4fe] text-[#0b1c30]'
                  }`}
                >
                  <span className="material-symbols-outlined fill-1">
                    {task.isUrgent ? 'assignment_late' : 'assignment'}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-[14px] font-bold text-[#191c1e] truncate group-hover:text-[#00236f] transition-colors">
                    {task.title}
                  </h4>
                  <p className="text-[12px] text-[#444651] mt-0.5 truncate">{task.courseName}</p>
                  <div
                    className={`flex items-center gap-1 mt-2 text-[12px] font-bold ${
                      task.isUrgent ? 'text-[#ba1a1a]' : 'text-[#444651]'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[16px]">
                      {task.isUrgent ? 'timer' : 'calendar_today'}
                    </span>
                    <span>{task.dueDate}</span>
                  </div>
                </div>
                <span className="material-symbols-outlined text-[#757682] self-center">
                  chevron_right
                </span>
              </div>
            ))}
        </div>
      </section>
    </div>
  );
};
