
export enum TrackKey {
  COMPLETION = 'Completion Certificate Track',
  EXPERIENCE = 'Experience Certificate Track'
}

export interface TrackData {
  title: string;
  duration: string;
  price: number;
  description: string;
  features: string[];
}

export interface UserRegistration {
  fullName: string;
  email: string;
  phone: string;
  linkedin?: string;
  currentStatus: 'Student' | 'Fresher' | 'Professional' | 'Entrepreneur';
  workExperience?: string;
  careerGoals: string;
}

export interface EnrollmentState {
  track: TrackKey | null;
  userData?: UserRegistration;
}

export enum SpecializationKey {
  INFLUENCER = 'influencer',
  MANAGEMENT = 'management',
  FINANCE = 'finance',
  CORPORATE = 'corporate'
}

export interface CourseData {
  title: string;
  description: string;
  outcomes: string[];
}

export enum BillingCycle {
  MONTHLY = 'monthly',
  YEARLY = 'yearly'
}

export type PaymentStatus = 'pending' | 'completed' | 'failed';
