import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button, Spinner, Alert } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { loginSuccess } from '../store/userSlice';
import { FaUser, FaEnvelope, FaPhone, FaCamera, FaArrowLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import axios from 'axios';

const BASE_URL = 'http://localhost:8000';

export default function Profile() {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    profileImage: ''
  });

  // Fetch user profile data from database
  const fetchUserProfile = async () => {
    if (!currentUser?.id) return;
    
    try {
      const token = localStorage.getItem('access_token');
      if (!token) {
        console.warn('No access token found');
        return;
      }

      const response = await axios.get(
        `${BASE_URL}/api/users/${currentUser.id}/`,
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );
      
      const userData = response.data;
      const freshData = {
        name: userData.name || '',
        email: userData.email || '',
        phone: userData.phone || '',
        profileImage: userData.profile_image || userData.profileImage || ''
      };
      
      setFormData(freshData);
      
      // Also update Redux store if data has changed
      if (userData.name !== currentUser.name || 
          userData.email !== currentUser.email ||
          userData.phone !== currentUser.phone) {
        const updatedUser = {
          ...currentUser,
          name: userData.name,
          email: userData.email,
          phone: userData.phone,
          profile_image: userData.profile_image,
          profileImage: userData.profile_image,
          username: userData.username
        };
        dispatch(loginSuccess(updatedUser));
      }
    } catch (err) {
      console.error('Error fetching user profile:', err);
      // Silently fail - use currentUser data from Redux
      setFormData({
        name: currentUser?.name || '',
        email: currentUser?.email || '',
        phone: currentUser?.phone || '',
        profileImage: currentUser?.profile_image || currentUser?.profileImage || ''
      });
    }
  };

  // Update form data when currentUser changes (after login or update from other components)
  useEffect(() => {
    if (currentUser) {
      // First set from currentUser (from Redux)
      setFormData({
        name: currentUser.name || '',
        email: currentUser.email || '',
        phone: currentUser.phone || '',
        profileImage: currentUser.profile_image || currentUser.profileImage || ''
      });
      
      // Then fetch fresh data from database to ensure we have the latest
      fetchUserProfile();
    }
  }, [currentUser?.id]); // Only re-fetch when user ID changes

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({
          ...formData,
          profileImage: reader.result
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    
    try {
      setLoading(true);
      const token = localStorage.getItem('access_token');
      
      // Prepare data for API - ensure all fields match what backend expects
      const updateData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        profile_image: formData.profileImage,
        username: currentUser.username // Keep username from currentUser
      };

      // Send PATCH request to update user
      const response = await axios.patch(
        `${BASE_URL}/api/users/${currentUser.id}/`,
        updateData,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      // Update Redux store with response data - preserve all important fields
      const updatedUser = {
        ...currentUser,
        id: response.data.id,
        username: response.data.username,
        name: response.data.name,
        email: response.data.email,
        phone: response.data.phone,
        profile_image: response.data.profile_image,
        profileImage: response.data.profile_image,
        role: response.data.role,
        date_joined: response.data.date_joined
      };
      
      dispatch(loginSuccess(updatedUser));
      
      // Update form data with the response to ensure UI is in sync
      setFormData({
        name: response.data.name || '',
        email: response.data.email || '',
        phone: response.data.phone || '',
        profileImage: response.data.profile_image || ''
      });
      
      setSuccess('Profile updated successfully!');
      setIsEditing(false);
      
      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      console.error('Error updating profile:', err);
      setError(err.response?.data?.detail || 'Failed to update profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ 
      background: 'linear-gradient(135deg, #f0f7ff 0%, #e6f0f9 100%)',
      minHeight: '100vh',
      paddingTop: '50px',
      paddingBottom: '50px'
    }}>
      <Container>
        {!currentUser ? (
          <Row className="justify-content-center">
            <Col md={8}>
              <Card className="border-0 shadow-sm">
                <Card.Body className="p-5 text-center">
                  <h3>Please login to view your profile</h3>
                  <Link to="/login" className="btn btn-primary mt-3">
                    Go to Login
                  </Link>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        ) : (
          <>
            {error && (
              <Row className="justify-content-center mb-3">
                <Col md={8}>
                  <Alert variant="danger" dismissible onClose={() => setError('')}>
                    {error}
                  </Alert>
                </Col>
              </Row>
            )}
            
            {success && (
              <Row className="justify-content-center mb-3">
                <Col md={8}>
                  <Alert variant="success" dismissible onClose={() => setSuccess('')}>
                    {success}
                  </Alert>
                </Col>
              </Row>
            )}

            <Row className="justify-content-center">
              <Col md={8}>
                <Card className="border-0 shadow-sm">
                  {loading && (
                    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '400px' }}>
                      <Spinner animation="border" role="status" style={{ color: '#660ff1' }}>
                        <span className="visually-hidden">Loading...</span>
                      </Spinner>
                    </div>
                  )}
                  
                  {!loading && (
                    <>
                      <Card.Body className="p-5">
                        <div className="text-center mb-4">
                          <div className="position-relative d-inline-block">
                            <img
                              src={formData.profileImage || `https://ui-avatars.com/api/?name=${formData.name || 'User'}&background=660ff1&color=fff`}
                              alt={formData.name || 'Profile'}
                              className="rounded-circle mb-3"
                              style={{ width: '150px', height: '150px', objectFit: 'cover' }}
                            />
                            {isEditing && (
                              <div className="position-absolute bottom-0 end-0">
                                <label htmlFor="imageInput" className="btn btn-sm btn-light rounded-circle shadow-sm">
                                  <FaCamera />
                                  <input
                                    type="file"
                                    id="imageInput"
                                    className="d-none"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                  />
                                </label>
                              </div>
                            )}
                          </div>
                          <h3 className="mb-1">{formData.name || 'User'}</h3>
                          <p className="text-muted">{currentUser?.role || 'user'}</p>
                        </div>

                        <Form onSubmit={handleSubmit}>
                          <Form.Group className="mb-3">
                            <Form.Label>Full Name</Form.Label>
                            <div className="input-group">
                              <span className="input-group-text bg-light border-0">
                                <FaUser className="text-primary" style={{ color: '#660ff1' }} />
                              </span>
                              <Form.Control
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                disabled={!isEditing}
                                style={{ backgroundColor: '#f8f9fa', border: 'none', padding: '12px 20px' }}
                              />
                            </div>
                          </Form.Group>

                          <Form.Group className="mb-3">
                            <Form.Label>Email</Form.Label>
                            <div className="input-group">
                              <span className="input-group-text bg-light border-0">
                                <FaEnvelope className="text-primary" style={{ color: '#660ff1' }} />
                              </span>
                              <Form.Control
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                disabled={!isEditing}
                                style={{ backgroundColor: '#f8f9fa', border: 'none', padding: '12px 20px' }}
                              />
                            </div>
                          </Form.Group>

                          <Form.Group className="mb-4">
                            <Form.Label>Phone</Form.Label>
                            <div className="input-group">
                              <span className="input-group-text bg-light border-0">
                                <FaPhone className="text-primary" style={{ color: '#660ff1' }} />
                              </span>
                              <Form.Control
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                disabled={!isEditing}
                                style={{ backgroundColor: '#f8f9fa', border: 'none', padding: '12px 20px' }}
                              />
                            </div>
                          </Form.Group>

                          <div className="d-flex justify-content-end gap-2">
                            {isEditing ? (
                              <>
                                <Button 
                                  variant="outline-secondary" 
                                  onClick={() => setIsEditing(false)}
                                  disabled={loading}
                                >
                                  Cancel
                                </Button>
                                <Button 
                                  type="submit"
                                  style={{ backgroundColor: '#660ff1', border: 'none' }}
                                  disabled={loading}
                                >
                                  {loading ? 'Saving...' : 'Save Changes'}
                                </Button>
                              </>
                            ) : (
                              <Button 
                                onClick={() => setIsEditing(true)}
                                style={{ backgroundColor: '#660ff1', border: 'none' }}
                              >
                                Edit Profile
                              </Button>
                            )}
                          </div>
                        </Form>
                      </Card.Body>
                      <div className="mb-4">
                        <Link 
                          to="/" 
                          className="btn btn-link text-decoration-none"
                          style={{ color: '#660ff1' }}
                        >
                          <FaArrowLeft className="ms-2" />
                          Back to Home
                        </Link>
                      </div>
                    </>
                  )}
                </Card>
              </Col>
            </Row>
          </>
        )}
      </Container>
    </div>
  );
}