import React from 'react';
import { Check, Star, Zap, Crown, Users } from 'lucide-react';

export default function PricingPage({ onNavigate }) {
  const plans = [
    {
      name: 'Free',
      price: '$0',
      period: 'forever',
      description: 'Perfect for getting started with resume optimization',
      features: [
        '1 resume analysis per month',
        'Basic scoring and feedback',
        'ATS compatibility check',
        'Standard templates',
        'Email support'
      ],
      limitations: [
        'Limited detailed recommendations',
        'No keyword optimization',
        'No industry comparison'
      ],
      buttonText: 'Get Started Free',
      buttonStyle: 'bg-gray-600 hover:bg-gray-700',
      icon: <Users className="h-6 w-6" />,
      popular: false
    },
    {
      name: 'Pro',
      price: '$19',
      period: 'per month',
      description: 'Ideal for active job seekers and professionals',
      features: [
        'Unlimited resume analyses',
        'Advanced AI-powered recommendations',
        'Keyword optimization suggestions',
        'Industry-specific insights',
        'LinkedIn profile optimization',
        'Premium templates library',
        'Priority email support',
        'Progress tracking & analytics'
      ],
      limitations: [],
      buttonText: 'Start Pro Trial',
      buttonStyle: 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700',
      icon: <Zap className="h-6 w-6" />,
      popular: true
    },
    {
      name: 'Enterprise',
      price: '$49',
      period: 'per month',
      description: 'Advanced features for teams and recruiters',
      features: [
        'Everything in Pro',
        'Team collaboration tools',
        'Bulk resume processing',
        'Custom branding',
        'Advanced analytics dashboard',
        'API access',
        'Dedicated account manager',
        'Custom integrations',
        'Priority phone support'
      ],
      limitations: [],
      buttonText: 'Contact Sales',
      buttonStyle: 'bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700',
      icon: <Crown className="h-6 w-6" />,
      popular: false
    }
  ];

  const faqs = [
    {
      question: 'How does the AI resume analysis work?',
      answer: 'Our advanced AI analyzes your resume against industry standards, ATS requirements, and thousands of successful resumes. It provides specific, actionable feedback to improve your chances of getting interviews.'
    },
    {
      question: 'Can I cancel my subscription anytime?',
      answer: 'Yes, you can cancel your subscription at any time. There are no long-term commitments, and you\'ll continue to have access to Pro features until the end of your current billing period.'
    },
    {
      question: 'What file formats do you support?',
      answer: 'We support PDF, DOC, and DOCX formats. For best results, we recommend uploading your resume as a PDF to preserve formatting.'
    },
    {
      question: 'Is my data secure?',
      answer: 'Absolutely. We use enterprise-grade security measures to protect your data. Your resumes are encrypted in transit and at rest, and we never share your personal information with third parties.'
    },
    {
      question: 'Do you offer refunds?',
      answer: 'We offer a 30-day money-back guarantee for all paid plans. If you\'re not satisfied with our service, contact us within 30 days for a full refund.'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Choose Your Plan
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Transform your career with AI-powered resume optimization. Start free and upgrade when you're ready.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative bg-white rounded-2xl shadow-lg border-2 p-8 ${
                plan.popular 
                  ? 'border-purple-500 transform scale-105' 
                  : 'border-gray-200 hover:border-purple-300'
              } transition-all duration-300`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-1 rounded-full text-sm font-medium flex items-center">
                    <Star className="h-4 w-4 mr-1" />
                    Most Popular
                  </span>
                </div>
              )}

              <div className="text-center mb-8">
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg mb-4 ${
                  plan.popular 
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white' 
                    : 'bg-gray-100 text-gray-600'
                }`}>
                  {plan.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <div className="flex items-baseline justify-center mb-2">
                  <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                  <span className="text-gray-600 ml-2">/{plan.period}</span>
                </div>
                <p className="text-gray-600">{plan.description}</p>
              </div>

              <div className="space-y-4 mb-8">
                {plan.features.map((feature, i) => (
                  <div key={i} className="flex items-center">
                    <Check className="h-5 w-5 text-green-600 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
                {plan.limitations.map((limitation, i) => (
                  <div key={i} className="flex items-center opacity-50">
                    <div className="h-5 w-5 mr-3 flex-shrink-0 rounded-full border-2 border-gray-300"></div>
                    <span className="text-gray-500 line-through">{limitation}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={() => onNavigate('signup')}
                className={`w-full py-3 px-6 rounded-lg font-semibold text-white transition-all transform hover:scale-105 ${plan.buttonStyle}`}
              >
                {plan.buttonText}
              </button>
            </div>
          ))}
        </div>

        {/* Features Comparison */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 mb-16">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">Feature Comparison</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-4 px-6 font-semibold text-gray-900">Features</th>
                  <th className="text-center py-4 px-6 font-semibold text-gray-900">Free</th>
                  <th className="text-center py-4 px-6 font-semibold text-purple-600">Pro</th>
                  <th className="text-center py-4 px-6 font-semibold text-gray-900">Enterprise</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {[
                  ['Resume analyses per month', '1', 'Unlimited', 'Unlimited'],
                  ['AI-powered recommendations', '✓', '✓', '✓'],
                  ['ATS compatibility check', '✓', '✓', '✓'],
                  ['Keyword optimization', '—', '✓', '✓'],
                  ['Industry comparison', '—', '✓', '✓'],
                  ['LinkedIn optimization', '—', '✓', '✓'],
                  ['Premium templates', '—', '✓', '✓'],
                  ['Team collaboration', '—', '—', '✓'],
                  ['API access', '—', '—', '✓'],
                  ['Priority support', '—', '✓', '✓']
                ].map((row, index) => (
                  <tr key={index}>
                    <td className="py-4 px-6 font-medium text-gray-900">{row[0]}</td>
                    <td className="py-4 px-6 text-center text-gray-600">{row[1]}</td>
                    <td className="py-4 px-6 text-center text-purple-600 font-medium">{row[2]}</td>
                    <td className="py-4 px-6 text-center text-gray-600">{row[3]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-12 text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Career?</h2>
          <p className="text-xl text-purple-100 mb-8">
            Join thousands of professionals who have improved their resumes with ResumeAI
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => onNavigate('signup')}
              className="bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
            >
              Start Free Trial
            </button>
            <button
              onClick={() => onNavigate('login')}
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-purple-600 transition-colors"
            >
              Sign In
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 