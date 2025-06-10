import React from 'react';
import { FileText, Mail, Phone, MapPin, Twitter, Linkedin, Facebook, Instagram } from 'lucide-react';

export default function Footer({ onNavigate }) {
  const productLinks = [
    { id: 'resume-scorer', label: 'Resume Scorer' },
    { id: 'linkedin-review', label: 'LinkedIn Review' },
    { id: 'resume-templates', label: 'Resume Templates' },
    { id: 'features', label: 'All Features' }
  ];

  const companyLinks = [
    { id: 'about', label: 'About Us' },
    { id: 'careers', label: 'Careers' },
    { id: 'contact', label: 'Contact' },
    { id: 'pricing', label: 'Pricing' }
  ];

  const supportLinks = [
    { id: 'help-center', label: 'Help Center' },
    { id: 'support', label: 'Support' },
    { id: 'privacy-policy', label: 'Privacy Policy' },
    { id: 'terms-of-service', label: 'Terms of Service' }
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2 animate-fadeInUp">
            <div className="flex items-center space-x-2 mb-4 group">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                <FileText className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">FixMyResume</span>
            </div>
            <p className="text-gray-400 mb-6 max-w-md">
              Transform your career with AI-powered resume optimization. Join over 2 million 
              professionals who have improved their resumes and landed their dream jobs.
            </p>
            <div className="space-y-2">
              <div className="flex items-center text-gray-400 hover:text-white transition-colors group">
                <Mail className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform duration-200" />
                <span>support@fixmyresume.com</span>
              </div>
              <div className="flex items-center text-gray-400 hover:text-white transition-colors group">
                <Phone className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform duration-200" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center text-gray-400 hover:text-white transition-colors group">
                <MapPin className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform duration-200" />
                <span>San Francisco, CA</span>
              </div>
            </div>
          </div>

          {/* Product Links */}
          <div className="animate-fadeInUp stagger-1">
            <h3 className="text-lg font-semibold mb-4">Product</h3>
            <ul className="space-y-2">
              {productLinks.map((link, index) => (
                <li key={link.id}>
                  <button
                    onClick={() => onNavigate(link.id)}
                    className={`text-gray-400 hover:text-white transition-all duration-200 hover:translate-x-1 animate-fadeInLeft stagger-${index + 1}`}
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div className="animate-fadeInUp stagger-2">
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              {companyLinks.map((link, index) => (
                <li key={link.id}>
                  <button
                    onClick={() => onNavigate(link.id)}
                    className={`text-gray-400 hover:text-white transition-all duration-200 hover:translate-x-1 animate-fadeInLeft stagger-${index + 1}`}
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div className="animate-fadeInUp stagger-3">
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              {supportLinks.map((link, index) => (
                <li key={link.id}>
                  <button
                    onClick={() => onNavigate(link.id)}
                    className={`text-gray-400 hover:text-white transition-all duration-200 hover:translate-x-1 animate-fadeInLeft stagger-${index + 1}`}
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Social Media & Newsletter */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-6 mb-4 md:mb-0 animate-fadeInLeft">
              <span className="text-gray-400">Follow us:</span>
              <div className="flex space-x-4">
                {[
                  { icon: <Twitter className="h-5 w-5" />, href: "#" },
                  { icon: <Linkedin className="h-5 w-5" />, href: "#" },
                  { icon: <Facebook className="h-5 w-5" />, href: "#" },
                  { icon: <Instagram className="h-5 w-5" />, href: "#" }
                ].map((social, index) => (
                  <a 
                    key={index}
                    href={social.href} 
                    className={`text-gray-400 hover:text-white transition-all duration-200 hover:scale-110 animate-scaleIn stagger-${index + 1}`}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>

            <div className="flex items-center space-x-4 animate-fadeInRight">
              <span className="text-gray-400">Stay updated:</span>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="bg-gray-800 text-white px-4 py-2 rounded-l-lg border border-gray-700 focus:outline-none focus:border-blue-600 transition-colors"
                />
                <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-r-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 hover:scale-105">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 animate-fadeInUp">
          <p>&copy; 2025 FixMyResume. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
} 