import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Globe, Search, ChevronDown, Award } from 'lucide-react';

interface NavbarProps {
  currentTab: 'home' | 'search' | 'services' | 'documents' | 'schemes' | 'service-guide';
  setCurrentTab: (tab: 'home' | 'search' | 'services' | 'documents' | 'schemes' | 'service-guide') => void;
  onSearch: (query: string) => void;
  openApplicationsModal: () => void;
  language: string;
  setLanguage: (lang: string) => void;
  t: (key: string) => string;
}

const LANGUAGES_LIST = [
  { code: 'en', label: 'English' },
  { code: 'hi', label: 'हिन्दी' },
  { code: 'mr', codeName: 'mr', label: 'मराठी' },
  { code: 'ta', label: 'தமிழ்' },
  { code: 'te', label: 'తెలుగు' },
  { code: 'bn', label: 'বাংলা' },
  { code: 'pa', label: 'ਪੰਜਾਬੀ' },
  { code: 'kn', label: 'ಕನ್ನಡ' }
];

export default function Navbar({
  currentTab,
  setCurrentTab,
  onSearch,
  openApplicationsModal,
  language,
  setLanguage,
  t
}: NavbarProps) {
  const [showSearchBox, setShowSearchBox] = React.useState(false);
  const [searchVal, setSearchVal] = React.useState('');
  const [langDropdownOpen, setLangDropdownOpen] = React.useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [isSearchOverlayOpen, setIsSearchOverlayOpen] = React.useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsSearchOverlayOpen(false);
      }
    };
    if (isSearchOverlayOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOverlayOpen]);

  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setLangDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchVal.trim()) {
      onSearch(searchVal.trim());
      setCurrentTab('search');
      setShowSearchBox(false);
    }
  };

  const activeLangLabel = LANGUAGES_LIST.find((l) => l.code === language)?.label || 'English';

  const menuItems = [
    { id: 'home', label: 'Home', i18nKey: 'nav_services' }, // Defaulting simple Home to landing
    { id: 'services', label: 'Services', i18nKey: 'nav_services' },
    { id: 'documents', label: 'Document Checker', i18nKey: 'nav_documents' },
    { id: 'schemes', label: 'Scheme Finder', i18nKey: 'nav_schemes' }
  ];

  return (
    <header className="bg-white sticky top-0 z-50 shadow-[0_1px_3px_rgba(26,26,46,0.06),0_4px_16px_rgba(26,26,46,0.06)] border-b border-surface-container-high select-none">
      <div className="flex justify-between items-center w-full px-6 py-4 max-w-[1280px] mx-auto">
        
        {/* Brand */}
        <div className="flex items-center gap-3">
          <button 
            onClick={() => {
              setCurrentTab('home');
              setMobileMenuOpen(false);
            }}
            className="flex items-center gap-3 text-left transition-all duration-200 outline-none cursor-pointer group"
            id="brand-logo"
            aria-label="SarkarSeva Brand Logo"
          >
            {/* Ashoka Chakra-inspired design */}
            <div className="w-[36px] h-[36px] rounded-[10px] bg-[#1A1A2E] flex items-center justify-center shrink-0 shadow-sm shadow-[#1A1A2E]/10 group-hover:scale-105 transition-transform duration-250">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className="text-[#FF6B00] stroke-current">
                <circle cx="12" cy="12" r="9" strokeWidth="1.5" />
                <circle cx="12" cy="12" r="2" strokeWidth="1.5" />
                <line x1="12" y1="3" x2="12" y2="21" strokeWidth="1" />
                <line x1="3" y1="12" x2="21" y2="12" strokeWidth="1" />
                <line x1="5.64" y1="5.64" x2="18.36" y2="18.36" strokeWidth="1" />
                <line x1="5.64" y1="18.36" x2="18.36" y2="5.64" strokeWidth="1" />
                <line x1="7.5" y1="4.2" x2="16.5" y2="19.8" strokeWidth="1" />
                <line x1="4.2" y1="7.5" x2="19.8" y2="16.5" strokeWidth="1" />
                <line x1="16.5" y1="4.2" x2="7.5" y2="19.8" strokeWidth="1" />
                <line x1="19.8" y1="7.5" x2="4.2" y2="16.5" strokeWidth="1" />
              </svg>
            </div>
            <div className="flex flex-col">
              <div className="flex items-baseline leading-none">
                <span className="font-sans font-semibold text-[#1A1A2E] text-xl tracking-tight">Sarkar</span>
                <span className="font-serif italic text-[#FF6B00] text-xl ml-0.5">Seva</span>
              </div>
              <span className="text-[9px] uppercase tracking-[0.08em] text-[#7A7A9A] font-medium leading-none mt-1">नागरिक सेवा पोर्टल</span>
            </div>
          </button>
        </div>

        {/* Navigation Links (Desktop) */}
        <nav className="hidden md:flex items-center gap-6">
          {menuItems.map((item) => {
            const isHome = item.id === 'home';
            const isActive = isHome ? currentTab === 'home' : (currentTab === item.id || (item.id === 'services' && (currentTab === 'search' || currentTab === 'service-guide')));
            
            // Prevent duplicate home showing if they both resolve to Services in data translation keys
            const translatedLabel = isHome ? 'Home' : t(item.i18nKey);

            return (
              <button
                key={item.id}
                onClick={() => setCurrentTab(item.id as any)}
                className={`relative font-sans text-[14px] font-medium transition-all duration-200 outline-none pb-1 cursor-pointer ${
                  isActive ? 'text-secondary font-bold' : 'text-[#3D3D5C] hover:text-[#FF6B00]'
                }`}
                id={`nav-${item.id}`}
              >
                {translatedLabel}
                {isActive && (
                  <motion.div
                    layoutId="activeTabUnderline"
                    className="absolute bottom-0 left-0 w-full h-[2.5px] bg-[#FF6B00]"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </nav>

        {/* Actions (Desktop and shared) */}
        <div className="flex items-center gap-3.5">
          {/* Search trigger */}
          <div className="relative hidden md:flex items-center">
            <button 
              onClick={() => setIsSearchOverlayOpen(true)}
              className="flex items-center gap-1.5 px-4 py-2 rounded-full border border-neutral-200 text-[#3D3D5C] hover:border-[#FF6B00] hover:text-[#FF6B00] transition-all text-xs font-semibold cursor-pointer bg-white"
              id="search-trigger"
            >
              <Search className="w-4 h-4 text-[#FF6B00]" />
              <span className="font-sans text-[12px]">Search Registry...</span>
            </button>
          </div>

          <button
            onClick={openApplicationsModal}
            className="hidden sm:inline-flex items-center justify-center bg-[#FF6B00] text-white font-semibold text-xs rounded-full px-5 py-2.5 hover:bg-[#E05600] transition-all duration-200 cursor-pointer border-none shadow-sm shadow-[#FF6B00]/10 hover:shadow-md hover:shadow-[#FF6B00]/20 active:scale-97 select-none"
            id="my-apps-btn"
          >
            My Sewa Center
          </button>

          {/* Premium Language Dropdown Menu */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setLangDropdownOpen(!langDropdownOpen)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-outline-variant hover:border-secondary transition-all cursor-pointer bg-white"
              id="language-globe"
              aria-expanded={langDropdownOpen}
              title="Change Language"
            >
              <Globe className="w-4 h-4 text-[#FF6B00]" />
              <span className="font-sans text-xs font-semibold text-[#1A1A2E] hidden xs:inline">{activeLangLabel}</span>
              <ChevronDown className="w-3 h-3 text-[#7A7A9A]" />
            </button>

            <AnimatePresence>
              {langDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  className="absolute right-0 mt-2 w-40 bg-white rounded-xl shadow-lg border border-[#FFF3E8] py-1.5 z-50 flex flex-col"
                >
                  {LANGUAGES_LIST.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setLanguage(lang.code);
                        setLangDropdownOpen(false);
                      }}
                      className={`px-4 py-2 text-left font-sans text-xs font-medium cursor-pointer transition-colors ${
                        language === lang.code 
                          ? 'bg-[#FFF3E8] text-[#FF6B00] font-bold' 
                          : 'hover:bg-surface text-[#1A1A2E] hover:text-[#FF6B00]'
                      }`}
                    >
                      {lang.label}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Mobile responsive Hamburger Trigger */}
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="md:hidden flex items-center justify-center p-2 rounded-lg bg-[#FFF3E8] text-[#FF6B00] cursor-pointer hover:bg-[#FFD4B0]/40 transition-colors"
            id="mobile-menu-trigger"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer Full-Screen Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-[#1A1A2E]/60 backdrop-blur-xs z-50 cursor-pointer"
            />

            {/* Mobile Drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className="fixed right-0 top-0 bottom-0 w-[280px] bg-[#1A1A2E] text-white p-6 z-50 flex flex-col justify-between shadow-huge"
            >
              <div className="flex flex-col gap-8">
                {/* Drawer Header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-[28px] h-[28px] rounded-[6px] bg-[#FF6B00] flex items-center justify-center shrink-0">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-white stroke-current">
                        <circle cx="12" cy="12" r="9" strokeWidth="1.5" />
                        <circle cx="12" cy="12" r="2" strokeWidth="1.5" />
                        <line x1="12" y1="3" x2="12" y2="21" strokeWidth="1" />
                        <line x1="3" y1="12" x2="21" y2="12" strokeWidth="1" />
                      </svg>
                    </div>
                    <div className="flex flex-col text-left">
                      <div className="flex items-baseline leading-none">
                        <span className="font-sans font-semibold text-white text-[15px] tracking-tight">Sarkar</span>
                        <span className="font-serif italic text-[#FF6B00] text-[15px] ml-0.5">Seva</span>
                      </div>
                      <span className="text-[7px] uppercase tracking-[0.08em] text-white/50 font-medium leading-none mt-1">नागरಿಕ સેવા પોર્ટલ</span>
                    </div>
                  </div>
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-1 rounded-full bg-white/10 text-white cursor-pointer hover:bg-white/20 transition-colors"
                    id="mobile-close-btn"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Navigation Items in Drawer */}
                <nav className="flex flex-col gap-4">
                  {menuItems.map((item) => {
                    const isHome = item.id === 'home';
                    const isActive = isHome ? currentTab === 'home' : (currentTab === item.id || (item.id === 'services' && (currentTab === 'search' || currentTab === 'service-guide')));
                    const labelStr = isHome ? 'Home' : t(item.i18nKey);

                    return (
                      <button
                        key={item.id}
                        onClick={() => {
                          setCurrentTab(item.id as any);
                          setMobileMenuOpen(false);
                        }}
                        className={`text-left font-sans text-base py-2 border-b border-white/5 transition-colors cursor-pointer ${
                          isActive ? 'text-[#FF6B00] font-bold' : 'text-white/80 hover:text-[#FF6B00]'
                        }`}
                      >
                        {labelStr}
                      </button>
                    );
                  })}

                  <button
                    onClick={() => {
                      openApplicationsModal();
                      setMobileMenuOpen(false);
                    }}
                    className="mt-4 w-full bg-[#FF6B00] hover:bg-[#E05600] text-center font-sans font-semibold text-sm text-white py-2.5 rounded-full cursor-pointer shadow-sm"
                  >
                    {t('nav_my_apps')}
                  </button>
                </nav>
              </div>

              {/* Drawer Footer with direct Language Pills */}
              <div className="flex flex-col gap-3">
                <span className="font-sans text-[10px] text-white/50 tracking-wider font-bold uppercase uppercase-spaced">
                  SUPPORTED LANGUAGES
                </span>
                <div className="grid grid-cols-2 gap-2">
                  {LANGUAGES_LIST.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => setLanguage(lang.code)}
                      className={`py-1 px-2 rounded font-sans text-[11px] font-medium border text-center transition-all cursor-pointer ${
                        language === lang.code
                          ? 'border-[#FF6B00] bg-[#FF6B00]/20 text-white font-bold'
                          : 'border-white/10 bg-white/5 text-white/75 hover:border-white/20'
                      }`}
                    >
                      {lang.label}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Full-screen National Registry Search Overlay */}
      <AnimatePresence>
        {isSearchOverlayOpen && (
          <>
            {/* Backdrop slide blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-[#1A1A2E]/95 backdrop-blur-md z-[65] flex flex-col justify-start pt-24 sm:pt-36 px-6"
            >
              <div className="w-full max-w-2xl mx-auto flex flex-col gap-6">
                
                {/* Close prompt header */}
                <div className="flex justify-between items-center pb-2 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#FF6B00] animate-ping" />
                    <span className="font-sans text-xs font-bold text-white/50 uppercase tracking-widest">SarkarSeva National Registry Search</span>
                  </div>
                  <button 
                    onClick={() => setIsSearchOverlayOpen(false)} 
                    className="text-white/60 hover:text-white flex items-center gap-1.5 text-xs font-sans tracking-wide cursor-pointer font-semibold bg-white/5 border border-white/10 hover:bg-white/10 px-3 py-1.5 rounded-full duration-150 animate-fade-in"
                  >
                    <X className="w-3.5 h-3.5" /> ESC to close
                  </button>
                </div>

                {/* Form input item */}
                <form 
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (searchVal.trim()) {
                      onSearch(searchVal.trim());
                      setCurrentTab('search');
                      setIsSearchOverlayOpen(false);
                    }
                  }} 
                  className="relative flex items-center"
                >
                  <Search className="absolute left-6 w-6 h-6 text-[#FF6B00]" />
                  <input
                    type="text"
                    placeholder="Search by keyword, document type or welfare scheme..."
                    value={searchVal}
                    onChange={(e) => setSearchVal(e.target.value)}
                    className="w-full bg-white text-[#1A1A2E] pl-16 pr-6 py-5 rounded-2xl font-sans text-lg font-medium focus:outline-none ring-4 ring-[#FF6B00]/40 border-none transition-all duration-200 shadow-xl"
                    autoFocus
                  />
                </form>

                {/* Hints / quick filters */}
                <div className="flex flex-col gap-3">
                  <span className="font-sans text-[11px] font-bold text-white/40 uppercase tracking-wider">Suggested Inquiries:</span>
                  <div className="flex flex-wrap gap-2 text-white/90 font-sans text-xs">
                    {['Aadhaar Card Update', 'Permanent Driving Licence', 'Passport Renewal', 'PAN Card Form 49A', 'National Scholarship Portal'].map((hint) => (
                      <button
                        key={hint}
                        onClick={() => {
                          setSearchVal(hint);
                          onSearch(hint);
                          setCurrentTab('search');
                          setIsSearchOverlayOpen(false);
                        }}
                        className="bg-white/5 border border-white/5 hover:border-[#FF6B00] hover:bg-[#FF6B00] hover:text-white px-4 py-2.5 rounded-full cursor-pointer transition-all duration-150 text-left font-medium"
                      >
                        {hint}
                      </button>
                    ))}
                  </div>
                </div>

              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}

