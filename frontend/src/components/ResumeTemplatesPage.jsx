import React, { useState } from 'react';
import { Download, Eye, Star, Filter, Search } from 'lucide-react';
import ResumeEditor from './resume/ResumeEditor';

export default function ResumeTemplatesPage({ onNavigate }) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  const categories = [
    { id: 'all', label: 'All Templates' },
    { id: 'modern', label: 'Modern' },
    { id: 'professional', label: 'Professional' },
    { id: 'creative', label: 'Creative' },
    { id: 'executive', label: 'Executive' },
    { id: 'entry-level', label: 'Entry Level' }
  ];

  const templates = [
    {
      id: 1,
      name: 'Modern Professional',
      category: 'modern',
      rating: 4.9,
      downloads: 15420,
      image: '/images/modern-professional.png',
      preview: 'https://images.pexels.com/photos/590016/pexels-photo-590016.jpeg?auto=compress&cs=tinysrgb&w=400',
      isPremium: false,
      description: 'Clean, modern design perfect for tech and creative industries'
    },
    {
      id: 2,
      name: 'Executive Classic',
      category: 'executive',
      rating: 4.8,
      downloads: 12350,
      image: '/images/executive-classic.png',
      preview: 'https://images.pexels.com/photos/590016/pexels-photo-590016.jpeg?auto=compress&cs=tinysrgb&w=400',
      isPremium: true,
      description: 'Sophisticated template for senior-level positions'
    },
    {
      id: 3,
      name: 'Creative Portfolio',
      category: 'creative',
      rating: 4.7,
      downloads: 9870,
      image: '/images/creative-portfolio.png',
      preview: 'https://images.pexels.com/photos/590016/pexels-photo-590016.jpeg?auto=compress&cs=tinysrgb&w=400',
      isPremium: true,
      description: 'Eye-catching design for designers and creative professionals'
    },
    {
      id: 4,
      name: 'Professional Standard',
      category: 'professional',
      rating: 4.9,
      downloads: 18920,
      image: '/images/professional-standard.png',
      preview: 'https://images.pexels.com/photos/590016/pexels-photo-590016.jpeg?auto=compress&cs=tinysrgb&w=400',
      isPremium: false,
      description: 'Traditional format suitable for all industries'
    },
    {
      id: 5,
      name: 'Fresh Graduate',
      category: 'entry-level',
      rating: 4.6,
      downloads: 7650,
      image: '/images/fresh-graduate.png',
      preview: 'https://images.pexels.com/photos/590016/pexels-photo-590016.jpeg?auto=compress&cs=tinysrgb&w=400',
      isPremium: false,
      description: 'Perfect for new graduates and entry-level positions'
    },
    {
      id: 6,
      name: 'Minimalist Pro',
      category: 'modern',
      rating: 4.8,
      downloads: 11240,
      image: '/images/minimalist-pro.png',
      preview: 'https://images.pexels.com/photos/590016/pexels-photo-590016.jpeg?auto=compress&cs=tinysrgb&w=400',
      isPremium: true,
      description: 'Clean, minimal design that focuses on content'
    },
    {
      id: 7,
      name: 'Classic CV',
      category: 'traditional',
      rating: 4.5,
      downloads: 8200,
      image: '/images/classic-cv.png',
      preview: 'https://images.pexels.com/photos/590016/pexels-photo-590016.jpeg?auto=compress&cs=tinysrgb&w=400',
      isPremium: false,
      description: 'A timeless, traditional resume format suitable for any industry.'
    },
    {
      id: 8,
      name: 'Blue Modern',
      category: 'modern',
      rating: 4.8,
      downloads: 13500,
      image: '/images/blue-modern.png',
      preview: 'https://images.pexels.com/photos/590016/pexels-photo-590016.jpeg?auto=compress&cs=tinysrgb&w=400',
      isPremium: true,
      description: 'A stylish, modern resume with a professional blue sidebar.'
    },
    {
      id: 9,
      name: 'Minimalist Gray',
      category: 'minimalist',
      rating: 4.7,
      downloads: 9800,
      image: '/images/minimalist-gray.png',
      preview: 'https://images.pexels.com/photos/590016/pexels-photo-590016.jpeg?auto=compress&cs=tinysrgb&w=400',
      isPremium: false,
      description: 'A clean, minimalist design with a focus on typography and readability.'
    }
  ];

  const filteredTemplates = templates.filter(template => {
    const matchesCategory = selectedCategory === 'all' || template.category === selectedCategory;
    const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  if (selectedTemplate) {
    return <ResumeEditor template={selectedTemplate} onBack={() => setSelectedTemplate(null)} />;
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Professional Resume Templates
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Choose from our collection of ATS-friendly, professionally designed resume templates. 
            Created by experts and loved by recruiters.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#templates"
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Browse All Templates
            </a>
            <button
              onClick={() => onNavigate('analyzer')}
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors border border-gray-200"
            >
              Analyze My Resume
            </button>
          </div>
        </div>
      </section>

      {/* Templates Gallery */}
      <section id="templates" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filter and Search UI */}
          <div className="mb-12">
            <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
              <div className="flex bg-gray-100 p-1 rounded-lg items-center">
                {categories.map(category => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                      selectedCategory === category.id
                        ? 'bg-white text-blue-600 shadow'
                        : 'text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {category.label}
                  </button>
                ))}
              </div>
              <div className="relative w-full md:w-auto">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search templates..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 w-full md:w-64 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Template Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredTemplates.map((template) => (
              <div key={template.id} className="bg-white rounded-xl shadow-lg overflow-hidden transform hover:-translate-y-2 transition-transform duration-300 group">
                <div className="relative">
                  <img src={template.preview} alt={template.name} className="w-full h-56 object-cover"/>
                  <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button 
                      onClick={() => setSelectedTemplate(template)}
                      className="bg-white text-gray-900 px-6 py-2 rounded-lg font-semibold flex items-center"
                    >
                      <Eye className="h-5 w-5 mr-2" />
                      Preview & Edit
                    </button>
                  </div>
                  {template.isPremium && (
                    <div className="absolute top-2 right-2 bg-yellow-400 text-gray-900 px-2 py-1 text-xs font-bold rounded">
                      PREMIUM
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{template.name}</h3>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="text-sm text-gray-600 ml-1">{template.rating}</span>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 text-sm mb-4">{template.description}</p>
                  
                  <div className="bg-gray-200 h-64 rounded-t-lg flex items-center justify-center overflow-hidden">
                    <img src={template.image} alt={`${template.name} preview`} className="w-full h-full object-cover object-top" />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-500">
                      {template.downloads.toLocaleString()} downloads
                    </div>
                    <button 
                      onClick={() => setSelectedTemplate(template)}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center"
                    >
                      Use Template
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredTemplates.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No templates found matching your criteria.</p>
              <button
                onClick={() => {
                  setSelectedCategory('all');
                  setSearchTerm('');
                }}
                className="mt-4 text-blue-600 hover:text-blue-700 font-medium"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose Our Templates?
            </h2>
            <p className="text-xl text-gray-600">
              Our templates are designed to help you stand out while maintaining professionalism
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "ATS-Friendly",
                description: "All templates are optimized for Applicant Tracking Systems to ensure your resume gets seen"
              },
              {
                title: "Professional Design",
                description: "Created by expert designers with years of experience in resume writing"
              },
              {
                title: "Easy to Customize",
                description: "Simple to edit and personalize with your information and experience"
              }
            ].map((feature, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-sm">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Create Your Professional Resume?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Choose a template and start building your resume in minutes
          </p>
          <button
            onClick={() => onNavigate('signup')}
            className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-50 transition-colors"
          >
            Get Started Free
          </button>
        </div>
      </section>
    </div>
  );
}