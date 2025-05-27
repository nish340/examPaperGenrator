import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container navbar-content">
        <Link to="/" className="logo">NS</Link>
        
        <div className="menu-toggle" onClick={toggleMenu}>
          <div className={`hamburger ${isMenuOpen ? 'active' : ''}`}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
        
        <ul className={`menu ${isMenuOpen ? 'active' : ''}`}>
          <li>
            <Link 
              to="/" 
              className={location.pathname === '/' ? 'active' : ''} 
              onClick={closeMenu}
            >
              Home
            </Link>
          </li>
          <li>
            <Link 
              to="/about" 
              className={location.pathname === '/about' ? 'active' : ''} 
              onClick={closeMenu}
            >
              About
            </Link>
          </li>
          <li>
            <Link 
              to="/projects" 
              className={location.pathname === '/projects' ? 'active' : ''} 
              onClick={closeMenu}
            >
              Projects
            </Link>
          </li>
          <li>
            <Link 
              to="/gallery" 
              className={location.pathname === '/gallery' ? 'active' : ''} 
              onClick={closeMenu}
            >
              Gallery
            </Link>
          </li>
          {/* <li>
            <Link 
              to="/blog" 
              className={location.pathname === '/blog' ? 'active' : ''} 
              onClick={closeMenu}
            >
              Blog
            </Link>
          </li> */}
          {/* <li>
            <Link 
              to="/testimonials" 
              className={location.pathname === '/testimonials' ? 'active' : ''} 
              onClick={closeMenu}
            >
              Testimonials
            </Link>
          </li> */}
          <li>
            <Link 
              to="/contact" 
              className={location.pathname === '/contact' ? 'active' : ''} 
              onClick={closeMenu}
            >
              Contact
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;