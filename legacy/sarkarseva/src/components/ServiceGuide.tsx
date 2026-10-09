import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SERVICES } from '../data';
import { ServiceDetails } from '../types';
import { Share2, Mail, CheckCircle, AlertTriangle, ArrowRight, ExternalLink, HelpCircle, ChevronRight, Globe, IndianRupee, Clock, Server } from 'lucide-react';

interface ServiceGuideProps {
  serviceId: string;
  setCurrentTab: (tab: any) => void;
  onCheckDocuments: () => void;
  setSelectedServiceId: (id: string) => void;
}

export default function ServiceGuide({ serviceId, setCurrentTab, onCheckDocuments, setSelectedServiceId }: ServiceGuideProps) {
  const [activeTab, setActiveTab] = React.useState<'overview' | 'steps' | 'documents' | 'faqs'>('overview');
  const [successMsg, setSuccessMsg] = React.useState<string | null>(null);

  const service = React.useMemo(() => {
    return SERVICES.find(s => s.id === serviceId) || SERVICES[0];
  }, [serviceId]);

  const [shareSuccess, setShareSuccess] = React.useState(false);

  const handleShare = () => {
    try {
      navigator.clipboard.writeText(window.location.href);
    } catch (e) {}
    setShareSuccess(true);
    setTimeout(() => setShareSuccess(false), 2000);
  };

  return (
    <div className="max-w-[1280px] mx-auto px-6 py-8">
      {/* Breadcrumbs matching specs */}
      <nav className="flex items-center gap-1.5 text-[12px] font-sans font-medium text-neutral-500 mb-8">
        <button onClick={() => setCurrentTab('home')} className="hover:text-[#FF6B00] transition-colors cursor-pointer">Home</button>
        <ChevronRight className="w-3.5 h-3.5 text-neutral-400" />
        <button onClick={() => setCurrentTab('search')} className="hover:text-[#FF6B00] transition-colors cursor-pointer">Services</button>
        <ChevronRight className="w-3.5 h-3.5 text-neutral-400" />
        <span className="text-secondary font-semibold">{service.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left Column (65%) */}
        <div className="lg:col-span-8 flex flex-col gap-8">
          
          {/* Header Section */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <span className="text-4xl">{service.emoji}</span>
              <h1 className="font-serif text-3xl md:text-4xl text-on-background font-bold tracking-tight">
                {service.name}
              </h1>
            </div>

            <div className="flex flex-wrap items-center gap-2 mt-2">
              <span className="inline-flex items-center px-4 py-1 rounded-full bg-surface-container-high text-on-surface font-sans text-xs font-semibold">
                <Globe className="w-3.5 h-3.5 mr-1.5 text-[#FF6B00]" /> Online
              </span>
              <span className="inline-flex items-center px-4 py-1 rounded-full bg-surface-container-high text-on-surface font-sans text-xs font-semibold">
                <IndianRupee className="w-3.5 h-3.5 mr-1.5 text-[#FF6B00]" /> {service.fee}
              </span>
              <span className="inline-flex items-center px-4 py-1 rounded-full bg-surface-container-high text-on-surface font-sans text-xs font-semibold">
                <Clock className="w-3.5 h-3.5 mr-1.5 text-[#FF6B00]" /> {service.timeEstimate}
              </span>

              <div className="ml-auto flex bg-surface-container-high rounded-full p-0.5">
                <button 
                  onClick={() => {}}
                  className={`px-4 py-1 rounded-full font-sans text-xs font-semibold cursor-pointer ${
                    service.difficulty === 'Easy' ? 'bg-white shadow-sm text-primary' : 'text-on-surface-variant'
                  }`}
                >
                  Easy
                </button>
                <button 
                  onClick={() => {}}
                  className={`px-4 py-1 rounded-full font-sans text-xs font-semibold cursor-pointer ${
                    service.difficulty === 'Avg' ? 'bg-white shadow-sm text-primary' : 'text-on-surface-variant'
                  }`}
                >
                  Avg
                </button>
                <button 
                  onClick={() => {}}
                  className={`px-4 py-1 rounded-full font-sans text-xs font-semibold cursor-pointer ${
                    service.difficulty === 'Hard' ? 'bg-white shadow-sm text-primary' : 'text-on-surface-variant'
                  }`}
                >
                  Hard
                </button>
              </div>
            </div>
          </div>

          {/* Tab buttons */}
          <div className="flex items-center border-b border-surface-variant gap-8 overflow-x-auto no-scrollbar pt-2">
            {[
              { id: 'overview', label: 'Overview' },
              { id: 'steps', label: 'Step-by-Step' },
              { id: 'documents', label: 'Required Documents' },
              { id: 'faqs', label: 'FAQs' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`pb-3 font-sans text-sm font-semibold relative whitespace-nowrap outline-none cursor-pointer ${
                  activeTab === tab.id
                    ? 'text-secondary font-bold'
                    : 'text-on-surface-variant hover:text-on-background'
                }`}
              >
                {tab.label}
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="serviceTabUnderline"
                    className="absolute bottom-0 left-0 w-full h-[2.5px] bg-secondary"
                  />
                )}
              </button>
            ))}
          </div>

          {/* Tab Content Display */}
          <div className="py-2">
            <AnimatePresence mode="wait">
              {activeTab === 'overview' && (
                <motion.div
                  key="overview"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  className="flex flex-col gap-6"
                >
                  {/* Explainer / Quote Box matching specs */}
                  <div className="border-l-4 border-on-tertiary-container bg-[#E8F5E4] rounded-r-xl p-6 shadow-sm">
                    <p className="font-sans text-base text-on-surface leading-relaxed">
                      {service.overview}
                    </p>
                  </div>

                  {/* Fact Cards Grid */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                      { icon: 'payments', label: 'Est Fee', val: service.fee },
                      { icon: 'schedule', label: 'Duration', val: service.timeEstimate },
                      { icon: 'devices', label: 'Delivery Mode', val: service.mode },
                      { icon: 'account_balance', label: 'Ministry Office', val: service.authority }
                    ].map((card, idx) => (
                      <div 
                        key={idx} 
                        className="bg-white rounded-2xl p-5 border border-[#FFF3E8] shadow-[0_1px_3px_rgba(26,26,46,0.06),0_4px_16px_rgba(26,26,46,0.06)] flex flex-col gap-1 hover:shadow-[0_8px_24px_rgba(26,26,46,0.08)] transition-all duration-200"
                      >
                        <div className="text-secondary text-2xl mb-1">
                          {card.icon === 'payments' && <IndianRupee className="w-5 h-5 text-[#FF6B00]" />}
                          {card.icon === 'schedule' && <Clock className="w-5 h-5 text-[#FF6B00]" />}
                          {card.icon === 'devices' && <Server className="w-5 h-5 text-[#FF6B00]" />}
                          {card.icon === 'account_balance' && <HelpCircle className="w-5 h-5 text-[#FF6B00]" />}
                        </div>
                        <span className="font-sans text-xs text-[#7A7A9A] font-medium">{card.label}</span>
                        <span className="font-sans text-sm font-semibold text-primary">{card.val}</span>
                      </div>
                    ))}
                  </div>

                  {/* Related checklist quick links */}
                  <div className="bg-surface-container-low p-6 rounded-2xl border border-outline-variant flex flex-col sm:flex-row items-center gap-4 justify-between mt-4">
                    <div>
                      <h4 className="font-serif text-base font-bold text-primary mb-1">Verify physical copy list beforehand</h4>
                      <p className="font-sans text-xs text-on-surface-variant">Check which category papers fall under Proof of Address or Identification.</p>
                    </div>
                    <button 
                      onClick={onCheckDocuments}
                      className="bg-secondary-container hover:bg-secondary text-white px-5 py-2.5 rounded-full font-sans text-xs font-semibold cursor-pointer shadow-sm"
                    >
                      Document Checker
                    </button>
                  </div>
                </motion.div>
              )}

              {activeTab === 'steps' && (
                <motion.div
                  key="steps"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  className="flex flex-col gap-6"
                >
                  <h3 className="font-serif text-xl font-bold text-on-background">Step-by-Step Filing Procedures</h3>
                  <div className="relative border-l-2 border-secondary-fixed-dim ml-4 flex flex-col gap-6 pt-2">
                    {service.steps.map((step, idx) => (
                      <div key={idx} className="relative pl-8">
                        {/* Dot indicator matching colors */}
                        <div className={`absolute left-[-9px] top-1.5 w-4.5 h-4.5 rounded-full border-4 border-white shadow-sm flex items-center justify-center ${
                          idx === 0 ? 'bg-secondary' : 'bg-surface-variant border-outline'
                        }`} />
                        
                        <div className={`bg-white rounded-2xl p-6 border border-surface-container-highest shadow-[0_1px_3px_rgba(26,26,46,0.06)] transition-all duration-200 ${
                          idx !== 0 ? 'opacity-75 hover:opacity-100' : 'ring-1 ring-[#FFD4B0]'
                        }`}>
                          <h4 className="font-sans text-[15px] font-bold text-primary mb-1">{step.title}</h4>
                          <p className="font-sans text-sm text-on-surface-variant leading-relaxed">
                            {step.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {activeTab === 'documents' && (
                <motion.div
                  key="documents"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  className="flex flex-col gap-6"
                >
                  <div className="flex justify-between items-center pb-2 border-b border-surface-variant">
                    <h3 className="font-serif text-xl font-bold text-on-background">Application Document Portfolio</h3>
                    <button 
                      onClick={onCheckDocuments}
                      className="text-secondary font-sans text-xs font-semibold hover:underline cursor-pointer"
                    >
                      Interactive checklist →
                    </button>
                  </div>

                  <div className="flex flex-col gap-4">
                    {service.documentsRequired.map((doc, idx) => (
                      <div key={idx} className="bg-white p-6 rounded-2xl border border-outline-variant/60 shadow-sm flex flex-col md:flex-row justify-between gap-4">
                        <div className="flex-grow">
                          <div className="flex items-center gap-2 mb-1.5">
                            <h4 className="font-sans text-base font-semibold text-primary">{doc.name}</h4>
                            <span className="bg-surface-container-high text-on-surface-variant px-2.5 py-0.5 rounded-full font-sans text-[10px] font-bold uppercase">
                              {doc.type}
                            </span>
                          </div>
                          <p className="font-sans text-sm text-on-surface-variant leading-relaxed mb-3">
                            {doc.description}
                          </p>
                          <div className="flex flex-wrap gap-1.5">
                            <span className="text-xs text-on-surface-variant self-center mr-1">Accepted:</span>
                            {doc.acceptedList.map((acc, aIdx) => (
                              <span key={aIdx} className="bg-background border border-outline-variant px-3 py-1 rounded-full font-sans text-xs text-primary">
                                {acc}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {activeTab === 'faqs' && (
                <motion.div
                  key="faqs"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  className="flex flex-col gap-4"
                >
                  <h3 className="font-serif text-xl font-bold text-on-background mb-2">Frequently Answered Queries</h3>
                  {service.faqs.length > 0 ? (
                    service.faqs.map((faq, idx) => (
                      <div key={idx} className="bg-white p-6 rounded-2xl border border-surface-variant shadow-sm">
                        <h4 className="font-serif text-base font-bold text-primary mb-2 flex gap-2">
                          <HelpCircle className="w-5 h-5 text-secondary-container shrink-0 mt-0.5" />
                          {faq.question}
                        </h4>
                        <p className="font-sans text-sm text-on-surface-variant leading-relaxed pl-7">
                          {faq.answer}
                        </p>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-6 text-on-surface-variant text-sm font-sans">
                      No matching FAQs tabulated yet. Speak to our Live AI Assistant for custom answers!
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Right Column (35% Sidebar) */}
        <div className="lg:col-span-4">
          <div className="sticky top-[100px] flex flex-col gap-6">
            
            {/* Action Card */}
            <div className="bg-white rounded-2xl p-6 shadow-[0_1px_3px_rgba(26,26,46,0.06),0_4px_16px_rgba(26,26,46,0.06)] border border-neutral-200 flex flex-col gap-6">
              <div>
                <h2 className="font-serif text-xl font-bold text-[#1A1A2E] mb-1">Ready to start?</h2>
                <p className="font-sans text-sm text-[#7A7A9A]">Estimated completion time: 10 minutes</p>
              </div>

              <motion.button 
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  setSuccessMsg(`Workflow initiated for: ${service.name}. You can utilize the custom matching checklist in the Documents Hub!`);
                  setTimeout(() => setSuccessMsg(null), 5000);
                }}
                className="w-full h-12 bg-[#FF6B00] hover:bg-[#E05600] text-white rounded-full font-sans text-sm font-semibold flex items-center justify-center gap-2 transition-all duration-200 shadow-sm hover:shadow-md cursor-pointer border-none"
              >
                <span>Apply Now</span>
                <ArrowRight className="w-4 h-4" />
              </motion.button>

              <a 
                href="https://sarathi.parivahan.gov.in/" 
                target="_blank" 
                rel="noreferrer" 
                className="flex items-center justify-center gap-1 font-sans text-sm font-semibold text-[#FF6B00] hover:text-[#E05600] transition-colors"
              >
                <span>Visit Official Ministry Portal</span>
                <ExternalLink className="w-3.5 h-3.5 text-[#FF6B00]" />
              </a>

              <hr className="border-neutral-100" />

              {/* Details table */}
              <div className="flex flex-col gap-3 text-sm">
                <div className="flex justify-between items-center">
                  <span className="font-sans text-[#7A7A9A]">Last Updated</span>
                  <span className="font-sans font-semibold text-[#1A1A2E]">{service.lastUpdated}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-sans text-[#7A7A9A]">State Jurisdiction</span>
                  <span className="font-sans font-semibold text-[#1A1A2E]">{service.state}</span>
                </div>
                <div className="flex justify-between items-start gap-4">
                  <span className="font-sans text-[#7A7A9A] shrink-0">Department</span>
                  <span className="font-sans font-semibold text-[#1A1A2E] text-right">{service.authority}</span>
                </div>
              </div>

              {/* Share triggers */}
              <div className="flex items-center gap-2 pt-2 border-t border-neutral-100">
                <span className="font-sans text-xs text-[#7A7A9A] mr-auto">Share standard guide</span>
                <button 
                  onClick={handleShare}
                  className="w-8 h-8 rounded-full bg-neutral-50 hover:bg-[#FF6B00]/10 hover:text-[#FF6B00] flex items-center justify-center text-neutral-600 transition-colors cursor-pointer border-none"
                  title="Copy share link"
                >
                  <Share2 className="w-3.5 h-3.5" />
                </button>
                <a 
                  href={`mailto:?subject=Guide to ${service.name}&body=Hey, check out this dynamic citizen guide for ${service.name} at SarkarSeva!`}
                  className="w-8 h-8 rounded-full bg-neutral-50 hover:bg-[#FF6B00]/10 hover:text-[#FF6B00] flex items-center justify-center text-neutral-600 transition-colors"
                  title="Share via Email"
                >
                  <Mail className="w-3.5 h-3.5" />
                </a>
              </div>

              {successMsg && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }} 
                  animate={{ opacity: 1, scale: 1 }} 
                  className="bg-[#E8F5E4] border border-[#138808]/20 text-[#138808] text-xs font-sans font-medium p-3 rounded-xl flex items-center gap-2"
                >
                  <CheckCircle className="w-4 h-4 shrink-0 text-[#138808]" />
                  <span>{successMsg}</span>
                </motion.div>
              )}

              {shareSuccess && (
                <motion.p 
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }} 
                  className="text-xs text-[#138808] font-semibold text-center mt-[-8px]"
                >
                  URL copied to clipboard!
                </motion.p>
              )}
            </div>

            {/* Related Services */}
            <div className="mt-4">
              <h3 className="font-sans text-xs font-bold text-[#7A7A9A] uppercase tracking-wider mb-3">Related Services</h3>
              <div className="flex flex-col gap-3">
                {SERVICES.filter(s => s.id !== serviceId).slice(0, 2).map((rel) => (
                  <button 
                    key={rel.id}
                    onClick={() => {
                      setSelectedServiceId(rel.id);
                      setActiveTab('overview');
                    }}
                    className="w-full bg-white text-left rounded-xl p-4 shadow-sm border border-neutral-200 hover:border-[#FF6B00] transition-colors flex items-center gap-3 group cursor-pointer"
                  >
                    <div className="w-10 h-10 rounded-full bg-neutral-50 flex items-center justify-center text-[#FF6B00] group-hover:bg-[#FF6B00]/10 transition-colors">
                      <span className="text-xl inline-block">{rel.emoji}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="font-sans text-sm font-semibold text-[#1A1A2E] group-hover:text-[#FF6B00] transition-colors line-clamp-1">
                        {rel.name}
                      </span>
                      <span className="font-sans text-[11px] text-[#7A7A9A]">{rel.authority}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
