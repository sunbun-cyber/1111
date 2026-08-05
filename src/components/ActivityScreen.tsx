import React, { useState } from 'react';
import { QAQuestion, MicroTask } from '../types';

interface ActivityScreenProps {
  questions: QAQuestion[];
  microTask: MicroTask;
  onAddQuestion: (text: string) => void;
  onToggleVoteQuestion: (questionId: number) => void;
  onSubmitMicroTask: (url: string) => void;
}

export const ActivityScreen: React.FC<ActivityScreenProps> = ({
  questions,
  microTask,
  onAddQuestion,
  onToggleVoteQuestion,
  onSubmitMicroTask,
}) => {
  const [activeTab, setActiveTab] = useState<'qa' | 'task'>('qa');

  // QA input state
  const [questionText, setQuestionText] = useState('');
  const [isQaSubmitting, setIsQaSubmitting] = useState(false);
  const [showQaSuccess, setShowQaSuccess] = useState(false);

  // MicroTask input state
  const [taskUrl, setTaskUrl] = useState(microTask.submittedUrl || '');
  const [isTaskSubmitting, setIsTaskSubmitting] = useState(false);
  const [showTaskSuccess, setShowTaskSuccess] = useState(microTask.isSubmitted);

  const handleQuestionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!questionText.trim()) return;

    setIsQaSubmitting(true);
    setTimeout(() => {
      onAddQuestion(questionText.trim());
      setQuestionText('');
      setIsQaSubmitting(false);
      setShowQaSuccess(true);
      setTimeout(() => setShowQaSuccess(false), 3000);
    }, 600);
  };

  const handleTaskSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!taskUrl.trim()) return;

    setIsTaskSubmitting(true);
    setTimeout(() => {
      onSubmitMicroTask(taskUrl.trim());
      setIsTaskSubmitting(false);
      setShowTaskSuccess(true);
    }, 600);
  };

  return (
    <div className="flex flex-col w-full pb-28 pt-4 animate-fade-in-up">
      {/* Tab Navigation Switcher */}
      <div className="px-margin-mobile mt-2 mb-6">
        <div className="flex items-center p-1 bg-[#e6e8ea] rounded-full w-full relative">
          <div
            className="absolute top-1 bottom-1 w-[calc(50%-4px)] bg-white rounded-full shadow-sm transition-all duration-300 ease-in-out"
            style={{
              left: activeTab === 'qa' ? '4px' : 'calc(50% + 0px)',
            }}
          />
          <button
            type="button"
            onClick={() => setActiveTab('qa')}
            className={`relative z-10 flex-1 py-2 text-[14px] font-semibold text-center transition-colors rounded-full ${
              activeTab === 'qa' ? 'text-[#00236f]' : 'text-[#444651] hover:text-[#191c1e]'
            }`}
          >
            Live Q&amp;A
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('task')}
            className={`relative z-10 flex-1 py-2 text-[14px] font-semibold text-center transition-colors rounded-full ${
              activeTab === 'task' ? 'text-[#00236f]' : 'text-[#444651] hover:text-[#191c1e]'
            }`}
          >
            Micro-Task
          </button>
        </div>
      </div>

      {/* Section 1: Live Q&A */}
      {activeTab === 'qa' && (
        <div className="flex flex-col w-full gap-8 px-margin-mobile transition-opacity duration-300">
          {/* Ask Question Card */}
          <div className="bg-white shadow-md rounded-2xl p-4 flex flex-col gap-3 border border-[#eceef0]">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-8 h-8 rounded-full bg-[#1e3a8a] flex items-center justify-center">
                <span className="material-symbols-outlined text-[#90a8ff] text-[18px]">campaign</span>
              </div>
              <h2 className="text-[20px] font-bold text-[#191c1e]">Live Q&amp;A (Anonymous)</h2>
            </div>

            <form onSubmit={handleQuestionSubmit} className="flex flex-col gap-2">
              <label className="text-[12px] font-medium text-[#444651] ml-1" htmlFor="qa-input">
                พิมพ์คำถามของคุณที่นี่...
              </label>
              <textarea
                id="qa-input"
                rows={3}
                maxLength={200}
                value={questionText}
                onChange={(e) => setQuestionText(e.target.value)}
                placeholder="สงสัยเรื่องอะไร ถามได้เลย..."
                className="w-full bg-[#f2f4f6] text-[#191c1e] text-[16px] p-4 rounded-xl outline-none transition-shadow focus:shadow-[0_0_0_2px_#00236f] resize-none border border-[#e0e3e5]"
              />
              <div className="flex justify-end mt-1">
                <span className="text-[12px] font-medium text-[#757682]">
                  {questionText.length} / 200
                </span>
              </div>

              {showQaSuccess && (
                <div className="flex items-center gap-2 p-3 bg-[#d3e4fe] text-[#0b1c30] rounded-xl animate-fade-in-up">
                  <span className="material-symbols-outlined text-[20px] text-[#00236f]">check_circle</span>
                  <span className="text-[14px] font-semibold">ส่งคำถามเรียบร้อย!</span>
                </div>
              )}

              <button
                type="submit"
                disabled={isQaSubmitting || !questionText.trim()}
                className="mt-2 w-full h-12 flex items-center justify-center gap-2 bg-[#fd761a] hover:bg-[#ff8a3d] text-[#5c2400] text-[16px] font-bold rounded-xl shadow-sm active:scale-[0.98] transition-all disabled:opacity-50"
              >
                {isQaSubmitting ? (
                  <>
                    <span className="material-symbols-outlined text-[20px] animate-spin">
                      progress_activity
                    </span>
                    <span>กำลังส่ง...</span>
                  </>
                ) : (
                  <>
                    <span className="material-symbols-outlined text-[20px]">send</span>
                    <span>ส่งคำถาม</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Popular Questions */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h3 className="text-[20px] font-bold text-[#191c1e]">คำถามยอดนิยม</h3>
              <span className="text-[12px] font-medium text-[#444651] bg-[#e6e8ea] px-3 py-1 rounded-full">
                อัปเดตล่าสุด
              </span>
            </div>

            <div className="flex flex-col gap-3">
              {questions.map((q) => (
                <div
                  key={q.id}
                  className="bg-white shadow-sm rounded-2xl p-4 flex gap-4 items-start border border-[#eceef0]"
                >
                  <button
                    type="button"
                    onClick={() => onToggleVoteQuestion(q.id)}
                    className={`flex flex-col items-center gap-1 p-2.5 rounded-xl transition-all ${
                      q.userVoted
                        ? 'bg-[#ffdbca] text-[#fd761a]'
                        : 'bg-[#eceef0] text-[#444651] hover:bg-[#e6e8ea]'
                    }`}
                  >
                    <span
                      className={`material-symbols-outlined text-[24px] ${
                        q.userVoted ? 'fill-1' : ''
                      }`}
                    >
                      favorite
                    </span>
                    <span className="text-[14px] font-bold">{q.votes}</span>
                  </button>

                  <div className="flex flex-col gap-1 pt-1 flex-1">
                    <p className="text-[16px] text-[#191c1e] leading-relaxed">{q.text}</p>
                    <span className="text-[12px] text-[#444651] mt-1">{q.timeAgo}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Section 2: Micro-Task */}
      {activeTab === 'task' && (
        <div className="flex flex-col w-full gap-8 px-margin-mobile transition-opacity duration-300">
          <div className="bg-white shadow-md rounded-2xl overflow-hidden flex flex-col border border-[#eceef0]">
            {/* Hero Image for Task */}
            <div
              className="w-full h-44 bg-cover bg-center relative"
              style={{
                backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuD7MwWz9Has4wXZRw-0ZAczh6d3buu9zud8XQaOZAKQDKrx9uEx2-9oB-aKh5Bc8rpNm3Z6SwjrrBK7VC4iVgbpjAAHnHbpICYHo301gsbde6Jo_slLvG03l5jIyPRTjdAiCzwqR6f4SjkOJPz7RlwYekozkDtAJCgjbpydA_rXY5-MNYeDH8mru51jiEMClvHZRb8Vj0IVGRy0S_u2ro7doBQQUGJT1SkTG7xS5U2kxp3EH95CVaW2mA')`,
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-white to-transparent" />
            </div>

            <div className="p-4 flex flex-col gap-4 -mt-6 relative z-10">
              <div>
                <span className="inline-block px-3 py-1 bg-[#314156] text-[#9dadc6] text-[12px] font-semibold rounded-lg mb-2">
                  ครบกำหนด: {microTask.dueDate}
                </span>
                <h2 className="text-[28px] font-bold text-[#191c1e]">{microTask.title}</h2>
                <p className="text-[16px] text-[#444651] mt-1">{microTask.description}</p>
              </div>

              <form onSubmit={handleTaskSubmit} className="flex flex-col gap-3 mt-1">
                <div className="flex flex-col gap-1">
                  <label className="text-[12px] font-medium text-[#444651] ml-1" htmlFor="task-input">
                    ลิงก์งานของคุณ (Google Docs / Slides / Drive)
                  </label>
                  <div className="relative flex items-center">
                    <span className="material-symbols-outlined absolute left-4 text-[#444651]">
                      link
                    </span>
                    <input
                      id="task-input"
                      type="url"
                      required
                      value={taskUrl}
                      onChange={(e) => setTaskUrl(e.target.value)}
                      placeholder="https://docs.google.com/..."
                      className="w-full bg-[#f2f4f6] text-[#191c1e] text-[16px] py-3 pr-4 pl-12 rounded-xl outline-none transition-shadow focus:shadow-[0_0_0_2px_#00236f] border border-[#e0e3e5]"
                    />
                  </div>
                </div>

                {showTaskSuccess && (
                  <div className="flex items-center gap-2 p-3 bg-[#d3e4fe] text-[#0b1c30] rounded-xl animate-fade-in-up">
                    <span className="material-symbols-outlined text-[20px] text-[#00236f]">task_alt</span>
                    <span className="text-[14px] font-semibold">ส่งงานย่อยเรียบร้อยแล้ว! (รอตรวจ)</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isTaskSubmitting || !taskUrl.trim()}
                  className="mt-2 w-full h-12 flex items-center justify-center gap-2 bg-[#fd761a] hover:bg-[#ff8a3d] text-[#5c2400] text-[16px] font-bold rounded-xl shadow-sm active:scale-[0.98] transition-all disabled:opacity-50"
                >
                  {isTaskSubmitting ? (
                    <>
                      <span className="material-symbols-outlined text-[20px] animate-spin">
                        progress_activity
                      </span>
                      <span>กำลังส่งงานย่อย...</span>
                    </>
                  ) : (
                    <>
                      <span className="material-symbols-outlined text-[20px]">upload</span>
                      <span>{microTask.isSubmitted ? 'อัปเดตลิงก์ส่งงาน' : 'ส่งงานย่อย'}</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
