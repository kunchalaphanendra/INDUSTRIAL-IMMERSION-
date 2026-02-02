
import React, { useState } from 'react';
import { TrackKey } from '../types';
import { TRACKS } from '../constants';
import TrackDetailModal from './TrackDetailModal';

interface ProgramSelectorProps {
  onSelect: (track: TrackKey) => void;
  selected: TrackKey | null;
}

const ProgramSelector: React.FC<ProgramSelectorProps> = ({ onSelect, selected }) => {
  const [viewingDetails, setViewingDetails] = useState<TrackKey | null>(null);

  return (
    <section id="tracks" className="py-24 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-heading font-bold mb-4">Program Tracks</h2>
          <p className="text-gray-400">Select the depth of immersion required for your career stage.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {Object.values(TrackKey).map((key) => {
            const track = TRACKS[key];
            const isExp = key === TrackKey.EXPERIENCE;
            
            return (
              <div 
                key={key}
                className={`group relative p-1 rounded-3xl transition-all duration-500 flex flex-col ${
                  selected === key 
                    ? (isExp ? 'bg-gradient-to-br from-purple-500 to-pink-500 scale-[1.02]' : 'bg-gradient-to-br from-blue-500 to-purple-500 scale-[1.02]') 
                    : 'bg-white/10'
                }`}
              >
                <div className="bg-[#0a0a0a] rounded-[calc(1.5rem-2px)] p-8 md:p-12 h-full flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start mb-8">
                      <span className={`px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${isExp ? 'bg-purple-600' : 'bg-blue-600'}`}>
                        {track.duration}
                      </span>
                      <div className="text-right">
                        <span className="text-2xl font-heading font-bold text-white block">₹{track.price.toLocaleString()}</span>
                        <span className="text-[9px] text-gray-500 uppercase font-bold tracking-tighter">EMI starting at ₹{Math.round(track.price/12).toLocaleString()}/mo</span>
                      </div>
                    </div>
                    <h3 className="text-3xl font-heading font-bold mb-4 text-white">{track.title}</h3>
                    <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                      {track.description}
                    </p>
                    <ul className="space-y-4 mb-12">
                      {track.features.slice(0, 3).map((f, i) => (
                        <li key={i} className="flex items-center text-gray-300">
                          <span className={`mr-3 ${isExp ? 'text-purple-500' : 'text-blue-500'}`}>✓</span> {f}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-4">
                    <button 
                      onClick={() => onSelect(key)}
                      className={`w-full py-4 rounded-xl font-bold transition-all ${
                        selected === key 
                        ? (isExp ? 'bg-purple-600 text-white' : 'bg-blue-600 text-white') 
                        : 'bg-white text-black hover:bg-gray-200'
                      }`}
                    >
                      {selected === key ? 'Selected Track' : 'Enroll Now'}
                    </button>
                    
                    <button 
                      onClick={() => setViewingDetails(key)}
                      className="w-full py-3 bg-transparent border border-white/10 text-gray-400 hover:text-white hover:border-white/30 rounded-xl font-medium transition-all text-sm flex items-center justify-center gap-2 group"
                    >
                      View Detailed Syllabus
                      <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Detail Modal */}
      {viewingDetails && (
        <TrackDetailModal 
          trackKey={viewingDetails}
          data={TRACKS[viewingDetails]}
          onClose={() => setViewingDetails(null)}
          onEnroll={onSelect}
        />
      )}
    </section>
  );
};

export default ProgramSelector;
