import { useState, useEffect } from 'react'
import { gsap } from 'gsap'
import { useApp } from '../../context/AppContext'
import { Calendar, Clock, User, Phone, Mail, X } from 'lucide-react'

const AppointmentsList = () => {
  const { appointments, doctors, updateAppointment, deleteAppointment } = useApp()
  const [filterStatus, setFilterStatus] = useState('all')

  useEffect(() => {
    try {
      const cards = document.querySelectorAll('.appointment-card')
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
      console.error('GSAP animation error (AppointmentsList):', error)
    }
  }, [appointments])

  const filteredAppointments = appointments.filter(apt => {
    if (filterStatus === 'all') return true
    return apt.status === filterStatus
  })

  const getDoctorName = (doctorId) => {
    const doctor = doctors.find(d => d.id === doctorId)
    return doctor ? doctor.name : 'Unknown Doctor'
  }

  const getStatusColor = (status) => {
    const colors = {
      'confirmed': 'bg-green-100 text-green-800',
      'pending': 'bg-yellow-100 text-yellow-800',
      'cancelled': 'bg-red-100 text-red-800',
      'completed': 'bg-blue-100 text-blue-800'
    }
    return colors[status] || 'bg-gray-100 text-gray-800'
  }

  const handleStatusChange = (id, newStatus) => {
    updateAppointment(id, { status: newStatus })
  }

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this appointment?')) {
      deleteAppointment(id)
    }
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Appointments Management</h1>
        <p className="text-gray-600">View and manage all appointments</p>
      </div>

      <div className="mb-6 flex space-x-4">
        {['all', 'confirmed', 'pending', 'cancelled', 'completed'].map((status) => (
          <button
            key={status}
            onClick={() => setFilterStatus(status)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filterStatus === status
                ? 'bg-blue-500 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </button>
        ))}
      </div>

      {filteredAppointments.length === 0 ? (
        <div className="bg-white rounded-xl shadow-md p-12 text-center">
          <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 text-lg">No appointments found</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredAppointments.map((appointment) => (
            <div
              key={appointment.id}
              className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-shadow duration-300 appointment-card"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                      <Calendar className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-gray-800">{getDoctorName(appointment.doctorId)}</h3>
                      <p className="text-sm text-gray-500">{appointment.specialization}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="flex items-center space-x-2 text-gray-600">
                      <Calendar className="w-5 h-5" />
                      <span>{appointment.date}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-600">
                      <Clock className="w-5 h-5" />
                      <span>{appointment.time}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-600">
                      <User className="w-5 h-5" />
                      <span>{appointment.patientName}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-600">
                      <Phone className="w-5 h-5" />
                      <span>{appointment.patientPhone}</span>
                    </div>
                    {appointment.patientEmail && (
                      <div className="flex items-center space-x-2 text-gray-600">
                        <Mail className="w-5 h-5" />
                        <span>{appointment.patientEmail}</span>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center space-x-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(appointment.status)}`}>
                      {appointment.status}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col space-y-2 ml-4">
                  <select
                    value={appointment.status}
                    onChange={(e) => handleStatusChange(appointment.id, e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  >
                    <option value="pending">Pending</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                  <button
                    onClick={() => handleDelete(appointment.id)}
                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm flex items-center justify-center space-x-2"
                  >
                    <X className="w-4 h-4" />
                    <span>Delete</span>
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

export default AppointmentsList

