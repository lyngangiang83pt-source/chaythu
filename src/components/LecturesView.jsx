import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

const defaultLecturesData = [
  { id: 101, grade: '6', title: 'Bài 1: Năng lực số và Công cụ Tìm kiếm An toàn', format: 'pptx', hasAI: true, desc: 'Bài giảng Slide PPTX sinh động tích hợp ứng dụng AI tra cứu tri thức dành cho học sinh Khối 6.', downloads: 1420 },
  { id: 102, grade: '6', title: 'Phiếu Giáo án: Đạo đức Số & Bảo vệ Thông tin Cá nhân', format: 'docx', hasAI: true, desc: 'Kế hoạch bài dạy DOCX chuẩn 5512 tích hợp ma trận Năng lực số (NLS).', downloads: 980 },
  { id: 103, grade: '7', title: 'Bài 3: Xử lý Dữ liệu Bảng tính với Trợ lý AI', format: 'pptx', hasAI: true, desc: 'Hướng dẫn sử dụng hàm Excel/Google Sheets nâng cao kết hợp AI phân tích số liệu.', downloads: 1650 },
  { id: 104, grade: '7', title: 'E-learning: Hành trang Kỹ năng Số Tuổi Teen', format: 'elearning', hasAI: true, desc: 'Bài giảng Elearning HTML5 tương tác trực tiếp với câu hỏi trắc nghiệm tự động.', downloads: 2100 },
  { id: 105, grade: '8', title: 'Bài 5: Lập trình Tư duy Thuật toán & Câu lệnh Prompt AI', format: 'pptx', hasAI: true, desc: 'Giáo án PPTX giới thiệu tư duy máy tính và cách giao tiếp với các mô hình AI lớn.', downloads: 1890 },
  { id: 106, grade: '8', title: 'Giáo án DOCX: Thiết kế Slide Bài thuyết trình với Canva AI', format: 'docx', hasAI: true, desc: 'Tài liệu chi tiết hướng dẫn học sinh tạo bài trình chiếu chuyên nghiệp.', downloads: 1340 },
  { id: 107, grade: '9', title: 'Bài 8: Ôn tập Tổng hợp Năng lực số & Đề án Chuyển đổi số', format: 'pptx', hasAI: true, desc: 'Bài giảng chuẩn bị cho kỳ kiểm tra đánh giá Năng lực số lớp 9.', downloads: 2450 },
  { id: 108, grade: '9', title: 'E-learning: Thực hành An toàn Thông tin & Quyền Riêng tư', format: 'elearning', hasAI: true, desc: 'Mô phỏng các tình huống an toàn mạng thực tế dành cho học sinh cuối cấp.', downloads: 1780 }
];

export default function LecturesView({ initialGrade = 'all' }) {
  const [lectures, setLectures] = useState(defaultLecturesData);
  const [selectedGrade, setSelectedGrade] = useState(initialGrade);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    async function loadLectures() {
      if (supabase) {
        try {
          const { data, error } = await supabase.from('lectures').select('*').order('created_at', { ascending: false });
          if (data && data.length > 0 && !error) {
            setLectures(data.map(item => ({
              id: item.id,
              grade: item.grade,
              title: item.title,
              format: item.format,
              hasAI: item.has_ai,
              desc: item.description,
              downloads: item.downloads || 0
            })));
          }
        } catch (e) {
          console.warn('Fallback lectures error:', e);
        }
      }
    }
    loadLectures();
  }, []);

  const filteredLectures = lectures.filter(item => {
    const matchGrade = selectedGrade === 'all' || item.grade === selectedGrade;
    const matchSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      (item.desc && item.desc.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchGrade && matchSearch;
  });

  return (
    <section className="view-section active">
      <div className="section-header">
        <div>
          <h2 className="section-title"><i className="fa-solid fa-chalkboard-user"></i> Kho Bài Giảng Khối 6 - 7 - 8 - 9</h2>
          <p className="section-subtitle">File `.pptx` & `.docx` <strong>tích hợp Năng lực số (NLS) và AI</strong> từ Supabase DB</p>
        </div>
      </div>

      <div className="filter-bar">
        <div className="tabs-header" style={{ marginBottom: 0, border: 'none' }}>
          <button className={`tab-btn ${selectedGrade === 'all' ? 'active' : ''}`} onClick={() => setSelectedGrade('all')}>Tất cả Khối</button>
          <button className={`tab-btn ${selectedGrade === '6' ? 'active' : ''}`} onClick={() => setSelectedGrade('6')}>Khối 6</button>
          <button className={`tab-btn ${selectedGrade === '7' ? 'active' : ''}`} onClick={() => setSelectedGrade('7')}>Khối 7</button>
          <button className={`tab-btn ${selectedGrade === '8' ? 'active' : ''}`} onClick={() => setSelectedGrade('8')}>Khối 8</button>
          <button className={`tab-btn ${selectedGrade === '9' ? 'active' : ''}`} onClick={() => setSelectedGrade('9')}>Khối 9</button>
        </div>

        <div className="search-input-box">
          <i className="fa-solid fa-magnifying-glass"></i>
          <input
            type="text"
            placeholder="Tìm kiếm bài giảng..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="grid-cards">
        {filteredLectures.length === 0 ? (
          <p style={{ gridColumn: '1 / -1', textAlign: 'center', color: 'var(--text-muted)' }}>Không tìm thấy bài giảng phù hợp.</p>
        ) : (
          filteredLectures.map(item => {
            let tagClass = 'tag-pptx';
            let formatLabel = 'PPTX (Slide)';
            if (item.format === 'docx') { tagClass = 'tag-docx'; formatLabel = 'DOCX (Giáo án)'; }
            if (item.format === 'elearning') { tagClass = 'tag-elearning'; formatLabel = 'E-learning'; }

            return (
              <div key={item.id} className="content-card">
                <div style={{ display: 'flex', gap: '8px' }}>
                  <span className={`card-tag ${tagClass}`}>{formatLabel}</span>
                  <span className="card-tag tag-docx" style={{ background: 'rgba(99, 102, 241, 0.2)', color: '#a5b4fc' }}>Khối {item.grade}</span>
                </div>
                <h3 className="card-title">{item.title}</h3>
                <p className="card-desc">{item.desc}</p>
                <div style={{ marginBottom: '12px' }}>
                  <span className="nls-ai-pill"><i className="fa-solid fa-microchip"></i> Tích hợp NLS + AI</span>
                </div>
                <div className="card-meta">
                  <span><i className="fa-solid fa-download"></i> {item.downloads} lượt tải</span>
                  <span><i className="fa-solid fa-circle-check" style={{ color: 'var(--accent-emerald)' }}></i> Đã kiểm định</span>
                </div>
                <div className="card-actions">
                  <button className="btn btn-primary" onClick={() => alert(`[Thành công] Đã tải xuống bài giảng:\n"${item.title}" (${formatLabel})\nTác giả: Huỳnh Ngân Giang`)}>
                    <i className="fa-solid fa-download"></i> Tải Bài Giảng
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </section>
  );
}
