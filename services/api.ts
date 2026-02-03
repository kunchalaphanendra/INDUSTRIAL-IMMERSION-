
import { UserRegistration, TrackKey, PaymentStatus } from '../types';

/**
 * PRODUCTION API SERVICE for Supabase (Vite Version)
 * 
 * IMPORTANT: In Vite, environment variables MUST start with VITE_ 
 * to be accessible in the browser.
 */

const getApiConfig = () => {
  // Vite uses import.meta.env for environment variables
  const env = (import.meta as any).env || {};

  // We look for VITE_ prefixed versions which is the standard for Vite projects
  let baseUrl = (env.VITE_BACKEND_API_URL || '').trim();
  let key = (env.VITE_BACKEND_API_KEY || '').trim();

  // If the URL exists, ensure it's formatted for the Supabase REST API
  if (baseUrl && !baseUrl.includes('/rest/v1')) {
    baseUrl = baseUrl.replace(/\/$/, '') + '/rest/v1/applications';
  }

  return { url: baseUrl, key };
};

export const apiService = {
  async submitApplication(data: any): Promise<{ success: boolean; error?: string }> {
    const config = getApiConfig();

    // Debugging for the developer (you'll see this in the browser console)
    if (!config.url || !config.key) {
      console.error("Credentials missing. Make sure Vercel variables start with VITE_");
      
      // Local development fallback
      if (window.location.hostname === 'localhost' || window.location.hostname.includes('stackblitz')) {
        return { success: true };
      }

      return { 
        success: false, 
        error: "Database credentials missing. Please rename your Vercel variables to VITE_BACKEND_API_URL and VITE_BACKEND_API_KEY, then click DEPLOY again." 
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
        return { success: false, error: `Database responded with error: ${errText}` };
      }

      return { success: true };
    } catch (error: any) {
      return { success: false, error: "Network connection failed. Please check your internet." };
    }
  }
};



