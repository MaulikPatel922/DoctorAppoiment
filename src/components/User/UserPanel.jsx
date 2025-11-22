import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { gsap } from 'gsap'
import { useEffect } from 'react'
import UserHeader from './UserHeader'
import DoctorCategories from './DoctorCategories'
import DoctorList from './DoctorList'
import BookingModal from './BookingModal'

const UserPanel = () => {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedDoctor, setSelectedDoctor] = useState(null)
  const [showBookingModal, setShowBookingModal] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('currentUser'))
    if (!user || user.role !== 'user') {
      navigate('/')
    }

    gsap.from('.user-content', {
      opacity: 1,
      y: 30,
      duration: 0.8,
      ease: 'power3.out'
    })
  }, [navigate])

  const handleBookAppointment = (doctor) => {
    setSelectedDoctor(doctor)
    setShowBookingModal(true)
  }

  const handleCloseModal = () => {
    setShowBookingModal(false)
    setSelectedDoctor(null)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
      <UserHeader />
      <div className="container mx-auto px-4 py-8 user-content">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Book Your Appointment</h1>
          <p className="text-gray-600 text-lg">Choose from our expert doctors</p>
        </div>

        <DoctorCategories 
          selectedCategory={selectedCategory} 
          setSelectedCategory={setSelectedCategory} 
        />

        <DoctorList 
          selectedCategory={selectedCategory}
          onBookAppointment={handleBookAppointment}
        />

        {showBookingModal && selectedDoctor && (
          <BookingModal
            doctor={selectedDoctor}
            onClose={handleCloseModal}
          />
        )}
      </div>
    </div>
  )
}

export default UserPanel

