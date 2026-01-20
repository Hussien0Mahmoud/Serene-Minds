import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { FaBook, FaVideo, FaArrowRight } from 'react-icons/fa';
import './ResourcesHero.css';

export default function ResourcesHero() {
  return (
    <section className="resources-hero">
      <Container>
        <Row className="align-items-center gy-4">
          <Col lg={7}>
            <span className="badge-pill mb-3">Mental Wellness Library</span>

            <h1 className="hero-title">
              Explore Mental Health Resources
            </h1>

            <p className="hero-subtitle">
              Discover expert-curated books, articles, and videos designed to
              support your mental wellness journey.
            </p>
          </Col>

          <Col lg={5} className="d-none d-lg-block">
            <div className="stats-wrapper">
              <div className="stat-card">
                <FaBook className="stat-icon" />
                <div>
                  <h5>Books & Articles</h5>
                  <p>Evidence-based reading</p>
                </div>
              </div>

              <div className="stat-card">
                <FaVideo className="stat-icon" />
                <div>
                  <h5>Videos & Tutorials</h5>
                  <p>Guided & visual learning</p>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}
