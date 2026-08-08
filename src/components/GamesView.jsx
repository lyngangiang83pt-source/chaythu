import React, { useState } from 'react';

const quizQuestions = [
  {
    question: "Kỹ năng nào sau đây là quan trọng nhất trong Khung Năng Lực Số (NLS)?",
    options: ["Gõ bàn phím 10 ngón thật nhanh", "Tư duy phản biện và Đánh giá An toàn Thông tin", "Tải video trên Youtube", "Chơi game trực tuyến"],
    answerIndex: 1
  },
  {
    question: "Để yêu cầu Trợ lý AI hỗ trợ giải bài tập hiệu quả, câu lệnh (Prompt) nên có yếu tố nào?",
    options: ["Câu lệnh thật ngắn 1 từ", "Bối cảnh rõ ràng, vai trò của AI và mục tiêu bài tập", "Không cần ghi nội dung", "Dùng từ ngữ viết tắt khó hiểu"],
    answerIndex: 1
  },
  {
    question: "Website chính thức của Cô Huỳnh Ngân Giang là gì?",
    options: ["docbuoc.com", "hanhtrinhso.docbuoc.vn", "hoclieuso.vn", "giangday.edu.vn"],
    answerIndex: 1
  }
];

export default function GamesView() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);

  const currentQ = quizQuestions[currentIdx];

  const handleSelect = (index) => {
    if (isAnswered) return;
    setSelectedAnswer(index);
    setIsAnswered(true);
    if (index === currentQ.answerIndex) {
      setScore(score + 10);
    }
  };

  const handleNext = () => {
    if (currentIdx + 1 < quizQuestions.length) {
      setCurrentIdx(currentIdx + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
    } else {
      alert(`🎉 Chúc mừng bạn đã hoàn thành Trò chơi Năng lực số!\nTổng điểm đạt được: ${score + (selectedAnswer === currentQ.answerIndex ? 0 : 0)} điểm.`);
      setCurrentIdx(0);
      setScore(0);
      setSelectedAnswer(null);
      setIsAnswered(false);
    }
  };

  return (
    <section className="view-section active">
      <div className="section-header">
        <div>
          <h2 className="section-title"><i className="fa-solid fa-gamepad"></i> Kho Game Giáo Dục Tương Tác</h2>
          <p className="section-subtitle">Chơi mà học - Học mà chơi với các trò chơi củng cố tri thức số</p>
        </div>
      </div>

      <div className="game-container">
        <div className="game-quiz-box">
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px', color: 'var(--text-muted)' }}>
            <span><i className="fa-solid fa-trophy" style={{ color: '#f59e0b' }}></i> Trò chơi: <strong>Chinh Phục Năng Lực Số</strong></span>
            <span>Điểm: {score}</span>
          </div>

          <div className="quiz-question">
            Câu {currentIdx + 1}: {currentQ.question}
          </div>

          <div className="quiz-options">
            {currentQ.options.map((opt, idx) => {
              let optClass = 'quiz-opt-btn';
              let iconClass = 'fa-regular fa-circle';

              if (isAnswered) {
                if (idx === currentQ.answerIndex) {
                  optClass += ' correct';
                  iconClass = 'fa-solid fa-circle-check';
                } else if (idx === selectedAnswer) {
                  optClass += ' wrong';
                  iconClass = 'fa-solid fa-circle-xmark';
                }
              }

              return (
                <button
                  key={idx}
                  className={optClass}
                  onClick={() => handleSelect(idx)}
                  disabled={isAnswered}
                >
                  <span>{String.fromCharCode(65 + idx)}. {opt}</span>
                  <i className={iconClass}></i>
                </button>
              );
            })}
          </div>

          {isAnswered && (
            <div style={{ textAlign: 'right' }}>
              <button className="btn btn-primary" onClick={handleNext}>
                {currentIdx + 1 < quizQuestions.length ? 'Câu tiếp theo' : 'Hoàn thành game'} <i className="fa-solid fa-arrow-right"></i>
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
