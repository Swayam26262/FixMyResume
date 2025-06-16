import React from 'react';
import { Link } from 'react-router-dom';
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

  const features = [
    {
      icon: Award,
      title: "AI Resume Scoring",
      description: "Get instant feedback with detailed scoring across impact, brevity, style, and more.",
      color: "from-blue-500 to-indigo-500",
    },
    {
      icon: BarChart3,
      title: "LinkedIn Optimization",
      description: "Optimize your LinkedIn profile to attract more recruiters and opportunities.",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: TrendingUp,
      title: "Industry Insights",
      description: "Get tailored recommendations based on your industry and target roles.",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: Users,
      title: "Recruiter Insights",
      description: "Built by top recruiters from Google, Microsoft, and other leading companies.",
      color: "from-orange-500 to-red-500",
    },
    {
      icon: Zap,
      title: "Instant Analysis",
      description: "Get results in seconds, not days. Upload and receive feedback immediately.",
      color: "from-teal-500 to-cyan-500",
    },
    {
      icon: CheckCircle,
      title: "Actionable Tips",
      description: "Receive specific, actionable recommendations to improve your resume score.",
      color: "from-violet-500 to-purple-500",
    },
  ];

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
            <div className="relative animate-fade-in-right">
              <div className="relative bg-white rounded-2xl shadow-2xl p-8 transform rotate-1 hover:rotate-0 transition-all duration-500 hover:scale-105 group">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">Resume Score</h3>
                    <span className="inline-block bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold animate-pulse-subtle">Excellent</span>
                  </div>

                  <div className="relative w-32 h-32 mx-auto">
                    <div className="absolute inset-0 rounded-full bg-conic-gradient from-green-400 via-green-100 to-green-400 animate-spin-slow"></div>
                    <div className="absolute inset-2 rounded-full bg-white"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-green-600 animate-count-up">92</div>
                        <div className="text-sm text-gray-500">out of 100</div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Impact</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-20 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div className="w-4/5 h-2 bg-blue-500 rounded-full animate-progress-fill"></div>
                        </div>
                        <span className="text-sm text-gray-600">95/100</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Brevity</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-20 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div className="w-3/5 h-2 bg-yellow-500 rounded-full animate-progress-fill animation-delay-200"></div>
                        </div>
                        <span className="text-sm text-gray-600">78/100</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Style</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-20 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div className="w-full h-2 bg-green-500 rounded-full animate-progress-fill animation-delay-400"></div>
                        </div>
                        <span className="text-sm text-gray-600">100/100</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t">
                    <div className="flex items-center space-x-2 text-green-600 animate-fade-in-up animation-delay-600">
                      <CheckCircle className="w-4 h-4" />
                      <span className="text-sm">Strong action verbs</span>
                    </div>
                    <div className="flex items-center space-x-2 text-green-600 mt-2 animate-fade-in-up animation-delay-800">
                      <CheckCircle className="w-4 h-4" />
                      <span className="text-sm">Quantified achievements</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center space-y-4 mb-16 animate-fade-in-up">
            <div className="inline-block bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold">Features</div>
            <h2 className="text-4xl font-bold">Everything you need to succeed</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our AI-powered platform provides comprehensive analysis and actionable insights to optimize your resume
              and LinkedIn profile.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="p-6 hover:shadow-lg transition-all duration-500 border-0 shadow-md group animate-fade-in-up hover:scale-105 rounded-xl"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="p-0 space-y-4">
                  <div
                    className={`w-12 h-12 bg-gradient-to-r ${feature.color} rounded-lg flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6`}
                  >
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold group-hover:text-blue-600 transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/90 to-indigo-600/90"></div>
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full animate-float"></div>
          <div className="absolute top-32 right-20 w-16 h-16 bg-white/10 rounded-full animate-float animation-delay-1000"></div>
          <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-white/10 rounded-full animate-float animation-delay-2000"></div>
        </div>
        <div className="container mx-auto max-w-4xl text-center relative z-10">
          <div className="space-y-8 text-white animate-fade-in-up">
            <h2 className="text-4xl lg:text-5xl font-bold">Ready to land your dream job?</h2>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              Join over 2 million professionals who have improved their resumes and landed better opportunities with
              FixMyResume.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/signup">
                <button
                  className="bg-white text-blue-600 hover:bg-gray-100 transition-all duration-300 hover:scale-105 hover:shadow-xl group px-8 py-4 rounded-lg font-semibold text-lg flex items-center justify-center"
                >
                  Start Free Analysis
                  <ArrowRight className="w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                </button>
              </Link>
              <button
                className="border-white text-white hover:bg-white hover:text-blue-600 transition-all duration-300 hover:scale-105 hover:shadow-xl px-8 py-4 rounded-lg font-semibold text-lg border-2"
              >
                View Sample Report
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}