import { createContext, useContext, useState, useEffect, useCallback } from 'react'

const AppContext = createContext()

export const useApp = () => useContext(AppContext)

export const AppProvider = ({ children }) => {
  const [doctors, setDoctors] = useState(() => {
    const saved = localStorage.getItem('doctors')
    return saved ? JSON.parse(saved) : []
  })

  const [appointments, setAppointments] = useState(() => {
    const saved = localStorage.getItem('appointments')
    return saved ? JSON.parse(saved) : []
  })

  // Keep state in sync across tabs/role switches
  useEffect(() => {
    const handleStorage = (event) => {
      if (event.key === 'doctors' && event.newValue) {
        try {
          setDoctors(JSON.parse(event.newValue))
        } catch {}
      }
      if (event.key === 'appointments' && event.newValue) {
        try {
          setAppointments(JSON.parse(event.newValue))
        } catch {}
      }
    }
    window.addEventListener('storage', handleStorage)
    return () => window.removeEventListener('storage', handleStorage)
  }, [])

  useEffect(() => {
    localStorage.setItem('doctors', JSON.stringify(doctors))
  }, [doctors])

  useEffect(() => {
    localStorage.setItem('appointments', JSON.stringify(appointments))
  }, [appointments])

  const refreshFromStorage = useCallback(() => {
    try {
      const savedDoctors = localStorage.getItem('doctors')
      const savedAppointments = localStorage.getItem('appointments')
      if (savedDoctors) setDoctors(JSON.parse(savedDoctors))
      if (savedAppointments) setAppointments(JSON.parse(savedAppointments))
    } catch {}
  }, [])

  // Also refresh when tab gains focus or visibility changes
  useEffect(() => {
    const onFocus = () => refreshFromStorage()
    const onVisibility = () => {
      if (document.visibilityState === 'visible') refreshFromStorage()
    }
    window.addEventListener('focus', onFocus)
    document.addEventListener('visibilitychange', onVisibility)
    return () => {
      window.removeEventListener('focus', onFocus)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [refreshFromStorage])

  const addDoctor = (doctor) => {
    const newDoctor = {
      ...doctor,
      id: Date.now().toString(),
      availableSlots: doctor.availableSlots || []
    }
    setDoctors([...doctors, newDoctor])
  }

  const updateDoctor = (id, updatedDoctor) => {
    setDoctors(doctors.map(doc => doc.id === id ? { ...doc, ...updatedDoctor } : doc))
  }

  const deleteDoctor = (id) => {
    setDoctors(doctors.filter(doc => doc.id !== id))
    setAppointments(appointments.filter(apt => apt.doctorId !== id))
  }

  const bookAppointment = (appointment) => {
    const newAppointment = {
      ...appointment,
      id: Date.now().toString(),
      status: 'confirmed',
      createdAt: new Date().toISOString()
    }
    const nextAppointments = [...appointments, newAppointment]
    setAppointments(nextAppointments)
    // Ensure persistence is immediate for quick role switches
    try {
      localStorage.setItem('appointments', JSON.stringify(nextAppointments))
    } catch {}
    console.log('Appointment booked:', newAppointment)
  }

  const updateAppointment = (id, updatedAppointment) => {
    setAppointments(appointments.map(apt => 
      apt.id === id ? { ...apt, ...updatedAppointment } : apt
    ))
  }

  const deleteAppointment = (id) => {
    setAppointments(appointments.filter(apt => apt.id !== id))
  }

  const getAvailableSlots = (doctorId, date) => {
    const doctor = doctors.find(d => d.id === doctorId)
    if (!doctor) return []

    const bookedSlots = appointments
      .filter(apt => apt.doctorId === doctorId && apt.date === date && apt.status !== 'cancelled')
      .map(apt => apt.time)

    return doctor.availableSlots.filter(slot => !bookedSlots.includes(slot))
  }

  return (
    <AppContext.Provider value={{
      doctors,
      appointments,
      addDoctor,
      updateDoctor,
      deleteDoctor,
      bookAppointment,
      updateAppointment,
      deleteAppointment,
      getAvailableSlots,
      refreshFromStorage
    }}>
      {children}
    </AppContext.Provider>
  )
}