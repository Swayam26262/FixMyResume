import { Link } from "react-router-dom";
import { FileText, Shield, Eye, Lock, Users, Globe } from "lucide-react";

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

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Shield className="w-8 h-8 text-blue-600" />
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">
            Privacy{" "}
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Policy</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Your privacy is our priority. Learn how we collect, use, and protect your personal information.
          </p>
          <p className="text-sm text-gray-500 mt-4">Last updated: June 16, 2024</p>
        </div>

        {/* Quick Overview */}
        <Card className="mb-12 border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Eye className="w-5 h-5 text-blue-600" />
              <span>Privacy at a Glance</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="grid md:grid-cols-3 gap-6 pt-6">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto">
                <Lock className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-semibold">Secure by Design</h3>
              <p className="text-sm text-gray-600">Enterprise-grade encryption protects your data</p>
            </div>
            <div className="text-center space-y-2">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-semibold">No Data Sharing</h3>
              <p className="text-sm text-gray-600">We never sell or share your personal information</p>
            </div>
            <div className="text-center space-y-2">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto">
                <Globe className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-semibold">GDPR Compliant</h3>
              <p className="text-sm text-gray-600">Full compliance with international privacy laws</p>
            </div>
          </CardContent>
        </Card>

        {/* Privacy Policy Content */}
        <div className="space-y-8">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle>1. Information We Collect</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 pt-6">
              <div>
                <h4 className="font-semibold mb-2">Personal Information</h4>
                <p className="text-gray-600">
                  When you create an account, we collect your name, email address, and password. This information is
                  necessary to provide our services and communicate with you about your account.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Resume Data</h4>
                <p className="text-gray-600">
                  When you upload your resume for analysis, we temporarily process the content to provide scoring and
                  recommendations. Your resume data is automatically deleted after analysis unless you choose to save it
                  in your account.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Usage Information</h4>
                <p className="text-gray-600">
                  We collect information about how you use our platform, including pages visited, features used, and
                  time spent on the platform. This helps us improve our services and user experience.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle>2. How We Use Your Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 pt-6">
              <div>
                <h4 className="font-semibold mb-2">Service Provision</h4>
                <p className="text-gray-600">
                  We use your information to provide resume analysis, generate recommendations, and deliver our core
                  services. This includes processing your resume content through our AI algorithms.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Communication</h4>
                <p className="text-gray-600">
                  We may send you service-related emails, such as account confirmations, analysis results, and important
                  updates about our platform. You can opt out of marketing communications at any time.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Improvement and Analytics</h4>
                <p className="text-gray-600">
                  We analyze usage patterns to improve our AI algorithms, enhance user experience, and develop new
                  features. All analytics are performed on aggregated, anonymized data.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle>3. Data Security</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 pt-6">
              <div>
                <h4 className="font-semibold mb-2">Encryption</h4>
                <p className="text-gray-600">
                  All data is encrypted in transit using TLS 1.3 and at rest using AES-256 encryption. Your resume
                  content is processed in secure, isolated environments.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Access Controls</h4>
                <p className="text-gray-600">
                  Access to your personal data is strictly limited to authorized personnel who need it to provide
                  support or maintain our services. All access is logged and monitored.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Data Retention</h4>
                <p className="text-gray-600">
                  Resume content uploaded for analysis is automatically deleted within 24 hours unless saved to your
                  account. Account data is retained until you delete your account or request data deletion.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle>4. Your Rights</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 pt-6">
              <div>
                <h4 className="font-semibold mb-2">Access and Portability</h4>
                <p className="text-gray-600">
                  You have the right to access all personal data we have about you and to receive a copy of your data in
                  a portable format.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Correction and Deletion</h4>
                <p className="text-gray-600">
                  You can update your personal information at any time through your account settings. You also have the
                  right to request deletion of your personal data.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Opt-Out</h4>
                <p className="text-gray-600">
                  You can opt out of marketing communications and certain data processing activities. Essential service
                  communications cannot be disabled while your account is active.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle>5. Third-Party Services</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 pt-6">
              <div>
                <h4 className="font-semibold mb-2">Service Providers</h4>
                <p className="text-gray-600">
                  We work with trusted third-party service providers for hosting, analytics, and payment processing.
                  These providers are contractually bound to protect your data and use it only for specified purposes.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">No Data Sales</h4>
                <p className="text-gray-600">
                  We do not sell, rent, or trade your personal information to third parties for marketing or any other
                  purposes. Your data is yours, and we respect that.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle>6. International Transfers</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <p className="text-gray-600">
                Our services are hosted in secure data centers in the United States. If you are accessing our services
                from outside the US, your data may be transferred to and processed in the US. We ensure appropriate
                safeguards are in place for international data transfers in compliance with applicable privacy laws.
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle>7. Children's Privacy</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <p className="text-gray-600">
                Our services are not intended for children under 13 years of age. We do not knowingly collect personal
                information from children under 13. If you believe we have collected information from a child under 13,
                please contact us immediately.
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle>8. Changes to This Policy</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <p className="text-gray-600">
                We may update this privacy policy from time to time to reflect changes in our practices or applicable
                laws. We will notify you of any material changes by email or through our platform. Your continued use of
                our services after such changes constitutes acceptance of the updated policy.
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle>9. Contact Us</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <p className="text-gray-600 mb-4">
                If you have any questions about this privacy policy or our data practices, please contact us:
              </p>
              <div className="space-y-2 text-gray-600">
                <p>Email: privacy@fixmyresume.com</p>
                <p>Address: 123 Innovation Drive, San Francisco, CA 94105</p>
                <p>Phone: +1 (555) 123-4567</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* CTA */}
        <Card className="mt-12 bg-gradient-to-r from-blue-600 to-indigo-600 text-white border-0">
          <CardContent className="p-8 text-center pt-8">
            <h2 className="text-2xl font-bold mb-4">Questions about your privacy?</h2>
            <p className="opacity-90 mb-6">Our privacy team is here to help you understand how we protect your data.</p>
            <Link to="/contact">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                Contact Privacy Team
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
