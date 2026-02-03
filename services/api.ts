
import { UserRegistration, TrackKey, PaymentStatus } from '../types';

/**
 * PRODUCTION API SERVICE for Supabase
 * 
 * Required Environment Variables (Set these in Vercel/Netlify):
 * - BACKEND_API_URL: Just your Project URL (e.g., https://xyz.supabase.co)
 * - BACKEND_API_KEY: Your 'anon' public key
 */

const getApiConfig = () => {
  // 1. Get the base URL from environment
  let baseUrl = (
    process.env.BACKEND_API_URL || 
    (process.env as any).VITE_BACKEND_API_URL || 
    (process.env as any).REACT_APP_BACKEND_API_URL || 
    ''
  ).trim();

  // 2. Automatically format URL if it's just the base Supabase URL
  if (baseUrl && !baseUrl.includes('/rest/v1')) {
    // Remove trailing slash if exists, then add the endpoint
    baseUrl = baseUrl.replace(/\/$/, '') + '/rest/v1/applications';
  }

  // 3. Get the API Key
  const key = (
    process.env.BACKEND_API_KEY || 
    (process.env as any).VITE_BACKEND_API_KEY || 
    (process.env as any).REACT_APP_BACKEND_API_KEY || 
    ''
  ).trim();

  return { url: baseUrl, key };
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
        error: "Database credentials missing. If you are the owner, please add BACKEND_API_URL and BACKEND_API_KEY to your hosting settings." 
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
        throw new Error(`Connection Error: Your database rejected the request. Check your RLS policies.`);
      }

      return { success: true };
    } catch (error: any) {
      console.error("Connection Error:", error);
      return { 
        success: false, 
        error: error.message || "Could not connect to the server. Please try again later." 
      };
    }
  }
};

