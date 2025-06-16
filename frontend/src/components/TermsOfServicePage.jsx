import { Link } from "react-router-dom";
import { FileText, Scale, AlertTriangle, CheckCircle } from "lucide-react";

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
}

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Scale className="w-8 h-8 text-blue-600" />
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">
            Terms of{" "}
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Service</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Please read these terms carefully before using our platform. By using FixMyResume, you agree to these terms.
          </p>
          <p className="text-sm text-gray-500 mt-4">Last updated: June 16, 2024</p>
        </div>

        {/* Key Points */}
        <Card className="mb-12 border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span>Key Points</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="grid md:grid-cols-2 gap-6 pt-6">
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                <div>
                  <h4 className="font-semibold">Free Basic Service</h4>
                  <p className="text-sm text-gray-600">Core resume analysis is free for all users</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                <div>
                  <h4 className="font-semibold">Data Privacy</h4>
                  <p className="text-sm text-gray-600">Your resume data is processed securely and privately</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                <div>
                  <h4 className="font-semibold">Fair Use</h4>
                  <p className="text-sm text-gray-600">Reasonable usage limits apply to prevent abuse</p>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                <div>
                  <h4 className="font-semibold">No Guarantees</h4>
                  <p className="text-sm text-gray-600">We provide guidance but cannot guarantee job outcomes</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                <div>
                  <h4 className="font-semibold">Account Responsibility</h4>
                  <p className="text-sm text-gray-600">You are responsible for maintaining account security</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                <div>
                  <h4 className="font-semibold">Termination Rights</h4>
                  <p className="text-sm text-gray-600">Either party may terminate the agreement</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Terms Content */}
        <div className="space-y-8">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle>1. Acceptance of Terms</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <p className="text-gray-600">
                By accessing or using FixMyResume's services, you agree to be bound by these Terms of Service and our
                Privacy Policy. If you do not agree to these terms, please do not use our services. These terms apply to
                all users, including visitors, registered users, and premium subscribers.
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle>2. Description of Service</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 pt-6">
              <p className="text-gray-600">
                FixMyResume provides AI-powered resume analysis, optimization recommendations, and career guidance tools.
                Our services include:
              </p>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start space-x-2">
                  <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2"></div>
                  <span>Resume scoring and analysis</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2"></div>
                  <span>LinkedIn profile optimization</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2"></div>
                  <span>Resume templates and examples</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2"></div>
                  <span>Career guidance and tips</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle>3. User Accounts</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 pt-6">
              <div>
                <h4 className="font-semibold mb-2">Account Creation</h4>
                <p className="text-gray-600">
                  You must provide accurate and complete information when creating an account. You are responsible for
                  maintaining the confidentiality of your account credentials and for all activities under your account.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Account Security</h4>
                <p className="text-gray-600">
                  You must notify us immediately of any unauthorized use of your account. We are not liable for any loss
                  or damage arising from unauthorized account access due to your failure to maintain account security.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Account Termination</h4>
                <p className="text-gray-600">
                  You may delete your account at any time. We reserve the right to suspend or terminate accounts that
                  violate these terms or engage in abusive behavior.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle>4. Acceptable Use</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 pt-6">
              <p className="text-gray-600">You agree not to:</p>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start space-x-2">
                  <AlertTriangle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                  <span>Upload malicious files or content that could harm our systems</span>
                </li>
                <li className="flex items-start space-x-2">
                  <AlertTriangle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                  <span>Attempt to reverse engineer or copy our AI algorithms</span>
                </li>
                <li className="flex items-start space-x-2">
                  <AlertTriangle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                  <span>Use our services for illegal activities or to violate others' rights</span>
                </li>
                <li className="flex items-start space-x-2">
                  <AlertTriangle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                  <span>Exceed reasonable usage limits or attempt to overload our systems</span>
                </li>
                <li className="flex items-start space-x-2">
                  <AlertTriangle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                  <span>Share your account credentials or allow unauthorized access</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle>5. Intellectual Property</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 pt-6">
              <div>
                <h4 className="font-semibold mb-2">Our Content</h4>
                <p className="text-gray-600">
                  All content, features, and functionality of our platform, including but not limited to text, graphics,
                  logos, algorithms, and software, are owned by FixMyResume and protected by copyright and other
                  intellectual property laws.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Your Content</h4>
                <p className="text-gray-600">
                  You retain ownership of your resume content and personal information. By using our services, you grant
                  us a limited license to process your content for the purpose of providing our services.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle>6. Payment Terms</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 pt-6">
              <div>
                <h4 className="font-semibold mb-2">Free Services</h4>
                <p className="text-gray-600">
                  Basic resume analysis is provided free of charge with reasonable usage limits. Free users may have
                  limited access to certain premium features.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Premium Services</h4>
                <p className="text-gray-600">
                  Premium features require a paid subscription. Subscription fees are billed in advance and are
                  non-refundable except as required by law. You may cancel your subscription at any time.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Price Changes</h4>
                <p className="text-gray-600">
                  We reserve the right to change our pricing with 30 days' notice. Price changes will not affect your
                  current billing cycle.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle>7. Disclaimers and Limitations</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 pt-6">
              <div>
                <h4 className="font-semibold mb-2">No Employment Guarantees</h4>
                <p className="text-gray-600">
                  Our services provide guidance and recommendations to improve your resume and job search. We do not
                  guarantee employment, interviews, or any specific career outcomes.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Service Availability</h4>
                <p className="text-gray-600">
                  We strive to maintain high service availability but do not guarantee uninterrupted access. We may
                  perform maintenance or updates that temporarily affect service availability.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Limitation of Liability</h4>
                <p className="text-gray-600">
                  To the maximum extent permitted by law, FixMyResume shall not be liable for any indirect, incidental, or
                  consequential damages arising from your use of our services.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle>8. Termination</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <p className="text-gray-600">
                Either party may terminate this agreement at any time. Upon termination, your access to our services
                will cease, and we may delete your account data in accordance with our Privacy Policy. Provisions that
                by their nature should survive termination will remain in effect.
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle>9. Changes to Terms</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <p className="text-gray-600">
                We may update these terms from time to time. We will notify users of material changes via email or
                platform notification. Your continued use of our services after such changes constitutes acceptance of
                the updated terms.
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle>10. Governing Law</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <p className="text-gray-600">
                These terms are governed by the laws of the State of California, United States. Any disputes will be
                resolved in the courts of San Francisco County, California, or through binding arbitration as we may
                elect.
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle>11. Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <p className="text-gray-600 mb-4">If you have questions about these terms, please contact us:</p>
              <div className="space-y-2 text-gray-600">
                <p>Email: legal@fixmyresume.com</p>
                <p>Address: 123 Innovation Drive, San Francisco, CA 94105</p>
                <p>Phone: +1 (555) 123-4567</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* CTA */}
        <Card className="mt-12 bg-gradient-to-r from-blue-600 to-indigo-600 text-white border-0">
          <CardContent className="p-8 text-center pt-8">
            <h2 className="text-2xl font-bold mb-4">Questions about our terms?</h2>
            <p className="opacity-90 mb-6">Our legal team is available to clarify any questions about these terms.</p>
            <Link to="/contact">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                Contact Legal Team
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
