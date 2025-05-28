import { Building2, Sparkles, Shield, Clock } from 'lucide-react';

export function Services() {
  return (
    <div className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900">Our Services</h1>
          <p className="mt-4 text-xl text-gray-600">
            Professional cleaning solutions tailored to your space and needs
          </p>
        </div>

        {/* Service Features */}
        <div className="mt-24">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            What's Included in Every Service
          </h2>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: Building2,
                title: "Space Assessment",
                description: "Detailed evaluation of your facility's specific needs",
                color: "text-purple-600",
                bg: "bg-purple-50"
              },
              {
                icon: Sparkles,
                title: "Custom Cleaning Plan",
                description: "Tailored cleaning schedule and protocols",
                color: "text-blue-600",
                bg: "bg-blue-50"
              },
              {
                icon: Shield,
                title: "Quality Guarantee",
                description: "100% satisfaction guarantee on all services",
                color: "text-green-600",
                bg: "bg-green-50"
              },
              {
                icon: Clock,
                title: "Flexible Scheduling",
                description: "Service times that work around your business",
                color: "text-orange-600",
                bg: "bg-orange-50"
              }
            ].map((feature, index) => (
              <div key={index} className="relative group">
                <div className={`rounded-2xl ${feature.bg} p-6 transition-all duration-300 group-hover:shadow-lg group-hover:-translate-y-1`}>
                  <feature.icon className={`h-8 w-8 ${feature.color}`} />
                  <h3 className="mt-4 text-xl font-semibold text-gray-900">
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-gray-600">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action - Enhanced Section */}
        <div className="mt-20 flex flex-col items-center">
          <div className="bg-blue-600 rounded-3xl px-20 py-10 shadow-2xl text-center w-full max-w-4xl">
            <h2 className="text-3xl font-bold text-white mb-4">Ready for a Cleaner, Healthier Space?</h2>
            <p className="text-lg text-blue-100 mb-8">
              Get your personalized cleaning quote today. Our team will tailor a solution just for your business needs.
            </p>
            <a
              href="/requestquote"
              className="inline-block bg-white text-blue-600 px-8 py-3 rounded-full text-lg font-semibold shadow-lg hover:bg-blue-700 hover:text-white transition-colors duration-200"
            >
              Request a Quote
            </a>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-24">
          <h2 className="text-3xl font-bold text-gray-900 text-center">
            Frequently Asked Questions
          </h2>
          <div className="mt-12 max-w-3xl mx-auto">
            {[
              {
                question: "How do you calculate per square foot pricing?",
                answer: "Our pricing is based on several factors including space size, cleaning frequency, specific requirements, and type of facility. We provide detailed quotes after assessing your space."
              },
              {
                question: "Can I customize the cleaning frequency?",
                answer: "Yes! We offer flexible scheduling options and can customize the cleaning frequency based on your needs and budget."
              },
              {
                question: "What's included in the square footage calculation?",
                answer: "We calculate based on the total cleanable space, including offices, common areas, bathrooms, and other spaces requiring service."
              }
            ].map((faq, index) => (
              <div key={index} className="mt-8 first:mt-0">
                <h3 className="text-lg font-semibold text-gray-900">{faq.question}</h3>
                <p className="mt-2 text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}