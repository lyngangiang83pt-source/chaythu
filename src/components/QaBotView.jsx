import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabase';

export default function QaBotView() {
  const { user } = useAuth();
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: '👋 Xin chào! Tôi là <strong>Trợ lý AI Hỏi - Đáp 24/7</strong> của website <em>hanhtrinhso.docbuoc.vn</em> (Sáng lập: Cô Huỳnh Ngân Giang).<br><br>Bạn có câu hỏi gì về bài giảng Khối 6, 7, 8, 9, kỹ năng Năng lực số (NLS) hoặc bài tập cần giải đáp không? Hãy đặt câu hỏi bên dưới nhé!'
    }
  ]);
  const [inputText, setInputText] = useState('');

  const generateAiReply = (query) => {
    const q = query.toLowerCase();
    if (q.includes('giang') || q.includes('sáng lập') || q.includes('tác giả') || q.includes('sđt') || q.includes('liên hệ')) {
      return `✨ <strong>Thông tin sáng lập viên website:</strong><br>• Họ tên: <strong>Huỳnh Ngân Giang</strong><br>• Số điện thoại / Zalo: <strong>0355782168</strong><br>• Email: <strong>lyngangiang83pt@gmail.com</strong><br>• Domain chính thức: <strong>hanhtrinhso.docbuoc.vn</strong>`;
    }
    if (q.includes('bài giảng') || q.includes('khối 6') || q.includes('khối 7') || q.includes('khối 8') || q.includes('khối 9') || q.includes('pptx') || q.includes('docx')) {
      return `📚 Tất cả bài giảng Khối 6, 7, 8, 9 trên website <strong>hanhtrinhso.docbuoc.vn</strong> đều được lưu trên Supabase và biên soạn ở dạng <code>.pptx</code> và <code>.docx</code> <strong>tích hợp sẵn Năng lực số (NLS) và Trợ lý AI</strong>.<br><br>👉 Bạn có thể chuyển sang mục <strong>Bài giảng</strong> trên menu để tải miễn phí!`;
    }
    if (q.includes('vip') || q.includes('mã')) {
      return `🔑 Để truy cập <strong>Kho VIP</strong>, bạn chỉ cần bấm vào mục "Kho VIP" trên menu và nhập mã mở khóa: <strong>VIP2026</strong> hoặc <strong>DOCBUOC83</strong> (được xác thực tự động bởi Supabase) nhé!`;
    }
    return `🤖 [Trợ Lý AI Giáo Dục 24/7]: Cảm ơn câu hỏi của bạn về <em>"${query}"</em>.<br><br>Theo chương trình giáo dục số phổ thông của Cô Huỳnh Ngân Giang, bạn nên vận dụng tư duy phản biện kết hợp các công cụ AI hỗ trợ để tìm hiểu sâu hơn chủ đề này. Dữ liệu trao đổi đã được ghi nhận trên hệ thống Supabase của website!`;
  };

  const handleSend = async () => {
    const text = inputText.trim();
    if (!text) return;

    const newMessages = [...messages, { sender: 'user', text: text }];
    setMessages(newMessages);
    setInputText('');

    setTimeout(async () => {
      const botReply = generateAiReply(text);
      setMessages(prev => [...prev, { sender: 'bot', text: botReply }]);

      // Log to Supabase chat_logs
      if (supabase) {
        try {
          await supabase.from('chat_logs').insert([{
            user_name: user ? user.name : 'Khách truy cập',
            user_query: text,
            ai_response: botReply.replace(/<[^>]*>?/gm, '')
          }]);
        } catch (e) {
          console.warn('Lỗi ghi chat log Supabase:', e);
        }
      }
    }, 500);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  const clearHistory = () => {
    setMessages([
      {
        sender: 'bot',
        text: '👋 Hội thoại đã được làm mới! Tôi là Trợ lý AI 24/7 của website <strong>hanhtrinhso.docbuoc.vn</strong>. Hãy đặt câu hỏi bất kỳ cho tôi nhé!'
      }
    ]);
  };

  return (
    <section className="view-section active">
      <div className="section-header">
        <div>
          <h2 className="section-title"><i className="fa-solid fa-comments"></i> Trợ Lý AI Hỏi - Đáp 24/24</h2>
          <p className="section-subtitle">Giải đáp thắc mắc bài học, tư vấn phương pháp học tập và tự động lưu nhật ký vào Supabase</p>
        </div>
      </div>

      <div className="chatbot-wrapper">
        <div className="chatbot-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div className="logo-icon" style={{ width: '36px', height: '36px', fontSize: '1.1rem' }}>
              <i className="fa-solid fa-robot"></i>
            </div>
            <div>
              <h4 style={{ color: 'var(--text-main)' }}>AI Giáo Dục - hanhtrinhso.docbuoc.vn</h4>
              <span className="chatbot-status"><span className="status-dot"></span> Đang trực tuyến 24/7 (Đồng bộ Supabase)</span>
            </div>
          </div>
          <button className="btn btn-google" style={{ padding: '4px 10px', fontSize: '0.8rem' }} onClick={clearHistory}>
            <i className="fa-solid fa-rotate-right"></i> Xóa hội thoại
          </button>
        </div>

        <div className="chatbot-messages">
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`chat-msg ${m.sender}`}
              dangerouslySetInnerHTML={{ __html: m.text }}
            />
          ))}
        </div>

        <div className="chatbot-input-area">
          <input
            type="text"
            placeholder="Nhập câu hỏi học tập của bạn tại đây..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <button className="btn btn-primary" onClick={handleSend}>
            <i className="fa-solid fa-paper-plane"></i> Gửi
          </button>
        </div>
      </div>
    </section>
  );
}
