import React from 'react';

export default function Footer({ setCurrentTab }: { setCurrentTab: (tab: any) => void }) {
  return (
    <footer className="bg-primary text-white font-sans mt-auto border-t-8 border-secondary-container">
      {/* Tri-color Top Strip indicator of Government aesthetics */}
      <div className="h-1.5 w-full flex">
        <div className="flex-1 bg-[#fe6b00]"></div> {/* Saffron */}
        <div className="flex-1 bg-white"></div>       {/* White */}
        <div className="flex-1 bg-[#2a981d]"></div>   {/* Green */}
      </div>

      <div className="w-full px-6 py-12 max-w-[1280px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Brand & Intro */}
        <div className="md:col-span-4 flex flex-col gap-3">
          <span className="font-serif text-3xl font-bold tracking-tight text-white">SarkarSeva</span>
          <p className="text-white/75 text-sm font-light leading-relaxed max-w-xs">
            A unified, digitized state-level citizen hub simplifying access, documentation verification, and scheme processing within India.
          </p>
          <div className="mt-2 text-xs text-white/50 space-y-1">
            <p>Digital India Initiative Product</p>
            <p>Administered under National e-Governance Division</p>
          </div>
        </div>

        {/* Links Column 1 */}
        <div className="md:col-span-4 flex flex-col gap-2">
          <h4 className="text-secondary-fixed font-serif font-semibold text-lg pb-1 border-b border-white/10 mb-2">
            Civic Directives
          </h4>
          <nav className="flex flex-col gap-2 text-sm text-white/80">
            <a href="https://www.india.gov.in" target="_blank" rel="noopener noreferrer" className="hover:text-secondary-container hover:translate-x-1 transition-all duration-200">
              National Web Portal
            </a>
            <a href="https://sarathi.parivahan.gov.in" target="_blank" rel="noopener noreferrer" className="hover:text-secondary-container hover:translate-x-1 transition-all duration-200">
              Apply for New Driving Licence
            </a>
            <button onClick={() => setCurrentTab('documents')} className="text-left hover:text-secondary-container hover:translate-x-1 transition-all duration-200">
              Personalized Document Checker
            </button>
            <button onClick={() => setCurrentTab('schemes')} className="text-left hover:text-secondary-container hover:translate-x-1 transition-all duration-200">
              Government Scheme Finder (AI-driven)
            </button>
          </nav>
        </div>

        {/* Links Column 2 */}
        <div className="md:col-span-4 flex flex-col gap-2">
          <h4 className="text-secondary-fixed font-serif font-semibold text-lg pb-1 border-b border-white/10 mb-2">
            Support & Helpdesk
          </h4>
          <nav className="flex flex-col gap-2 text-sm text-white/80">
            <a href="https://uidai.gov.in/privacy-policy" target="_blank" rel="noopener noreferrer" className="hover:text-secondary-container hover:translate-x-1 transition-all duration-200">
              Privacy Policy (UIDAI/DigiLocker)
            </a>
            <a href="https://www.meity.gov.in" target="_blank" rel="noopener noreferrer" className="hover:text-secondary-container hover:translate-x-1 transition-all duration-200">
              e-Governance Terms of Service
            </a>
            <a href="tel:1800111404" className="hover:text-secondary-container hover:translate-x-1 transition-all duration-200">
              Official Helpline: 1800-111-404
            </a>
            <a href="https://guidelines.india.gov.in" target="_blank" rel="noopener noreferrer" className="hover:text-secondary-container hover:translate-x-1 transition-all duration-200">
              Portal Accessibility Standards
            </a>
          </nav>
        </div>
      </div>

      {/* Credit Bar */}
      <div className="bg-primary-container py-4 border-t border-white/5">
        <div className="max-w-[1280px] mx-auto px-6 flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-white/40 font-light">
          <p>
            © 2026 SarkarSeva. All Rights Reserved. <a href="https://www.nic.in" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">National Informatics Centre (NIC)</a>, <a href="https://www.india.gov.in" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Govt of India</a>.
          </p>
          <div className="flex gap-4">
            <a href="#" className="hover:underline">English</a>
            <a href="#" className="hover:underline">हिन्दी</a>
            <a href="#" className="hover:underline">தமிழ்</a>
            <a href="#" className="hover:underline">తెలుగు</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
