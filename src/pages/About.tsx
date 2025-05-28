import { Shield, Users, Award, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export function About() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">About DustBeaters</h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Your trusted partner in commercial cleaning excellence, transforming workspaces into pristine environments that inspire productivity and well-being.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Statement Section - as specified */}
      <div className="fade-in-section is-visible ">
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative bg-blue-600 rounded-2xl p-12 overflow-hidden w-max mx-auto">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,#3b82f6,transparent_70%)]"></div>
              <div className="relative">
                <h2 className="text-3xl font-bold text-white mb-6">Our Mission</h2>
                <p className="text-xl text-blue-100 leading-relaxed max-w-3xl">
                  At DustBeaters, we're committed to creating healthier, cleaner workspaces that enhance productivity and well-being. Through innovative cleaning solutions and exceptional service, we help businesses maintain pristine environments that impress clients and motivate employees.
                </p>
                <Link className="inline-flex items-center mt-8 px-6 py-3 bg-white text-blue-600 rounded-full font-semibold hover:bg-blue-50 transition-all duration-300 group" to="/services">
                  Explore Our Services
                  <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Core Values Section */}
      <div className="fade-in-section is-visible">
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Core Values</h2>
              <p className="text-lg text-gray-600">The principles that guide our commitment to excellence</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="group relative bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-blue-500/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                <div className="relative">
                  <div className="inline-flex rounded-xl text-blue-600 bg-white p-3 shadow-md mb-6">
                    <Shield className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Quality &amp; Trust</h3>
                  <p className="text-gray-600 leading-relaxed">We maintain the highest standards of cleaning excellence and build lasting relationships with our clients.</p>
                </div>
              </div>
              <div className="group relative bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-purple-500/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                <div className="relative">
                  <div className="inline-flex rounded-xl text-purple-600 bg-white p-3 shadow-md mb-6">
                    <Users className="h-8 w-8 text-purple-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Professional Excellence</h3>
                  <p className="text-gray-600 leading-relaxed">Our team consists of trained professionals who take pride in their work and attention to detail.</p>
                </div>
              </div>
              <div className="group relative bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-green-500/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                <div className="relative">
                  <div className="inline-flex rounded-xl text-green-600 bg-white p-3 shadow-md mb-6">
                    <Award className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Innovation &amp; Sustainability</h3>
                  <p className="text-gray-600 leading-relaxed">We use eco-friendly products and innovative techniques to deliver superior results.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* CTA Section */}
      <div className="fade-in-section is-visible">
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl p-12 text-center">
              <h2 className="text-3xl font-bold text-white mb-4">Ready to Experience the Difference?</h2>
              <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">Join hundreds of satisfied businesses who trust DustBeaters for their cleaning needs</p>
              <Link className="inline-flex items-center px-8 py-4 bg-white text-blue-600 rounded-full font-semibold hover:bg-blue-50 transition-all duration-300 group" to="/quote">
                Get Your Free Quote
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}