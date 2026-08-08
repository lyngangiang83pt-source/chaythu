import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import HomeView from './components/HomeView';
import NewsView from './components/NewsView';
import GamesView from './components/GamesView';
import MaterialsView from './components/MaterialsView';
import LecturesView from './components/LecturesView';
import AssignmentsView from './components/AssignmentsView';
import SubmissionsView from './components/SubmissionsView';
import QaBotView from './components/QaBotView';
import VipVaultView from './components/VipVaultView';
import AnnouncementsView from './components/AnnouncementsView';

import AuthModal from './components/modals/AuthModal';
import SupabaseModal from './components/modals/SupabaseModal';
import SubmissionModal from './components/modals/SubmissionModal';

export default function App() {
  const [activeView, setActiveView] = useState('home');
  const [selectedGrade, setSelectedGrade] = useState('all');
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isSupabaseModalOpen, setIsSupabaseModalOpen] = useState(false);
  const [submissionModal, setSubmissionModal] = useState({ isOpen: false, mode: 'drive' });

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.remove('light-mode');
    } else {
      document.body.classList.add('light-mode');
    }
  }, [isDarkMode]);

  const handleSelectGrade = (grade) => {
    setSelectedGrade(grade);
    setActiveView('lectures');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleToggleTheme = () => {
    setIsDarkMode(prev => !prev);
  };

  const openPadlet = () => setSubmissionModal({ isOpen: true, mode: 'padlet' });
  const openDrive = () => setSubmissionModal({ isOpen: true, mode: 'drive' });
  const openZalo = () => setSubmissionModal({ isOpen: true, mode: 'zalo' });

  return (
    <>
      <Header
        activeView={activeView}
        setActiveView={setActiveView}
        onOpenSupabaseModal={() => setIsSupabaseModalOpen(true)}
        onToggleTheme={handleToggleTheme}
        isDarkMode={isDarkMode}
      />

      <main className="main-wrapper">
        {activeView === 'home' && (
          <HomeView setActiveView={setActiveView} onSelectGrade={handleSelectGrade} />
        )}
        {activeView === 'news' && <NewsView />}
        {activeView === 'games' && <GamesView />}
        {activeView === 'materials' && <MaterialsView />}
        {activeView === 'lectures' && <LecturesView initialGrade={selectedGrade} />}
        {activeView === 'assignments' && <AssignmentsView setActiveView={setActiveView} />}
        {activeView === 'submissions' && (
          <SubmissionsView
            onOpenPadlet={openPadlet}
            onOpenDrive={openDrive}
            onOpenZalo={openZalo}
          />
        )}
        {activeView === 'qa' && <QaBotView />}
        {activeView === 'vip' && <VipVaultView />}
        {activeView === 'announcements' && <AnnouncementsView />}
      </main>

      <Footer setActiveView={setActiveView} onOpenSupabaseModal={() => setIsSupabaseModalOpen(true)} />

      {/* Floating Chat Trigger */}
      <button
        className="floating-chat-trigger"
        onClick={() => { setActiveView('qa'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
        title="Trợ lý AI Hỏi - Đáp 24/7"
      >
        <i className="fa-solid fa-robot"></i>
      </button>

      {/* Modals */}
      <AuthModal />
      <SupabaseModal
        isOpen={isSupabaseModalOpen}
        onClose={() => setIsSupabaseModalOpen(false)}
      />
      <SubmissionModal
        isOpen={submissionModal.isOpen}
        mode={submissionModal.mode}
        onClose={() => setSubmissionModal({ isOpen: false, mode: 'drive' })}
      />
    </>
  );
}
