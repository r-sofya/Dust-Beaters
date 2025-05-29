import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Navigation } from './components/Navigation';
import { Footer } from './components/Footer';

const Home = lazy(() => import('./pages/Home').then(module => ({ default: module.Home })));
const Services = lazy(() => import('./pages/Services').then(module => ({ default: module.Services })));
const About = lazy(() => import('./pages/About').then(module => ({ default: module.About })));
const Contact = lazy(() => import('./pages/Contact').then(module => ({ default: module.Contact })));
const RequestQuote = lazy(() => import('./pages/RequestQuote'));
const Terms = lazy(() => import('./pages/Terms'));

/**
 * ScrollToTop Component
 * 
 * Scrolls the window to the top when the route changes
 */
function ScrollToTop() {
  const { pathname } = useLocation();
  
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]); // Effect runs when pathname changes
  
  return null;
}

/**
 * Main App Component
 * 
 * Handles routing and layout structure of the application.
 * Uses React.Suspense for lazy loading with a minimal fallback.
 */
function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route
          path="/*"
          element={
            <div className="min-h-screen bg-gray-50">
              <Navigation />
              <main className="pt-16">
                <Suspense fallback={<div className="min-h-screen" />}>
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/services" element={<Services />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/requestquote" element={<RequestQuote />} />
                    <Route path="/terms" element={<Terms />} />
                    <Route path="*" element={<div className='text-center py-24 text-2xl'>Page Not Found</div>} />
                  </Routes>
                </Suspense>
              </main>
              <Footer />
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;