import type { MatchCriterion, Scheme, SchemeMatch, SchemeProfile } from '../types';

const result = (
  key: string,
  label: string,
  status: MatchCriterion['status'],
  weight: number,
  detail: string,
): MatchCriterion => ({ key, label, status, weight, detail });

/**
 * Deterministic and explainable eligibility pre-screening.
 * A mismatch on a mandatory rule caps the score below the "Likely match" threshold.
 * This is guidance, not an official eligibility decision.
 */
export function scoreScheme(scheme: Scheme, profile: SchemeProfile): SchemeMatch {
  const criteria: MatchCriterion[] = [];

  if (profile.selectedCategory !== 'all') {
    const matches = scheme.category === profile.selectedCategory;
    criteria.push(result(
      'category',
      'Preferred benefit category',
      matches ? 'preference' : 'mismatch',
      10,
      matches ? `Matches ${profile.selectedCategory}` : `Scheme belongs to ${scheme.category}`,
    ));
  }

  if (scheme.genderCriteria && scheme.genderCriteria !== 'all') {
    const matches = scheme.genderCriteria === profile.gender;
    criteria.push(result(
      'gender',
      'Gender criterion',
      matches ? 'match' : 'mismatch',
      20,
      matches ? `Profile matches ${scheme.genderCriteria} criterion` : `Restricted to ${scheme.genderCriteria} applicants`,
    ));
  }

  if (scheme.minAge !== undefined || scheme.maxAge !== undefined) {
    const aboveMin = scheme.minAge === undefined || profile.age >= scheme.minAge;
    const belowMax = scheme.maxAge === undefined || profile.age <= scheme.maxAge;
    const range = `${scheme.minAge ?? 0}–${scheme.maxAge ?? 'no upper limit'}`;
    criteria.push(result(
      'age',
      'Age criterion',
      aboveMin && belowMax ? 'match' : 'mismatch',
      20,
      aboveMin && belowMax ? `Age ${profile.age} is within ${range}` : `Age ${profile.age} is outside ${range}`,
    ));
  }

  if (scheme.incomeLimit !== undefined) {
    const matches = profile.familyIncome <= scheme.incomeLimit;
    criteria.push(result(
      'income',
      'Household income cap',
      matches ? 'match' : 'mismatch',
      25,
      matches
        ? `₹${profile.familyIncome.toLocaleString('en-IN')} is within the ₹${scheme.incomeLimit.toLocaleString('en-IN')} cap`
        : `₹${profile.familyIncome.toLocaleString('en-IN')} exceeds the ₹${scheme.incomeLimit.toLocaleString('en-IN')} cap`,
    ));
  }

  if (scheme.occupationCriteria?.length) {
    const matches = scheme.occupationCriteria.some(
      occupation => occupation.toLowerCase() === profile.occupation.toLowerCase(),
    );
    criteria.push(result(
      'occupation',
      'Occupation criterion',
      matches ? 'match' : 'mismatch',
      25,
      matches ? `${profile.occupation} is included` : `Designed for ${scheme.occupationCriteria.join(', ')}`,
    ));
  }

  if (scheme.sectorCriteria?.length) {
    const matches = scheme.sectorCriteria.includes(profile.sector);
    criteria.push(result(
      'sector',
      'Urban/rural coverage',
      matches ? 'match' : 'mismatch',
      15,
      matches ? `Available for ${profile.sector} applicants` : `Designed for ${scheme.sectorCriteria.join(' or ')} applicants`,
    ));
  }

  criteria.push(result(
    'location',
    'Location availability',
    'verify',
    0,
    profile.state === 'All India'
      ? 'Central scheme; state implementation must be confirmed'
      : `Central scheme; availability in ${profile.state} must be confirmed on the official portal`,
  ));

  const scored = criteria.filter(item => item.weight > 0);
  const possibleWeight = scored.reduce((sum, item) => sum + item.weight, 0);
  const earnedWeight = scored.reduce((sum, item) => {
    if (item.status === 'match' || item.status === 'preference') return sum + item.weight;
    return sum;
  }, 0);
  const failedMandatory = scored.filter(item => item.status === 'mismatch' && item.key !== 'category');
  const rawScore = possibleWeight ? Math.round((earnedWeight / possibleWeight) * 100) : 70;
  const matchPercentage = failedMandatory.length ? Math.min(rawScore, 49) : Math.max(50, rawScore);
  const evidenceCount = scored.filter(item => item.key !== 'category').length;
  const confidence = evidenceCount >= 3 ? 'High' : evidenceCount >= 2 ? 'Medium' : 'Low';

  return {
    ...scheme,
    matchPercentage,
    confidence,
    criteria,
    matchedCriteria: scored.filter(item => item.status === 'match' || item.status === 'preference').length,
    failedCriteria: scored.filter(item => item.status === 'mismatch').length,
  };
}

export function rankSchemes(schemes: Scheme[], profile: SchemeProfile): SchemeMatch[] {
  return schemes
    .map(scheme => scoreScheme(scheme, profile))
    .sort((a, b) => b.matchPercentage - a.matchPercentage || a.name.localeCompare(b.name));
}
