import React, { useState, useEffect, useMemo } from 'react';
import { Container, Row, Col, Card, Badge, Button, Form } from 'react-bootstrap';
import { FaStar, FaVideo, FaPhoneAlt, FaCalendarAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setTherapists, setLoading, setError } from '../../store/slices/therapistSlice';
import { therapistApi } from '../../api/api';
import './therapistList.css';

export default function TherapistList({ onViewSchedule }) {
  const dispatch = useDispatch();
  const { therapists, loading, error } = useSelector(state => state.therapists);
  const [selectedSpecialty, setSelectedSpecialty] = useState('all');

  useEffect(() => {
    if (!therapists || therapists.length === 0) {
      fetchTherapists();
    }
  }, []);

  const fetchTherapists = async () => {
    try {
      dispatch(setLoading(true));
      const response = await therapistApi.getAllTherapists();

      const therapistsData = response.data.results || [];
      
      const transformedData = therapistsData.map(therapist => ({
        id: therapist.id,
        name: therapist.user.username,
        email: therapist.user.email,
        specialty: therapist.specialty,
        experience: `${therapist.experience} years`,
        availability: therapist.availability,
        price: parseFloat(therapist.price),
        languages: Array.isArray(therapist.languages) ? therapist.languages : [therapist.languages],
        specializations: Array.isArray(therapist.specializations) ? therapist.specializations : [therapist.specializations],
        education: Array.isArray(therapist.education) ? therapist.education : [therapist.education],
        about: therapist.about,
        rating: parseFloat(therapist.rating),
        reviews: therapist.reviews_count,
        image: therapist.user.profile_image,
        time_slots: therapist.time_slots
      }));

      dispatch(setTherapists(transformedData));
    } catch (error) {
      dispatch(setError('Failed to fetch therapists'));
    } finally {
      dispatch(setLoading(false));
    }
  };

  const specialtyOptions = useMemo(() => {
    if (!Array.isArray(therapists)) {
      return [];
    }
    
    const specialties = new Set();
    therapists.forEach(therapist => {
      if (therapist.specialty) specialties.add(therapist.specialty);
    });
    return Array.from(specialties);
  }, [therapists]);

  const filteredTherapists = useMemo(() => selectedSpecialty === 'all' 
    ? (Array.isArray(therapists) ? therapists : [])
    : (Array.isArray(therapists) ? therapists.filter(therapist => 
        therapist.specialty === selectedSpecialty
      ) : []), [therapists, selectedSpecialty]);

  return (
    <Container className="therapist-container">
      <div className="therapist-header">
        <h2 className="therapist-title">Our Therapists</h2>
        <Form.Select 
          className="therapist-filter"
          value={selectedSpecialty}
          onChange={(e) => setSelectedSpecialty(e.target.value)}
        >
          <option value="all" > All Specialties</option>
          {specialtyOptions.map((specialty) => (
            <option key={specialty} value={specialty}>{specialty}</option>
          ))}
        </Form.Select>
      </div>

      {loading ? (
        <div className="loading-spinner">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : error ? (
        <div className="alert alert-danger">{error}</div>
      ) : (
        <Row className="g-3 g-md-4">
          {filteredTherapists.map((therapist) => (
            <Col key={therapist.id} xs={12} sm={6} md={6} lg={4} className="d-flex">
              <Card className="therapist-card w-100">
                <Card.Body className="d-flex flex-column">

                  <div className="text-center mb-3">
                    <img
                      src={therapist.image || `https://ui-avatars.com/api/?name=${therapist.name}`}
                      alt={therapist.name}
                      className="rounded-circle therapist-image"
                    />
                    <h5 className="therapist-name">{therapist.name}</h5>
                    <p className="therapist-specialty">{therapist.specialty}</p>
                    <div className="therapist-rating">
                      <FaStar className="text-warning" />
                      <span className="fw-bold">{therapist.rating || '0.0'}</span>
                      <span className="text-muted">({therapist.reviews || 0} reviews)</span>
                    </div>
                  </div>

                  <div className="flex-grow-1">
                    <div >
                      {therapist.specializations?.map((specialization, index) => (
                        <Badge className="therapist-badges" 
                          key={index}
                          
                        >
                          {specialization}
                        </Badge>
                      ))}
                    </div>

                    <div className="therapist-experience text-center mt-3">
                      <small className="text-muted d-block">Experience</small>
                      <small className="text-success fw-bold">{therapist.experience}</small>
                    </div>
                  </div>

                  <div className="therapist-footer">
                    <span className="therapist-price">${therapist.price || 0}/session</span>
                    <Link to={`/doctor/${therapist.id}`} className="w-100">
                      <Button 
                        variant="outline-primary"
                        className="therapist-btn w-100"
                      >
                        <FaCalendarAlt className="me-2" />
                        View Schedule
                      </Button>
                    </Link>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
}