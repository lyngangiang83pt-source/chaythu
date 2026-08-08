import React, { useState } from 'react';
import { SUPABASE_PROJECT_URL, SUPABASE_ANON_KEY } from '../../lib/supabase';

export default function SupabaseModal({ isOpen, onClose }) {
  const [url, setUrl] = useState(localStorage.getItem('supabase_url') || SUPABASE_PROJECT_URL);
  const [key, setKey] = useState(localStorage.getItem('supabase_key') || SUPABASE_ANON_KEY);
  const [status, setStatus] = useState('');

  if (!isOpen) return null;

  const handleSave = () => {
    if (!url || !key) {
      setStatus('⚠️ Vui lòng nhập đầy đủ Project URL và Anon Key!');
      return;
    }
    localStorage.setItem('supabase_url', url);
    localStorage.setItem('supabase_key', key);
    setStatus('✅ Đã lưu cấu hình Supabase! Đang tải lại trang...');
    setTimeout(() => {
      window.location.reload();
    }, 800);
  };

  const handleReset = () => {
    localStorage.removeItem('supabase_url');
    localStorage.removeItem('supabase_key');
    setUrl(SUPABASE_PROJECT_URL);
    setKey(SUPABASE_ANON_KEY);
    setStatus('🔄 Đã khôi phục cài đặt gốc Supabase của Cô Huỳnh Ngân Giang!');
  };

  return (
    <div className="modal-overlay" style={{ opacity: 1, visibility: 'visible' }}>
      <div className="modal-card" style={{ maxWidth: '520px' }}>
        <button className="modal-close-btn" onClick={onClose}>
          <i className="fa-solid fa-xmark"></i>
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
          <div className="logo-icon" style={{ background: '#3ecf8e', width: '40px', height: '40px', fontSize: '1.2rem' }}>
            <i className="fa-solid fa-database"></i>
          </div>
          <div>
            <h3 style={{ fontSize: '1.2rem' }}>Cấu Hình Supabase Database</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>hanhtrinhso.docbuoc.vn</p>
          </div>
        </div>

        <div style={{ marginBottom: '14px' }}>
          <label style={{ display: 'block', fontSize: '0.82rem', marginBottom: '4px', color: 'var(--text-muted)' }}>
            Supabase Project URL:
          </label>
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            style={{ width: '100%', padding: '10px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-glass)', borderRadius: 'var(--radius-sm)', color: 'var(--text-main)', fontSize: '0.85rem' }}
          />
        </div>

        <div style={{ marginBottom: '18px' }}>
          <label style={{ display: 'block', fontSize: '0.82rem', marginBottom: '4px', color: 'var(--text-muted)' }}>
            Supabase Anon Public API Key:
          </label>
          <textarea
            rows="3"
            value={key}
            onChange={(e) => setKey(e.target.value)}
            style={{ width: '100%', padding: '10px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-glass)', borderRadius: 'var(--radius-sm)', color: 'var(--text-main)', fontSize: '0.8rem', resize: 'none' }}
          />
        </div>

        {status && (
          <div style={{ fontSize: '0.85rem', marginBottom: '14px', color: status.includes('✅') ? '#34d399' : '#fbbf24' }}>
            {status}
          </div>
        )}

        <div style={{ display: 'flex', gap: '10px' }}>
          <button className="btn btn-primary" style={{ flex: 1 }} onClick={handleSave}>
            <i className="fa-solid fa-cloud-arrow-up"></i> Lưu & Kết Nối
          </button>
          <button className="btn btn-google" onClick={handleReset}>
            Khôi Phục Gốc
          </button>
        </div>
      </div>
    </div>
  );
}
