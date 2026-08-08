import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

const defaultAssignmentsData = [
  { id: 201, grade: '6', title: 'Phiếu học tập #1: Phân biệt Tin giả & Tin thật trên Mạng', type: 'Phiếu học tập', deadline: '15/08/2026' },
  { id: 202, grade: '7', title: 'Bài tập về nhà #2: Thực hành Viết Prompt AI tạo Dàn ý Bài văn', type: 'Bài tập về nhà', deadline: '18/08/2026' },
  { id: 203, grade: '8', title: 'Phiếu bài tập #3: Phân tích Dữ liệu Số & Vẽ Biểu đồ', type: 'Phiếu học tập', deadline: '20/08/2026' },
  { id: 204, grade: '9', title: 'Dự án Cuối khóa: Thiết kế Infographic Hướng nghiệp Số', type: 'Bài tập dự án', deadline: '25/08/2026' }
];

export default function AssignmentsView({ setActiveView }) {
  const [assignments, setAssignments] = useState(defaultAssignmentsData);
  const [selectedGrade, setSelectedGrade] = useState('all');

  useEffect(() => {
    async function loadAssignments() {
      if (supabase) {
        try {
          const { data, error } = await supabase.from('assignments').select('*').order('created_at', { ascending: false });
          if (data && data.length > 0 && !error) {
            setAssignments(data.map(item => ({
              id: item.id,
              grade: item.grade,
              title: item.title,
              type: item.type,
              deadline: item.deadline
            })));
          }
        } catch (e) {
          console.warn('Fallback assignments error:', e);
        }
      }
    }
    loadAssignments();
  }, []);

  const filtered = selectedGrade === 'all'
    ? assignments
    : assignments.filter(a => a.grade === selectedGrade);

  return (
    <section className="view-section active">
      <div className="section-header">
        <div>
          <h2 className="section-title"><i className="fa-solid fa-pen-to-square"></i> Bài Tập & Phiếu Học Tập</h2>
          <p className="section-subtitle">Phiếu bài tập tự luyện và bài tập về nhà theo chuẩn kiến thức kỹ năng Khối 6-9</p>
        </div>
      </div>

      <div className="tabs-header">
        <button className={`tab-btn ${selectedGrade === 'all' ? 'active' : ''}`} onClick={() => setSelectedGrade('all')}>Tất cả bài tập</button>
        <button className={`tab-btn ${selectedGrade === '6' ? 'active' : ''}`} onClick={() => setSelectedGrade('6')}>Khối 6</button>
        <button className={`tab-btn ${selectedGrade === '7' ? 'active' : ''}`} onClick={() => setSelectedGrade('7')}>Khối 7</button>
        <button className={`tab-btn ${selectedGrade === '8' ? 'active' : ''}`} onClick={() => setSelectedGrade('8')}>Khối 8</button>
        <button className={`tab-btn ${selectedGrade === '9' ? 'active' : ''}`} onClick={() => setSelectedGrade('9')}>Khối 9</button>
      </div>

      <div className="grid-cards">
        {filtered.map(item => (
          <div key={item.id} className="content-card">
            <div style={{ display: 'flex', gap: '8px' }}>
              <span className="card-tag tag-pptx">{item.type}</span>
              <span className="card-tag tag-docx">Khối {item.grade}</span>
            </div>
            <h3 className="card-title">{item.title}</h3>
            <p className="card-desc">Phiếu bài tập thực hành thiết kế rèn luyện Năng lực số cho học sinh lớp {item.grade}.</p>
            <div className="card-meta">
              <span><i className="fa-regular fa-clock"></i> Hạn nộp: <strong>{item.deadline}</strong></span>
              <span><i className="fa-solid fa-user-tie"></i> Huỳnh Ngân Giang</span>
            </div>
            <div className="card-actions">
              <button className="btn btn-primary" onClick={() => alert(`[Thành công] Đã tải xuống file PDF: ${item.title}`)}>
                <i className="fa-solid fa-file-pdf"></i> Tải Phiếu Bài Tập
              </button>
              <button className="btn btn-google" onClick={() => setActiveView('submissions')}>
                <i className="fa-solid fa-upload"></i> Nộp Bài
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
