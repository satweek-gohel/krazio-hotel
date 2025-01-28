import React from 'react';
import { Scale, Clock, CreditCard, ShieldCheck, UserCheck, AlertCircle, FileText, HelpCircle } from 'lucide-react';

const TermsConditions = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 mt-20 md:mt-10">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Terms & Conditions</h1>
          <p className="text-lg text-gray-600">Please read these terms carefully before using our services</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <div className="prose max-w-none">
            <div className="flex items-start gap-4 p-6 bg-[#C8102E]/5 rounded-xl mb-6 transition-transform hover:scale-[1.02]">
              <Scale className="w-8 h-8 text-[#C8102E] flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-xl font-semibold mb-3">Agreement to Terms</h2>
                <p className="text-gray-600">By accessing or using our restaurant services, you agree to be bound by these Terms and Conditions. If you disagree with any part of the terms, you may not access our services.</p>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2 mb-8">
              <div className="p-6 bg-gray-50 rounded-xl hover:shadow-md transition-shadow">
                <Clock className="w-6 h-6 text-[#C8102E] mb-4" />
                <h3 className="text-lg font-semibold mb-2">Order Timing</h3>
                <p className="text-gray-600 text-sm">Orders are subject to restaurant operating hours and delivery zone restrictions. Delivery times are estimates and may vary.</p>
              </div>

              <div className="p-6 bg-gray-50 rounded-xl hover:shadow-md transition-shadow">
                <CreditCard className="w-6 h-6 text-[#C8102E] mb-4" />
                <h3 className="text-lg font-semibold mb-2">Payment Terms</h3>
                <p className="text-gray-600 text-sm">We accept major credit cards and digital payments. All payments must be made at the time of ordering.</p>
              </div>

              <div className="p-6 bg-gray-50 rounded-xl hover:shadow-md transition-shadow">
                <ShieldCheck className="w-6 h-6 text-[#C8102E] mb-4" />
                <h3 className="text-lg font-semibold mb-2">User Obligations</h3>
                <p className="text-gray-600 text-sm">Users must provide accurate information and maintain the security of their account credentials.</p>
              </div>

              <div className="p-6 bg-gray-50 rounded-xl hover:shadow-md transition-shadow">
                <UserCheck className="w-6 h-6 text-[#C8102E] mb-4" />
                <h3 className="text-lg font-semibold mb-2">Account Usage</h3>
                <p className="text-gray-600 text-sm">Each user must maintain only one account and keep their login information confidential.</p>
              </div>
            </div>

            <div className="space-y-6">
              <section className="border-l-4 border-[#C8102E] pl-6">
                <div className="flex items-center gap-3 mb-3">
                  <AlertCircle className="w-5 h-5 text-[#C8102E]" />
                  <h3 className="text-lg font-semibold">Cancellation Policy</h3>
                </div>
                <p className="text-gray-600">Orders can be cancelled within 5 minutes of placing them. After this window, cancellation may not be possible as food preparation may have begun.</p>
              </section>

              <section className="border-l-4 border-[#C8102E] pl-6">
                <div className="flex items-center gap-3 mb-3">
                  <FileText className="w-5 h-5 text-[#C8102E]" />
                  <h3 className="text-lg font-semibold">Refund Policy</h3>
                </div>
                <p className="text-gray-600">Refunds are processed for valid complaints about food quality or delivery issues. Each case is reviewed individually within 24-48 hours.</p>
              </section>

              <section className="border-l-4 border-[#C8102E] pl-6">
                <div className="flex items-center gap-3 mb-3">
                  <HelpCircle className="w-5 h-5 text-[#C8102E]" />
                  <h3 className="text-lg font-semibold">Dispute Resolution</h3>
                </div>
                <p className="text-gray-600">Any disputes will be resolved through our customer service team first. If unresolved, they will be subject to the jurisdiction of local courts.</p>
              </section>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-500 text-sm">Last updated: March 14, 2024</p>
          <p className="text-gray-500 text-sm mt-2">Contact us at support@restaurant.com for any questions about these terms.</p>
        </div>
      </div>
    </div>
  );
};

export default TermsConditions;