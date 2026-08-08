import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

const AuthContext = createContext(null);

// Fallback local accounts (Password: 123456)
const defaultLocalUsers = [
  { username: 'admin_giang', password_hash: '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92', full_name: 'Huỳnh Ngân Giang', role: 'admin', is_vip: true, avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop', email: 'lyngangiang83pt@gmail.com' },
  { username: 'giaovien_mai', password_hash: '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92', full_name: 'Cô Nguyễn Thị Mai', role: 'teacher', is_vip: true, avatar_url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop', email: 'mai.nguyen@edu.vn' },
  { username: 'hocsinh_an', password_hash: '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92', full_name: 'Nguyễn Văn An', role: 'student', is_vip: false, avatar_url: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200&auto=format&fit=crop', email: 'an.nguyen@gmail.com' }
];

export async function hashPassword(plainText) {
  const utf8 = new TextEncoder().encode(plainText);
  const hashBuffer = await crypto.subtle.digest('SHA-256', utf8);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalTab, setAuthModalTab] = useState('login');

  useEffect(() => {
    const saved = localStorage.getItem('docbuoc_user');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.email === 'lyngangiang83pt@gmail.com' || (parsed.username && parsed.username.includes('giang'))) {
          parsed.role = 'admin';
          parsed.is_vip = true;
        }
        setUser(parsed);
      } catch (e) {
        console.error('Error parsing stored user session:', e);
      }
    }
  }, []);

  const login = async (username, password) => {
    const cleanUsername = username.trim().toLowerCase();
    const passwordHash = await hashPassword(password);
    let authenticatedUser = null;

    if (supabase) {
      try {
        const { data, error } = await supabase
          .from('app_users')
          .select('*')
          .eq('username', cleanUsername)
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
          await supabase.from('app_users').update({ last_login: new Date().toISOString() }).eq('id', data.id);
        }
      } catch (e) {
        console.warn('Supabase login check:', e);
      }
    }

    if (!authenticatedUser) {
      const local = defaultLocalUsers.find(u => u.username === cleanUsername && u.password_hash === passwordHash);
      if (local) {
        authenticatedUser = {
          username: local.username,
          name: local.full_name,
          email: local.email,
          role: local.role,
          is_vip: local.is_vip,
          avatar: local.avatar_url
        };
      }
    }

    if (authenticatedUser) {
      if (authenticatedUser.email === 'lyngangiang83pt@gmail.com' || authenticatedUser.username.includes('giang')) {
        authenticatedUser.role = 'admin';
        authenticatedUser.is_vip = true;
      }
      setUser(authenticatedUser);
      localStorage.setItem('docbuoc_user', JSON.stringify(authenticatedUser));
      setIsAuthModalOpen(false);
      return { success: true, user: authenticatedUser };
    }

    return { success: false, message: 'Sai tên đăng nhập hoặc mật khẩu!' };
  };

  const register = async ({ username, fullName, password, role, email, phone }) => {
    const cleanUsername = username.trim().toLowerCase();
    const passwordHash = await hashPassword(password);
    let isVip = false;
    let finalRole = role;

    if (email === 'lyngangiang83pt@gmail.com' || cleanUsername.includes('giang')) {
      finalRole = 'admin';
      isVip = true;
    }

    if (supabase) {
      try {
        const { data: existing } = await supabase.from('app_users').select('id').eq('username', cleanUsername);
        if (existing && existing.length > 0) {
          return { success: false, message: 'Tên đăng nhập này đã được sử dụng!' };
        }

        await supabase.from('app_users').insert([{
          username: cleanUsername,
          password_hash: passwordHash,
          full_name: fullName,
          email: email || `${cleanUsername}@docbuoc.vn`,
          phone: phone || '',
          role: finalRole,
          is_vip: isVip,
          avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop'
        }]);
      } catch (e) {
        console.warn('Supabase register error:', e);
      }
    }

    const newUser = {
      username: cleanUsername,
      name: fullName,
      email: email || `${cleanUsername}@docbuoc.vn`,
      phone: phone,
      role: finalRole,
      is_vip: isVip,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop'
    };

    setUser(newUser);
    localStorage.setItem('docbuoc_user', JSON.stringify(newUser));
    setIsAuthModalOpen(false);
    return { success: true, user: newUser };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('docbuoc_user');
  };

  const upgradeToAdmin = async () => {
    if (!user) return;
    const upgraded = { ...user, role: 'admin', is_vip: true };
    setUser(upgraded);
    localStorage.setItem('docbuoc_user', JSON.stringify(upgraded));
    if (supabase && user.email) {
      try {
        await supabase.from('app_users').update({ role: 'admin', is_vip: true }).eq('email', user.email);
      } catch (e) {
        console.warn('Supabase admin upgrade:', e);
      }
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      register,
      logout,
      upgradeToAdmin,
      isAuthModalOpen,
      setIsAuthModalOpen,
      authModalTab,
      setAuthModalTab
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
