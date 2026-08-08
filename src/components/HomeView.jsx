import React from 'react';
import { useAuth } from '../context/AuthContext';

export default function HomeView({ setActiveView, onSelectGrade }) {
  const { setIsAuthModalOpen, setAuthModalTab } = useAuth();

  const handleOpenRegister = () => {
    setAuthModalTab('register');
    setIsAuthModalOpen(true);
  };

  return (
    <section className="view-section active">
      {/* Hero Banner */}
      <div className="hero-card">
        <div className="hero-content">
          <div className="hero-tag">
            <i className="fa-solid fa-wand-magic-sparkles"></i> Nền Tảng Giáo Dục Số Tích Hợp AI, NLS & Supabase (React SPA)
          </div>
          <h1 className="hero-title">Hành Trình Số - Khơi Nguồn Tri Thức Đổi Mới</h1>
          <p className="hero-desc">
            Website giáo dục cá nhân của sáng lập viên <strong>Huỳnh Ngân Giang</strong>. Nơi chia sẻ bài giảng DOCX, PPTX tích hợp Năng lực số (NLS) & Trợ lý AI cho Khối 6, 7, 8, 9, học liệu số, phim giáo dục và game học tập kết nối trực tiếp hệ thống đăng nhập tài khoản <strong>Supabase Database</strong>, tối ưu triển khai trên <strong>Vercel</strong>.
          </p>
          <div className="hero-cta-group">
            <button className="btn btn-primary" onClick={() => setActiveView('lectures')}>
              <i className="fa-solid fa-chalkboard-user"></i> Khám phá Bài Giảng Khối 6-9
            </button>
            <button className="btn btn-vip-gold" onClick={() => setActiveView('vip')}>
              <i className="fa-solid fa-key"></i> Truy Cập Kho VIP
            </button>
            <button className="btn btn-google" onClick={handleOpenRegister}>
              <i className="fa-solid fa-user-plus"></i> Đăng Ký Tài Khoản Mới
            </button>
          </div>

          <div className="founder-info-card">
            <div className="founder-avatar">HNG</div>
            <div className="founder-details">
              <h4>Huỳnh Ngân Giang</h4>
              <p><i className="fa-solid fa-phone"></i> Hotline/Zalo: 0355782168 | <i className="fa-solid fa-envelope"></i> lyngangiang83pt@gmail.com</p>
              <p><i className="fa-solid fa-globe"></i> Domain chính thức: <strong>hanhtrinhso.docbuoc.vn</strong></p>
            </div>
          </div>
        </div>
      </div>

      {/* Grade Quick Filter Cards */}
      <div className="section-header">
        <div>
          <h2 className="section-title"><i className="fa-solid fa-layer-group"></i> Bài Giảng & Học Liệu Theo Khối Lớp</h2>
          <p className="section-subtitle">Lựa chọn khối lớp để trải nghiệm giáo án tích hợp Năng lực số (NLS) và Trợ lý AI</p>
        </div>
      </div>

      <div className="grade-quick-bar">
        <div className="grade-card grade-6" onClick={() => onSelectGrade('6')}>
          <div className="grade-icon">6</div>
          <div className="grade-info">
            <h3>Bài Giảng Khối 6</h3>
            <p>18 Bài giảng & Phiếu bài tập</p>
            <span className="nls-ai-pill"><i className="fa-solid fa-microchip"></i> Tích hợp NLS + AI</span>
          </div>
        </div>

        <div className="grade-card grade-7" onClick={() => onSelectGrade('7')}>
          <div className="grade-icon">7</div>
          <div className="grade-info">
            <h3>Bài Giảng Khối 7</h3>
            <p>22 Bài giảng & File Elearning</p>
            <span className="nls-ai-pill"><i className="fa-solid fa-microchip"></i> Tích hợp NLS + AI</span>
          </div>
        </div>

        <div className="grade-card grade-8" onClick={() => onSelectGrade('8')}>
          <div className="grade-icon">8</div>
          <div className="grade-info">
            <h3>Bài Giảng Khối 8</h3>
            <p>25 Bài giảng PPTX & DOCX</p>
            <span className="nls-ai-pill"><i className="fa-solid fa-microchip"></i> Tích hợp NLS + AI</span>
          </div>
        </div>

        <div className="grade-card grade-9" onClick={() => onSelectGrade('9')}>
          <div className="grade-icon">9</div>
          <div className="grade-info">
            <h3>Bài Giảng Khối 9</h3>
            <p>30 Giáo án ôn thi & Trắc nghiệm</p>
            <span className="nls-ai-pill"><i className="fa-solid fa-microchip"></i> Tích hợp NLS + AI</span>
          </div>
        </div>
      </div>

      {/* Featured Highlights Grid */}
      <div className="section-header">
        <div>
          <h2 className="section-title"><i className="fa-solid fa-star"></i> Tiện Ích Học Tập Nổi Bật</h2>
          <p className="section-subtitle">Công cụ hỗ trợ giáo viên và học sinh học tập chủ động 24/7</p>
        </div>
      </div>

      <div className="grid-cards">
        <div className="content-card">
          <span className="card-tag tag-elearning"><i className="fa-solid fa-robot"></i> Chatbot 24/7</span>
          <h3 className="card-title">Hỏi Đáp Bài Học Online</h3>
          <p className="card-desc">Trợ lý AI thông minh giải đáp câu hỏi 24/24 cho học sinh theo chương trình phổ thông mới (lưu log vào Supabase).</p>
          <div className="card-actions">
            <button className="btn btn-primary" onClick={() => setActiveView('qa')}><i className="fa-solid fa-comments"></i> Chat Ngay</button>
          </div>
        </div>

        <div className="content-card">
          <span className="card-tag tag-pptx"><i className="fa-solid fa-gamepad"></i> Tương Tác</span>
          <h3 className="card-title">Kho Game Giáo Dục</h3>
          <p className="card-desc">Tổng hợp trò chơi Quiz Rồng Vàng, Lật thẻ ghi nhớ và thử thách công nghệ số hấp dẫn.</p>
          <div className="card-actions">
            <button className="btn btn-primary" onClick={() => setActiveView('games')}><i className="fa-solid fa-play"></i> Chơi Game</button>
          </div>
        </div>

        <div className="content-card">
          <span className="card-tag tag-docx"><i className="fa-solid fa-file-arrow-up"></i> Nộp Bài Tập</span>
          <h3 className="card-title">Cổng Nộp Sản Phẩm HS</h3>
          <p className="card-desc">Nộp bài dễ dàng qua Padlet, Google Drive hoặc lưu trực tiếp vào bảng Supabase theo tài khoản học sinh.</p>
          <div className="card-actions">
            <button className="btn btn-primary" onClick={() => setActiveView('submissions')}><i className="fa-solid fa-upload"></i> Nộp Bài</button>
          </div>
        </div>
      </div>
    </section>
  );
}
