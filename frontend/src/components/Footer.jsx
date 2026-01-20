import { Container, Row, Col, ListGroup, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaHeart } from 'react-icons/fa';
import Logo2 from "../assets/images/navbar/sereneLogo1.png";
import "../assets/css/footer/style.css";

const Footer = () => {
  return (
    <footer className="bg-dark text-white py-4 py-md-5 mt-5">
      <Container fluid className="px-3 px-md-4">
        <Row className="g-4 g-md-5">
          <Col xs={12} sm={12} md={4} className="mb-4 mb-md-0">
            <div className="mb-3">
              <img
                alt="Serene Minds Logo"
                src={Logo2}
                width="125"
                height="75"
                className="d-inline-block align-top"
              />
            </div>
            <p className="mb-3 small fs-6 fs-md-5 text-justify">
              Dedicated to providing professional mental health support and resources.
              Your journey to better mental health starts here.
            </p>
            <div className="d-flex gap-3 mb-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-white fs-5 fs-md-4 transition">
                <FaFacebook />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-white fs-5 fs-md-4 transition">
                <FaTwitter />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-white fs-5 fs-md-4 transition">
                <FaInstagram />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-white fs-5 fs-md-4 transition">
                <FaLinkedin />
              </a>
            </div>
          </Col>

          <Col xs={6} sm={6} md={2} className="mb-4 mb-md-0">
            <h5 className="text-uppercase mb-4 fs-6">Quick Links</h5>
            <ListGroup variant="flush" className="footer-links">
              <ListGroup.Item className="bg-transparent border-0 p-0 mb-2">
                <Link to="/" className="text-white text-decoration-none small">Home</Link>
              </ListGroup.Item>
              <ListGroup.Item className="bg-transparent border-0 p-0 mb-2">
                <Link to="/about" className="text-white text-decoration-none small">About Us</Link>
              </ListGroup.Item>
              <ListGroup.Item className="bg-transparent border-0 p-0 mb-2">
                <Link to="/contact" className="text-white text-decoration-none small">Contact Us</Link>
              </ListGroup.Item>
              <ListGroup.Item className="bg-transparent border-0 p-0 mb-2">
                <Link to="/resources" className="text-white text-decoration-none small">Resources</Link>
              </ListGroup.Item>
            </ListGroup>
          </Col>

          <Col xs={6} sm={6} md={2} className="mb-4 mb-md-0">
            <h5 className="text-uppercase mb-4 fs-6">Services</h5>
            <ListGroup variant="flush" className="footer-links">
              <ListGroup.Item className="bg-transparent border-0 p-0 mb-2">
                <Link to="/appointment" className="text-white text-decoration-none small">Book Appointment</Link>
              </ListGroup.Item>
              <ListGroup.Item className="bg-transparent border-0 p-0 mb-2">
                <Link to="/events" className="text-white text-decoration-none small">Events & Workshops</Link>
              </ListGroup.Item>
              <ListGroup.Item className="bg-transparent border-0 p-0 mb-2">
                <Link to="/therapists" className="text-white text-decoration-none small">Our Therapists</Link>
              </ListGroup.Item>
              <ListGroup.Item className="bg-transparent border-0 p-0 mb-2">
                <Link to="/support" className="text-white text-decoration-none small">Support Groups</Link>
              </ListGroup.Item>
            </ListGroup>
          </Col>

          <Col xs={12} sm={12} md={4}>
            <h5 className="text-uppercase mb-4 fs-6">Stay Connected</h5>
            <p className="mb-3 small fs-6">
              Subscribe to receive mental health tips, event updates, and resources.
            </p>
            <div className="input-group mb-3">
              <input
                type="email"
                className="form-control form-control-sm"
                placeholder="Your email"
                aria-label="Your email"
              />
              <button 
                className="btn btn-sm" 
                type="button"
                style={{ backgroundColor: '#660ff1', color: 'white' }}
              >
                Subscribe
              </button>
            </div>
            <p className="small text-muted fs-6">
              Your mental health journey matters to us. We respect your privacy.
            </p>
          </Col>
        </Row>

        <hr className="my-3 my-md-4" />

      </Container>
    </footer>
  );
};

export default Footer;
