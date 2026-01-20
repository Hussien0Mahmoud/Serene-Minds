import { Container, Row, Col, Card } from "react-bootstrap";

import '../../styles/about/about.css';

export default function AboutOurTeam() {
  const teamMembers = [
    { id: 1, img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop", name: "Dr. Sarah Williams", role: "Clinical Psychologist" },
    { id: 2, img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop", name: "Dr. Michael Chen", role: "Mental Health Specialist" },
    { id: 3, img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop", name: "Dr. Emily Rodriguez", role: "Therapeutic Counselor" }
  ];

  return (
    <>
      <Container className="my-5 text-center">
        <h2 className="fw-bold" style={{ color: '#660ff1' }}>Our Expert Team</h2>
        <p className="text-muted">Licensed professionals dedicated to your mental well-being.</p>
        <Row className="g-4">
          {teamMembers.map((member) => (
            <Col md={4} key={member.id}>
              <Card className="shadow border-0 p-4">
                <Card.Img
                  variant="top"
                  src={member.img}
                  className="rounded-circle mx-auto"
                  style={{ width: "100px" }}
                />
                <Card.Body>
                  <h5 className="fw-bold">{member.name}</h5>
                  <p className="text-muted">{member.role}</p>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  )
}
