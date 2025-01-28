import React from 'react';
import { Shield, Lock, Eye, Users, Bell, Mail, Cookie, Scale } from 'lucide-react';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 mt-20 md:mt-20">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
          <p className="text-lg text-gray-600">Your privacy is our top priority</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 mb-8">
          <div className="grid gap-8 md:grid-cols-2">
            <div className="bg-[#C8102E]/5 rounded-xl p-6 transition-transform hover:scale-[1.02]">
              <Shield className="w-8 h-8 text-[#C8102E] mb-4" />
              <h2 className="text-xl font-semibold mb-3">Data Protection</h2>
              <p className="text-gray-600">We implement robust security measures to protect your personal information from unauthorized access and maintain data accuracy.</p>
            </div>

            <div className="bg-[#C8102E]/5 rounded-xl p-6 transition-transform hover:scale-[1.02]">
              <Lock className="w-8 h-8 text-[#C8102E] mb-4" />
              <h2 className="text-xl font-semibold mb-3">Secure Transactions</h2>
              <p className="text-gray-600">All payment transactions are encrypted using SSL technology to ensure your financial information remains confidential.</p>
            </div>

            <div className="bg-[#C8102E]/5 rounded-xl p-6 transition-transform hover:scale-[1.02]">
              <Eye className="w-8 h-8 text-[#C8102E] mb-4" />
              <h2 className="text-xl font-semibold mb-3">Information Usage</h2>
              <p className="text-gray-600">We collect and use your information transparently to enhance your dining experience and improve our services.</p>
            </div>

            <div className="bg-[#C8102E]/5 rounded-xl p-6 transition-transform hover:scale-[1.02]">
              <Users className="w-8 h-8 text-[#C8102E] mb-4" />
              <h2 className="text-xl font-semibold mb-3">Third-Party Sharing</h2>
              <p className="text-gray-600">We never sell your personal information to third parties. Data sharing is limited to essential service providers.</p>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <section className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
            <Bell className="w-6 h-6 text-[#C8102E] mb-4" />
            <h3 className="text-xl font-semibold mb-4">Communications</h3>
            <p className="text-gray-600 leading-relaxed">
              By using our services, you agree to receive order confirmations, delivery updates, and essential service notifications. You can opt out of marketing communications at any time.
            </p>
          </section>

          <section className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
            <Mail className="w-6 h-6 text-[#C8102E] mb-4" />
            <h3 className="text-xl font-semibold mb-4">Email Marketing</h3>
            <p className="text-gray-600 leading-relaxed">
              If you subscribe to our newsletter, we'll send you updates about special offers, new menu items, and restaurant news. You can unsubscribe with one click.
            </p>
          </section>

          <section className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
            <Cookie className="w-6 h-6 text-[#C8102E] mb-4" />
            <h3 className="text-xl font-semibold mb-4">Cookies Policy</h3>
            <p className="text-gray-600 leading-relaxed">
              We use cookies to enhance your browsing experience, analyze site traffic, and personalize content. You can control cookie preferences through your browser settings.
            </p>
          </section>
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-500 text-sm">Last updated: March 14, 2024</p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;