
import { UserRegistration, TrackKey, PaymentStatus } from '../types';

/**
 * PRODUCTION API SERVICE for Supabase
 * 
 * Note: For frontend apps, variables are usually injected at BUILD TIME.
 * If you change variables in Vercel, you MUST trigger a "Redeploy".
 */

const getApiConfig = () => {
  // Check common locations for environment variables in frontend builds
  const env = (process.env || {}) as any;
  const importMetaEnv = (import.meta as any)?.env || {};

  let baseUrl = (
    env.BACKEND_API_URL || 
    env.VITE_BACKEND_API_URL || 
    importMetaEnv.VITE_BACKEND_API_URL ||
    env.REACT_APP_BACKEND_API_URL || 
    ''
  ).trim();

  let key = (
    env.BACKEND_API_KEY || 
    env.VITE_BACKEND_API_KEY || 
    importMetaEnv.VITE_BACKEND_API_KEY ||
    env.REACT_APP_BACKEND_API_KEY || 
    ''
  ).trim();

  // If the URL exists, ensure it's formatted for the applications table
  if (baseUrl && !baseUrl.includes('/rest/v1')) {
    baseUrl = baseUrl.replace(/\/$/, '') + '/rest/v1/applications';
  }

  return { url: baseUrl, key };
};

export const apiService = {
  async submitApplication(data: any): Promise<{ success: boolean; error?: string }> {
    const config = getApiConfig();

    if (!config.url || !config.key) {
      console.error("Missing Config:", config);
      
      // Fallback for local testing
      if (window.location.hostname === 'localhost' || window.location.hostname.includes('stackblitz')) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        return { success: true };
      }

      return { 
        success: false, 
        error: "Database credentials missing. Please go to Vercel -> Settings -> Environment Variables, add BACKEND_API_URL and BACKEND_API_KEY, and then RE-DEPLOY your site." 
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
        return { success: false, error: `DB Error: ${errText}` };
      }

      return { success: true };
    } catch (error: any) {
      return { success: false, error: "Network error. Check your internet or DB URL." };
    }
  }
};


