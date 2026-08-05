import React, { useState } from 'react';
import { User, AttendanceRecord, Assignment } from '../types';

interface ScoreScreenProps {
  user: User;
  attendanceHistory: AttendanceRecord[];
  assignments: Assignment[];
}

export const ScoreScreen: React.FC<ScoreScreenProps> = ({
  user,
  attendanceHistory,
  assignments,
}) => {
  const [attendanceFilter, setAttendanceFilter] = useState<'all' | 'เข้าเรียน' | 'สาย' | 'ขาดเรียน'>('all');

  const filteredAttendance =
    attendanceFilter === 'all'
      ? attendanceHistory
      : attendanceHistory.filter((item) => item.status === attendanceFilter);

  return (
    <div className="flex flex-col w-full gap-6 px-margin-mobile pb-28 pt-4 animate-fade-in-up">
      {/* Profile Header */}
      <div className="flex flex-col items-center mt-2">
        <div className="relative w-24 h-24 mb-2 rounded-full bg-[#eceef0] shadow-md overflow-visible">
          <img
            src={user.avatarUrl}
            alt={user.fullName}
            className="w-full h-full object-cover rounded-full"
          />
          <span className="absolute -bottom-2 -right-2 bg-[#9d4300] text-white text-[10px] px-2 py-1 rounded-full font-bold shadow-sm z-10 flex items-center gap-1 border border-white">
            <span className="material-symbols-outlined text-[12px] fill-1">star</span> Lvl {user.level}
          </span>
        </div>
        <h1 className="text-[28px] font-bold text-[#191c1e] mb-0.5">{user.fullName}</h1>
        <p className="text-[16px] text-[#444651] flex items-center gap-1">
          <span className="material-symbols-outlined text-[16px]">badge</span> {user.studentId}
        </p>
      </div>

      {/* Score Summary Card */}
      <section className="flex flex-col gap-2 relative">
        <h2 className="text-[20px] font-bold text-[#191c1e]">สรุปคะแนนสะสม</h2>
        <div className="bg-[#00236f] text-white rounded-2xl p-6 shadow-lg relative overflow-hidden flex flex-col gap-4">
          {/* Decorative Background Elements */}
          <div className="absolute -top-12 -right-12 w-32 h-32 bg-white/10 rounded-full blur-xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />

          <div className="flex justify-between items-end relative z-10">
            <div className="flex flex-col">
              <span className="text-[14px] font-semibold text-white/80">คะแนนรวมทั้งหมด</span>
              <div className="flex items-baseline gap-1">
                <span className="text-[48px] font-bold tracking-tight leading-none">{user.totalXp}</span>
                <span className="text-[16px] text-white/80">/ {user.maxXp} xp</span>
              </div>
            </div>

            <div className="bg-white/20 backdrop-blur-md rounded-xl p-2.5 flex flex-col items-center justify-center min-w-[72px]">
              <span className="material-symbols-outlined text-[#ffdbca] text-[28px] fill-1">trophy</span>
              <span className="text-[12px] font-semibold text-white mt-1">{user.grade}</span>
            </div>
          </div>

          <div className="flex flex-col gap-1.5 relative z-10 w-full mt-2">
            <div className="flex justify-between text-[12px] font-medium text-white/90">
              <span>ระดับปัจจุบัน: {user.rankTitle}</span>
              <span>อีก {user.maxXp - user.totalXp} xp สู่ระดับถัดไป</span>
            </div>
            <div className="w-full h-2.5 bg-white/20 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#ffdbca] rounded-full shadow-[0_0_8px_rgba(255,219,202,0.6)] transition-all duration-1000"
                style={{ width: `${Math.min((user.totalXp / user.maxXp) * 100, 100)}%` }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Attendance History */}
      <section className="flex flex-col gap-2 mt-2">
        <div className="flex justify-between items-end mb-1">
          <h2 className="text-[20px] font-bold text-[#191c1e]">ประวัติการเข้าเรียน</h2>
          <div className="flex items-center gap-1 text-[12px]">
            <button
              onClick={() =>
                setAttendanceFilter(
                  attendanceFilter === 'all'
                    ? 'เข้าเรียน'
                    : attendanceFilter === 'เข้าเรียน'
                    ? 'สาย'
                    : attendanceFilter === 'สาย'
                    ? 'ขาดเรียน'
                    : 'all'
                )
              }
              className="text-[#00236f] bg-[#00236f]/10 px-3 py-1 rounded-full font-semibold flex items-center gap-1 hover:bg-[#00236f]/20 transition-colors"
            >
              <span>{attendanceFilter === 'all' ? 'ทั้งหมด' : attendanceFilter}</span>
              <span className="material-symbols-outlined text-[16px]">tune</span>
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-2.5">
          {filteredAttendance.map((item) => (
            <div
              key={item.id}
              className="bg-white p-4 rounded-2xl shadow-sm border border-[#eceef0] flex items-center justify-between"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 rounded-full bg-[#dce1ff] flex items-center justify-center flex-shrink-0">
                  <span className="material-symbols-outlined text-[#00164e] text-[20px]">
                    calendar_month
                  </span>
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-[14px] font-bold text-[#191c1e] truncate">
                    {item.courseCode} - {item.courseName}
                  </span>
                  <span className="text-[12px] text-[#444651]">
                    {item.date} {item.time && `• ${item.time}`}
                  </span>
                </div>
              </div>

              {item.status === 'เข้าเรียน' && (
                <div className="bg-[#e6f4ea] text-[#137333] px-3 py-1 rounded-full flex items-center gap-1 flex-shrink-0 shadow-sm border border-[#ceead6]">
                  <span className="material-symbols-outlined text-[16px] fill-1">check_circle</span>
                  <span className="text-[12px] font-bold">เข้าเรียน</span>
                </div>
              )}

              {item.status === 'สาย' && (
                <div className="bg-[#fef7e0] text-[#b06000] px-3 py-1 rounded-full flex items-center gap-1 flex-shrink-0 shadow-sm border border-[#feefc3]">
                  <span className="material-symbols-outlined text-[16px] fill-1">schedule</span>
                  <span className="text-[12px] font-bold">
                    สาย ({item.lateMinutes || 15} นาที)
                  </span>
                </div>
              )}

              {item.status === 'ขาดเรียน' && (
                <div className="bg-[#ffdad6] text-[#93000a] px-3 py-1 rounded-full flex items-center gap-1 flex-shrink-0 shadow-sm border border-[#fce8e6]">
                  <span className="material-symbols-outlined text-[16px] fill-1">cancel</span>
                  <span className="text-[12px] font-bold">ขาดเรียน</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Assignment History */}
      <section className="flex flex-col gap-2 mt-2">
        <div className="flex justify-between items-end mb-1">
          <h2 className="text-[20px] font-bold text-[#191c1e]">ประวัติการส่งงาน</h2>
        </div>

        <div className="grid grid-cols-1 gap-3">
          {assignments
            .filter((a) => a.status === 'ตรวจแล้ว' || a.status === 'รอตรวจ')
            .map((asg) => (
              <div
                key={asg.id}
                className="bg-white p-4 rounded-2xl shadow-sm border border-[#eceef0] flex flex-col gap-3 relative overflow-hidden group"
              >
                <div
                  className={`absolute right-0 top-0 w-1.5 h-full ${
                    asg.status === 'ตรวจแล้ว' ? 'bg-[#00236f]' : 'bg-[#e0e3e5]'
                  }`}
                />

                <div className="flex justify-between items-start">
                  <div className="flex flex-col gap-1 pr-4">
                    <span className="text-[14px] font-bold text-[#191c1e]">{asg.title}</span>
                    <span className="text-[12px] text-[#444651] flex items-center gap-1">
                      <span className="material-symbols-outlined text-[14px]">
                        {asg.status === 'ตรวจแล้ว' ? 'history' : 'pending_actions'}
                      </span>
                      {asg.dueTimestampText}
                    </span>
                  </div>

                  {asg.status === 'ตรวจแล้ว' ? (
                    <div className="flex flex-col items-end">
                      <span className="text-[20px] font-bold text-[#00236f]">{asg.score}</span>
                      <span className="text-[12px] font-semibold text-[#9d4300]">ได้คะแนนเต็ม!</span>
                    </div>
                  ) : (
                    <div className="bg-[#e0e3e5] text-[#444651] px-3 py-1 rounded-lg flex items-center gap-1 shadow-sm">
                      <span className="text-[12px] font-bold">รอตรวจ</span>
                    </div>
                  )}
                </div>

                {asg.teacherFeedback && (
                  <div className="bg-[#eceef0] rounded-xl p-3 text-[12px] text-[#444651] flex items-start gap-2 border border-[#e0e3e5]">
                    <span className="material-symbols-outlined text-[16px] text-[#1b2b3f] mt-0.5">
                      chat_bubble
                    </span>
                    <p className="italic leading-relaxed">"{asg.teacherFeedback}"</p>
                  </div>
                )}
              </div>
            ))}
        </div>
      </section>
    </div>
  );
};
