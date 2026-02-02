
import { TrackKey, TrackData } from './types';

export const TRACKS: Record<TrackKey, TrackData> = {
  [TrackKey.COMPLETION]: {
    title: 'Completion Certificate Track',
    duration: '6 Weeks',
    price: 30000,
    description: 'Structured practical training focusing on core execution skills.',
    features: [
      'Structured Practical Training',
      'Core Learning Modules',
      'Weekly Deliverables',
      'Completion Certificate'
    ]
  },
  [TrackKey.EXPERIENCE]: {
    title: 'Experience Certificate Track',
    duration: '8–12 Weeks',
    price: 50000,
    description: 'Advanced track featuring live work under professional supervision.',
    features: [
      'Everything in Completion Track',
      'Real-life Brand Projects',
      'Hands-on Work Experience',
      'Experience Letters from Companies',
      'Recommendations from Company Founders'
    ]
  }
};

export const CORE_AREAS = [
  'Team Management',
  'Social Media Management',
  'Brand Building',
  'Entrepreneurship',
  'Customer Relationship Management'
];

export const WORK_ITEMS = [
  { title: 'Influencer Pages', icon: '📱' },
  { title: 'Content Calendars', icon: '📅' },
  { title: 'Analytics Dashboards', icon: '📊' },
  { title: 'Team Workflows', icon: '⚙️' },
  { title: 'Brand Strategies', icon: '🎯' },
  { title: 'Ad Campaigns', icon: '🚀' }
];

export const ENROLLMENT_STEPS = [
  'Apply',
  'Screening',
  'Fee Payment',
  'Onboarding'
];

export const PARTNERS = [
  'Visionary Media', 'TechFlow Inc.', 'GrowthHackers', 'BrandPulse', 'NextGen Creative', 'Alpha Agency', 'SocialScale'
];

export const FAQS = [
  {
    question: "Is this a job guarantee program?",
    answer: "No. We focus on skill immersion. We provide the experience and letters you need to be highly employable, but your job depends on your performance."
  },
  {
    question: "How many hours a week is required?",
    answer: "Completion Track requires 10-12 hours/week. Experience Track is more intense, requiring 15-20 hours/week as you handle live deliverables."
  },
  {
    question: "Do I get to choose the company I work for?",
    answer: "We match you based on your performance in the first 2 weeks of the program to ensure the best fit for both you and the brand."
  },
  {
    question: "Is this program remote?",
    answer: "Yes, the program is fully remote, using industry-standard tools like Slack, Notion, and Zoom for team collaboration."
  }
];
