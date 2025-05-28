import React, { useState } from 'react';

// Copied from 'code of the quote request form' file, adapted for React/TSX
const RequestQuote = () => {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    companyName: '',
    streetAddress: '',
    country: 'Canada',
    city: '',
    province: '',
    state: '',
    postalCode: '',
    zipCode: '',
    squareFootage: '',
    frequency: '',
    additionalInfo: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const provinces = [
    '', 'Alberta', 'British Columbia', 'Manitoba', 'New Brunswick', 'Newfoundland and Labrador',
    'Nova Scotia', 'Ontario', 'Prince Edward Island', 'Quebec', 'Saskatchewan', 'Northwest Territories',
    'Nunavut', 'Yukon'
  ];
  const states = [
    '', 'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida',
    'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine',
    'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska',
    'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota',
    'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee',
    'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'
  ];

  const canProceedStep1 = form.firstName && form.lastName && form.email && form.phone;
  const canProceedStep2 = form.companyName && form.streetAddress && form.city &&
    ((form.country === 'Canada' && form.province && form.postalCode) ||
     (form.country === 'United States' && form.state && form.zipCode));
  const canProceedStep3 = form.squareFootage && form.frequency;

  const handleNext = () => setStep((s) => s + 1);
  const handleBack = () => setStep((s) => s - 1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Optionally: submit to Netlify or show a success message
    alert('Quote request submitted!');
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-white py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Request a Quote</h1>
          <p className="text-xl text-gray-600">Get a customized cleaning solution for your business</p>
        </div>
        <div className="mb-12">
          <div className="flex justify-between items-center">
            <div className="flex flex-col items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold ${step===1 ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-400'}`}>1</div>
              <span className={`mt-2 text-sm font-medium ${step===1 ? 'text-blue-600' : 'text-gray-500'}`}>Contact Information</span>
            </div>
            <div className="flex-1 h-0.5 mx-4 bg-gray-200"></div>
            <div className="flex flex-col items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold ${step===2 ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-400'}`}>2</div>
              <span className={`mt-2 text-sm font-medium ${step===2 ? 'text-blue-600' : 'text-gray-500'}`}>Business Details</span>
            </div>
            <div className="flex-1 h-0.5 mx-4 bg-gray-200"></div>
            <div className="flex flex-col items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold ${step===3 ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-400'}`}>3</div>
              <span className={`mt-2 text-sm font-medium ${step===3 ? 'text-blue-600' : 'text-gray-500'}`}>Service Requirements</span>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <form className="space-y-6" name="quote-request" method="POST" data-netlify="true" data-netlify-honeypot="bot-field" onSubmit={handleSubmit}>
            <input type="hidden" name="form-name" value="quote-request" />
            <input type="hidden" name="bot-field" />
            <div className="space-y-6">
              {step === 1 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">First Name</label>
                    <div className="mt-1">
                      <input type="text" name="firstName" id="firstName" required value={form.firstName} onChange={handleChange} className="block w-full h-11 px-4 rounded-lg border border-gray-300 bg-white/50 shadow-sm focus:ring-0 focus:border-blue-500 transition-all duration-200 hover:border-gray-400 outline-none" />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Last Name</label>
                    <div className="mt-1">
                      <input type="text" name="lastName" id="lastName" required value={form.lastName} onChange={handleChange} className="block w-full h-11 px-4 rounded-lg border border-gray-300 bg-white/50 shadow-sm focus:ring-0 focus:border-blue-500 transition-all duration-200 hover:border-gray-400 outline-none" />
                    </div>
                  </div>
                  <div className="md:col-span-2">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                    <div className="mt-1 relative">
                      <input type="email" name="email" id="email" required value={form.email} onChange={handleChange} className="block w-full h-11 pl-4 pr-4 rounded-lg border border-gray-300 bg-white/50 shadow-sm focus:ring-0 focus:border-blue-500 transition-all duration-200 hover:border-gray-400 outline-none" />
                    </div>
                  </div>
                  <div className="md:col-span-2">
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone</label>
                    <div className="mt-1 relative">
                      <input type="tel" name="phone" id="phone" required value={form.phone} onChange={handleChange} className="block w-full h-11 pl-4 pr-4 rounded-lg border border-gray-300 bg-white/50 shadow-sm focus:ring-0 focus:border-blue-500 transition-all duration-200 hover:border-gray-400 outline-none" />
                    </div>
                  </div>
                </div>
              )}
              {step === 2 && (
                <div className="grid grid-cols-1 gap-6">
                  <div>
                    <label htmlFor="companyName" className="block text-sm font-medium text-gray-700">Company Name</label>
                    <div className="mt-1">
                      <input type="text" name="companyName" id="companyName" required value={form.companyName} onChange={handleChange} className="block w-full h-11 px-4 rounded-lg border border-gray-300 bg-white/50 shadow-sm focus:ring-0 focus:border-blue-500 transition-all duration-200 hover:border-gray-400 outline-none" />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="streetAddress" className="block text-sm font-medium text-gray-700">Street Address</label>
                    <div className="mt-1 relative">
                      <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                      </span>
                      <input type="text" name="streetAddress" id="streetAddress" required value={form.streetAddress} onChange={handleChange} placeholder="123 Main St" className="block w-full h-11 pl-10 pr-4 rounded-lg border border-gray-300 bg-white/50 shadow-sm focus:ring-0 focus:border-blue-500 transition-all duration-200 hover:border-gray-400 outline-none" />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="country" className="block text-sm font-medium text-gray-700">Country</label>
                    <div className="mt-1">
                      <select name="country" id="country" value={form.country} onChange={handleChange} className="block w-full h-11 px-4 rounded-lg border border-gray-300 bg-white/50 shadow-sm focus:ring-0 focus:border-blue-500 transition-all duration-200 hover:border-gray-400 outline-none">
                        <option value="Canada">Canada</option>
                        <option value="United States">United States</option>
                      </select>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label htmlFor="city" className="block text-sm font-medium text-gray-700">City</label>
                      <div className="mt-1">
                        <input type="text" name="city" id="city" required value={form.city} onChange={handleChange} className="block w-full h-11 px-4 rounded-lg border border-gray-300 bg-white/50 shadow-sm focus:ring-0 focus:border-blue-500 transition-all duration-200 hover:border-gray-400 outline-none" />
                      </div>
                    </div>
                    {form.country === 'Canada' ? (
                      <div>
                        <label htmlFor="province" className="block text-sm font-medium text-gray-700">Province</label>
                        <div className="mt-1">
                          <select name="province" id="province" required value={form.province} onChange={handleChange} className="block w-full h-11 px-4 rounded-lg border border-gray-300 bg-white/50 shadow-sm focus:ring-0 focus:border-blue-500 transition-all duration-200 hover:border-gray-400 outline-none">
                            <option value="">Select Province</option>
                            {provinces.slice(1).map((prov) => (
                              <option key={prov} value={prov}>{prov}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                    ) : (
                      <div>
                        <label htmlFor="state" className="block text-sm font-medium text-gray-700">State</label>
                        <div className="mt-1">
                          <select name="state" id="state" required value={form.state} onChange={handleChange} className="block w-full h-11 px-4 rounded-lg border border-gray-300 bg-white/50 shadow-sm focus:ring-0 focus:border-blue-500 transition-all duration-200 hover:border-gray-400 outline-none">
                            <option value="">Select State</option>
                            {states.slice(1).map((state) => (
                              <option key={state} value={state}>{state}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                    )}
                    {form.country === 'Canada' ? (
                      <div>
                        <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700">Postal Code</label>
                        <div className="mt-1">
                          <input type="text" name="postalCode" id="postalCode" required value={form.postalCode} onChange={handleChange} placeholder="A1A 1A1" className="block w-full h-11 px-4 rounded-lg border border-gray-300 bg-white/50 shadow-sm focus:ring-0 focus:border-blue-500 transition-all duration-200 hover:border-gray-400 outline-none" />
                        </div>
                      </div>
                    ) : (
                      <div>
                        <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700">ZIP Code</label>
                        <div className="mt-1">
                          <input type="text" name="zipCode" id="zipCode" required value={form.zipCode} onChange={handleChange} placeholder="12345" className="block w-full h-11 px-4 rounded-lg border border-gray-300 bg-white/50 shadow-sm focus:ring-0 focus:border-blue-500 transition-all duration-200 hover:border-gray-400 outline-none" />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
              {step === 3 && (
                <div className="space-y-6">
                  <div>
                    <label htmlFor="squareFootage" className="block text-sm font-medium text-gray-700">Square Footage</label>
                    <div className="mt-1">
                      <input type="text" name="squareFootage" id="squareFootage" required value={form.squareFootage} onChange={handleChange} className="block w-full h-11 px-4 rounded-lg border border-gray-300 bg-white/50 shadow-sm focus:ring-0 focus:border-blue-500 transition-all duration-200 hover:border-gray-400 outline-none" />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="frequency" className="block text-sm font-medium text-gray-700">Cleaning Frequency</label>
                    <div className="mt-1">
                      <input type="text" name="frequency" id="frequency" required value={form.frequency} onChange={handleChange} className="block w-full h-11 px-4 rounded-lg border border-gray-300 bg-white/50 shadow-sm focus:ring-0 focus:border-blue-500 transition-all duration-200 hover:border-gray-400 outline-none" />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="additionalInfo" className="block text-sm font-medium text-gray-700">Additional Information</label>
                    <div className="mt-1">
                      <textarea name="additionalInfo" id="additionalInfo" rows={3} value={form.additionalInfo} onChange={handleChange} className="block w-full px-4 py-2 rounded-lg border border-gray-300 bg-white/50 shadow-sm focus:ring-0 focus:border-blue-500 transition-all duration-200 hover:border-gray-400 outline-none"></textarea>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="flex justify-between pt-6">
              {step > 1 && (
                <button type="button" onClick={handleBack} className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-blue-600 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                  Back
                </button>
              )}
              <div className="ml-auto">
                {step < 3 ? (
                  <button type="button" onClick={handleNext} disabled={
                    (step === 1 && !canProceedStep1) ||
                    (step === 2 && !canProceedStep2)
                  } className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed">
                    Next
                  </button>
                ) : (
                  <button type="submit" disabled={!canProceedStep3} className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed">
                    Submit
                  </button>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RequestQuote;