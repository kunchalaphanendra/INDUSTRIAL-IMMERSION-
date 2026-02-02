
import React from 'react';
import { ENROLLMENT_STEPS, FAQS } from '../constants';

const PricingSection: React.FC = () => {
  return (
    <section id="process" className="py-24 bg-[#050505]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-5xl font-heading font-bold mb-4">Simple Onboarding</h2>
          <p className="text-gray-400">How to get from where you are to the industry floor.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-32">
          {ENROLLMENT_STEPS.map((step, idx) => (
            <div key={idx} className="relative group">
              <div className="glass-card p-8 rounded-3xl h-full border-white/5 group-hover:border-blue-500/20 transition-all text-center">
                <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-xl font-heading font-bold mx-auto mb-6 text-blue-500 group-hover:bg-blue-600 group-hover:text-white transition-all">
                  0{idx + 1}
                </div>
                <h4 className="text-xl font-bold mb-3">{step}</h4>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {idx === 0 && "Submit your professional profile for initial review."}
                  {idx === 1 && "Complete a 15-min assessment call with our leads."}
                  {idx === 2 && "Finalize enrollment to reserve your track seat."}
                  {idx === 3 && "Get added to Slack and start your first project."}
                </p>
              </div>
              {idx < 3 && (
                <div className="hidden md:block absolute top-1/2 -right-2 transform -translate-y-1/2 z-10 text-white/10">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* FAQ Section */}
        <div id="faq" className="max-w-3xl mx-auto pt-20 border-t border-white/5">
          <h2 className="text-3xl font-heading font-bold text-center mb-12">Common Inquiries</h2>
          <div className="space-y-4">
            {FAQS.map((faq, idx) => (
              <details key={idx} className="group glass-card rounded-2xl p-6 border-white/5 cursor-pointer">
                <summary className="flex justify-between items-center list-none font-bold text-gray-200">
                  {faq.question}
                  <span className="text-blue-500 group-open:rotate-180 transition-transform">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                </summary>
                <p className="mt-4 text-gray-500 text-sm leading-relaxed">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
