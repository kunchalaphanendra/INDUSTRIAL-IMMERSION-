
import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProgramSelector from './components/ProgramSelector';
import PricingSection from './components/PricingSection';
import Features from './components/Features';
import Footer from './components/Footer';
import CheckoutModal from './components/CheckoutModal';
import { PARTNERS } from './constants';
import { TrackKey, EnrollmentState } from './types';

const PartnersSection: React.FC = () => (
  <section className="py-12 bg-black border-y border-white/5 overflow-hidden">
    <div className="mb-8 text-center text-[10px] font-bold text-gray-500 uppercase tracking-[0.3em]">Collaborating with Brands Like</div>
    <div className="flex animate-marquee whitespace-nowrap">
      {[...PARTNERS, ...PARTNERS].map((p, i) => (
        <span key={i} className="mx-12 text-2xl font-heading font-bold text-white/20 hover:text-blue-500/40 transition-colors">
          {p}
        </span>
      ))}
    </div>
  </section>
);

const GetStarted: React.FC = () => {
  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="get-started" className="py-24 bg-gradient-to-b from-[#050505] to-black">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <div className="glass-card p-12 md:p-20 rounded-[3rem] border-blue-500/20 relative overflow-hidden group">
          <div className="absolute inset-0 bg-blue-600/5 opacity-0 group-hover:opacity-100 transition-opacity" />
          <h2 className="text-4xl md:text-6xl font-heading font-bold mb-8">Ready to <span className="text-blue-500">Scale?</span></h2>
          <p className="text-gray-400 text-lg md:text-xl mb-12 max-w-2xl mx-auto">
            Stop wondering if you're ready. Start building your industrial career today with our execution-first program.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <button 
              onClick={() => scrollTo('tracks')} 
              className="w-full sm:w-auto px-12 py-5 bg-blue-600 text-white font-bold rounded-2xl hover:bg-blue-700 transition-all shadow-xl shadow-blue-500/20 text-lg"
            >
              Choose Your Track
            </button>
            <button 
              onClick={() => scrollTo('process')} 
              className="w-full sm:w-auto px-12 py-5 border border-white/10 text-white font-bold rounded-2xl hover:bg-white/5 transition-all text-lg"
            >
              Review Roadmap
            </button>
          </div>
          <div className="mt-12 flex items-center justify-center gap-8 grayscale opacity-50">
             <div className="flex flex-col items-center">
                <span className="text-white font-bold text-2xl">4.9/5</span>
                <span className="text-[10px] uppercase font-bold text-gray-500 tracking-widest">Student Rating</span>
             </div>
             <div className="w-px h-8 bg-white/10" />
             <div className="flex flex-col items-center">
                <span className="text-white font-bold text-2xl">2.5k+</span>
                <span className="text-[10px] uppercase font-bold text-gray-500 tracking-widest">Alumni Network</span>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const App: React.FC = () => {
  const [selectedTrack, setSelectedTrack] = useState<TrackKey | null>(null);
  const [enrollment, setEnrollment] = useState<EnrollmentState | null>(null);

  const handleTrackSelect = (track: TrackKey) => {
    setSelectedTrack(track);
    setEnrollment({ track });
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <PartnersSection />
        <Features />
        <ProgramSelector 
          selected={selectedTrack} 
          onSelect={handleTrackSelect} 
        />
        <PricingSection />
        <GetStarted />
      </main>
      <Footer />
      {enrollment && (
        <CheckoutModal 
          enrollment={enrollment} 
          onClose={() => setEnrollment(null)} 
        />
      )}
    </div>
  );
};

export default App;
