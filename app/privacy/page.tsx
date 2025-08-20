import Header from '@/components/Header'
import Footer from '@/components/Footer'
import AdZone from '@/components/AdZone'

export const metadata = {
  title: 'Privacy Policy - CitizenTest Canada',
  description: 'Privacy policy for CitizenTest Canada. Learn how we collect, use, and protect your information.',
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Privacy Policy</h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600 mb-6">
              <strong>Last updated:</strong> {new Date().toLocaleDateString('en-CA')}
            </p>
            
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Information We Collect</h2>
            <p className="text-gray-600 mb-4">
              We collect information you provide directly to us, such as when you create an account, 
              take practice tests, or contact us for support. This may include your name, email address, 
              and test results.
            </p>
            
            <h2 className="text-xl font-semibold text-gray-900 mb-4">How We Use Your Information</h2>
            <p className="text-gray-600 mb-4">
              We use the information we collect to provide, maintain, and improve our services, 
              to communicate with you, and to personalize your experience.
            </p>
            
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Cookies and Tracking</h2>
            <p className="text-gray-600 mb-4">
              We use cookies and similar tracking technologies to enhance your experience and 
              to analyze how our website is used. This includes Google AdSense cookies for 
              advertising purposes.
            </p>
            
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Google AdSense</h2>
            <p className="text-gray-600 mb-4">
              Our website uses Google AdSense to display advertisements. Google AdSense uses 
              cookies to serve ads based on your visits to our site and other sites. You can 
              opt out of personalized advertising by visiting 
              <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline ml-1">
                Google Ads Settings
              </a>.
            </p>
            
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Data Security</h2>
            <p className="text-gray-600 mb-4">
              We implement appropriate security measures to protect your personal information 
              against unauthorized access, alteration, disclosure, or destruction.
            </p>
            
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Contact Us</h2>
            <p className="text-gray-600 mb-4">
              If you have any questions about this Privacy Policy, please contact us at{' '}
              <a href="mailto:info@citizentestcanada.com" className="text-blue-600 hover:underline">
                info@citizentestcanada.com
              </a>.
            </p>
          </div>
        </div>
      </div>

      <AdZone position="privacy-bottom" />
      
      <Footer />
    </div>
  )
}
