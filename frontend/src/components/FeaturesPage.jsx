import React from 'react';
import { BarChart3, FileText, Users, Award, CheckCircle, Star, Target, TrendingUp, Zap, Shield, ArrowRight } from 'lucide-react';
import authService from '../services/authService';

export default function FeaturesPage({ onNavigate }) {
  const features = [
    {
      icon: <BarChart3 className="h-12 w-12 text-blue-600" />,
      title: "AI-Powered Resume Scoring",
      description: "Get an instant, comprehensive score based on recruiter feedback and industry standards. Our AI analyzes over 30 criteria to give you actionable insights.",
      benefits: [
        "Instant scoring in seconds",
        "Detailed breakdown by category",
        "Industry-specific benchmarks",
        "Progress tracking over time"
      ]
    },
    {
      icon: <FileText className="h-12 w-12 text-blue-600" />,
      title: "ATS Optimization",
      description: "Ensure your resume passes Applicant Tracking Systems used by 99% of Fortune 500 companies. Get specific recommendations to improve your ATS compatibility.",
      benefits: [
        "ATS compatibility check",
        "Keyword optimization suggestions",
        "Format recommendations",
        "Section structure analysis"
      ]
    },
    {
      icon: <Users className="h-12 w-12 text-blue-600" />,
      title: "LinkedIn Profile Review",
      description: "Optimize your LinkedIn profile to attract more recruiters and opportunities. Get personalized recommendations to improve your professional presence.",
      benefits: [
        "Profile completeness analysis",
        "Headline optimization",
        "Summary enhancement tips",
        "Skills section recommendations"
      ]
    },
    {
      icon: <Award className="h-12 w-12 text-blue-600" />,
      title: "Industry-Specific Insights",
      description: "Get tailored recommendations based on your target industry and role. Our database includes insights from thousands of successful professionals.",
      benefits: [
        "Role-specific keywords",
        "Industry benchmarks",
        "Salary insights",
        "Career progression tips"
      ]
    },
    {
      icon: <Target className="h-12 w-12 text-blue-600" />,
      title: "Real-time Feedback",
      description: "Receive instant suggestions as you make changes to your resume. Our AI provides continuous feedback to help you optimize every section.",
      benefits: [
        "Live editing suggestions",
        "Grammar and style checks",
        "Content optimization",
        "Impact measurement"
      ]
    },
    {
      icon: <Star className="h-12 w-12 text-blue-600" />,
      title: "Expert Templates",
      description: "Access professionally designed templates that recruiters love. Choose from industry-specific designs that highlight your strengths.",
      benefits: [
        "50+ professional templates",
        "Industry-specific designs",
        "ATS-friendly formats",
        "Easy customization"
      ]
    }
  ];

  const stats = [
    { number: "2M+", label: "Resumes Analyzed" },
    { number: "89%", label: "Interview Rate Increase" },
    { number: "4.9/5", label: "User Rating" },
    { number: "50+", label: "Industries Covered" }
  ];

  const handleActionClick = () => {
    const user = authService.getCurrentUser();
    if (user) {
      onNavigate('dashboard');
    } else {
      onNavigate('signup');
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Powerful Features to Transform Your Career
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Discover how our AI-powered platform helps you create job-winning resumes 
            and LinkedIn profiles that get noticed by recruiters.
          </p>
          <button
            onClick={handleActionClick}
            className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-700 transition-colors"
          >
            {authService.getCurrentUser() ? 'Go to Dashboard' : 'Try All Features Free'}
          </button>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold text-blue-600 mb-2">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Everything You Need in One Platform
            </h2>
            <p className="text-xl text-gray-600">
              Comprehensive tools to optimize every aspect of your job search
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12">
            {features.map((feature, index) => (
              <div key={index} className="bg-white rounded-xl p-8 shadow-sm border border-gray-200">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-blue-50 rounded-lg flex items-center justify-center">
                      {feature.icon}
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                    <p className="text-gray-600 mb-4">{feature.description}</p>
                    <ul className="space-y-2">
                      {feature.benefits.map((benefit, i) => (
                        <li key={i} className="flex items-center text-gray-700">
                          <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0" />
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600">
              Get your resume optimized in just 3 simple steps
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "1",
                title: "Upload Your Resume",
                description: "Simply upload your current resume in PDF or Word format. Our AI will analyze it instantly.",
                icon: <FileText className="h-8 w-8 text-blue-600" />
              },
              {
                step: "2",
                title: "Get AI Analysis",
                description: "Our advanced AI analyzes your resume against industry standards and provides detailed feedback.",
                icon: <Zap className="h-8 w-8 text-blue-600" />
              },
              {
                step: "3",
                title: "Implement Changes",
                description: "Follow our actionable recommendations to improve your resume and increase your interview chances.",
                icon: <TrendingUp className="h-8 w-8 text-blue-600" />
              }
            ].map((step, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 text-white rounded-full text-2xl font-bold mb-4">
                  {step.step}
                </div>
                <div className="mb-4">{step.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Security Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Shield className="h-16 w-16 text-blue-600 mx-auto mb-4" />
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Your Data is Safe & Secure
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We take your privacy seriously. Your resume data is encrypted and never shared with third parties.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "End-to-End Encryption",
                description: "All data is encrypted in transit and at rest using industry-standard protocols."
              },
              {
                title: "GDPR Compliant",
                description: "We follow strict data protection regulations to ensure your privacy."
              },
              {
                title: "No Data Sharing",
                description: "Your resume data is never shared with recruiters or third parties without consent."
              }
            ].map((item, index) => (
              <div key={index} className="bg-white rounded-xl p-6 text-center shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Transform Your Resume?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join millions of professionals who have improved their careers with ResumeAI
          </p>
          <button
            onClick={handleActionClick}
            className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-50 transition-colors"
          >
            {authService.getCurrentUser() ? 'Go to Dashboard' : 'Try All Features Free'}
          </button>
        </div>
      </section>
    </div>
  );
} 