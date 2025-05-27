import React from 'react';
import { Shield, Users, Award } from 'lucide-react';

export function About() {
  return (
    <div className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900">About DustBeaters</h1>
          <p className="mt-4 text-xl text-gray-600">
            Your trusted partner in commercial cleaning excellence since 2010
          </p>
        </div>

        {/* Mission Statement */}
        <div className="mt-20 bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h2>
          <p className="text-gray-600 leading-relaxed">
            At DustBeaters, we're committed to creating healthier, cleaner workspaces that enhance 
            productivity and well-being. Through innovative cleaning solutions and exceptional 
            service, we help businesses maintain pristine environments that impress clients and 
            motivate employees.
          </p>
        </div>

        {/* Core Values */}
        <div className="mt-20">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-12">Our Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Shield,
                title: "Quality & Trust",
                description: "We maintain the highest standards of cleaning excellence and build lasting relationships with our clients."
              },
              {
                icon: Users,
                title: "Professional Excellence",
                description: "Our team consists of trained professionals who take pride in their work and attention to detail."
              },
              {
                icon: Award,
                title: "Innovation & Sustainability",
                description: "We use eco-friendly products and innovative techniques to deliver superior results."
              }
            ].map((value, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-lg text-center">
                <div className="flex justify-center mb-4">
                  <value.icon className="h-12 w-12 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Company History */}
        <div className="mt-20">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Our Journey</h2>
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-semibold text-gray-900">2010 - The Beginning</h3>
                <p className="mt-2 text-gray-600">
                  Founded with a vision to revolutionize commercial cleaning services.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900">2015 - Growth & Innovation</h3>
                <p className="mt-2 text-gray-600">
                  Expanded services and introduced eco-friendly cleaning solutions.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900">2020 - Leading the Industry</h3>
                <p className="mt-2 text-gray-600">
                  Became the region's most trusted commercial cleaning service provider.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900">Today</h3>
                <p className="mt-2 text-gray-600">
                  Continuing to set industry standards with innovative solutions and exceptional service.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="mt-20">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-12">Our Leadership Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "John Smith",
                role: "CEO & Founder",
                description: "20+ years of industry experience"
              },
              {
                name: "Sarah Williams",
                role: "Operations Director",
                description: "Expert in sustainable cleaning practices"
              },
              {
                name: "Michael Brown",
                role: "Client Success Manager",
                description: "Dedicated to exceptional service delivery"
              }
            ].map((member, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-lg text-center">
                <h3 className="text-xl font-semibold text-gray-900">{member.name}</h3>
                <p className="text-blue-600 font-medium mt-1">{member.role}</p>
                <p className="text-gray-600 mt-2">{member.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}