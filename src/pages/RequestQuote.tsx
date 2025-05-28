
// Copied from 'code of the quote request form' file, adapted for React/TSX
const RequestQuote = () => (
  <div className="min-h-screen bg-gray-50 relative">
    {/* Netlify Forms */}
    <form hidden method="post" name="contact">
      <input type="hidden" name="form-name" value="contact" />
      <input type="text" name="name" />
      <input type="email" name="email" />
      <input type="tel" name="phone" />
      <textarea name="message"></textarea>
    </form>
    <form hidden method="post" name="quote-request">
      <input type="hidden" name="form-name" value="quote-request" />
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
    {/* Main visible form UI from HTML file */}
    <main className="pt-16">
      <div style={{ position: 'relative', minHeight: '100vh', opacity: 1 }}>
        <div style={{ position: 'absolute', width: '100%', opacity: 1, transform: 'none' }}>
          <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white py-24">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">Request a Quote</h1>
                <p className="text-xl text-gray-600">Get a customized cleaning solution for your business</p>
              </div>
              <div className="mb-12">
                <div className="flex justify-between items-center">
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold bg-blue-600 text-white">1</div>
                    <span className="mt-2 text-sm font-medium text-blue-600">Contact Information</span>
                  </div>
                  <div className="flex-1 h-0.5 mx-4 bg-gray-200"></div>
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold bg-gray-100 text-gray-400">2</div>
                    <span className="mt-2 text-sm font-medium text-gray-500">Business Details</span>
                  </div>
                  <div className="flex-1 h-0.5 mx-4 bg-gray-200"></div>
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold bg-gray-100 text-gray-400">3</div>
                    <span className="mt-2 text-sm font-medium text-gray-500">Service Requirements</span>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <form className="space-y-6" name="quote-request" method="POST" data-netlify="true" data-netlify-honeypot="bot-field">
                  <input type="hidden" name="form-name" value="quote-request" />
                  <input type="hidden" name="bot-field" />
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">First Name</label>
                        <div className="mt-1">
                          <input type="text" name="firstName" id="firstName" required className="block w-full h-11 px-4 rounded-lg border border-gray-300 bg-white/50 shadow-sm focus:ring-0 focus:border-blue-500 transition-all duration-200 hover:border-gray-400 outline-none" />
                        </div>
                      </div>
                      <div>
                        <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Last Name</label>
                        <div className="mt-1">
                          <input type="text" name="lastName" id="lastName" required className="block w-full h-11 px-4 rounded-lg border border-gray-300 bg-white/50 shadow-sm focus:ring-0 focus:border-blue-500 transition-all duration-200 hover:border-gray-400 outline-none" />
                        </div>
                      </div>
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                      <div className="mt-1 relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400">
                          {/* SVG icon for email */}
                        </span>
                        <input type="email" name="email" id="email" required className="block w-full h-11 pl-10 pr-4 rounded-lg border border-gray-300 bg-white/50 shadow-sm focus:ring-0 focus:border-blue-500 transition-all duration-200 hover:border-gray-400 outline-none" />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone</label>
                      <div className="mt-1 relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400">
                          {/* SVG icon for phone */}
                        </span>
                        <input type="tel" name="phone" id="phone" required className="block w-full h-11 pl-10 pr-4 rounded-lg border border-gray-300 bg-white/50 shadow-sm focus:ring-0 focus:border-blue-500 transition-all duration-200 hover:border-gray-400 outline-none" />
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between pt-6">
                    <div className="ml-auto">
                      <button type="button" disabled className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed">
                        Next
                        <span className="ml-2">
                          {/* SVG icon for arrow right */}
                        </span>
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
);

export default RequestQuote;