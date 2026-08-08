import React, { useState } from 'react';

const podcasts = [
  { id: 1, title: 'Tập 1: Ứng dụng AI trong Học tập Khối 6-9 hiệu quả', duration: '03:45', author: 'Huỳnh Ngân Giang' },
  { id: 2, title: 'Tập 2: Bảo vệ Quyền Riêng tư trên Mạng xã hội', duration: '04:12', author: 'Huỳnh Ngân Giang' },
  { id: 3, title: 'Tập 3: Phương pháp Rèn luyện Tư duy Số Độc lập', duration: '05:00', author: 'Huỳnh Ngân Giang' }
];

const handbooks = [
  { title: 'Sổ Tay #1: 10 Quy tắc Vàng An toàn trên Không gian Mạng', category: 'Kỹ năng số', desc: 'Tóm tắt các quy tắc bảo mật mật khẩu, nhận diện tin lừa đảo.' },
  { title: 'Sổ Tay #2: Cẩm nang Sử dụng AI Học tập Đúng Đắn', category: 'Trợ lý AI', desc: 'Hướng dẫn học sinh coi AI là bạn đồng hành chứ không chép phạt.' },
  { title: 'Sổ Tay #3: Mẹo Thiết kế Slide Thuyết trình PPTX Ấn tượng', category: 'Phương pháp', desc: 'Bí quyết phối màu, bố cục chuẩn NLS cho học sinh THCS.' }
];

const educationalVideos = [
  { title: 'Video Bài giảng: Hành trình Khai phá Năng lực số 2026', duration: '12:30', views: '2,400' },
  { title: 'Hướng dẫn Nộp bài tập qua Padlet & Zalo OA chi tiết', duration: '05:40', views: '1,850' },
  { title: 'Chuyên đề Hướng nghiệp: Công nghệ Số & Tương lai Tuổi trẻ', duration: '15:10', views: '3,100' }
];

export default function MaterialsView() {
  const [subTab, setSubTab] = useState('podcast');
  const [currentPodcast, setCurrentPodcast] = useState(podcasts[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [handbookSearch, setHandbookSearch] = useState('');

  const filteredHandbooks = handbooks.filter(h => 
    h.title.toLowerCase().includes(handbookSearch.toLowerCase()) || 
    h.desc.toLowerCase().includes(handbookSearch.toLowerCase())
  );

  return (
    <section className="view-section active">
      <div className="section-header">
        <div>
          <h2 className="section-title"><i className="fa-solid fa-book-bookmark"></i> Kho Học Liệu Số</h2>
          <p className="section-subtitle">Phim giáo dục, Sổ tay tri thức, Trợ lý AI và Podcast âm thanh</p>
        </div>
      </div>

      <div className="tabs-header">
        <button className={`tab-btn ${subTab === 'podcast' ? 'active' : ''}`} onClick={() => setSubTab('podcast')}>
          <i className="fa-solid fa-podcast"></i> Podcast ngắn
        </button>
        <button className={`tab-btn ${subTab === 'handbook' ? 'active' : ''}`} onClick={() => setSubTab('handbook')}>
          <i className="fa-solid fa-book-open"></i> Sổ tay tri thức
        </button>
        <button className={`tab-btn ${subTab === 'video' ? 'active' : ''}`} onClick={() => setSubTab('video')}>
          <i className="fa-solid fa-circle-play"></i> Phim giáo dục
        </button>
      </div>

      {/* SubTab: Podcast Player */}
      {subTab === 'podcast' && (
        <div>
          <div className="podcast-player">
            <div className="podcast-cover"><i className="fa-solid fa-podcast"></i></div>
            <div className="podcast-details">
              <h3>{currentPodcast.title}</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                Tác giả: {currentPodcast.author} | Thời lượng: {currentPodcast.duration}
              </p>
              <div className="podcast-controls">
                <button className="btn-play-pause" onClick={() => setIsPlaying(!isPlaying)}>
                  <i className={isPlaying ? 'fa-solid fa-pause' : 'fa-solid fa-play'}></i>
                </button>
                <span style={{ fontSize: '0.85rem', color: isPlaying ? 'var(--accent-emerald)' : 'var(--text-muted)' }}>
                  {isPlaying ? '🔊 Đang phát âm thanh bài giảng...' : 'Bấm Play để nghe bài học'}
                </span>
              </div>
            </div>
          </div>

          <div className="grid-cards">
            {podcasts.map(p => (
              <div key={p.id} className="content-card">
                <span className="card-tag tag-elearning"><i className="fa-solid fa-podcast"></i> Audio Podcast</span>
                <h3 className="card-title">{p.title}</h3>
                <p className="card-desc">Thời lượng: {p.duration} | Giọng đọc: {p.author}</p>
                <div className="card-actions">
                  <button className="btn btn-primary" onClick={() => { setCurrentPodcast(p); setIsPlaying(true); }}>
                    <i className="fa-solid fa-play"></i> Nghe Tập Này
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SubTab: Handbook */}
      {subTab === 'handbook' && (
        <div>
          <div className="filter-bar">
            <div className="search-input-box">
              <i className="fa-solid fa-magnifying-glass"></i>
              <input
                type="text"
                placeholder="Tìm kiếm từ khóa trong sổ tay tri thức..."
                value={handbookSearch}
                onChange={(e) => setHandbookSearch(e.target.value)}
              />
            </div>
          </div>
          <div className="grid-cards">
            {filteredHandbooks.map((h, i) => (
              <div key={i} className="content-card">
                <span className="card-tag tag-docx">{h.category}</span>
                <h3 className="card-title">{h.title}</h3>
                <p className="card-desc">{h.desc}</p>
                <div className="card-actions">
                  <button className="btn btn-google" onClick={() => alert(`Đang mở Sổ tay tri thức:\n"${h.title}"`)}>
                    <i className="fa-solid fa-book-open"></i> Xem Sổ Tay
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SubTab: Videos */}
      {subTab === 'video' && (
        <div className="grid-cards">
          {educationalVideos.map((v, i) => (
            <div key={i} className="content-card">
              <span className="card-tag tag-pptx"><i className="fa-solid fa-video"></i> Video Bài Học</span>
              <h3 className="card-title">{v.title}</h3>
              <p className="card-desc">Thời lượng: {v.duration} | Lượt xem: {v.views}</p>
              <div className="card-actions">
                <button className="btn btn-primary" onClick={() => alert(`Đang chiếu phim giáo dục:\n"${v.title}"`)}>
                  <i className="fa-solid fa-circle-play"></i> Xem Phim
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
