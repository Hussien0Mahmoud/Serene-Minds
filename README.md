# Serene Minds - Mental Health & Therapy Platform

A comprehensive web application connecting patients with mental health professionals for consultations, resources, and wellness support.

## 🌟 Project Overview

Serene Minds is a full-stack mental health platform designed to:
- Connect users with licensed therapists and mental health professionals
- Provide appointment booking and scheduling services
- Offer mental health resources, books, and educational content
- Organize wellness events and workshops
- Maintain user profiles and appointment history
- Enable admin management of therapists, users, and resources

## 🎯 Key Features

### For Patients/Users
- **User Authentication**: Secure registration and login with JWT tokens
- **Therapist Directory**: Browse and explore available therapists with detailed profiles
- **Appointment Booking**: Schedule, manage, and confirm appointments
- **Resources Library**: Access mental health books, articles, and educational materials
- **Events & Workshops**: Discover upcoming wellness events and workshops
- **User Dashboard**: View appointments, profile, and health journey
- **Real-time Notifications**: Get appointment reminders and updates
- **Search Functionality**: Find therapists by specialty and availability

### For Therapists
- **Therapist Dashboard**: Manage appointments and schedule
- **Availability Management**: Set working hours and availability
- **Profile Management**: Showcase expertise and qualifications
- **Client Management**: View and manage patient information

### For Administrators
- **Admin Dashboard**: Full platform management
- **User Management**: Manage all users, therapists, and accounts
- **Appointment Management**: Oversee all bookings and schedules
- **Resource Management**: Add, edit, and organize resources
- **Event Management**: Create and manage workshops and events
- **Analytics**: View platform statistics and usage metrics

## 💻 Tech Stack

### Frontend
- **React 19**: Modern UI library with hooks
- **Vite**: Fast build tool and development server
- **Redux Toolkit**: State management
- **React Router v7**: Client-side routing
- **Bootstrap 5**: Responsive UI framework
- **Axios**: HTTP client for API calls
- **Framer Motion**: Animation library
- **React Calendar**: Calendar component for scheduling
- **React Toastify**: Toast notifications
- **SweetAlert2**: Beautiful alerts and modals

### Backend
- **Django 5.0**: Python web framework
- **Django REST Framework**: RESTful API development
- **JWT Authentication**: Token-based security
- **Django CORS Headers**: Cross-origin requests
- **Djoser**: User authentication endpoints
- **SQLite**: Database

## 📁 Project Structure

```
Serene-Minds/
├── frontend/                 # React + Vite application
│   ├── src/
│   │   ├── api/             # API integration files
│   │   ├── components/      # Reusable React components
│   │   ├── pages/           # Page components
│   │   ├── store/           # Redux store and slices
│   │   ├── styles/          # Global and component styles
│   │   ├── utils/           # Utility functions
│   │   └── context/         # Context API
│   └── package.json
│
└── back/                     # Django REST API
    ├── api/                 # Django app with models, views, serializers
    ├── health/              # Django project settings
    ├── manage.py
    └── requirements.txt
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- Python (v3.8 or higher)
- pip (Python package manager)
- Git

### Backend Setup

1. **Navigate to backend directory**
```bash
cd back
```

2. **Create and activate virtual environment**
```bash
# Windows
python -m venv env
env\Scripts\activate

# macOS/Linux
python3 -m venv env
source env/bin/activate
```

3. **Install dependencies**
```bash
pip install -r requirements.txt
```

4. **Run migrations**
```bash
python manage.py makemigrations
python manage.py migrate
```

5. **Create superuser (admin)**
```bash
python manage.py createsuperuser
# Follow prompts to create admin account
```

6. **Start development server**
```bash
python manage.py runserver
```

The backend API will be available at `http://localhost:8000`

### Frontend Setup

1. **Navigate to frontend directory**
```bash
cd frontend
```

2. **Install dependencies**
```bash
npm install
```

4. **Start development server**
```bash
npm run dev
```

The frontend will be available at `http://localhost:5173`


## 🔐 Authentication

The application uses JWT (JSON Web Tokens) for authentication:
- Users can register and login through the frontend
- JWT tokens are stored in browser localStorage
- Protected routes require valid tokens
- Tokens include user role information (user, therapist, admin)

## 📊 API Endpoints

Key API endpoints (Full API documentation available):

### Users
- `POST /api/auth/register/` - User registration
- `POST /api/auth/login/` - User login
- `GET /api/users/` - Get user profile
- `PUT /api/users/{id}/` - Update user profile

### Therapists
- `GET /api/therapists/` - List all therapists
- `GET /api/therapists/{id}/` - Get therapist details
- `POST /api/therapists/` - Create therapist profile (Admin)

### Appointments
- `GET /api/appointments/` - Get user appointments
- `POST /api/appointments/` - Book appointment
- `PUT /api/appointments/{id}/` - Update appointment
- `DELETE /api/appointments/{id}/` - Cancel appointment

### Resources
- `GET /api/resources/` - List resources
- `POST /api/resources/` - Create resource (Admin)

### Events
- `GET /api/events/` - List events
- `POST /api/events/` - Create event (Admin)


### Environment Variables
Consider creating `.env` files for:
- Database credentials
- API keys
- Secret keys
- API endpoints

## 📝 Database Models

Main models include:
- **CustomUser**: User profiles with roles
- **Therapist**: Therapist information
- **Appointment**: Booking records
- **Resource**: Books and materials
- **Event**: Workshops and events

