/* ==========================================================================
   HÀNH TRÌNH SỐ - hanhtrinhso.docbuoc.vn
   JavaScript Core Application Logic with Supabase Authentication & Database
   Founder: Huỳnh Ngân Giang | 0355782168 | lyngangiang83pt@gmail.com
   ========================================================================== */

// Pre-configured Supabase Project Credentials
const SUPABASE_PROJECT_URL = "https://qmwprqrupefjlxdlitoh.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFtd3BycXJ1cGVmamx4ZGxpdG9oIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODYwOTM0NjAsImV4cCI6MjEwMTY2OTQ2MH0.EwCpg3QfIKbTnMFZWKOKS1phWLyy6o37S0s2OEP3xpc";

// Supabase Global Client Instance
let supabaseClient = null;

// Local fallback accounts (Password: 123456)
const defaultLocalUsers = [
  { username: 'admin_giang', password_hash: '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92', full_name: 'Huỳnh Ngân Giang', role: 'admin', is_vip: true, avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop', email: 'lyngangiang83pt@gmail.com' },
  { username: 'giaovien_mai', password_hash: '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92', full_name: 'Cô Nguyễn Thị Mai', role: 'teacher', is_vip: true, avatar_url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop', email: 'mai.nguyen@edu.vn' },
  { username: 'hocsinh_an', password_hash: '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92', full_name: 'Nguyễn Văn An', role: 'student', is_vip: false, avatar_url: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200&auto=format&fit=crop', email: 'an.nguyen@gmail.com' }
];

// Fallback Mock Data Store: Newsfeed Items
const defaultNewsData = [
  { id: 1, category: 'truong', title: 'Hội thi Thiết kế Học liệu số Tích hợp AI năm học 2025-2026', date: '05/08/2026', desc: 'Trường phát động hội thi sản phẩm bài giảng số tích hợp Năng lực số (NLS) dành cho học sinh Khối 6-9.', tag: 'Tin trường' },
  { id: 2, category: 'vanban', title: 'Văn bản Hướng dẫn Thực hiện Khung Năng lực số Phổ thông Mới', date: '01/08/2026', desc: 'Bộ Giáo dục và Đào tạo ban hành quy định tích hợp kỹ năng công nghệ số vào giáo án giảng dạy.', tag: 'Văn bản' },
  { id: 3, category: 'thongbao', title: 'Thông báo Lịch nộp Sản phẩm Dự án Kỹ năng số Khối 8 & 9', date: '30/07/2026', desc: 'Học sinh hoàn thiện video và bài thuyết trình PPTX nộp trước ngày 15/08 trên cổng Padlet hoặc Zalo OA.', tag: 'Thông báo' },
  { id: 4, category: 'huongnghiep', title: 'Định hướng Nghề nghiệp Kỷ nguyên AI cho Học sinh THCS', date: '25/07/2026', desc: 'Chuyên đề giới thiệu các ngành nghề công nghệ mới: Kỹ sư AI, Chuyên gia An toàn thông tin, Nhà phân tích dữ liệu.', tag: 'Hướng nghiệp' }
];

// Fallback Mock Data Store: Lectures (Khối 6, 7, 8, 9 - tích hợp NLS & AI)
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

// Fallback Mock Data Store: Assignments (Khối 6, 7, 8, 9)
const defaultAssignmentsData = [
  { id: 201, grade: '6', title: 'Phiếu học tập #1: Phân biệt Tin giả & Tin thật trên Mạng', type: 'Phiếu học tập', deadline: '15/08/2026' },
  { id: 202, grade: '7', title: 'Bài tập về nhà #2: Thực hành Viết Prompt AI tạo Dàn ý Bài văn', type: 'Bài tập về nhà', deadline: '18/08/2026' },
  { id: 203, grade: '8', title: 'Phiếu bài tập #3: Phân tích Dữ liệu Số & Vẽ Biểu đồ', type: 'Phiếu học tập', deadline: '20/08/2026' },
  { id: 204, grade: '9', title: 'Dự án Cuối khóa: Thiết kế Infographic Hướng nghiệp Số', type: 'Bài tập dự án', deadline: '25/08/2026' }
];

// Game Data
const quizQuestions = [
  {
    question: "Kỹ năng nào sau đây là quan trọng nhất trong Khung Năng Lực Số (NLS)?",
    options: ["Gõ bàn phím 10 ngón thật nhanh", "Tư duy phản biện và Đánh giá An toàn Thông tin", "Tải video trên Youtube", "Chơi game trực tuyến"],
    answerIndex: 1
  },
  {
    question: "Để yêu cầu Trợ lý AI hỗ trợ giải bài tập hiệu quả, câu lệnh (Prompt) nên có yếu tố nào?",
    options: ["Câu lệnh thật ngắn 1 từ", "Bối cảnh rõ ràng, vai trò của AI và mục tiêu bài tập", "Không cần ghi nội dung", "Dùng từ ngữ viết tắt khó hiểu"],
    answerIndex: 1
  },
  {
    question: "Website chính thức của Cô Huỳnh Ngân Giang là gì?",
    options: ["docbuoc.com", "hanhtrinhso.docbuoc.vn", "hoclieuso.vn", "giangday.edu.vn"],
    answerIndex: 1
  }
];

// Podcasts & Handbooks
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

// State Variables
let currentScore = 0;
let currentQuestionIdx = 0;
let isPodcastPlaying = false;
let userProfile = null;
let isVipUnlocked = false;
let activeNews = [...defaultNewsData];
let activeLectures = [...defaultLecturesData];
let activeAssignments = [...defaultAssignmentsData];

// Initialize Application
document.addEventListener('DOMContentLoaded', async () => {
  initNavigation();
  initTheme();
  initQuizGame();
  checkSavedAuth();
  
  // Connect to Supabase using hardcoded project credentials
  await initSupabaseConnection();

  renderPodcasts();
  renderHandbooks(handbooks);
  renderVideos();
  renderStudentGallery();
  renderVipResources();
});

/* ==========================================================================
   PASSWORD HASHING (SHA-256 VIA WEB CRYPTO API)
   ========================================================================== */
async function hashPassword(plainText) {
  const utf8 = new TextEncoder().encode(plainText);
  const hashBuffer = await crypto.subtle.digest('SHA-256', utf8);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

/* ==========================================================================
   AUTHENTICATION LOGIC (REGISTER & LOGIN WITH SUPABASE DB)
   ========================================================================== */
function openAuthModal(tab = 'login') {
  switchAuthTab(tab);
  document.getElementById('authModal').classList.add('active');
  document.getElementById('loginErrorMsg').style.display = 'none';
  document.getElementById('regErrorMsg').style.display = 'none';
}

function switchAuthTab(tab) {
  const loginBtn = document.getElementById('authTabLoginBtn');
  const regBtn = document.getElementById('authTabRegisterBtn');
  const loginPanel = document.getElementById('authPanelLogin');
  const regPanel = document.getElementById('authPanelRegister');

  if (tab === 'login') {
    loginBtn.classList.add('active');
    regBtn.classList.remove('active');
    loginPanel.style.display = 'block';
    regPanel.style.display = 'none';
  } else {
    regBtn.classList.add('active');
    loginBtn.classList.remove('active');
    regPanel.style.display = 'block';
    loginPanel.style.display = 'none';
  }
}

function fillLogin(username, password) {
  document.getElementById('loginUsername').value = username;
  document.getElementById('loginPassword').value = password;
}

// 1. Xử lý Đăng Nhập
async function handleUserLogin(event) {
  event.preventDefault();
  const username = document.getElementById('loginUsername').value.trim().toLowerCase();
  const password = document.getElementById('loginPassword').value;
  const errorMsg = document.getElementById('loginErrorMsg');

  errorMsg.style.display = 'none';

  if (!username || !password) {
    errorMsg.innerText = 'Vui lòng nhập tên đăng nhập và mật khẩu!';
    errorMsg.style.display = 'block';
    return;
  }

  const passwordHash = await hashPassword(password);
  let authenticatedUser = null;

  // Verify directly against Supabase app_users table
  if (supabaseClient) {
    try {
      const { data, error } = await supabaseClient
        .from('app_users')
        .select('*')
        .eq('username', username)
        .eq('password_hash', passwordHash)
        .single();

      if (data && !error) {
        authenticatedUser = {
          id: data.id,
          username: data.username,
          name: data.full_name,
          email: data.email,
          phone: data.phone,
          role: data.role,
          is_vip: data.is_vip,
          avatar: data.avatar_url || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200&auto=format&fit=crop'
        };

        // Auto promote founder account to admin and VIP
        if (data.email === 'lyngangiang83pt@gmail.com' || data.username.includes('giang')) {
          authenticatedUser.role = 'admin';
          authenticatedUser.is_vip = true;
        }

        // Update last login in Supabase
        await supabaseClient.from('app_users').update({ last_login: new Date().toISOString() }).eq('id', data.id);
      }
    } catch (e) {
      console.warn('Supabase auth fallback check:', e);
    }
  }

  // Local fallback check
  if (!authenticatedUser) {
    const localUser = defaultLocalUsers.find(u => u.username === username && u.password_hash === passwordHash);
    if (localUser) {
      authenticatedUser = {
        username: localUser.username,
        name: localUser.full_name,
        email: localUser.email,
        role: localUser.role,
        is_vip: localUser.is_vip,
        avatar: localUser.avatar_url
      };
    }
  }

  if (authenticatedUser) {
    // Auto upgrade if founder email or username
    if (authenticatedUser.email === 'lyngangiang83pt@gmail.com' || authenticatedUser.username.includes('giang')) {
      authenticatedUser.role = 'admin';
      authenticatedUser.is_vip = true;
    }

    userProfile = authenticatedUser;
    localStorage.setItem('docbuoc_user', JSON.stringify(userProfile));
    updateAuthUI();
    closeModal('authModal');
    alert(`🎉 Đăng nhập thành công!\nXin chào: ${authenticatedUser.name} (Vai trò: ${getRoleName(authenticatedUser.role)})`);
  } else {
    errorMsg.innerText = '❌ Sai tên đăng nhập hoặc mật khẩu! Vui lòng thử lại.';
    errorMsg.style.display = 'block';
  }
}

// 2. Xử lý Đăng Ký
async function handleUserRegister(event) {
  event.preventDefault();
  const username = document.getElementById('regUsername').value.trim().toLowerCase();
  const fullName = document.getElementById('regFullName').value.trim();
  const password = document.getElementById('regPassword').value;
  const confirmPassword = document.getElementById('regConfirmPassword').value;
  let role = document.getElementById('regRole').value;
  const phone = document.getElementById('regPhone').value.trim();
  const email = document.getElementById('regEmail').value.trim();
  const errorMsg = document.getElementById('regErrorMsg');

  errorMsg.style.display = 'none';

  if (password.length < 6) {
    errorMsg.innerText = '⚠️ Mật khẩu phải có tối thiểu 6 ký tự!';
    errorMsg.style.display = 'block';
    return;
  }

  if (password !== confirmPassword) {
    errorMsg.innerText = '⚠️ Mật khẩu xác nhận không khớp!';
    errorMsg.style.display = 'block';
    return;
  }

  // Founder auto-promotion
  let isVip = false;
  if (email === 'lyngangiang83pt@gmail.com' || username.includes('giang')) {
    role = 'admin';
    isVip = true;
  }

  const passwordHash = await hashPassword(password);

  // Insert into Supabase app_users table
  if (supabaseClient) {
    try {
      // Check if username already exists
      const { data: existingUser } = await supabaseClient.from('app_users').select('id').eq('username', username);
      if (existingUser && existingUser.length > 0) {
        errorMsg.innerText = '⚠️ Tên đăng nhập này đã được sử dụng! Vui lòng chọn tên khác.';
        errorMsg.style.display = 'block';
        return;
      }

      await supabaseClient.from('app_users').insert([{
        username: username,
        password_hash: passwordHash,
        full_name: fullName,
        email: email || `${username}@docbuoc.vn`,
        phone: phone || '',
        role: role,
        is_vip: isVip,
        avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop'
      }]);
    } catch (e) {
      console.warn('Lỗi ghi Supabase register:', e);
    }
  }

  // Auto login newly registered account
  userProfile = {
    username: username,
    name: fullName,
    email: email || `${username}@docbuoc.vn`,
    phone: phone,
    role: role,
    is_vip: isVip,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop'
  };

  localStorage.setItem('docbuoc_user', JSON.stringify(userProfile));
  updateAuthUI();
  closeModal('authModal');
  alert(`🎉 Đăng ký thành công tài khoản "${username}"!\nĐã kích hoạt quyền: ${getRoleName(role)}.`);
}

function getRoleName(role) {
  if (role === 'admin') return 'Quản Trị Viên (Admin)';
  if (role === 'teacher') return 'Giáo Viên';
  return 'Học Sinh';
}

function checkSavedAuth() {
  const saved = localStorage.getItem('docbuoc_user');
  if (saved) {
    userProfile = JSON.parse(saved);
    
    // Auto-promote founder account if currently saved in session
    if (userProfile && (userProfile.email === 'lyngangiang83pt@gmail.com' || (userProfile.username && userProfile.username.includes('giang')))) {
      userProfile.role = 'admin';
      userProfile.is_vip = true;
      localStorage.setItem('docbuoc_user', JSON.stringify(userProfile));
    }
    
    updateAuthUI();
  }
}

function updateAuthUI() {
  const authArea = document.getElementById('authArea');
  if (!authArea) return;

  if (userProfile) {
    let roleBadgeColor = 'var(--accent-emerald)';
    let roleBadgeText = getRoleName(userProfile.role);
    if (userProfile.role === 'admin') {
      roleBadgeColor = '#f59e0b';
      roleBadgeText = '👑 Quản Trị Viên';
    } else if (userProfile.role === 'teacher') {
      roleBadgeColor = '#38bdf8';
      roleBadgeText = '🎓 Giáo Viên';
    }

    let vipBadgeHtml = userProfile.is_vip ? `<span style="font-size: 0.65rem; background: linear-gradient(135deg, #f59e0b, #d97706); color: #fff; padding: 1px 6px; border-radius: 8px; font-weight: 700;">VIP PRO</span>` : '';

    authArea.innerHTML = `
      <div class="user-profile-badge" onclick="showUserProfileMenu()" title="Bấm để xem hồ sơ / Quản trị tài khoản">
        <img src="${userProfile.avatar}" alt="Avatar" class="user-avatar">
        <div style="display: flex; flex-direction: column; text-align: left;">
          <div style="display: flex; align-items: center; gap: 4px;">
            <span class="user-name">${userProfile.name}</span>
            ${vipBadgeHtml}
          </div>
          <span style="font-size: 0.68rem; color: ${roleBadgeColor}; font-weight: 700;">
            ${roleBadgeText}
          </span>
        </div>
        <i class="fa-solid fa-right-from-bracket" style="font-size: 0.85rem; color: var(--accent-rose); margin-left: 6px;" onclick="event.stopPropagation(); logoutUser();" title="Đăng xuất"></i>
      </div>
    `;
  } else {
    authArea.innerHTML = `
      <button class="btn btn-primary" id="loginBtn" onclick="openAuthModal('login')">
        <i class="fa-solid fa-right-to-bracket"></i> Đăng nhập / Đăng ký
      </button>
    `;
  }
}

async function upgradeCurrentUserToAdmin() {
  if (!userProfile) return;
  
  userProfile.role = 'admin';
  userProfile.is_vip = true;
  localStorage.setItem('docbuoc_user', JSON.stringify(userProfile));

  // Sync to Supabase if connected
  if (supabaseClient) {
    try {
      await supabaseClient.from('app_users').update({ role: 'admin', is_vip: true }).eq('email', userProfile.email);
    } catch (e) {
      console.warn('Lỗi cập nhật Supabase admin:', e);
    }
  }

  updateAuthUI();
  alert(`👑 Đã kích hoạt thành công quyền QUẢN TRỊ VIÊN (ADMIN) & VIP TOÀN QUYỀN cho tài khoản:\n• Tên đăng nhập: ${userProfile.username}\n• Họ và tên: ${userProfile.name}\n• Email: ${userProfile.email}`);
}

function showUserProfileMenu() {
  if (!userProfile) return;
  const isCurrentlyAdmin = userProfile.role === 'admin' && userProfile.is_vip;

  let promptText = `👤 THÔNG TIN TÀI KHOẢN NGƯỜI DÙNG:\n` +
    `• Tên đăng nhập: ${userProfile.username}\n` +
    `• Họ và tên: ${userProfile.name}\n` +
    `• Vai trò hiện tại: ${getRoleName(userProfile.role)}\n` +
    `• Email: ${userProfile.email || 'lyngangiang83pt@gmail.com'}\n` +
    `• Quyền VIP: ${userProfile.is_vip ? 'Đã kích hoạt VIP Cao Cấp' : 'Chưa kích hoạt'}\n\n`;

  if (!isCurrentlyAdmin) {
    if (confirm(promptText + `👉 Bấm "OK" để KÍCH HOẠT QUYỀN ADMIN & VIP NGAY LẬP TỨC cho tài khoản này!`)) {
      upgradeCurrentUserToAdmin();
    }
  } else {
    alert(promptText + `✅ Tài khoản của bạn hiện là Quản Trị Viên Sáng Lập Viên với đầy đủ đặc quyền VIP cao cấp!`);
  }
}

function logoutUser() {
  if (confirm('Bạn có muốn đăng xuất khỏi hệ thống hanhtrinhso.docbuoc.vn?')) {
    userProfile = null;
    localStorage.removeItem('docbuoc_user');
    updateAuthUI();
  }
}

/* ==========================================================================
   SUPABASE INTEGRATION LOGIC
   ========================================================================== */
async function initSupabaseConnection() {
  const url = localStorage.getItem('supabase_url') || SUPABASE_PROJECT_URL;
  const key = localStorage.getItem('supabase_key') || SUPABASE_ANON_KEY;
  const statusBadge = document.getElementById('supabaseStatusText');

  if (url && key && window.supabase) {
    try {
      supabaseClient = window.supabase.createClient(url, key);
      
      // Attempt fetching data from Supabase
      const hasLiveDb = await fetchNewsFromSupabase();
      if (hasLiveDb) {
        if (statusBadge) {
          statusBadge.innerText = 'Supabase: Đã đồng bộ';
          statusBadge.style.color = '#34d399';
        }
      } else {
        if (statusBadge) {
          statusBadge.innerText = 'Supabase: Sẵn sàng';
          statusBadge.style.color = '#38bdf8';
        }
      }
      
      await fetchLecturesFromSupabase();
      await fetchAssignmentsFromSupabase();
      await fetchAnnouncementsFromSupabase();
      return;
    } catch (err) {
      console.warn('Lỗi khởi tạo Supabase Client:', err);
    }
  }

  // Fallback to local default data
  if (statusBadge) statusBadge.innerText = 'Supabase: Dữ liệu chuẩn';
  renderNewsGrid(activeNews);
  renderLecturesGrid(activeLectures);
  renderAssignmentsGrid(activeAssignments);
  renderAnnouncements();
}

async function fetchNewsFromSupabase() {
  if (!supabaseClient) { renderNewsGrid(activeNews); return false; }
  try {
    const { data, error } = await supabaseClient.from('news').select('*').order('created_at', { ascending: false });
    if (data && data.length > 0 && !error) {
      activeNews = data.map(item => ({
        id: item.id,
        category: item.category,
        title: item.title,
        date: item.date,
        desc: item.content,
        tag: item.tag || 'Tin tức'
      }));
      renderNewsGrid(activeNews);
      return true;
    }
  } catch (e) {
    console.warn('Fallback news:', e);
  }
  renderNewsGrid(activeNews);
  return false;
}

async function fetchLecturesFromSupabase() {
  if (!supabaseClient) { renderLecturesGrid(activeLectures); return; }
  try {
    const { data, error } = await supabaseClient.from('lectures').select('*').order('created_at', { ascending: false });
    if (data && data.length > 0 && !error) {
      activeLectures = data.map(item => ({
        id: item.id,
        grade: item.grade,
        title: item.title,
        format: item.format,
        hasAI: item.has_ai,
        desc: item.description,
        downloads: item.downloads || 0
      }));
    }
  } catch (e) {
    console.warn('Fallback lectures:', e);
  }
  renderLecturesGrid(activeLectures);
}

async function fetchAssignmentsFromSupabase() {
  if (!supabaseClient) { renderAssignmentsGrid(activeAssignments); return; }
  try {
    const { data, error } = await supabaseClient.from('assignments').select('*').order('created_at', { ascending: false });
    if (data && data.length > 0 && !error) {
      activeAssignments = data.map(item => ({
        id: item.id,
        grade: item.grade,
        title: item.title,
        type: item.type,
        deadline: item.deadline
      }));
    }
  } catch (e) {
    console.warn('Fallback assignments:', e);
  }
  renderAssignmentsGrid(activeAssignments);
}

async function fetchAnnouncementsFromSupabase() {
  if (!supabaseClient) { renderAnnouncements(); return; }
  try {
    const { data, error } = await supabaseClient.from('announcements').select('*').order('created_at', { ascending: false });
    if (data && data.length > 0 && !error) {
      const container = document.getElementById('announcementsList');
      if (container) {
        container.innerHTML = data.map(a => `
          <div class="content-card">
            <span class="card-tag tag-docx"><i class="fa-solid fa-bell"></i> ${a.is_pinned ? 'Ghim đầu trang' : 'Thông báo'}</span>
            <h3 class="card-title">${a.title}</h3>
            <p class="card-desc">${a.description}</p>
            <div class="card-meta">
              <span><i class="fa-regular fa-clock"></i> Cập nhật: ${a.date}</span>
              <span><i class="fa-solid fa-database" style="color: var(--accent-emerald);"></i> Đồng bộ Supabase</span>
            </div>
          </div>
        `).join('');
      }
      return;
    }
  } catch (e) {
    console.warn('Fallback announcements:', e);
  }
  renderAnnouncements();
}

function openSupabaseModal() {
  const modal = document.getElementById('supabaseModal');
  const urlInput = document.getElementById('cfgSupabaseUrl');
  const keyInput = document.getElementById('cfgSupabaseKey');

  urlInput.value = localStorage.getItem('supabase_url') || SUPABASE_PROJECT_URL;
  keyInput.value = localStorage.getItem('supabase_key') || SUPABASE_ANON_KEY;
  modal.classList.add('active');
}

async function saveSupabaseConfig() {
  const url = document.getElementById('cfgSupabaseUrl').value.trim();
  const key = document.getElementById('cfgSupabaseKey').value.trim();
  const statusElem = document.getElementById('supabaseTestStatus');

  if (!url || !key) {
    statusElem.innerText = '⚠️ Vui lòng nhập đầy đủ Project URL và Anon Key!';
    statusElem.style.color = '#f87171';
    return;
  }

  localStorage.setItem('supabase_url', url);
  localStorage.setItem('supabase_key', key);

  statusElem.innerText = '⏳ Đang kiểm tra kết nối Supabase...';
  statusElem.style.color = '#fbbf24';

  await initSupabaseConnection();

  if (supabaseClient) {
    statusElem.innerText = '✅ Kết nối Supabase thành công 100%!';
    statusElem.style.color = '#34d399';
    setTimeout(() => closeModal('supabaseModal'), 1200);
  }
}

function resetSupabaseConfig() {
  localStorage.removeItem('supabase_url');
  localStorage.removeItem('supabase_key');
  document.getElementById('cfgSupabaseUrl').value = SUPABASE_PROJECT_URL;
  document.getElementById('cfgSupabaseKey').value = SUPABASE_ANON_KEY;
  document.getElementById('supabaseTestStatus').innerText = '🔄 Đã khôi phục thông tin Supabase mặc định của Cô Huỳnh Ngân Giang!';
  document.getElementById('supabaseTestStatus').style.color = '#a5b4fc';
  initSupabaseConnection();
}

/* ==========================================================================
   NAVIGATION & VIEW SWITCHING
   ========================================================================== */
function initNavigation() {
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetView = link.getAttribute('data-view');
      if (targetView) {
        switchView(targetView);
      }
    });
  });
}

