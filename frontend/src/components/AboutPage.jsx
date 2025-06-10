import React from 'react';
import { Users, Target, Award, Heart, Linkedin, Twitter, Mail } from 'lucide-react';

export default function AboutPage({ onNavigate }) {
  const team = [
    {
      name: "Sarah Johnson",
      role: "CEO & Co-Founder",
      bio: "Former Google recruiter with 10+ years of experience in talent acquisition and AI development.",
      image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400",
      linkedin: "#",
      twitter: "#"
    },
    {
      name: "Michael Chen",
      role: "CTO & Co-Founder",
      bio: "AI researcher and former Microsoft engineer specializing in natural language processing and machine learning.",
      image: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=400",
      linkedin: "#",
      twitter: "#"
    },
    {
      name: "Emily Rodriguez",
      role: "Head of Product",
      bio: "Product strategist with experience at LinkedIn and Indeed, passionate about career development tools.",
      image: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400",
      linkedin: "#",
      twitter: "#"
    },
    {
      name: "David Kim",
      role: "Head of Engineering",
      bio: "Full-stack engineer and former Amazon tech lead with expertise in scalable AI systems.",
      image: "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=400",
      linkedin: "#",
      twitter: "#"
    }
  ];

  const values = [
    {
      icon: <Target className="h-8 w-8 text-blue-600" />,
      title: "Mission-Driven",
      description: "We're committed to democratizing access to career opportunities and helping everyone achieve their professional goals.",
      gradient: "from-blue-500 to-blue-600"
    },
    {
      icon: <Users className="h-8 w-8 text-purple-600" />,
      title: "People-First",
      description: "Every decision we make is centered around our users' success and creating genuine value for job seekers worldwide.",
      gradient: "from-purple-500 to-purple-600"
    },
    {
      icon: <Award className="h-8 w-8 text-green-600" />,
      title: "Excellence",
      description: "We strive for the highest quality in everything we do, from our AI algorithms to our user experience.",
      gradient: "from-green-500 to-green-600"
    },
    {
      icon: <Heart className="h-8 w-8 text-pink-600" />,
      title: "Empathy",
      description: "We understand the challenges of job searching and build our products with genuine care for our users' experiences.",
      gradient: "from-pink-500 to-pink-600"
    }
  ];

  const milestones = [
    {
      year: "2020",
      title: "Company Founded",
      description: "Started with a vision to revolutionize resume optimization using AI technology."
    },
    {
      year: "2021",
      title: "First Million Users",
      description: "Reached 1 million users and helped thousands land their dream jobs."
    },
    {
      year: "2022",
      title: "AI Breakthrough",
      description: "Launched advanced AI scoring system with 95% accuracy in predicting resume success."
    },
    {
      year: "2023",
      title: "Global Expansion",
      description: "Expanded to serve users in 50+ countries with localized career insights."
    },
    {
      year: "2024",
      title: "2M+ Users",
      description: "Celebrating over 2 million users and 500,000 successful job placements."
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20 animate-fadeInUp">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6 animate-fadeInUp">
            About FixMyResume
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8 animate-fadeInUp stagger-1">
            We're on a mission to democratize access to career opportunities by providing 
            AI-powered tools that help job seekers create compelling resumes and land their dream jobs.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fadeInLeft">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Our Mission
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                We believe that everyone deserves access to the tools and insights needed to 
                advance their career. That's why we've built the most comprehensive AI-powered 
                resume optimization platform that provides actionable feedback based on real 
                recruiter insights and industry standards.
              </p>
              <p className="text-lg text-gray-600 mb-8">
                Since our founding in 2020, we've helped over 2 million job seekers improve 
                their resumes and increase their interview rates by an average of 89%. Our 
                platform has been featured in major publications and trusted by professionals 
                at top companies worldwide.
              </p>
              <button
                onClick={() => onNavigate('signup')}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200 hover-lift"
              >
                Join Our Mission
              </button>
            </div>
            <div className="grid grid-cols-2 gap-6 animate-fadeInRight">
              {[
                { value: "2M+", label: "Users Helped", gradient: "from-blue-500 to-blue-600" },
                { value: "89%", label: "Interview Increase", gradient: "from-green-500 to-green-600" },
                { value: "500K+", label: "Job Placements", gradient: "from-purple-500 to-purple-600" },
                { value: "50+", label: "Countries", gradient: "from-yellow-500 to-yellow-600" }
              ].map((stat, index) => (
                <div key={index} className={`bg-gradient-to-r ${stat.gradient} rounded-xl p-6 text-center text-white hover-lift animate-scaleIn stagger-${index + 1}`}>
                  <div className="text-3xl font-bold mb-2">{stat.value}</div>
                  <div className="text-white/90">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fadeInUp">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Our Values
            </h2>
            <p className="text-xl text-gray-600">
              The principles that guide everything we do
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className={`bg-white rounded-xl p-6 text-center shadow-sm border border-gray-200 hover-lift animate-fadeInUp stagger-${index + 1} group`}>
                <div className={`inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r ${value.gradient} rounded-lg mb-4 group-hover:scale-110 transition-transform duration-200`}>
                  {value.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fadeInUp">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Our Journey
            </h2>
            <p className="text-xl text-gray-600">
              Key milestones in our mission to transform careers
            </p>
          </div>
          
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-blue-200 to-purple-200"></div>
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div key={index} className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'} animate-fadeInUp stagger-${index + 1}`}>
                  <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover-lift group">
                      <div className="text-blue-600 font-bold text-lg mb-2 group-hover:text-purple-600 transition-colors">{milestone.year}</div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">{milestone.title}</h3>
                      <p className="text-gray-600">{milestone.description}</p>
                    </div>
                  </div>
                  <div className="relative z-10 w-4 h-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full border-4 border-white shadow-lg hover:scale-125 transition-transform duration-200"></div>
                  <div className="w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fadeInUp">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Meet Our Team
            </h2>
            <p className="text-xl text-gray-600">
              The passionate people behind FixMyResume
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div key={index} className={`bg-white rounded-xl p-6 text-center shadow-sm border border-gray-200 hover-lift animate-fadeInUp stagger-${index + 1} group`}>
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover group-hover:scale-110 transition-transform duration-200"
                />
                <h3 className="text-lg font-semibold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">{member.name}</h3>
                <div className="text-blue-600 font-medium mb-3">{member.role}</div>
                <p className="text-gray-600 text-sm mb-4">{member.bio}</p>
                <div className="flex justify-center space-x-3">
                  <a href={member.linkedin} className="text-gray-400 hover:text-blue-600 transition-all duration-200 hover:scale-110">
                    <Linkedin className="h-5 w-5" />
                  </a>
                  <a href={member.twitter} className="text-gray-400 hover:text-blue-600 transition-all duration-200 hover:scale-110">
                    <Twitter className="h-5 w-5" />
                  </a>
                  <a href="mailto:" className="text-gray-400 hover:text-blue-600 transition-all duration-200 hover:scale-110">
                    <Mail className="h-5 w-5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
} 