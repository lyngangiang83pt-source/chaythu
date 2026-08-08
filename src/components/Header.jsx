import React from 'react';
import { useAuth, SUPER_ADMIN_EMAIL } from '../context/AuthContext';

export default function Header({ activeView, setActiveView, onOpenSupabaseModal, onToggleTheme, isDarkMode }) {
  const { user, logout, setIsAuthModalOpen, setAuthModalTab } = useAuth();

  const isSuperAdmin = user && user.email === SUPER_ADMIN_EMAIL;

  const handleOpenLogin = () => {
    setAuthModalTab('login');
    setIsAuthModalOpen(true);
  };

  const getRoleBadge = (role, email) => {
    if (email === SUPER_ADMIN_EMAIL) return { text: '👑 Quản Trị Viên', color: '#f59e0b' };
    if (role === 'teacher') return { text: '🎓 Giáo Viên', color: '#38bdf8' };
    return { text: 'Học Sinh', color: 'var(--accent-emerald)' };
  };

  const handleProfileClick = () => {
    if (!user) return;
    if (isSuperAdmin) {
      setActiveView('admin');
    } else {
      alert(`👤 Hồ sơ người dùng:\n• Tên đăng nhập: ${user.username}\n• Họ và tên: ${user.name}\n• Vai trò: ${user.role === 'teacher' ? 'Giáo Viên' : 'Học Sinh'}\n• Email: ${user.email}\n\nℹ️ Quyền Quản Trị Viên (Admin) chỉ dành riêng cho tài khoản chính thức: ${SUPER_ADMIN_EMAIL}`);
    }
  };

  return (
    <>
      {/* Top Announcement Bar */}
      <div className="topbar">
        <div className="topbar-info">
          <span className="topbar-info-item"><i className="fa-solid fa-user-tie"></i> Tác giả: <strong>Huỳnh Ngân Giang</strong></span>
          <span className="topbar-info-item"><i className="fa-solid fa-phone"></i> SĐT/Zalo: <strong>0355782168</strong></span>
          <span className="topbar-info-item"><i className="fa-solid fa-envelope"></i> Email: <strong>lyngangiang83pt@gmail.com</strong></span>
        </div>
        <div className="topbar-controls">
          <button className="theme-toggle-btn" onClick={onOpenSupabaseModal} title="Cài đặt kết nối cơ sở dữ liệu Supabase">
            <i className="fa-solid fa-database" style={{ color: '#3ecf8e' }}></i> <span>Supabase: Sẵn sàng</span>
          </button>
          <button className="theme-toggle-btn" onClick={onToggleTheme} title="Chuyển chế độ Sáng/Tối">
            <i className={isDarkMode ? 'fa-solid fa-moon' : 'fa-solid fa-sun'}></i>
            <span>{isDarkMode ? 'Giao diện Tối' : 'Giao diện Sáng'}</span>
          </button>
        </div>
      </div>

      {/* Main Header */}
      <header className="main-header">
        <div className="header-container">
          <div className="logo-brand" onClick={() => setActiveView('home')}>
            <div className="logo-icon"><i className="fa-solid fa-graduation-cap"></i></div>
            <div className="logo-text">
              <span className="logo-title">HÀNH TRÌNH SỐ</span>
              <span className="logo-sub">docbuoc.vn</span>
            </div>
          </div>

          {/* Navigation Menu */}
          <nav>
            <ul className="nav-menu">
              <li className="nav-item">
                <button className={`nav-link ${activeView === 'home' ? 'active' : ''}`} onClick={() => setActiveView('home')}>
                  <i className="fa-solid fa-house"></i> Trang chủ
                </button>
              </li>
              <li className="nav-item">
                <button className={`nav-link ${activeView === 'news' ? 'active' : ''}`} onClick={() => setActiveView('news')}>
                  <i className="fa-solid fa-newspaper"></i> Bảng tin
                </button>
              </li>
              <li className="nav-item">
                <button className={`nav-link ${activeView === 'games' ? 'active' : ''}`} onClick={() => setActiveView('games')}>
                  <i className="fa-solid fa-gamepad"></i> Game
                </button>
              </li>
              <li className="nav-item">
                <button className={`nav-link ${activeView === 'materials' ? 'active' : ''}`} onClick={() => setActiveView('materials')}>
                  <i className="fa-solid fa-book-bookmark"></i> Học liệu số
                </button>
              </li>
              <li className="nav-item">
                <button className={`nav-link ${activeView === 'lectures' ? 'active' : ''}`} onClick={() => setActiveView('lectures')}>
                  <i className="fa-solid fa-chalkboard-user"></i> Bài giảng
                </button>
              </li>
              <li className="nav-item">
                <button className={`nav-link ${activeView === 'assignments' ? 'active' : ''}`} onClick={() => setActiveView('assignments')}>
                  <i className="fa-solid fa-pen-to-square"></i> Bài tập
                </button>
              </li>
              <li className="nav-item">
                <button className={`nav-link ${activeView === 'submissions' ? 'active' : ''}`} onClick={() => setActiveView('submissions')}>
                  <i className="fa-solid fa-shapes"></i> Sản phẩm HS
                </button>
              </li>
              <li className="nav-item">
                <button className={`nav-link ${activeView === 'qa' ? 'active' : ''}`} onClick={() => setActiveView('qa')}>
                  <i className="fa-solid fa-comments"></i> Hỏi - đáp
                </button>
              </li>
              <li className="nav-item">
                <button className={`nav-link ${activeView === 'vip' ? 'active' : ''}`} onClick={() => setActiveView('vip')}>
                  <i className="fa-solid fa-crown"></i> Kho VIP <span className="nav-badge-vip">PRO</span>
                </button>
              </li>
              <li className="nav-item">
                <button className={`nav-link ${activeView === 'announcements' ? 'active' : ''}`} onClick={() => setActiveView('announcements')}>
                  <i className="fa-solid fa-bell"></i> Thông báo
                </button>
              </li>
              {isSuperAdmin && (
                <li className="nav-item">
                  <button className={`nav-link ${activeView === 'admin' ? 'active' : ''}`} onClick={() => setActiveView('admin')} style={{ color: '#f59e0b', fontWeight: 700 }}>
                    <i className="fa-solid fa-gauge-high"></i> Quản Trị Admin
                  </button>
                </li>
              )}
            </ul>
          </nav>

          {/* Action & Auth Area */}
          <div className="header-actions">
            <div className="notification-bell" onClick={() => setActiveView('announcements')} title="Xem thông báo mới">
              <i className="fa-solid fa-bell"></i>
              <span className="bell-badge">3</span>
            </div>

            {user ? (
              <div className="user-profile-badge" onClick={handleProfileClick} title={isSuperAdmin ? "Bấm để vào Bảng Quản Trị Admin" : "Xem thông tin tài khoản"}>
                <img src={user.avatar} alt="Avatar" className="user-avatar" />
                <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'left' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <span className="user-name">{user.name}</span>
                    {user.is_vip && (
                      <span style={{ fontSize: '0.65rem', background: 'linear-gradient(135deg, #f59e0b, #d97706)', color: '#fff', padding: '1px 6px', borderRadius: '8px', fontWeight: 700 }}>
                        VIP PRO
                      </span>
                    )}
                  </div>
                  <span style={{ fontSize: '0.68rem', color: getRoleBadge(user.role, user.email).color, fontWeight: 700 }}>
                    {getRoleBadge(user.role, user.email).text}
                  </span>
                </div>
                <i
                  className="fa-solid fa-right-from-bracket"
                  style={{ fontSize: '0.85rem', color: 'var(--accent-rose)', marginLeft: '6px' }}
                  onClick={(e) => { e.stopPropagation(); if (window.confirm('Bạn có muốn đăng xuất?')) logout(); }}
                  title="Đăng xuất"
                ></i>
              </div>
            ) : (
              <button className="btn btn-primary" onClick={handleOpenLogin}>
                <i className="fa-solid fa-right-to-bracket"></i> Đăng nhập / Đăng ký
              </button>
            )}
          </div>
        </div>
      </header>
    </>
  );
}
