
import React from 'react';
import { CORE_AREAS, WORK_ITEMS } from '../constants';

const Features: React.FC = () => {
  return (
    <div id="why" className="space-y-32 py-24">
      {/* Comparison Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-heading font-bold mb-6">The <span className="text-blue-500">Industry Gap</span></h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">Traditional education stops at theory. We start where theory ends.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Traditional Education */}
          <div className="glass-card rounded-3xl p-10 border-red-500/10">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 bg-red-500/10 rounded-full flex items-center justify-center text-red-500">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                </svg>
              </div>
              <h3 className="text-2xl font-heading font-bold">Traditional Learning</h3>
            </div>
            <ul className="space-y-6">
              {[
                { label: 'Heavy Theory', sub: 'Books, Lectures, and rote memorization.' },
                { label: 'Mock Assignments', sub: 'Simulated tasks with no real-world stakes.' },
                { label: 'Static Resume', sub: 'Certificates that show hours, not impact.' },
                { label: 'Disconnected', sub: 'No direct contact with industry leaders.' }
              ].map((item, idx) => (
                <li key={idx} className="flex gap-4">
                  <span className="text-red-500 shrink-0">✕</span>
                  <div>
                    <p className="font-bold text-gray-300">{item.label}</p>
                    <p className="text-sm text-gray-500">{item.sub}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Industrial Immersion */}
          <div className="glass-card rounded-3xl p-10 border-blue-500/30 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4">
               <span className="px-3 py-1 bg-blue-600 rounded-full text-[10px] font-bold uppercase tracking-widest animate-pulse">Superior</span>
            </div>
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center text-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.3)]">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-2xl font-heading font-bold text-blue-400">Industrial Immersion</h3>
            </div>
            <ul className="space-y-6">
              {[
                { label: 'Execution Focus', sub: '100% focused on getting the work done.' },
                { label: 'Live Deliverables', sub: 'Projects for real brands with real budgets.' },
                { label: 'Verifiable Proof', sub: 'Experience letters and founders\' recommendations.' },
                { label: 'Direct Access', sub: 'Work directly under agency leads and entrepreneurs.' }
              ].map((item, idx) => (
                <li key={idx} className="flex gap-4">
                  <span className="text-blue-500 shrink-0">✓</span>
                  <div>
                    <p className="font-bold text-white">{item.label}</p>
                    <p className="text-sm text-gray-400">{item.sub}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Stats Ticker */}
      <section className="border-y border-white/5 py-12 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { val: '100+', label: 'Live Brands' },
            { val: '500+', label: 'Deliverables Completed' },
            { val: '1000+', label: 'Students Trained' },
            { val: '₹1Cr+', label: 'Ad Spend Managed' }
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <p className="text-3xl md:text-4xl font-heading font-bold text-white mb-1">{stat.val}</p>
              <p className="text-xs text-gray-500 uppercase tracking-widest">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Deliverables Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-heading font-bold mb-4">The Output</h2>
          <p className="text-gray-500">Your portfolio will be built with these real-world assets.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {WORK_ITEMS.map((item, idx) => (
            <div key={idx} className="glass-card p-8 rounded-2xl flex flex-col items-center hover:scale-105 transition-all glow-on-hover">
              <div className="text-5xl mb-6">{item.icon}</div>
              <h4 className="text-lg font-bold text-white">{item.title}</h4>
              <p className="text-sm text-gray-500 mt-2">Professional-grade asset</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Features;
