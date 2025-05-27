import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  // Function to handle scrolling to top
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-logo">
            <Link to="/">Nishchay Sharma</Link>
            <p>Full Stack Developer</p>
          </div>
          
          <div className="footer-links">
            <div className="footer-nav">
              <h4>Navigation</h4>
              <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/about">About</Link></li>
                <li><Link to="/projects">Projects</Link></li>
                <li><Link to="/contact">Contact</Link></li>
              </ul>
            </div>
            
            <div className="social-links">
              <h4>Connect</h4>
              <div className="social-icons">
                <a href="https://github.com/nish340" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                  <i className="social-icon github"></i>
                </a>
                <a href="https://www.linkedin.com/in/nishchay-sharma-64b0661b3/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                  <i className="social-icon linkedin"></i>
                </a>
                <a href="https://x.com/Nishchay" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                  <i className="social-icon twitter"></i>
                </a>
                <a href="mailto:nishchay340@gmail.com" aria-label="Email">
                  <i className="social-icon email"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Nishchay Sharma. All rights reserved.</p>
          <button className="back-to-top" onClick={scrollToTop} aria-label="Back to top">
            <span>↑</span>
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;