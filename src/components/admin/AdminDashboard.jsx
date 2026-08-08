import React, { useState, useEffect } from 'react';
import { useAuth, SUPER_ADMIN_EMAIL } from '../../context/AuthContext';
import { supabase } from '../../lib/supabase';

export default function AdminDashboard({ onExitAdmin }) {
  const { user } = useAuth();
  const [adminTab, setAdminTab] = useState('overview');

  // Strict Access Guard: Only lyngangiang83pt@gmail.com can enter
  if (!user || user.email !== SUPER_ADMIN_EMAIL) {
    return (
      <div style={{ textAlign: 'center', padding: '60px 20px', background: 'var(--bg-card)', border: '1px solid var(--border-glass)', borderRadius: 'var(--radius-xl)', margin: '40px 0' }}>
        <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'rgba(244, 63, 94, 0.2)', color: 'var(--accent-rose)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2.5rem', margin: '0 auto 20px' }}>
          <i className="fa-solid fa-shield-halved"></i>
        </div>
        <h2 style={{ color: 'var(--accent-rose)', fontSize: '1.8rem', marginBottom: '12px' }}>
          🚫 Quyền Truy Cập Bị Từ Chối!
        </h2>
        <p style={{ color: 'var(--text-muted)', maxWidth: '550px', margin: '0 auto 24px', fontSize: '0.95rem' }}>
          Khu vực Quản Trị Viên (Admin CMS) được bảo mật nghiêm ngặt và chỉ dành riêng duy nhất cho tài khoản chính thức của Sáng Lập Viên: <strong style={{ color: '#fff' }}>lyngangiang83pt@gmail.com</strong>.
        </p>
        <button className="btn btn-primary" onClick={onExitAdmin}>
          <i className="fa-solid fa-house"></i> Quay Về Trang Chủ
        </button>
      </div>
    );
  }

  // State stores for all 10 modules
  const [usersList, setUsersList] = useState([
    { id: '1', username: 'admin_giang', full_name: 'Huỳnh Ngân Giang', email: 'lyngangiang83pt@gmail.com', role: 'admin', is_vip: true, phone: '0355782168' },
    { id: '2', username: 'giaovien_mai', full_name: 'Cô Nguyễn Thị Mai', email: 'mai.nguyen@edu.vn', role: 'teacher', is_vip: true, phone: '0912345678' },
    { id: '3', username: 'hocsinh_an', full_name: 'Nguyễn Văn An', email: 'an.nguyen@gmail.com', role: 'student', is_vip: false, phone: '0388999888' }
  ]);

  const [newsList, setNewsList] = useState([
    { id: 1, category: 'truong', title: 'Hội thi Thiết kế Học liệu số Tích hợp AI năm học 2025-2026', date: '05/08/2026', tag: 'Tin trường', author: 'Huỳnh Ngân Giang', content: 'Trường phát động hội thi sản phẩm bài giảng số tích hợp Năng lực số (NLS) dành cho học sinh Khối 6-9.' },
    { id: 2, category: 'vanban', title: 'Văn bản Hướng dẫn Thực hiện Khung Năng lực số Phổ thông Mới', date: '01/08/2026', tag: 'Văn bản', author: 'Huỳnh Ngân Giang', content: 'Bộ Giáo dục và Đào tạo ban hành quy định tích hợp kỹ năng công nghệ số vào giáo án giảng dạy.' },
    { id: 3, category: 'thongbao', title: 'Thông báo Lịch nộp Sản phẩm Dự án Kỹ năng số Khối 8 & 9', date: '30/07/2026', tag: 'Thông báo', author: 'Huỳnh Ngân Giang', content: 'Học sinh hoàn thiện video và bài thuyết trình PPTX nộp trước ngày 15/08 trên cổng Padlet hoặc Zalo OA.' },
    { id: 4, category: 'huongnghiep', title: 'Định hướng Nghề nghiệp Kỷ nguyên AI cho Học sinh THCS', date: '25/07/2026', tag: 'Hướng nghiệp', author: 'Huỳnh Ngân Giang', content: 'Chuyên đề giới thiệu các ngành nghề công nghệ mới: Kỹ sư AI, Chuyên gia An toàn thông tin, Nhà phân tích dữ liệu.' }
  ]);

  const [lecturesList, setLecturesList] = useState([
    { id: 101, grade: '6', title: 'Bài 1: Năng lực số và Công cụ Tìm kiếm An toàn', format: 'pptx', has_ai: true, description: 'Bài giảng Slide PPTX sinh động tích hợp ứng dụng AI tra cứu tri thức dành cho học sinh Khối 6.', downloads: 1420 },
    { id: 102, grade: '6', title: 'Phiếu Giáo án: Đạo đức Số & Bảo vệ Thông tin Cá nhân', format: 'docx', has_ai: true, description: 'Kế hoạch bài dạy DOCX chuẩn 5512 tích hợp ma trận Năng lực số (NLS).', downloads: 980 },
    { id: 103, grade: '7', title: 'Bài 3: Xử lý Dữ liệu Bảng tính với Trợ lý AI', format: 'pptx', has_ai: true, description: 'Hướng dẫn sử dụng hàm Excel/Google Sheets nâng cao kết hợp AI phân tích số liệu.', downloads: 1650 },
    { id: 104, grade: '7', title: 'E-learning: Hành trang Kỹ năng Số Tuổi Teen', format: 'elearning', has_ai: true, description: 'Bài giảng Elearning HTML5 tương tác trực tiếp với câu hỏi trắc nghiệm tự động.', downloads: 2100 },
    { id: 105, grade: '8', title: 'Bài 5: Lập trình Tư duy Thuật toán & Câu lệnh Prompt AI', format: 'pptx', has_ai: true, description: 'Giáo án PPTX giới thiệu tư duy máy tính và cách giao tiếp với các mô hình AI lớn.', downloads: 1890 },
    { id: 106, grade: '8', title: 'Giáo án DOCX: Thiết kế Slide Bài thuyết trình với Canva AI', format: 'docx', has_ai: true, description: 'Tài liệu chi tiết hướng dẫn học sinh tạo bài trình chiếu chuyên nghiệp.', downloads: 1340 },
    { id: 107, grade: '9', title: 'Bài 8: Ôn tập Tổng hợp Năng lực số & Đề án Chuyển đổi số', format: 'pptx', has_ai: true, description: 'Bài giảng chuẩn bị cho kỳ kiểm tra đánh giá Năng lực số lớp 9.', downloads: 2450 },
    { id: 108, grade: '9', title: 'E-learning: Thực hành An toàn Thông tin & Quyền Riêng tư', format: 'elearning', has_ai: true, description: 'Mô phỏng các tình huống an toàn mạng thực tế dành cho học sinh cuối cấp.', downloads: 1780 }
  ]);

  const [assignmentsList, setAssignmentsList] = useState([
    { id: 201, grade: '6', title: 'Phiếu học tập #1: Phân biệt Tin giả & Tin thật trên Mạng', type: 'Phiếu học tập', deadline: '15/08/2026', description: 'Rèn luyện kỹ năng nhận diện nguồn tin cậy trên internet.' },
    { id: 202, grade: '7', title: 'Bài tập về nhà #2: Thực hành Viết Prompt AI tạo Dàn ý Bài văn', type: 'Bài tập về nhà', deadline: '18/08/2026', description: 'Tập tương tác và tinh chỉnh câu lệnh với Trợ lý AI.' },
    { id: 203, grade: '8', title: 'Phiếu bài tập #3: Phân tích Dữ liệu Số & Vẽ Biểu đồ', type: 'Phiếu học tập', deadline: '20/08/2026', description: 'Thực hành tính toán và trực quan hóa số liệu.' },
    { id: 204, grade: '9', title: 'Dự án Cuối khóa: Thiết kế Infographic Hướng nghiệp Số', type: 'Bài tập dự án', deadline: '25/08/2026', description: 'Thiết kế sản phẩm truyền thông định hướng ngành nghề số.' }
  ]);

  const [submissionsList, setSubmissionsList] = useState([
    { id: 1, student_name: 'Trần Thị Bích', grade: '9', project_title: 'Infographic: 5 Tiêu chuẩn An toàn Mạng', submission_channel: 'padlet', status: 'Đạt giải Nhất', submission_link: 'https://padlet.com/lyngangiang83pt/hanhtrinhso' },
    { id: 2, student_name: 'Lê Minh Khoa', grade: '8', project_title: 'Video Animation: Khai phá Trợ lý AI', submission_channel: 'drive', status: 'Xuất sắc', submission_link: 'https://drive.google.com' },
    { id: 3, student_name: 'Phạm Hoàng Nam', grade: '7', project_title: 'Slide PPTX: Lịch sử Máy tính Số', submission_channel: 'zalo', status: 'Đánh giá Cao', submission_link: 'https://zalo.me/0355782168' }
  ]);

  const [vipCodesList, setVipCodesList] = useState([
    { id: 1, code: 'VIP2026', description: 'Mã VIP mở khóa Giáo án AI Chuyên Sâu 2026', is_active: true, current_uses: 48, max_uses: 1000 },
    { id: 2, code: 'DOCBUOC83', description: 'Mã Đặc quyền Sáng lập viên Huỳnh Ngân Giang', is_active: true, current_uses: 112, max_uses: 1000 },
    { id: 3, code: 'HANHTRINHSO', description: 'Mã trải nghiệm Năng lực số cao cấp', is_active: true, current_uses: 65, max_uses: 1000 }
  ]);

  const [announcementsList, setAnnouncementsList] = useState([
    { id: 1, title: '🔥 Cập nhật hệ thống: Tích hợp Trợ lý AI Hỏi - Đáp 24/7 Mới', date: '06/08/2026', description: 'Hệ thống đã cập nhật AI trả lời trực tiếp 24/24 cho học sinh Khối 6-9.', is_pinned: true },
    { id: 2, title: '📢 Đã tải lên Bộ Bài Giảng PPTX NLS Khối 8 & Khối 9 Mới', date: '03/08/2026', description: 'Các cô giáo và học sinh có thể vào phân hệ Bài Giảng để tải về bài học mới nhất.', is_pinned: false },
    { id: 3, title: '🌟 Mở khóa Kho VIP với Mã VIP2026 cho Thành viên Thử nghiệm', date: '01/08/2026', description: 'Nhập mã VIP2026 để trải nghiệm bộ giáo án và trợ lý AI nâng cao.', is_pinned: false }
  ]);

  const [chatLogsList, setChatLogsList] = useState([
    { id: 1, user_name: 'Nguyễn Văn An (Khối 8)', user_query: 'Làm thế nào để viết Prompt AI giải bài toán chính xác?', ai_response: 'Cung cấp bối cảnh rõ ràng, yêu cầu AI giải từng bước và kiểm tra lại kết quả.', created_at: '08/08/2026 20:15' },
    { id: 2, user_name: 'Trần Minh Tâm (Khối 9)', user_query: 'Khung năng lực số phổ thông gồm những miền nào?', ai_response: 'Gồm 5 miền cốt lõi: Vận hành thiết bị, An toàn số, Đạo đức số, Sáng tạo nội dung số, Giải quyết vấn đề.', created_at: '08/08/2026 21:05' }
  ]);

  // Load from Supabase on mount
  useEffect(() => {
    async function loadAllData() {
      if (supabase) {
        try {
          const { data: u } = await supabase.from('app_users').select('*');
          if (u && u.length > 0) setUsersList(u);

          const { data: n } = await supabase.from('news').select('*');
          if (n && n.length > 0) setNewsList(n);

          const { data: l } = await supabase.from('lectures').select('*');
          if (l && l.length > 0) setLecturesList(l);

          const { data: a } = await supabase.from('assignments').select('*');
          if (a && a.length > 0) setAssignmentsList(a);

          const { data: s } = await supabase.from('student_submissions').select('*');
          if (s && s.length > 0) setSubmissionsList(s);

          const { data: v } = await supabase.from('vip_codes').select('*');
          if (v && v.length > 0) setVipCodesList(v);

          const { data: an } = await supabase.from('announcements').select('*');
          if (an && an.length > 0) setAnnouncementsList(an);

          const { data: c } = await supabase.from('chat_logs').select('*');
          if (c && c.length > 0) setChatLogsList(c);
        } catch (err) {
          console.warn('Supabase Admin Fetch fallback:', err);
        }
      }
    }
    loadAllData();
  }, []);

  // Actions for User Management
  const handleToggleVip = async (userId) => {
    setUsersList(prev => prev.map(u => {
      if (u.id === userId || u.username === userId) {
        const nextVip = !u.is_vip;
        if (supabase) {
          supabase.from('app_users').update({ is_vip: nextVip }).eq('username', u.username).then();
        }
        return { ...u, is_vip: nextVip };
      }
      return u;
    }));
  };

  const handleChangeRole = async (username, newRole) => {
    setUsersList(prev => prev.map(u => {
      if (u.username === username) {
        if (supabase) {
          supabase.from('app_users').update({ role: newRole }).eq('username', username).then();
        }
        return { ...u, role: newRole };
      }
      return u;
    }));
    alert(`Đã cập nhật vai trò của tài khoản "${username}" thành "${newRole}"!`);
  };

  const handleDeleteUser = async (username) => {
    if (username === 'admin_giang') {
      alert('⚠️ Không thể xóa tài khoản Quản trị viên sáng lập!');
      return;
    }
    if (window.confirm(`Bạn có chắc chắn muốn xóa tài khoản "${username}" không?`)) {
      setUsersList(prev => prev.filter(u => u.username !== username));
      if (supabase) {
        await supabase.from('app_users').delete().eq('username', username);
      }
    }
  };

  // Actions for News
  const [newArticleTitle, setNewArticleTitle] = useState('');
  const [newArticleCat, setNewArticleCat] = useState('truong');
  const [newArticleContent, setNewArticleContent] = useState('');

  const handleAddNews = async (e) => {
    e.preventDefault();
    if (!newArticleTitle || !newArticleContent) return;

    const catLabels = { truong: 'Tin trường', vanban: 'Văn bản', thongbao: 'Thông báo', huongnghiep: 'Hướng nghiệp' };
    const newItem = {
      id: Date.now(),
      category: newArticleCat,
      tag: catLabels[newArticleCat],
      title: newArticleTitle,
      date: new Date().toLocaleDateString('vi-VN'),
      author: 'Huỳnh Ngân Giang',
      content: newArticleContent
    };

    setNewsList([newItem, ...newsList]);
    if (supabase) {
      try {
        await supabase.from('news').insert([newItem]);
      } catch (err) {
        console.warn('Lỗi ghi Supabase news:', err);
      }
    }

    setNewArticleTitle('');
    setNewArticleContent('');
    alert('🎉 Đã thêm bài viết mới vào Bảng Tin thành công!');
  };

  const handleDeleteNews = async (id) => {
    if (window.confirm('Xóa bài viết này khỏi bảng tin?')) {
      setNewsList(prev => prev.filter(item => item.id !== id));
      if (supabase) {
        await supabase.from('news').delete().eq('id', id);
      }
    }
  };

  // Actions for Lectures
  const [newLectureTitle, setNewLectureTitle] = useState('');
  const [newLectureGrade, setNewLectureGrade] = useState('8');
  const [newLectureFormat, setNewLectureFormat] = useState('pptx');
  const [newLectureDesc, setNewLectureDesc] = useState('');

  const handleAddLecture = async (e) => {
    e.preventDefault();
    if (!newLectureTitle) return;

    const newLect = {
      id: Date.now(),
      grade: newLectureGrade,
      title: newLectureTitle,
      format: newLectureFormat,
      has_ai: true,
      description: newLectureDesc || 'Bài giảng tích hợp Năng lực số và AI chuẩn bị cho học sinh.',
      downloads: 0
    };

    setLecturesList([newLect, ...lecturesList]);
    if (supabase) {
      try {
        await supabase.from('lectures').insert([newLect]);
      } catch (err) {
        console.warn('Lỗi ghi Supabase lecture:', err);
      }
    }

    setNewLectureTitle('');
    setNewLectureDesc('');
    alert(`🎉 Đã thêm bài giảng Khối ${newLectureGrade} mới thành công!`);
  };

  const handleDeleteLecture = async (id) => {
    if (window.confirm('Xóa bài giảng này?')) {
      setLecturesList(prev => prev.filter(l => l.id !== id));
      if (supabase) {
        await supabase.from('lectures').delete().eq('id', id);
      }
    }
  };

  // Actions for Submissions
  const handleUpdateSubmissionStatus = async (id, status) => {
    setSubmissionsList(prev => prev.map(s => {
      if (s.id === id) {
        if (supabase) {
          supabase.from('student_submissions').update({ status }).eq('id', id).then();
        }
        return { ...s, status };
      }
      return s;
    }));
  };

  // Actions for VIP Codes
  const [newVipCode, setNewVipCode] = useState('');
  const [newVipDesc, setNewVipDesc] = useState('');

  const handleAddVipCode = async (e) => {
    e.preventDefault();
    if (!newVipCode) return;

    const newCodeItem = {
      id: Date.now(),
      code: newVipCode.trim().toUpperCase(),
      description: newVipDesc || 'Mã VIP kích hoạt đặc quyền giáo án AI',
      is_active: true,
      max_uses: 1000,
      current_uses: 0
    };

    setVipCodesList([newCodeItem, ...vipCodesList]);
    if (supabase) {
      try {
        await supabase.from('vip_codes').insert([newCodeItem]);
      } catch (err) {
        console.warn('Lỗi ghi Supabase VIP code:', err);
      }
    }

    setNewVipCode('');
    setNewVipDesc('');
    alert(`🎉 Đã tạo mã VIP "${newCodeItem.code}" thành công!`);
  };

  const handleToggleVipCode = async (id) => {
    setVipCodesList(prev => prev.map(c => {
      if (c.id === id) {
        const nextActive = !c.is_active;
        if (supabase) {
          supabase.from('vip_codes').update({ is_active: nextActive }).eq('id', id).then();
        }
        return { ...c, is_active: nextActive };
      }
      return c;
    }));
  };

  // Actions for Announcements
  const [newAnnTitle, setNewAnnTitle] = useState('');
  const [newAnnDesc, setNewAnnDesc] = useState('');

  const handleAddAnnouncement = async (e) => {
    e.preventDefault();
    if (!newAnnTitle) return;

    const newAnn = {
      id: Date.now(),
      title: newAnnTitle,
      description: newAnnDesc,
      date: new Date().toLocaleDateString('vi-VN'),
      is_pinned: false
    };

    setAnnouncementsList([newAnn, ...announcementsList]);
    if (supabase) {
      try {
        await supabase.from('announcements').insert([newAnn]);
      } catch (err) {
        console.warn('Lỗi ghi Supabase announcement:', err);
      }
    }

    setNewAnnTitle('');
    setNewAnnDesc('');
    alert('🎉 Đã đăng thông báo mới lên hệ thống thành công!');
  };

  return (
    <div style={{ background: 'var(--bg-body)', minHeight: '85vh', borderRadius: 'var(--radius-xl)', border: '1px solid var(--border-glass)', padding: '24px', margin: '20px 0' }}>
      {/* Admin Top Banner */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', paddingBottom: '16px', borderBottom: '1px solid var(--border-glass)', flexWrap: 'wrap', gap: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div className="logo-icon" style={{ width: '48px', height: '48px', fontSize: '1.4rem', background: 'linear-gradient(135deg, #f59e0b, #d97706)' }}>
            <i className="fa-solid fa-gauge-high"></i>
          </div>
          <div>
            <h2 style={{ fontSize: '1.6rem', background: 'linear-gradient(90deg, #f59e0b, #fbbf24, #fff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Trung Tâm Quản Trị Hệ Thống (Admin CMS)
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
              Sáng lập viên: <strong>Huỳnh Ngân Giang</strong> | Email: <strong>lyngangiang83pt@gmail.com</strong> | Domain: <strong>hanhtrinhso.docbuoc.vn</strong>
            </p>
          </div>
        </div>

        <button className="btn btn-google" onClick={onExitAdmin} style={{ padding: '8px 16px' }}>
          <i className="fa-solid fa-arrow-left"></i> Trở Về Giao Diện Người Dùng
        </button>
      </div>

      {/* Admin Horizontal Tabs */}
      <div className="tabs-header" style={{ marginBottom: '28px' }}>
        <button className={`tab-btn ${adminTab === 'overview' ? 'active' : ''}`} onClick={() => setAdminTab('overview')}>
          <i className="fa-solid fa-chart-pie"></i> 1. Tổng Quan
        </button>
        <button className={`tab-btn ${adminTab === 'users' ? 'active' : ''}`} onClick={() => setAdminTab('users')}>
          <i className="fa-solid fa-users-gear"></i> 2. Người Dùng ({usersList.length})
        </button>
        <button className={`tab-btn ${adminTab === 'news' ? 'active' : ''}`} onClick={() => setAdminTab('news')}>
          <i className="fa-solid fa-newspaper"></i> 3. Bảng Tin ({newsList.length})
        </button>
        <button className={`tab-btn ${adminTab === 'lectures' ? 'active' : ''}`} onClick={() => setAdminTab('lectures')}>
          <i className="fa-solid fa-chalkboard-user"></i> 4. Bài Giảng ({lecturesList.length})
        </button>
        <button className={`tab-btn ${adminTab === 'assignments' ? 'active' : ''}`} onClick={() => setAdminTab('assignments')}>
          <i className="fa-solid fa-pen-to-square"></i> 5. Bài Tập ({assignmentsList.length})
        </button>
        <button className={`tab-btn ${adminTab === 'submissions' ? 'active' : ''}`} onClick={() => setAdminTab('submissions')}>
          <i className="fa-solid fa-award"></i> 6. Bài Nộp HS ({submissionsList.length})
        </button>
        <button className={`tab-btn ${adminTab === 'vip' ? 'active' : ''}`} onClick={() => setAdminTab('vip')}>
          <i className="fa-solid fa-key"></i> 7. Mã VIP ({vipCodesList.length})
        </button>
        <button className={`tab-btn ${adminTab === 'announcements' ? 'active' : ''}`} onClick={() => setAdminTab('announcements')}>
          <i className="fa-solid fa-bell"></i> 8. Thông Báo ({announcementsList.length})
        </button>
        <button className={`tab-btn ${adminTab === 'chat' ? 'active' : ''}`} onClick={() => setAdminTab('chat')}>
          <i className="fa-solid fa-robot"></i> 9. Chatbot AI ({chatLogsList.length})
        </button>
        <button className={`tab-btn ${adminTab === 'settings' ? 'active' : ''}`} onClick={() => setAdminTab('settings')}>
          <i className="fa-solid fa-sliders"></i> 10. Cài Đặt
        </button>
      </div>

      {/* ================= TAB 1: TỔNG QUAN & THỐNG KÊ ================= */}
      {adminTab === 'overview' && (
        <div>
          <div className="grid-cards" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', marginBottom: '32px' }}>
            <div className="content-card" style={{ borderLeft: '4px solid #6366f1' }}>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Tổng Người Dùng</span>
              <h3 style={{ fontSize: '2rem', margin: '8px 0', color: '#a5b4fc' }}>{usersList.length}</h3>
              <span style={{ fontSize: '0.75rem', color: 'var(--accent-emerald)' }}>Bảng <code>app_users</code></span>
            </div>

            <div className="content-card" style={{ borderLeft: '4px solid #f59e0b' }}>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Bài Giảng Khối 6-9</span>
              <h3 style={{ fontSize: '2rem', margin: '8px 0', color: '#fbbf24' }}>{lecturesList.length}</h3>
              <span style={{ fontSize: '0.75rem', color: '#38bdf8' }}>Tích hợp NLS & AI</span>
            </div>

            <div className="content-card" style={{ borderLeft: '4px solid #10b981' }}>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Bài Nộp Học Sinh</span>
              <h3 style={{ fontSize: '2rem', margin: '8px 0', color: '#34d399' }}>{submissionsList.length}</h3>
              <span style={{ fontSize: '0.75rem', color: '#a7f3d0' }}>Padlet, Drive, Supabase</span>
            </div>

            <div className="content-card" style={{ borderLeft: '4px solid #a855f7' }}>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Mã VIP Kích Hoạt</span>
              <h3 style={{ fontSize: '2rem', margin: '8px 0', color: '#c084fc' }}>{vipCodesList.length}</h3>
              <span style={{ fontSize: '0.75rem', color: '#f59e0b' }}>Kho tài liệu VIP</span>
            </div>
          </div>

          <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-glass)', borderRadius: 'var(--radius-lg)', padding: '24px' }}>
            <h3 style={{ marginBottom: '14px', fontSize: '1.2rem' }}><i className="fa-solid fa-circle-check" style={{ color: 'var(--accent-emerald)' }}></i> Trạng Thái Hoạt Động Của Hệ Thống</h3>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
              <li>• <strong>Quyền Quản Trị Duy Nhất:</strong> <code>lyngangiang83pt@gmail.com</code> (Đã xác thực bảo mật cấp cao).</li>
              <li>• <strong>Framework Frontend:</strong> React 18 SPA với Vite (Tối ưu hóa Vercel).</li>
              <li>• <strong>Cơ sở dữ liệu:</strong> Supabase PostgreSQL (8 bảng đồng bộ tự động).</li>
              <li>• <strong>Xác thực bảo mật:</strong> Mật khẩu mã hóa SHA-256 qua Web Crypto API.</li>
              <li>• <strong>Hotline Hỗ Trợ:</strong> Huỳnh Ngân Giang - 0355782168 (Zalo OA sẵn sàng).</li>
            </ul>
          </div>
        </div>
      )}

      {/* ================= TAB 2: QUẢN LÝ NGƯỜI DÙNG ================= */}
      {adminTab === 'users' && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3>Danh Sách Tài Khoản Người Dùng (Supabase <code>app_users</code>)</h3>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem' }}>
              <thead>
                <tr style={{ background: 'rgba(255,255,255,0.05)', borderBottom: '1px solid var(--border-glass)' }}>
                  <th style={{ padding: '12px' }}>Tên đăng nhập</th>
                  <th style={{ padding: '12px' }}>Họ và tên</th>
                  <th style={{ padding: '12px' }}>Email / SĐT</th>
                  <th style={{ padding: '12px' }}>Vai trò</th>
                  <th style={{ padding: '12px' }}>Quyền VIP</th>
                  <th style={{ padding: '12px' }}>Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {usersList.map((u, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid var(--border-glass)' }}>
                    <td style={{ padding: '12px', fontWeight: 600, color: 'var(--text-main)' }}>{u.username}</td>
                    <td style={{ padding: '12px' }}>{u.full_name}</td>
                    <td style={{ padding: '12px', color: 'var(--text-muted)' }}>{u.email || u.phone || 'Chưa cập nhật'}</td>
                    <td style={{ padding: '12px' }}>
                      {u.email === SUPER_ADMIN_EMAIL ? (
                        <span style={{ color: '#f59e0b', fontWeight: 700 }}>👑 Quản Trị Viên</span>
                      ) : (
                        <select
                          value={u.role}
                          onChange={(e) => handleChangeRole(u.username, e.target.value)}
                          style={{ padding: '4px 8px', background: '#1e293b', border: '1px solid var(--border-glass)', borderRadius: '6px', color: '#fff', fontSize: '0.8rem' }}
                        >
                          <option value="student">Học sinh</option>
                          <option value="teacher">Giáo viên</option>
                        </select>
                      )}
                    </td>
                    <td style={{ padding: '12px' }}>
                      <button
                        className="btn"
                        style={{ padding: '4px 10px', fontSize: '0.75rem', background: u.is_vip ? 'linear-gradient(135deg, #f59e0b, #d97706)' : 'rgba(255,255,255,0.1)', color: '#fff' }}
                        onClick={() => handleToggleVip(u.id || u.username)}
                      >
                        {u.is_vip ? '⭐ VIP PRO' : 'Chưa kích hoạt'}
                      </button>
                    </td>
                    <td style={{ padding: '12px' }}>
                      {u.email !== SUPER_ADMIN_EMAIL && (
                        <button className="btn btn-google" style={{ padding: '4px 8px', color: 'var(--accent-rose)', fontSize: '0.75rem' }} onClick={() => handleDeleteUser(u.username)}>
                          <i className="fa-solid fa-trash"></i> Xóa
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ================= TAB 3: QUẢN LÝ BẢNG TIN ================= */}
      {adminTab === 'news' && (
        <div>
          <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-glass)', borderRadius: 'var(--radius-md)', padding: '20px', marginBottom: '28px' }}>
            <h4><i className="fa-solid fa-plus-circle"></i> Đăng Bài Viết Mới Vào Bảng Tin</h4>
            <form onSubmit={handleAddNews} style={{ marginTop: '14px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '12px' }}>
                <input
                  type="text"
                  required
                  placeholder="Tiêu đề bài viết..."
                  value={newArticleTitle}
                  onChange={(e) => setNewArticleTitle(e.target.value)}
                  style={{ padding: '10px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-glass)', borderRadius: 'var(--radius-sm)', color: '#fff' }}
                />
                <select
                  value={newArticleCat}
                  onChange={(e) => setNewArticleCat(e.target.value)}
                  style={{ padding: '10px', background: '#1e293b', border: '1px solid var(--border-glass)', borderRadius: 'var(--radius-sm)', color: '#fff' }}
                >
                  <option value="truong">Tin trường</option>
                  <option value="vanban">Văn bản</option>
                  <option value="thongbao">Thông báo</option>
                  <option value="huongnghiep">Hướng nghiệp</option>
                </select>
              </div>
              <textarea
                rows="3"
                required
                placeholder="Nội dung tóm tắt bài viết..."
                value={newArticleContent}
                onChange={(e) => setNewArticleContent(e.target.value)}
                style={{ padding: '10px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-glass)', borderRadius: 'var(--radius-sm)', color: '#fff', resize: 'vertical' }}
              />
              <button type="submit" className="btn btn-primary" style={{ alignSelf: 'flex-start' }}>
                <i className="fa-solid fa-paper-plane"></i> Đăng Bài Lên Supabase
              </button>
            </form>
          </div>

          <div className="grid-cards">
            {newsList.map(n => (
              <div key={n.id} className="content-card">
                <span className="card-tag tag-docx">{n.tag}</span>
                <h3 className="card-title">{n.title}</h3>
                <p className="card-desc">{n.content}</p>
                <div className="card-actions">
                  <button className="btn btn-google" style={{ color: 'var(--accent-rose)' }} onClick={() => handleDeleteNews(n.id)}>
                    <i className="fa-solid fa-trash"></i> Xóa bài
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ================= TAB 4: QUẢN LÝ BÀI GIẢNG ================= */}
      {adminTab === 'lectures' && (
        <div>
          <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-glass)', borderRadius: 'var(--radius-md)', padding: '20px', marginBottom: '28px' }}>
            <h4><i className="fa-solid fa-plus-circle"></i> Thêm Bài Giảng Mới (Khối 6, 7, 8, 9)</h4>
            <form onSubmit={handleAddLecture} style={{ marginTop: '14px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '12px' }}>
                <input
                  type="text"
                  required
                  placeholder="Tên bài giảng (Ví dụ: Bài 4: An toàn thông tin)..."
                  value={newLectureTitle}
                  onChange={(e) => setNewLectureTitle(e.target.value)}
                  style={{ padding: '10px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-glass)', borderRadius: 'var(--radius-sm)', color: '#fff' }}
                />
                <select
                  value={newLectureGrade}
                  onChange={(e) => setNewLectureGrade(e.target.value)}
                  style={{ padding: '10px', background: '#1e293b', border: '1px solid var(--border-glass)', borderRadius: 'var(--radius-sm)', color: '#fff' }}
                >
                  <option value="6">Khối 6</option>
                  <option value="7">Khối 7</option>
                  <option value="8">Khối 8</option>
                  <option value="9">Khối 9</option>
                </select>
                <select
                  value={newLectureFormat}
                  onChange={(e) => setNewLectureFormat(e.target.value)}
                  style={{ padding: '10px', background: '#1e293b', border: '1px solid var(--border-glass)', borderRadius: 'var(--radius-sm)', color: '#fff' }}
                >
                  <option value="pptx">Slide PPTX</option>
                  <option value="docx">Giáo án DOCX</option>
                  <option value="elearning">Elearning HTML5</option>
                </select>
              </div>
              <input
                type="text"
                placeholder="Mô tả nội dung bài học..."
                value={newLectureDesc}
                onChange={(e) => setNewLectureDesc(e.target.value)}
                style={{ padding: '10px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-glass)', borderRadius: 'var(--radius-sm)', color: '#fff' }}
              />
              <button type="submit" className="btn btn-primary" style={{ alignSelf: 'flex-start' }}>
                <i className="fa-solid fa-upload"></i> Lưu Bài Giảng Lên Supabase
              </button>
            </form>
          </div>

          <div className="grid-cards">
            {lecturesList.map(l => (
              <div key={l.id} className="content-card">
                <div style={{ display: 'flex', gap: '8px' }}>
                  <span className="card-tag tag-pptx">{l.format.toUpperCase()}</span>
                  <span className="card-tag tag-docx">Khối {l.grade}</span>
                </div>
                <h3 className="card-title">{l.title}</h3>
                <p className="card-desc">{l.description}</p>
                <div className="card-actions">
                  <button className="btn btn-google" style={{ color: 'var(--accent-rose)' }} onClick={() => handleDeleteLecture(l.id)}>
                    <i className="fa-solid fa-trash"></i> Xóa
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ================= TAB 5: QUẢN LÝ BÀI TẬP ================= */}
      {adminTab === 'assignments' && (
        <div>
          <h3>Danh Sách Bài Tập & Phiếu Học Tập Khối 6-9</h3>
          <div className="grid-cards" style={{ marginTop: '16px' }}>
            {assignmentsList.map(a => (
              <div key={a.id} className="content-card">
                <span className="card-tag tag-docx">{a.type} - Khối {a.grade}</span>
                <h3 className="card-title">{a.title}</h3>
                <p className="card-desc">{a.description}</p>
                <div className="card-meta">
                  <span>Hạn nộp: <strong>{a.deadline}</strong></span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ================= TAB 6: CHẤM ĐIỂM SẢN PHẨM HỌC SINH ================= */}
      {adminTab === 'submissions' && (
        <div>
          <h3>Quản Lý & Chấm Điểm Bài Nộp Của Học Sinh</h3>
          <div style={{ overflowX: 'auto', marginTop: '16px' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem' }}>
              <thead>
                <tr style={{ background: 'rgba(255,255,255,0.05)', borderBottom: '1px solid var(--border-glass)' }}>
                  <th style={{ padding: '12px' }}>Học sinh</th>
                  <th style={{ padding: '12px' }}>Khối</th>
                  <th style={{ padding: '12px' }}>Tên dự án</th>
                  <th style={{ padding: '12px' }}>Kênh nộp</th>
                  <th style={{ padding: '12px' }}>Trạng thái chấm</th>
                  <th style={{ padding: '12px' }}>Liên kết</th>
                </tr>
              </thead>
              <tbody>
                {submissionsList.map((s, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid var(--border-glass)' }}>
                    <td style={{ padding: '12px', fontWeight: 600 }}>{s.student_name}</td>
                    <td style={{ padding: '12px' }}>Lớp {s.grade}</td>
                    <td style={{ padding: '12px' }}>{s.project_title}</td>
                    <td style={{ padding: '12px', textTransform: 'uppercase' }}>{s.submission_channel}</td>
                    <td style={{ padding: '12px' }}>
                      <select
                        value={s.status}
                        onChange={(e) => handleUpdateSubmissionStatus(s.id, e.target.value)}
                        style={{ padding: '4px 8px', background: '#1e293b', border: '1px solid var(--border-glass)', borderRadius: '6px', color: '#34d399', fontWeight: 600, fontSize: '0.8rem' }}
                      >
                        <option value="Đã tiếp nhận">Đã tiếp nhận</option>
                        <option value="Đang chấm">Đang chấm</option>
                        <option value="Xuất sắc">Xuất sắc</option>
                        <option value="Đạt giải Nhất">Đạt giải Nhất</option>
                        <option value="Đánh giá Cao">Đánh giá Cao</option>
                      </select>
                    </td>
                    <td style={{ padding: '12px' }}>
                      <a href={s.submission_link} target="_blank" rel="noreferrer" className="btn btn-google" style={{ padding: '4px 8px', fontSize: '0.75rem' }}>
                        <i className="fa-solid fa-arrow-up-right-from-square"></i> Mở bài làm
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ================= TAB 7: QUẢN LÝ MÃ VIP ================= */}
      {adminTab === 'vip' && (
        <div>
          <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-glass)', borderRadius: 'var(--radius-md)', padding: '20px', marginBottom: '28px' }}>
            <h4><i className="fa-solid fa-key"></i> Tạo Mã Kích Hoạt VIP Mới</h4>
            <form onSubmit={handleAddVipCode} style={{ marginTop: '14px', display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <input
                type="text"
                required
                placeholder="Nhập mã (Ví dụ: GIANG2026)..."
                value={newVipCode}
                onChange={(e) => setNewVipCode(e.target.value)}
                style={{ padding: '10px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-glass)', borderRadius: 'var(--radius-sm)', color: '#fff', textTransform: 'uppercase' }}
              />
              <input
                type="text"
                placeholder="Mô tả mã..."
                value={newVipDesc}
                onChange={(e) => setNewVipDesc(e.target.value)}
                style={{ padding: '10px', flex: 1, minWidth: '200px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-glass)', borderRadius: 'var(--radius-sm)', color: '#fff' }}
              />
              <button type="submit" className="btn btn-vip-gold">
                <i className="fa-solid fa-plus"></i> Tạo Mã VIP
              </button>
            </form>
          </div>

          <div className="grid-cards">
            {vipCodesList.map(c => (
              <div key={c.id} className="content-card" style={{ borderColor: c.is_active ? 'rgba(245, 158, 11, 0.4)' : 'rgba(255,255,255,0.1)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span className="card-tag tag-vip">{c.code}</span>
                  <button
                    className="btn"
                    style={{ padding: '2px 8px', fontSize: '0.72rem', background: c.is_active ? 'var(--accent-emerald)' : 'var(--accent-rose)', color: '#fff' }}
                    onClick={() => handleToggleVipCode(c.id)}
                  >
                    {c.is_active ? 'Đang hoạt động' : 'Tạm khóa'}
                  </button>
                </div>
                <h4 style={{ margin: '10px 0 6px' }}>{c.description}</h4>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Lượt đã dùng: {c.current_uses} / {c.max_uses}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ================= TAB 8: QUẢN LÝ THÔNG BÁO ================= */}
      {adminTab === 'announcements' && (
        <div>
          <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-glass)', borderRadius: 'var(--radius-md)', padding: '20px', marginBottom: '28px' }}>
            <h4><i className="fa-solid fa-bullhorn"></i> Đăng Thông Báo Mới Lên Hệ Thống</h4>
            <form onSubmit={handleAddAnnouncement} style={{ marginTop: '14px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <input
                type="text"
                required
                placeholder="Tiêu đề thông báo..."
                value={newAnnTitle}
                onChange={(e) => setNewAnnTitle(e.target.value)}
                style={{ padding: '10px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-glass)', borderRadius: 'var(--radius-sm)', color: '#fff' }}
              />
              <textarea
                rows="2"
                placeholder="Nội dung chi tiết thông báo..."
                value={newAnnDesc}
                onChange={(e) => setNewAnnDesc(e.target.value)}
                style={{ padding: '10px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-glass)', borderRadius: 'var(--radius-sm)', color: '#fff' }}
              />
              <button type="submit" className="btn btn-primary" style={{ alignSelf: 'flex-start' }}>
                <i className="fa-solid fa-bell"></i> Phát Hành Thông Báo
              </button>
            </form>
          </div>

          <div className="grid-cards">
            {announcementsList.map(a => (
              <div key={a.id} className="content-card">
                <span className="card-tag tag-docx"><i className="fa-solid fa-bell"></i> Thông báo</span>
                <h3 className="card-title">{a.title}</h3>
                <p className="card-desc">{a.description}</p>
                <div className="card-meta">
                  <span>Ngày: {a.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ================= TAB 9: NHẬT KÝ CHATBOT AI ================= */}
      {adminTab === 'chat' && (
        <div>
          <h3>Lịch Sử Trao Đổi Của Học Sinh Với Trợ Lý AI 24/7 (Bảng <code>chat_logs</code>)</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginTop: '16px' }}>
            {chatLogsList.map((c, i) => (
              <div key={i} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-glass)', borderRadius: 'var(--radius-md)', padding: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                  <span><i className="fa-solid fa-user"></i> Người hỏi: <strong>{c.user_name}</strong></span>
                  <span><i className="fa-regular fa-clock"></i> {c.created_at || 'Vừa xong'}</span>
                </div>
                <p style={{ color: 'var(--text-main)', marginBottom: '8px' }}>
                  <strong>Câu hỏi:</strong> "{c.user_query}"
                </p>
                <div style={{ background: 'rgba(99, 102, 241, 0.1)', borderLeft: '3px solid var(--primary-500)', padding: '10px 14px', borderRadius: '4px', fontSize: '0.88rem' }}>
                  <i className="fa-solid fa-robot" style={{ color: 'var(--accent-cyan)' }}></i> <strong>AI trả lời:</strong> {c.ai_response}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ================= TAB 10: CÀI ĐẶT HỆ THỐNG & TÁC GIẢ ================= */}
      {adminTab === 'settings' && (
        <div style={{ maxWidth: '600px' }}>
          <h3>Cài Đặt Thông Tin Sáng Lập Viên & Tên Miền</h3>
          <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '4px', color: 'var(--text-muted)' }}>Họ và tên Sáng Lập Viên:</label>
              <input type="text" readOnly value="Huỳnh Ngân Giang" style={{ width: '100%', padding: '10px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-glass)', borderRadius: 'var(--radius-sm)', color: '#fff' }} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '4px', color: 'var(--text-muted)' }}>Số điện thoại / Hotline / Zalo:</label>
              <input type="text" readOnly value="0355782168" style={{ width: '100%', padding: '10px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-glass)', borderRadius: 'var(--radius-sm)', color: '#fff' }} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '4px', color: 'var(--text-muted)' }}>Email chính thức (Quản trị viên tối cao):</label>
              <input type="text" readOnly value="lyngangiang83pt@gmail.com" style={{ width: '100%', padding: '10px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-glass)', borderRadius: 'var(--radius-sm)', color: '#f59e0b', fontWeight: 700 }} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '4px', color: 'var(--text-muted)' }}>Tên miền định danh:</label>
              <input type="text" readOnly value="hanhtrinhso.docbuoc.vn" style={{ width: '100%', padding: '10px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-glass)', borderRadius: 'var(--radius-sm)', color: '#fff' }} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
