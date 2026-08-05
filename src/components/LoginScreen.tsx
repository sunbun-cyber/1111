import React, { useState } from 'react';

interface LoginScreenProps {
  onLogin: (studentId: string) => void;
  onGoToRegister: () => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin, onGoToRegister }) => {
  const [studentId, setStudentId] = useState('65040123');
  const [password, setPassword] = useState('12345678');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [forgotId, setForgotId] = useState('');
  const [forgotSuccess, setForgotSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentId.trim() || !password.trim()) return;

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onLogin(studentId);
    }, 800);
  };

  const handleForgotSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!forgotId.trim()) return;
    setForgotSuccess(true);
    setTimeout(() => {
      setForgotSuccess(false);
      setShowForgotModal(false);
      setForgotId('');
    }, 2000);
  };

  return (
    <div className="flex flex-col w-full h-full min-h-[100dvh] bg-[#f7f9fb] relative justify-center px-gutter pt-safe pb-safe overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-[#dce1ff] rounded-full blur-[80px] opacity-50 z-0 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-48 h-48 bg-[#ffdbca] rounded-full blur-[60px] opacity-40 z-0 pointer-events-none"></div>

      <div className="w-full max-w-sm mx-auto z-10 flex flex-col justify-center animate-fade-in-up py-8">
        {/* Logo & Welcome */}
        <div className="flex flex-col items-center text-center mb-8">
          <div className="w-24 h-24 mb-6 rounded-2xl overflow-hidden shadow-sm shadow-[#00236f]/10 bg-white flex items-center justify-center p-3 border border-[#eceef0]">
            <img
              alt="ClassPulse Logo"
              className="w-full h-full object-contain"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBIDcp1BGZX_OnsNhnVHlyMlz775JO8otzeNNxgf4mmuatWKfRafywcbHHIs_2YaqsBGv_vHinZFIBY_4ZSyNa8p1le4Xyb1HimZQeGTdneuGQq5bb1hJAmBzdPfo1WFQuapVVHbbMnaxhwjjtVHqMvM-KfIv6qUAgb5oYzI-XRDPwTC3eIbfxwlPsu05WRpMKF6rES9MS3AKq_e8gyzc8IOCeUQPa-89NFu5daq6GoV2ry9um6Eh8Zkw"
            />
          </div>
          <h1 className="text-[28px] leading-[36px] font-bold text-[#191c1e] mb-1">
            ยินดีต้อนรับสู่ ClassPulse
          </h1>
          <p className="text-[16px] leading-[24px] text-[#444651]">
            ระบบจัดการคลินิกการเรียนรู้
          </p>
        </div>

        {/* Login Form Card */}
        <div className="bg-white rounded-[24px] p-6 shadow-[0_8px_32px_-12px_rgba(30,58,138,0.1)] flex flex-col gap-6 border border-[#eceef0]">
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {/* Student ID Input */}
            <div className="relative group">
              <label className="absolute -top-2.5 left-3 bg-white px-2 text-[12px] font-medium text-[#444651] transition-colors group-focus-within:text-[#00236f] z-10">
                รหัสนักศึกษา
              </label>
              <div className="relative flex items-center bg-white rounded-xl shadow-[inset_0_0_0_1px_rgba(117,118,130,0.3)] group-focus-within:shadow-[inset_0_0_0_2px_#00236f] transition-shadow duration-200">
                <span className="material-symbols-outlined text-[#444651] ml-3 mr-2">badge</span>
                <input
                  className="w-full bg-transparent text-[16px] text-[#191c1e] py-3 pr-4 outline-none h-12"
                  id="studentId"
                  placeholder="เช่น 64010000"
                  type="text"
                  value={studentId}
                  onChange={(e) => setStudentId(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="relative group">
              <label className="absolute -top-2.5 left-3 bg-white px-2 text-[12px] font-medium text-[#444651] transition-colors group-focus-within:text-[#00236f] z-10">
                รหัสผ่าน
              </label>
              <div className="relative flex items-center bg-white rounded-xl shadow-[inset_0_0_0_1px_rgba(117,118,130,0.3)] group-focus-within:shadow-[inset_0_0_0_2px_#00236f] transition-shadow duration-200">
                <span className="material-symbols-outlined text-[#444651] ml-3 mr-2">lock</span>
                <input
                  className="w-full bg-transparent text-[16px] text-[#191c1e] py-3 outline-none h-12"
                  id="password"
                  placeholder="••••••••"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="px-3 text-[#444651] hover:text-[#00236f] transition-colors h-full flex items-center justify-center outline-none focus:text-[#00236f]"
                  aria-label={showPassword ? 'ซ่อนรหัสผ่าน' : 'แสดงรหัสผ่าน'}
                >
                  <span className="material-symbols-outlined text-[20px]">
                    {showPassword ? 'visibility' : 'visibility_off'}
                  </span>
                </button>
              </div>
            </div>

            {/* Forgot Password Link */}
            <div className="flex justify-end -mt-2">
              <button
                type="button"
                onClick={() => setShowForgotModal(true)}
                className="text-[14px] font-semibold text-[#00236f] hover:text-[#1e3a8a] transition-colors py-1 px-2 rounded-lg hover:bg-[#b6c4ff]/20 outline-none focus:bg-[#b6c4ff]/20"
              >
                ลืมรหัสผ่าน?
              </button>
            </div>

            {/* Primary Action Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 bg-[#fd761a] text-[#5c2400] text-[18px] font-semibold rounded-xl shadow-md shadow-[#fd761a]/20 hover:bg-[#ff8a3d] active:bg-[#e56810] transition-all transform active:scale-[0.98] flex items-center justify-center gap-2 focus:outline-none focus:ring-4 focus:ring-[#ffdbca] disabled:opacity-75"
            >
              {isLoading ? (
                <>
                  <span className="material-symbols-outlined text-[20px] animate-spin">progress_activity</span>
                  <span>กำลังเข้าสู่ระบบ...</span>
                </>
              ) : (
                <>
                  <span>เข้าสู่ระบบ</span>
                  <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Register Link */}
        <div className="mt-8 text-center flex flex-col items-center justify-center gap-2">
          <span className="text-[16px] text-[#444651]">ยังไม่มีบัญชีผู้ใช้?</span>
          <button
            onClick={onGoToRegister}
            className="text-[14px] font-semibold text-[#00236f] bg-[#dce1ff]/60 hover:bg-[#dce1ff] py-2.5 px-5 rounded-full transition-colors flex items-center gap-1.5 outline-none focus:ring-2 focus:ring-[#00236f]"
          >
            <span>ลงทะเบียนเข้าใช้งาน</span>
            <span className="material-symbols-outlined text-[18px]">how_to_reg</span>
          </button>
        </div>
      </div>

      {/* Forgot Password Modal */}
      {showForgotModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-xl flex flex-col gap-4 animate-fade-in-up">
            <div className="flex justify-between items-center border-b border-[#eceef0] pb-3">
              <h3 className="font-bold text-[18px] text-[#191c1e]">รีเซ็ตรหัสผ่าน</h3>
              <button
                onClick={() => setShowForgotModal(false)}
                className="w-8 h-8 rounded-full flex items-center justify-center text-[#444651] hover:bg-[#eceef0]"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>
            {forgotSuccess ? (
              <div className="p-4 bg-[#d3e4fe] text-[#0b1c30] rounded-xl flex items-center gap-3">
                <span className="material-symbols-outlined text-[24px] text-[#00236f]">check_circle</span>
                <p className="text-[14px] font-medium">ส่งลิงก์กู้คืนรหัสผ่านไปยังอีเมลนักศึกษาเรียบร้อยแล้ว!</p>
              </div>
            ) : (
              <form onSubmit={handleForgotSubmit} className="flex flex-col gap-4">
                <p className="text-[14px] text-[#444651]">
                  ระบุรหัสนักศึกษาของคุณเพื่อรับลิงก์สำหรับสร้างรหัสผ่านใหม่
                </p>
                <div className="flex flex-col gap-1">
                  <label className="text-[14px] font-semibold text-[#191c1e]">รหัสนักศึกษา</label>
                  <input
                    type="text"
                    value={forgotId}
                    onChange={(e) => setForgotId(e.target.value)}
                    placeholder="เช่น 65040123"
                    className="w-full bg-[#f2f4f6] px-4 py-3 rounded-xl border border-[#c5c5d3] outline-none focus:border-[#00236f]"
                    required
                  />
                </div>
                <div className="flex gap-2 justify-end mt-2">
                  <button
                    type="button"
                    onClick={() => setShowForgotModal(false)}
                    className="px-4 py-2.5 rounded-xl text-[14px] font-semibold text-[#444651] hover:bg-[#eceef0]"
                  >
                    ยกเลิก
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2.5 rounded-xl text-[14px] font-semibold bg-[#00236f] text-white hover:bg-[#1e3a8a]"
                  >
                    ส่งลิงก์กู้คืน
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
