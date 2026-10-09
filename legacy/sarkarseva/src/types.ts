export interface ServiceDetails {
  id: string;
  name: string;
  emoji: string;
  category: string;
  department: string;
  authority: string;
  fee: string;
  timeEstimate: string;
  time: string;
  mode: string;
  difficulty: string;
  applyUrl: string;
  portalUrl: string;
  overview: string;
  steps: { n: number; title: string; desc: string; link?: string }[];
  documents: { name: string; reason: string; formats: string[]; mandatory: boolean; condition?: string }[];
  faqs: { q: string; a: string }[];
  lastUpdated: string;
  state: string;
}

export interface Scheme {
  id: string;
  name: string;
  description: string;
  category: string;
  matchPercentage: number;
  eligibilityDescription: string;
  genderCriteria?: 'male' | 'female' | 'other' | 'all';
  minAge?: number;
  maxAge?: number;
  incomeLimit?: number;
  occupationCriteria?: string[];
  benefits: string[];
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

