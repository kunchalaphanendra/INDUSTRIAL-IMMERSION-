
import { UserRegistration, TrackKey, PaymentStatus } from '../types';

/**
 * PRODUCTION API SERVICE for Supabase (Vite Version)
 * 
 * IMPORTANT: Vite projects (like yours) REQUIRE the "VITE_" prefix.
 * If your Vercel variable is named "BACKEND_API_URL", it will be UNDEFINED.
 * It MUST be named "VITE_BACKEND_API_URL".
 */

const getApiConfig = () => {
  // Accessing Vite environment variables
  const env = (import.meta as any).env || {};

  const baseUrl = (env.VITE_BACKEND_API_URL || '').trim();
  const key = (env.VITE_BACKEND_API_KEY || '').trim();

  return { 
    url: baseUrl ? (baseUrl.replace(/\/$/, '') + '/rest/v1/applications') : '', 
    key 
  };
};

export const apiService = {
  async submitApplication(data: any): Promise<{ success: boolean; error?: string }> {
    const config = getApiConfig();

    // If variables are missing, we provide a very specific instruction to the user
    if (!config.url || !config.key) {
      const missing = [];
      const env = (import.meta as any).env || {};
      if (!env.VITE_BACKEND_API_URL) missing.push("VITE_BACKEND_API_URL");
      if (!env.VITE_BACKEND_API_KEY) missing.push("VITE_BACKEND_API_KEY");

      console.error("Setup Error: Missing variables", missing);
      
      // Fallback for local preview environments
      if (window.location.hostname === 'localhost' || window.location.hostname.includes('stackblitz')) {
        console.log("Local environment detected, simulating success...");
        return { success: true };
      }

      return { 
        success: false, 
        error: `Configuration Error: Missing ${missing.join(' and ')}. Please ensure your Vercel Environment Variables have the "VITE_" prefix exactly as shown in the instructions.` 
      };
    }

    try {
      const response = await fetch(config.url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': config.key,
          'Authorization': `Bearer ${config.key}`,
          'Prefer': 'return=minimal' 
        },
        body: JSON.stringify({
          full_name: data.fullName,
          email: data.email,
          phone: data.phone,
          linkedin: data.linkedin || null,
          current_status: data.currentStatus,
          work_experience: data.workExperience || null,
          career_goals: data.careerGoals,
          track_key: data.track,
          payment_status: data.paymentStatus || 'completed'
        }),
      });

      if (!response.ok) {
        const errText = await response.text();
        return { success: false, error: `Supabase Error: ${errText}` };
      }

      return { success: true };
    } catch (error: any) {
      return { success: false, error: "Connection failed. Please check your internet or Supabase URL." };
    }
  }
};




