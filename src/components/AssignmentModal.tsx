import React, { useState } from 'react';
import { Assignment } from '../types';

interface AssignmentModalProps {
  assignment: Assignment | null;
  onClose: () => void;
  onSubmitAssignment: (assignmentId: string, link: string) => void;
}

export const AssignmentModal: React.FC<AssignmentModalProps> = ({
  assignment,
  onClose,
  onSubmitAssignment,
}) => {
  const [submissionLink, setSubmissionLink] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  if (!assignment) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!submissionLink.trim()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      onSubmitAssignment(assignment.id, submissionLink.trim());
      setIsSubmitting(false);
      setSubmittedSuccess(true);
      setTimeout(() => {
        setSubmittedSuccess(false);
        onClose();
      }, 1500);
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="bg-white w-full max-w-md rounded-t-3xl sm:rounded-3xl overflow-hidden shadow-2xl animate-fade-in-up border border-[#eceef0]">
        {/* Modal Header */}
        <div className="p-4 bg-[#f7f9fb] border-b border-[#eceef0] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#00236f]">assignment</span>
            <h3 className="text-[16px] font-bold text-[#191c1e]">รายละเอียดการส่งงาน</h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-[#444651] hover:bg-[#e0e3e5]"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 flex flex-col gap-4">
          <div>
            <span className="inline-block px-2.5 py-0.5 bg-[#dce1ff] text-[#00164e] text-[12px] font-semibold rounded-md mb-1">
              {assignment.courseName}
            </span>
            <h2 className="text-[20px] font-bold text-[#191c1e]">{assignment.title}</h2>
            <p className="text-[14px] text-[#444651] mt-1">
              กำหนดส่ง: <span className="font-semibold text-[#ba1a1a]">{assignment.dueDate}</span>
            </p>
          </div>

          {assignment.status === 'ตรวจแล้ว' ? (
            <div className="bg-[#f2f4f6] rounded-2xl p-4 flex flex-col gap-2 border border-[#e0e3e5]">
              <div className="flex justify-between items-center">
                <span className="text-[14px] font-bold text-[#191c1e]">ผลการประเมิน</span>
                <span className="text-[20px] font-bold text-[#00236f]">{assignment.score}</span>
              </div>
              {assignment.teacherFeedback && (
                <div className="bg-white p-3 rounded-xl text-[12px] text-[#444651] border border-[#eceef0]">
                  <p className="font-semibold text-[#191c1e] mb-1">ข้อคิดเห็นจากอาจารย์:</p>
                  <p className="italic">"{assignment.teacherFeedback}"</p>
                </div>
              )}
            </div>
          ) : assignment.status === 'รอตรวจ' ? (
            <div className="bg-[#d3e4fe] p-4 rounded-2xl text-[#0b1c30] flex items-center gap-3">
              <span className="material-symbols-outlined text-[24px] text-[#00236f]">
                pending_actions
              </span>
              <div>
                <p className="text-[14px] font-bold">ส่งงานเรียบร้อยแล้ว</p>
                <p className="text-[12px]">ระบบกำลังรอการตรวจและให้คะแนนจากอาจารย์ผู้สอน</p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-3 border-t border-[#eceef0] pt-3">
              <div className="flex flex-col gap-1">
                <label className="text-[12px] font-semibold text-[#191c1e]" htmlFor="asg-link">
                  แนบลิงก์งาน (Google Docs / Drive / Slide) <span className="text-[#ba1a1a]">*</span>
                </label>
                <input
                  id="asg-link"
                  type="url"
                  required
                  value={submissionLink}
                  onChange={(e) => setSubmissionLink(e.target.value)}
                  placeholder="https://docs.google.com/document/d/..."
                  className="w-full bg-[#f2f4f6] text-[#191c1e] text-[14px] px-3 py-2.5 rounded-xl border border-[#c5c5d3] outline-none focus:border-[#00236f]"
                />
              </div>

              {submittedSuccess && (
                <div className="p-3 bg-[#d3e4fe] text-[#0b1c30] rounded-xl text-[14px] font-semibold flex items-center gap-2">
                  <span className="material-symbols-outlined text-[20px] text-[#00236f]">check_circle</span>
                  <span>บันทึกการส่งงานสำเร็จแล้ว!</span>
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting || !submissionLink.trim()}
                className="w-full h-11 bg-[#fd761a] hover:bg-[#ff8a3d] text-[#5c2400] text-[16px] font-bold rounded-xl shadow-md transition-all disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <span className="material-symbols-outlined text-[18px] animate-spin">
                      progress_activity
                    </span>
                    <span>กำลังส่งงาน...</span>
                  </>
                ) : (
                  <>
                    <span className="material-symbols-outlined text-[18px]">send</span>
                    <span>ยืนยันการส่งงาน</span>
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
