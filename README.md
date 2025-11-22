# Doctor Appointment System

A modern, responsive doctor appointment booking system built with React.js, Tailwind CSS, and GSAP animations.

## Features

### Admin Panel
- **Doctors Management**: Add, view, and delete doctors
- **Appointments Management**: View and manage all appointments
- **Status Control**: Update appointment status (pending, confirmed, completed, cancelled)
- **Doctor Categories**: Support for multiple specializations (Orthopedic, Gynecologist, ENT, Cardiologist, Dermatologist, Neurologist, etc.)

### User Panel
- **Category Selection**: Browse doctors by specialization
- **Doctor Search**: Search doctors by name or specialization
- **Appointment Booking**: Book appointments with available time slots
- **Availability Display**: Real-time availability checking
- **Responsive Design**: Works seamlessly on all devices

## Technologies Used

- **React.js** - UI library
- **Vite** - Build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **GSAP** - Animation library for smooth animations
- **React Router** - Client-side routing
- **Lucide React** - Icon library

## Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:5173`

## Usage

### Login
- Select your role (Admin or User)
- Enter any email and password (demo mode)
- Click "Sign In"

### Admin Panel
1. **Add Doctors**: Navigate to "Add Doctor" and fill in the doctor details
2. **Manage Doctors**: View all doctors in "Doctors List"
3. **Manage Appointments**: View and update appointments in "Appointments"

### User Panel
1. **Browse Categories**: Select a doctor category
2. **Search Doctors**: Use the search bar to find specific doctors
3. **Book Appointment**: Click "Book Appointment" on any doctor card
4. **Select Date & Time**: Choose an available date and time slot
5. **Confirm Booking**: Fill in patient details and confirm

## Project Structure

```
DoctorAppointment/
├── src/
│   ├── components/
│   │   ├── Admin/
│   │   │   ├── AdminPanel.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   ├── DoctorsList.jsx
│   │   │   ├── AddDoctor.jsx
│   │   │   └── AppointmentsList.jsx
│   │   ├── User/
│   │   │   ├── UserPanel.jsx
│   │   │   ├── UserHeader.jsx
│   │   │   ├── DoctorCategories.jsx
│   │   │   ├── DoctorList.jsx
│   │   │   └── BookingModal.jsx
│   │   └── Auth/
│   │       └── Login.jsx
│   ├── context/
│   │   └── AppContext.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── package.json
├── vite.config.js
└── tailwind.config.js
```

## Features Details

### Doctor Categories
- Orthopedic
- Gynecologist
- ENT (Ear, Nose, Throat)
- Cardiologist
- Dermatologist
- Neurologist
- Pediatrician
- General Physician

### Appointment System
- Real-time availability checking
- Prevents double booking
- Date range validation (today to 30 days ahead)
- Status management (pending, confirmed, completed, cancelled)

### Data Persistence
- Uses localStorage for data persistence
- Data persists across browser sessions
- Separate storage for doctors and appointments

## Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## License

This project is open source and available for personal use.

