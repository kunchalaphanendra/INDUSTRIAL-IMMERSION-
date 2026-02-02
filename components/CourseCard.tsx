
import React from 'react';
import { SpecializationKey, CourseData, BillingCycle } from '../types';

interface CourseCardProps {
  id: SpecializationKey;
  data: CourseData;
  price: number;
  billing: BillingCycle;
  onEnroll: (id: SpecializationKey) => void;
}

const CourseCard: React.FC<CourseCardProps> = ({ id, data, price, billing, onEnroll }) => {
  return (
    <div className="glass-card rounded-3xl p-8 flex flex-col justify-between group hover:border-blue-500/30 transition-all duration-300">
      <div>
        <h3 className="text-2xl font-heading font-bold mb-4">{data.title}</h3>
        <p className="text-gray-400 text-sm mb-6 leading-relaxed">{data.description}</p>
        
        <div className="space-y-4 mb-8">
          <p className="text-xs font-bold uppercase tracking-widest text-gray-500">Key Outcomes</p>
          <div className="flex flex-wrap gap-2">
            {data.outcomes.map((outcome, idx) => (
              <span key={idx} className="px-3 py-1 bg-white/5 text-gray-300 rounded-full text-[10px] font-medium border border-white/5">
                {outcome}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="pt-8 border-t border-white/5">
        <div className="flex items-baseline justify-between mb-6">
          <div className="flex flex-col">
            <span className="text-gray-400 text-xs font-medium">Starting from</span>
            <span className="text-3xl font-heading font-bold text-white">₹{price.toLocaleString()}</span>
          </div>
          <span className="text-gray-500 text-sm">/ {billing === BillingCycle.MONTHLY ? 'mo' : 'yr'}</span>
        </div>
        <button 
          onClick={() => onEnroll(id)}
          className="w-full py-4 bg-white text-black font-bold rounded-xl hover:bg-blue-600 hover:text-white transition-all transform active:scale-95"
        >
          Enroll Now
        </button>
      </div>
    </div>
  );
};

export default CourseCard;
