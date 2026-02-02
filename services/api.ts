
import { UserRegistration, TrackKey, PaymentStatus } from '../types';

/**
 * PRODUCTION API SERVICE for Supabase
 * 
 * Required Environment Variables (Set these in Vercel/Netlify):
 * - BACKEND_API_URL: Your Supabase URL + /rest/v1/applications
 * - BACKEND_API_KEY: Your Supabase 'anon' public key
 */

const getApiConfig = () => {
  // Supports standard environment variable names and common framework prefixes
  const url = (
    process.env.BACKEND_API_URL || 
    (process.env as any).VITE_BACKEND_API_URL || 
    (process.env as any).REACT_APP_BACKEND_API_URL || 
    ''
  ).trim();

  const key = (
    process.env.BACKEND_API_KEY || 
    (process.env as any).VITE_BACKEND_API_KEY || 
    (process.env as any).REACT_APP_BACKEND_API_KEY || 
    ''
  ).trim();

  return { url, key };
};

export const apiService = {
  /**
   * Submits a new enrollment application to Supabase.
   */
  async submitApplication(data: any): Promise<{ success: boolean; error?: string }> {
    const config = getApiConfig();

    // Check if configuration is missing
    if (!config.url || !config.key) {
      console.error("Supabase configuration missing!");
      
      // Local development fallback
      if (window.location.hostname === 'localhost' || window.location.hostname.includes('stackblitz')) {
        console.warn("DEV MODE: No API keys found. Simulating success for UI testing...");
        await new Promise(resolve => setTimeout(resolve, 1500));
        return { success: true };
      }

      return { 
        success: false, 
        error: "Configuration missing. Please set BACKEND_API_URL and BACKEND_API_KEY in your hosting environment variables." 
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
          payment_status: data.paymentStatus || 'pending'
        }),
      });

      if (!response.ok) {
        const errText = await response.text();
        console.error("Supabase API Error:", errText);
        throw new Error(`DB Error (${response.status}): Check RLS policies.`);
      }

      return { success: true };
    } catch (error: any) {
      console.error("Connection Error:", error);
      return { 
        success: false, 
        error: error.message || "Failed to connect to the database." 
      };
    }
  }
};
