import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
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

import { useNavigate } from 'react-router-dom';

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
    // If page starts with '/', treat as path, else build path
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
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard onNavigate={handleNavigate} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/linkedin-review"
            element={
              <ProtectedRoute>
                <LinkedInReviewPage onNavigate={handleNavigate} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/resume-templates"
            element={
              <ProtectedRoute>
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