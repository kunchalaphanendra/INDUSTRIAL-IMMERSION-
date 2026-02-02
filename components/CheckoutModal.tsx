
import React, { useState, useEffect } from 'react';
import { EnrollmentState, TrackKey, UserRegistration } from '../types';
import { TRACKS } from '../constants';
import { apiService } from '../services/api';

interface CheckoutModalProps {
  enrollment: EnrollmentState;
  onClose: () => void;
}

const CheckoutModal: React.FC<CheckoutModalProps> = ({ enrollment, onClose }) => {
  const [step, setStep] = useState(1); // 1: Info, 2: Review, 3: Payment, 4: Success
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState(300);
  
  const [formData, setFormData] = useState<UserRegistration>({
    fullName: '',
    email: '',
    phone: '',
    linkedin: '',
    currentStatus: 'Student',
    workExperience: '',
    careerGoals: ''
  });

  useEffect(() => {
    let timer: number;
    if (step === 3 && timeLeft > 0) {
      timer = window.setInterval(() => setTimeLeft(t => t - 1), 1000);
    }
    return () => clearInterval(timer);
  }, [step, timeLeft]);

  if (!enrollment.track) return null;
  const trackData = TRACKS[enrollment.track];

  const UPI_ID = "industrialimmersion@upi"; 
  const upiLink = `upi://pay?pa=${UPI_ID}&pn=Industrial%20Immersion&am=${trackData.price}&cu=INR&tn=Enroll_${formData.fullName.split(' ')[0]}`;

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errorMessage) setErrorMessage(null);
  };

  const validateForm = () => {
    const required = ['fullName', 'email', 'phone', 'currentStatus', 'careerGoals'];
    const missing = required.filter(field => !formData[field as keyof UserRegistration]);
    if (missing.length > 0) {
      setErrorMessage("Please complete all required fields (*)");
      return false;
    }
    return true;
  };

  const handleFinalSubmit = async () => {
    setIsSubmitting(true);
    setErrorMessage(null);

    const result = await apiService.submitApplication({
      ...formData,
      track: enrollment.track,
      paymentStatus: 'completed'
    });

    if (result.success) {
      setStep(4);
    } else {
      setErrorMessage(result.error);
    }
    setIsSubmitting(false);
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/98 backdrop-blur-2xl" onClick={onClose} />
      
      <div className="relative bg-[#080808] border border-white/10 w-full max-w-xl rounded-[2.5rem] overflow-hidden shadow-2xl flex flex-col max-h-[95vh] neon-border">
        {/* Header */}
        <div className="p-8 border-b border-white/5 bg-white/[0.02] flex justify-between items-center">
          <div>
            <div className="flex items-center gap-2 mb-1">
              {[1, 2, 3, 4].map(s => (
                <div key={s} className={`h-1 w-6 rounded-full transition-all ${step >= s ? 'bg-blue-600' : 'bg-white/10'}`} />
              ))}
            </div>
            <h2 className="font-heading font-bold text-xl uppercase tracking-tight text-white">
              {step === 1 && "Personal Profile"}
              {step === 2 && "Final Review"}
              {step === 3 && "Complete Payment"}
              {step === 4 && "Application Secured"}
            </h2>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors text-gray-500">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-10 custom-scrollbar">
          {errorMessage && (
            <div className="mb-8 p-5 bg-red-500/10 border border-red-500/20 text-red-500 text-xs rounded-2xl">
              <div className="flex items-center gap-3 font-bold mb-1">
                <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Submission Failed
              </div>
              <p className="opacity-80">{errorMessage}</p>
            </div>
          )}

          {step === 1 && (
            <form onSubmit={(e) => { e.preventDefault(); if (validateForm()) setStep(2); }} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="col-span-2">
                  <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-3">Full Name *</label>
                  <input 
                    required name="fullName" value={formData.fullName} onChange={handleInputChange}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white focus:border-blue-500 outline-none transition-all placeholder:text-gray-700"
                    placeholder="E.g. John Doe"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-3">Email *</label>
                  <input 
                    required type="email" name="email" value={formData.email} onChange={handleInputChange}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white focus:border-blue-500 outline-none"
                    placeholder="john@example.com"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-3">Phone *</label>
                  <input 
                    required type="tel" name="phone" value={formData.phone} onChange={handleInputChange}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white focus:border-blue-500 outline-none"
                    placeholder="+91"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-3">Current Status *</label>
                  <select 
                    name="currentStatus" value={formData.currentStatus} onChange={handleInputChange}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white focus:border-blue-500 outline-none appearance-none"
                  >
                    <option value="Student">Student</option>
                    <option value="Fresher">Fresher</option>
                    <option value="Professional">Professional</option>
                    <option value="Entrepreneur">Entrepreneur</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-3">LinkedIn</label>
                  <input 
                    name="linkedin" value={formData.linkedin} onChange={handleInputChange}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white focus:border-blue-500 outline-none"
                    placeholder="Optional URL"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-3">What are your career goals? *</label>
                <textarea 
                  required name="careerGoals" value={formData.careerGoals} onChange={handleInputChange}
                  rows={3}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white focus:border-blue-500 outline-none resize-none"
                  placeholder="I want to gain practical experience in brand management..."
                />
              </div>

              <button type="submit" className="w-full py-5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl transition-all shadow-xl shadow-blue-500/20 text-lg uppercase tracking-widest">
                Review Application
              </button>
            </form>
          )}

          {step === 2 && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-6">
              <div className="p-6 bg-blue-500/5 border border-blue-500/20 rounded-3xl">
                <p className="text-[10px] text-gray-500 font-bold uppercase mb-2">Track Selected</p>
                <p className="font-bold text-white text-xl">{trackData.title}</p>
                <div className="mt-4 flex justify-between items-end">
                   <p className="text-gray-400 text-sm">Duration: {trackData.duration}</p>
                   <p className="text-blue-500 font-bold text-2xl">₹{trackData.price.toLocaleString()}</p>
                </div>
              </div>

              <div className="bg-white/5 p-8 rounded-3xl border border-white/5 space-y-6">
                <div className="flex justify-between items-center border-b border-white/5 pb-4">
                  <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest">Your Profile</h4>
                  <button onClick={() => setStep(1)} className="text-blue-500 text-[10px] font-bold uppercase hover:underline">Modify</button>
                </div>
                <div className="grid grid-cols-2 gap-y-4 text-sm">
                  <div>
                    <p className="text-gray-600 text-[10px] font-bold uppercase mb-1">Full Name</p>
                    <p className="text-white">{formData.fullName}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 text-[10px] font-bold uppercase mb-1">Phone</p>
                    <p className="text-white">{formData.phone}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-gray-600 text-[10px] font-bold uppercase mb-1">Email</p>
                    <p className="text-white">{formData.email}</p>
                  </div>
                </div>
              </div>

              <button 
                onClick={() => setStep(3)} 
                className="w-full py-6 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl transition-all shadow-xl shadow-blue-500/30 text-xl flex items-center justify-center gap-3"
              >
                Proceed to UPI Payment
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>
            </div>
          )}

          {step === 3 && (
            <div className="text-center py-6 space-y-10 animate-in zoom-in duration-300">
               <div>
                  <h3 className="text-2xl font-bold mb-3 text-white">Scan to Secure Seat</h3>
                  <p className="text-gray-500 text-sm">Use Google Pay, PhonePe, Paytm, or BHIM</p>
               </div>

               <div className="relative group max-w-[260px] mx-auto">
                  <div className="absolute inset-0 bg-blue-600 blur-3xl opacity-20 group-hover:opacity-30 transition-opacity rounded-full" />
                  <div className="relative p-6 bg-white rounded-[2.5rem] shadow-2xl">
                    <div className="w-52 h-52 bg-gray-50 flex items-center justify-center rounded-3xl border-2 border-dashed border-gray-200">
                      <div className="text-center px-4">
                        <div className="w-10 h-10 bg-blue-600 rounded-xl mx-auto mb-4 flex items-center justify-center text-white">
                           <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                           </svg>
                        </div>
                        <p className="text-xs font-bold text-gray-500 leading-tight uppercase tracking-tight">DYNAMIC UPI QR<br/>FOR ₹{trackData.price}</p>
                      </div>
                    </div>
                  </div>
                  <a href={upiLink} className="md:hidden mt-6 inline-flex items-center gap-2 px-6 py-3 bg-white/10 rounded-full text-white font-bold border border-white/10 hover:bg-white/20 transition-all">
                     Open in App
                  </a>
               </div>

               <div className="space-y-4">
                  <div className="inline-flex items-center gap-3 px-4 py-2 bg-white/5 rounded-full text-xs text-gray-400 border border-white/5">
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(59,130,246,0.8)]" />
                    Secure Payment Gateway Active
                  </div>
                  <p className="text-sm font-mono text-blue-500 font-bold">Session expires in: {formatTime(timeLeft)}</p>
               </div>

               <div className="pt-6 space-y-6">
                  <p className="text-[10px] text-gray-500 uppercase font-bold tracking-[0.2em] px-12 leading-loose">
                    Post payment, click the button below. Your application details and payment confirmation will be pushed to our database immediately.
                  </p>
                  <button 
                    onClick={handleFinalSubmit} 
                    disabled={isSubmitting}
                    className={`w-full py-6 rounded-2xl font-bold text-xl flex items-center justify-center gap-3 transition-all ${
                      isSubmitting ? 'bg-blue-600/50 cursor-not-allowed text-white/50' : 'bg-blue-600 hover:bg-blue-700 text-white shadow-2xl shadow-blue-500/40'
                    }`}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-6 h-6 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                        <span>Confirming with DB...</span>
                      </>
                    ) : (
                      "Confirm Payment & Submit"
                    )}
                  </button>
                  <button onClick={() => setStep(2)} className="text-xs text-gray-600 hover:text-white transition-colors uppercase font-bold tracking-widest">
                    Cancel and Return
                  </button>
               </div>
            </div>
          )}

          {step === 4 && (
            <div className="text-center py-12 animate-in zoom-in duration-500">
              <div className="w-28 h-28 bg-green-500/10 border-2 border-green-500/30 rounded-full flex items-center justify-center mx-auto mb-10 text-green-500 shadow-[0_0_50px_rgba(34,197,94,0.1)]">
                <svg className="w-14 h-14" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-4xl font-heading font-bold mb-6 text-white">Application Secured!</h3>
              <p className="text-gray-400 mb-14 text-lg max-w-sm mx-auto leading-relaxed">
                Your profile has been pushed to the <span className="text-white font-bold">Industrial Immersion</span> ops team. Check WhatsApp/Email for the welcome kit.
              </p>
              <button onClick={onClose} className="w-full py-6 bg-white text-black font-bold rounded-2xl hover:bg-gray-200 transition-all text-xl shadow-2xl">
                Start the Immersion
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CheckoutModal;
