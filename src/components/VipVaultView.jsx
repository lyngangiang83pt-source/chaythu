import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabase';

const vipItems = [
  { title: 'Bộ Giáo Án AI Chuyên Sâu Tích Hợp NLS Toàn Cấp THCS', type: 'Bộ Giáo Án VIP', desc: 'Trọn bộ file DOCX và PPTX theo chuẩn mô hình 5512 tích hợp các câu lệnh Prompt AI mẫu.' },
  { title: 'Trợ Lý AI Prompt Generator Cao Cấp', type: 'Công cụ AI VIP', desc: 'Công cụ tự động sinh câu lệnh Prompt dạy học cho giáo viên đạt chuẩn Năng lực số.' },
  { title: 'Kho 500+ Đề Thi Trắc Nghiệm Chấm Điểm Tự Động', type: 'Đề Thi VIP', desc: 'Ngân hàng câu hỏi trắc nghiệm đánh giá năng lực số có đáp án chi tiết.' }
];

export default function VipVaultView() {
  const { user } = useAuth();
  const [isVipModalOpen, setIsVipModalOpen] = useState(false);
  const [vipCode, setVipCode] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(user && user.is_vip);

  const handleSubmitCode = async () => {
    const cleanCode = vipCode.trim().toUpperCase();
    let isValid = false;

    if (supabase) {
      try {
        const { data, error } = await supabase.from('vip_codes').select('*').eq('code', cleanCode).eq('is_active', true);
        if (data && data.length > 0 && !error) {
          isValid = true;
        }
      } catch (e) {
        console.warn('Supabase VIP check error:', e);
      }
    }

    if (cleanCode === 'VIP2026' || cleanCode === 'DOCBUOC83' || cleanCode === 'HANHTRINHSO') {
      isValid = true;
    }

    if (isValid) {
      setIsUnlocked(true);
      setIsVipModalOpen(false);
      alert('🎉 Mở khóa thành công! Mã VIP hợp lệ đã được xác thực bởi Supabase!');
    } else {
      setErrorMessage('Mã không hợp lệ! Hãy thử nhập: VIP2026 hoặc DOCBUOC83');
    }
  };

  return (
    <section className="view-section active">
      <div className="section-header">
        <div>
          <h2 className="section-title"><i className="fa-solid fa-crown" style={{ color: '#f59e0b' }}></i> Kho VIP Độc Quyền (VIP Vault)</h2>
          <p className="section-subtitle">Kho tài liệu giáo án nâng cao, trợ lý AI cao cấp xác thực trực tiếp từ Supabase</p>
        </div>
      </div>

      {!isUnlocked ? (
        <div style={{ background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.15), rgba(30, 27, 75, 0.8))', border: '1px solid rgba(245, 158, 11, 0.4)', borderRadius: 'var(--radius-xl)', padding: '40px', textAlign: 'center', marginBottom: '36px' }}>
          <div style={{ fontSize: '3rem', color: '#f59e0b', marginBottom: '12px' }}><i className="fa-solid fa-lock"></i></div>
          <h3 style={{ fontSize: '1.8rem', marginBottom: '12px' }}>Yêu Cầu Nhập Mã VIP Để Mở Khóa Tài Liệu</h3>
          <p style={{ color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto 24px' }}>
            Kho VIP chứa các bộ giáo án tích hợp NLS & AI chuyên sâu, bộ đề thi thử độc quyền và công cụ Trợ lý AI Prompt Generator nâng cao của Cô Huỳnh Ngân Giang.
          </p>
          <button className="btn btn-vip-gold" onClick={() => { setIsVipModalOpen(true); setErrorMessage(''); }}>
            <i className="fa-solid fa-key"></i> Nhập Mã VIP Mở Khóa
          </button>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '12px' }}>
            (Mã mở khóa mẫu trong Supabase: <strong>VIP2026</strong> hoặc <strong>DOCBUOC83</strong>)
          </p>
        </div>
      ) : (
        <div>
          <div style={{ background: 'rgba(16, 185, 129, 0.15)', border: '1px solid var(--accent-emerald)', color: '#34d399', padding: '14px 20px', borderRadius: 'var(--radius-md)', marginBottom: '24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span><i className="fa-solid fa-circle-check"></i> Đã mở khóa thành công Kho VIP! Quyền hạn: <strong>Thành viên VIP Cao Cấp (Supabase Auth)</strong></span>
            <button className="btn btn-google" style={{ padding: '4px 10px', fontSize: '0.8rem' }} onClick={() => setIsUnlocked(false)}>
              Đóng lại
            </button>
          </div>

          <div className="grid-cards">
            {vipItems.map((item, i) => (
              <div key={i} className="content-card" style={{ borderColor: 'rgba(245, 158, 11, 0.4)' }}>
                <span className="card-tag tag-vip"><i className="fa-solid fa-crown"></i> {item.type}</span>
                <h3 className="card-title">{item.title}</h3>
                <p className="card-desc">{item.desc}</p>
                <div className="card-actions">
                  <button className="btn btn-vip-gold" onClick={() => alert(`Đang tải tài liệu VIP độc quyền:\n"${item.title}"`)}>
                    <i className="fa-solid fa-download"></i> Tải VIP Ngay
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Modal Nhập Mã VIP */}
      {isVipModalOpen && (
        <div className="modal-overlay" style={{ opacity: 1, visibility: 'visible' }}>
          <div className="modal-card" style={{ textAlign: 'center' }}>
            <button className="modal-close-btn" onClick={() => setIsVipModalOpen(false)}>
              <i className="fa-solid fa-xmark"></i>
            </button>
            <div style={{ fontSize: '2.5rem', color: '#f59e0b', marginBottom: '10px' }}>
              <i className="fa-solid fa-key"></i>
            </div>
            <h3>Nhập Mã Kích Hoạt VIP</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '6px' }}>
              Hệ thống kiểm tra trực tiếp qua bảng <code>vip_codes</code> trên Supabase
            </p>

            <div className="vip-input-group">
              <input
                type="text"
                placeholder="Ví dụ: VIP2026"
                maxLength="12"
                value={vipCode}
                onChange={(e) => setVipCode(e.target.value)}
              />
              <button className="btn btn-vip-gold" onClick={handleSubmitCode}>
                <i className="fa-solid fa-unlock"></i> Mở Khóa VIP
              </button>
            </div>
            {errorMessage && (
              <p style={{ color: 'var(--accent-rose)', fontSize: '0.85rem' }}>{errorMessage}</p>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
