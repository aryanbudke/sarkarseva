import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SERVICES } from '../data';
import { ServiceDetails } from '../types';
import { Search, MapPin, DollarSign, Clock, HelpCircle, ArrowRight, BookOpen, AlertCircle, ChevronRight, ChevronDown, Mic, ArrowUpDown, Landmark, IndianRupee, Sparkles, MessageSquare } from 'lucide-react';

interface SearchResultsProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  setCurrentTab: (tab: any) => void;
  setSelectedServiceId: (id: string) => void;
  onOpenAiAssistant: (initialPrompt?: string) => void;
}

export default function SearchResults({
  searchQuery,
  setSearchQuery,
  setCurrentTab,
  setSelectedServiceId,
  onOpenAiAssistant
}: SearchResultsProps) {
  const [selectedState, setSelectedState] = React.useState('All India');
  const [selectedFeeFilter, setSelectedFeeFilter] = React.useState<'All' | 'Free' | 'Paid'>('All');
  
  // Category checkboxes
  const [categories, setCategories] = React.useState({
    identity: true,
    driving: true,
    education: true,
    social: true,
    business: true,
  });

  // Mode checkboxes
  const [modes, setModes] = React.useState({
    online: true,
    offline: true,
  });

  const [sortOrder, setSortOrder] = React.useState<'relevance' | 'fee-low' | 'fee-high' | 'time'>('relevance');

  // Trigger service click
  const handleServiceClick = (serviceId: string) => {
    setSelectedServiceId(serviceId);
    setCurrentTab('services');
  };

  // Extract query filter results
  const filteredServices = React.useMemo(() => {
    return SERVICES.filter((service) => {
      // 1. Text filter
      const normQuery = searchQuery.toLowerCase().trim();
      const matchesQuery = 
        normQuery === 'all' || normQuery === '' ||
        service.name.toLowerCase().includes(normQuery) || 
        service.overview.toLowerCase().includes(normQuery) ||
        service.authority.toLowerCase().includes(normQuery) ||
        service.category.toLowerCase().includes(normQuery);

      if (!matchesQuery) return false;

      // 2. Category filter
      const catKey = service.category as keyof typeof categories;
      if (categories[catKey] !== undefined && !categories[catKey]) {
        return false;
      }

      // 3. State filter
      if (selectedState !== 'All India' && service.state !== 'All India' && service.state !== selectedState) {
        return false;
      }

      // 4. Fee filter
      const isFree = service.fee.toLowerCase().includes('free');
      if (selectedFeeFilter === 'Free' && !isFree) return false;
      if (selectedFeeFilter === 'Paid' && isFree) return false;

      // 5. Mode filter
      const isOnline = service.mode.toLowerCase().includes('online');
      if (isOnline && !modes.online) return false;
      if (!isOnline && !modes.offline) return false;

      return true;
    }).sort((a, b) => {
      if (sortOrder === 'fee-low') {
        const aFee = a.fee.includes('Free') ? 0 : parseInt(a.fee.replace(/\D/g, '')) || 100;
        const bFee = b.fee.includes('Free') ? 0 : parseInt(b.fee.replace(/\D/g, '')) || 100;
        return aFee - bFee;
      }
      if (sortOrder === 'time') {
        return a.timeEstimate.localeCompare(b.timeEstimate);
      }
      return 0; // Default relevance
    });
  }, [searchQuery, categories, selectedState, selectedFeeFilter, modes, sortOrder]);

  return (
    <div className="max-w-[1280px] mx-auto px-6 py-8">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-1.5 text-[12px] font-sans font-medium text-neutral-500 mb-6">
        <button onClick={() => setCurrentTab('home')} className="hover:text-[#FF6B00] transition-colors cursor-pointer border-none bg-transparent">
          Home
        </button>
        <ChevronRight className="w-3.5 h-3.5 text-neutral-400" />
        <span className="text-secondary font-semibold">Search Services</span>
      </nav>

      {/* Header and Input matching specs */}
      <div className="mb-8">
        <h1 className="font-serif text-3xl md:text-4xl text-primary font-semibold mb-6">
          Search Results for "{searchQuery || 'All Services'}"
        </h1>

        {/* Search Bar Input on Search Page */}
        <div className="relative max-w-3xl mb-8">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="w-4 h-4 text-[#FF6B00]" />
          </div>
          <input
            className="w-full pl-12 pr-12 py-3.5 bg-white border border-[#FFD4B0] rounded-xl font-sans text-sm md:text-base focus:outline-none focus:border-[#FF6B00] focus:ring-2 focus:ring-[#FF6B00]/10 transition-all shadow-[0_1px_3px_rgba(26,26,46,0.06)]"
            placeholder="Search for services, documents, schemes..."
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button 
            type="button" 
            onClick={() => onOpenAiAssistant(`Help me with services matching ${searchQuery}`)}
            className="absolute inset-y-0 right-0 pr-4 flex items-center text-[#FF6B00] hover:text-[#E05600] transition-colors cursor-pointer border-none bg-transparent"
            title="Ask Voice Assistant"
          >
            <Mic className="w-4 h-4" />
          </button>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-2">
          {[
            { id: 'All', label: 'All Services' },
            { id: 'identity', label: 'Identity Documents' },
            { id: 'driving', label: 'Driving & Transport' },
            { id: 'Free', label: 'Free Services' },
            { id: 'Paid', label: 'Paid Services' }
          ].map((pill) => {
            const isActive = 
              pill.id === 'All' 
                ? (selectedFeeFilter === 'All' && categories.identity && categories.driving) 
                : pill.id === 'Free' 
                  ? selectedFeeFilter === 'Free'
                  : pill.id === 'Paid'
                    ? selectedFeeFilter === 'Paid'
                    : categories[pill.id as keyof typeof categories];

            return (
              <button
                key={pill.id}
                onClick={() => {
                  if (pill.id === 'All') {
                    setSelectedFeeFilter('All');
                    setCategories({ identity: true, driving: true, education: true, social: true, business: true });
                  } else if (pill.id === 'Free') {
                    setSelectedFeeFilter('Free');
                  } else if (pill.id === 'Paid') {
                    setSelectedFeeFilter('Paid');
                  } else {
                    setSelectedFeeFilter('All');
                    setCategories(prev => {
                      const keys = Object.keys(prev) as (keyof typeof categories)[];
                      const newCats = { ...prev };
                      keys.forEach(k => newCats[k] = k === pill.id);
                      return newCats;
                    });
                  }
                }}
                className={`px-4 py-1.5 rounded-full font-sans text-xs border transition-all cursor-pointer ${
                  isActive
                    ? 'bg-secondary-fixed text-on-secondary-fixed border-secondary/20 shadow-sm font-semibold'
                    : 'bg-white text-on-surface-variant border-outline-variant hover:bg-surface-container'
                }`}
              >
                {pill.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Sidebar Filters */}
        <aside className="md:col-span-3">
          <div className="bg-white rounded-2xl p-6 border border-surface-variant shadow-[0_1px_3px_rgba(26,26,46,0.06),0_4px_16px_rgba(26,26,46,0.06)] sticky top-[100px] flex flex-col gap-6">
            <div className="flex items-center justify-between pb-3 border-b border-surface-variant">
              <h2 className="font-serif text-lg font-bold text-primary">Filters</h2>
              <button 
                onClick={() => {
                  setCategories({ identity: true, driving: true, education: true, social: true, business: true });
                  setModes({ online: true, offline: true });
                  setSelectedFeeFilter('All');
                  setSelectedState('All India');
                }}
                className="text-secondary font-sans text-xs font-semibold hover:underline cursor-pointer"
              >
                Clear all
              </button>
            </div>

            {/* State Selector */}
            <div className="flex flex-col gap-1.5">
              <label className="font-sans text-xs font-semibold text-neutral-500">State / UT Jurisdiction</label>
              <div className="relative">
                <select 
                  className="w-full appearance-none bg-neutral-50 border border-neutral-200 rounded-xl py-2 px-3 pl-3 pr-10 font-sans text-sm focus:border-[#FF6B00] focus:ring-1 focus:ring-[#FF6B00] outline-none"
                  value={selectedState}
                  onChange={(e) => setSelectedState(e.target.value)}
                >
                  <option value="All India">All India</option>
                  <option value="Delhi">Delhi NCT</option>
                  <option value="Maharashtra">Maharashtra</option>
                  <option value="Karnataka">Karnataka</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-neutral-400">
                  <ChevronDown className="w-4 h-4" />
                </div>
              </div>
            </div>

            {/* Category Checkboxes */}
            <div>
              <h3 className="font-sans text-sm font-bold text-primary mb-3">Categories</h3>
              <div className="space-y-2.5">
                {[
                  { id: 'identity', label: 'Identity Documents' },
                  { id: 'driving', label: 'Driving & Licenses' },
                  { id: 'education', label: 'Education / Student' },
                  { id: 'social', label: 'Welfare Schemes' },
                ].map((item) => (
                  <label key={item.id} className="flex items-center gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={categories[item.id as keyof typeof categories]}
                      onChange={(e) => setCategories(prev => ({ ...prev, [item.id]: e.target.checked }))}
                      className="w-4 h-4 rounded border-outline text-[#fe6b00] focus:ring-[#fe6b00]"
                    />
                    <span className="font-sans text-sm text-on-surface-variant group-hover:text-primary transition-colors">
                      {item.label}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Fee Filter */}
            <div>
              <h3 className="font-sans text-sm font-bold text-primary mb-3">Service Fees</h3>
              <div className="space-y-2.5">
                {[
                  { id: 'All', label: 'All Charges' },
                  { id: 'Free', label: 'Completely Free' },
                  { id: 'Paid', label: 'Stamp/Processing Fees' },
                ].map((option) => (
                  <label key={option.id} className="flex items-center gap-3 cursor-pointer group">
                    <input
                      type="radio"
                      name="feeOption"
                      checked={selectedFeeFilter === option.id}
                      onChange={() => setSelectedFeeFilter(option.id as any)}
                      className="w-4 h-4 text-[#fe6b00] focus:ring-[#fe6b00]"
                    />
                    <span className="font-sans text-sm text-on-surface-variant group-hover:text-primary transition-colors">
                      {option.label}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Mode Filter */}
            <div>
              <h3 className="font-sans text-sm font-bold text-primary mb-3">Mode of Delivery</h3>
              <div className="space-y-2.5">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={modes.online}
                    onChange={(e) => setModes(prev => ({ ...prev, online: e.target.checked }))}
                    className="w-4 h-4 rounded border-outline text-[#fe6b00] focus:ring-[#fe6b00]"
                  />
                  <span className="font-sans text-sm text-on-surface-variant group-hover:text-primary transition-colors">
                    Online Submission
                  </span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={modes.offline}
                    onChange={(e) => setModes(prev => ({ ...prev, offline: e.target.checked }))}
                    className="w-4 h-4 rounded border-outline text-[#fe6b00] focus:ring-[#fe6b00]"
                  />
                  <span className="font-sans text-sm text-on-surface-variant group-hover:text-primary transition-colors">
                    Requires Physical Appointment
                  </span>
                </label>
              </div>
            </div>
          </div>
        </aside>

        {/* Results Area matching specs */}
        <div className="md:col-span-9 flex flex-col gap-6">
          <div className="flex justify-between items-center px-1">
            <span className="font-sans text-sm text-on-surface-variant">
              Showing {filteredServices.length} of {SERVICES.length} total services matched
            </span>
            <div className="flex items-center gap-1.5 text-sm">
              <span className="font-sans text-xs text-neutral-500">Sort by:</span>
              <button 
                onClick={() => setSortOrder(prev => prev === 'fee-low' ? 'relevance' : 'fee-low')}
                className="flex items-center gap-1 font-sans font-bold text-[#FF6B00] hover:text-[#E05600] transition-colors cursor-pointer border-none bg-transparent"
              >
                {sortOrder === 'fee-low' ? 'Lowest Fee' : 'Relevance'}
                <ArrowUpDown className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Results List */}
          <div className="flex flex-col gap-4">
            {filteredServices.length > 0 ? (
              filteredServices.map((service, idx) => (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  key={service.id}
                  onClick={() => handleServiceClick(service.id)}
                  className="bg-white rounded-2xl p-6 border border-surface-variant shadow-[0_1px_3px_rgba(26,26,46,0.06),0_4px_16px_rgba(26,26,46,0.06)] hover:shadow-[0_8px_24px_rgba(26,26,46,0.08)] hover:-translate-y-0.5 transition-all duration-200 cursor-pointer flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 group"
                >
                  <div className="flex-grow">
                    <div className="flex items-start sm:items-center gap-2.5 mb-2 flex-wrap">
                      <span className="text-2xl">{service.emoji}</span>
                      <h3 className="font-serif text-lg font-bold text-primary group-hover:text-secondary-container transition-colors">
                        {service.name}
                      </h3>
                      {service.mode.includes('Online') ? (
                        <span className="bg-[#E8F5E4] text-[#138808] px-2.5 py-0.5 rounded-full font-sans text-xs font-semibold whitespace-nowrap">
                          {service.mode}
                        </span>
                      ) : (
                        <span className="bg-[#FFF3E8] text-[#fe6b00] px-2.5 py-0.5 rounded-full font-sans text-xs font-semibold whitespace-nowrap">
                          {service.mode}
                        </span>
                      )}
                    </div>

                    <p className="font-sans text-sm text-on-surface-variant leading-relaxed mb-4 max-w-3xl">
                      {service.overview}
                    </p>

                    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-neutral-500">
                      <span className="flex items-center gap-1.5">
                        <Landmark className="w-3.5 h-3.5 text-[#FF6B00]" />
                        {service.authority}
                      </span>
                      <span className="hidden sm:inline text-neutral-300">•</span>
                      <span className="flex items-center gap-1.5">
                        <IndianRupee className="w-3 h-3 text-[#FF6B00]" />
                        {service.fee}
                      </span>
                      <span className="hidden sm:inline text-neutral-300">•</span>
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-[#FF6B00]" />
                        {service.timeEstimate}
                      </span>
                    </div>
                  </div>

                  <div className="sm:border-l sm:border-neutral-150 sm:pl-6 shrink-0 w-full sm:w-[130px] flex flex-col items-center">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleServiceClick(service.id);
                      }}
                      className="w-full bg-[#FFF3E8] hover:bg-secondary-container text-[#FF6B00] hover:text-white font-sans text-sm font-semibold py-2.5 px-4 rounded-full transition-all duration-200 text-center cursor-pointer border-none"
                    >
                      Guide Details
                    </button>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="text-center py-12 bg-white rounded-2xl border border-dashed border-amber-200 flex flex-col items-center">
                <AlertCircle className="w-12 h-12 text-[#FF6B00] mb-3" />
                <h3 className="font-serif text-lg font-bold text-primary mb-1">No services matched filters</h3>
                <p className="font-sans text-sm text-neutral-500 max-w-md">
                  Try checking other states or loosening checkboxes. You can also query the AI Assistant directly below!
                </p>
              </div>
            )}
          </div>

          {/* AI Assistant Promo Banner at bottom matching specs */}
          <div className="p-6 rounded-2xl bg-gradient-to-r from-amber-50 to-orange-50/40 border border-[#FFF3E8] flex flex-col md:flex-row items-center gap-6 mt-4">
            <div className="bg-white p-3.5 rounded-full shadow-[0_1px_3px_rgba(26,26,46,0.06),0_4px_16px_rgba(26,26,46,0.06)] flex-shrink-0">
              <Sparkles className="w-6 h-6 text-[#FF6B00]" />
            </div>
            <div className="flex-grow text-center md:text-left">
              <h4 className="font-serif text-lg font-bold text-primary mb-1">Can't find what you're looking for?</h4>
              <p className="font-sans text-sm text-neutral-500 font-medium">
                Our AI assistant can help navigate complex state procedures and recommend exact forms or certificates you need.
              </p>
            </div>
            <button 
              onClick={() => onOpenAiAssistant(`I can't find specific instructions for ${searchQuery}. Help me.`)}
              className="flex-shrink-0 bg-[#FF6B00] hover:bg-[#E05600] text-white px-6 py-2.5 rounded-full font-semibold text-sm transition-colors shadow-md flex items-center gap-2 cursor-pointer border-none"
            >
              <MessageSquare className="w-4 h-4 text-white" />
              <span>Ask AI Assistant</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
