
import React from 'react';

const Footer: React.FC = () => {
  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="pt-24 pb-12 bg-black border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-6 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center font-heading font-extrabold text-white text-xl">I</div>
              <span className="font-heading font-bold text-lg tracking-tight">INDUSTRIAL IMMERSION</span>
            </div>
            <p className="text-gray-500 max-w-sm mb-8">
              Revolutionizing professional education through radical industry transparency and hands-on work experience.
            </p>
            <div className="flex space-x-4">
              {['LinkedIn', 'Twitter', 'Instagram'].map(social => (
                <button 
                  key={social} 
                  onClick={(e) => e.preventDefault()}
                  className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors"
                >
                  <span className="sr-only">{social}</span>
                  <div className="w-4 h-4 bg-gray-400 rounded-sm" />
                </button>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="font-heading font-bold text-sm mb-6 uppercase tracking-widest text-white">Programs</h4>
            <ul className="space-y-4 text-gray-500 text-sm">
              <li><button onClick={() => scrollTo('tracks')} className="hover:text-white transition-colors">Influencer Cohort</button></li>
              <li><button onClick={() => scrollTo('tracks')} className="hover:text-white transition-colors">Management Suite</button></li>
              <li><button onClick={() => scrollTo('tracks')} className="hover:text-white transition-colors">Finance Pro</button></li>
              <li><button onClick={() => scrollTo('tracks')} className="hover:text-white transition-colors">Corporate Immersion</button></li>
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-bold text-sm mb-6 uppercase tracking-widest text-white">Explore</h4>
            <ul className="space-y-4 text-gray-500 text-sm">
              <li><button onClick={() => scrollTo('why')} className="hover:text-white transition-colors">About Us</button></li>
              <li><button onClick={() => scrollTo('process')} className="hover:text-white transition-colors">Process</button></li>
              <li><button onClick={() => scrollTo('faq')} className="hover:text-white transition-colors">FAQ</button></li>
              <li><button onClick={(e) => e.preventDefault()} className="hover:text-white transition-colors">Privacy Policy</button></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-xs text-gray-600">
          <p>© 2024 Industrial Immersion Program. All Rights Reserved.</p>
          <p className="mt-4 md:mt-0">Built for the future of professional excellence.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
