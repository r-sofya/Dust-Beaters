import { Link } from 'react-router-dom';
import { Shield, Clock, Leaf, ArrowRight } from 'lucide-react';

export function Hero() {
  return (
    <div className="relative bg-white">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-white pointer-events-none" aria-hidden="true">
        <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-30"></div>
      </div>

      <div className="relative">
        <div className="mx-auto max-w-7xl lg:grid lg:grid-cols-12 lg:gap-x-8 lg:px-8">
          <div className="px-6 pb-12 pt-10 sm:pb-20 lg:col-span-7 lg:px-0 lg:pb-24 lg:pt-24 xl:col-span-6">
            <div className="mx-auto max-w-2xl lg:mx-0">
              <div className="mb-6 inline-flex animate-fade-in-up items-center rounded-full bg-blue-50 px-4 py-1.5 text-sm font-semibold text-blue-600 transition-all duration-300 hover:bg-blue-100">
                <span className="mr-2">✨</span>
                Professional Commercial Cleaning
              </div>
              
              <h1 className="animate-fade-in-up text-4xl font-bold tracking-tight text-gray-900 [text-wrap:balance] sm:text-5xl">
                Transform Your Workspace with Expert Cleaning
              </h1>
              
              <p className="mt-4 text-lg leading-8 text-gray-600 animate-fade-in-up [animation-delay:200ms]">
                Elevate your business environment with our premium cleaning services. 
                We deliver spotless results, so you can focus on what matters most - your success.
              </p>
              
              <div className="mt-8 flex items-center gap-x-6 animate-fade-in-up [animation-delay:400ms]">
                <Link
                  to="/requestquote"
                  className="group relative rounded-full bg-blue-600 px-8 py-3 text-lg font-semibold text-white transition-all duration-300 hover:bg-blue-500 hover:shadow-lg hover:-translate-y-1"
                >
                  Request a Quote
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 transition-all duration-300 group-hover:right-2 group-hover:opacity-100">
                    <ArrowRight className="h-5 w-5" />
                  </span>
                </Link>
                <Link
                  to="/services"
                  className="group text-lg font-semibold leading-6 text-gray-900 transition-all duration-300 hover:text-blue-600"
                >
                  View Services
                  <span className="inline-block transition-transform duration-300 group-hover:translate-x-2">→</span>
                </Link>
              </div>
              
              <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3 animate-fade-in-up [animation-delay:600ms]">
                {[
                  {
                    icon: Shield,
                    label: "Fully Insured",
                    color: "bg-emerald-50 text-emerald-600"
                  },
                  {
                    icon: Clock,
                    label: "24/7 Service",
                    color: "bg-blue-50 text-blue-600"
                  },
                  {
                    icon: Leaf,
                    label: "Eco-Friendly",
                    color: "bg-green-50 text-green-600"
                  }
                ].map((item, index) => (
                  <div
                    key={index}
                    className="group flex items-center gap-x-3 rounded-2xl bg-white p-3 shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-1"
                  >
                    <div className={`rounded-xl ${item.color} p-2.5`}>
                      <item.icon className="h-5 w-5" />
                    </div>
                    <span className="text-sm font-semibold">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="relative lg:col-span-5 lg:-mr-8 xl:absolute xl:inset-0 xl:left-1/2 xl:mr-0">
            <div className="relative h-full overflow-visible">
              <img
                className="aspect-[3/2] w-full rounded-2xl bg-gray-50 object-cover lg:absolute lg:inset-0 lg:aspect-auto lg:h-full shadow-2xl transition-all duration-300 hover:shadow-xl"
                src="https://images.pexels.com/photos/5218001/pexels-photo-5218001.jpeg"
                alt="Professional cleaning team in red uniforms working together in a modern space"
              />
              {/* Floating Elements */}
              <div className="absolute -left-4 top-1/4 animate-float z-10">
                <div className="rounded-2xl bg-white p-3 shadow-lg">
                  <div className="flex items-center space-x-2">
                    <div className="h-2.5 w-2.5 rounded-full bg-green-400"></div>
                    <span className="text-sm font-medium">Certified Clean</span>
                  </div>
                </div>
              </div>
              <div className="absolute right-4 bottom-1/4 animate-float [animation-delay:1000ms] z-10">
                <div className="rounded-2xl bg-white p-3 shadow-lg">
                  <div className="flex items-center space-x-2">
                    <div className="h-2.5 w-2.5 rounded-full bg-blue-400"></div>
                    <span className="text-sm font-medium whitespace-nowrap">100% Satisfaction</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}