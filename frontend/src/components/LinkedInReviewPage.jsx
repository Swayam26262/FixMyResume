import React from 'react';
import { Users, Star, TrendingUp, CheckCircle, ArrowRight, Eye, MessageCircle, UserPlus } from 'lucide-react';

export default function LinkedInReviewPage({ onNavigate }) {
  const features = [
    {
      icon: <Eye className="h-8 w-8 text-blue-600" />,
      title: "Profile Visibility",
      description: "Optimize your profile to appear in more recruiter searches and increase your visibility by up to 40x."
    },
    {
      icon: <MessageCircle className="h-8 w-8 text-blue-600" />,
      title: "Headline Optimization",
      description: "Craft compelling headlines that grab attention and clearly communicate your value proposition."
    },
    {
      icon: <UserPlus className="h-8 w-8 text-blue-600" />,
      title: "Network Growth",
      description: "Learn strategies to grow your professional network and connect with industry leaders."
    },
    {
      icon: <TrendingUp className="h-8 w-8 text-blue-600" />,
      title: "Engagement Boost",
      description: "Increase profile views, connection requests, and job opportunities with optimized content."
    }
  ];

  const beforeAfter = {
    before: {
      headline: "Software Engineer at Tech Company",
      summary: "I am a software engineer with experience in various technologies...",
      score: 45
    },
    after: {
      headline: "Senior Full-Stack Developer | React & Node.js Expert | Building Scalable Web Applications",
      summary: "Passionate Full-Stack Developer with 5+ years of experience building scalable web applications. Specialized in React, Node.js, and cloud technologies. Led development teams that delivered 20+ successful projects, improving user engagement by 150%.",
      score: 92
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-sm font-medium mb-6">
              <Users className="h-4 w-4 mr-2" />
              LinkedIn Profile Optimization
            </div>
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Transform Your LinkedIn Profile Into a Recruiter Magnet
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Get AI-powered recommendations to optimize your LinkedIn profile and attract 
              more recruiters, job opportunities, and professional connections.
            </p>
            <button
              onClick={() => onNavigate('signup')}
              className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-700 transition-colors flex items-center mx-auto"
            >
              Optimize My Profile Free
              <ArrowRight className="ml-2 h-5 w-5" />
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {[
              { number: "40x", label: "More Profile Views" },
              { number: "5x", label: "More Recruiter Messages" },
              { number: "300%", label: "Increase in Connections" },
              { number: "85%", label: "Get Job Interviews" }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-1">{stat.number}</div>
                <div className="text-gray-600 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              What We'll Optimize
            </h2>
            <p className="text-xl text-gray-600">
              Comprehensive analysis of every aspect of your LinkedIn profile
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center p-6 rounded-xl bg-gray-50">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-50 rounded-lg mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Before/After Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              See the Transformation
            </h2>
            <p className="text-xl text-gray-600">
              Real examples of how our optimization improves LinkedIn profiles
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Before */}
            <div className="bg-white rounded-2xl p-8 border border-gray-200">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-gray-900">Before Optimization</h3>
                <div className="flex items-center">
                  <div className="text-2xl font-bold text-red-600">{beforeAfter.before.score}</div>
                  <div className="text-sm text-gray-500 ml-1">/100</div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Headline</label>
                  <div className="p-3 bg-gray-50 rounded-lg text-gray-600">
                    {beforeAfter.before.headline}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Summary</label>
                  <div className="p-3 bg-gray-50 rounded-lg text-gray-600">
                    {beforeAfter.before.summary}
                  </div>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-red-50 rounded-lg">
                <h4 className="font-medium text-red-800 mb-2">Issues Found:</h4>
                <ul className="text-sm text-red-700 space-y-1">
                  <li>• Generic headline lacks impact</li>
                  <li>• Summary is too vague</li>
                  <li>• Missing keywords for SEO</li>
                  <li>• No quantified achievements</li>
                </ul>
              </div>
            </div>

            {/* After */}
            <div className="bg-white rounded-2xl p-8 border border-green-200">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-gray-900">After Optimization</h3>
                <div className="flex items-center">
                  <div className="text-2xl font-bold text-green-600">{beforeAfter.after.score}</div>
                  <div className="text-sm text-gray-500 ml-1">/100</div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Headline</label>
                  <div className="p-3 bg-green-50 rounded-lg text-gray-800">
                    {beforeAfter.after.headline}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Summary</label>
                  <div className="p-3 bg-green-50 rounded-lg text-gray-800">
                    {beforeAfter.after.summary}
                  </div>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-green-50 rounded-lg">
                <h4 className="font-medium text-green-800 mb-2">Improvements Made:</h4>
                <ul className="text-sm text-green-700 space-y-1">
                  <li>• Compelling headline with keywords</li>
                  <li>• Specific achievements with metrics</li>
                  <li>• Industry-relevant keywords</li>
                  <li>• Clear value proposition</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              How LinkedIn Optimization Works
            </h2>
            <p className="text-xl text-gray-600">
              Simple process to transform your profile in minutes
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "1",
                title: "Connect Your Profile",
                description: "Securely connect your LinkedIn profile or upload your current profile information for analysis."
              },
              {
                step: "2",
                title: "AI Analysis",
                description: "Our AI analyzes your profile against successful profiles in your industry and identifies improvement opportunities."
              },
              {
                step: "3",
                title: "Get Recommendations",
                description: "Receive specific, actionable recommendations to optimize every section of your LinkedIn profile."
              }
            ].map((step, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 text-white rounded-full text-2xl font-bold mb-4">
                  {step.step}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Optimize Your LinkedIn Profile?
            </h2>
            <p className="text-xl text-gray-600">
              Stand out from the competition and get noticed by top recruiters
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Star className="h-8 w-8 text-blue-600" />,
                title: "Get More Job Offers",
                description: "Optimized profiles receive 5x more job offers and interview requests."
              },
              {
                icon: <TrendingUp className="h-8 w-8 text-blue-600" />,
                title: "Career Growth",
                description: "Build your personal brand and attract better career opportunities."
              },
              {
                icon: <CheckCircle className="h-8 w-8 text-blue-600" />,
                title: "Professional Credibility",
                description: "Establish yourself as an industry expert and thought leader."
              }
            ].map((benefit, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-sm">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-50 rounded-lg mb-4">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Transform Your LinkedIn Profile?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Get started with our AI-powered LinkedIn profile optimization and start attracting 
            better career opportunities today.
          </p>
          <button
            onClick={() => onNavigate('signup')}
            className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-50 transition-colors flex items-center mx-auto"
          >
            Start Free Optimization
            <ArrowRight className="ml-2 h-5 w-5" />
          </button>
        </div>
      </section>
    </div>
  );
} 