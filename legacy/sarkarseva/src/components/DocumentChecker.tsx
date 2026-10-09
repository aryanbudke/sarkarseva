import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SERVICES } from '../data';
import { Info, Check, Printer, FileText, Download, UploadCloud, Trash2, CheckCircle2, ChevronDown } from 'lucide-react';

export default function DocumentChecker() {
  const [selectedServiceId, setSelectedServiceId] = React.useState('passport-issuance');

  const selectedService = React.useMemo(() => {
    return SERVICES.find(s => s.id === selectedServiceId) || SERVICES[0];
  }, [selectedServiceId]);

  // Record checklist checked state
  const [checkedDocs, setCheckedDocs] = React.useState<Record<string, boolean>>({
    'passport-issuance-0': true,
    'passport-issuance-1': false,
    'aadhaar-update-0': true
  });

  // Track simulated uploaded files per document key
  const [uploadedFiles, setUploadedFiles] = React.useState<Record<string, { name: string; size: string; type: string }>>({});
  const [dragActive, setDragActive] = React.useState<Record<string, boolean>>({});
  const [fileErrors, setFileErrors] = React.useState<Record<string, string>>({});

  const currentDocs = selectedService.documents || [];

  const toggleDoc = (key: string) => {
    setCheckedDocs(prev => {
      const newVal = !prev[key];
      // If we uncheck and had a file, we clean up the file
      if (!newVal && uploadedFiles[key]) {
        const copy = { ...uploadedFiles };
        delete copy[key];
        setUploadedFiles(copy);
      }
      return {
        ...prev,
        [key]: newVal
      };
    });
  };

  const computeMetrics = () => {
    const total = currentDocs.filter(d => d.mandatory).length;
    let readyCount = 0;
    currentDocs.forEach((doc, idx) => {
      if (doc.mandatory) {
        const key = `${selectedServiceId}-${idx}`;
        if (checkedDocs[key]) readyCount++;
      }
    });
    const progressPercent = total > 0 ? (readyCount / total) * 100 : 100;
    return { total, readyCount, progressPercent };
  };

  const { total, readyCount, progressPercent } = computeMetrics();

  // Drag and drop event handlers
  const handleDrag = (e: React.DragEvent, key: string, active: boolean) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(prev => ({ ...prev, [key]: active }));
  };

  const validateFile = (file: File) => {
    const errors: string[] = [];
    
    // Size check: max 10MB
    if (file.size > 10 * 1024 * 1024) {
      errors.push('File too large. Maximum size is 10MB.');
    }
    
    // Format check
    const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/jpg'];
    if (!allowedTypes.includes(file.type)) {
      errors.push('Invalid format. Please upload PDF, JPG, or PNG only.');
    }
    
    return errors;
  };

  const processFile = (file: File, key: string) => {
    const errors = validateFile(file);
    if (errors.length > 0) {
      setFileErrors(prev => ({ ...prev, [key]: errors[0] }));
      
      // Trigger shake animation via DOM
      const uploadDiv = document.getElementById(`upload-zone-${key}`);
      if (uploadDiv) {
        uploadDiv.classList.add('animate-shake');
        setTimeout(() => uploadDiv.classList.remove('animate-shake'), 500);
      }
      return;
    }
    
    setFileErrors(prev => {
      const copy = { ...prev };
      delete copy[key];
      return copy;
    });

    const sizeStr = (file.size / 1024).toFixed(1) + ' KB';
    setUploadedFiles(prev => ({
      ...prev,
      [key]: { name: file.name, size: sizeStr, type: file.type }
    }));
    // Auto check the document when a file is successfully uploaded
    setCheckedDocs(prev => ({
      ...prev,
      [key]: true
    }));
  };

  const handleDrop = (e: React.DragEvent, key: string) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(prev => ({ ...prev, [key]: false }));

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0], key);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>, key: string) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0], key);
    }
  };

  const removeFile = (key: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setUploadedFiles(prev => {
      const copy = { ...prev };
      delete copy[key];
      return copy;
    });
    setCheckedDocs(prev => ({
      ...prev,
      [key]: false
    }));
  };

  // TXT checklist downloader
  const handleDownloadTxtChecklist = () => {
    let content = `====================================================\n`;
    content += `         SARKARSEVA DOCUMENT VERIFICATION LIST      \n`;
    content += `====================================================\n`;
    content += `Service Guide: ${selectedService.name}\n`;
    content += `Department Registry: ${selectedService.authority}\n`;
    content += `Export Date: ${new Date().toLocaleDateString()}\n\n`;
    content += `Readiness: ${readyCount} of ${total} Documents Checked (${progressPercent.toFixed(0)}% ready)\n`;
    content += `----------------------------------------------------\n\n`;

    currentDocs.forEach((doc, idx) => {
      const key = `${selectedServiceId}-${idx}`;
      const isChecked = !!checkedDocs[key];
      const checkMarker = isChecked ? `[X] READY` : `[ ] MISSING`;
      const fileName = uploadedFiles[key] ? ` (File uploaded: ${uploadedFiles[key].name})` : '';

      content += `${idx + 1}. ${checkMarker} - ${doc.name} (${doc.mandatory ? 'Mandatory' : 'Optional'})\n`;
      content += `   Reason: ${doc.reason}\n`;
      content += `   Accepted formats: ${doc.formats.join(' | ')}${fileName}\n\n`;
    });

    content += `====================================================\n`;
    content += `Disclaimers: SarkarSeva is an educational knowledge base. Redirect to secure portals in compliance with standards.\n`;
    content += `====================================================\n`;

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${selectedServiceId}_required_documents.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-[1280px] mx-auto px-6 py-12">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        
        {/* Left Column: Context & Controls */}
        <div className="md:col-span-4 flex flex-col gap-6">
          <div className="bg-white shadow-[0_1px_3px_rgba(26,26,46,0.06),0_4px_16px_rgba(26,26,46,0.06)] rounded-2xl p-6 border border-[#FFF3E8]">
            <h1 className="font-serif text-2xl md:text-3xl text-[#1A1A2E] font-bold mb-3 flex items-center gap-2">
              <FileText className="w-6 h-6 text-[#FF6B00]" />
              Document Checker
            </h1>
            <p className="text-[#3D3D5C] font-sans text-xs leading-relaxed mb-6">
              Select any of the 12 administrative services to instantly load its designated list of certified required documents. Match and cross check files to satisfy state requirements.
            </p>

            <div className="flex flex-col gap-2">
              <label className="font-sans text-xs font-semibold text-[#1A1A2E]">Select Target Service:</label>
              <div className="relative">
                <select 
                  className="w-full bg-white appearance-none border border-[#FFD4B0] focus:border-[#FF6B00] rounded-xl px-4 py-3 text-sm text-[#1A1A2E] transition-all outline-none pr-10 cursor-pointer font-sans"
                  value={selectedServiceId}
                  onChange={(e) => setSelectedServiceId(e.target.value)}
                >
                  {SERVICES.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.emoji} {s.name}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-[#7A7A9A] w-4 h-4 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Progress Card */}
          <div className="bg-white shadow-[0_1px_3px_rgba(26,26,46,0.06),0_4px_16px_rgba(26,26,46,0.06)] rounded-2xl p-6 border border-[#FFF3E8]">
            <div className="flex justify-between items-end mb-2">
              <h3 className="font-serif text-base font-bold text-[#1A1A2E]">Portfolio Readiness</h3>
              <span className="font-sans text-xs font-bold text-[#FF6B00]" id="progress-text">
                {readyCount} of {total} mandatory ready
              </span>
            </div>

            {/* Progress Bar */}
            <div className="w-full h-3 bg-[#FFF3E8] rounded-full overflow-hidden mb-6">
              <motion.div 
                className="h-full bg-[#FF6B00] rounded-full"
                animate={{ width: `${progressPercent}%`, backgroundColor: progressPercent === 100 ? '#138808' : '#FF6B00' }}
                transition={{ duration: 0.4 }}
              />
            </div>

            {progressPercent === 100 && total > 0 && (
              <div className="bg-green-50 border border-green-200 rounded-xl p-3 flex flex-col gap-2 shadow-sm mb-4">
                <p className="font-sans text-xs font-semibold text-green-800 leading-snug flex items-start gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
                  All mandatory documents ready! You can proceed to apply. Download your checklist below.
                </p>
              </div>
            )}

            <div className="flex flex-col gap-3 font-sans">
              <button 
                onClick={handleDownloadTxtChecklist}
                className="w-full bg-[#FFF3E8] hover:bg-[#FFD4B0] text-[#FF6B00] font-semibold text-xs py-2.5 px-4 rounded-full transition-colors flex items-center justify-center gap-2 cursor-pointer border border-[#FFD4B0] shadow-sm select-none"
              >
                <Download className="w-4 h-4 text-[#FF6B00]" />
                Download Checklist (.TXT)
              </button>
              <button 
                onClick={handlePrint}
                className="w-full bg-white hover:bg-surface border border-outline-variant text-[#3D3D5C] font-semibold text-xs py-2.5 px-4 rounded-full transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs select-none"
              >
                <Printer className="w-4 h-4 text-[#7A7A9A]" />
                Print Legal List
              </button>
            </div>
            
            {progressPercent === 100 && total > 0 && (
              <a 
                href={selectedService.applyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full mt-3 bg-[#FF6B00] hover:bg-[#E05600] text-white font-semibold text-sm py-3 px-4 rounded-full transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md text-center"
              >
                Apply Now →
              </a>
            )}
          </div>
        </div>

        {/* Right Column: Interactive Document Binder */}
        <div className="md:col-span-8 flex flex-col gap-4">
          <div className="flex items-center justify-between mb-2 px-1">
            <h2 className="font-serif text-lg font-bold text-[#1A1A2E]">Official Supporting Proofs ({currentDocs.length})</h2>
            <div className="bg-[#E6EEFA] text-[#1657B5] px-3.5 py-1 rounded-full font-sans text-[11px] font-bold flex items-center gap-1.5 shadow-xs">
              <Info className="w-3.5 h-3.5 shrink-0" />
              {selectedService.authority} Standards
            </div>
          </div>

          <div className="flex flex-col gap-4" id="checklist-container">
            {currentDocs.length > 0 ? (
              currentDocs.map((doc, idx) => {
                const key = `${selectedServiceId}-${idx}`;
                const isChecked = !!checkedDocs[key];
                const fileUploaded = uploadedFiles[key];
                const isDragActive = !!dragActive[key];

                return (
                  <motion.div 
                    key={idx}
                    layoutId={`doc-card-${selectedServiceId}-${idx}`}
                    className={`bg-white shadow-[0_1px_3px_rgba(26,26,46,0.06),0_4px_16px_rgba(26,26,46,0.06)] rounded-2xl p-6 border-l-4 transition-all duration-200 flex flex-col gap-4 ${
                      isChecked 
                        ? 'border-[#138808] bg-[#E8F5E4]/5 hover:shadow-[0_4px_16px_rgba(20,150,20,0.04)]' 
                        : 'border-transparent hover:border-[#FFD4B0] hover:shadow-[0_8px_24px_rgba(26,26,46,0.06)]'
                    }`}
                  >
                    {/* Header line of Card */}
                    <div className="flex gap-4 items-start">
                      <div 
                        onClick={() => toggleDoc(key)}
                        className={`w-5.5 h-5.5 shrink-0 rounded-md border-2 flex items-center justify-center transition-all duration-200 mt-1 cursor-pointer select-none ${
                          isChecked 
                            ? 'bg-[#138808] border-[#138808]' 
                            : 'border-outline-variant bg-white hover:border-[#FF6B00]'
                        }`}
                      >
                        <Check className={`w-3.5 h-3.5 text-white transition-opacity ${
                          isChecked ? 'opacity-100' : 'opacity-0'
                        }`} />
                      </div>

                      <div className="flex-grow">
                        <div className="flex justify-between items-start mb-1 flex-wrap gap-2">
                          <h4 
                            onClick={() => toggleDoc(key)}
                            className={`font-serif text-base font-bold text-[#1A1A2E] cursor-pointer transition-all select-none hover:text-[#FF6B00] ${
                              isChecked ? 'line-through text-outline' : ''
                            }`}
                          >
                            {doc.name}
                          </h4>
                          <span className={`px-2.5 py-0.5 rounded-full font-sans text-[9px] font-bold uppercase tracking-wider ${
                            doc.mandatory ? "bg-[#FFF3E8] text-[#FF6B00]" : "bg-neutral-100 text-neutral-500"
                          }`}>
                            {doc.mandatory ? 'Mandatory' : 'Optional'}
                          </span>
                        </div>

                        <p className={`font-sans text-xs text-[#3D3D5C] leading-relaxed mb-3 ${
                          isChecked ? 'opacity-70' : ''
                        }`}>
                          {doc.reason}
                          {doc.condition && <span className="block mt-1 text-amber-700 italic">Condition: {doc.condition}</span>}
                        </p>

                        {/* List of Accepted Papers */}
                        <div className="bg-surface rounded-xl p-3 border border-outline-variant/30 text-[#1A1A2E] max-w-full overflow-hidden">
                          <span className="font-sans text-[11px] text-[#3D3D5C] block font-semibold mb-1.5">
                            Approved Formats (Select any one to fulfill):
                          </span>
                          <div className="flex flex-wrap gap-1.5">
                            {doc.formats.map((acc, aIdx) => (
                              <span 
                                key={aIdx} 
                                className={`px-2.5 py-0.5 border rounded-full font-sans text-[11px] font-medium transition-colors duration-200 ${
                                  isChecked 
                                    ? 'border-[#138808]/20 text-[#138808]/90 bg-[#E8F5E4]/30' 
                                    : 'border-[#FFF3E8] text-[#1A1A2E] bg-white'
                                }`}
                              >
                                {acc}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Integrated File Uploader supporting Drag & Drop */}
                    <div className="border-t border-dashed border-[#FFF3E8] pt-4 mt-1">
                      {fileUploaded ? (
                        <div className="flex items-center justify-between bg-emerald-50/40 p-3 rounded-xl border border-emerald-100">
                          <div className="flex items-center gap-2">
                            <div className="p-1.5 bg-[#E8F5E4] text-[#138808] rounded-lg">
                              {fileUploaded.type === 'application/pdf' ? <FileText className="w-4 h-4" /> : <img src={`data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23138808'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z'/%3E%3C/svg%3E`} className="w-4 h-4 object-contain" alt="IMG" />}
                            </div>
                            <div className="flex flex-col">
                              <span className="font-sans text-xs flex items-center gap-1 font-bold text-[#1A1A2E] truncate max-w-[200px] sm:max-w-[320px]">
                                {fileUploaded.name} <CheckCircle2 className="w-3.5 h-3.5 text-green-500" />
                              </span>
                              <span className="font-sans text-[10px] text-emerald-700/80">
                                Size: {fileUploaded.size} • File received
                              </span>
                            </div>
                          </div>
                          <button
                            onClick={(e) => removeFile(key, e)}
                            className="p-1.5 text-[#7A7A9A] hover:text-red-500 rounded-lg hover:bg-neutral-100 transition-colors cursor-pointer flex items-center gap-1 bg-white border border-gray-200"
                            title="Remove file"
                          >
                            <span className="text-[10px] font-bold">Remove</span>
                            <span className="text-sm leading-none">×</span>
                          </button>
                        </div>
                      ) : (
                        <div className="flex flex-col gap-2">
                          <div
                            id={`upload-zone-${key}`}
                            onDragEnter={(e) => handleDrag(e, key, true)}
                            onDragOver={(e) => handleDrag(e, key, true)}
                            onDragLeave={(e) => handleDrag(e, key, false)}
                            onDrop={(e) => handleDrop(e, key)}
                            className={`border-2 border-dashed rounded-xl p-4 text-center transition-all flex flex-col items-center justify-center cursor-pointer ${
                              isDragActive 
                                ? 'border-[#FF6B00] bg-[#FFF3E8]/30 scale-[0.99]' 
                                : fileErrors[key] ? 'border-red-400 bg-red-50' : 'border-outline-variant hover:border-[#FFD4B0] bg-surface-container-lowest hover:bg-white'
                            }`}
                          >
                            <input
                              type="file"
                              id={`file-input-${key}`}
                              className="hidden"
                              onChange={(e) => handleFileInput(e, key)}
                              accept=".pdf,.jpg,.jpeg,.png"
                            />
                            <label 
                              htmlFor={`file-input-${key}`}
                              className="cursor-pointer flex flex-col items-center w-full"
                            >
                              <UploadCloud className={`w-5 h-5 mb-1.5 ${fileErrors[key] ? 'text-red-500' : 'text-[#FF6B00] animate-pulse'}`} />
                              <p className="font-sans text-xs font-semibold text-[#1A1A2E] mb-0.5">
                                Drag & Drop scanned proof, or <span className="text-[#FF6B00] underline">browse local file</span>
                              </p>
                              <p className="font-sans text-[10px] text-[#7A7A9A]">
                                Supports PDF, JPEG or PNG up to 10MB
                              </p>
                            </label>
                          </div>
                          {fileErrors[key] && (
                            <p className="text-red-500 text-[10px] font-semibold text-center">{fileErrors[key]}</p>
                          )}
                        </div>
                      )}
                    </div>

                  </motion.div>
                );
              })
            ) : (
              <div className="text-center py-12 bg-white rounded-2xl border border-dashed border-outline-variant">
                <p className="font-sans text-sm text-[#7A7A9A]">
                  No explicit checklist records needed for this self-service profile.
                </p>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
