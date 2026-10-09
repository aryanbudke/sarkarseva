import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SERVICES } from '../data';
import { Globe, Clock, IndianRupee, ArrowRight } from 'lucide-react';

interface ServicesDirectoryProps {
  initialCategory?: string;
  onSelectService: (id: string) => void;
}

const CATEGORIES = [
  'All',
  'Identity',
  'Driving',
  'Passport',
  'Certificates',
  'Education',
  'Housing',
  'Health',
  'Business',
  'Social',
  'Agriculture'
];

export default function ServicesDirectory({ initialCategory = 'All', onSelectService }: ServicesDirectoryProps) {
  const [activeCategory, setActiveCategory] = useState(
    initialCategory === 'all' ? 'All' : initialCategory
  );

  useEffect(() => {
    setActiveCategory(initialCategory === 'all' ? 'All' : initialCategory);
  }, [initialCategory]);

  const filteredServices = SERVICES.filter((service) => {
    if (activeCategory === 'All') return true;
    return service.category.toLowerCase() === activeCategory.toLowerCase();
  });

  return (
    <div className="max-w-[1280px] mx-auto px-6 py-12 flex-grow">
      <div className="text-center mb-10">
        <h1 className="font-serif font-bold text-[#1A1A2E] text-[36px] mb-3">
          Government Services
        </h1>
        <p className="font-sans text-[#3D3D5C] text-base max-w-2xl mx-auto">
          Official step-by-step guides to 30+ central and state services. All information sourced from official government portals.
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-2 mb-10">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`font-sans text-sm px-5 py-2 rounded-full border transition-all cursor-pointer ${
              activeCategory === cat
                ? 'bg-[#1A1A2E] text-white border-[#1A1A2E] font-semibold shadow-md'
                : 'bg-white text-[#3D3D5C] border-[#e3e2df] hover:border-[#FF6B00] hover:text-[#FF6B00]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <motion.div 
        layout
        className="grid gap-4"
        style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}
      >
        <AnimatePresence>
          {filteredServices.map((service) => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              key={service.id}
              onClick={() => onSelectService(service.id)}
              className="bg-white border border-[#e3e2df] rounded-[14px] p-5 hover:border-[#FF6B00] hover:shadow-[0_8px_24px_rgba(26,26,46,0.08)] hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-start gap-3 mb-2">
                  <span className="text-2xl">{service.emoji}</span>
                  <div className="flex flex-col">
                    <h3 className="font-sans font-semibold text-[15px] text-[#1A1A2E] leading-tight group-hover:text-[#FF6B00] transition-colors">
                      {service.name}
                    </h3>
                    <span className="font-sans text-[12px] text-[#7A7A9A] mt-1 line-clamp-1">
                      {service.department || service.authority}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col gap-1.5 mt-4">
                  <div className="flex items-center text-[12px] text-[#3D3D5C] font-sans">
                    <Globe className="w-3.5 h-3.5 mr-2 text-[#FF6B00]" />
                    <span className="line-clamp-1">{service.mode}</span>
                  </div>
                  <div className="flex items-center text-[12px] text-[#3D3D5C] font-sans">
                    <Clock className="w-3.5 h-3.5 mr-2 text-[#FF6B00]" />
                    <span className="line-clamp-1">{service.time || service.timeEstimate}</span>
                  </div>
                  <div className="flex items-center text-[12px] text-[#3D3D5C] font-sans">
                    <IndianRupee className="w-3.5 h-3.5 mr-2 text-[#FF6B00]" />
                    <span className="line-clamp-1">{service.fee}</span>
                  </div>
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-[#f5f4f0] flex justify-end">
                <span className="font-sans text-[13px] font-semibold text-[#FF6B00] flex items-center gap-1 group-hover:gap-2 transition-all">
                  View Guide <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </motion.div>
          ))}
          {filteredServices.length === 0 && (
            <div className="col-span-full py-16 text-center text-[#7A7A9A] font-sans">
              No services found in this category yet.
            </div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
