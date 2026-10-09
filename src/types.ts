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
  sectorCriteria?: Array<'Urban' | 'Rural'>;
  benefits: string[];
  officialUrl?: string;
  documents?: string[];
  applicationSteps?: string[];
}

export interface SchemeProfile {
  age: number;
  gender: string;
  state: string;
  sector: 'Urban' | 'Rural';
  selectedCategory: string;
  familyIncome: number;
  occupation: string;
}

export interface MatchCriterion {
  key: string;
  label: string;
  status: 'match' | 'mismatch' | 'preference' | 'verify';
  weight: number;
  detail: string;
}

export interface SchemeMatch extends Scheme {
  matchPercentage: number;
  confidence: 'High' | 'Medium' | 'Low';
  criteria: MatchCriterion[];
  matchedCriteria: number;
  failedCriteria: number;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}
