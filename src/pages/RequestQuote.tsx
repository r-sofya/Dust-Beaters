import React from 'react';
import { Building2, Mail, Phone, MapPin, ArrowRight, ArrowLeft, CheckCircle2, AlertTriangle } from 'lucide-react';
import { validateAddress, formatPostalCode, STATE_CODES, PROVINCE_CODES, getFullName } from '../utils/addressValidation';
import { detectUserCountry } from '../utils/location';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  companyName: string;
  address: string;
  country: string;
  city: string;
  state: string;
  zip: string;
  squareFootage: string;
  frequency: string;
  additionalInfo: string;
}

export function RequestQuote() {
  const [isLoadingLocation, setIsLoadingLocation] = React.useState(false);
  const [currentStep, setCurrentStep] = React.useState(1);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [validationErrors, setValidationErrors] = React.useState<{
    city?: string;
    state?: string;
    zip?: string;
    address?: string;
  }>({});
  const [submitSuccess, setSubmitSuccess] = React.useState(false);
  const [submitError, setSubmitError] = React.useState('');
  const [showMessages, setShowMessages] = React.useState(false);
  const [formData, setFormData] = React.useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    companyName: '',
    address: '',
    country: 'United States',
    city: '',
    state: '',
    zip: '',
    squareFootage: '',
    frequency: '',
    additionalInfo: ''
  });
  // Add new state for frequency details
  const [frequencyDetails, setFrequencyDetails] = React.useState<any>({
    timesOfDay: [], // for daily
    daysOfWeek: [], // for weekly/biweekly
    monthlyCount: '' // for monthly
  });

  // Helper arrays
  const TIMES_OF_DAY = [
    { label: 'Morning', value: 'morning' },
    { label: 'Afternoon', value: 'afternoon' },
    { label: 'Evening', value: 'evening' },
    { label: 'Overnight', value: 'overnight' }
  ];
  const DAYS_OF_WEEK = [
    { label: 'Monday', value: 'monday' },
    { label: 'Tuesday', value: 'tuesday' },
    { label: 'Wednesday', value: 'wednesday' },
    { label: 'Thursday', value: 'thursday' },
    { label: 'Friday', value: 'friday' },
    { label: 'Saturday', value: 'saturday' },
    { label: 'Sunday', value: 'sunday' }
  ];

  // Detect user's country on component mount
  React.useEffect(() => {
    const detectLocation = async () => {
      setIsLoadingLocation(true);
      try {
        const country = await detectUserCountry();
        setFormData(prev => ({
          ...prev,
          country,
          state: '', // Reset state when country changes
          zip: ''    // Reset zip when country changes
        }));
      } catch (error) {
        console.error('Location detection error:', error);
      } finally {
        setIsLoadingLocation(false);
      }
    };
    detectLocation();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === 'state') {
      const fullName = getFullName(value, formData.country);
      setFormData(prev => ({ ...prev, [name]: fullName }));
      return;
    }
    if (['city', 'state', 'zip', 'address'].includes(name)) {
      setValidationErrors(prev => ({ ...prev, [name]: undefined }));
    }
    if (name === 'zip' && formData.country === 'Canada') {
      const formattedValue = formatPostalCode(value, formData.country);
      setFormData(prev => ({ ...prev, [name]: formattedValue }));
      return;
    }
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (name === 'country') {
      setFormData(prev => ({
        ...prev,
        state: getFullName(prev.state, value) || '',
        zip: '',
        [name]: value
      }));
    }
  };

  const validateStep = (step: number): boolean => {
    if (step === 2) {
      const errors = validateAddress(
        formData.address,
        formData.city,
        formData.state,
        formData.zip,
        formData.country
      );
      setValidationErrors(errors);
      return Object.keys(errors).length === 0;
    }
    return true;
  };

  const handleNextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep(2)) {
      return;
    }
    setIsSubmitting(true);
    setSubmitError('');
    setShowMessages(true);
    const data = new FormData();
    data.append('form-name', 'quote-request');
    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value);
    });
    fetch('/', {
      method: 'POST',
      body: data
    })
      .then(() => {
        setSubmitSuccess(true);
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          companyName: '',
          address: '',
          country: 'United States',
          city: '',
          state: '',
          zip: '',
          squareFootage: '',
          frequency: '',
          additionalInfo: ''
        });
        setCurrentStep(1);
      })
      .catch((error) => {
        console.error('Form submission error:', error);
        setSubmitError('Failed to submit quote request. Please try again later.');
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  const steps = [
    { number: 1, title: 'Contact Information' },
    { number: 2, title: 'Business Details' },
    { number: 3, title: 'Service Requirements' }
  ];

  const isStepComplete = (step: number) => {
    switch (step) {
      case 1:
        return formData.firstName && formData.lastName && formData.email && formData.phone;
      case 2:
        return formData.companyName && formData.address && formData.city && formData.state && formData.zip && formData.country;
      case 3:
        return formData.squareFootage && formData.frequency;
      default:
        return false;
    }
  };

  // Handle frequency detail changes
  const handleFrequencyDetailChange = (type: string, value: string) => {
    if (formData.frequency === 'daily') {
      setFrequencyDetails((prev: any) => {
        const arr = prev.timesOfDay.includes(value)
          ? prev.timesOfDay.filter((v: string) => v !== value)
          : [...prev.timesOfDay, value];
        return { ...prev, timesOfDay: arr };
      });
    } else if (formData.frequency === 'weekly' || formData.frequency === 'biweekly') {
      setFrequencyDetails((prev: any) => {
        const arr = prev.daysOfWeek.includes(value)
          ? prev.daysOfWeek.filter((v: string) => v !== value)
          : [...prev.daysOfWeek, value];
        return { ...prev, daysOfWeek: arr };
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hidden form for Netlify */}
        <form name="quote-request" data-netlify="true" data-netlify-honeypot="bot-field" hidden>
          <input type="text" name="firstName" />
          <input type="text" name="lastName" />
          <input type="email" name="email" />
          <input type="tel" name="phone" />
          <input type="text" name="companyName" />
          <input type="text" name="address" />
          <input type="text" name="city" />
          <input type="text" name="state" />
          <input type="text" name="zip" />
          <input type="text" name="squareFootage" />
          <input type="text" name="frequency" />
          <textarea name="additionalInfo"></textarea>
        </form>
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Request a Quote</h1>
          <p className="text-xl text-gray-600">
            Get a customized cleaning solution for your business
          </p>
        </div>
        {/* Progress Steps */}
        <div className="mb-12">
          <div className="flex justify-between items-center">
            {steps.map((step, index) => (
              <React.Fragment key={step.number}>
                <div className="flex flex-col items-center">
                  <div className={`
                    w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold
                    ${currentStep > step.number
                      ? 'bg-green-100 text-green-600'
                      : currentStep === step.number
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-400'
                    }
                  `}>
                    {currentStep > step.number ? (
                      <CheckCircle2 className="h-6 w-6" />
                    ) : (
                      step.number
                    )}
                  </div>
                  <span className={`
                    mt-2 text-sm font-medium
                    ${currentStep === step.number ? 'text-blue-600' : 'text-gray-500'}
                  `}>
                    {step.title}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div className={`
                    flex-1 h-0.5 mx-4
                    ${currentStep > step.number + 1
                      ? 'bg-green-200'
                      : 'bg-gray-200'
                    }
                  `} />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
        {/* Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <form
            onSubmit={handleSubmit} 
            className="space-y-6"
            name="quote-request"
            method="POST"
            data-netlify="true"
            data-netlify-honeypot="bot-field"
          >
            {/* Netlify Form Fields */}
            <input type="hidden" name="form-name" value="quote-request" />
            <input type="hidden" name="bot-field" />
            {/* Step 1: Contact Information */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                      First Name
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        name="firstName"
                        id="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                        className="block w-full h-11 px-4 rounded-lg border border-gray-300 bg-white/50 shadow-sm focus:ring-0 focus:border-blue-500 transition-all duration-200 hover:border-gray-400 outline-none"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                      Last Name
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        name="lastName"
                        id="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                        className="block w-full h-11 px-4 rounded-lg border border-gray-300 bg-white/50 shadow-sm focus:ring-0 focus:border-blue-500 transition-all duration-200 hover:border-gray-400 outline-none"
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <div className="mt-1 relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="email"
                      name="email"
                      id="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="block w-full h-11 pl-10 pr-4 rounded-lg border border-gray-300 bg-white/50 shadow-sm focus:ring-0 focus:border-blue-500 transition-all duration-200 hover:border-gray-400 outline-none"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                    Phone
                  </label>
                  <div className="mt-1 relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="tel"
                      name="phone"
                      id="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="block w-full h-11 pl-10 pr-4 rounded-lg border border-gray-300 bg-white/50 shadow-sm focus:ring-0 focus:border-blue-500 transition-all duration-200 hover:border-gray-400 outline-none"
                    />
                  </div>
                </div>
              </div>
            )}
            {/* Step 2: Business Information */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div>
                  <label htmlFor="companyName" className="block text-sm font-medium text-gray-700">
                    Company Name
                  </label>
                  <div className="mt-1 relative">
                    <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      name="companyName"
                      id="companyName"
                      value={formData.companyName}
                      onChange={handleChange}
                      required
                      className="block w-full h-11 pl-10 pr-4 rounded-lg border border-gray-300 bg-white/50 shadow-sm focus:ring-0 focus:border-blue-500 transition-all duration-200 hover:border-gray-400 outline-none"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                    Street Address
                  </label>
                  <div className="mt-1 relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      minLength={5}
                      type="text"
                      name="address"
                      id="address"
                      value={formData.address}
                      onChange={handleChange}
                      required
                      className={`block w-full h-11 pl-10 pr-4 rounded-lg border ${
                        validationErrors.address 
                          ? 'border-red-300 focus:border-red-500' 
                          : 'border-gray-300 focus:border-blue-500'
                      } bg-white/50 shadow-sm focus:ring-0 transition-all duration-200 hover:border-gray-400 outline-none`}
                      placeholder="123 Main St"
                    />
                    {validationErrors.address && (
                      <p className="mt-1 text-sm text-red-600">{validationErrors.address}</p>
                    )}
                  </div>
                </div>
                <div>
                  <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                    Country
                  </label>
                  <select
                    id="country"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full h-11 px-4 rounded-lg border border-gray-300 bg-white/50 shadow-sm focus:ring-0 focus:border-blue-500 transition-all duration-200 hover:border-gray-400 outline-none"
                    disabled={isLoadingLocation}
                  >
                    <option value="United States">United States</option>
                    <option value="Canada">Canada</option>
                  </select>
                  {isLoadingLocation && (
                    <div className="mt-1 text-sm text-gray-500">
                      Detecting your location...
                    </div>
                  )}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                      City
                    </label>
                    <input
                      type="text"
                      name="city"
                      id="city"
                      value={formData.city}
                      onChange={handleChange}
                      required
                      className="mt-1 block w-full h-11 px-4 rounded-lg border border-gray-300 bg-white/50 shadow-sm focus:ring-0 focus:border-blue-500 transition-all duration-200 hover:border-gray-400 outline-none"
                    />
                  </div>
                  <div>
                    <label htmlFor="state" className="block text-sm font-medium text-gray-700">
                      {formData.country === 'United States' ? 'State' : 'Province'}
                    </label>
                    <select
                      name="state"
                      id="state"
                      value={formData.state}
                      onChange={handleChange}
                      required
                      className={`mt-1 block w-full h-11 px-4 rounded-lg border ${
                        validationErrors.state 
                          ? 'border-red-300 focus:border-red-500' 
                          : 'border-gray-300 focus:border-blue-500'
                      } bg-white/50 shadow-sm focus:ring-0 transition-all duration-200 hover:border-gray-400 outline-none`}
                    >
                      <option value="">Select {formData.country === 'United States' ? 'State' : 'Province'}</option>
                      {Object.entries(formData.country === 'United States' ? STATE_CODES : PROVINCE_CODES).map(([code, name]) => (
                        <option key={code} value={name}>{name}</option>
                      ))}
                    </select>
                    {validationErrors.state && (
                      <p className="mt-1 text-sm text-red-600">{validationErrors.state}</p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="zip" className="block text-sm font-medium text-gray-700">
                      {formData.country === 'United States' ? 'ZIP Code' : 'Postal Code'}
                    </label>
                    <input
                      type={formData.country === 'United States' ? 'text' : 'text'}
                      pattern={formData.country === 'United States' ? '\\d{5}(-\\d{4})?' : '[A-Za-z]\\d[A-Za-z][ -]?\\d[A-Za-z]\\d'}
                      name="zip"
                      id="zip"
                      value={formData.zip}
                      onChange={handleChange}
                      placeholder={formData.country === 'United States' ? '12345' : 'A1A 1A1'}
                      required
                      className={`mt-1 block w-full h-11 px-4 rounded-lg border ${
                        validationErrors.zip 
                          ? 'border-red-300 focus:border-red-500' 
                          : 'border-gray-300 focus:border-blue-500'
                      } bg-white/50 shadow-sm focus:ring-0 transition-all duration-200 hover:border-gray-400 outline-none`}
                    />
                    {validationErrors.zip && (
                      <p className="mt-1 text-sm text-red-600">{validationErrors.zip}</p>
                    )}
                  </div>
                </div>
              </div>
            )}
            {/* Step 3: Service Requirements */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div>
                  <label htmlFor="squareFootage" className="block text-sm font-medium text-gray-700">
                    Approximate Square Footage
                  </label>
                  <input
                    type="number"
                    name="squareFootage"
                    id="squareFootage"
                    value={formData.squareFootage}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full h-11 px-4 rounded-lg border border-gray-300 bg-white/50 shadow-sm focus:ring-0 focus:border-blue-500 transition-all duration-200 hover:border-gray-400 outline-none"
                  />
                </div>
                <div>
                  <label htmlFor="frequency" className="block text-sm font-medium text-gray-700">
                    Service Frequency
                  </label>
                  <select
                    id="frequency"
                    name="frequency"
                    value={formData.frequency}
                    onChange={e => {
                      handleChange(e);
                      setFrequencyDetails({ timesOfDay: [], daysOfWeek: [], monthlyCount: '' });
                    }}
                    required
                    className="mt-1 block w-full h-11 px-4 rounded-lg border border-gray-300 bg-white/50 shadow-sm focus:ring-0 focus:border-blue-500 transition-all duration-200 hover:border-gray-400 outline-none"
                  >
                    <option value="">I'm not sure yet</option>
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="biweekly">Bi-Weekly</option>
                    <option value="monthly">Monthly</option>
                  </select>
                </div>
                {/* Frequency details UI */}
                {formData.frequency === 'daily' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Time(s) of Day</label>
                    <div className="flex flex-wrap gap-4">
                      {TIMES_OF_DAY.map(opt => (
                        <label key={opt.value} className="inline-flex items-center gap-2 cursor-pointer select-none">
                          <input
                            type="checkbox"
                            checked={frequencyDetails.timesOfDay.includes(opt.value)}
                            onChange={() => handleFrequencyDetailChange('timesOfDay', opt.value)}
                            className="sr-only peer"
                          />
                          <span className={`w-6 h-6 flex items-center justify-center rounded border transition-colors duration-200
                            ${frequencyDetails.timesOfDay.includes(opt.value)
                              ? 'bg-blue-600 border-blue-600'
                              : 'bg-white border-gray-300 hover:border-blue-400'}
                            shadow-sm
                          `}>
                            {frequencyDetails.timesOfDay.includes(opt.value) && (
                              <svg className="w-4 h-4 text-white" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M5 10l4 4 6-6" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                            )}
                          </span>
                          <span className="text-gray-800 font-medium">{opt.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}
                {(formData.frequency === 'weekly' || formData.frequency === 'biweekly') && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {formData.frequency === 'biweekly' ? 'Every other ' : ''}Day(s) of the Week
                    </label>
                    <div className="flex flex-wrap gap-4">
                      {DAYS_OF_WEEK.map(opt => (
                        <label key={opt.value} className="inline-flex items-center gap-2 cursor-pointer select-none">
                          <input
                            type="checkbox"
                            checked={frequencyDetails.daysOfWeek.includes(opt.value)}
                            onChange={() => handleFrequencyDetailChange('daysOfWeek', opt.value)}
                            className="sr-only peer"
                          />
                          <span className={`w-6 h-6 flex items-center justify-center rounded border transition-colors duration-200
                            ${frequencyDetails.daysOfWeek.includes(opt.value)
                              ? 'bg-blue-600 border-blue-600'
                              : 'bg-white border-gray-300 hover:border-blue-400'}
                            shadow-sm
                          `}>
                            {frequencyDetails.daysOfWeek.includes(opt.value) && (
                              <svg className="w-4 h-4 text-white" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M5 10l4 4 6-6" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                            )}
                          </span>
                          <span className="text-gray-800 font-medium">{opt.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}
                {formData.frequency === 'monthly' && (
                  <div>
                    <label htmlFor="monthlyCount" className="block text-sm font-medium text-gray-700 mb-2">
                      Number of visits per month
                    </label>
                    <input
                      type="number"
                      id="monthlyCount"
                      min={1}
                      max={31}
                      value={frequencyDetails.monthlyCount}
                      onChange={e => setFrequencyDetails((prev: any) => ({ ...prev, monthlyCount: e.target.value }))}
                      className="block w-full h-11 px-4 rounded-lg border border-gray-300 bg-white/50 shadow-sm focus:ring-0 focus:border-blue-500 transition-all duration-200 hover:border-gray-400 outline-none"
                      placeholder="e.g. 2"
                    />
                  </div>
                )}
                <div>
                  <label htmlFor="additionalInfo" className="block text-sm font-medium text-gray-700">
                    Additional Information
                  </label>
                  <textarea
                    id="additionalInfo"
                    name="additionalInfo"
                    value={formData.additionalInfo}
                    onChange={handleChange}
                    rows={4}
                    className="mt-1 block w-full p-4 rounded-lg border border-gray-300 bg-white/50 shadow-sm focus:ring-0 focus:border-blue-500 transition-all duration-200 hover:border-gray-400 resize-none outline-none"
                    placeholder="Please provide any specific requirements or concerns..."
                  />
                </div>
              </div>
            )}
            {/* Navigation Buttons */}
            <div className="flex justify-between pt-6">
              {currentStep > 1 && (
                <button
                  type="button"
                  onClick={() => setCurrentStep(prev => prev - 1)}
                  className="inline-flex items-center px-6 py-3 border border-gray-300 shadow-sm text-base font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <ArrowLeft className="h-5 w-5 mr-2" />
                  Previous
                </button>
              )}
              <div className="ml-auto">
                {currentStep < 3 ? (
                  <button
                    type="button"
                    onClick={handleNextStep}
                    disabled={!isStepComplete(currentStep)}
                    className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next
                    <ArrowRight className="h-5 w-5 ml-2" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={!isStepComplete(currentStep)}
                    className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 relative w-full justify-center"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                        Submitting...
                      </>
                    ) : (
                      <span className="flex items-center">
                        Submit Request
                        <ArrowRight className="h-5 w-5 ml-2" />
                      </span>
                    )}
                  </button>
                )}
              </div>
            </div>
            {/* Success/Error Messages */}
            {showMessages && (
              <div className="mt-8 space-y-4">
                {submitSuccess && (
                  <div className="p-4 bg-green-50 text-green-700 rounded-lg text-center flex items-center justify-center gap-2">
                    <CheckCircle2 className="h-5 w-5" />
                    Thank you for your quote request! We'll get back to you soon with a detailed proposal.
                  </div>
                )}
                {submitError && (
                  <div className="p-4 bg-red-50 text-red-700 rounded-lg text-center flex items-center justify-center gap-2">
                    <AlertTriangle className="h-5 w-5" />
                    {submitError}
                  </div>
                )}
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default RequestQuote;
