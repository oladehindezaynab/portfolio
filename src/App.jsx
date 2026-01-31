import { Routes, Route, Link, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Hero from './components/Hero'
import Articles from './components/Articles'
import About from './components/About'

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function App() {
  return (
    <main className="bg-portfolio-navy min-h-screen">
      <ScrollToTop />
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 px-6 py-4 flex justify-between items-center glass border-none rounded-none">
        <Link to="/" className="text-2xl font-bold tracking-tighter text-portfolio-gold">OZ</Link>
        <div className="hidden md:flex gap-8 font-medium">
          <Link to="/" className="hover:text-portfolio-gold transition-colors">Home</Link>
          <Link to="/about" className="hover:text-portfolio-gold transition-colors">About</Link>
          <a href="#work" className="hover:text-portfolio-gold transition-colors">Work</a>
          <a href="#contact" className="hover:text-portfolio-gold transition-colors text-portfolio-gold italic">Connect</a>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={
          <>
            <Hero />
            <div id="work">
              <Articles />
            </div>
            <section id="contact" className="py-24 text-center px-4">
              <h2 className="text-4xl font-bold mb-6">Get In Touch</h2>
              <p className="text-portfolio-ivory text-opacity-70 mb-10 max-w-xl mx-auto text-lg">
                Ready to collaborate on Educational Technology projects or media storytelling? Let's connect and build the future together.
              </p>
              <a href="mailto:oladehindezaynab2003@gmail.com" className="btn-gold inline-block">Send a Message</a>
            </section>
          </>
        } />
        <Route path="/about" element={<About />} />
      </Routes>

      <footer className="py-12 border-t border-white border-opacity-10 text-center text-sm text-portfolio-ivory text-opacity-50">
        <p>© {new Date().getFullYear()} Oladehinde Zainab. Built for the future of Education.</p>
      </footer>
    </main>
  )
}

export default App
