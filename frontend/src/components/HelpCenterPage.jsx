import { useState } from "react"
import {
  FileText,
  Search,
  ChevronDown,
  ChevronRight,
  HelpCircle,
  BookOpen,
  MessageSquare,
  Mail,
  Video,
} from "lucide-react"
import { Link } from "react-router-dom"

const categories = [
  {
    title: "Getting Started",
    icon: BookOpen,
    articles: [
      { title: "How to upload your resume", views: "15.2k", helpful: 98 },
      { title: "Understanding your resume score", views: "12.8k", helpful: 95 },
      { title: "Creating your first account", views: "8.9k", helpful: 97 },
      { title: "Navigating the dashboard", views: "6.7k", helpful: 92 },
    ],
  },
  {
    title: "Resume Analysis",
    icon: FileText,
    articles: [
      { title: "What does my resume score mean?", views: "22.1k", helpful: 96 },
      { title: "How to improve impact score", views: "18.5k", helpful: 94 },
      { title: "Understanding ATS compatibility", views: "14.3k", helpful: 93 },
      { title: "Fixing formatting issues", views: "11.2k", helpful: 91 },
    ],
  },
  {
    title: "LinkedIn Optimization",
    icon: MessageSquare,
    articles: [
      { title: "Optimizing your LinkedIn headline", views: "9.8k", helpful: 89 },
      { title: "Writing a compelling summary", views: "7.6k", helpful: 87 },
      { title: "Adding skills and endorsements", views: "5.4k", helpful: 85 },
      { title: "Growing your network effectively", views: "4.2k", helpful: 88 },
    ],
  },
  {
    title: "Account & Billing",
    icon: HelpCircle,
    articles: [
      { title: "Upgrading to premium", views: "6.1k", helpful: 92 },
      { title: "Managing your subscription", views: "4.8k", helpful: 90 },
      { title: "Canceling your account", views: "3.2k", helpful: 88 },
      { title: "Billing and payment issues", views: "2.9k", helpful: 86 },
    ],
  },
]

const faqs = [
  {
    question: "How accurate is the resume scoring?",
    answer:
      "Our AI-powered scoring system is trained on data from over 1 million successful resumes and feedback from top recruiters at companies like Google, Microsoft, and Amazon. The scoring accuracy is approximately 95% when compared to human recruiter assessments.",
  },
  {
    question: "Is my resume data secure and private?",
    answer:
      "Yes, absolutely. We use enterprise-grade encryption to protect your data. Your resume is processed securely and automatically deleted after analysis unless you choose to save it. We never share your personal information with third parties.",
  },
  {
    question: "Can I use FixMyResume for different industries?",
    answer:
      "Yes! Our AI is trained on resumes across all major industries including technology, healthcare, finance, marketing, education, and more. The system automatically detects your industry and provides tailored recommendations.",
  },
  {
    question: "What file formats do you support?",
    answer:
      "We support PDF, DOC, and DOCX files up to 5MB in size. PDF is recommended for the most accurate analysis as it preserves formatting better than other formats.",
  },
  {
    question: "How often should I update my resume?",
    answer:
      "We recommend updating your resume every 3-6 months or whenever you gain new skills, complete projects, or change roles. Regular updates ensure your resume stays current and optimized for new opportunities.",
  },
]

// Simple components to replace ShadCN UI
const Card = ({ children, className }) => <div className={`bg-white rounded-2xl shadow-lg border border-gray-100 ${className}`}>{children}</div>;
const CardHeader = ({ children, className }) => <div className={`p-6 ${className}`}>{children}</div>;
const CardTitle = ({ children, className }) => <h3 className={`text-lg font-semibold text-gray-900 ${className}`}>{children}</h3>;
const CardContent = ({ children, className }) => <div className={`p-6 ${className}`}>{children}</div>;

