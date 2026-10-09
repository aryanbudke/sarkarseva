import { ServiceDetails } from './types';

export const NEW_SERVICES: ServiceDetails[] = [
{
  id: 'aadhaar-update',
  name: 'Aadhaar Card Update',
  emoji: '🪪',
  category: 'identity',
  department: 'UIDAI',
  authority: 'UIDAI',
  fee: 'Free (online) / ₹50 (offline)',
  time: '3–5 working days',
  timeEstimate: '3–5 working days',
  mode: 'Online',
  difficulty: 'easy',
  applyUrl: 'https://myaadhaar.uidai.gov.in',
  portalUrl: 'https://uidai.gov.in',
  overview: 'Update your name, address, date of birth, gender, mobile number, or email ID on your Aadhaar card through the official UIDAI self-service portal. No visit to any office required for most updates.',
  steps: [
    { n:1, title:'Visit myAadhaar portal', desc:'Go to myaadhaar.uidai.gov.in on any browser.', link:'https://myaadhaar.uidai.gov.in' },
    { n:2, title:'Login with OTP', desc:'Enter your 12-digit Aadhaar number. An OTP will be sent to your registered mobile number. Enter the OTP to login.' },
    { n:3, title:'Select update type', desc:'Choose what you want to update: Name, Address, Date of Birth, Gender, Mobile Number, or Email ID.' },
    { n:4, title:'Fill new details', desc:'Enter the corrected information exactly as it appears on your supporting document.' },
    { n:5, title:'Upload supporting document', desc:'Upload a clear, colour scan or photo of your proof document (under 2MB, PDF or JPG).' },
    { n:6, title:'Submit and note URN', desc:'Click Submit. You will receive a 14-digit Update Request Number (URN). Save it to track your request at status.uidai.gov.in.' }
  ],
  documents: [
    { name:'Valid Aadhaar Card', reason:'Your current Aadhaar number is required to login', formats:['Original'], mandatory:true },
    { name:'Registered Mobile Number', reason:'OTP verification is sent to this number', formats:['Active SIM'], mandatory:true },
    { name:'Proof of Address', reason:'Required for address update only', formats:['Passport','Bank Statement (last 3 months)','Electricity Bill (last 3 months)','Ration Card','Voter ID'], mandatory:false, condition:'Only if updating address' },
    { name:'Proof of Date of Birth', reason:'Required for DoB correction', formats:['Birth Certificate','10th Marksheet','PAN Card','Passport'], mandatory:false, condition:'Only if correcting date of birth' }
  ],
  faqs:[
    { q:'How long does Aadhaar update take?', a:'Online updates typically take 3–5 working days. You can track status at resident.uidai.gov.in using your URN.' },
    { q:'My mobile number is not registered with Aadhaar. Can I still update online?', a:'No. You need a registered mobile number for OTP-based online login. Visit your nearest Aadhaar Seva Kendra for offline update — it costs ₹50.' },
    { q:'How many times can I update my name?', a:'Name can be updated maximum 2 times. Date of birth can be updated only once. Address can be updated unlimited times.' },
    { q:'Can I update Aadhaar for my child?', a:'Yes. A parent or guardian can update a child\'s Aadhaar using the child\'s Aadhaar number and the guardian\'s registered mobile number.' }
  ],
  lastUpdated: 'May 2026',
  state: 'All India'
},
{
  id: 'pan-card-new',
  name: 'New PAN Card Application',
  emoji: '🪪',
  category: 'identity',
  department: 'Income Tax Department (NSDL/UTIITSL)',
  authority: 'Income Tax Department',
  fee: '₹107 (Indian address) / ₹1,017 (foreign address)',
  time: '15–20 working days',
  timeEstimate: '15–20 working days',
  mode: 'Online',
  difficulty: 'easy',
  applyUrl: 'https://www.onlineservices.nsdl.com/paam/endUserRegisterContact.html',
  portalUrl: 'https://www.incometax.gov.in',
  overview: 'Apply for a new Permanent Account Number (PAN) card online through NSDL or UTIITSL. PAN is mandatory for income tax filing, opening bank accounts, and financial transactions above ₹50,000.',
  steps: [
    { n:1, title:'Go to NSDL or UTIITSL portal', desc:'Visit onlineservices.nsdl.com or myutiitsl.com. Both are authorised by the Income Tax Department.', link:'https://www.onlineservices.nsdl.com' },
    { n:2, title:'Fill Form 49A (Indian citizen)', desc:'Select "New PAN - Indian Citizen (Form 49A)". Fill all details: full name as per Aadhaar, date of birth, father\'s name, address, and contact details.' },
    { n:3, title:'Upload documents', desc:'Upload scanned copies of your identity proof, address proof, and date of birth proof. Photos must be in JPEG under 50KB.' },
    { n:4, title:'Upload photo and signature', desc:'Upload a recent passport-size photograph (white background, 3.5×2.5 cm) and a scanned signature on white paper.' },
    { n:5, title:'Pay the fee', desc:'Pay ₹107 via debit/credit card, net banking, or UPI. Keep the payment receipt.' },
    { n:6, title:'e-Sign or send physical documents', desc:'For paperless PAN: do Aadhaar-based e-KYC and e-Sign. Otherwise, send printed application + documents by post to the processing centre.' },
    { n:7, title:'Track your PAN', desc:'Track status at tin.tin.nsdl.com/pantan/StatusTrack.html using your 15-digit acknowledgement number.' }
  ],
  documents: [
    { name:'Identity Proof', reason:'Confirms your identity', formats:['Aadhaar Card','Voter ID','Passport','Driving Licence'], mandatory:true },
    { name:'Address Proof', reason:'Confirms your residential address', formats:['Aadhaar Card','Passport','Voter ID','Electricity Bill','Bank Statement'], mandatory:true },
    { name:'Date of Birth Proof', reason:'Confirms your date of birth', formats:['Birth Certificate','10th Marksheet','Aadhaar Card','Passport'], mandatory:true },
    { name:'Passport-size Photograph', reason:'Printed on the PAN card', formats:['JPEG, 3.5×2.5 cm, white background, under 50KB'], mandatory:true },
    { name:'Signature on white paper', reason:'Printed on the PAN card', formats:['Scanned JPEG, black ink on white paper'], mandatory:true }
  ],
  faqs:[
    { q:'What is the difference between NSDL and UTIITSL?', a:'Both are authorised by the Income Tax Department to issue PAN cards. You can use either. The process and fee are identical.' },
    { q:'Can I apply for PAN if I don\'t have Aadhaar?', a:'Yes, but you must send physical documents by post. Aadhaar-based e-KYC enables completely paperless application.' },
    { q:'What is an Instant PAN?', a:'You can get an instant e-PAN free of charge using your Aadhaar number at incometax.gov.in/iec/foportal. It is a PDF PAN card issued in minutes and is legally valid.' }
  ],
  lastUpdated: 'May 2026',
  state: 'All India'
},
{
  id: 'voter-id',
  name: 'Voter ID (EPIC) — New or Correction',
  emoji: '🗳️',
  category: 'identity',
  department: 'Election Commission of India',
  authority: 'Election Commission of India',
  fee: 'Free',
  time: '30 days',
  timeEstimate: '30 days',
  mode: 'Online',
  difficulty: 'easy',
  applyUrl: 'https://voters.eci.gov.in',
  portalUrl: 'https://eci.gov.in',
  overview: 'Apply for a new Voter ID card (EPIC) or correct errors in your existing voter registration online through the National Voter\'s Service Portal (NVSP). You must be 18+ as on 1st January of the qualifying year.',
  steps: [
    { n:1, title:'Visit Voters Portal', desc:'Go to voters.eci.gov.in — the official National Voters\' Service Portal.', link:'https://voters.eci.gov.in' },
    { n:2, title:'Register / Login', desc:'Create an account with your mobile number and email ID.' },
    { n:3, title:'Fill Form 6 (new registration)', desc:'Select Form 6 for new voter registration. Fill your name, date of birth, address, and family member details for address verification.' },
    { n:4, title:'Upload documents', desc:'Upload proof of age and proof of address. Your Aadhaar card serves as both.' },
    { n:5, title:'Submit and track', desc:'Submit the form. A Booth Level Officer (BLO) will verify your address. Track status on the same portal.' }
  ],
  documents: [
    { name:'Age Proof', reason:'Must be 18+ to register', formats:['Birth Certificate','10th Marksheet','Aadhaar Card','Passport'], mandatory:true },
    { name:'Address Proof (same constituency)', reason:'You vote in the constituency where you live', formats:['Aadhaar Card','Passport','Bank Passbook','Utility Bill'], mandatory:true },
    { name:'Passport-size Photograph', reason:'Printed on Voter ID card', formats:['JPEG under 200KB'], mandatory:true }
  ],
  faqs:[
    { q:'I already have a Voter ID but want to correct my name. Which form to use?', a:'Use Form 8 for corrections to existing voter registration. Available on the same voters.eci.gov.in portal.' },
    { q:'Can I vote if I have applied but not received my card?', a:'Yes. You can vote using the SMS reference number from your application as proof if your name appears on the electoral roll. Check at electoralsearch.eci.gov.in.' }
  ],
  lastUpdated: 'May 2026',
  state: 'All India'
},
{
  id: 'digilocker',
  name: 'DigiLocker Account Setup',
  emoji: '📱',
  category: 'identity',
  department: 'Ministry of Electronics & IT (MeitY)',
  authority: 'MeitY',
  fee: 'Free',
  time: 'Instant',
  timeEstimate: 'Instant',
  mode: 'Online',
  difficulty: 'easy',
  applyUrl: 'https://digilocker.gov.in',
  portalUrl: 'https://digilocker.gov.in',
  overview: 'DigiLocker is a government-issued digital document wallet. Store and access your Aadhaar, PAN, driving licence, marksheets, and more digitally. Documents from DigiLocker are legally equivalent to originals.',
  steps: [
    { n:1, title:'Visit DigiLocker', desc:'Go to digilocker.gov.in or download the DigiLocker app from Play Store or App Store.', link:'https://digilocker.gov.in' },
    { n:2, title:'Sign up with mobile number', desc:'Enter your mobile number. An OTP is sent. Verify it.' },
    { n:3, title:'Link Aadhaar', desc:'Enter your Aadhaar number and verify with OTP to link and activate your account.' },
    { n:4, title:'Access your documents', desc:'Your Aadhaar, PAN, driving licence, vehicle RC, and CBSE marksheets automatically appear in "Issued Documents". No upload needed for government-issued documents.' },
    { n:5, title:'Share documents', desc:'Share documents digitally with any agency using the secure DigiLocker sharing link.' }
  ],
  documents: [
    { name:'Mobile Number (linked to Aadhaar)', reason:'Used for account creation and OTP', formats:['Active SIM'], mandatory:true },
    { name:'Aadhaar Card', reason:'Links your identity to the DigiLocker account', formats:['12-digit Aadhaar number'], mandatory:true }
  ],
  faqs:[
    { q:'Are DigiLocker documents legally valid?', a:'Yes. Under the IT Act 2000 and amendments, documents issued through DigiLocker are legally equivalent to original physical documents.' },
    { q:'What documents can I find in DigiLocker?', a:'Aadhaar, PAN, Driving Licence, Vehicle RC, CBSE/ICSE/state board marksheets, degree certificates (from linked universities), Ayushman Bharat card, insurance policies, and more.' }
  ],
  lastUpdated: 'May 2026',
  state: 'All India'
},
{
  id: 'learners-licence',
  name: 'New Learner\'s Licence',
  emoji: '🚗',
  category: 'driving',
  department: 'Ministry of Road Transport & Highways (MoRTH) / RTO',
  authority: 'MoRTH / RTO',
  fee: '₹200',
  time: 'Same day (online slot)',
  timeEstimate: 'Same day (online slot)',
  mode: 'Online + Visit RTO',
  difficulty: 'easy',
  applyUrl: 'https://sarathi.parivahan.gov.in',
  portalUrl: 'https://sarathi.parivahan.gov.in',
  overview: 'Apply for a Learner\'s Licence (LL) online through the Sarathi portal and book a slot for the computer-based test at your nearest RTO. You must hold a Learner\'s Licence for at least 30 days before applying for a Permanent Driving Licence.',
  steps: [
    { n:1, title:'Apply on Sarathi portal', desc:'Visit sarathi.parivahan.gov.in. Select your state. Click "Apply for Learner Licence" under New LL.', link:'https://sarathi.parivahan.gov.in' },
    { n:2, title:'Fill application form', desc:'Enter personal details, address, vehicle category (motorcycle/car/commercial), and emergency contact.' },
    { n:3, title:'Upload documents', desc:'Upload Aadhaar (or address proof), age proof, and passport-size photograph.' },
    { n:4, title:'Pay fee online', desc:'Pay ₹200 fee via UPI, debit/credit card, or net banking.' },
    { n:5, title:'Book RTO slot', desc:'Choose a date and time for your LL test at your nearest RTO.' },
    { n:6, title:'Visit RTO for computer test', desc:'Carry original documents. Appear for a 15-question computer-based test on traffic rules. Pass mark is 9/15.' },
    { n:7, title:'Receive Learner\'s Licence', desc:'If you pass, your LL is issued immediately at the RTO or sent by post within 7 days.' }
  ],
  documents: [
    { name:'Age Proof (original)', reason:'Must be 18+ for a car/motorcycle licence', formats:['Aadhaar Card','Birth Certificate','10th Marksheet','Passport'], mandatory:true },
    { name:'Address Proof (original)', reason:'Required for RTO jurisdiction verification', formats:['Aadhaar Card','Voter ID','Passport','Utility Bill (last 3 months)'], mandatory:true },
    { name:'Passport-size Photographs', reason:'Printed on the licence', formats:['2 recent colour photos, white background, 3.5×2.5 cm'], mandatory:true },
    { name:'Medical Certificate (Form 1A)', reason:'Physical fitness declaration — most RTOs accept self-declaration', formats:['Printed Form 1A signed by a registered doctor'], mandatory:true }
  ],
  faqs:[
    { q:'Can I drive alone with a Learner\'s Licence?', a:'No. You must always be accompanied by a person holding a valid Permanent Driving Licence for the same vehicle category.' },
    { q:'How long is a Learner\'s Licence valid?', a:'A Learner\'s Licence is valid for 6 months from the date of issue.' },
    { q:'What happens if I fail the computer test?', a:'You can appear for the test again after 7 days. There is no additional fee for re-tests within 60 days of the original booking.' }
  ],
  lastUpdated: 'May 2026',
  state: 'State Specific'
},
{
  id: 'permanent-driving-licence',
  name: 'New Permanent Driving Licence',
  emoji: '🚗',
  category: 'driving',
  department: 'Ministry of Road Transport & Highways / RTO',
  authority: 'MoRTH / RTO',
  fee: '₹200 (smart card) + ₹300 (test fee)',
  time: '15–30 days',
  timeEstimate: '15–30 days',
  mode: 'Online + Visit RTO',
  difficulty: 'medium',
  applyUrl: 'https://sarathi.parivahan.gov.in',
  portalUrl: 'https://sarathi.parivahan.gov.in',
  overview: 'After holding a valid Learner\'s Licence for at least 30 days, you can apply for a Permanent Driving Licence (DL). The process involves an online application and a practical driving test at your RTO.',
  steps: [
    { n:1, title:'Wait 30 days after getting LL', desc:'You must hold your Learner\'s Licence for at least 30 days before applying for permanent DL.' },
    { n:2, title:'Apply online on Sarathi', desc:'Go to sarathi.parivahan.gov.in → New DL. Enter your LL number, date of birth, and fill the form.', link:'https://sarathi.parivahan.gov.in' },
    { n:3, title:'Upload documents and pay fee', desc:'Upload LL copy, photograph, and address proof. Pay ₹500 (₹200 + ₹300) online.' },
    { n:4, title:'Book driving test slot', desc:'Choose a date for your practical driving test at the RTO. Some RTOs have automated test tracks.' },
    { n:5, title:'Appear for driving test', desc:'Bring your Learner\'s Licence and all original documents. Demonstrate basic driving skills on the RTO track or road.' },
    { n:6, title:'Receive DL', desc:'If you pass, DL is printed and issued at RTO or posted to your address within 7 working days.' }
  ],
  documents: [
    { name:'Valid Learner\'s Licence', reason:'Required to apply — must be at least 30 days old', formats:['Original LL card or printout'], mandatory:true },
    { name:'Age Proof (original)', reason:'Verification of minimum age requirement', formats:['Aadhaar Card','Birth Certificate','10th Marksheet','Passport'], mandatory:true },
    { name:'Address Proof (original)', reason:'For RTO jurisdiction and DL address', formats:['Aadhaar Card','Voter ID','Passport'], mandatory:true },
    { name:'Passport-size Photographs', reason:'Printed on the DL card', formats:['2 recent colour photos, white background'], mandatory:true },
    { name:'Medical Certificate (Form 1A)', reason:'Physical fitness certification', formats:['Signed by a registered MBBS doctor'], mandatory:true }
  ],
  faqs:[
    { q:'What if I fail the driving test?', a:'You can re-appear after 7 days. No extra fee for re-test within 60 days.' },
    { q:'Is there a driving school requirement?', a:'No, but many states allow you to skip the manual driving test if you submit a certificate from a government-recognised driving school.' },
    { q:'For how long is a Driving Licence valid?', a:'A non-transport vehicle DL is valid for 20 years from the date of issue or until the holder turns 50, whichever is earlier.' }
  ],
  lastUpdated: 'May 2026',
  state: 'State Specific'
},
{
  id: 'dl-renewal',
  name: 'Driving Licence Renewal',
  emoji: '🔄',
  category: 'driving',
  department: 'Ministry of Road Transport / RTO',
  authority: 'MoRTH / RTO',
  fee: '₹200–₹500',
  time: '7–15 days',
  timeEstimate: '7–15 days',
  mode: 'Online',
  difficulty: 'easy',
  applyUrl: 'https://sarathi.parivahan.gov.in',
  portalUrl: 'https://sarathi.parivahan.gov.in',
  overview: 'Renew your expired or about-to-expire Driving Licence online through the Sarathi portal. You can apply up to 1 year before expiry. Renewal is now fully online for non-commercial vehicles with home delivery of smart card.',
  steps: [
    { n:1, title:'Apply on Sarathi portal', desc:'Go to sarathi.parivahan.gov.in → Renewal of DL. Enter DL number and date of birth.', link:'https://sarathi.parivahan.gov.in' },
    { n:2, title:'Fill renewal form', desc:'Update address if changed. Confirm vehicle categories to renew.' },
    { n:3, title:'Upload medical certificate', desc:'For drivers 40+ years, a medical certificate (Form 1) from a registered doctor is mandatory.' },
    { n:4, title:'Pay fee and submit', desc:'Pay ₹200–₹500 online. No RTO visit required for non-commercial vehicles.' },
    { n:5, title:'Receive smart card DL', desc:'Renewed DL smart card is posted to your registered address within 7–15 days.' }
  ],
  documents: [
    { name:'Original Driving Licence', reason:'Current licence details are needed for renewal', formats:['Original physical card'], mandatory:true },
    { name:'Address Proof', reason:'Required if address has changed', formats:['Aadhaar Card','Voter ID','Utility Bill'], mandatory:false },
    { name:'Medical Certificate (Form 1)', reason:'Mandatory for drivers aged 40 years and above', formats:['Signed by MBBS doctor on Form 1'], mandatory:false, condition:'Only if applicant is 40+ years old' }
  ],
  faqs:[
    { q:'My DL expired 2 years ago. Can I still renew?', a:'Yes, but a late fee is applicable. If expired more than 5 years ago, you may need to re-appear for a driving test.' },
    { q:'Can I drive with an expired licence while renewal is in progress?', a:'No. Driving with an expired licence is an offence. Carry the renewal application acknowledgement as proof of pending renewal.' }
  ],
  lastUpdated: 'May 2026',
  state: 'State Specific'
},
{
  id: 'passport-fresh',
  name: 'Passport — Fresh Application',
  emoji: '🛂',
  category: 'passport',
  department: 'Ministry of External Affairs (MEA)',
  authority: 'MEA',
  fee: '₹1,500 (normal, 30 pages) / ₹2,000 (normal, 60 pages) / ₹3,500 (Tatkaal)',
  time: '15–30 days (normal) / 1–3 days (Tatkaal)',
  timeEstimate: '15–30 days',
  mode: 'Online + Visit PSK/POSA',
  difficulty: 'medium',
  applyUrl: 'https://passportindia.gov.in',
  portalUrl: 'https://passportindia.gov.in',
  overview: 'Apply for your first Indian passport (or re-issue after expiry) online through the Passport Seva portal. Book an appointment at your nearest Passport Seva Kendra (PSK) or Post Office Passport Seva Kendra (POPSK). All 787+ districts now have passport services.',
  steps: [
    { n:1, title:'Register on Passport Seva portal', desc:'Go to passportindia.gov.in. Create an account with email and mobile number.', link:'https://passportindia.gov.in' },
    { n:2, title:'Fill application form online', desc:'Click "Apply for Fresh Passport/Re-issue". Fill Form-1 online. Choose 36-page or 60-page booklet.' },
    { n:3, title:'Pay fee and book appointment', desc:'Pay fee online. Book appointment at your nearest PSK, POPSK, or Passport Adalat.' },
    { n:4, title:'Visit PSK/POPSK with documents', desc:'Carry all ORIGINAL documents + ONE self-attested photocopy of each. Do not laminate any documents.' },
    { n:5, title:'Document verification + biometrics', desc:'At the PSK, your documents are verified in 3 queues (A, B, C). Biometrics (fingerprints + photo) are captured. Granting officer approves.' },
    { n:6, title:'Police verification (if required)', desc:'For fresh passports, police verification is conducted at your address. Keep documents ready for the police officer.' },
    { n:7, title:'Receive passport by Speed Post', desc:'Passport is dispatched by Speed Post to your address. Track at passportindia.gov.in or India Post tracking.' }
  ],
  documents: [
    { name:'Proof of Present Address', reason:'Passport is delivered here; police verification happens here', formats:['Aadhaar Card','Voter ID','Electricity Bill (last 3 months)','Bank Passbook (last 3 months)','Rent Agreement (notarised)'], mandatory:true },
    { name:'Proof of Date of Birth', reason:'Your birth date is printed on the passport', formats:['Birth Certificate (FIRST preference)','10th Marksheet (with DOB)','Aadhaar Card','Matriculation Certificate'], mandatory:true },
    { name:'Proof of Identity (Photo ID)', reason:'Identity verification at PSK', formats:['Aadhaar Card','PAN Card','Voter ID','Driving Licence'], mandatory:true },
    { name:'Old Passport', reason:'Required for re-issue; carry for fresh if you had one previously', formats:['Original passport (all pages)'], mandatory:false, condition:'Only for re-issue' },
    { name:'Annexure for Name Change / DOB Change', reason:'If name or DOB changed since last passport', formats:['Gazette Notification','Marriage Certificate (for women)'], mandatory:false }
  ],
  faqs:[
    { q:'What is Tatkaal passport and when should I use it?', a:'Tatkaal (urgent) passport is issued within 1–3 working days for an additional fee of ₹2,000. Useful for medical emergencies, business travel, or death of a relative abroad. Police verification happens after issuance.' },
    { q:'My appointment is weeks away. Is there a faster option?', a:'For Tatkaal, appointments are available sooner. You can also check for walk-in/Passport Adalat (mela) announcements on the portal.' },
    { q:'Can I use a print-out of my Aadhaar as address proof?', a:'Yes. A print-out of your Aadhaar letter or a copy from DigiLocker is accepted as valid Proof of Present Address at PSKs.' }
  ],
  lastUpdated: 'May 2026',
  state: 'All India'
},
{
  id: 'passport-renewal',
  name: 'Passport Renewal / Re-issue',
  emoji: '🔄',
  category: 'passport',
  department: 'Ministry of External Affairs (MEA)',
  authority: 'MEA',
  fee: '₹1,500 (normal) / ₹3,500 (Tatkaal)',
  time: '7–15 days (normal with post-police verification)',
  timeEstimate: '7–15 days',
  mode: 'Online + Visit PSK',
  difficulty: 'easy',
  applyUrl: 'https://passportindia.gov.in',
  portalUrl: 'https://passportindia.gov.in',
  overview: 'Re-issue your expired passport or get a new one due to expiry, damage, loss, change in personal particulars, or exhaustion of pages. The process is the same as fresh passport but faster as police verification may be waived for renewals with no change.',
  steps: [
    { n:1, title:'Login to Passport Seva portal', desc:'Login at passportindia.gov.in. Click "Apply for Re-issue of Passport".', link:'https://passportindia.gov.in' },
    { n:2, title:'Fill re-issue form', desc:'Select reason for re-issue (expiry, damage, change of name, etc.). Fill updated personal details.' },
    { n:3, title:'Pay and book appointment', desc:'Pay ₹1,500 online. Book PSK appointment.' },
    { n:4, title:'Visit PSK with documents', desc:'Carry original documents including your OLD PASSPORT (mandatory for re-issue).' },
    { n:5, title:'Receive passport', desc:'If police verification is waived (normal re-issue with no change), passport dispatched within 3–7 days.' }
  ],
  documents: [
    { name:'Old/Expired Passport', reason:'Mandatory for re-issue — all pages are surrendered', formats:['Original passport'], mandatory:true },
    { name:'Self-attested photocopy of all passport pages', reason:'PSK requires photocopies', formats:['All pages including blank pages'], mandatory:true },
    { name:'Proof of Present Address', reason:'Required if address has changed since last passport', formats:['Aadhaar Card','Voter ID','Utility Bill'], mandatory:false }
  ],
  faqs:[
    { q:'Is police verification needed for passport renewal?', a:'Not always. If your address is the same as the last passport and there are no changes, police verification may be waived (post-police verification). Tatkaal is issued before verification.' },
    { q:'My passport was lost/stolen. What do I do?', a:'File an FIR at your nearest police station first. Then apply for re-issue on the Passport Seva portal selecting "Lost/Stolen" as the reason. Carry the FIR copy to PSK.' }
  ],
  lastUpdated: 'May 2026',
  state: 'All India'
},
{
  id: 'income-certificate',
  name: 'Income Certificate',
  emoji: '📄',
  category: 'certificates',
  department: 'State Revenue Department / Tehsil Office',
  authority: 'State Revenue Dept',
  fee: 'Free (most states) / ₹20–₹50 (some states)',
  time: '15–30 days',
  timeEstimate: '15–30 days',
  mode: 'Online (state portal) or Offline (Tehsil)',
  difficulty: 'easy',
  applyUrl: 'https://services.india.gov.in/service/listing?cat_id=11&ln=en',
  portalUrl: 'https://www.india.gov.in',
  overview: 'An Income Certificate issued by your state government certifies your family\'s annual income. It is required for availing EWS reservations, scholarships, BPL ration cards, fee concessions, and many government schemes. Apply at your District Collector\'s office, Tehsil, or state e-District portal.',
  steps: [
    { n:1, title:'Find your state\'s e-District portal', desc:'Most states have online portals. Examples: AP — meeseva.ap.gov.in, Delhi — edistrict.delhigovt.nic.in, UP — edistrict.up.gov.in, Maharashtra — aaplesarkar.mahaonline.gov.in' },
    { n:2, title:'Register and fill application', desc:'Create account on your state portal. Fill income certificate application form with income details of all earning family members.' },
    { n:3, title:'Upload documents', desc:'Upload Aadhaar, ration card, salary slips or income proof documents.' },
    { n:4, title:'Submit and get acknowledgement', desc:'Submit form. Note the application reference number.' },
    { n:5, title:'Verification by Revenue Officer', desc:'A Tehsildar or Revenue Inspector may verify your details. Some states do this digitally.' },
    { n:6, title:'Download or collect certificate', desc:'Once approved, download digitally signed certificate from the portal or collect from Tehsil office.' }
  ],
  documents: [
    { name:'Aadhaar Card', reason:'Identity proof', formats:['Original + photocopy'], mandatory:true },
    { name:'Ration Card', reason:'Family income proof and family member details', formats:['Original + photocopy'], mandatory:true },
    { name:'Salary Slips / Income Proof', reason:'Proves stated income', formats:['Last 3 months salary slips','Form 16','IT returns (if filed)','Self-declaration for informal workers'], mandatory:true },
    { name:'Self-declaration on stamp paper', reason:'Required in many states for income declaration', formats:['₹10 or ₹20 non-judicial stamp paper'], mandatory:false }
  ],
  faqs:[
    { q:'How long is an Income Certificate valid?', a:'Income Certificates are typically valid for 1 year from the date of issue. You must renew annually for scholarships and EWS categories.' },
    { q:'Which income is counted — family or individual?', a:'All income certificate applications count the annual income of the entire family (all members living together), not just the applicant.' }
  ],
  lastUpdated: 'May 2026',
  state: 'State Specific'
},
{
  id: 'caste-certificate',
  name: 'Caste Certificate (SC/ST/OBC)',
  emoji: '📜',
  category: 'certificates',
  department: 'State Revenue Department / Tehsil Office',
  authority: 'State Revenue Dept',
  fee: 'Free',
  time: '15–30 days',
  timeEstimate: '15–30 days',
  mode: 'Online (state portal) or Offline',
  difficulty: 'easy',
  applyUrl: 'https://services.india.gov.in',
  portalUrl: 'https://socialjustice.gov.in',
  overview: 'A Caste Certificate issued by the state government certifies that you belong to a Scheduled Caste (SC), Scheduled Tribe (ST), or Other Backward Class (OBC). It is required for reservations in education and jobs, scholarships, and various government schemes.',
  steps: [
    { n:1, title:'Visit state e-District portal', desc:'Each state has its own portal. Search "[your state] caste certificate online apply" for the exact portal link.' },
    { n:2, title:'Fill application form', desc:'Enter personal details and provide details of your caste as listed in the state government\'s notified list.' },
    { n:3, title:'Submit documents', desc:'Upload supporting documents. The Tehsildar will verify based on your documents and a field enquiry.' },
    { n:4, title:'Collect certificate', desc:'Collect from Tehsil or download from the portal once issued.' }
  ],
  documents: [
    { name:'Aadhaar Card', reason:'Identity proof', formats:['Original + photocopy'], mandatory:true },
    { name:'Ration Card', reason:'Shows family name and caste', formats:['Original + photocopy'], mandatory:true },
    { name:'Parent\'s Caste Certificate', reason:'Hereditary proof of caste — most critical document', formats:['Father\'s or Mother\'s caste certificate'], mandatory:true },
    { name:'School Transfer Certificate / Birth Certificate', reason:'Address and identity proof', formats:['Original'], mandatory:true },
    { name:'Self-declaration affidavit', reason:'Required in many states', formats:['On ₹10 non-judicial stamp paper'], mandatory:false }
  ],
  faqs:[
    { q:'Can I use my parent\'s caste certificate as a substitute for mine?', a:'A parent\'s caste certificate is needed as SUPPORTING evidence to prove hereditary caste. You still need to apply for your own separate certificate.' },
    { q:'Is there a difference between SC/ST and OBC certificate procedures?', a:'The procedure is similar but the eligibility criteria differ. SC/ST lists are fixed by the central government. OBC lists differ state by state.' }
  ],
  lastUpdated: 'May 2026',
  state: 'State Specific'
},
{
  id: 'domicile-certificate',
  name: 'Domicile / Residence Certificate',
  emoji: '🏠',
  category: 'certificates',
  department: 'State Revenue Department / Tehsil Office',
  authority: 'State Revenue Dept',
  fee: 'Free to ₹50',
  time: '15 days',
  timeEstimate: '15 days',
  mode: 'Online (state portal)',
  difficulty: 'easy',
  applyUrl: 'https://services.india.gov.in',
  portalUrl: 'https://www.india.gov.in',
  overview: 'A Domicile Certificate certifies that you are a permanent resident of a particular state. It is required for state government jobs, admission to state universities, OBC certificates (in some states), and state-specific scholarship schemes.',
  steps: [
    { n:1, title:'Visit state portal', desc:'Go to your state\'s e-District portal (same portal used for Income/Caste certificate).' },
    { n:2, title:'Fill domicile application', desc:'Provide details of your stay in the state — you must have lived there for at least 15 years (3 years for some states).' },
    { n:3, title:'Upload documents', desc:'Upload Aadhaar, ration card, school certificates showing continuous residency.' },
    { n:4, title:'Receive certificate', desc:'Certificate is issued by the Tehsildar after verification.' }
  ],
  documents: [
    { name:'Aadhaar Card', reason:'Current address proof', formats:['Original + photocopy'], mandatory:true },
    { name:'Ration Card', reason:'Proof of long-term residency in the state', formats:['Original + photocopy'], mandatory:true },
    { name:'School Certificates (10th/12th)', reason:'Shows residence in the state for the required period', formats:['All marksheets showing institution in the state'], mandatory:true },
    { name:'Birth Certificate', reason:'If born in the state, strengthens the application', formats:['Original'], mandatory:false }
  ],
  faqs:[
    { q:'How many years of residency are required?', a:'Most states require 15 years of continuous residency. Some border states have different criteria. Children of permanent residents are automatically eligible.' }
  ],
  lastUpdated: 'May 2026',
  state: 'State Specific'
},
{
  id: 'birth-certificate',
  name: 'Birth Certificate',
  emoji: '👶',
  category: 'certificates',
  department: 'Municipal Corporation / Gram Panchayat',
  authority: 'Gram Panchayat',
  fee: '₹50–₹100',
  time: '7 days',
  timeEstimate: '7 days',
  mode: 'Online (crsorgi.gov.in)',
  difficulty: 'easy',
  applyUrl: 'https://crsorgi.gov.in',
  portalUrl: 'https://crsorgi.gov.in',
  overview: 'A Birth Certificate is the most fundamental government document. It is issued by the Civil Registration System under the Office of the Registrar General of India. Register a birth within 21 days to get a certificate for free; after 21 days, a late fee and supporting documents are required.',
  steps: [
    { n:1, title:'Hospital / Nursing Home registration', desc:'If the child was born in a hospital, the hospital typically registers the birth automatically. Follow up with them for the birth certificate.' },
    { n:2, title:'Apply on CRS portal (home births)', desc:'For home births, the head of family must register at crsorgi.gov.in within 21 days.', link:'https://crsorgi.gov.in' },
    { n:3, title:'Submit documents and pay fee', desc:'Pay ₹50 online. Late registration (after 21 days) requires affidavit and additional documents.' },
    { n:4, title:'Download digital certificate', desc:'Download the digitally signed birth certificate directly from the CRS portal or collect from Municipal office.' }
  ],
  documents: [
    { name:'Hospital Birth Record / Discharge Summary', reason:'Primary proof of birth date and place', formats:['Original hospital record'], mandatory:true },
    { name:'Parents\' Aadhaar Cards', reason:'Identity of parents for registration', formats:['Originals + photocopies'], mandatory:true },
    { name:'Marriage Certificate (parents)', reason:'Proof of parents\' marriage', formats:['Original'], mandatory:false }
  ],
  faqs:[
    { q:'My child is 5 years old and has no birth certificate. What do I do?', a:'Apply for late registration through your District Registrar. You will need a sworn affidavit, school admission records, hospital records, and an application approved by the Sub-Divisional Magistrate.' }
  ],
  lastUpdated: 'May 2026',
  state: 'State Specific'
},
{
  id: 'national-scholarship',
  name: 'National Scholarship Portal (NSP)',
  emoji: '🎓',
  category: 'education',
  department: 'Ministry of Education / Various Central Ministries',
  authority: 'Ministry of Education',
  fee: 'Free',
  time: 'Varies (1–3 months)',
  timeEstimate: '1–3 months',
  mode: 'Online',
  difficulty: 'easy',
  applyUrl: 'https://scholarships.gov.in',
  portalUrl: 'https://scholarships.gov.in',
  overview: 'The National Scholarship Portal is the single integrated platform for all Central Government scholarships — for SC/ST/OBC/Minority students, merit-based scholarships, and professional course scholarships. Over 100 scholarship schemes are available on this portal.',
  steps: [
    { n:1, title:'Register on NSP', desc:'Go to scholarships.gov.in. Click "New Registration". Fill basic details and verify mobile + email.', link:'https://scholarships.gov.in' },
    { n:2, title:'Login and fill application', desc:'Login with Application ID. Select the relevant scholarship scheme. Fill academic and family income details.' },
    { n:3, title:'Upload documents', desc:'Upload Aadhaar, bank passbook, income certificate, caste certificate (if applicable), bonafide certificate, and marksheets.' },
    { n:4, title:'Institute verification', desc:'Your school/college portal manager verifies your application.' },
    { n:5, title:'State/central verification', desc:'The concerned ministry or state department verifies and approves.' },
    { n:6, title:'Scholarship credited via DBT', desc:'Approved scholarship amount is directly transferred to your bank account via Direct Benefit Transfer (DBT).' }
  ],
  documents: [
    { name:'Aadhaar Card', reason:'Mandatory for DBT and identity', formats:['Original + photocopy'], mandatory:true },
    { name:'Bank Account Passbook (linked to Aadhaar)', reason:'Scholarship is transferred here via DBT', formats:['Bank passbook first page'], mandatory:true },
    { name:'Previous Year\'s Marksheet', reason:'Academic performance eligibility check', formats:['Original marksheet'], mandatory:true },
    { name:'Income Certificate (family)', reason:'Family income must be below scheme threshold', formats:['State-issued Income Certificate (current year)'], mandatory:true },
    { name:'Caste Certificate', reason:'Required for SC/ST/OBC schemes', formats:['State-issued Caste Certificate'], mandatory:false, condition:'Only for SC/ST/OBC/Minority schemes' },
    { name:'Bonafide Certificate from Institution', reason:'Proves current enrollment', formats:['From school/college on letterhead'], mandatory:true }
  ],
  faqs:[
    { q:'Can I apply for multiple scholarships on NSP?', a:'You can apply for one Central scheme and one State scheme simultaneously, but not two schemes under the same category.' },
    { q:'When does the NSP application window open?', a:'Typically July–October each year for the academic year. Check scholarships.gov.in for exact dates. Missing the deadline means waiting a full year.' }
  ],
  lastUpdated: 'May 2026',
  state: 'All India'
},
{
  id: 'pm-awas-urban',
  name: 'PM Awas Yojana — Urban (PMAY-U)',
  emoji: '🏠',
  category: 'housing',
  department: 'Ministry of Housing & Urban Affairs (MoHUA)',
  authority: 'MoHUA',
  fee: 'Free to apply',
  time: 'Varies (scheme-dependent)',
  timeEstimate: 'Varies',
  mode: 'Online',
  difficulty: 'medium',
  applyUrl: 'https://pmaymis.gov.in',
  portalUrl: 'https://pmaymis.gov.in',
  overview: 'PM Awas Yojana (Urban) provides financial assistance to urban poor for construction/purchase of pucca house. EWS families get houses built; LIG/MIG families get interest subsidy on home loans (Credit Linked Subsidy Scheme — CLSS). The scheme is for first-time home buyers only.',
  steps: [
    { n:1, title:'Check eligibility', desc:'EWS: annual income up to ₹3L. LIG: ₹3L–₹6L. MIG-I: ₹6L–₹12L. MIG-II: ₹12L–₹18L. Must be a first-time home buyer. No pucca house anywhere in India.', link:'https://pmaymis.gov.in' },
    { n:2, title:'Apply on PMAY-U portal', desc:'Go to pmaymis.gov.in. Click "Citizen Assessment". Select your income category. Fill Aadhaar details.' },
    { n:3, title:'Fill family and income details', desc:'Enter family income, present house status, and details of proposed house/loan.' },
    { n:4, title:'Submit and track', desc:'Note your assessment ID. Your application goes to Urban Local Body (Municipality/ULB) for verification.' },
    { n:5, title:'For CLSS: apply through bank', desc:'For home loan interest subsidy, apply through your bank or HFC (Housing Finance Company) after getting PMAY approval.' }
  ],
  documents: [
    { name:'Aadhaar Card (all adult family members)', reason:'Mandatory for scheme application and subsidy', formats:['Originals + photocopies'], mandatory:true },
    { name:'Income Proof', reason:'Determines EWS/LIG/MIG category', formats:['Salary slips','ITR','Income Certificate'], mandatory:true },
    { name:'Self-declaration of no pucca house', reason:'Confirms first-time home buyer status', formats:['Self-declaration on stamp paper'], mandatory:true },
    { name:'Property / Plot Documents', reason:'Required for construction component', formats:['Sale deed','Allotment letter'], mandatory:false, condition:'Required for construction/purchase' },
    { name:'Bank Loan Sanction Letter', reason:'Required for CLSS interest subsidy', formats:['From bank/HFC'], mandatory:false, condition:'Only for home loan interest subsidy route' }
  ],
  faqs:[
    { q:'How much subsidy will I get under PMAY CLSS?', a:'EWS/LIG: 6.5% interest subsidy on loan up to ₹6 lakh (NPV benefit ₹2.67 lakh). MIG-I: 4% on loan up to ₹9L. MIG-II: 3% on loan up to ₹12L.' },
    { q:'My wife doesn\'t have a PAN. Can we still apply?', a:'Yes. PAN is not mandatory. Aadhaar is the primary identifier. However, the house must be registered in the name of the female head of household or jointly.' }
  ],
  lastUpdated: 'May 2026',
  state: 'All India'
},
{
  id: 'ayushman-bharat',
  name: 'Ayushman Bharat Card (PM-JAY)',
  emoji: '❤️',
  category: 'health',
  department: 'National Health Authority (NHA)',
  authority: 'NHA',
  fee: 'Free',
  time: 'Instant (if eligible)',
  timeEstimate: 'Instant',
  mode: 'Online / CSC Centre',
  difficulty: 'easy',
  applyUrl: 'https://beneficiary.nha.gov.in',
  portalUrl: 'https://pmjay.gov.in',
  overview: 'Ayushman Bharat PM-JAY provides ₹5 lakh per family per year health insurance for secondary and tertiary care hospitalization. It covers 1,949 procedures at over 27,000 empanelled hospitals. Coverage is cashless and paperless. Eligibility is determined from SECC-2011 database.',
  steps: [
    { n:1, title:'Check eligibility first', desc:'Go to beneficiary.nha.gov.in or call 14555. Enter your Aadhaar or ration card number to check if your family is in the SECC-2011 list.', link:'https://beneficiary.nha.gov.in' },
    { n:2, title:'If eligible: get card at hospital or CSC', desc:'Visit any empanelled hospital\'s Ayushman Mitra desk or Common Service Centre (CSC). Bring Aadhaar card.' },
    { n:3, title:'Biometric verification', desc:'Your fingerprint is verified against Aadhaar database at the centre.' },
    { n:4, title:'Card issued instantly', desc:'Ayushman Bharat card (physical or digital) is issued immediately. All family members get coverage.' },
    { n:5, title:'Use at any empanelled hospital', desc:'At the time of hospitalization, show your Ayushman card. No cash required. Hospital processes the claim directly.' }
  ],
  documents: [
    { name:'Aadhaar Card', reason:'Primary identity and biometric verification', formats:['Original'], mandatory:true },
    { name:'Ration Card', reason:'Alternative method for family eligibility check', formats:['Original'], mandatory:false, condition:'If Aadhaar-based eligibility fails' }
  ],
  faqs:[
    { q:'My family is not in the SECC-2011 database. Can I still apply?', a:'SECC-2011 data is the source. However, many states have expanded coverage under state health schemes (e.g., Arogyasri in AP, Chief Minister\'s health scheme in Tamil Nadu). Check your state\'s health department.' },
    { q:'Does PM-JAY cover pre-existing diseases?', a:'Yes. Unlike private insurance, PM-JAY covers all pre-existing diseases from day one of coverage. No waiting period.' },
    { q:'Which hospitals accept the Ayushman card?', a:'Check empanelled hospitals at hospitals.pmjay.gov.in. Over 27,000 hospitals including private hospitals across India.' }
  ],
  lastUpdated: 'May 2026',
  state: 'All India'
},
{
  id: 'udyam-registration',
  name: 'Udyam Registration (MSME)',
  emoji: '🏪',
  category: 'business',
  department: 'Ministry of Micro, Small & Medium Enterprises',
  authority: 'Ministry of MSME',
  fee: 'Free (completely)',
  time: 'Instant',
  timeEstimate: 'Instant',
  mode: 'Online',
  difficulty: 'easy',
  applyUrl: 'https://udyamregistration.gov.in',
  portalUrl: 'https://udyamregistration.gov.in',
  overview: 'Udyam Registration is the official government registration for Micro, Small, and Medium Enterprises (MSMEs). It is completely free, paperless, and based on Aadhaar + PAN self-declaration. It provides access to bank loans at reduced interest, government tenders, and subsidies.',
  steps: [
    { n:1, title:'Go to Udyam Registration portal', desc:'Visit udyamregistration.gov.in. Click "For New Entrepreneurs who are not Registered yet as MSME".', link:'https://udyamregistration.gov.in' },
    { n:2, title:'Enter Aadhaar and validate with OTP', desc:'Enter your 12-digit Aadhaar and name as on Aadhaar. Validate with OTP sent to registered mobile.' },
    { n:3, title:'Enter PAN and validate', desc:'Enter your PAN. Data is auto-fetched from the Income Tax database.' },
    { n:4, title:'Fill business details', desc:'Enter business name, type of organisation, main activity (manufacturing/services), NIC code, investment, and turnover.' },
    { n:5, title:'Submit and receive e-certificate', desc:'On submission, a Udyam Registration Number and certificate are generated instantly and sent to your email.' }
  ],
  documents: [
    { name:'Aadhaar Card (of proprietor/partner/director)', reason:'Mandatory — entire process is Aadhaar-based', formats:['12-digit Aadhaar number + registered mobile'], mandatory:true },
    { name:'PAN Card', reason:'Tax and financial identity of business', formats:['PAN of enterprise (or proprietor for proprietorships)'], mandatory:true }
  ],
  faqs:[
    { q:'What are the investment limits for Micro/Small/Medium?', a:'Micro: Investment ≤₹1Cr + Turnover ≤₹5Cr. Small: Investment ≤₹10Cr + Turnover ≤₹50Cr. Medium: Investment ≤₹50Cr + Turnover ≤₹250Cr.' },
    { q:'What benefits does Udyam registration give?', a:'Collateral-free bank loans (CGTMSE), priority sector lending at reduced rates, government tender preference, protection against delayed payments (MSMED Act), electricity bill discounts, and ISO certification reimbursement.' }
  ],
  lastUpdated: 'May 2026',
  state: 'All India'
},
{
  id: 'gst-registration',
  name: 'GST Registration',
  emoji: '🧾',
  category: 'business',
  department: 'Goods and Services Tax Network (GSTN)',
  authority: 'GSTN',
  fee: 'Free',
  time: '3–7 working days',
  timeEstimate: '3–7 working days',
  mode: 'Online',
  difficulty: 'medium',
  applyUrl: 'https://www.gst.gov.in',
  portalUrl: 'https://www.gst.gov.in',
  overview: 'GST Registration is mandatory for businesses with annual turnover above ₹20 lakh (₹10 lakh for special category states) for services, and ₹40 lakh for goods. Also mandatory for e-commerce sellers, interstate suppliers, and exporters regardless of turnover.',
  steps: [
    { n:1, title:'Go to GST portal', desc:'Visit gst.gov.in. Click "New Registration" under Taxpayers tab.', link:'https://www.gst.gov.in' },
    { n:2, title:'Fill Part A of Form REG-01', desc:'Enter legal name, PAN, email, and mobile. Verify with OTPs. Get a TRN (Temporary Reference Number).' },
    { n:3, title:'Fill Part B using TRN', desc:'Login with TRN. Fill complete business details, promoter/partner details, business address, and bank details.' },
    { n:4, title:'Upload documents', desc:'Upload prescribed documents based on business type (see document list).' },
    { n:5, title:'Submit with DSC/EVC', desc:'Submit application using Digital Signature Certificate (for companies/LLPs) or Electronic Verification Code (Aadhaar-based for others).' },
    { n:6, title:'Receive GSTIN', desc:'After verification by GST officer (3–7 days), your GSTIN is issued and GST certificate is available on the portal.' }
  ],
  documents: [
    { name:'PAN Card (business)', reason:'Mandatory — GSTIN is PAN-based', formats:['PAN of company/firm/individual'], mandatory:true },
    { name:'Aadhaar Card (proprietor/partner)', reason:'Used for e-sign / EVC verification', formats:['Original'], mandatory:true },
    { name:'Proof of Principal Place of Business', reason:'GST registration is address-specific', formats:['Electricity Bill','Rent Agreement + NOC from owner','Property Tax Receipt'], mandatory:true },
    { name:'Bank Account Proof', reason:'Business bank account details required', formats:['Cancelled cheque','Bank statement first page'], mandatory:true },
    { name:'Certificate of Incorporation', reason:'For companies and LLPs', formats:['ROC certificate'], mandatory:false, condition:'Only for Pvt Ltd, LLP, Partnership firms' },
    { name:'Authorisation letter/Board Resolution', reason:'For authorised signatory', formats:['On company letterhead'], mandatory:false, condition:'For companies and partnerships' }
  ],
  faqs:[
    { q:'What is the GST composition scheme?', a:'Small businesses with turnover up to ₹1.5 crore can opt for the Composition Scheme — pay a flat 1–5% tax on turnover, file quarterly returns instead of monthly, but cannot claim input tax credit.' },
    { q:'Is GST registration needed for freelancers?', a:'If annual income exceeds ₹20 lakh, yes. Below ₹20 lakh, it is optional but recommended for issuing GST invoices to corporate clients who need input credit.' }
  ],
  lastUpdated: 'May 2026',
  state: 'All India'
},
{
  id: 'eshram-card',
  name: 'e-Shram Card Registration',
  emoji: '👷',
  category: 'business',
  department: 'Ministry of Labour & Employment',
  authority: 'Ministry of Labour',
  fee: 'Free',
  time: 'Instant',
  timeEstimate: 'Instant',
  mode: 'Online',
  difficulty: 'easy',
  applyUrl: 'https://eshram.gov.in',
  portalUrl: 'https://eshram.gov.in',
  overview: 'e-Shram is the national database of unorganised workers. Registration gives a 12-digit UAN (Universal Account Number) and ₹2 lakh accident insurance free under PMSBY. Workers in construction, agriculture, domestic work, street vending, auto-driving, and similar informal occupations must register.',
  steps: [
    { n:1, title:'Go to e-Shram portal', desc:'Visit eshram.gov.in. Click "Register on e-SHRAM".', link:'https://eshram.gov.in' },
    { n:2, title:'Enter Aadhaar and bank details', desc:'Enter your Aadhaar-linked mobile number. Verify with OTP. Enter bank account number and IFSC code.' },
    { n:3, title:'Fill personal and work details', desc:'Enter occupation type, monthly income, current employer state, and educational qualification.' },
    { n:4, title:'Submit and download e-Shram card', desc:'UAN is generated instantly. Download your e-Shram card from the portal or via SMS.' }
  ],
  documents: [
    { name:'Aadhaar Card', reason:'Mandatory — Aadhaar mobile OTP required', formats:['12-digit Aadhaar number + registered mobile'], mandatory:true },
    { name:'Bank Account (linked to Aadhaar)', reason:'For any scheme benefits transferred', formats:['Bank account number + IFSC'], mandatory:true }
  ],
  faqs:[
    { q:'What benefit do I get immediately after registration?', a:'Accidental death insurance of ₹2 lakh and partial disability cover of ₹1 lakh under PM Suraksha Bima Yojana (PMSBY) — completely free.' },
    { q:'I already have ESIC/EPF. Can I register on e-Shram?', a:'No. e-Shram is for unorganised sector workers only. If you are covered by ESIC or EPF, you are an organised sector worker and cannot register.' }
  ],
  lastUpdated: 'May 2026',
  state: 'All India'
}
];
