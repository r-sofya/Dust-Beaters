// US States with full names
export const STATE_CODES: Record<string, string> = {
  'AL': 'Alabama', 'AK': 'Alaska', 'AZ': 'Arizona', 'AR': 'Arkansas', 'CA': 'California',
  'CO': 'Colorado', 'CT': 'Connecticut', 'DE': 'Delaware', 'FL': 'Florida', 'GA': 'Georgia',
  'HI': 'Hawaii', 'ID': 'Idaho', 'IL': 'Illinois', 'IN': 'Indiana', 'IA': 'Iowa',
  'KS': 'Kansas', 'KY': 'Kentucky', 'LA': 'Louisiana', 'ME': 'Maine', 'MD': 'Maryland',
  'MA': 'Massachusetts', 'MI': 'Michigan', 'MN': 'Minnesota', 'MS': 'Mississippi',
  'MO': 'Missouri', 'MT': 'Montana', 'NE': 'Nebraska', 'NV': 'Nevada', 'NH': 'New Hampshire',
  'NJ': 'New Jersey', 'NM': 'New Mexico', 'NY': 'New York', 'NC': 'North Carolina',
  'ND': 'North Dakota', 'OH': 'Ohio', 'OK': 'Oklahoma', 'OR': 'Oregon', 'PA': 'Pennsylvania',
  'RI': 'Rhode Island', 'SC': 'South Carolina', 'SD': 'South Dakota', 'TN': 'Tennessee',
  'TX': 'Texas', 'UT': 'Utah', 'VT': 'Vermont', 'VA': 'Virginia', 'WA': 'Washington',
  'WV': 'West Virginia', 'WI': 'Wisconsin', 'WY': 'Wyoming'
};

export const US_STATES = Object.values(STATE_CODES);

// Canadian Provinces with full names
export const PROVINCE_CODES: Record<string, string> = {
  'AB': 'Alberta', 'BC': 'British Columbia', 'MB': 'Manitoba', 'NB': 'New Brunswick',
  'NL': 'Newfoundland and Labrador', 'NS': 'Nova Scotia', 'NT': 'Northwest Territories',
  'NU': 'Nunavut', 'ON': 'Ontario', 'PE': 'Prince Edward Island', 'QC': 'Quebec',
  'SK': 'Saskatchewan', 'YT': 'Yukon'
};

export const CANADIAN_PROVINCES = Object.values(PROVINCE_CODES);

// Validation functions
export const isValidUSZip = (zip: string): boolean => {
  return /^\d{5}(-\d{4})?$/.test(zip);
};

export const isValidCanadianPostalCode = (postalCode: string): boolean => {
  return /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/.test(postalCode);
};

// Convert state/province code to full name
export const getFullName = (code: string, country: string): string => {
  if (code.length === 2) {
    const upperCode = code.toUpperCase();
    if (country === 'United States') {
      return STATE_CODES[upperCode] || code;
    } else {
      return PROVINCE_CODES[upperCode] || code;
    }
  }
  return code;
};

export const isValidState = (state: string, country: string): boolean => {
  const fullName = getFullName(state, country);
  return country === 'United States' 
    ? US_STATES.includes(fullName)
    : CANADIAN_PROVINCES.includes(fullName);
};

export const isValidCity = (city: string): boolean => {
  return city.length >= 2 && /^[A-Za-z\s\-'.]+$/.test(city);
};

export const isValidAddress = (address: string): boolean => {
  // Allow letters, numbers, spaces, and common address characters
  // Minimum length of 5 characters
  return address.length >= 5 && /^[A-Za-z0-9\s\-'.#,/]+$/.test(address);
};

export const formatPostalCode = (code: string, country: string): string => {
  if (country === 'Canada') {
    // Format Canadian postal code (e.g., "A1A 1A1")
    const cleaned = code.toUpperCase().replace(/[^A-Z0-9]/g, '');
    if (cleaned.length === 6) {
      return `${cleaned.slice(0, 3)} ${cleaned.slice(3)}`;
    }
  }
  return code;
};

export interface AddressValidationError {
  city?: string;
  state?: string;
  address?: string;
  zip?: string;
}

export const validateAddress = (
  address: string,
  city: string,
  state: string,
  zip: string,
  country: string
): AddressValidationError => {
  const errors: AddressValidationError = {};

  if (!isValidAddress(address)) {
    errors.address = 'Please enter a valid street address (minimum 5 characters)';
  }

  if (!isValidCity(city)) {
    errors.city = 'Please enter a valid city name';
  }

  if (!isValidState(state, country)) {
    errors.state = country === 'United States' 
      ? 'Please select a valid US state'
      : 'Please select a valid Canadian province';
  }

  if (country === 'United States' && !isValidUSZip(zip)) {
    errors.zip = 'Please enter a valid ZIP code (e.g., 12345 or 12345-6789)';
  } else if (country === 'Canada' && !isValidCanadianPostalCode(zip)) {
    errors.zip = 'Please enter a valid postal code (e.g., A1A 1A1)';
  }

  return errors;
};