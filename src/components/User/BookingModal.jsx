import { useState, useEffect } from 'react'
import { gsap } from 'gsap'
import { useApp } from '../../context/AppContext'
import { X, Calendar, Clock, User, Phone, Mail, CheckCircle } from 'lucide-react'

const BookingModal = ({ doctor, onClose }) => {
  const { bookAppointment, getAvailableSlots } = useApp()
  const [formData, setFormData] = useState({
    patientName: '',
    patientPhone: '',
    patientEmail: '',
    date: '',
    time: ''
  })
  const [availableSlots, setAvailableSlots] = useState([])
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    try {
      const overlay = document.querySelector('.modal-overlay')
      const content = document.querySelector('.modal-content')
      if (overlay) {
        gsap.from(overlay, {
          opacity: 1,
          duration: 0.3
        })
      }
      if (content) {
        gsap.from(content, {
          scale: 0.9,
          opacity: 1,
          duration: 0.4,
          ease: 'back.out(1.7)'
        })
      }
    } catch (error) {
      console.error('GSAP animation error (BookingModal):', error)
    }
  }, [])

  useEffect(() => {
    if (formData.date) {
      const slots = getAvailableSlots(doctor.id, formData.date)
      setAvailableSlots(slots)
      if (slots.length > 0) {
        // Auto-select first available slot if none selected or invalid
        if (!slots.includes(formData.time)) {
          setFormData({ ...formData, time: slots[0] })
        }
      } else {
        // No slots available for this date
        if (formData.time) {
          setFormData({ ...formData, time: '' })
        }
      }
    }
  }, [formData.date, doctor.id, getAvailableSlots])

  const handleDateChange = (e) => {
    const selectedDate = e.target.value
    const today = new Date().toISOString().split('T')[0]
    if (selectedDate >= today) {
      setFormData({ ...formData, date: selectedDate, time: '' })
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!formData.time) {
      alert('Please select an available time slot')
      return
    }

    const appointment = {
      doctorId: doctor.id,
      doctorName: doctor.name,
      specialization: doctor.specialization,
      ...formData
    }
    console.log('Submitting appointment:', appointment)
    bookAppointment(appointment)
    console.log('Appointment submitted to context')
    setSuccess(true)
    setTimeout(() => {
      setSuccess(false)
      onClose()
    }, 2000)
  }

  const getMinDate = () => {
    return new Date().toISOString().split('T')[0]
  }

  const getMaxDate = () => {
    const date = new Date()
    date.setDate(date.getDate() + 30)
    return date.toISOString().split('T')[0]
  }

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 modal-overlay"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-2xl">
          <h2 className="text-2xl font-bold text-gray-800">Book Appointment</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        <div className="p-6">
          {success ? (
            <div className="text-center py-12">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-12 h-12 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Appointment Booked!</h3>
              <p className="text-gray-600">Your appointment has been successfully booked.</p>
            </div>
          ) : (
            <>
              <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-6 mb-6">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                    <User className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">{doctor.name}</h3>
                    <p className="text-gray-600">{doctor.specialization}</p>
                    <p className="text-sm text-gray-500">{doctor.qualification}</p>
                  </div>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <User className="w-4 h-4 inline mr-2" />
                      Patient Name *
                    </label>
                    <input
                      type="text"
                      value={formData.patientName}
                      onChange={(e) => setFormData({ ...formData, patientName: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Phone className="w-4 h-4 inline mr-2" />
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      value={formData.patientPhone}
                      onChange={(e) => setFormData({ ...formData, patientPhone: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Mail className="w-4 h-4 inline mr-2" />
                      Email (Optional)
                    </label>
                    <input
                      type="email"
                      value={formData.patientEmail}
                      onChange={(e) => setFormData({ ...formData, patientEmail: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Calendar className="w-4 h-4 inline mr-2" />
                      Select Date *
                    </label>
                    <input
                      type="date"
                      value={formData.date}
                      onChange={handleDateChange}
                      min={getMinDate()}
                      max={getMaxDate()}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                      required
                    />
                  </div>
                </div>

                {formData.date && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Clock className="w-4 h-4 inline mr-2" />
                      Available Time Slots *
                    </label>
                    {availableSlots.length > 0 ? (
                      <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
                        {availableSlots.map((slot) => (
                          <button
                            key={slot}
                            type="button"
                            onClick={() => setFormData({ ...formData, time: slot })}
                            className={`px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                              formData.time === slot
                                ? 'bg-blue-500 text-white shadow-md transform scale-105'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                          >
                            {slot}
                          </button>
                        ))}
                      </div>
                    ) : (
                      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                        <p className="text-yellow-800 text-sm">
                          No available slots for this date. Please select another date.
                        </p>
                      </div>
                    )}
                  </div>
                )}

                <div className="flex space-x-4 pt-4">
                  <button
                    type="button"
                    onClick={onClose}
                    className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg hover:from-blue-600 hover:to-cyan-600 transition-all duration-300 transform hover:scale-105 shadow-lg font-medium"
                  >
                    Confirm Booking
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default BookingModal

