import { useState, useEffect } from 'react'
import { gsap } from 'gsap'
import { useApp } from '../../context/AppContext'
import { Edit, Trash2, User } from 'lucide-react'

const DoctorsList = () => {
  const { doctors, deleteDoctor } = useApp()
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    try {
      const cards = document.querySelectorAll('.doctor-card')
      if (cards && cards.length > 0) {
        gsap.from(cards, {
          opacity: 1,
          y: 20,
          duration: 0.5,
          stagger: 0.1,
          ease: 'power3.out'
        })
      }
    } catch (error) {
      console.error('GSAP animation error (DoctorsList):', error)
    }
  }, [doctors])

  const filteredDoctors = doctors.filter(doctor =>
    doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doctor.specialization.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this doctor?')) {
      deleteDoctor(id)
    }
  }

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
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Doctors Management</h1>
        <p className="text-gray-600">Manage all doctors in the system</p>
      </div>

      <div className="mb-6">
        <input
          type="text"
          placeholder="Search doctors by name or specialization..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full max-w-md px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
        />
      </div>

      {filteredDoctors.length === 0 ? (
        <div className="bg-white rounded-xl shadow-md p-12 text-center">
          <User className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 text-lg">
            {searchTerm ? 'No doctors found matching your search' : 'No doctors added yet'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDoctors.map((doctor) => (
            <div
              key={doctor.id}
              className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-shadow duration-300 doctor-card"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-gray-800">{doctor.name}</h3>
                    <p className="text-sm text-gray-500">{doctor.email}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-3 mb-4">
                <div>
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getCategoryColor(doctor.specialization)}`}>
                    {doctor.specialization}
                  </span>
                </div>
                <p className="text-gray-600 text-sm">{doctor.qualification}</p>
                <p className="text-gray-600 text-sm">Experience: {doctor.experience} years</p>
                <p className="text-gray-600 text-sm">Phone: {doctor.phone}</p>
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-1">Available Slots:</p>
                  <div className="flex flex-wrap gap-2">
                    {doctor.availableSlots?.length > 0 ? (
                      doctor.availableSlots.map((slot, idx) => (
                        <span key={idx} className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">
                          {slot}
                        </span>
                      ))
                    ) : (
                      <span className="text-xs text-gray-500">No slots available</span>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex space-x-2 pt-4 border-t border-gray-200">
                <button
                  onClick={() => handleDelete(doctor.id)}
                  className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                  <span>Delete</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default DoctorsList

