import React from 'react';
import { Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export function Navigation() {
  const [isOpen, setIsOpen] = React.useState(false);
  const location = useLocation();

  // Update navigation links to only include Home, Services, About, Contact, and Request Quote
  const links = [
    { href: '/', label: 'Home', showAlways: true },
    { href: '/services', label: 'Services', showAlways: true },
    { href: '/about', label: 'About', showAlways: true },
    { href: '/contact', label: 'Contact', showAlways: true },
    { href: '/requestquote', label: 'Request Quote', isButton: true, showAlways: true }
  ];

  // Close mobile menu when route changes
  React.useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  // Close menu when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const nav = document.getElementById('mobile-menu');
      if (isOpen && nav && !nav.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  // Prevent scroll when mobile menu is open
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <nav className="fixed w-full z-50 bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center space-x-2 flex-shrink-0"
          >
            <span className="text-2xl font-bold text-blue-600 whitespace-nowrap">DustBeaters</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center justify-end space-x-8 flex-1 ml-8">
            {links.filter(link => link.showAlways).map((link) => (
              !link.isButton ? (
              <Link
                key={link.href}
                to={link.href}
                className={`
                  text-base font-medium whitespace-nowrap
                  ${location.pathname === link.href
                    ? 'text-blue-600'
                    : 'text-gray-600 hover:text-blue-600'
                  } transition-colors duration-200
                `}
              >
                {link.label}
              </Link>
              ) : null
            ))}
            {links.filter(link => link.isButton && link.showAlways).map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="
                  bg-blue-600 text-white px-4 py-2 rounded-md 
                  hover:bg-blue-700 transition-colors duration-200
                  whitespace-nowrap
                "
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="
                inline-flex items-center justify-center p-2 rounded-md 
                text-gray-600 hover:text-blue-600 hover:bg-gray-100
                focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500
              "
              aria-expanded={isOpen}
              aria-label={isOpen ? "Close menu" : "Open menu"}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        className={`
          lg:hidden fixed inset-0 top-16 bg-white transform 
          ${isOpen ? 'translate-x-0' : 'translate-x-full'}
          transition-transform duration-300 ease-in-out z-40
        `}
      >
        <div className="px-4 pt-2 pb-3 space-y-1 sm:px-3 max-h-[calc(100vh-4rem)] overflow-y-auto">
          {links.filter(link => link.showAlways).map((link) => (
            !link.isButton ? (
            <Link
              key={link.href}
              to={link.href}
              className={`
                block px-3 py-2 rounded-md text-base font-medium
                ${location.pathname === link.href
                  ? 'text-blue-600 bg-blue-50'
                  : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
                }
                transition-colors duration-200
              `}
              onClick={() => setIsOpen(false)}
            >
              {link.label}
            </Link>
            ) : null
          ))}
          {links.filter(link => link.isButton && link.showAlways).map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className="
                block px-3 py-2 rounded-md text-base font-medium
                bg-blue-600 text-white hover:bg-blue-700
                transition-colors duration-200 mt-4
              "
              onClick={() => setIsOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-25 lg:hidden"
          aria-hidden="true"
          onClick={() => setIsOpen(false)}
        />
      )}
    </nav>
  );
}