import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

const defaultAnnouncements = [
  { id: 1, title: '🔥 Cập nhật hệ thống: Tích hợp Trợ lý AI Hỏi - Đáp 24/7 Mới', date: '06/08/2026', desc: 'Hệ thống đã cập nhật AI trả lời trực tiếp 24/24 cho học sinh Khối 6-9.', is_pinned: true },
  { id: 2, title: '📢 Đã tải lên Bộ Bài Giảng PPTX NLS Khối 8 & Khối 9 Mới', date: '03/08/2026', desc: 'Các cô giáo và học sinh có thể vào phân hệ Bài Giảng để tải về bài học mới nhất.', is_pinned: false },
  { id: 3, title: '🌟 Mở khóa Kho VIP với Mã VIP2026 cho Thành viên Thử nghiệm', date: '01/08/2026', desc: 'Nhập mã VIP2026 để trải nghiệm bộ giáo án và trợ lý AI nâng cao.', is_pinned: false }
];

export default function AnnouncementsView() {
  const [announcements, setAnnouncements] = useState(defaultAnnouncements);

  useEffect(() => {
    async function loadAnnouncements() {
      if (supabase) {
        try {
          const { data, error } = await supabase.from('announcements').select('*').order('created_at', { ascending: false });
          if (data && data.length > 0 && !error) {
            setAnnouncements(data.map(item => ({
              id: item.id,
              title: item.title,
              date: item.date,
              desc: item.description,
              is_pinned: item.is_pinned
            })));
          }
        } catch (e) {
          console.warn('Fallback announcements error:', e);
        }
      }
    }
    loadAnnouncements();
  }, []);

  return (
    <section className="view-section active">
      <div className="section-header">
        <div>
          <h2 className="section-title"><i className="fa-solid fa-bell"></i> Trung Tâm Thông Báo Website</h2>
          <p className="section-subtitle">Các thông tin mới nhất cập nhật theo thời gian thực từ bảng Supabase announcements</p>
        </div>
      </div>

      <div className="grid-cards">
        {announcements.map(a => (
          <div key={a.id} className="content-card">
            <span className="card-tag tag-docx">
              <i className="fa-solid fa-bell"></i> {a.is_pinned ? 'Ghim đầu trang' : 'Thông báo mới'}
            </span>
            <h3 className="card-title">{a.title}</h3>
            <p className="card-desc">{a.desc}</p>
            <div className="card-meta">
              <span><i className="fa-regular fa-clock"></i> Cập nhật: {a.date}</span>
              <span><i className="fa-solid fa-circle-info" style={{ color: 'var(--accent-cyan)' }}></i> Đã xác thực</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
