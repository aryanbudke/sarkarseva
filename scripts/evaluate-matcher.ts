import { SCHEMES } from '../src/data';
import { rankSchemes } from '../src/lib/schemeMatcher';
import type { SchemeProfile } from '../src/types';

type Scenario = {
  name: string;
  profile: SchemeProfile;
  expectedInTopThree: string[];
};

const scenarios: Scenario[] = [
  {
    name: 'Low-income student',
    profile: { age: 20, gender: 'female', state: 'Delhi', sector: 'Urban', selectedCategory: 'education', familyIncome: 180000, occupation: 'Student' },
    expectedInTopThree: ['post-matric-scholarship'],
  },
  {
    name: 'Rural farmer',
    profile: { age: 35, gender: 'male', state: 'Punjab', sector: 'Rural', selectedCategory: 'agriculture', familyIncome: 240000, occupation: 'Farmer' },
    expectedInTopThree: ['pm-kisan', 'pranam-scheme'],
  },
  {
    name: 'Urban street vendor',
    profile: { age: 32, gender: 'male', state: 'Maharashtra', sector: 'Urban', selectedCategory: 'business', familyIncome: 220000, occupation: 'Street Vendor' },
    expectedInTopThree: ['pm-svanidhi-scheme'],
  },
  {
    name: 'Low-income senior citizen',
    profile: { age: 68, gender: 'male', state: 'Kerala', sector: 'Rural', selectedCategory: 'social', familyIncome: 90000, occupation: 'Unemployed' },
    expectedInTopThree: ['social-pension'],
  },
  {
    name: 'Woman seeking LPG support',
    profile: { age: 29, gender: 'female', state: 'Uttar Pradesh', sector: 'Rural', selectedCategory: 'social', familyIncome: 120000, occupation: 'Unemployed' },
    expectedInTopThree: ['ujjwala-yojana'],
  },
];

let hits = 0;

for (const scenario of scenarios) {
  const ranked = rankSchemes(SCHEMES, scenario.profile);
  const topThree = ranked.slice(0, 3).map(item => item.id);
  const passed = scenario.expectedInTopThree.every(expected => topThree.includes(expected));
  if (passed) hits += 1;
  console.log(`${passed ? 'PASS' : 'FAIL'} ${scenario.name}: ${topThree.join(', ')}`);
}

const hitRate = Math.round((hits / scenarios.length) * 100);
console.log(`\nTop-3 scenario hit rate: ${hits}/${scenarios.length} (${hitRate}%)`);

if (hits !== scenarios.length) {
  throw new Error('Matcher benchmark failed. Review the ranking rules or expected scenarios.');
}
