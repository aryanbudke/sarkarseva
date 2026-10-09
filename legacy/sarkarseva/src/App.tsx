import React from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LandingHero from './components/LandingHero';
import SearchResults from './components/SearchResults';
import ServiceGuide from './components/ServiceGuide';
import ServicesDirectory from './components/ServicesDirectory';
import DocumentChecker from './components/DocumentChecker';
import SchemeFinder from './components/SchemeFinder';
import ChatDrawer from './components/ChatDrawer';
import { TRANSLATIONS } from './data';
import { motion, AnimatePresence } from 'motion/react';
import { FileText, ClipboardList, CheckCircle2, Clock, Check, X, Sparkles } from 'lucide-react';

interface ApplicationItem {
  id: string;
  name: string;
  refNumber: string;
  status: 'Draft' | 'Pending Verification' | 'Approved' | 'Action Needed';
  updatedAt: string;
  notes: string;
}

export default function App() {
  const [currentTab, setCurrentTab] = React.useState<'home' | 'search' | 'services' | 'service-guide' | 'documents' | 'schemes'>('home');
  const [searchQuery, setSearchQuery] = React.useState('Aadhaar');
  const [selectedServiceId, setSelectedServiceId] = React.useState('driving-licence');
  const [categoryFilter, setCategoryFilter] = React.useState('All');
  const [language, setLanguage] = React.useState<string>('en');
  
  // Dynamic i18n Translation Helper
  const t = React.useCallback((key: string): string => {
    const dictionary = TRANSLATIONS[language] || TRANSLATIONS['en'];
    return dictionary[key] || TRANSLATIONS['en'][key] || key;
  }, [language]);

  // AI assistant drawer
  const [isAiDrawerOpen, setIsAiDrawerOpen] = React.useState(false);
  const [aiInitialPrompt, setAiInitialPrompt] = React.useState<string | undefined>(undefined);

  // Applications tracking modal
  const [isAppsModalOpen, setIsAppsModalOpen] = React.useState(false);
  const [myApplications, setMyApplications] = React.useState<ApplicationItem[]>([
    {
      id: '1',
      name: 'New Driving Licence',
      refNumber: 'DL-2026-8904A',
      status: 'Pending Verification',
      updatedAt: 'May 28, 2026',
      notes: 'Form 4 details submitted. Waiting for RTO Slot booking activation.'
    },
    {
      id: '2',
      name: 'Aadhaar Card Update (Demographic)',
      refNumber: 'AD-2026-1029C',
      status: 'Approved',
      updatedAt: 'May 30, 2026',
      notes: 'Address successfully updated in database. Digital card is ready for download!'
    },
    {
      id: '3',
      name: 'New Passport Issuance',
      refNumber: 'PP-2026-3701Z',
      status: 'Action Needed',
      updatedAt: 'May 25, 2026',
      notes: 'Please upload scanned copy of Birth Certificate or 10th marksheet for DOB verification.'
    }
  ]);

  const handleOpenAiAssistant = (initialPrompt?: string) => {
    setAiInitialPrompt(initialPrompt);
    setIsAiDrawerOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-on-background antialiased selection:bg-secondary-fixed selection:text-secondary">
      {/* Search query change automatically triggers tab sync */}
      <Navbar
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        onSearch={(q) => setSearchQuery(q)}
        openApplicationsModal={() => setIsAppsModalOpen(true)}
        language={language}
        setLanguage={setLanguage}
        t={t}
      />

      {/* Main Container Views with dynamic transitions */}
      <main className="flex-grow flex flex-col justify-start">
        <AnimatePresence mode="wait">
          {currentTab === 'home' && (
            <motion.div
              key="home-view"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.15 }}
              className="flex-grow flex flex-col"
            >
              <LandingHero
                onSearchSubmit={(q) => setSearchQuery(q)}
                setCurrentTab={setCurrentTab}
                setCategoryFilter={setCategoryFilter}
                language={language}
                setLanguage={setLanguage}
                t={t}
              />
            </motion.div>
          )}

          {currentTab === 'search' && (
            <motion.div
              key="search-view"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.15 }}
            >
              <SearchResults
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                setCurrentTab={setCurrentTab}
                setSelectedServiceId={setSelectedServiceId}
                onOpenAiAssistant={handleOpenAiAssistant}
              />
            </motion.div>
          )}

          {currentTab === 'services' && (
            <motion.div
              key="services-dir"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.15 }}
            >
              <ServicesDirectory 
                initialCategory={categoryFilter}
                onSelectService={(id) => {
                  setSelectedServiceId(id);
                  setCurrentTab('service-guide');
                }}
              />
            </motion.div>
          )}

          {currentTab === 'service-guide' && (
            <motion.div
              key="service-guide-view"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.15 }}
            >
              <ServiceGuide
                serviceId={selectedServiceId}
                setCurrentTab={setCurrentTab}
                onCheckDocuments={() => setCurrentTab('documents')}
                setSelectedServiceId={setSelectedServiceId}
              />
            </motion.div>
          )}

          {currentTab === 'documents' && (
            <motion.div
              key="documents-view"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.15 }}
            >
              <DocumentChecker />
            </motion.div>
          )}

          {currentTab === 'schemes' && (
            <motion.div
              key="schemes-view"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.15 }}
            >
              <SchemeFinder
                language={language}
                t={t}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Shared Footer component */}
      <Footer setCurrentTab={setCurrentTab} />

      {/* Floating AI chatbot trigger in bottom-right margin */}
      <div className="fixed bottom-6 right-6 z-40">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsAiDrawerOpen(true)}
          className="bg-[#FF6B00] hover:bg-[#E05600] text-white p-3.5 pr-4 rounded-full shadow-2xl flex items-center gap-2 cursor-pointer border border-[#FFD4B0] ring-4 ring-white/10"
        >
          <Sparkles className="w-5 h-5 text-white" />
          <span className="font-sans text-xs font-bold whitespace-nowrap">
            Ask AI Assistant
          </span>
        </motion.button>
      </div>

      {/* Floating AI chat drawer sliding panel */}
      <ChatDrawer
        isOpen={isAiDrawerOpen}
        onClose={() => setIsAiDrawerOpen(false)}
        initialPrompt={aiInitialPrompt}
        setInitialPrompt={setAiInitialPrompt}
      />

      {/* My Applications Modal Drawer */}
      <AnimatePresence>
        {isAppsModalOpen && (
          <>
            {/* Backdrop overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsAppsModalOpen(false)}
              className="fixed inset-0 bg-primary/60 backdrop-blur-xs z-50 cursor-pointer"
            />

            {/* Centered Modal Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed inset-6 sm:inset-auto sm:top-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 sm:max-w-2xl w-full bg-white rounded-2xl shadow-huge z-50 p-6 sm:p-8 flex flex-col justify-between border border-[#FFF3E8]"
            >
              <div>
                <div className="flex justify-between items-center pb-4 border-b border-surface-variant mb-6">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 bg-[#E6EEFA] text-[#1657B5] rounded-full">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-serif text-xl font-bold text-primary">State Application Hub</h3>
                      <p className="font-sans text-[11px] text-on-surface-variant leading-none">Citizenship e-Docket Registry</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setIsAppsModalOpen(false)}
                    className="p-1 rounded-full hover:bg-background transition-colors cursor-pointer text-outline hover:text-primary"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="flex flex-col gap-4 max-h-[350px] overflow-y-auto no-scrollbar">
                  {myApplications.map((app) => (
                    <div key={app.id} className="p-4 rounded-xl border border-outline-variant/60 bg-background/50 flex flex-col sm:flex-row justify-between items-start gap-4">
                      <div className="flex-grow">
                        <div className="flex items-center gap-2 flex-wrap mb-1">
                          <span className="font-serif text-base font-bold text-primary">{app.name}</span>
                          <span className="font-sans font-mono text-[10px] text-outline">#{app.refNumber}</span>
                        </div>
                        <p className="font-sans text-xs text-on-surface-variant mb-2">{app.notes}</p>
                        <span className="font-sans text-[10px] text-outline">Last modified: {app.updatedAt}</span>
                      </div>

                      <div className="shrink-0 self-start sm:self-center">
                        {app.status === 'Approved' && (
                          <span className="inline-flex items-center gap-1 bg-[#E8F5E4] text-[#138808] px-3 py-1 rounded-full font-sans text-xs font-semibold">
                            <CheckCircle2 className="w-3.5 h-3.5 shrink-0" /> Approved
                          </span>
                        )}
                        {app.status === 'Pending Verification' && (
                          <span className="inline-flex items-center gap-1 bg-[#E6EEFA] text-[#1657B5] px-3 py-1 rounded-full font-sans text-xs font-semibold">
                            <Clock className="w-3.5 h-3.5 shrink-0" /> Verification
                          </span>
                        )}
                        {app.status === 'Action Needed' && (
                          <span className="inline-flex items-center gap-1 bg-[#FFDAD6] text-[#93000a] px-3 py-1 rounded-full font-sans text-xs font-semibold">
                            <X className="w-3.5 h-3.5 shrink-0" /> Action Needed
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-surface-variant flex justify-end gap-3 font-sans">
                <button 
                  onClick={() => setIsAppsModalOpen(false)}
                  className="px-6 py-2.5 rounded-full border border-outline-variant font-semibold text-xs text-primary hover:bg-background transition-colors cursor-pointer"
                >
                  Close docket
                </button>
                <button 
                  onClick={() => {
                    setIsAppsModalOpen(false);
                    setCurrentTab('search');
                  }}
                  className="bg-secondary-container hover:bg-secondary text-white px-6 py-2.5 rounded-full font-semibold text-xs transition-colors shadow-sm cursor-pointer"
                >
                  Retrieve new form
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
