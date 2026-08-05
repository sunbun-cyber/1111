import React, { useState } from 'react';

interface RegisterScreenProps {
  onRegisterSuccess: (userData: { studentId: string; fullName: string; email: string }) => void;
  onGoToLogin: () => void;
}

export const RegisterScreen: React.FC<RegisterScreenProps> = ({
  onRegisterSuccess,
  onGoToLogin,
}) => {
  const [studentId, setStudentId] = useState('');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (password !== confirmPassword) {
      setErrorMsg('รหัสผ่านไม่ตรงกัน กรุณาตรวจสอบอีกครั้ง');
      return;
    }

    if (password.length < 8) {
      setErrorMsg('รหัสผ่านต้องมีความยาวอย่างน้อย 8 ตัวอักษร');
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);

      setTimeout(() => {
        onRegisterSuccess({
          studentId: studentId || '65040123',
          fullName: fullName || 'นายเรียนดี ขยันยิ่ง',
          email: email || 'student@university.ac.th',
        });
      }, 1200);
    }, 1500);
  };

  return (
    <div className="flex flex-col w-full h-full min-h-[100dvh] relative justify-center bg-[#f7f9fb] pb-safe pt-safe">
      {/* Background Decor */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
        <svg
          className="absolute -top-[10%] -left-[20%] w-[150%] h-auto text-[#00236f]"
          viewBox="0 0 200 200"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M47.7,-57.2C59.9,-46.8,66.6,-28.9,71.2,-9.7C75.8,9.5,78.3,30.1,69.5,45.2C60.7,60.2,40.7,69.7,19.3,74C-2.1,78.2,-24.8,77,-43.3,66.9C-61.9,56.8,-76.3,37.8,-80.7,16.5C-85.1,-4.8,-79.6,-28.5,-66.1,-44.7C-52.6,-61,-31.1,-69.8,-12.3,-72C6.4,-74.3,25.2,-70,35.5,-67.6Z"
            fill="currentColor"
            transform="translate(100 100) scale(1.1)"
          />
        </svg>
        <svg
          className="absolute bottom-[0%] -right-[10%] w-[120%] h-auto text-[#fd761a]"
          viewBox="0 0 200 200"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M39.9,-48.8C54,-36.8,69.4,-26.8,74.9,-12.3C80.5,2.1,76.2,21.1,64.4,34.4C52.7,47.8,33.5,55.5,13.8,61C-5.8,66.4,-25.9,69.7,-43.2,61.4C-60.5,53.2,-75.1,33.4,-78.9,12C-82.6,-9.3,-75.5,-29.2,-61.7,-43C-47.9,-56.9,-23.9,-64.7,-4.1,-59.8C15.7,-55,31.4,-37.6,39.9,-48.8Z"
            fill="currentColor"
            transform="translate(100 100) scale(0.9)"
          />
        </svg>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col w-full px-4 pt-6 pb-12 max-w-[480px] mx-auto my-auto animate-fade-in-up">
        {/* Header */}
        <div className="flex flex-col items-center mb-8 text-center">
          <div className="w-16 h-16 bg-[#e0e3e5] rounded-2xl flex items-center justify-center mb-4 shadow-sm border border-white">
            <span className="material-symbols-outlined text-[#00236f] text-[32px]">school</span>
          </div>
          <h1 className="text-[28px] leading-[36px] font-bold text-[#191c1e] mb-1">
            สร้างบัญชีผู้ใช้
          </h1>
          <p className="text-[16px] text-[#444651]">
            ลงทะเบียนเพื่อเริ่มต้นใช้งาน ClassPulse
          </p>
        </div>

        {errorMsg && (
          <div className="mb-4 p-3 bg-[#ffdad6] text-[#93000a] text-[14px] font-medium rounded-xl flex items-center gap-2">
            <span className="material-symbols-outlined text-[20px]">error</span>
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Registration Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
          {/* Student ID */}
          <div className="flex flex-col gap-1 relative group">
            <label className="text-[14px] font-semibold text-[#191c1e]" htmlFor="regStudentId">
              รหัสนักศึกษา <span className="text-[#ba1a1a]">*</span>
            </label>
            <div className="relative flex items-center">
              <span className="material-symbols-outlined absolute left-4 text-[#444651] z-10 transition-colors group-focus-within:text-[#00236f]">
                badge
              </span>
              <input
                id="regStudentId"
                type="text"
                required
                value={studentId}
                onChange={(e) => setStudentId(e.target.value)}
                placeholder="เช่น 6401234567"
                className="w-full bg-white text-[#191c1e] text-[16px] pl-[48px] pr-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00236f] shadow-sm border border-[#e0e3e5] placeholder:text-[#c5c5d3] h-[48px]"
              />
            </div>
          </div>

          {/* Full Name */}
          <div className="flex flex-col gap-1 relative group">
            <label className="text-[14px] font-semibold text-[#191c1e]" htmlFor="regFullName">
              ชื่อ-นามสกุล <span className="text-[#ba1a1a]">*</span>
            </label>
            <div className="relative flex items-center">
              <span className="material-symbols-outlined absolute left-4 text-[#444651] z-10 transition-colors group-focus-within:text-[#00236f]">
                person
              </span>
              <input
                id="regFullName"
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="นายเรียนดี ขยันยิ่ง"
                className="w-full bg-white text-[#191c1e] text-[16px] pl-[48px] pr-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00236f] shadow-sm border border-[#e0e3e5] placeholder:text-[#c5c5d3] h-[48px]"
              />
            </div>
          </div>

          {/* Email */}
          <div className="flex flex-col gap-1 relative group">
            <label className="text-[14px] font-semibold text-[#191c1e]" htmlFor="regEmail">
              อีเมลมหาวิทยาลัย <span className="text-[#ba1a1a]">*</span>
            </label>
            <div className="relative flex items-center">
              <span className="material-symbols-outlined absolute left-4 text-[#444651] z-10 transition-colors group-focus-within:text-[#00236f]">
                mail
              </span>
              <input
                id="regEmail"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="student@university.ac.th"
                className="w-full bg-white text-[#191c1e] text-[16px] pl-[48px] pr-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00236f] shadow-sm border border-[#e0e3e5] placeholder:text-[#c5c5d3] h-[48px]"
              />
            </div>
          </div>

          {/* Password */}
          <div className="flex flex-col gap-1 relative group">
            <label className="text-[14px] font-semibold text-[#191c1e]" htmlFor="regPassword">
              รหัสผ่าน <span className="text-[#ba1a1a]">*</span>
            </label>
            <div className="relative flex items-center">
              <span className="material-symbols-outlined absolute left-4 text-[#444651] z-10 transition-colors group-focus-within:text-[#00236f]">
                lock
              </span>
              <input
                id="regPassword"
                type={showPassword1 ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-white text-[#191c1e] text-[16px] pl-[48px] pr-[48px] py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00236f] shadow-sm border border-[#e0e3e5] placeholder:text-[#c5c5d3] h-[48px]"
              />
              <button
                type="button"
                onClick={() => setShowPassword1(!showPassword1)}
                className="absolute right-4 text-[#444651] hover:text-[#191c1e] flex items-center justify-center p-1"
                aria-label="สลับการแสดงรหัสผ่าน"
              >
                <span className="material-symbols-outlined text-[20px]">
                  {showPassword1 ? 'visibility_off' : 'visibility'}
                </span>
              </button>
            </div>
            <p className="text-[12px] text-[#757682] pl-1">ต้องมีความยาวอย่างน้อย 8 ตัวอักษร</p>
          </div>

          {/* Confirm Password */}
          <div className="flex flex-col gap-1 relative group mb-2">
            <label className="text-[14px] font-semibold text-[#191c1e]" htmlFor="regConfirmPassword">
              ยืนยันรหัสผ่าน <span className="text-[#ba1a1a]">*</span>
            </label>
            <div className="relative flex items-center">
              <span className="material-symbols-outlined absolute left-4 text-[#444651] z-10 transition-colors group-focus-within:text-[#00236f]">
                lock_reset
              </span>
              <input
                id="regConfirmPassword"
                type={showPassword2 ? 'text' : 'password'}
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-white text-[#191c1e] text-[16px] pl-[48px] pr-[48px] py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00236f] shadow-sm border border-[#e0e3e5] placeholder:text-[#c5c5d3] h-[48px]"
              />
              <button
                type="button"
                onClick={() => setShowPassword2(!showPassword2)}
                className="absolute right-4 text-[#444651] hover:text-[#191c1e] flex items-center justify-center p-1"
                aria-label="สลับการแสดงรหัสผ่าน"
              >
                <span className="material-symbols-outlined text-[20px]">
                  {showPassword2 ? 'visibility_off' : 'visibility'}
                </span>
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading || isSuccess}
            className={`w-full text-[#5c2400] text-[18px] font-bold py-3 rounded-xl shadow-md active:scale-[0.98] transition-all flex items-center justify-center gap-2 mt-2 h-[56px] relative overflow-hidden ${
              isSuccess
                ? 'bg-[#4ade80] text-white'
                : 'bg-[#fd761a] hover:bg-[#ff8a3d] text-[#5c2400]'
            }`}
          >
            {isLoading ? (
              <>
                <span className="material-symbols-outlined animate-spin text-[20px]">
                  progress_activity
                </span>
                <span>กำลังลงทะเบียน...</span>
              </>
            ) : isSuccess ? (
              <>
                <span className="material-symbols-outlined text-[20px]">check_circle</span>
                <span>ลงทะเบียนสำเร็จ!</span>
              </>
            ) : (
              <>
                <span>ลงทะเบียน</span>
                <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
              </>
            )}
          </button>
        </form>

        {/* Footer Link */}
        <div className="mt-8 flex flex-col items-center justify-center gap-1">
          <p className="text-[16px] text-[#444651]">มีบัญชีผู้ใช้อยู่แล้ว?</p>
          <button
            type="button"
            onClick={onGoToLogin}
            className="text-[#00236f] text-[18px] font-semibold flex items-center gap-1 hover:opacity-80 active:opacity-60 transition-opacity"
          >
            <span>เข้าสู่ระบบ</span>
            <span className="material-symbols-outlined text-[20px]">login</span>
          </button>
        </div>
      </div>
    </div>
  );
};
