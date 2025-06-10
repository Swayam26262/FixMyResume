import React, { useState, useEffect } from 'react';
import { ArrowLeft, Download, Share2, RefreshCw, CheckCircle, AlertCircle, XCircle, Target, TrendingUp, FileText, Award } from 'lucide-react';

export default function ScorePage({ onNavigate, resumeId }) {
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    // Simulate analysis loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const overallScore = 87;
  const previousScore = 72;

  const scoreBreakdown = [
    { category: 'ATS Compatibility', score: 92, maxScore: 100, status: 'excellent' },
    { category: 'Content Quality', score: 85, maxScore: 100, status: 'good' },
    { category: 'Keyword Optimization', score: 78, maxScore: 100, status: 'needs-work' },
    { category: 'Format & Design', score: 94, maxScore: 100, status: 'excellent' },
    { category: 'Section Completeness', score: 89, maxScore: 100, status: 'good' }
  ];

  const recommendations = [
    {
      type: 'critical',
      title: 'Add More Quantified Achievements',
      description: 'Only 40% of your bullet points include numbers or metrics. Add specific results to show your impact.',
      examples: ['Instead of "Managed a team" write "Managed a team of 8 developers"', 'Replace "Increased sales" with "Increased sales by 25% in Q3"']
    },
    {
      type: 'important',
      title: 'Optimize for Software Engineer Keywords',
      description: 'Your resume is missing key terms that appear in 80% of Software Engineer job postings.',
      examples: ['Add: React, Node.js, AWS, Agile, CI/CD', 'Include more technical skills in your skills section']
    },
    {
      type: 'suggestion',
      title: 'Strengthen Your Professional Summary',
      description: 'Your summary could better highlight your unique value proposition and years of experience.',
      examples: ['Lead with your years of experience', 'Mention your key technical specializations', 'Include 1-2 major achievements']
    }
  ];

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreGradient = (score) => {
    if (score >= 80) return 'from-green-500 to-green-600';
    if (score >= 60) return 'from-yellow-500 to-yellow-600';
    return 'from-red-500 to-red-600';
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'excellent':
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'good':
        return <CheckCircle className="h-5 w-5 text-blue-600" />;
      case 'needs-work':
        return <AlertCircle className="h-5 w-5 text-yellow-600" />;
      default:
        return <XCircle className="h-5 w-5 text-red-600" />;
    }
  };

  const getRecommendationIcon = (type) => {
    switch (type) {
      case 'critical':
        return <XCircle className="h-6 w-6 text-red-600" />;
      case 'important':
        return <AlertCircle className="h-6 w-6 text-yellow-600" />;
      default:
        return <Target className="h-6 w-6 text-blue-600" />;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">Analyzing Your Resume</h2>
          <p className="text-gray-600">Our AI is reviewing your resume against industry standards...</p>
          <div className="mt-6 space-y-2 text-sm text-gray-500">
            <p>✓ Checking ATS compatibility</p>
            <p>✓ Analyzing keyword optimization</p>
            <p>✓ Reviewing content quality</p>
            <p>✓ Generating recommendations</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => onNavigate('dashboard')}
              className="p-2 hover:bg-white rounded-lg transition-colors"
            >
              <ArrowLeft className="h-6 w-6 text-gray-600" />
            </button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Resume Analysis</h1>
              <p className="text-gray-600">Software Engineer Resume • Analyzed just now</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <Download className="h-4 w-4" />
              <span>Download Report</span>
            </button>
            <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <Share2 className="h-4 w-4" />
              <span>Share</span>
            </button>
            <button className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-colors">
              <RefreshCw className="h-4 w-4" />
              <span>Re-analyze</span>
            </button>
          </div>
        </div>

        {/* Score Overview */}
        <div className="bg-white rounded-xl shadow-sm border border-purple-100 p-8 mb-8">
          <div className="grid md:grid-cols-3 gap-8 items-center">
            <div className="text-center">
              <div className={`text-6xl font-bold bg-gradient-to-r ${getScoreGradient(overallScore)} bg-clip-text text-transparent mb-2`}>
                {overallScore}
              </div>
              <div className="text-gray-600 mb-4">Overall Score</div>
              <div className="flex items-center justify-center space-x-2 text-sm">
                <TrendingUp className="h-4 w-4 text-green-600" />
                <span className="text-green-600 font-medium">+{overallScore - previousScore} from last version</span>
              </div>
            </div>
            
            <div className="md:col-span-2">
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-xl">
                  <Award className="h-8 w-8 text-green-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-green-600">Top 15%</div>
                  <div className="text-sm text-green-700">Among Software Engineers</div>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl">
                  <FileText className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-blue-600">92%</div>
                  <div className="text-sm text-blue-700">ATS Compatible</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              {[
                { id: 'overview', label: 'Overview', count: null },
                { id: 'recommendations', label: 'Recommendations', count: recommendations.length },
                { id: 'keywords', label: 'Keywords', count: null },
                { id: 'comparison', label: 'Industry Comparison', count: null }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-purple-500 text-purple-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.label}
                  {tab.count && (
                    <span className="ml-2 bg-gray-100 text-gray-900 py-0.5 px-2.5 rounded-full text-xs">
                      {tab.count}
                    </span>
                  )}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Score Breakdown */}
            <div className="bg-white rounded-xl shadow-sm border border-purple-100 p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Score Breakdown</h3>
              <div className="space-y-6">
                {scoreBreakdown.map((item, index) => (
                  <div key={index}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(item.status)}
                        <span className="font-medium text-gray-900">{item.category}</span>
                      </div>
                      <span className={`font-bold ${getScoreColor(item.score)}`}>
                        {item.score}/{item.maxScore}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full bg-gradient-to-r ${getScoreGradient(item.score)}`}
                        style={{ width: `${(item.score / item.maxScore) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Key Insights */}
            <div className="bg-white rounded-xl shadow-sm border border-purple-100 p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Key Insights</h3>
              <div className="space-y-4">
                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                    <div>
                      <p className="font-medium text-green-800">Strong Technical Skills</p>
                      <p className="text-sm text-green-700">Your technical skills section is comprehensive and well-organized.</p>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5" />
                    <div>
                      <p className="font-medium text-blue-800">Excellent Format</p>
                      <p className="text-sm text-blue-700">Your resume follows best practices for readability and structure.</p>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                  <div className="flex items-start space-x-3">
                    <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5" />
                    <div>
                      <p className="font-medium text-yellow-800">Keyword Optimization Needed</p>
                      <p className="text-sm text-yellow-700">Add more industry-specific keywords to improve ATS compatibility.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'recommendations' && (
          <div className="space-y-6">
            {recommendations.map((recommendation, index) => (
              <div key={index} className="bg-white rounded-xl shadow-sm border border-purple-100 p-6">
                <div className="flex items-start space-x-4">
                  {getRecommendationIcon(recommendation.type)}
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{recommendation.title}</h3>
                    <p className="text-gray-600 mb-4">{recommendation.description}</p>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <p className="text-sm font-medium text-gray-900 mb-2">Examples:</p>
                      <ul className="space-y-2">
                        {recommendation.examples.map((example, i) => (
                          <li key={i} className="text-sm text-gray-600 flex items-start">
                            <span className="text-purple-600 mr-2">•</span>
                            {example}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'keywords' && (
          <div className="bg-white rounded-xl shadow-sm border border-purple-100 p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Keyword Analysis</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-gray-900 mb-4">Top Keywords Found</h4>
                <div className="space-y-2">
                  {['JavaScript', 'React', 'Node.js', 'TypeScript', 'AWS'].map((keyword, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-green-50 rounded-lg">
                      <span className="text-green-800">{keyword}</span>
                      <span className="text-sm text-green-600">Found 3 times</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-4">Missing Keywords</h4>
                <div className="space-y-2">
                  {['CI/CD', 'Docker', 'Kubernetes', 'GraphQL', 'MongoDB'].map((keyword, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-yellow-50 rounded-lg">
                      <span className="text-yellow-800">{keyword}</span>
                      <span className="text-sm text-yellow-600">Not found</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'comparison' && (
          <div className="bg-white rounded-xl shadow-sm border border-purple-100 p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Industry Comparison</h3>
            <div className="space-y-6">
              <div className="p-4 bg-blue-50 rounded-lg">
                <h4 className="font-medium text-blue-900 mb-2">Software Engineer Industry Average</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-blue-700">Average Score</p>
                    <p className="text-2xl font-bold text-blue-900">75</p>
                  </div>
                  <div>
                    <p className="text-sm text-blue-700">Your Score</p>
                    <p className="text-2xl font-bold text-blue-900">{overallScore}</p>
                  </div>
                </div>
              </div>
              <div className="p-4 bg-green-50 rounded-lg">
                <h4 className="font-medium text-green-900 mb-2">Top Performers</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-green-700">Top 10% Score</p>
                    <p className="text-2xl font-bold text-green-900">90</p>
                  </div>
                  <div>
                    <p className="text-sm text-green-700">Your Percentile</p>
                    <p className="text-2xl font-bold text-green-900">85th</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 