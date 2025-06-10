import React from 'react';
import { ArrowRight, Star, Download, CheckCircle, BarChart3, FileText, Users, Award, Zap, TrendingUp } from 'lucide-react';
import authService from '../services/authService';

export default function HomePage({ onNavigate }) {
  const handleActionClick = () => {
    const user = authService.getCurrentUser();
    if (user) {
      onNavigate('dashboard');
    } else {
      onNavigate('signup');
    }
  };

  return (
    <div className="min-h-screen bg-white overflow-hidden">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 via-white to-purple-50 py-20">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-purple-600/5"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="animate-fadeInLeft">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 text-sm font-medium mb-6 animate-float">
                <Star className="h-4 w-4 mr-2" />
                AI-Powered Resume Analysis
              </div>
              
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6 animate-fadeInUp">
                Transform Your{' '}
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Resume
                </span>{' '}
                Into a Job-Winning Tool
              </h1>
              
              <p className="text-xl text-gray-600 mb-8 leading-relaxed animate-fadeInUp stagger-1">
                Get instant, AI-powered feedback on your resume and LinkedIn profile. 
                Designed by top recruiters to help you land 5x more interviews and opportunities.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-8 animate-fadeInUp stagger-2">
                <button
                  onClick={handleActionClick}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 flex items-center justify-center group hover-lift"
                >
                  {authService.getCurrentUser() ? 'Go to Dashboard' : 'Score My Resume Free'}
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
                </button>
                <button className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-50 hover:border-gray-400 transition-all duration-300 flex items-center justify-center group hover-lift">
                  <Download className="mr-2 h-5 w-5 group-hover:animate-bounce" />
                  See Sample Report
                </button>
              </div>
              
              {/* Trust Indicators */}
              <div className="flex items-center space-x-6 animate-fadeInUp stagger-3">
                <div className="flex items-center space-x-2">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className={`w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full border-2 border-white animate-scaleIn stagger-${i}`}></div>
                    ))}
                  </div>
                  <span className="text-gray-600 font-medium">2M+ users trust us</span>
                </div>
                <div className="flex items-center space-x-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className={`h-5 w-5 text-yellow-400 fill-current animate-scaleIn stagger-${i}`} />
                  ))}
                  <span className="text-gray-600 font-medium ml-2">4.9/5 rating</span>
                </div>
              </div>
            </div>
            
            {/* Right Content - Score Card */}
            <div className="relative animate-fadeInRight">
              <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-2xl p-8 border border-gray-200 hover-lift">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">Resume Score</h3>
                  <span className="bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium animate-pulse">
                    Excellent
                  </span>
                </div>
                
                {/* Circular Progress */}
                <div className="flex justify-center mb-6">
                  <div className="relative w-32 h-32">
                    <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 120 120">
                      <circle
                        cx="60"
                        cy="60"
                        r="50"
                        stroke="#e5e7eb"
                        strokeWidth="8"
                        fill="none"
                      />
                      <circle
                        cx="60"
                        cy="60"
                        r="50"
                        stroke="url(#gradient)"
                        strokeWidth="8"
                        fill="none"
                        strokeDasharray={`${92 * 3.14159} ${100 * 3.14159}`}
                        strokeLinecap="round"
                        className="animate-pulse"
                      />
                      <defs>
                        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#10b981" />
                          <stop offset="100%" stopColor="#059669" />
                        </linearGradient>
                      </defs>
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center animate-scaleIn">
                        <div className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">92</div>
                        <div className="text-sm text-gray-500">out of 100</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Score Breakdown */}
                <div className="space-y-4">
                  {[
                    { label: 'Impact', score: 95, color: 'from-blue-500 to-blue-600' },
                    { label: 'Brevity', score: 78, color: 'from-yellow-500 to-yellow-600' },
                    { label: 'Style', score: 100, color: 'from-green-500 to-green-600' }
                  ].map((item, index) => (
                    <div key={item.label} className={`animate-fadeInUp stagger-${index + 1}`}>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-700">{item.label}</span>
                        <div className="flex items-center space-x-2">
                          <div className="w-20 h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div 
                              className={`h-2 bg-gradient-to-r ${item.color} rounded-full transition-all duration-1000 ease-out`}
                              style={{ width: `${item.score}%` }}
                            ></div>
                          </div>
                          <span className="text-sm font-medium text-gray-900">{item.score}/100</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Achievements */}
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="space-y-2">
                    {[
                      'Strong action verbs',
                      'Quantified achievements'
                    ].map((achievement, index) => (
                      <div key={achievement} className={`flex items-center text-green-600 animate-fadeInLeft stagger-${index + 1}`}>
                        <CheckCircle className="h-4 w-4 mr-2" />
                        <span className="text-sm">{achievement}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fadeInUp">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 text-sm font-medium mb-4">
              Features
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Everything you need to succeed
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our AI-powered platform provides comprehensive analysis and actionable insights 
              to optimize your resume and LinkedIn profile.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <BarChart3 className="h-8 w-8 text-blue-600" />,
                title: "Resume Scoring",
                description: "Get an instant score based on recruiter feedback and industry standards",
                gradient: "from-blue-500 to-blue-600"
              },
              {
                icon: <FileText className="h-8 w-8 text-purple-600" />,
                title: "ATS Optimization",
                description: "Ensure your resume passes Applicant Tracking Systems with our analysis",
                gradient: "from-purple-500 to-purple-600"
              },
              {
                icon: <Users className="h-8 w-8 text-green-600" />,
                title: "LinkedIn Review",
                description: "Optimize your LinkedIn profile to attract more recruiters and opportunities",
                gradient: "from-green-500 to-green-600"
              },
              {
                icon: <Award className="h-8 w-8 text-yellow-600" />,
                title: "Industry Insights",
                description: "Get tailored recommendations based on your target industry and role",
                gradient: "from-yellow-500 to-yellow-600"
              },
              {
                icon: <Zap className="h-8 w-8 text-pink-600" />,
                title: "Real-time Feedback",
                description: "Receive instant suggestions as you make changes to your resume",
                gradient: "from-pink-500 to-pink-600"
              },
              {
                icon: <TrendingUp className="h-8 w-8 text-indigo-600" />,
                title: "Expert Templates",
                description: "Access professionally designed templates that recruiters love",
                gradient: "from-indigo-500 to-indigo-600"
              }
            ].map((feature, index) => (
              <div key={index} className={`text-center p-6 rounded-xl hover:bg-gray-50 transition-all duration-300 hover-lift animate-fadeInUp stagger-${index + 1} group`}>
                <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${feature.gradient} rounded-lg mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { number: "2M+", label: "Resumes Analyzed", icon: <FileText className="h-8 w-8 mx-auto mb-2" /> },
              { number: "89%", label: "Interview Rate Increase", icon: <TrendingUp className="h-8 w-8 mx-auto mb-2" /> },
              { number: "4.9/5", label: "User Rating", icon: <Star className="h-8 w-8 mx-auto mb-2" /> },
              { number: "50+", label: "Industries Covered", icon: <Award className="h-8 w-8 mx-auto mb-2" /> }
            ].map((stat, index) => (
              <div key={index} className={`animate-fadeInUp stagger-${index + 1} hover-scale`}>
                <div className="text-white/80 mb-2">{stat.icon}</div>
                <div className="text-4xl font-bold mb-2">{stat.number}</div>
                <div className="text-blue-100">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center animate-fadeInUp">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Ready to land your dream job?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Join thousands of job seekers who have improved their resumes and landed their dream jobs.
          </p>
          <button
            onClick={handleActionClick}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
          >
            {authService.getCurrentUser() ? 'Go to Dashboard' : 'Get Started Free'}
          </button>
        </div>
      </section>
    </div>
  );
}