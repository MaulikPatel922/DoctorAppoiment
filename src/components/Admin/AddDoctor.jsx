import { useState, useEffect } from 'react'
import { gsap } from 'gsap'
import { useApp } from '../../context/AppContext'
import { useNavigate } from 'react-router-dom'
import { CheckCircle } from 'lucide-react'

const AddDoctor = () => {
  const { addDoctor } = useApp()
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    specialization: 'Orthopedic',
    qualification: '',
    experience: '',
    availableSlots: []
  })
  const [currentSlot, setCurrentSlot] = useState('')
  const [success, setSuccess] = useState(false)

  const specializations = [
    'Orthopedic',
    'Gynecologist',
    'ENT',
    'Cardiologist',
    'Dermatologist',
    'Neurologist',
    'Pediatrician',
    'General Physician'
  ]

  const timeSlots = [
    '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
    '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM',
    '05:00 PM', '06:00 PM'
  ]

  useEffect(() => {
    try {
      const form = document.querySelector('.form-container')
      if (form) {
        gsap.from(form, {
          opacity: 1,
          y: 30,
          duration: 0.8,
          ease: 'power3.out'
        })
      }
    } catch (error) {
      console.error('GSAP animation error (AddDoctor):', error)
    }
  }, [])

  const handleAddSlot = () => {
    if (currentSlot && !formData.availableSlots.includes(currentSlot)) {
      setFormData({
        ...formData,
        availableSlots: [...formData.availableSlots, currentSlot]
      })
      setCurrentSlot('')
    }
  }

  const handleRemoveSlot = (slot) => {
    setFormData({
      ...formData,
      availableSlots: formData.availableSlots.filter(s => s !== slot)
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    addDoctor(formData)
    setSuccess(true)
    setTimeout(() => {
      setSuccess(false)
      setFormData({
        name: '',
        email: '',
        phone: '',
        specialization: 'Orthopedic',
        qualification: '',
        experience: '',
        availableSlots: []
      })
    }, 2000)
  }

  return (
    <div className="max-w-3xl mx-auto form-container opacity-0 ">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Add New Doctor</h1>
        <p className="text-gray-600">Add a new doctor to the system</p>
      </div>

      {success && (
        <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4 flex items-center space-x-2">
          <CheckCircle className="w-5 h-5 text-green-600" />
          <p className="text-green-800 font-medium">Doctor added successfully!</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-md p-8 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Doctor Name *</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Phone *</label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Specialization *</label>
            <select
              value={formData.specialization}
              onChange={(e) => setFormData({ ...formData, specialization: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              required
            >
              {specializations.map((spec) => (
                <option key={spec} value={spec}>{spec}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Qualification *</label>
            <input
              type="text"
              value={formData.qualification}
              onChange={(e) => setFormData({ ...formData, qualification: e.target.value })}
              placeholder="e.g., MBBS, MD, MS"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Experience (Years) *</label>
            <input
              type="number"
              value={formData.experience}
              onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              required
              min="0"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Available Time Slots</label>
          <div className="flex space-x-2 mb-3">
            <select
              value={currentSlot}
              onChange={(e) => setCurrentSlot(e.target.value)}
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            >
              <option value="">Select a time slot</option>
              {timeSlots.map((slot) => (
                <option key={slot} value={slot}>{slot}</option>
              ))}
            </select>
            <button
              type="button"
              onClick={handleAddSlot}
              className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Add Slot
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {formData.availableSlots.map((slot) => (
              <span
                key={slot}
                className="inline-flex items-center space-x-2 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
              >
                <span>{slot}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveSlot(slot)}
                  className="text-blue-600 hover:text-blue-800 font-bold"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-cyan-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
        >
          Add Doctor
        </button>
      </form>
    </div>
  )
}

export default AddDoctor

