import React from 'react';

export default function Footer({ setActiveView, onOpenSupabaseModal }) {
  return (
    <footer>
      <div className="footer-container">
        <div className="footer-col">
          <div className="logo-brand" style={{ marginBottom: '14px' }}>
            <div className="logo-icon" style={{ width: '36px', height: '36px', fontSize: '1.1rem' }}>
              <i className="fa-solid fa-graduation-cap"></i>
            </div>
            <span className="logo-title" style={{ fontSize: '1.1rem' }}>HÀNH TRÌNH SỐ</span>
          </div>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
            Website giáo dục cá nhân dành cho công tác giảng dạy và học tập sáng tạo. Tích hợp Năng lực số (NLS), AI và hệ thống xác thực người dùng Supabase Database.
          </p>
        </div>

        <div className="footer-col">
          <h4>Liên Hệ Tác Giả</h4>
          <ul className="footer-links">
            <li><i className="fa-solid fa-user-tie"></i> Người sáng lập: <strong>Huỳnh Ngân Giang</strong></li>
            <li><i className="fa-solid fa-phone"></i> SĐT / Zalo: <strong>0355782168</strong></li>
            <li><i className="fa-solid fa-envelope"></i> Email: <strong>lyngangiang83pt@gmail.com</strong></li>
            <li><i className="fa-solid fa-globe"></i> Domain: <strong>hanhtrinhso.docbuoc.vn</strong></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Cơ Sở Dữ Liệu & Danh Mục</h4>
          <ul className="footer-links">
            <li><a href="#" onClick={(e) => { e.preventDefault(); onOpenSupabaseModal(); }}><i className="fa-solid fa-database" style={{ color: '#3ecf8e' }}></i> Quản trị Supabase Database</a></li>
            <li><a href="#" onClick={(e) => { e.preventDefault(); setActiveView('lectures'); }}>Bài giảng Khối 6, 7, 8, 9 (NLS & AI)</a></li>
            <li><a href="#" onClick={(e) => { e.preventDefault(); setActiveView('assignments'); }}>Phiếu học tập & Bài tập về nhà</a></li>
            <li><a href="#" onClick={(e) => { e.preventDefault(); setActiveView('vip'); }}>Kho VIP mở khóa tài liệu</a></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2026 <strong>hanhtrinhso.docbuoc.vn</strong> - Phát triển bởi Huỳnh Ngân Giang. Đồng bộ dữ liệu Supabase Database & Vercel Ready.</p>
      </div>
    </footer>
  );
}