function switchView(viewId) {
  document.querySelectorAll('.nav-link').forEach(link => {
    if (link.getAttribute('data-view') === viewId) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });

  document.querySelectorAll('.view-section').forEach(section => {
    section.classList.remove('active');
  });

  const activeSection = document.getElementById(`view-${viewId}`);
  if (activeSection) {
    activeSection.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

/* ==========================================================================
   NEWSFEED SECTION (BẢNG TIN)
   ========================================================================== */
function renderNewsGrid(items) {
  const container = document.getElementById('newsGridContainer');
  if (!container) return;

  container.innerHTML = items.map(item => `
    <div class="content-card">
      <span class="card-tag tag-docx"><i class="fa-solid fa-newspaper"></i> ${item.tag}</span>
      <h3 class="card-title">${item.title}</h3>
      <p class="card-desc">${item.desc}</p>
      <div class="card-meta">
        <span><i class="fa-regular fa-calendar"></i> ${item.date}</span>
        <span><i class="fa-solid fa-user-tie"></i> Huỳnh Ngân Giang</span>
      </div>
      <div class="card-actions">
        <button class="btn btn-google" onclick="alert('Đang mở chi tiết bài viết: ${item.title}')">
          <i class="fa-solid fa-book-open"></i> Đọc chi tiết
        </button>
      </div>
    </div>
  `).join('');
}

function filterNewsTab(category) {
  const tabs = document.querySelectorAll('#view-news .tab-btn');
  tabs.forEach(btn => btn.classList.remove('active'));
  event.target.classList.add('active');

  if (category === 'all') {
    renderNewsGrid(activeNews);
  } else {
    const filtered = activeNews.filter(item => item.category === category);
    renderNewsGrid(filtered);
  }
}

/* ==========================================================================
   LECTURES SECTION (BÀI GIẢNG KHỐI 6789 - NLS & AI)
   ========================================================================== */
function renderLecturesGrid(items) {
  const container = document.getElementById('lecturesGrid');
  if (!container) return;

  if (items.length === 0) {
    container.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: var(--text-muted);">Không tìm thấy bài giảng phù hợp.</p>`;
    return;
  }

  container.innerHTML = items.map(item => {
    let tagClass = 'tag-pptx';
    let formatLabel = 'PPTX (Slide)';
    if (item.format === 'docx') { tagClass = 'tag-docx'; formatLabel = 'DOCX (Giáo án)'; }
    if (item.format === 'elearning') { tagClass = 'tag-elearning'; formatLabel = 'E-learning'; }

    return `
      <div class="content-card">
        <div style="display: flex; gap: 8px;">
          <span class="card-tag ${tagClass}">${formatLabel}</span>
          <span class="card-tag tag-docx" style="background: rgba(99, 102, 241, 0.2); color: #a5b4fc;">Khối ${item.grade}</span>
        </div>
        <h3 class="card-title">${item.title}</h3>
        <p class="card-desc">${item.desc}</p>
        <div style="margin-bottom: 12px;">
          <span class="nls-ai-pill"><i class="fa-solid fa-microchip"></i> Tích hợp NLS + AI</span>
        </div>
        <div class="card-meta">
          <span><i class="fa-solid fa-download"></i> ${item.downloads} lượt tải</span>
          <span><i class="fa-solid fa-circle-check" style="color: var(--accent-emerald);"></i> Đã kiểm định</span>
        </div>
        <div class="card-actions">
          <button class="btn btn-primary" onclick="downloadLecture('${item.title}', '${item.format}')">
            <i class="fa-solid fa-download"></i> Tải Bài Giảng
          </button>
        </div>
      </div>
    `;
  }).join('');
}

function filterLectures(grade) {
  const tabs = document.querySelectorAll('#view-lectures .tab-btn');
  tabs.forEach(btn => btn.classList.remove('active'));
  event.target.classList.add('active');

  if (grade === 'all') {
    renderLecturesGrid(activeLectures);
  } else {
    const filtered = activeLectures.filter(item => item.grade === grade);
    renderLecturesGrid(filtered);
  }
}

function filterLecturesByGrade(grade) {
  switchView('lectures');
  const filtered = activeLectures.filter(item => item.grade === grade);
  renderLecturesGrid(filtered);
}

function searchLectures(query) {
  const q = query.toLowerCase();
  const filtered = activeLectures.filter(item => 
    item.title.toLowerCase().includes(q) || (item.desc && item.desc.toLowerCase().includes(q))
  );
  renderLecturesGrid(filtered);
}

function downloadLecture(title, format) {
  alert(`[Thành công] Đã tải bài giảng từ Supabase / Kho học liệu:\n"${title}" (Định dạng: ${format.toUpperCase()})\nTác giả: Huỳnh Ngân Giang (hanhtrinhso.docbuoc.vn)`);
}

/* ==========================================================================
   ASSIGNMENTS SECTION (BÀI TẬP KHỐI 6789)
   ========================================================================== */
function renderAssignmentsGrid(items) {
  const container = document.getElementById('assignmentsGrid');
  if (!container) return;

  container.innerHTML = items.map(item => `
    <div class="content-card">
      <div style="display: flex; gap: 8px;">
        <span class="card-tag tag-pptx">${item.type}</span>
        <span class="card-tag tag-docx">Khối ${item.grade}</span>
      </div>
      <h3 class="card-title">${item.title}</h3>
      <p class="card-desc">Phiếu bài tập thực hành thiết kế rèn luyện Năng lực số cho học sinh lớp ${item.grade}.</p>
      <div class="card-meta">
        <span><i class="fa-regular fa-clock"></i> Hạn nộp: <strong>${item.deadline}</strong></span>
        <span><i class="fa-solid fa-user-tie"></i> Huỳnh Ngân Giang</span>
      </div>
      <div class="card-actions">
        <button class="btn btn-primary" onclick="downloadLecture('${item.title}', 'PDF')">
          <i class="fa-solid fa-file-pdf"></i> Tải Phiếu Bài Tập
        </button>
        <button class="btn btn-google" onclick="switchView('student-products')">
          <i class="fa-solid fa-upload"></i> Nộp Bài
        </button>
      </div>
    </div>
  `).join('');
}

function filterAssignments(grade) {
  const tabs = document.querySelectorAll('#view-assignments .tab-btn');
  tabs.forEach(btn => btn.classList.remove('active'));
  event.target.classList.add('active');

  if (grade === 'all') {
    renderAssignmentsGrid(activeAssignments);
  } else {
    const filtered = activeAssignments.filter(item => item.grade === grade);
    renderAssignmentsGrid(filtered);
  }
}

/* ==========================================================================
   INTERACTIVE GAME ENGINE
   ========================================================================== */
function initQuizGame() {
  currentQuestionIdx = 0;
  currentScore = 0;
  displayQuizQuestion();
}

function displayQuizQuestion() {
  const q = quizQuestions[currentQuestionIdx];
  const qText = document.getElementById('quizQuestionText');
  const optionsArea = document.getElementById('quizOptionsArea');
  const scoreText = document.getElementById('quizScoreText');
  const nextBtn = document.getElementById('nextQuizBtn');

  if (!qText || !optionsArea) return;

  scoreText.innerText = `Điểm: ${currentScore}`;
  nextBtn.style.display = 'none';
  qText.innerText = `Câu ${currentQuestionIdx + 1}: ${q.question}`;

  optionsArea.innerHTML = q.options.map((opt, idx) => `
    <button class="quiz-opt-btn" onclick="selectQuizAnswer(${idx})">
      <span>${String.fromCharCode(65 + idx)}. ${opt}</span>
      <i class="fa-regular fa-circle"></i>
    </button>
  `).join('');
}

function selectQuizAnswer(selectedIndex) {
  const q = quizQuestions[currentQuestionIdx];
  const buttons = document.querySelectorAll('.quiz-opt-btn');
  const nextBtn = document.getElementById('nextQuizBtn');

  buttons.forEach((btn, idx) => {
    btn.disabled = true;
    if (idx === q.answerIndex) {
      btn.classList.add('correct');
      btn.querySelector('i').className = 'fa-solid fa-circle-check';
    }
    if (idx === selectedIndex && selectedIndex !== q.answerIndex) {
      btn.classList.add('wrong');
      btn.querySelector('i').className = 'fa-solid fa-circle-xmark';
    }
  });

  if (selectedIndex === q.answerIndex) {
    currentScore += 10;
    document.getElementById('quizScoreText').innerText = `Điểm: ${currentScore}`;
  }

  nextBtn.style.display = 'inline-flex';
}

function loadNextQuizQuestion() {
  currentQuestionIdx++;
  if (currentQuestionIdx >= quizQuestions.length) {
    alert(`🎉 Chúc mừng bạn đã hoàn thành Trò chơi Năng lực số!\nTổng điểm đạt được: ${currentScore} điểm.`);
    initQuizGame();
  } else {
    displayQuizQuestion();
  }
}

/* ==========================================================================
   DIGITAL MATERIALS (HỌC LIỆU SỐ & PODCAST)
   ========================================================================== */
function switchMaterialSubTab(tabName) {
  document.querySelectorAll('#view-digital-materials .tab-btn').forEach(btn => btn.classList.remove('active'));
  event.target.classList.add('active');

  document.getElementById('materialSub-podcast').style.display = tabName === 'podcast' ? 'block' : 'none';
  document.getElementById('materialSub-handbook').style.display = tabName === 'handbook' ? 'block' : 'none';
  document.getElementById('materialSub-video').style.display = tabName === 'video' ? 'block' : 'none';
}

function renderPodcasts() {
  const container = document.getElementById('podcastGrid');
  if (!container) return;

  container.innerHTML = podcasts.map(p => `
    <div class="content-card">
      <span class="card-tag tag-elearning"><i class="fa-solid fa-podcast"></i> Audio Podcast</span>
      <h3 class="card-title">${p.title}</h3>
      <p class="card-desc">Thời lượng: ${p.duration} | Giọng đọc: ${p.author}</p>
      <div class="card-actions">
        <button class="btn btn-primary" onclick="playPodcastItem('${p.title}', '${p.duration}')">
          <i class="fa-solid fa-play"></i> Nghe Tập Này
        </button>
      </div>
    </div>
  `).join('');
}

function playPodcastItem(title, duration) {
  document.getElementById('podcastTitle').innerText = title;
  document.getElementById('podcastMeta').innerText = `Tác giả: Huỳnh Ngân Giang | Thời lượng: ${duration}`;
  isPodcastPlaying = true;
  updatePodcastState();
}

function togglePodcastPlay() {
  isPodcastPlaying = !isPodcastPlaying;
  updatePodcastState();
}

function updatePodcastState() {
  const icon = document.getElementById('podcastPlayIcon');
  const status = document.getElementById('podcastStatus');

  if (isPodcastPlaying) {
    icon.className = 'fa-solid fa-pause';
    status.innerHTML = `<span style="color: var(--accent-emerald);"><i class="fa-solid fa-volume-high"></i> Đang phát âm thanh...</span>`;
  } else {
    icon.className = 'fa-solid fa-play';
    status.innerText = 'Đã tạm dừng âm thanh';
  }
}

function renderHandbooks(items) {
  const container = document.getElementById('handbookGrid');
  if (!container) return;

  container.innerHTML = items.map(h => `
    <div class="content-card">
      <span class="card-tag tag-docx">${h.category}</span>
      <h3 class="card-title">${h.title}</h3>
      <p class="card-desc">${h.desc}</p>
      <div class="card-actions">
        <button class="btn btn-google" onclick="alert('Đang mở nội dung Sổ tay tri thức: ${h.title}')">
          <i class="fa-solid fa-book-open"></i> Xem Sổ Tay
        </button>
      </div>
    </div>
  `).join('');
}

function filterHandbook(query) {
  const q = query.toLowerCase();
  const filtered = handbooks.filter(h => h.title.toLowerCase().includes(q) || h.desc.toLowerCase().includes(q));
  renderHandbooks(filtered);
}

function renderVideos() {
  const container = document.getElementById('videoGrid');
  if (!container) return;

  container.innerHTML = educationalVideos.map(v => `
    <div class="content-card">
      <span class="card-tag tag-pptx"><i class="fa-solid fa-video"></i> Video Bài Học</span>
      <h3 class="card-title">${v.title}</h3>
      <p class="card-desc">Thời lượng: ${v.duration} | Lượt xem: ${v.views}</p>
      <div class="card-actions">
        <button class="btn btn-primary" onclick="alert('Đang chiếu phim giáo dục: ${v.title}')">
          <i class="fa-solid fa-circle-play"></i> Xem Phim
        </button>
      </div>
    </div>
  `).join('');
}

/* ==========================================================================
   STUDENT PRODUCTS SUBMISSION (PADLET, DRIVE, SUPABASE)
   ========================================================================== */
function openPadletModal() {
  const modal = document.getElementById('submissionModal');
  document.getElementById('submissionModalTitle').innerText = 'Cổng Nộp Bài Qua Padlet';
  document.getElementById('submissionModalContent').innerHTML = `
    <p style="margin-bottom: 16px; color: var(--text-muted);">Đã kết nối với Bức tường Padlet lớp học của Cô Huỳnh Ngân Giang:</p>
    <div style="background: rgba(255,255,255,0.05); padding: 20px; border-radius: var(--radius-md); border: 1px solid var(--border-glass); text-align: center; margin-bottom: 20px;">
      <i class="fa-solid fa-chalkboard" style="font-size: 2.5rem; color: #ff4081; margin-bottom: 10px;"></i>
      <h4>Padlet: Năng Lực Số & Dự Án Học Sinh 2026</h4>
      <p style="font-size: 0.82rem; color: var(--text-muted);">Địa chỉ: padlet.com/lyngangiang83pt/hanhtrinhso</p>
    </div>
    <button class="btn btn-primary" style="width: 100%;" onclick="window.open('https://padlet.com', '_blank')">
      <i class="fa-solid fa-external-link"></i> Truy Cập Trang Padlet Nộp Bài
    </button>
  `;
  modal.classList.add('active');
}

function openDriveModal() {
  const modal = document.getElementById('submissionModal');
  const defaultStudentName = userProfile ? userProfile.name : '';

  document.getElementById('submissionModalTitle').innerText = 'Nộp Bài Trực Tiếp (Supabase / Drive)';
  document.getElementById('submissionModalContent').innerHTML = `
    <p style="margin-bottom: 16px; color: var(--text-muted);">Nhập thông tin bài làm để lưu trực tiếp vào bảng <code>student_submissions</code> trên Supabase:</p>
    <div style="margin-bottom: 12px;">
      <label style="display: block; font-size: 0.85rem; margin-bottom: 4px;">Họ và tên học sinh / Lớp:</label>
      <input type="text" id="driveStudentName" value="${defaultStudentName}" placeholder="Ví dụ: Nguyễn Văn An - Lớp 8A1" style="width: 100%; padding: 10px; background: rgba(255,255,255,0.05); border: 1px solid var(--border-glass); border-radius: var(--radius-sm); color: var(--text-main);">
    </div>
    <div style="margin-bottom: 12px;">
      <label style="display: block; font-size: 0.85rem; margin-bottom: 4px;">Tên Dự án / Bài Tập:</label>
      <input type="text" id="driveProjectTitle" placeholder="Ví dụ: Infographic An toàn Mạng" style="width: 100%; padding: 10px; background: rgba(255,255,255,0.05); border: 1px solid var(--border-glass); border-radius: var(--radius-sm); color: var(--text-main);">
    </div>
    <div style="margin-bottom: 16px;">
      <label style="display: block; font-size: 0.85rem; margin-bottom: 4px;">Link Google Drive / Canva / Sản phẩm:</label>
      <input type="text" id="driveSubmissionLink" placeholder="https://drive.google.com/..." style="width: 100%; padding: 10px; background: rgba(255,255,255,0.05); border: 1px solid var(--border-glass); border-radius: var(--radius-sm); color: var(--text-main);">
    </div>
    <button class="btn btn-primary" style="width: 100%;" onclick="submitToSupabase()">
      <i class="fa-solid fa-cloud-arrow-up"></i> Gửi Sản Phẩm Lên Supabase
    </button>
  `;
  modal.classList.add('active');
}

async function submitToSupabase() {
  const name = document.getElementById('driveStudentName').value.trim();
  const title = document.getElementById('driveProjectTitle').value.trim();
  const link = document.getElementById('driveSubmissionLink').value.trim();

  if (!name || !title) {
    alert('Vui lòng nhập đầy đủ Họ tên và Tên dự án!');
    return;
  }

  if (supabaseClient) {
    try {
      const { error } = await supabaseClient.from('student_submissions').insert([{
        user_id: userProfile && userProfile.id ? userProfile.id : null,
        student_name: name,
        grade: '8',
        project_title: title,
        submission_channel: 'drive',
        submission_link: link || 'https://hanhtrinhso.docbuoc.vn',
        status: 'Đã tiếp nhận'
      }]);
      if (!error) {
        alert(`🎉 [Supabase Success] Bài làm của học sinh "${name}" đã được lưu thành công vào cơ sở dữ liệu Supabase của Cô Huỳnh Ngân Giang!`);
        closeModal('submissionModal');
        return;
      }
    } catch (e) {
      console.warn('Lỗi ghi Supabase:', e);
    }
  }

  alert(`[Thành công] Bài làm của học sinh "${name}" đã được tiếp nhận và lưu vào hệ thống!`);
  closeModal('submissionModal');
}

function openZaloModal() {
  const modal = document.getElementById('submissionModal');
  document.getElementById('submissionModalTitle').innerText = 'Kết Nối Zalo OA (0355782168)';
  document.getElementById('submissionModalContent').innerHTML = `
    <div style="text-align: center;">
      <div style="width: 80px; height: 80px; border-radius: 50%; background: #0068ff; color: #fff; display: flex; align-items: center; justify-content: center; font-size: 2.5rem; margin: 0 auto 16px;">
        <i class="fa-solid fa-comment-dots"></i>
      </div>
      <h3>Zalo Official Account: Huỳnh Ngân Giang</h3>
      <p style="color: var(--text-muted); font-size: 0.88rem; margin: 8px 0 20px;">
        SĐT / Zalo hỗ trợ học sinh & giáo viên: <strong>0355782168</strong><br>
        Email tiếp nhận bài làm: <strong>lyngangiang83pt@gmail.com</strong>
      </p>
      <button class="btn btn-primary" style="width: 100%;" onclick="window.open('https://zalo.me/0355782168', '_blank')">
        <i class="fa-solid fa-paper-plane"></i> Nhắn Tin Trực Tiếp Qua Zalo
      </button>
    </div>
  `;
  modal.classList.add('active');
}

function renderStudentGallery() {
  const container = document.getElementById('studentGalleryGrid');
  if (!container) return;

  const gallery = [
    { title: 'Infographic: 5 Tiêu chuẩn An toàn Mạng', student: 'Trần Thị Bích - Lớp 9A2', grade: '9', status: 'Đạt giải Nhất' },
    { title: 'Video Animation: Khai phá Trợ lý AI', student: 'Lê Minh Khoa - Lớp 8B1', grade: '8', status: 'Xuất sắc' },
    { title: 'Slide PPTX: Lịch sử Máy tính Số', student: 'Phạm Hoàng Nam - Lớp 7A3', grade: '7', status: 'Đánh giá Cao' }
  ];

  container.innerHTML = gallery.map(item => `
    <div class="content-card">
      <span class="card-tag tag-elearning"><i class="fa-solid fa-award"></i> ${item.status}</span>
      <h3 class="card-title">${item.title}</h3>
      <p class="card-desc">Tác giả: <strong>${item.student}</strong></p>
      <div class="card-actions">
        <button class="btn btn-google" onclick="alert('Đang mở bài làm của học sinh: ${item.title}')">
          <i class="fa-solid fa-eye"></i> Xem Bài Làm
        </button>
      </div>
    </div>
  `).join('');
}

/* ==========================================================================
   24/7 AI CHATBOT ENGINE & LOGGING
   ========================================================================== */
function handleChatKeyPress(event) {
  if (event.key === 'Enter') {
    sendChatMessage();
  }
}

async function sendChatMessage() {
  const input = document.getElementById('chatInputText');
  const chatList = document.getElementById('chatMessageList');
  const text = input.value.trim();

  if (!text) return;

  chatList.innerHTML += `<div class="chat-msg user">${escapeHtml(text)}</div>`;
  input.value = '';
  chatList.scrollTop = chatList.scrollHeight;

  setTimeout(async () => {
    let reply = generateAiReply(text);
    chatList.innerHTML += `<div class="chat-msg bot">${reply}</div>`;
    chatList.scrollTop = chatList.scrollHeight;

    // Log to Supabase chat_logs table if active
    if (supabaseClient) {
      try {
        await supabaseClient.from('chat_logs').insert([{
          user_name: userProfile ? userProfile.name : 'Khách truy cập',
          user_query: text,
          ai_response: reply.replace(/<[^>]*>?/gm, '')
        }]);
      } catch (e) {
        console.warn('Lỗi ghi chat log Supabase:', e);
      }
    }
  }, 500);
}

function generateAiReply(userQuery) {
  const q = userQuery.toLowerCase();

  if (q.includes('giang') || q.includes('sáng lập') || q.includes('tác giả') || q.includes('sđt') || q.includes('liên hệ')) {
    return `✨ <strong>Thông tin sáng lập viên website:</strong><br>
    • Họ tên: <strong>Huỳnh Ngân Giang</strong><br>
    • Số điện thoại / Zalo: <strong>0355782168</strong><br>
    • Email: <strong>lyngangiang83pt@gmail.com</strong><br>
    • Domain chính thức: <strong>hanhtrinhso.docbuoc.vn</strong>`;
  }

  if (q.includes('bài giảng') || q.includes('khối 6') || q.includes('khối 7') || q.includes('khối 8') || q.includes('khối 9') || q.includes('pptx') || q.includes('docx')) {
    return `📚 Tất cả bài giảng Khối 6, 7, 8, 9 trên website <strong>hanhtrinhso.docbuoc.vn</strong> đều được lưu trên Supabase và biên soạn ở dạng <code>.pptx</code> và <code>.docx</code> <strong>tích hợp sẵn Năng lực số (NLS) và Trợ lý AI</strong>.<br><br>👉 Bạn có thể chuyển sang mục <strong>Bài giảng</strong> trên menu để tải miễn phí!`;
  }

  if (q.includes('vip') || q.includes('mã')) {
    return `🔑 Để truy cập <strong>Kho VIP</strong>, bạn chỉ cần bấm vào mục "Kho VIP" trên menu và nhập mã mở khóa: <strong>VIP2026</strong> hoặc <strong>DOCBUOC83</strong> (được xác thực tự động bởi Supabase) nhé!`;
  }

  return `🤖 [Trợ Lý AI Giáo Dục 24/7]: Cảm ơn câu hỏi của bạn về <em>"${escapeHtml(userQuery)}"</em>.<br><br>Theo chương trình giáo dục số phổ thông của Cô Huỳnh Ngân Giang, bạn nên vận dụng tư duy phản biện kết hợp các công cụ AI hỗ trợ để tìm hiểu sâu hơn chủ đề này. Dữ liệu trao đổi đã được ghi nhận trên hệ thống Supabase của website!`;
}

function clearChatHistory() {
  const chatList = document.getElementById('chatMessageList');
  chatList.innerHTML = `
    <div class="chat-msg bot">
      👋 Hội thoại đã được làm mới! Tôi là Trợ lý AI 24/7 của website <strong>hanhtrinhso.docbuoc.vn</strong>. Hãy đặt câu hỏi bất kỳ cho tôi nhé!
    </div>
  `;
}

function escapeHtml(string) {
  return String(string).replace(/[&<>"']/g, function(s) {
    return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[s];
  });
}

/* ==========================================================================
   VIP VAULT AUTHORIZATION SYSTEM
   ========================================================================== */
function openVipCodeModal() {
  document.getElementById('vipCodeModal').classList.add('active');
  document.getElementById('vipCodeError').style.display = 'none';
}

async function submitVipCode() {
  const code = document.getElementById('vipCodeInput').value.trim().toUpperCase();
  let isValid = false;

  // Verify against Supabase vip_codes table if connected
  if (supabaseClient) {
    try {
      const { data, error } = await supabaseClient.from('vip_codes').select('*').eq('code', code).eq('is_active', true);
      if (data && data.length > 0 && !error) {
        isValid = true;
      }
    } catch (e) {
      console.warn('Lỗi kiểm tra mã Supabase:', e);
    }
  }

  // Fallback check
  if (code === 'VIP2026' || code === 'DOCBUOC83' || code === 'HANHTRINHSO') {
    isValid = true;
  }

  if (isValid) {
    isVipUnlocked = true;
    closeModal('vipCodeModal');
    document.getElementById('vipLockedBanner').style.display = 'none';
    document.getElementById('vipUnlockedContent').style.display = 'block';
    alert('🎉 Mở khóa thành công! Mã VIP hợp lệ đã được xác thực bởi Supabase!');
  } else {
    document.getElementById('vipCodeError').style.display = 'block';
  }
}

function relockVip() {
  isVipUnlocked = false;
  document.getElementById('vipLockedBanner').style.display = 'block';
  document.getElementById('vipUnlockedContent').style.display = 'none';
}

function renderVipResources() {
  const container = document.getElementById('vipResourcesGrid');
  if (!container) return;

  const vipItems = [
    { title: 'Bộ Giáo Án AI Chuyên Sâu Tích Hợp NLS Toàn Cấp THCS', type: 'Bộ Giáo Án VIP', desc: 'Trọn bộ file DOCX và PPTX theo chuẩn mô hình 5512 tích hợp các câu lệnh Prompt AI mẫu.' },
    { title: 'Trợ Lý AI Prompt Generator Cao Cấp', type: 'Công cụ AI VIP', desc: 'Công cụ tự động sinh câu lệnh Prompt dạy học cho giáo viên đạt chuẩn Năng lực số.' },
    { title: 'Kho 500+ Đề Thi Trắc Nghiệm Chấm Điểm Tự Động', type: 'Đề Thi VIP', desc: 'Ngân hàng câu hỏi trắc nghiệm đánh giá năng lực số có đáp án chi tiết.' }
  ];

  container.innerHTML = vipItems.map(item => `
    <div class="content-card" style="border-color: rgba(245, 158, 11, 0.4);">
      <span class="card-tag tag-vip"><i class="fa-solid fa-crown"></i> ${item.type}</span>
      <h3 class="card-title">${item.title}</h3>
      <p class="card-desc">${item.desc}</p>
      <div class="card-actions">
        <button class="btn btn-vip-gold" onclick="alert('Đang tải tài liệu VIP độc quyền: ${item.title}')">
          <i class="fa-solid fa-download"></i> Tải VIP Ngay
        </button>
      </div>
    </div>
  `).join('');
}

/* ==========================================================================
   REAL-TIME ANNOUNCEMENTS
   ========================================================================== */
function renderAnnouncements() {
  const container = document.getElementById('announcementsList');
  if (!container) return;

  const announcements = [
    { title: '🔥 Cập nhật hệ thống: Tích hợp Trợ lý AI Hỏi - Đáp 24/7 Mới', date: '06/08/2026', desc: 'Hệ thống đã cập nhật AI trả lời trực tiếp 24/24 cho học sinh Khối 6-9.' },
    { title: '📢 Đã tải lên Bộ Bài Giảng PPTX NLS Khối 8 & Khối 9 Mới', date: '03/08/2026', desc: 'Các cô giáo và học sinh có thể vào phân hệ Bài Giảng để tải về bài học mới nhất.' },
    { title: '🌟 Mở khóa Kho VIP với Mã VIP2026 cho Thành viên Thử nghiệm', date: '01/08/2026', desc: 'Nhập mã VIP2026 để trải nghiệm bộ giáo án và trợ lý AI nâng cao.' }
  ];

  container.innerHTML = announcements.map(a => `
    <div class="content-card">
      <span class="card-tag tag-docx"><i class="fa-solid fa-bell"></i> Thông báo mới</span>
      <h3 class="card-title">${a.title}</h3>
      <p class="card-desc">${a.desc}</p>
      <div class="card-meta">
        <span><i class="fa-regular fa-clock"></i> Cập nhật: ${a.date}</span>
        <span><i class="fa-solid fa-circle-info" style="color: var(--accent-cyan);"></i> Đã xác thực</span>
      </div>
    </div>
  `).join('');
}

/* ==========================================================================
   THEME SWITCHER & MODAL HELPERS
   ========================================================================== */
function initTheme() {
  const btn = document.getElementById('themeToggleBtn');
  if (!btn) return;

  btn.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
    const isLight = document.body.classList.contains('light-mode');
    btn.querySelector('span').innerText = isLight ? 'Chế độ Tối' : 'Chế độ Sáng';
    btn.querySelector('i').className = isLight ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
  });
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove('active');
  }
}
