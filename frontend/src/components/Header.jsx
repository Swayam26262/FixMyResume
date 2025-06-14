import React, { useState } from 'react';
import { Menu, X, FileText, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Header({ currentPage, onNavigate, isLoggedIn, onLogout }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProductDropdownOpen, setIsProductDropdownOpen] = useState(false);
  const [isCompanyDropdownOpen, setIsCompanyDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const productItems = [
    { id: 'dashboard', label: 'Resume Analysis' },
    { id: 'linkedin-review', label: 'LinkedIn Review' },
    { id: 'resume-templates', label: 'Resume Templates' }
  ];

  const companyItems = [
    { id: 'about', label: 'About' },
    { id: 'careers', label: 'Careers' },
    { id: 'contact', label: 'Contact' }
  ];

  const navItems = isLoggedIn 
    ? [
        { id: 'dashboard', label: 'Dashboard' },
        { id: 'features', label: 'Features' },
        { id: 'pricing', label: 'Pricing' }
      ]
    : [
        { id: 'home', label: 'Home' },
        { id: 'features', label: 'Features' },
        { id: 'pricing', label: 'Pricing' }
      ];

  const handleNavigation = (page) => {
    onNavigate(page);
    navigate(`/${page}`);
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-white/95 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50 animate-slideInDown">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div 
            className="flex items-center space-x-2 cursor-pointer group"
            onClick={() => handleNavigation(isLoggedIn ? 'dashboard' : 'home')}
          >
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center transform group-hover:scale-110 transition-transform duration-200">
              <FileText className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              FixMyResume
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {/* Product Dropdown */}
            <div className="relative">
              <button
                onMouseEnter={() => setIsProductDropdownOpen(true)}
                onMouseLeave={() => setIsProductDropdownOpen(false)}
                className="flex items-center text-gray-700 hover:text-blue-600 font-medium transition-colors group"
              >
                Product
                <ChevronDown className={`ml-1 h-4 w-4 transition-transform duration-200 ${isProductDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              {isProductDropdownOpen && (
                <div 
                  className="absolute top-full left-0 mt-1 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 animate-scaleIn"
                  onMouseEnter={() => setIsProductDropdownOpen(true)}
                  onMouseLeave={() => setIsProductDropdownOpen(false)}
                >
                  {productItems.map((item, index) => (
                    <button
                      key={item.id}
                      onClick={() => handleNavigation(item.id)}
                      className={`block w-full text-left px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors animate-fadeInUp stagger-${index + 1}`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {navItems.map((item, index) => (
              <button
                key={item.id}
                onClick={() => handleNavigation(item.id)}
                className={`font-medium transition-all duration-200 hover:scale-105 ${
                  currentPage === item.id
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-700 hover:text-blue-600'
                }`}
              >
                {item.label}
              </button>
            ))}

            {/* Company Dropdown */}
            <div className="relative">
              <button
                onMouseEnter={() => setIsCompanyDropdownOpen(true)}
                onMouseLeave={() => setIsCompanyDropdownOpen(false)}
                className="flex items-center text-gray-700 hover:text-blue-600 font-medium transition-colors"
              >
                Company
                <ChevronDown className={`ml-1 h-4 w-4 transition-transform duration-200 ${isCompanyDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              {isCompanyDropdownOpen && (
                <div 
                  className="absolute top-full left-0 mt-1 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 animate-scaleIn"
                  onMouseEnter={() => setIsCompanyDropdownOpen(true)}
                  onMouseLeave={() => setIsCompanyDropdownOpen(false)}
                >
                  {companyItems.map((item, index) => (
                    <button
                      key={item.id}
                      onClick={() => handleNavigation(item.id)}
                      className={`block w-full text-left px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors animate-fadeInUp stagger-${index + 1}`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
            
            {isLoggedIn ? (
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => {
                    onLogout();
                    navigate('/');
                  }}
                  className="text-gray-700 hover:text-red-600 font-medium transition-colors hover:scale-105"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => handleNavigation('login')}
                  className="text-gray-700 hover:text-blue-600 font-medium transition-all duration-200 hover:scale-105"
                >
                  Sign In
                </button>
                <button
                  onClick={() => handleNavigation('signup')}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200 hover:scale-105 hover:shadow-lg"
                >
                  Get Started
                </button>
              </div>
            )}
          </nav>

          {/* Mobile menu button */}
          <button
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? 
              <X className="h-6 w-6 transform rotate-180 transition-transform duration-200" /> : 
              <Menu className="h-6 w-6 transition-transform duration-200" />
            }
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t border-gray-200 animate-fadeInUp">
            <div className="flex flex-col space-y-3">
              {navItems.map((item, index) => (
                <button
                  key={item.id}
                  onClick={() => handleNavigation(item.id)}
                  className={`text-left px-4 py-2 font-medium transition-all duration-200 rounded-lg animate-fadeInLeft stagger-${index + 1} ${
                    currentPage === item.id
                      ? 'text-blue-600 bg-blue-50'
                      : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                  }`}
                >
                  {item.label}
                </button>
              ))}
              
              {isLoggedIn ? (
                <button
                  onClick={() => {
                    onLogout();
                    navigate('/');
                  }}
                  className="text-left px-4 py-2 text-red-600 hover:bg-red-50 transition-colors font-medium rounded-lg animate-fadeInLeft stagger-4"
                >
                  Logout
                </button>
              ) : (
                <>
                  <button
                    onClick={() => handleNavigation('login')}
                    className="text-left px-4 py-2 text-gray-700 hover:text-blue-600 transition-colors font-medium rounded-lg animate-fadeInLeft stagger-4"
                  >
                    Sign In
                  </button>
                  <button
                    onClick={() => handleNavigation('signup')}
                    className="mx-4 mt-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200 animate-fadeInLeft stagger-5"
                  >
                    Get Started
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
} 