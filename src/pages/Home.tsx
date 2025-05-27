import React from 'react';
import { Hero } from '../components/Hero';
import { Star, Users, Building2, Award, ArrowRight } from 'lucide-react';
import { FadeInSection } from '../components/FadeInSection';

export function Home() {
  const testimonials = [
    {
      content: "DustBeaters has transformed our office environment. Their attention to detail is unmatched.",
      author: "Sarah Johnson",
      role: "Office Manager",
      company: "Tech Solutions Inc.",
      image: "/home/project/src/assets/images/{hero,blog,team,services,testimonials}/hero - ok handsign.jpg"
    },
    {
      content: "Reliable, professional, and thorough. We couldn't be happier with their services.",
      author: "Michael Chen",
      role: "Facility Director",
      company: "Global Enterprises",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200&q=80"
    }
  ];

  return (
    <div className="overflow-hidden">
      <Hero />
      
      {/* Why Choose Us */}
      <section className="relative py-24 bg-white">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInSection>
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900">Why Choose DustBeaters?</h2>
              <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
                We deliver excellence in commercial cleaning through our commitment to quality and customer satisfaction.
              </p>
            </div>
          </FadeInSection>

          <div className="mt-20 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 stagger-fade-in">
            {[
              {
                icon: Star,
                title: "Quality Guaranteed",
                description: "Our cleaning services meet the highest industry standards",
                color: "text-yellow-500",
                gradient: "from-yellow-500/20 to-transparent"
              },
              {
                icon: Users,
                title: "Expert Team",
                description: "Professionally trained and vetted cleaning specialists",
                color: "text-blue-500",
                gradient: "from-blue-500/20 to-transparent"
              },
              {
                icon: Building2,
                title: "Custom Solutions",
                description: "Tailored cleaning plans for your specific needs",
                color: "text-purple-500",
                gradient: "from-purple-500/20 to-transparent"
              },
              {
                icon: Award,
                title: "Certified Clean",
                description: "Following strict cleaning and safety protocols",
                color: "text-green-500",
                gradient: "from-green-500/20 to-transparent"
              }
            ].map((feature, index) => (
              <div 
                key={index}
                className="group relative rounded-2xl bg-white p-8 shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
              >
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-b ${feature.gradient} opacity-0 transition-opacity duration-300 group-hover:opacity-100`}></div>
                <div className="relative">
                  <div className={`inline-flex rounded-xl ${feature.color} bg-white p-3 shadow-md`}>
                    <feature.icon className={`h-6 w-6 ${feature.color}`} />
                  </div>
                  <h3 className="mt-6 text-lg font-medium text-gray-900">{feature.title}</h3>
                  <p className="mt-2 text-base text-gray-500">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInSection>
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900">What Our Clients Say</h2>
            </div>
          </FadeInSection>
          
          <div className="mt-20 grid grid-cols-1 gap-8 lg:grid-cols-2 stagger-fade-in">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="group relative rounded-2xl bg-white p-8 shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
              >
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                <div className="relative">
                  <svg className="h-12 w-12 text-blue-600/20 absolute -top-2 -left-2" fill="currentColor" viewBox="0 0 32 32" aria-hidden="true">
                    <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                  </svg>
                  <p className="text-gray-600 italic relative">{testimonial.content}</p>
                  <div className="mt-6 flex items-center gap-x-4">
                    <img
                      src={testimonial.image}
                      alt={testimonial.author}
                      className="h-12 w-12 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-medium text-gray-900">{testimonial.author}</p>
                      <p className="text-gray-500">{testimonial.role}</p>
                      <p className="text-gray-500">{testimonial.company}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <FadeInSection>
        <section className="relative py-24 bg-blue-600">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,#3b82f6,transparent_70%)]"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-white">Ready to Transform Your Space?</h2>
            <p className="mt-4 text-xl text-blue-100 max-w-2xl mx-auto">
              Join hundreds of satisfied businesses who trust DustBeaters for their cleaning needs.
            </p>
            <div className="mt-10">
              <a
                href="/quote"
                className="group inline-flex items-center gap-x-2 rounded-full bg-white px-8 py-4 text-lg font-semibold text-blue-600 shadow-sm transition-all duration-300 hover:bg-blue-50 hover:shadow-lg hover:-translate-y-1"
              >
                Get Started Today
                <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            </div>
          </div>
        </section>
      </FadeInSection>
    </div>
  );
}