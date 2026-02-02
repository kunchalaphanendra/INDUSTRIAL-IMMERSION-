
import React from 'react';

const Navbar: React.FC = () => {
  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-black/80 backdrop-blur-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center space-x-2 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center font-heading font-extrabold text-white text-xl">I</div>
            <span className="font-heading font-bold text-lg tracking-tight hidden sm:block">INDUSTRIAL IMMERSION</span>
          </div>
          
          <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-gray-400">
            <button onClick={() => scrollTo('why')} className="hover:text-white transition-colors">Why Us</button>
            <button onClick={() => scrollTo('tracks')} className="hover:text-white transition-colors">Programs</button>
            <button onClick={() => scrollTo('process')} className="hover:text-white transition-colors">Process</button>
            <button onClick={() => scrollTo('faq')} className="hover:text-white transition-colors">FAQ</button>
            <button 
              onClick={() => scrollTo('tracks')} 
              className="px-5 py-2.5 bg-white text-black rounded-full font-bold hover:bg-blue-600 hover:text-white transition-all"
            >
              Apply Now
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
