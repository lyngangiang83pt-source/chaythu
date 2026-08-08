import React from 'react';

const gallery = [
  { title: 'Infographic: 5 Tiêu chuẩn An toàn Mạng', student: 'Trần Thị Bích - Lớp 9A2', grade: '9', status: 'Đạt giải Nhất' },
  { title: 'Video Animation: Khai phá Trợ lý AI', student: 'Lê Minh Khoa - Lớp 8B1', grade: '8', status: 'Xuất sắc' },
  { title: 'Slide PPTX: Lịch sử Máy tính Số', student: 'Phạm Hoàng Nam - Lớp 7A3', grade: '7', status: 'Đánh giá Cao' }
];

export default function SubmissionsView({ onOpenPadlet, onOpenDrive, onOpenZalo }) {
  return (
    <section className="view-section active">
      <div className="section-header">
        <div>
          <h2 className="section-title"><i className="fa-solid fa-shapes"></i> Cổng Nộp & Trưng Bày Sản Phẩm Học Sinh</h2>
          <p className="section-subtitle">Nộp bài tập qua Padlet, Google Drive hoặc lưu trực tiếp vào bảng Supabase</p>
        </div>
      </div>

      <div className="submission-options">
        <div className="submission-card">
          <div className="submission-icon icon-padlet"><i className="fa-solid fa-chalkboard"></i></div>
          <h3>Nộp Bài Trên Padlet</h3>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>
            Đăng tải hình ảnh, video sản phẩm dự án học tập lên bức tường Padlet chung của lớp.
          </p>
          <button className="btn btn-primary" onClick={onOpenPadlet}>
            <i className="fa-solid fa-external-link"></i> Mở Mãng Padlet
          </button>
        </div>

        <div className="submission-card">
          <div className="submission-icon icon-drive"><i className="fa-solid fa-cloud-arrow-up"></i></div>
          <h3>Nộp Trực Tiếp (Supabase / Drive)</h3>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>
            Gửi link bài làm hoặc file dự án được lưu trữ trực tiếp vào cơ sở dữ liệu Supabase của cô Giang.
          </p>
          <button className="btn btn-primary" onClick={onOpenDrive}>
            <i className="fa-solid fa-folder-open"></i> Nộp Bài Ngay
          </button>
        </div>

        <div className="submission-card">
          <div className="submission-icon icon-zalo"><i className="fa-solid fa-comment-dots"></i></div>
          <h3>Gửi Bài Qua Zalo OA</h3>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>
            Gửi tin nhắn bài làm cho giáo viên Huỳnh Ngân Giang qua kênh Zalo Official Account.
          </p>
          <button className="btn btn-primary" onClick={onOpenZalo}>
            <i className="fa-solid fa-paper-plane"></i> Mở Zalo OA (0355782168)
          </button>
        </div>
      </div>

      <div className="section-header">
        <div>
          <h3 className="section-title" style={{ fontSize: '1.4rem' }}>
            <i className="fa-solid fa-award"></i> Sản Phẩm Học Sinh Tiêu Biểu
          </h3>
        </div>
      </div>

      <div className="grid-cards">
        {gallery.map((item, i) => (
          <div key={i} className="content-card">
            <span className="card-tag tag-elearning"><i className="fa-solid fa-award"></i> {item.status}</span>
            <h3 className="card-title">{item.title}</h3>
            <p className="card-desc">Tác giả: <strong>{item.student}</strong></p>
            <div className="card-actions">
              <button className="btn btn-google" onClick={() => alert(`Đang mở bài làm học sinh:\n"${item.title}" (${item.student})`)}>
                <i className="fa-solid fa-eye"></i> Xem Bài Làm
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
