import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SCHEMES } from '../data';
import { Scheme } from '../types';
import { Check, ArrowRight, ArrowLeft, Info, Calendar, Coins, UserCheck, MapPin } from 'lucide-react';

interface SchemeFinderProps {
  language: string;
  t: (key: string) => string;
}

export default function SchemeFinder({ language, t }: SchemeFinderProps) {
  const [currentStep, setCurrentStep] = React.useState<number>(1);

  // Demographic slider states
  const [age, setAge] = React.useState<number>(24);
  const [gender, setGender] = React.useState<string>('female');
  const [state, setState] = React.useState<string>('All India');
  const [sector, setSector] = React.useState<'Urban' | 'Rural'>('Urban');
  const [selectedCategory, setSelectedCategory] = React.useState<string>('all');
  const [familyIncome, setFamilyIncome] = React.useState<number>(180000);
  const [occupation, setOccupation] = React.useState<string>('Student');
  const [bookmarkedSchemes, setBookmarkedSchemes] = React.useState<Record<string, boolean>>({});

  // Iframe-friendly custom modal dialog states
  const [demoSuccessModal, setDemoSuccessModal] = React.useState<{ matches: number } | null>(null);
  const [activeSchemeDetail, setActiveSchemeDetail] = React.useState<Scheme | null>(null);

  // Related lists for inputs
  const statesList = ['All India', 'Delhi', 'Maharashtra', 'Karnataka', 'Tamil Nadu', 'Uttar Pradesh', 'West Bengal', 'Punjab', 'Kerala'];
  
  const categoryFilters = [
    { id: 'all', label: 'All Sectors' },
    { id: 'social', label: 'Social Welfare' },
    { id: 'education', label: 'Education & Youth' },
    { id: 'agriculture', label: 'Agriculture & Farm' },
    { id: 'health', label: 'Healthcare Assistance' },
    { id: 'housing', label: 'Housing Grants' },
    { id: 'business', label: 'Business & Loans' }
  ];

  const occupationsList = ['Student', 'Farmer', 'Street Vendor', 'Self-Employed', 'Business Owner', 'Unemployed', 'Salaried Employee'];

  const toggleBookmark = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setBookmarkedSchemes(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleClear = () => {
    setAge(24);
    setGender('female');
    setState('All India');
    setSector('Urban');
    setSelectedCategory('all');
    setFamilyIncome(180000);
    setOccupation('Student');
  };

  // Live matching calculations based on selected parameters
  const matchedSchemes = React.useMemo(() => {
    return SCHEMES.map((scheme) => {
      let score = 65; // High-fidelity baseline score

      // 1. Sector matching
      if (selectedCategory !== 'all' && scheme.category !== selectedCategory) {
        score -= 25;
      } else {
        score += 10;
      }

      // 2. Gender criteria check
      if (scheme.genderCriteria && scheme.genderCriteria !== 'all') {
        if (scheme.genderCriteria === gender) {
          score += 15;
        } else {
          score -= 35;
        }
      }

      // 3. Age boundaries matching
      if (scheme.minAge && age < scheme.minAge) score -= 20;
      if (scheme.maxAge && age > scheme.maxAge) score -= 15;
      if (scheme.minAge && age >= scheme.minAge && scheme.maxAge && age <= scheme.maxAge) {
        score += 10;
      }

      // 4. Income cap matching
      if (scheme.incomeLimit) {
        if (familyIncome <= scheme.incomeLimit) {
          score += 15;
        } else {
          // Progressively penalize higher incomes
          const excessRatio = familyIncome / scheme.incomeLimit;
          score -= Math.min(40, Math.floor(20 * excessRatio));
        }
      }

      // 5. Occupation matching
      if (scheme.occupationCriteria) {
        const matchesOccupation = scheme.occupationCriteria.some(
          occ => occ.toLowerCase() === occupation.toLowerCase()
        );
        if (matchesOccupation) {
          score += 15;
        } else {
          score -= 10;
        }
      }

      // Clamp between 15% and 98%
      const matchPercentage = Math.max(15, Math.min(98, score));

      return {
        ...scheme,
        matchPercentage
      };
    }).sort((a, b) => b.matchPercentage - a.matchPercentage);
  }, [age, gender, selectedCategory, familyIncome, occupation, state]);

  const steps = [
    { title: 'Demographics', desc: 'Age & Gender' },
    { title: 'Location', desc: 'State Zone' },
    { title: 'Sector Focus', desc: 'Target Benefit' },
    { title: 'Financials', desc: 'Family Income' },
    { title: 'Occupation', desc: 'Vocation Type' }
  ];

  return (
    <div className="max-w-[1280px] mx-auto px-6 py-12 flex flex-col gap-12">
      
      {/* Header Profile Info section */}
      <section className="flex flex-col items-center text-center gap-4">
        <div className="max-w-2xl">
          <h1 className="font-serif text-[38px] leading-tight md:text-[52px] text-primary font-bold mb-3">
            {t('nav_schemes')}
          </h1>
          <p className="font-sans text-xs text-[#3D3D5C] max-w-lg mx-auto leading-relaxed">
            Answer 5 quick questions about yourself to instantly discover which of 15 central government schemes you qualify for. Results update live as you adjust filters.
          </p>
        </div>

        {/* Dynamic Stepper Timeline with dynamic line progress */}
        <div className="w-full max-w-3xl flex items-center justify-between relative pt-6 select-none">
          <div className="absolute top-[28px] left-0 w-full h-[3px] bg-[#FFF3E8] -z-10" />
          <motion.div 
            className="absolute top-[28px] left-0 h-[3px] bg-[#FF6B00] -z-10"
            animate={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
            transition={{ duration: 0.3 }}
          />

          {steps.map((step, idx) => {
            const stepNum = idx + 1;
            const isCompleted = currentStep > stepNum;
            const isActive = currentStep === stepNum;

            return (
              <div key={idx} className="flex flex-col items-center gap-2">
                <button
                  onClick={() => setCurrentStep(stepNum)}
                  className={`w-9 h-9 rounded-full flex items-center justify-center font-sans text-xs font-bold transition-all duration-300 ring-4 ring-white ${
                    isCompleted
                      ? 'bg-[#138808] text-white shadow-sm'
                      : isActive
                        ? 'bg-[#FF6B00] text-white shadow-md ring-8 ring-[#FF6B00]/10'
                        : 'bg-[#FFF3E8] text-[#7A7A9A]'
                  }`}
                >
                  {isCompleted ? <Check className="w-4 h-4" /> : stepNum}
                </button>
                <div className="text-center hidden sm:block">
                  <p className={`font-sans text-[11px] font-bold ${isActive ? 'text-[#FF6B00]' : 'text-[#3D3D5C]'}`}>
                    {step.title}
                  </p>
                  <p className="text-[9px] text-[#7A7A9A] font-sans leading-none">{step.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Stepper Interactive Form Area */}
      <section className="w-full max-w-3xl mx-auto">
        <div className="bg-white rounded-2xl shadow-[0_1px_3px_rgba(26,26,46,0.06),0_4px_16px_rgba(26,26,46,0.06)] p-6 sm:p-8 flex flex-col gap-6 border border-[#FFF3E8]">
          <AnimatePresence mode="wait">
            
            {currentStep === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="flex flex-col gap-4"
              >
                <div className="flex flex-col gap-1 border-b border-surface-variant pb-3">
                  <h2 className="font-serif text-lg font-bold text-[#1A1A2E]">Step 1: Bio Demographics</h2>
                  <p className="font-sans text-xs text-[#7A7A9A]">Enter age and gender thresholds for targeting maternal support, savings schemes, and senior pensions.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                  {/* Slider representing age */}
                  <div className="flex flex-col gap-2">
                    <div className="flex justify-between items-center">
                      <label className="font-sans text-xs font-bold text-[#1A1A2E]">Declared Age: <span className="text-[#FF6B00] font-mono text-sm">{age} Years</span></label>
                      <span className="text-[10px] text-[#7A7A9A] font-mono">Range: 1 - 100</span>
                    </div>
                    <input 
                      type="range"
                      min="1"
                      max="100"
                      value={age}
                      onChange={(e) => setAge(parseInt(e.target.value))}
                      className="w-full accent-[#FF6B00] bg-[#FFF3E8] h-2 rounded-lg cursor-pointer"
                    />
                  </div>

                  {/* Gender Selector */}
                  <div className="flex flex-col gap-2">
                    <label className="font-sans text-xs font-bold text-[#1A1A2E]">Select Gender Profile:</label>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { id: 'male', label: 'Male' },
                        { id: 'female', label: 'Female' },
                        { id: 'all', label: 'All Support' }
                      ].map((genderItem) => {
                        const active = gender === genderItem.id;
                        return (
                          <button
                            key={genderItem.id}
                            type="button"
                            onClick={() => setGender(genderItem.id)}
                            className={`py-2 text-xs font-bold rounded-lg border transition-all cursor-pointer ${
                              active
                                ? 'bg-[#FFF3E8] border-[#FF6B00] text-[#FF6B00]'
                                : 'bg-white border-[#FFF3E8] text-[#3D3D5C] hover:bg-neutral-50'
                            }`}
                          >
                            {genderItem.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {currentStep === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="flex flex-col gap-4"
              >
                <div className="flex flex-col gap-1 border-b border-surface-variant pb-3">
                  <h2 className="font-serif text-lg font-bold text-[#1A1A2E]">Step 2: Region Jurisdiction</h2>
                  <p className="font-sans text-xs text-[#7A7A9A]">Specify state residency boundaries to fetch targeted region subsidies.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                  <div className="flex flex-col gap-2">
                    <label className="font-sans text-xs font-bold text-[#1A1A2E]">State Of Origin:</label>
                    <select
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      className="bg-white border border-[#FFD4B0] text-sm text-[#1A1A2E] py-2.5 px-3 rounded-xl outline-none cursor-pointer"
                    >
                      {statesList.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="font-sans text-xs font-bold text-[#1A1A2E]">Area Demographic Sector:</label>
                    <div className="flex gap-4 items-center h-full">
                      {['Urban', 'Rural'].map((opt) => (
                        <label key={opt} className="flex items-center gap-1.5 cursor-pointer text-xs font-bold text-[#3D3D5C]">
                          <input 
                            type="radio" 
                            name="sector" 
                            checked={sector === opt}
                            onChange={() => setSector(opt as any)}
                            className="w-4 h-4 text-[#FF6B00] focus:ring-[#FF6B00]" 
                          />
                          <span>{opt} Sector</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {currentStep === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="flex flex-col gap-4"
              >
                <div className="flex flex-col gap-1 border-b border-surface-variant pb-3">
                  <h2 className="font-serif text-lg font-bold text-[#1A1A2E]">Step 3: Welfare Sector Scope</h2>
                  <p className="font-sans text-xs text-[#7A7A9A]">Help us narrow search outcomes to your focal welfare category.</p>
                </div>

                <div className="flex flex-col gap-2 pt-2">
                  <label className="font-sans text-xs font-bold text-[#1A1A2E]">Assistance Sector Filter:</label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {categoryFilters.map((catItem) => {
                      const isActive = selectedCategory === catItem.id;
                      return (
                        <button
                          key={catItem.id}
                          type="button"
                          onClick={() => setSelectedCategory(catItem.id)}
                          className={`py-2 px-3 text-left text-xs font-bold border rounded-lg transition-all cursor-pointer ${
                            isActive
                              ? 'bg-[#FFF3E8] border-[#FF6B00] text-[#FF6B00]'
                              : 'bg-white border-[#FFF3E8] text-[#1A1A2E] hover:bg-neutral-50'
                          }`}
                        >
                          {catItem.label}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            )}

            {currentStep === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="flex flex-col gap-4"
              >
                <div className="flex flex-col gap-1 border-b border-surface-variant pb-3">
                  <h2 className="font-serif text-lg font-bold text-[#1A1A2E]">Step 4: Household Financial Thresholds</h2>
                  <p className="font-sans text-xs text-[#7A7A9A]">Low income categories entitle citizens to specific free energy or food security grants.</p>
                </div>

                <div className="flex flex-col gap-3 pt-2">
                  <div className="flex justify-between items-center">
                    <label className="font-sans text-xs font-bold text-[#1A1A2E]">Annual Family Income limit: <span className="text-[#FF6B00] font-mono text-sm">₹{familyIncome.toLocaleString()}</span></label>
                    <span className="text-[10px] text-[#7A7A9A] font-mono">Max: 20 Lakhs</span>
                  </div>
                  <input
                    type="range"
                    min="20000"
                    max="2000000"
                    step="10000"
                    value={familyIncome}
                    onChange={(e) => setFamilyIncome(parseInt(e.target.value))}
                    className="w-full accent-[#FF6B00] bg-[#FFF3E8] h-2 rounded-lg cursor-pointer"
                  />
                  <div className="bg-amber-50 p-3 rounded-lg border border-amber-100/50 mt-1 flex gap-2">
                    <Info className="w-4 h-4 shrink-0 text-[#FF6B00]" />
                    <p className="font-sans text-[10px] text-amber-900 leading-snug">
                      Note: Schemes like Ayushman Bharat, Post-Matric Scholarships and PMAY are highly sensitive to declared household income thresholds.
                    </p>
                  </div>
                </div>
              </motion.div>
            )}

            {currentStep === 5 && (
              <motion.div
                key="step5"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="flex flex-col gap-4"
              >
                <div className="flex flex-col gap-1 border-b border-surface-variant pb-3">
                  <h2 className="font-serif text-lg font-bold text-[#1A1A2E]">Step 5: Occupational Role</h2>
                  <p className="font-sans text-xs text-[#7A7A9A]">Select employment/vocation parameters to match special agricultural or street vendor grants.</p>
                </div>

                <div className="flex flex-col gap-2 pt-2">
                  <label className="font-sans text-xs font-bold text-[#1A1A2E] mb-1">Select Current Vocation:</label>
                  <div className="flex flex-wrap gap-2">
                    {occupationsList.map((occ) => {
                      const isActive = occupation === occ;
                      return (
                        <button
                          key={occ}
                          onClick={() => setOccupation(occ)}
                          className={`px-3 py-1.5 rounded-full border text-xs font-bold cursor-pointer transition-all ${
                            isActive
                              ? 'bg-[#FF6B00] border-[#FF6B00] text-white shadow-sm'
                              : 'bg-white border-[#FFF3E8] text-[#3D3D5C] hover:bg-neutral-50'
                          }`}
                        >
                          {occ}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            )}

          </AnimatePresence>

          {/* Stepper buttons footer */}
          <div className="flex justify-between items-center mt-6 pt-4 border-t border-[#FFF3E8]">
            <button
              onClick={handleClear}
              className="text-xs font-bold font-sans text-[#7A7A9A] hover:text-[#FF6B00] cursor-pointer"
            >
              Reset Filters
            </button>
            <div className="flex gap-2">
              {currentStep > 1 && (
                <button
                  type="button"
                  onClick={() => setCurrentStep(prev => prev - 1)}
                  className="bg-white border border-[#FFF3E8] hover:border-[#FF6B00] text-[#1A1A2E] hover:text-[#FF6B00] px-4 py-2 rounded-full font-sans text-xs font-bold cursor-pointer transition-colors flex items-center gap-1"
                >
                  <ArrowLeft className="w-3.5 h-3.5" /> Back
                </button>
              )}

              {currentStep < 5 ? (
                <button
                  type="button"
                  onClick={() => {
                    setCurrentStep(prev => prev + 1);
                    // Next frame scroll to top of form
                    setTimeout(() => window.scrollTo({ top: 300, behavior: 'smooth' }), 50);
                  }}
                  className="bg-[#FF6B00] hover:bg-[#E05600] text-white px-5 py-2 rounded-full font-sans text-xs font-bold cursor-pointer transition-colors flex items-center gap-1 select-none shadow-sm active:scale-97 border-none"
                >
                  Continue <ArrowRight className="w-3.5 h-3.5" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    const matches = matchedSchemes.filter(m => m.matchPercentage >= 75).length;
                    setDemoSuccessModal({ matches });
                  }}
                  className="bg-[#138808] hover:bg-[#107006] text-white px-6 py-2 h-10 rounded-full font-sans text-xs font-bold cursor-pointer transition-colors flex items-center gap-1 select-none shadow-sm"
                >
                  <UserCheck className="w-4 h-4" /> Save Profile Details
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Dynamic matches listing (Recalculated on slider state ticks) */}
      <section className="pt-6 border-t border-[#FFF3E8] select-none">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-3 mb-6">
          <div>
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#1A1A2E] mb-1">
              Live Welfare Matches ({matchedSchemes.length})
            </h3>
            <p className="font-sans text-xs text-[#7A7A9A]">
              Match percentages update instantly as you slide values above or switch parameters.
            </p>
          </div>
          <div className="bg-[#E6EEFA] text-[#1657B5] px-3.5 py-1.5 rounded-full font-sans text-xs font-bold">
            Matches above 75% threshold: {matchedSchemes.filter(m => m.matchPercentage >= 75).length}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {matchedSchemes.map((scheme) => {
            const isHigh = scheme.matchPercentage >= 75;
            const isLow = scheme.matchPercentage < 50;
            const isBookmarked = !!bookmarkedSchemes[scheme.id];

            return (
              <motion.div
                key={scheme.id}
                layoutId={`scheme-card-${scheme.id}`}
                className={`bg-white rounded-2xl p-6 border border-[#FFF3E8] shadow-[0_1px_3px_rgba(26,26,46,0.06),0_4px_16px_rgba(26,26,46,0.06)] flex flex-col justify-between hover:-translate-y-1 hover:shadow-md transition-all duration-300 ${isLow ? 'opacity-70' : ''}`}
              >
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <span className={`px-2 py-0.5 rounded text-[9px] font-extrabold tracking-wider uppercase ${
                      isHigh ? 'bg-[#E8F5E4] text-[#138808]' 
                      : isLow ? 'bg-red-50 text-red-600'
                      : 'bg-[#FFF3E8] text-[#FF6B00]'
                    }`}>
                      {isHigh ? 'High Match' : isLow ? 'Low Match' : 'Possible Match'}
                    </span>
                    <button
                      onClick={(e) => {
                        toggleBookmark(scheme.id, e);
                        if (!bookmarkedSchemes[scheme.id]) {
                          const el = document.createElement('div');
                          el.className = 'fixed bottom-6 left-1/2 -translate-x-1/2 bg-gray-900 text-white px-5 py-3 rounded-xl font-sans text-sm shadow-2xl z-[100] transition-all duration-300 transform translate-y-0 opacity-100 flex gap-2 items-center';
                          el.innerHTML = '<span style="color:#FF6B00">★</span> Scheme saved to My Sewa Center';
                          document.body.appendChild(el);
                          setTimeout(() => { el.style.opacity = '0'; setTimeout(() => el.remove(), 300); }, 2500);
                        }
                      }}
                      className="p-1 px-2.5 rounded-full text-xs font-bold cursor-pointer transition-colors bg-neutral-50 hover:bg-[#FFF3E8] border-none"
                    >
                      <span className={`font-serif text-[11px] ${isBookmarked ? 'text-[#FF6B00]' : 'text-[#7A7A9A]'}`}>
                        {isBookmarked ? '★ Watching' : '☆ Watch'}
                      </span>
                    </button>
                  </div>

                  <h4 className="font-serif text-[15px] font-bold text-[#1A1A2E] leading-snug mb-1.5 hover:text-[#FF6B00] transition-colors">
                    {scheme.name}
                  </h4>
                  <p className="font-sans text-xs text-[#3D3D5C] leading-normal line-clamp-3 mb-4">
                    {scheme.description}
                  </p>
                </div>

                <div className="pt-3.5 border-t border-[#FFF3E8] flex items-center justify-between mt-auto">
                  <div className="flex items-center gap-1.5">
                    <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center font-mono font-extrabold text-[11px] ${
                      isHigh ? 'border-[#138808] text-[#138808]' : 'border-[#FFD4B0] text-[#FF6B00]'
                    }`}>
                      {scheme.matchPercentage}%
                    </div>
                    <span className="font-sans text-[10px] text-[#7A7A9A] font-semibold">Eligibility Threshold</span>
                  </div>

                  <button
                    onClick={() => setActiveSchemeDetail(scheme)}
                    className="text-xs font-bold font-sans text-[#FF6B00] hover:text-[#E05600] cursor-pointer flex items-center gap-0.5 border-none bg-transparent"
                  >
                    Quick Check <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* 1. Demographics Match Modal Dialog */}
      <AnimatePresence>
        {demoSuccessModal && (
          <div className="fixed inset-0 bg-[#1A1A2E]/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-neutral-100 flex flex-col gap-4 text-left"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#E8F5E4] flex items-center justify-center text-[#138808]">
                  <Check className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif text-lg font-bold text-[#1A1A2E]">Profile Check Completed</h3>
                  <p className="font-sans text-xs text-[#7A7A9A]">SarkarSeva Welfare Analyzer</p>
                </div>
              </div>
              <p className="font-sans text-xs text-[#3D3D5C] leading-relaxed">
                Based on your declared citizen attributes (Age: <span className="font-semibold text-primary">{age}</span>, Gender: <span className="font-semibold text-primary">{gender}</span>, Region Sector: <span className="font-semibold text-primary">{sector}</span>, Joint Family Income: <span className="font-semibold text-primary">₹{familyIncome.toLocaleString()}</span>), we detected <strong>{demoSuccessModal.matches} national welfare matches</strong> exceeding 75% compatibility.
              </p>
              <div className="flex gap-2.5 justify-end mt-2">
                <button
                  onClick={() => setDemoSuccessModal(null)}
                  className="bg-[#1A1A2E] hover:bg-[#2C2C46] text-white px-5 py-2 rounded-full font-sans text-xs font-semibold cursor-pointer border-none"
                >
                  Proceed to Matches
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 2. Scheme Details "Quick Check" Modal Dialog */}
      <AnimatePresence>
        {activeSchemeDetail && (
          <div className="fixed inset-0 bg-[#1A1A2E]/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-[16px] w-full max-w-[560px] p-6 shadow-2xl flex flex-col text-left"
            >
              {/* Header */}
              <div className="flex justify-between items-start pb-4 border-b border-gray-100">
                <div className="flex flex-col gap-1">
                  <h3 className="font-serif text-xl font-bold text-gray-900 leading-snug flex items-center gap-2">
                    ✦ {activeSchemeDetail.name}
                  </h3>
                  <span className="font-sans text-xs text-gray-400 font-medium">Powered by SarkarSeva AI</span>
                </div>
                <button 
                  onClick={() => setActiveSchemeDetail(null)}
                  className="text-gray-400 hover:text-gray-800 text-xl font-light cursor-pointer border-none bg-transparent h-8 w-8 flex items-center justify-center rounded-full hover:bg-gray-50 transition-colors"
                >
                  ×
                </button>
              </div>
              
              <div className="flex flex-col gap-6 py-5 overflow-y-auto max-h-[60vh] no-scrollbar">
                
                {/* ELIGIBILITY ANALYSIS */}
                <div className="flex flex-col gap-3">
                  <h4 className="font-sans text-[11px] font-bold text-gray-400 tracking-wider">ELIGIBILITY ANALYSIS</h4>
                  <div className="border border-gray-100 rounded-xl p-4 flex flex-col gap-2">
                    {/* dynamic list of matches based on scheme requirements */}
                    {activeSchemeDetail.minAge ? (
                       <div className="flex items-center gap-2 font-sans text-xs text-gray-700">
                         {age >= activeSchemeDetail.minAge 
                           ? <span className="w-4 h-4 shrink-0 rounded-full bg-green-50 text-green-600 flex items-center justify-center text-[10px]">✓</span> 
                           : <span className="w-4 h-4 shrink-0 rounded-full bg-red-50 text-red-600 flex items-center justify-center text-[10px]">✕</span>}
                         <span>Age {age} {age >= activeSchemeDetail.minAge ? `meets` : `fails`} requirement {activeSchemeDetail.minAge}+</span>
                       </div>
                    ) : null}
                    
                    {activeSchemeDetail.genderCriteria && activeSchemeDetail.genderCriteria !== 'all' ? (
                       <div className="flex items-center gap-2 font-sans text-xs text-gray-700">
                         {gender === activeSchemeDetail.genderCriteria 
                           ? <span className="w-4 h-4 shrink-0 rounded-full bg-green-50 text-green-600 flex items-center justify-center text-[10px]">✓</span> 
                           : <span className="w-4 h-4 shrink-0 rounded-full bg-red-50 text-red-600 flex items-center justify-center text-[10px]">✕</span>}
                         <span>{gender.charAt(0).toUpperCase() + gender.slice(1)} profile {gender === activeSchemeDetail.genderCriteria ? 'matches' : 'does not match'} scheme</span>
                       </div>
                    ) : null}

                    {activeSchemeDetail.incomeLimit ? (
                       <div className="flex items-center gap-2 font-sans text-xs text-gray-700">
                         {familyIncome <= activeSchemeDetail.incomeLimit 
                           ? <span className="w-4 h-4 shrink-0 rounded-full bg-green-50 text-green-600 flex items-center justify-center text-[10px]">✓</span> 
                           : <span className="w-4 h-4 shrink-0 rounded-full bg-red-50 text-red-600 flex items-center justify-center text-[10px]">✕</span>}
                         <span>Income ₹{(familyIncome/100000).toFixed(1)}L {familyIncome <= activeSchemeDetail.incomeLimit ? 'within' : 'exceeds'} ₹{(activeSchemeDetail.incomeLimit/100000).toFixed(1)}L limit</span>
                       </div>
                    ) : null}

                    <div className="flex items-center gap-2 font-sans text-xs text-gray-700">
                      <span className="w-4 h-4 shrink-0 rounded-full bg-gray-50 text-gray-500 flex items-center justify-center text-[10px] font-bold">?</span>
                      <span>State: Expected to be available in {state}</span>
                    </div>

                    <div className="mt-2 bg-green-50/50 border border-green-100 rounded-lg p-2.5 flex items-center justify-center">
                      <span className="font-sans text-xs font-semibold text-green-700">
                        {activeSchemeDetail.matchPercentage >= 75 ? 'Likely Eligible' : 'Low Match'} — {activeSchemeDetail.matchPercentage}% match
                      </span>
                    </div>
                  </div>
                </div>

                {/* WHAT YOU GET */}
                <div className="flex flex-col gap-3">
                  <h4 className="font-sans text-[11px] font-bold text-gray-400 tracking-wider">WHAT YOU GET</h4>
                  <div className="flex flex-col gap-2">
                    {activeSchemeDetail.benefits.map((benefit, i) => (
                      <div key={i} className="flex items-start gap-2.5 font-sans text-sm text-gray-800 font-medium">
                        <span className="text-[#FF6B00] mt-0.5">{i === 0 ? '💰' : i === 1 ? '🏦' : '📅'}</span>
                        <span className="leading-snug">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* REQUIRED DOCUMENTS */}
                <div className="flex flex-col gap-3">
                  <h4 className="font-sans text-[11px] font-bold text-gray-400 tracking-wider">REQUIRED DOCUMENTS ({Math.max(3, activeSchemeDetail.benefits.length)})</h4>
                  <div className="flex flex-col gap-1.5 pl-1">
                    <div className="flex items-center gap-2 font-sans text-sm text-gray-600">
                      <span className="w-1.5 h-1.5 rounded-full bg-gray-400"></span> Aadhaar Card
                    </div>
                    <div className="flex items-center gap-2 font-sans text-sm text-gray-600">
                      <span className="w-1.5 h-1.5 rounded-full bg-gray-400"></span> Bank Passbook (Aadhaar-linked)
                    </div>
                    <div className="flex items-center gap-2 font-sans text-sm text-gray-600">
                      <span className="w-1.5 h-1.5 rounded-full bg-gray-400"></span> Scheme Specific Form
                    </div>
                  </div>
                </div>

                {/* HOW TO APPLY */}
                <div className="flex flex-col gap-3">
                  <h4 className="font-sans text-[11px] font-bold text-gray-400 tracking-wider">HOW TO APPLY</h4>
                  <div className="flex flex-col gap-1.5 font-sans text-sm text-gray-600 pl-1">
                    <div>1. Visit official authorized department</div>
                    <div>2. Fill the prescribed scheme application form</div>
                    <div>3. Submit along with required documents</div>
                  </div>
                  <a href="#" className="font-sans text-sm font-semibold text-[#1657B5] hover:underline flex items-center gap-1 mt-1 w-max">
                    Official Portal ↗
                  </a>
                </div>

              </div>

              {/* FOOTER BUTTONS */}
              <div className="flex gap-3 justify-end pt-4 border-t border-gray-100 mt-2">
                <button
                  onClick={(e) => toggleBookmark(activeSchemeDetail.id, e as any)}
                  className="px-4 py-2 rounded-lg font-sans text-sm font-semibold cursor-pointer border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2 bg-white"
                >
                  <span className={bookmarkedSchemes[activeSchemeDetail.id] ? "text-[#FF6B00]" : ""}>
                    {bookmarkedSchemes[activeSchemeDetail.id] ? "★ Watching" : "☆ Watch"}
                  </span>
                </button>
                <button
                  className="bg-[#FF6B00] hover:bg-[#E05600] text-white px-5 py-2 rounded-lg font-sans text-sm font-semibold cursor-pointer border-none transition-colors"
                >
                  Apply Now →
                </button>
                <button
                  onClick={() => setActiveSchemeDetail(null)}
                  className="px-4 py-2 rounded-lg font-sans text-sm font-semibold cursor-pointer border border-transparent text-gray-500 hover:bg-gray-50 transition-colors bg-white"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
