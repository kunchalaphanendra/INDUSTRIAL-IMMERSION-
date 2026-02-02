
import React from 'react';

const Hero: React.FC = () => {
  const scrollToTracks = () => {
    const element = document.getElementById('tracks');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[600px] h-[600px] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative text-center">
        <div className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-900/20 border border-blue-500/30 rounded-full text-blue-400 text-sm mb-8">
          <span className="font-heading font-bold tracking-widest uppercase">Learn by Doing</span>
        </div>
        
        <h1 className="text-5xl md:text-8xl font-heading font-extrabold mb-8 leading-[1.1] tracking-tight">
          Practical Industry <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Immersion Program</span>
        </h1>
        <p className="max-w-2xl mx-auto text-xl md:text-2xl text-gray-400 mb-12 font-light">
          Bridge the gap between theory and execution. Gain real work experience with live projects and professional teams.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button 
            onClick={scrollToTracks}
            className="w-full sm:w-auto px-10 py-5 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-bold text-lg transition-all shadow-xl shadow-blue-500/20"
          >
            View Program Tracks
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
