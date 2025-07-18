import React, { useState } from 'react';
import { useAuthStore } from './store/authStore';
import Header from './components/Header';
import HomePage from './components/HomePage';
import JobBrowser from './components/JobBrowser';
import PostJobForm from './components/PostJobForm';
import FreelancerDashboard from './components/Dashboard/FreelancerDashboard';
import ClientDashboard from './components/Dashboard/ClientDashboard';
import LoginForm from './components/Auth/LoginForm';
import RegisterForm from './components/Auth/RegisterForm';

type Page = 'home' | 'browse' | 'post-job' | 'dashboard' | 'login' | 'register';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  
  const { isAuthenticated, user } = useAuthStore();

  const handlePageChange = (page: Page) => {
    setCurrentPage(page);
    setShowMobileMenu(false);
  };

  const handleGetStarted = () => {
    if (isAuthenticated) {
      setCurrentPage('browse');
    } else {
      setCurrentPage('register');
    }
  };

  const handleJobPosted = () => {
    setCurrentPage('dashboard');
  };

  const handleAuthSuccess = () => {
    setCurrentPage('dashboard');
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onGetStarted={handleGetStarted} />;
      
      case 'browse':
        return <JobBrowser />;
      
      case 'post-job':
        if (!isAuthenticated || user?.role !== 'client') {
          return <div className="text-center py-8">Please log in as a client to post jobs.</div>;
        }
        return <PostJobForm onJobPosted={handleJobPosted} />;
      
      case 'dashboard':
        if (!isAuthenticated) {
          return <div className="text-center py-8">Please log in to view your dashboard.</div>;
        }
        return user?.role === 'freelancer' ? (
          <FreelancerDashboard />
        ) : (
          <ClientDashboard onPostJob={() => setCurrentPage('post-job')} />
        );
      
      case 'login':
        return (
          <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4">
            <LoginForm onSwitchToRegister={() => setCurrentPage('register')} />
          </div>
        );
      
      case 'register':
        return (
          <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4">
            <RegisterForm onSwitchToLogin={() => setCurrentPage('login')} />
          </div>
        );
      
      default:
        return <HomePage onGetStarted={handleGetStarted} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {currentPage !== 'home' && currentPage !== 'login' && currentPage !== 'register' && (
        <Header
          onMenuClick={() => setShowMobileMenu(!showMobileMenu)}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      )}
      
      <main className={currentPage === 'home' ? '' : 'pt-4'}>
        {renderPage()}
      </main>
    </div>
  );
}

export default App;