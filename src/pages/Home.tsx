import { Hero } from '../components/Hero';
import { Star, Users, Building2, Award, ArrowRight } from 'lucide-react';
import { FadeInSection } from '../components/FadeInSection';

export function Home() {

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
                href="/requestquote"
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