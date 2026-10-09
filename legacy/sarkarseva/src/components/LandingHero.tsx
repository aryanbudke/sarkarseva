import React from 'react';
import { motion } from 'motion/react';
import { Search, Sparkles, Award, Globe, Shield, RefreshCw, ArrowRight, Contact, Car, GraduationCap, Home, Users, HeartPulse, Wheat, Store } from 'lucide-react';
import { Component as HeroBackground } from './ui/demo';

interface LandingHeroProps {
  onSearchSubmit: (query: string) => void;
  setCurrentTab: (tab: any) => void;
  setCategoryFilter: (cat: string) => void;
  language: string;
  setLanguage: (lang: string) => void;
  t: (key: string) => string;
}

const QUICK_LANGS = [
  { code: 'en', label: 'English' },
  { code: 'hi', label: 'हिन्दी' },
  { code: 'mr', label: 'मраठी' },
  { code: 'ta', label: 'தமிழ்' },
  { code: 'te', label: 'తెలుగు' },
  { code: 'bn', label: 'বাংলা' },
  { code: 'pa', label: 'ਪੰਜਾਬੀ' },
  { code: 'kn', label: 'ಕನ್ನಡ' }
];

export default function LandingHero({ onSearchSubmit, setCurrentTab, setCategoryFilter, language, setLanguage, t }: LandingHeroProps) {
  const [query, setQuery] = React.useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearchSubmit(query.trim());
      setCurrentTab('search');
    }
  };

  const handlePopularClick = (tag: string) => {
    if (tag === 'all') {
      setCategoryFilter('All');
      setCurrentTab('services');
    } else {
      onSearchSubmit(tag);
      setCurrentTab('search');
    }
  };

  const handleCategoryClick = (categoryName: string) => {
    setCategoryFilter(categoryName);
    setCurrentTab('services');
  };

  return (
    <div className="flex-grow">
      {/* Language Bar matching specs */}
      <div className="bg-surface-container-low border-b border-outline-variant/30 px-6 py-2.5">
        <div className="max-w-[1280px] mx-auto flex items-center gap-3 overflow-x-auto no-scrollbar scroll-smooth">
          <span className="font-sans text-xs text-on-surface-variant font-medium whitespace-nowrap">
            Preferred Language:
          </span>
          {QUICK_LANGS.map((lang) => {
            const isActive = language === lang.code;
            return (
              <button
                key={lang.code}
                onClick={() => setLanguage(lang.code)}
                className={`font-sans text-xs px-4 py-1 rounded-full whitespace-nowrap cursor-pointer transition-all ${
                  isActive 
                    ? 'bg-[#FF6B00] text-white font-bold animate-pulse' 
                    : 'text-on-surface-variant hover:bg-[#FFF3E8] hover:text-[#FF6B00]'
                }`}
              >
                {lang.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Hero Section */}
      <HeroBackground className="w-full border-b border-outline-variant/20">
        <section 
          className="max-w-[900px] mx-auto px-6 py-16 text-center flex flex-col items-center relative w-full"
          style={{
            background: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'%3E%3Ccircle cx='100' cy='100' r='80' fill='none' stroke='%23FF6B00' stroke-width='1' stroke-opacity='0.06'/%3E%3Ccircle cx='100' cy='100' r='60' fill='none' stroke='%23FF6B00' stroke-width='0.5' stroke-opacity='0.04'/%3E%3C/svg%3E") center/600px 600px no-repeat`
          }}
        >
          {/* Government of India Emblem style badge */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'center', marginBottom: '16px', opacity: 0.55 }}
        >
          <div style={{ height: '1px', width: '40px', background: '#1A1A2E' }}></div>
          <span style={{ font: '400 11px "DM Sans"', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#1A1A2E' }}>
            Digital India Initiative
          </span>
          <div style={{ height: '1px', width: '40px', background: '#1A1A2E' }}></div>
        </motion.div>

        {/* Powered by AI chip */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-surface-container-high text-on-surface font-sans text-xs font-semibold px-4 py-1.5 rounded-full flex items-center gap-1.5 mb-6 shadow-sm border border-[#FFF3E8] inline-flex animate-bounce"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#FF6B00]" />
          <span>🇮🇳 Free Official Citizen Services Portal · No Middlemen</span>
        </motion.div>

        {/* Hero Title */}
        <motion.h1 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="font-serif text-[42px] leading-tight md:text-[56px] md:leading-[1.1] text-[#1A1A2E] font-bold mb-8"
        >
          {t('hero_title').split(',')[0]} <br />
          <span className="text-[#FF6B00] italic">{t('hero_title').split(',')[1] || 'finally simple.'}</span>
        </motion.h1>

        {/* Hero Subtitle description */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15 }}
          className="font-sans text-[#3D3D5C] text-sm md:text-base max-w-2xl mb-8 leading-relaxed"
        >
          {t('hero_subtitle')}
        </motion.p>

        {/* Big Search Input Form */}
        <motion.form 
          onSubmit={handleSubmit}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="w-full max-w-[720px] relative mt-2 mb-8"
        >
          <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
            <Search className="w-5 h-5 text-[#FF6B00]" />
          </div>
          <input
            type="text"
            className="w-full bg-white border-2 border-[#FFF3E8] focus:border-[#FF6B00] rounded-full py-4 pl-14 pr-[140px] font-sans text-base text-[#1A1A2E] placeholder:text-outline shadow-[0_4px_16px_rgba(26,26,46,0.06)] transition-all duration-250 outline-none"
            placeholder={t('search_placeholder')}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button 
            type="submit"
            className="absolute right-2.5 top-1/2 -translate-y-1/2 bg-[#FF6B00] hover:bg-[#E05600] text-white font-medium text-sm px-6 py-3 rounded-full transition-colors cursor-pointer"
          >
            {t('search_btn')}
          </button>
        </motion.form>

        {/* Popular links */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap justify-center gap-2 items-center"
        >
          <span className="font-sans text-xs text-[#3D3D5C] font-semibold mr-2">Popular searches:</span>
          {['Aadhaar Update', 'Driving Licence', 'PAN Card', 'Income Certificate', 'Passport'].map((tag) => (
            <button
              key={tag}
              onClick={() => handlePopularClick(tag)}
              className="bg-white hover:bg-[#FFF3E8] text-[#1A1A2E] border border-[#FFF3E8] hover:border-[#FF6B00] hover:text-[#FF6B00] font-sans text-xs px-3.5 py-1.5 rounded-full transition-all shadow-xs cursor-pointer active:scale-97"
            >
              {tag}
            </button>
          ))}
        </motion.div>
        {/* Trust Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          style={{ display: 'flex', alignItems: 'center', gap: '20px', justifyContent: 'center', marginTop: '20px', flexWrap: 'wrap' }}
        >
          <span style={{ font: '400 12px "DM Sans"', color: '#7A7A9A', display: 'flex', alignItems: 'center', gap: '5px' }}>
            🔒 SSL Secured
          </span>
          <span style={{ color: 'rgba(26,26,46,0.15)' }}>|</span>
          <span style={{ font: '400 12px "DM Sans"', color: '#7A7A9A', display: 'flex', alignItems: 'center', gap: '5px' }}>
            🏛 NIC India Powered
          </span>
          <span style={{ color: 'rgba(26,26,46,0.15)' }}>|</span>
          <span style={{ font: '400 12px "DM Sans"', color: '#7A7A9A', display: 'flex', alignItems: 'center', gap: '5px' }}>
            ✅ Information sourced from official .gov.in portals
          </span>
          <span style={{ color: 'rgba(26,26,46,0.15)' }}>|</span>
          <span style={{ font: '400 12px "DM Sans"', color: '#7A7A9A', display: 'flex', alignItems: 'center', gap: '5px' }}>
            📱 Works on all devices
          </span>
        </motion.div>
        </section>
      </HeroBackground>

      {/* Decorative Divider */}
      <div style={{
        height: '1px', 
        background: 'linear-gradient(90deg, transparent 0%, rgba(255,107,0,0.3) 20%, rgba(255,107,0,0.3) 50%, rgba(19,136,8,0.3) 80%, transparent 100%)',
        margin: '32px 0 0'
      }}></div>

      {/* Stats Bar */}
      <section className="bg-[#1A1A2E] text-white py-12 my-10 shadow-inner">
        <div className="max-w-[1280px] mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-center divide-x divide-white/10">
          <div 
            className="flex flex-col items-center justify-center cursor-pointer hover:opacity-80 transition-opacity"
            onClick={() => setCurrentTab('services')}
          >
            <span className="font-serif text-3xl md:text-4xl text-[#FF6B00] font-bold mb-1">{t('stats_services').split(' ')[0]}</span>
            <span className="font-sans text-[11px] uppercase tracking-widest text-[#7A7A9A] font-bold">{t('stats_services').split(' ').slice(1).join(' ')}</span>
            <span className="font-sans text-[10px] text-white/50 mt-1">{t('stats_label_1')}</span>
          </div>
          <div 
            className="flex flex-col items-center justify-center cursor-pointer hover:opacity-80 transition-opacity"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <span className="font-serif text-3xl md:text-4xl text-[#FF6B00] font-bold mb-1">{t('stats_languages').split(' ')[0]}</span>
            <span className="font-sans text-[11px] uppercase tracking-widest text-[#7A7A9A] font-bold">{t('stats_languages').split(' ').slice(1).join(' ')}</span>
            <span className="font-sans text-[10px] text-white/50 mt-1">{t('stats_label_2')}</span>
          </div>
          <div 
            className="flex flex-col items-center justify-center cursor-pointer hover:opacity-80 transition-opacity"
            onClick={() => {
              const el = document.getElementById('how-it-works-section');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            <span className="font-serif text-3xl md:text-4xl text-[#FF6B00] font-bold mb-1">{t('stats_middlemen').split(' ').slice(0, 2).join(' ')}</span>
            <span className="font-sans text-[11px] uppercase tracking-widest text-[#7A7A9A] font-bold">{t('stats_middlemen').split(' ').slice(2).join(' ')}</span>
            <span className="font-sans text-[10px] text-white/50 mt-1">{t('stats_label_3')}</span>
          </div>
          <div 
            className="flex flex-col items-center justify-center cursor-pointer hover:opacity-80 transition-opacity"
            onClick={() => {
              const el = document.getElementById('footer-section');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            <span className="font-serif text-3xl md:text-4xl text-[#FF6B00] font-bold mb-1">{t('stats_free')}</span>
            <span className="font-sans text-[11px] uppercase tracking-widest text-[#7A7A9A] font-bold">Access Policy</span>
            <span className="font-sans text-[10px] text-white/50 mt-1">{t('stats_label_4')}</span>
          </div>
        </div>
      </section>

      {/* How Government is Simplified (Steps section matching spec mapping keys) */}
      <section id="how-it-works-section" className="max-w-[1280px] mx-auto px-6 py-10">
        <h2 className="font-serif text-2xl md:text-3xl text-[#1A1A2E] text-center font-bold mb-12">
          {t('section_how_it_works')}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { titleKey: 'step1_title', descKey: 'step1_desc', num: '01' },
            { titleKey: 'step2_title', descKey: 'step2_desc', num: '02' },
            { titleKey: 'step3_title', descKey: 'step3_desc', num: '03' },
            { titleKey: 'step4_title', descKey: 'step4_desc', num: '04' }
          ].map((item, idx) => (
            <div key={idx} className="bg-white p-6 rounded-2xl border border-[#FFF3E8] relative overflow-hidden flex flex-col justify-between shadow-xs">
              <span className="absolute right-4 top-2 text-[#FFF)E8] opacity-10 text-6xl font-serif font-bold tracking-tight">{item.num}</span>
              <div className="relative z-10 pt-4">
                <h4 className="font-serif text-[15px] font-bold text-[#1A1A2E] mb-2">{t(item.titleKey)}</h4>
                <p className="font-sans text-xs text-[#3D3D5C] leading-snug">{t(item.descKey)}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Categories Grid matching specs */}
      <section className="max-w-[1280px] mx-auto px-6 py-12">
        <div className="flex justify-between items-end mb-8 border-b border-surface-variant pb-4">
          <div>
            <h2 className="font-serif text-2xl md:text-3xl text-primary font-bold">{t('section_categories')}</h2>
            <p className="font-sans text-sm text-[#3D3D5C] mt-1">Unified systems mapped for easier discovery.</p>
          </div>
          <button 
            onClick={() => handlePopularClick('all')}
            className="font-sans text-sm font-bold text-[#FF6B00] hover:text-[#E05600] flex items-center gap-1 group whitespace-nowrap cursor-pointer border-none bg-transparent"
          >
            View All 
            <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-4">
          {[
            { tag: 'Identity', icon: 'Identity', color: 'bg-[#FFF3E8] text-[#FF6B00]' },
            { tag: 'Driving', icon: 'Driving', color: 'bg-[#E6EEFA] text-[#1657B5]' },
            { tag: 'Education', icon: 'Education', color: 'bg-emerald-50 text-emerald-700' },
            { tag: 'Housing', icon: 'Housing', color: 'bg-purple-50 text-purple-700' },
            { tag: 'Social', icon: 'Social', color: 'bg-indigo-50 text-indigo-700' },
            { tag: 'Health', icon: 'Health', color: 'bg-rose-50 text-rose-700' },
            { tag: 'Agriculture', icon: 'Agriculture', color: 'bg-amber-50 text-amber-700' },
            { tag: 'Business', icon: 'Business', color: 'bg-teal-50 text-teal-700' }
          ].map((cat, idx) => (
            <motion.button
              key={cat.tag}
              whileHover={{ y: -4, boxShadow: '0 8px 24px rgba(26,26,46,0.08)' }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              onClick={() => handleCategoryClick(cat.tag)}
              className="bg-white p-5 rounded-xl shadow-xs hover-lift flex flex-col items-center text-center relative overflow-hidden group cursor-pointer border border-[#FFF3E8]"
            >
              <div className={`w-12 h-12 rounded-full ${cat.color} flex items-center justify-center mb-3 transition-transform duration-300 group-hover:scale-110`}>
                {cat.icon === 'Identity' && <Contact className="w-5 h-5" />}
                {cat.icon === 'Driving' && <Car className="w-5 h-5" />}
                {cat.icon === 'Education' && <GraduationCap className="w-5 h-5" />}
                {cat.icon === 'Housing' && <Home className="w-5 h-5" />}
                {cat.icon === 'Social' && <Users className="w-5 h-5" />}
                {cat.icon === 'Health' && <HeartPulse className="w-5 h-5" />}
                {cat.icon === 'Agriculture' && <Wheat className="w-5 h-5" />}
                {cat.icon === 'Business' && <Store className="w-5 h-5" />}
              </div>
              <span className="font-sans text-xs font-semibold text-[#1A1A2E] tracking-tight leading-snug">
                {cat.tag}
              </span>
              <div className="absolute bottom-0 left-0 w-full h-[3px] bg-[#FF6B00] scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-250"></div>
            </motion.button>
          ))}
        </div>
      </section>

      {/* Directives banner */}
      <section className="max-w-[1280px] mx-auto px-6 py-4 mb-16">
        <div className="bg-gradient-to-br from-[#1A1A2E] to-[#2D2D4E] border border-white/5 rounded-2xl p-8 flex flex-col md:flex-row items-center gap-8 shadow-md">
          <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center shadow-md">
            <Shield className="w-8 h-8 text-[#FF6B00]" />
          </div>
          <div className="flex-grow text-center md:text-left text-white">
            <h3 className="font-serif text-xl font-bold text-white mb-1">State Verification Framework</h3>
            <p className="font-sans text-sm text-[#7A7A9A] leading-relaxed">
              Find customized micro-tools for your application! Check your necessary files before booking slots, or answer targeted eligibility sliders to find matches instantly.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <button 
              onClick={() => setCurrentTab('documents')}
              className="bg-[#FF6B00] hover:bg-[#E05600] text-white px-6 py-2.5 rounded-full font-medium text-xs transition-colors shadow-md cursor-pointer whitespace-nowrap border-none"
            >
              Check Documents
            </button>
            <button 
              onClick={() => setCurrentTab('schemes')}
              className="bg-white/10 hover:bg-white/20 text-white px-6 py-2.5 rounded-full font-medium text-xs transition-all border border-white/10 shadow-md cursor-pointer whitespace-nowrap"
            >
              Discover Schemes
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
