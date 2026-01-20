import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import AppointmentHero from '../components/Appointment/AppointmentHero';
import TherapistList from '../components/Appointment/TherapistList';
import '../styles/appointment.css';

export default function Appointment() {
  const { isAuthenticated } = useSelector(state => state.user);

  return (
    <div className="appointment-container">
      <AppointmentHero />
      <div className="appointment-card-container">
        <TherapistList />
      </div>
      {!isAuthenticated && (
        <div className="appointment-signin-section text-center">
          <p className="appointment-signin-text">
            To book an appointment, please sign in first
          </p>
          <Link 
            to="/login" 
            className="appointment-signin-button"
          >
            Sign In
          </Link>
        </div>
      )}
    </div>
  );
}