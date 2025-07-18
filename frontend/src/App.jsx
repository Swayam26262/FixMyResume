import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './components/HomePage';
import Footer from './components/Footer';
import FeaturesPage from './components/FeaturesPage';
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';
import Dashboard from './components/Dashboard';
import LinkedInReviewPage from './components/LinkedInReviewPage';
import ResumeTemplatesPage from './components/ResumeTemplatesPage';
import AboutPage from './components/AboutPage';
import ContactPage from './components/ContactPage';
import PricingPage from './components/PricingPage';
import ProtectedRoute from './components/ProtectedRoute';
import authService from './services/authService';
import HelpCenterPage from './components/HelpCenterPage';
import PrivacyPolicyPage from './components/PrivacyPolicyPage';
import TermsOfServicePage from './components/TermsOfServicePage';
import ScrollToTop from './components/ScrollToTop';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const user = authService.getCurrentUser();
    setIsLoggedIn(!!user);
  }, []);

  const handleNavigate = (page) => {
    setCurrentPage(page);
    const path = page.startsWith('/') ? page : `/${page}`;
    navigate(path);
  };

  const handleLogout = () => {
    authService.logout();
    setIsLoggedIn(false);
    setCurrentPage('home');
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <ScrollToTop />
      <Header 
        currentPage={currentPage}
        onNavigate={handleNavigate}
        isLoggedIn={isLoggedIn}
        onLogout={handleLogout}
      />
      <Routes>
          <Route path="/" element={<HomePage onNavigate={handleNavigate} />} />
          <Route path="/features" element={<FeaturesPage onNavigate={handleNavigate} />} />
          <Route path="/login" element={<LoginPage onNavigate={handleNavigate} onLogin={() => setIsLoggedIn(true)} />} />
          <Route path="/signup" element={<SignupPage onNavigate={handleNavigate} />} />
          <Route path="/pricing" element={<PricingPage onNavigate={handleNavigate} />} />
          <Route path="/about" element={<AboutPage onNavigate={handleNavigate} />} />
          <Route path="/contact" element={<ContactPage onNavigate={handleNavigate} />} />
          <Route path="/help-center" element={<HelpCenterPage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
          <Route path="/terms-of-service" element={<TermsOfServicePage />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute onNavigate={handleNavigate}>
                <Dashboard onNavigate={handleNavigate} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/linkedin-review"
            element={
              <ProtectedRoute onNavigate={handleNavigate}>
                <LinkedInReviewPage onNavigate={handleNavigate} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/resume-templates"
            element={
              <ProtectedRoute onNavigate={handleNavigate}>
                <ResumeTemplatesPage onNavigate={handleNavigate} />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <Footer onNavigate={handleNavigate} />
      </div>
  );
}

export default App; 