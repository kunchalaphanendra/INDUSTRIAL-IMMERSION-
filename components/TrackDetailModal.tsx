
import React from 'react';
import { TrackKey, TrackData } from '../types';
import { CORE_AREAS } from '../constants';

interface TrackDetailModalProps {
  trackKey: TrackKey;
  data: TrackData;
  onClose: () => void;
  onEnroll?: (key: TrackKey) => void;
}

const TrackDetailModal: React.FC<TrackDetailModalProps> = ({ trackKey, data, onClose, onEnroll }) => {
  const isExp = trackKey === TrackKey.EXPERIENCE;

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/95 backdrop-blur-md" onClick={onClose} />
      
      {/* Modal Content */}
      <div className="relative bg-[#0a0a0a] border border-white/10 w-full max-w-4xl max-h-[90vh] rounded-3xl overflow-hidden shadow-2xl flex flex-col">
        {/* Sticky Header */}
        <div className="p-6 border-b border-white/5 flex justify-between items-center bg-black/50 backdrop-blur-lg">
          <div>
            <span className={`text-[10px] font-bold uppercase tracking-[0.2em] mb-1 block ${isExp ? 'text-purple-500' : 'text-blue-500'}`}>
              Detailed Syllabus & Roadmap
            </span>
            <h2 className="font-heading font-bold text-2xl">{data.title}</h2>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors text-gray-400">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="p-8 overflow-y-auto custom-scrollbar space-y-12 text-white">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-xl font-heading font-bold text-white">Program Structure</h3>
              <div className="flex items-center gap-3 text-sm text-gray-400">
                <div className="px-3 py-1 bg-white/5 rounded-md border border-white/10 text-[10px] font-bold uppercase">Training</div>
                <span className="text-blue-500">→</span>
                <div className="px-3 py-1 bg-white/5 rounded-md border border-white/10 text-[10px] font-bold uppercase">Execution</div>
                <span className="text-blue-500">→</span>
                <div className="px-3 py-1 bg-white/5 rounded-md border border-white/10 text-[10px] font-bold uppercase">Evaluation</div>
              </div>
              <p className="text-gray-400 leading-relaxed">
                This {data.duration} program is designed as a deep-dive into industry execution. 
                {isExp 
                  ? " You will work on real-life projects and get hands-on work experience that translates directly to the professional world. Beyond just training, you will earn Experience Letters and personal Recommendations from the companies themselves, validating your contribution to real-world brand success."
                  : " You will focus on high-intensity practical training sessions with weekly deliverables that simulate real-world agency tasks."}
              </p>
            </div>
            <div className="bg-white/5 rounded-2xl p-6 border border-white/5">
              <h4 className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-4">Core Modules</h4>
              <ul className="grid grid-cols-1 gap-3">
                {CORE_AREAS.map((area, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-gray-300">
                    <span className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                    {area}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-heading font-bold text-white mb-6">Execution Roadmap</h3>
            <div className="space-y-4">
              {[
                { week: 'Week 1-2', focus: 'Foundational Strategy & Tooling', detail: 'Onboarding to industry-standard project management and analytics tools.' },
                { week: 'Week 3-4', focus: 'Creative Execution & Branding', detail: 'Developing content calendars and visual identity assets for live pilots.' },
                { week: isExp ? 'Week 5-12' : 'Week 5-6', focus: isExp ? 'Live Project Management' : 'Performance Optimization', detail: isExp ? 'Full-scale execution of brand campaigns and direct influencer outreach on behalf of real brands.' : 'Analyzing delivery data and refining execution quality.' },
              ].map((item, i) => (
                <div key={i} className="flex gap-6 p-4 rounded-xl hover:bg-white/5 transition-colors border border-transparent hover:border-white/5">
                  <div className="shrink-0 w-24 text-blue-500 font-bold text-sm pt-1 uppercase">{item.week}</div>
                  <div>
                    <h5 className="font-bold text-white mb-1">{item.focus}</h5>
                    <p className="text-sm text-gray-500">{item.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-white/5">
            <div>
              <h3 className="text-lg font-heading font-bold mb-4">Evaluation Criteria</h3>
              <ul className="space-y-3">
                {['90% Attendance Requirement', 'Execution Quality Index', 'Timely Assignment Submission', 'Professional Conduct'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-gray-400">
                    <span className="text-red-500 text-xs font-bold">●</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="p-6 bg-gradient-to-br from-blue-900/20 to-purple-900/20 rounded-2xl border border-white/10">
              <h3 className="text-lg font-heading font-bold mb-4">Professional Proof</h3>
              <div className="space-y-2 text-sm text-gray-300">
                <p>• {isExp ? 'Official Experience Letter from Partner Brand' : 'Unique Certificate ID for Verification'}</p>
                <p>• {isExp ? 'Personal Recommendation from Company Founder' : 'QR-based Online Profile'}</p>
                <p>• Lifetime Digital Validity</p>
                <p>• Issued by Registered Tech Entity</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Action */}
        <div className="p-6 bg-white/5 border-t border-white/5 flex gap-4 justify-center">
           <button 
             onClick={onClose}
             className="px-8 py-4 bg-white/5 border border-white/10 text-white font-bold rounded-xl hover:bg-white/10 transition-all"
           >
             Close Details
           </button>
           {onEnroll && (
             <button 
               onClick={() => {
                 onEnroll(trackKey);
                 onClose();
               }}
               className="px-12 py-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20"
             >
               Apply for this Track
             </button>
           )}
        </div>
      </div>
    </div>
  );
};

export default TrackDetailModal;
