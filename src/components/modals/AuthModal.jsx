import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

export default function AuthModal() {
  const { isAuthModalOpen, setIsAuthModalOpen, authModalTab, setAuthModalTab, login, register } = useAuth();

  // Login form state
  const [loginUser, setLoginUser] = useState('');
  const [loginPass, setLoginPass] = useState('');
  const [loginError, setLoginError] = useState('');

  // Register form state
  const [regUsername, setRegUsername] = useState('');
  const [regFullName, setRegFullName] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regConfirmPass, setRegConfirmPass] = useState('');
  const [regRole, setRegRole] = useState('student');
  const [regEmail, setRegEmail] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regError, setRegError] = useState('');

  if (!isAuthModalOpen) return null;

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoginError('');
    const res = await login(loginUser, loginPass);
    if (!res.success) {
      setLoginError(res.message);
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setRegError('');

    if (regPassword.length < 6) {
      setRegError('⚠️ Mật khẩu phải có tối thiểu 6 ký tự!');
      return;
    }
    if (regPassword !== regConfirmPass) {
      setRegError('⚠️ Mật khẩu xác nhận không khớp!');
      return;
    }

    const res = await register({
      username: regUsername,
      fullName: regFullName,
      password: regPassword,
      role: regRole,
      email: regEmail,
      phone: regPhone
    });

    if (!res.success) {
      setRegError(res.message);
    }
  };

  const fillQuick = (u, p) => {
    setLoginUser(u);
    setLoginPass(p);
  };

  return (
    <div className="modal-overlay" style={{ opacity: 1, visibility: 'visible' }}>
      <div className="modal-card" style={{ maxWidth: '480px', padding: '28px' }}>
        <button className="modal-close-btn" onClick={() => setIsAuthModalOpen(false)}>
          <i className="fa-solid fa-xmark"></i>
        </button>

        {/* Tab Switcher */}
        <div className="tabs-header" style={{ justifyContent: 'center', marginBottom: '20px', borderBottom: '1px solid var(--border-glass)' }}>
          <button
            className={`tab-btn ${authModalTab === 'login' ? 'active' : ''}`}
            onClick={() => setAuthModalTab('login')}
          >
            <i className="fa-solid fa-right-to-bracket"></i> Đăng Nhập
          </button>
          <button
            className={`tab-btn ${authModalTab === 'register' ? 'active' : ''}`}
            onClick={() => setAuthModalTab('register')}
          >
            <i className="fa-solid fa-user-plus"></i> Đăng Ký Mới
          </button>
        </div>

        {/* Form Đăng Nhập */}
        {authModalTab === 'login' && (
          <div>
            <div style={{ textAlign: 'center', marginBottom: '16px' }}>
              <h3 style={{ fontSize: '1.3rem' }}>Đăng Nhập Tài Khoản</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                Sử dụng Username & Mật khẩu đồng bộ cơ sở dữ liệu Supabase
              </p>
            </div>

            <form onSubmit={handleLoginSubmit}>
              <div style={{ marginBottom: '14px' }}>
                <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '4px', color: 'var(--text-muted)' }}>
                  Tên đăng nhập (Username):
                </label>
                <div style={{ position: 'relative' }}>
                  <input
                    type="text"
                    required
                    placeholder="Ví dụ: admin_giang hoặc hocsinh_an"
                    value={loginUser}
                    onChange={(e) => setLoginUser(e.target.value)}
                    style={{ width: '100%', padding: '10px 14px 10px 38px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-glass)', borderRadius: 'var(--radius-sm)', color: 'var(--text-main)' }}
                  />
                  <i className="fa-solid fa-user" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}></i>
                </div>
              </div>

              <div style={{ marginBottom: '18px' }}>
                <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '4px', color: 'var(--text-muted)' }}>
                  Mật khẩu:
                </label>
                <div style={{ position: 'relative' }}>
                  <input
                    type="password"
                    required
                    placeholder="Nhập mật khẩu..."
                    value={loginPass}
                    onChange={(e) => setLoginPass(e.target.value)}
                    style={{ width: '100%', padding: '10px 14px 10px 38px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-glass)', borderRadius: 'var(--radius-sm)', color: 'var(--text-main)' }}
                  />
                  <i className="fa-solid fa-lock" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}></i>
                </div>
              </div>

              {loginError && (
                <div style={{ color: 'var(--accent-rose)', fontSize: '0.82rem', marginBottom: '12px' }}>
                  {loginError}
                </div>
              )}

              <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '12px', marginBottom: '16px' }}>
                <i className="fa-solid fa-right-to-bracket"></i> Đăng Nhập Ngay
              </button>

              <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border-glass)', borderRadius: 'var(--radius-sm)', padding: '10px 12px', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                <span>💡 Tài khoản mẫu Supabase (MK: <strong>123456</strong>):</span>
                <div style={{ display: 'flex', gap: '8px', marginTop: '6px', flexWrap: 'wrap' }}>
                  <button type="button" className="btn btn-google" style={{ padding: '2px 8px', fontSize: '0.75rem' }} onClick={() => fillQuick('admin_giang', '123456')}>Admin Giang</button>
                  <button type="button" className="btn btn-google" style={{ padding: '2px 8px', fontSize: '0.75rem' }} onClick={() => fillQuick('giaovien_mai', '123456')}>GV Mai</button>
                  <button type="button" className="btn btn-google" style={{ padding: '2px 8px', fontSize: '0.75rem' }} onClick={() => fillQuick('hocsinh_an', '123456')}>HS An</button>
                </div>
              </div>
            </form>
          </div>
        )}

        {/* Form Đăng Ký */}
        {authModalTab === 'register' && (
          <div>
            <div style={{ textAlign: 'center', marginBottom: '16px' }}>
              <h3 style={{ fontSize: '1.3rem' }}>Tạo Tài Khoản Mới</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                Lưu trữ trực tiếp vào bảng <code>app_users</code> trên Supabase
              </p>
            </div>

            <form onSubmit={handleRegisterSubmit}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', marginBottom: '4px', color: 'var(--text-muted)' }}>Tên đăng nhập:</label>
                  <input
                    type="text"
                    required
                    placeholder="nguyenan8a1"
                    value={regUsername}
                    onChange={(e) => setRegUsername(e.target.value)}
                    style={{ width: '100%', padding: '8px 10px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-glass)', borderRadius: 'var(--radius-sm)', color: 'var(--text-main)' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', marginBottom: '4px', color: 'var(--text-muted)' }}>Họ và tên:</label>
                  <input
                    type="text"
                    required
                    placeholder="Nguyễn Văn An"
                    value={regFullName}
                    onChange={(e) => setRegFullName(e.target.value)}
                    style={{ width: '100%', padding: '8px 10px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-glass)', borderRadius: 'var(--radius-sm)', color: 'var(--text-main)' }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', marginBottom: '4px', color: 'var(--text-muted)' }}>Mật khẩu:</label>
                  <input
                    type="password"
                    required
                    placeholder="Tối thiểu 6 ký tự"
                    value={regPassword}
                    onChange={(e) => setRegPassword(e.target.value)}
                    style={{ width: '100%', padding: '8px 10px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-glass)', borderRadius: 'var(--radius-sm)', color: 'var(--text-main)' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', marginBottom: '4px', color: 'var(--text-muted)' }}>Xác nhận MK:</label>
                  <input
                    type="password"
                    required
                    placeholder="Nhập lại MK"
                    value={regConfirmPass}
                    onChange={(e) => setRegConfirmPass(e.target.value)}
                    style={{ width: '100%', padding: '8px 10px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-glass)', borderRadius: 'var(--radius-sm)', color: 'var(--text-main)' }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '14px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', marginBottom: '4px', color: 'var(--text-muted)' }}>Vai trò:</label>
                  <select
                    value={regRole}
                    onChange={(e) => setRegRole(e.target.value)}
                    style={{ width: '100%', padding: '8px 10px', background: '#1e293b', border: '1px solid var(--border-glass)', borderRadius: 'var(--radius-sm)', color: 'var(--text-main)' }}
                  >
                    <option value="student">Học sinh</option>
                    <option value="teacher">Giáo viên</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', marginBottom: '4px', color: 'var(--text-muted)' }}>Số điện thoại:</label>
                  <input
                    type="text"
                    placeholder="0355782168"
                    value={regPhone}
                    onChange={(e) => setRegPhone(e.target.value)}
                    style={{ width: '100%', padding: '8px 10px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-glass)', borderRadius: 'var(--radius-sm)', color: 'var(--text-main)' }}
                  />
                </div>
              </div>

              <div style={{ marginBottom: '14px' }}>
                <label style={{ display: 'block', fontSize: '0.8rem', marginBottom: '4px', color: 'var(--text-muted)' }}>Email liên hệ:</label>
                <input
                  type="email"
                  placeholder="hocsinh@gmail.com"
                  value={regEmail}
                  onChange={(e) => setRegEmail(e.target.value)}
                  style={{ width: '100%', padding: '8px 10px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-glass)', borderRadius: 'var(--radius-sm)', color: 'var(--text-main)' }}
                />
              </div>

              {regError && (
                <div style={{ color: 'var(--accent-rose)', fontSize: '0.82rem', marginBottom: '10px' }}>
                  {regError}
                </div>
              )}

              <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '12px', background: 'linear-gradient(135deg, #10b981, #059669)' }}>
                <i className="fa-solid fa-user-plus"></i> Đăng Ký Tài Khoản Mới
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
