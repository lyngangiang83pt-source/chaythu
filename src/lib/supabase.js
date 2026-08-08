import { createClient } from '@supabase/supabase-js';

// Pre-configured Supabase Project Credentials
export const SUPABASE_PROJECT_URL = "https://qmwprqrupefjlxdlitoh.supabase.co";
export const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFtd3BycXJ1cGVmamx4ZGxpdG9oIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODYwOTM0NjAsImV4cCI6MjEwMTY2OTQ2MH0.EwCpg3QfIKbTnMFZWKOKS1phWLyy6o37S0s2OEP3xpc";

// Get active config from storage or default
export function getActiveSupabaseCredentials() {
  const url = localStorage.getItem('supabase_url') || SUPABASE_PROJECT_URL;
  const key = localStorage.getItem('supabase_key') || SUPABASE_ANON_KEY;
  return { url, key };
}

// Create Supabase Client instance
export function createSupabaseClientInstance() {
  try {
    const { url, key } = getActiveSupabaseCredentials();
    if (url && key) {
      return createClient(url, key);
    }
  } catch (err) {
    console.warn('Lỗi khởi tạo Supabase Client:', err);
  }
  return null;
}

export const supabase = createSupabaseClientInstance();
