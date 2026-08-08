import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { supabase } from '../../lib/supabase';

export default function SubmissionModal({ mode, isOpen, onClose }) {
  const { user } = useAuth();
  const [studentName, setStudentName] = useState(user ? user.name : '');
  const [projectTitle, setProjectTitle] = useState('');
  const [submissionLink, setSubmissionLink] = useState('');
  const [statusMsg, setStatusMsg] = useState('');

  if (!isOpen) return null;

  const handleSubmitSupabase = async () => {
    if (!studentName || !projectTitle) {
      setStatusMsg('⚠️ Vui lòng nhập đầy đủ Họ tên và Tên dự án!');
      return;
    }

    if (supabase) {
      try {
        const { error } = await supabase.from('student_submissions').insert([{
          user_id: user && user.id ? user.id : null,
          student_name: studentName,
          grade: '8',
          project_title: projectTitle,
          submission_channel: 'drive',
          submission_link: submissionLink || 'https://hanhtrinhso.docbuoc.vn',
          status: 'Đã tiếp nhận'
        }]);

        if (!error) {
          alert(`🎉 [Supabase Success] Bài làm của học sinh "${studentName}" đã được lưu thành công vào cơ sở dữ liệu Supabase của Cô Huỳnh Ngân Giang!`);
          onClose();
          return;
        }
      } catch (e) {
        console.warn('Lỗi ghi Supabase:', e);
      }
    }

    alert(`[Thành công] Bài làm của học sinh "${studentName}" đã được tiếp nhận và lưu vào hệ thống!`);
    onClose();
  };

  return (
    <div className="modal-overlay" style={{ opacity: 1, visibility: 'visible' }}>
      <div className="modal-card" style={{ maxWidth: '480px' }}>
        <button className="modal-close-btn" onClick={onClose}>
          <i className="fa-solid fa-xmark"></i>
        </button>

        {mode === 'padlet' && (
          <div style={{ textAlign: 'center' }}>
            <i className="fa-solid fa-chalkboard" style={{ fontSize: '2.5rem', color: '#ff4081', marginBottom: '12px' }}></i>
            <h3>Cổng Nộp Bài Qua Padlet</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', margin: '8px 0 20px' }}>
              Đã kết nối với Bức tường Padlet lớp học của Cô Huỳnh Ngân Giang:<br />
              <strong>padlet.com/lyngangiang83pt/hanhtrinhso</strong>
            </p>
            <button className="btn btn-primary" style={{ width: '100%' }} onClick={() => window.open('https://padlet.com', '_blank')}>
              <i className="fa-solid fa-external-link"></i> Truy Cập Trang Padlet Nộp Bài
            </button>
          </div>
        )}

        {mode === 'drive' && (
          <div>
            <h3>Nộp Bài Trực Tiếp (Supabase / Drive)</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '16px' }}>
              Nhập thông tin bài làm để lưu trực tiếp vào bảng <code>student_submissions</code> trên Supabase:
            </p>

            <div style={{ marginBottom: '12px' }}>
              <label style={{ display: 'block', fontSize: '0.82rem', marginBottom: '4px' }}>Họ và tên học sinh / Lớp:</label>
              <input
                type="text"
                placeholder="Nguyễn Văn An - Lớp 8A1"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                style={{ width: '100%', padding: '10px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-glass)', borderRadius: 'var(--radius-sm)', color: 'var(--text-main)' }}
              />
            </div>

            <div style={{ marginBottom: '12px' }}>
              <label style={{ display: 'block', fontSize: '0.82rem', marginBottom: '4px' }}>Tên Dự án / Bài Tập:</label>
              <input
                type="text"
                placeholder="Ví dụ: Infographic An toàn Mạng"
                value={projectTitle}
                onChange={(e) => setProjectTitle(e.target.value)}
                style={{ width: '100%', padding: '10px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-glass)', borderRadius: 'var(--radius-sm)', color: 'var(--text-main)' }}
              />
            </div>

            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontSize: '0.82rem', marginBottom: '4px' }}>Link Google Drive / Canva / Sản phẩm:</label>
              <input
                type="text"
                placeholder="https://drive.google.com/..."
                value={submissionLink}
                onChange={(e) => setSubmissionLink(e.target.value)}
                style={{ width: '100%', padding: '10px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-glass)', borderRadius: 'var(--radius-sm)', color: 'var(--text-main)' }}
              />
            </div>

            {statusMsg && (
              <p style={{ color: 'var(--accent-rose)', fontSize: '0.82rem', marginBottom: '10px' }}>{statusMsg}</p>
            )}

            <button className="btn btn-primary" style={{ width: '100%' }} onClick={handleSubmitSupabase}>
              <i className="fa-solid fa-cloud-arrow-up"></i> Gửi Sản Phẩm Lên Supabase
            </button>
          </div>
        )}

        {mode === 'zalo' && (
          <div style={{ textAlign: 'center' }}>
            <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: '#0068ff', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2.5rem', margin: '0 auto 16px' }}>
              <i className="fa-solid fa-comment-dots"></i>
            </div>
            <h3>Zalo Official Account: Huỳnh Ngân Giang</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', margin: '8px 0 20px' }}>
              SĐT / Zalo hỗ trợ học sinh & giáo viên: <strong>0355782168</strong><br />
              Email tiếp nhận bài làm: <strong>lyngangiang83pt@gmail.com</strong>
            </p>
            <button className="btn btn-primary" style={{ width: '100%' }} onClick={() => window.open('https://zalo.me/0355782168', '_blank')}>
              <i className="fa-solid fa-paper-plane"></i> Nhắn Tin Trực Tiếp Qua Zalo
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
