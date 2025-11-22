import { useState, useEffect } from 'react'
import { gsap } from 'gsap'
import { useApp } from '../../context/AppContext'
import { User, Calendar, Clock, Phone, Mail, Award } from 'lucide-react'

const DoctorList = ({ selectedCategory, onBookAppointment }) => {
  const { doctors } = useApp()
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    try {
      const items = document.querySelectorAll('.doctor-item')
      if (items && items.length > 0) {
        gsap.from(items, {
          opacity: 1,
          x: -30,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power3.out'
        })
      }
    } catch (error) {
      console.error('GSAP animation error (DoctorList):', error)
    }
  }, [doctors, selectedCategory])

  const filteredDoctors = doctors.filter(doctor => {
    const matchesCategory = selectedCategory === 'All' || doctor.specialization === selectedCategory
    const matchesSearch = doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doctor.specialization.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const getCategoryColor = (category) => {
    const colors = {
      'Orthopedic': 'bg-purple-100 text-purple-800',
      'Gynecologist': 'bg-pink-100 text-pink-800',
      'ENT': 'bg-blue-100 text-blue-800',
      'Cardiologist': 'bg-red-100 text-red-800',
      'Dermatologist': 'bg-yellow-100 text-yellow-800',
      'Neurologist': 'bg-indigo-100 text-indigo-800',
    }
    return colors[category] || 'bg-gray-100 text-gray-800'
  }

  return (
    <div>
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search doctors..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full max-w-md px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
        />
      </div>

      {filteredDoctors.length === 0 ? (
        <div className="bg-white rounded-xl shadow-md p-12 text-center">
          <User className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 text-lg">
            {searchTerm ? 'No doctors found matching your search' : 'No doctors available in this category'}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredDoctors.map((doctor) => (
            <div
              key={doctor.id}
              className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-all duration-300 doctor-item"
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                <div className="flex items-start space-x-4 flex-1">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <User className="w-10 h-10 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-2xl font-bold text-gray-800">{doctor.name}</h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getCategoryColor(doctor.specialization)}`}>
                        {doctor.specialization}
                      </span>
                    </div>
                    <div className="space-y-2 text-gray-600">
                      <div className="flex items-center space-x-2">
                        <Award className="w-4 h-4" />
                        <span className="text-sm">{doctor.qualification}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4" />
                        <span className="text-sm">{doctor.experience} years of experience</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Phone className="w-4 h-4" />
                        <span className="text-sm">{doctor.phone}</span>
                      </div>
                      {doctor.email && (
                        <div className="flex items-center space-x-2">
                          <Mail className="w-4 h-4" />
                          <span className="text-sm">{doctor.email}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="md:w-80">
                  <div className="mb-4">
                    <div className="flex items-center space-x-2 mb-3">
                      <Clock className="w-5 h-5 text-blue-500" />
                      <span className="font-semibold text-gray-700">Available Slots:</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {doctor.availableSlots?.length > 0 ? (
                        doctor.availableSlots.map((slot, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-lg font-medium"
                          >
                            {slot}
                          </span>
                        ))
                      ) : (
                        <span className="text-sm text-gray-500">No slots available</span>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={() => onBookAppointment(doctor)}
                    className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-cyan-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
                  >
                    Book Appointment
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default DoctorList

