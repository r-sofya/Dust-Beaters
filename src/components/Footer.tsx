import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Mail, Phone } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
          {/* Company Info and Social */}
          <div className="max-w-sm">
            <Link to="/" className="text-2xl font-bold text-white hover:text-gray-100 transition-colors duration-200">
              DustBeaters
            </Link>
            <p className="mt-4 text-sm leading-relaxed">
              Professional commercial cleaning services you can trust. Delivering excellence in every clean.
            </p>
            <div className="flex gap-5 mt-6">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors duration-200">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors duration-200">
                <Twitter className="h-6 w-6" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors duration-200">
                <Instagram className="h-6 w-6" />
              </a>
            </div>
          </div>

          {/* Quick Links and Contact */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-12">
            {/* Quick Links */}
            <div>
              <h3 className="text-lg text-white font-semibold mb-6">Quick Links</h3>
              <ul className="space-y-3">
                {[
                  { label: 'Home', href: '/' },
                  { label: 'Services', href: '/services' },
                  { label: 'About Us', href: '/about' },
                  { label: 'Contact', href: '/contact' },
                  { label: 'Request Quote', href: '/requestquote' },
                  { label: 'Terms & Conditions', href: '/terms' },
                ].map((link) => (
                  <li key={link.href}>
                    <Link
                      to={link.href}
                      className="hover:text-white transition-colors duration-200 text-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="text-lg text-white font-semibold mb-6">Contact Us</h3>
              <ul className="space-y-3">
                <li className="flex items-center group">
                  <Phone className="h-5 w-5 mr-3 group-hover:text-white transition-colors duration-200" />
                  <span className="text-sm group-hover:text-white transition-colors duration-200">(289) 914-1643</span>
                </li>
                <li className="flex items-center group">
                  <Mail className="h-5 w-5 mr-3 group-hover:text-white transition-colors duration-200" />
                  <a 
                    href="mailto:contact@dustbeaters.com" 
                    className="text-sm group-hover:text-white transition-colors duration-200"
                  >
                    contact@dustbeaters.com
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm order-2 md:order-1">
              © {currentYear} DustBeaters. All rights reserved.
            </p>
            <div className="flex gap-6 order-1 md:order-2">
              <Link to="/privacy" className="hover:text-white text-sm transition-colors duration-200">
                Privacy Policy
              </Link>
              <Link to="/terms" className="hover:text-white text-sm transition-colors duration-200">
                Terms & Conditions
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}