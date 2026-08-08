import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

const defaultNewsData = [
  { id: 1, category: 'truong', title: 'Hội thi Thiết kế Học liệu số Tích hợp AI năm học 2025-2026', date: '05/08/2026', desc: 'Trường phát động hội thi sản phẩm bài giảng số tích hợp Năng lực số (NLS) dành cho học sinh Khối 6-9.', tag: 'Tin trường' },
  { id: 2, category: 'vanban', title: 'Văn bản Hướng dẫn Thực hiện Khung Năng lực số Phổ thông Mới', date: '01/08/2026', desc: 'Bộ Giáo dục và Đào tạo ban hành quy định tích hợp kỹ năng công nghệ số vào giáo án giảng dạy.', tag: 'Văn bản' },
  { id: 3, category: 'thongbao', title: 'Thông báo Lịch nộp Sản phẩm Dự án Kỹ năng số Khối 8 & 9', date: '30/07/2026', desc: 'Học sinh hoàn thiện video và bài thuyết trình PPTX nộp trước ngày 15/08 trên cổng Padlet hoặc Zalo OA.', tag: 'Thông báo' },
  { id: 4, category: 'huongnghiep', title: 'Định hướng Nghề nghiệp Kỷ nguyên AI cho Học sinh THCS', date: '25/07/2026', desc: 'Chuyên đề giới thiệu các ngành nghề công nghệ mới: Kỹ sư AI, Chuyên gia An toàn thông tin, Nhà phân tích dữ liệu.', tag: 'Hướng nghiệp' }
];

export default function NewsView() {
  const [news, setNews] = useState(defaultNewsData);
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    async function loadNews() {
      if (supabase) {
        try {
          const { data, error } = await supabase.from('news').select('*').order('created_at', { ascending: false });
          if (data && data.length > 0 && !error) {
            setNews(data.map(item => ({
              id: item.id,
              category: item.category,
              title: item.title,
              date: item.date,
              desc: item.content,
              tag: item.tag || 'Tin tức'
            })));
          }
        } catch (e) {
          console.warn('Fallback news error:', e);
        }
      }
    }
    loadNews();
  }, []);

  const filteredNews = selectedCategory === 'all' 
    ? news 
    : news.filter(item => item.category === selectedCategory);

  return (
    <section className="view-section active">
      <div className="section-header">
        <div>
          <h2 className="section-title"><i className="fa-solid fa-newspaper"></i> Bảng Tin Giáo Dục & Hướng Nghiệp</h2>
          <p className="section-subtitle">Cập nhật tin tức trường học, văn bản chỉ đạo và định hướng tương lai từ Supabase</p>
        </div>
      </div>

      <div className="tabs-header">
        <button className={`tab-btn ${selectedCategory === 'all' ? 'active' : ''}`} onClick={() => setSelectedCategory('all')}>
          Tất cả bài viết
        </button>
        <button className={`tab-btn ${selectedCategory === 'truong' ? 'active' : ''}`} onClick={() => setSelectedCategory('truong')}>
          <i className="fa-solid fa-school"></i> Tin trường
        </button>
        <button className={`tab-btn ${selectedCategory === 'vanban' ? 'active' : ''}`} onClick={() => setSelectedCategory('vanban')}>
          <i className="fa-solid fa-file-contract"></i> Văn bản
        </button>
        <button className={`tab-btn ${selectedCategory === 'thongbao' ? 'active' : ''}`} onClick={() => setSelectedCategory('thongbao')}>
          <i className="fa-solid fa-bullhorn"></i> Thông báo
        </button>
        <button className={`tab-btn ${selectedCategory === 'huongnghiep' ? 'active' : ''}`} onClick={() => setSelectedCategory('huongnghiep')}>
          <i className="fa-solid fa-compass"></i> Hướng nghiệp
        </button>
      </div>

      <div className="grid-cards">
        {filteredNews.map(item => (
          <div key={item.id} className="content-card">
            <span className="card-tag tag-docx"><i className="fa-solid fa-newspaper"></i> {item.tag}</span>
            <h3 className="card-title">{item.title}</h3>
            <p className="card-desc">{item.desc}</p>
            <div className="card-meta">
              <span><i className="fa-regular fa-calendar"></i> {item.date}</span>
              <span><i className="fa-solid fa-user-tie"></i> Huỳnh Ngân Giang</span>
            </div>
            <div className="card-actions">
              <button className="btn btn-google" onClick={() => alert(`Đang mở chi tiết bài viết:\n"${item.title}"`)}>
                <i className="fa-solid fa-book-open"></i> Đọc chi tiết
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
