import React, { useState } from 'react';
import { Mail, Phone, Clock, CheckCircle, AlertCircle } from 'lucide-react';

export function Contact() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMessage('');

    const form = e.currentTarget;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    try {
      const webhookUrl = import.meta.env.VITE_CONTACT_WEBHOOK_URL;

      if (!webhookUrl || webhookUrl.includes('your-webhook-url')) {
        throw new Error('Please configure a valid VITE_CONTACT_WEBHOOK_URL in your .env file');
      }

      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setStatus('success');
        form.reset();

      } else {
        const errorText = await response.text();
        console.error('Webhook failed:', response.status, response.statusText, errorText);
        setErrorMessage(`Error: ${response.status} ${response.statusText}${errorText ? ` - ${errorText}` : ''}`);
        throw new Error(`Failed to send message: ${response.status} ${response.statusText}`);
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setStatus('error');
      if (!errorMessage) {
        setErrorMessage(error instanceof Error ? error.message : 'Unknown error');
      }

    } finally {
      // No-op: let success/error states persist
    }
  };

  return (
    <div className="py-24 bg-gray-50 min-h-screen relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-float -z-10"></div>
      <div className="absolute top-0 right-0 w-72 h-72 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-float animation-delay-2000 -z-10"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16 fade-in-section is-visible">
          <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-4">
            Get in Touch
          </h1>
          <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
            We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start">
          {/* Contact Form */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-white/20 fade-in-section is-visible transition-all duration-300 hover:shadow-2xl">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Send a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="group">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1 transition-colors group-hover:text-blue-600">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="block w-full px-4 py-3 rounded-xl border-gray-200 bg-gray-50 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 outline-none"
                  placeholder="John Doe"
                />
              </div>
              <div className="group">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1 transition-colors group-hover:text-blue-600">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="block w-full px-4 py-3 rounded-xl border-gray-200 bg-gray-50 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 outline-none"
                  placeholder="john@example.com"
                />
              </div>
              <div className="group">
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1 transition-colors group-hover:text-blue-600">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  required
                  className="block w-full px-4 py-3 rounded-xl border-gray-200 bg-gray-50 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 outline-none"
                  placeholder="(555) 123-4567"
                />
              </div>
              <div className="group">
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1 transition-colors group-hover:text-blue-600">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  required
                  className="block w-full px-4 py-3 rounded-xl border-gray-200 bg-gray-50 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 outline-none resize-y"
                  placeholder="How can we help you?"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={status === 'submitting'}
                className={`w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold px-6 py-3.5 rounded-xl shadow-lg hover:shadow-blue-500/30 transform hover:-translate-y-0.5 transition-all duration-200 ${status === 'submitting' ? 'opacity-70 cursor-not-allowed' : 'hover:to-blue-800'
                  }`}
              >
                {status === 'submitting' ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending...
                  </span>
                ) : (
                  'Send Message'
                )}
              </button>

              {status === 'success' && (
                <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-xl flex items-start animate-fade-in">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <p className="ml-3 text-green-700 text-sm">
                    Message sent successfully! We'll be in touch soon.
                  </p>
                </div>
              )}

              {status === 'error' && (
                <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start animate-fade-in">
                  <AlertCircle className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
                  <p className="ml-3 text-red-700 text-sm">
                    {errorMessage || 'Failed to send message. Please check your connection and try again.'}
                  </p>
                </div>
              )}
            </form>
          </div>

          {/* Contact Information */}
          <div className="space-y-8 lg:pt-12 fade-in-section is-visible staggere-fade-in">
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 border border-white/20 transition-all hover:bg-white/80">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Contact Information</h3>
              <div className="space-y-6">
                <div className="flex items-start group">
                  <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                    <Phone className="h-6 w-6" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">Call Us</p>
                    <p className="text-lg font-semibold text-gray-900 mt-1">(289) 914-1643</p>
                  </div>
                </div>

                <div className="flex items-start group">
                  <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                    <Mail className="h-6 w-6" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">Email Us</p>
                    <p className="text-lg font-semibold text-gray-900 mt-1">contact@dustbeaters.com</p>
                  </div>
                </div>

                <div className="flex items-start group">
                  <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                    <Clock className="h-6 w-6" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">Business Hours</p>
                    <div className="mt-1 space-y-1">
                      <p className="text-gray-900"><span className="font-semibold">Mon - Fri:</span> 8am - 10pm</p>
                      <p className="text-gray-900"><span className="font-semibold">Sat:</span> 9am - 9pm</p>
                      <p className="text-gray-500">Sun: Closed</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Simple Map Placeholder or additional info could go here */}
            <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl p-8 text-white shadow-lg transform transition-transform hover:scale-[1.02]">
              <h3 className="text-2xl font-bold mb-4">Ready to get started?</h3>
              <p className="text-blue-100 mb-6">
                Get a free quote for your commercial cleaning needs today.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}