const Button = ({ children, variant = 'default', size = 'default', className, ...props }) => {
  const baseClasses = "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none"
  
  const variantClasses = {
    default: "bg-purple-600 text-white hover:bg-purple-700",
    destructive: "bg-red-600 text-white hover:bg-red-700",
    outline: "border border-gray-300 bg-transparent hover:bg-gray-100",
    secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300",
    ghost: "hover:bg-gray-100",
    link: "text-purple-600 underline-offset-4 hover:underline",
  }

  const sizeClasses = {
    default: "h-10 py-2 px-4",
    sm: "h-9 px-3 rounded-md",
    lg: "h-11 px-8 rounded-md",
  }

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
};

const Input = ({ className, ...props }) => {
  return <input className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-400 ${className}`} {...props} />;
};

const Badge = ({ children, className }) => {
  return <span className={`inline-block bg-gray-100 text-gray-700 text-xs font-medium px-2.5 py-0.5 rounded-full ${className}`}>{children}</span>;
};

export default function HelpCenterPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [openFaq, setOpenFaq] = useState(null)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-5xl font-bold mb-6">
            How can we <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">help</span> you?
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Find answers to common questions, browse our knowledge base, or get in touch with our support team.
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              type="text"
              placeholder="Search for help articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 py-4 text-lg border-2 border-gray-200 focus:border-blue-500"
            />
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow cursor-pointer">
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Video className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Video Tutorials</h3>
              <p className="text-gray-600 mb-4">Watch step-by-step guides to get the most out of FixMyResume</p>
              <Button variant="outline" className="w-full">
                Watch Tutorials
              </Button>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow cursor-pointer">
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-green-100 to-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageSquare className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Live Chat</h3>
              <p className="text-gray-600 mb-4">Get instant help from our support team</p>
              <Button variant="outline" className="w-full">
                Start Chat
              </Button>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow cursor-pointer">
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Email Support</h3>
              <p className="text-gray-600 mb-4">Send us a detailed message and we'll respond within 24 hours</p>
              <Link to="/contact">
                <Button variant="outline" className="w-full">
                  Send Email
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Knowledge Base Categories */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Browse by Category</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {categories.map((category, index) => (
              <Card key={index} className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-lg flex items-center justify-center">
                      <category.icon className="w-5 h-5 text-blue-600" />
                    </div>
                    <span>{category.title}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 pt-6">
                  {category.articles.map((article, articleIndex) => (
                    <div
                      key={articleIndex}
                      className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                    >
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{article.title}</h4>
                        <div className="flex items-center space-x-4 text-sm text-gray-500 mt-1">
                          <span>{article.views} views</span>
                          <Badge variant="secondary" className="text-xs">
                            {article.helpful}% helpful
                          </Badge>
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-gray-400" />
                    </div>
                  ))}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          <div className="max-w-4xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <div key={index}>
                <Card className="border-0 shadow-lg">
                  <div onClick={() => setOpenFaq(openFaq === index ? null : index)} className="cursor-pointer">
                    <CardHeader className="hover:bg-gray-50 transition-colors">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg text-left">{faq.question}</CardTitle>
                        <ChevronDown
                          className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${
                            openFaq === index ? "transform rotate-180" : ""
                          }`}
                        />
                      </div>
                    </CardHeader>
                  </div>
                  {openFaq === index && (
                    <div>
                      <CardContent className="pt-0">
                        <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                      </CardContent>
                    </div>
                  )}
                </Card>
              </div>
            ))}
          </div>
        </div>

        {/* Still Need Help */}
        <Card className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white border-0">
          <CardContent className="p-12 text-center pt-12">
            <HelpCircle className="w-16 h-16 mx-auto mb-6 opacity-80" />
            <h2 className="text-3xl font-bold mb-4">Still need help?</h2>
            <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
              Can't find what you're looking for? Our support team is here to help you succeed.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact">
                <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 w-full sm:w-auto">
                  Contact Support
                </Button>
              </Link>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-blue-600 w-full sm:w-auto"
              >
                Schedule a Call
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
