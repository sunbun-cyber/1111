import React, { useState } from 'react';
import { User } from '../types';

interface ProfileScreenProps {
  user: User;
  onLogout: () => void;
  onUpdateProfile: (updated: Partial<User>) => void;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({
  user,
  onLogout,
  onUpdateProfile,
}) => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [gpsVerified, setGpsVerified] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(user.fullName);

  const handleSaveProfile = () => {
    if (editName.trim()) {
      onUpdateProfile({ fullName: editName.trim() });
    }
    setIsEditing(false);
  };

  return (
    <div className="flex flex-col w-full gap-6 px-margin-mobile pb-28 pt-4 animate-fade-in-up">
      {/* Profile Header Card */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#eceef0] flex flex-col items-center text-center relative overflow-hidden">
        <div className="absolute top-0 inset-x-0 h-16 bg-[#00236f]" />

        <div className="relative z-10 w-24 h-24 mt-4 mb-3 rounded-full ring-4 ring-white shadow-md overflow-hidden bg-[#eceef0]">
          <img src={user.avatarUrl} alt={user.fullName} className="w-full h-full object-cover" />
        </div>

        {isEditing ? (
          <div className="flex flex-col gap-2 w-full max-w-xs mt-1 z-10">
            <input
              type="text"
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              className="px-3 py-1.5 rounded-lg border border-[#00236f] text-center text-[18px] font-bold outline-none"
            />
            <div className="flex justify-center gap-2">
              <button
                onClick={handleSaveProfile}
                className="px-3 py-1 bg-[#00236f] text-white text-[12px] font-semibold rounded-md"
              >
                บันทึก
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="px-3 py-1 bg-[#eceef0] text-[#444651] text-[12px] font-semibold rounded-md"
              >
                ยกเลิก
              </button>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-2 z-10">
            <h1 className="text-[22px] font-bold text-[#191c1e]">{user.fullName}</h1>
            <button
              onClick={() => setIsEditing(true)}
              className="text-[#00236f] hover:bg-[#eceef0] p-1 rounded-full"
              title="แก้ไขชื่อ"
            >
              <span className="material-symbols-outlined text-[18px]">edit</span>
            </button>
          </div>
        )}

        <p className="text-[14px] text-[#444651] mt-0.5">{user.faculty}</p>
        <span className="mt-2 text-[12px] font-semibold bg-[#dce1ff] text-[#00164e] px-3 py-1 rounded-full">
          รหัสนักศึกษา: {user.studentId}
        </span>
      </div>

      {/* Academic Overview Stats Grid */}
      <section className="grid grid-cols-3 gap-3">
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-[#eceef0] flex flex-col items-center text-center">
          <span className="text-[24px] font-bold text-[#00236f]">{user.gpa}</span>
          <span className="text-[12px] text-[#444651] mt-0.5">เกรดเฉลี่ย (GPA)</span>
        </div>
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-[#eceef0] flex flex-col items-center text-center">
          <span className="text-[24px] font-bold text-[#fd761a]">{user.attendanceRate}%</span>
          <span className="text-[12px] text-[#444651] mt-0.5">อัตราการเข้าเรียน</span>
        </div>
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-[#eceef0] flex flex-col items-center text-center">
          <span className="text-[24px] font-bold text-[#1b2b3f]">
            {user.completedTasks}/{user.totalTasks}
          </span>
          <span className="text-[12px] text-[#444651] mt-0.5">ส่งงานเสร็จแล้ว</span>
        </div>
      </section>

      {/* Settings & Info Sections */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-[#eceef0] flex flex-col gap-4">
        <h3 className="text-[16px] font-bold text-[#191c1e] border-b border-[#eceef0] pb-2">
          ตั้งค่าการใช้งาน
        </h3>

        {/* Notifications toggle */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-[#00236f]">notifications_active</span>
            <div className="flex flex-col">
              <span className="text-[14px] font-semibold text-[#191c1e]">การแจ้งเตือนคลาสเรียน</span>
              <span className="text-[12px] text-[#444651]">รับการเตือนก่อนเริ่มคลาส 15 นาที</span>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setNotificationsEnabled(!notificationsEnabled)}
            className={`w-12 h-6 rounded-full transition-colors relative p-0.5 ${
              notificationsEnabled ? 'bg-[#00236f]' : 'bg-[#e0e3e5]'
            }`}
          >
            <div
              className={`w-5 h-5 rounded-full bg-white transition-transform ${
                notificationsEnabled ? 'translate-x-6' : 'translate-x-0'
              }`}
            />
          </button>
        </div>

        {/* GPS location toggle */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-[#00236f]">my_location</span>
            <div className="flex flex-col">
              <span className="text-[14px] font-semibold text-[#191c1e]">ระบุพิกัดอัตโนมัติ (GPS)</span>
              <span className="text-[12px] text-[#444651]">เพื่อยืนยันการเข้าเรียนในห้องเรียน</span>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setGpsVerified(!gpsVerified)}
            className={`w-12 h-6 rounded-full transition-colors relative p-0.5 ${
              gpsVerified ? 'bg-[#00236f]' : 'bg-[#e0e3e5]'
            }`}
          >
            <div
              className={`w-5 h-5 rounded-full bg-white transition-transform ${
                gpsVerified ? 'translate-x-6' : 'translate-x-0'
              }`}
            />
          </button>
        </div>

        {/* Email */}
        <div className="flex items-center justify-between border-t border-[#eceef0] pt-3">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-[#00236f]">mail</span>
            <div className="flex flex-col">
              <span className="text-[14px] font-semibold text-[#191c1e]">อีเมลมหาวิทยาลัย</span>
              <span className="text-[12px] text-[#444651]">{user.email}</span>
            </div>
          </div>
          <span className="material-symbols-outlined text-[18px] text-[#757682]">verified</span>
        </div>
      </div>

      {/* Logout button */}
      <button
        onClick={onLogout}
        className="w-full h-12 bg-[#ffdad6] hover:bg-[#fce8e6] text-[#93000a] text-[16px] font-bold rounded-2xl shadow-sm flex items-center justify-center gap-2 active:scale-[0.98] transition-all"
      >
        <span className="material-symbols-outlined text-[20px]">logout</span>
        <span>ออกจากระบบ</span>
      </button>
    </div>
  );
};
