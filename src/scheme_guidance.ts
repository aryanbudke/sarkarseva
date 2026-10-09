import type { Scheme } from './types';

type Guidance = Pick<Scheme, 'officialUrl' | 'documents' | 'applicationSteps' | 'sectorCriteria'>;

const commonDocuments = ['Aadhaar or accepted identity proof', 'Aadhaar-linked bank account details', 'Proof supporting the eligibility criteria'];
const commonSteps = [
  'Open the official scheme portal and read the latest eligibility notice.',
  'Register or sign in, complete the application, and upload the requested evidence.',
  'Save the acknowledgement number and track verification on the same official portal.',
];

const guidance = (
  officialUrl: string,
  documents: string[] = commonDocuments,
  applicationSteps: string[] = commonSteps,
  sectorCriteria?: Guidance['sectorCriteria'],
): Guidance => ({ officialUrl, documents, applicationSteps, sectorCriteria });

/** Official destinations and minimum preparation guidance for the scheme knowledge base. */
export const SCHEME_GUIDANCE: Record<string, Guidance> = {
  'pm-awas-yojana': guidance(
    'https://pmay-urban.gov.in/',
    ['Aadhaar for adult family members', 'Household income proof', 'Declaration of not owning a pucca house', 'Property or loan papers, when applicable'],
    undefined,
    ['Urban'],
  ),
  'pm-kisan': guidance(
    'https://pmkisan.gov.in/',
    ['Aadhaar', 'Landholding records', 'Aadhaar-linked bank account details'],
    ['Open the PM-KISAN portal and choose New Farmer Registration.', 'Complete Aadhaar and land-detail verification.', 'Submit and track status using the registration number.'],
    ['Rural'],
  ),
  'ayushman-bharat-pmy': guidance(
    'https://beneficiary.nha.gov.in/',
    ['Aadhaar or accepted ID', 'Ration/family card where requested', 'Mobile number for OTP'],
    ['Check beneficiary status on the NHA portal.', 'Complete e-KYC online or at an authorised Ayushman centre.', 'Download the Ayushman card after approval.'],
  ),
  'matru-vandana': guidance('https://pmmvy.wcd.gov.in/', ['Aadhaar', 'Bank passbook', 'Maternal and child protection card', 'Pregnancy registration details']),
  'samman-savings': guidance('https://www.indiapost.gov.in/Financial/Pages/Content/Post-Office-Saving-Schemes.aspx'),
  'pm-svanidhi-scheme': guidance(
    'https://pmsvanidhi.mohua.gov.in/',
    ['Aadhaar', 'Vendor certificate or recommendation letter', 'Bank account details', 'Mobile number'],
    undefined,
    ['Urban'],
  ),
  'post-matric-scholarship': guidance('https://scholarships.gov.in/', ['Aadhaar', 'Income and category certificate', 'Previous marksheet', 'Bonafide/enrolment certificate', 'Student bank account details']),
  'jan-dhan-yojana': guidance('https://pmjdy.gov.in/', ['Aadhaar or another officially valid document', 'Passport-size photograph', 'Mobile number']),
  'ujjwala-yojana': guidance('https://www.pmuy.gov.in/', ['Aadhaar', 'Ration card/family composition proof', 'Bank account details', 'Address proof']),
  'kaushal-vikas': guidance('https://www.skillindiadigital.gov.in/', ['Aadhaar', 'Education details', 'Bank account details', 'Mobile number']),
  'mudra-loans': guidance('https://www.mudra.org.in/', ['Identity and address proof', 'Business plan or activity proof', 'Bank statements', 'Quotation for proposed purchase']),
  'social-pension': guidance('https://nsap.nic.in/', ['Aadhaar', 'Age/disability/death evidence as applicable', 'Income or BPL proof', 'Bank account details']),
  'atal-pension': guidance('https://www.npscra.nsdl.co.in/scheme-details.php', ['Aadhaar', 'Savings bank account', 'Mobile number']),
  'beti-bachao': guidance('https://wcd.gov.in/bbbp-schemes'),
  'pranam-scheme': guidance('https://www.indiabudget.gov.in/'),
};
