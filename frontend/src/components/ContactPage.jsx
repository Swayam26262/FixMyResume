import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageCircle, Clock, CheckCircle } from 'lucide-react';

export default function ContactPage({ onNavigate }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    setIsSubmitted(true);
    // Reset form after 3 seconds
    setTimeout(() => {
      setFormData({ name: '', email: '', subject: '', message: '' });
      setIsSubmitted(false);
    }, 3000);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20 animate-fadeInUp">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-6 animate-fadeInUp">Get in Touch</h1>
          <p className="text-xl opacity-90 max-w-2xl mx-auto animate-fadeInUp stagger-1">
            Have questions about our services? We're here to help you succeed in your career journey.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Information */}
          <div className="space-y-8 animate-fadeInLeft">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Let's Connect</h2>
              <p className="text-lg text-gray-600 mb-8">
                Ready to take your career to the next level? Reach out to us and let's discuss how we can help you achieve your professional goals.
              </p>
            </div>

            <div className="space-y-6">
              {[
                {
                  icon: <Mail className="h-6 w-6 text-blue-600" />,
                  title: "Email Us",
                  content: "support@fixmyresume.com",
                  bgColor: "bg-blue-100"
                },
                {
                  icon: <Phone className="h-6 w-6 text-green-600" />,
                  title: "Call Us",
                  content: "+1 (555) 123-4567",
                  bgColor: "bg-green-100"
                },
                {
                  icon: <MapPin className="h-6 w-6 text-purple-600" />,
                  title: "Visit Us",
                  content: "123 Career Street, Success City, SC 12345",
                  bgColor: "bg-purple-100"
                },
                {
                  icon: <Clock className="h-6 w-6 text-orange-600" />,
                  title: "Business Hours",
                  content: "Mon-Fri: 9AM-6PM EST",
                  bgColor: "bg-orange-100"
                }
              ].map((item, index) => (
                <div key={index} className={`flex items-center space-x-4 p-4 bg-white rounded-lg shadow-sm border border-gray-100 hover-lift animate-fadeInUp stagger-${index + 1} group`}>
                  <div className={`${item.bgColor} p-3 rounded-full group-hover:scale-110 transition-transform duration-200`}>
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">{item.title}</h3>
                    <p className="text-gray-600">{item.content}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* FAQ Section */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover-lift animate-fadeInUp stagger-5">
              <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <MessageCircle className="h-5 w-5 mr-2 text-blue-600" />
                Quick Questions?
              </h3>
              <div className="space-y-3">
                <button 
                  onClick={() => onNavigate('pricing')}
                  className="block w-full text-left p-3 rounded-lg hover:bg-gray-50 transition-all duration-200 hover:translate-x-2 group"
                >
                  <span className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors">What are your pricing plans?</span>
                  <p className="text-sm text-gray-600 mt-1">View our flexible pricing options</p>
                </button>
                <button 
                  onClick={() => onNavigate('features')}
                  className="block w-full text-left p-3 rounded-lg hover:bg-gray-50 transition-all duration-200 hover:translate-x-2 group"
                >
                  <span className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors">What features do you offer?</span>
                  <p className="text-sm text-gray-600 mt-1">Explore our comprehensive feature set</p>
                </button>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-8 border border-gray-100 hover-lift animate-fadeInRight">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h2>
            
            {isSubmitted ? (
              <div className="text-center py-12 animate-scaleIn">
                <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4 animate-bounce" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Message Sent!</h3>
                <p className="text-gray-600">Thank you for reaching out. We'll get back to you within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="animate-fadeInUp stagger-1">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-400"
                      placeholder="Your full name"
                    />
                  </div>
                  <div className="animate-fadeInUp stagger-2">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-400"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div className="animate-fadeInUp stagger-3">
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-400"
                    placeholder="What's this about?"
                  />
                </div>

                <div className="animate-fadeInUp stagger-4">
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none hover:border-gray-400"
                    placeholder="Tell us how we can help you..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl hover-lift animate-fadeInUp stagger-5 group"
                >
                  <Send className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
                  <span>Send Message</span>
                </button>
              </form>
            )}

            <div className="mt-6 p-4 bg-blue-50 rounded-lg animate-fadeInUp stagger-6">
              <p className="text-sm text-blue-800">
                <strong>Response Time:</strong> We typically respond within 24 hours during business days.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 