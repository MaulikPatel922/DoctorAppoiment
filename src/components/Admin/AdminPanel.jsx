import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { gsap } from 'gsap'
import { useEffect } from 'react'
import Sidebar from './Sidebar'
import DoctorsList from './DoctorsList'
import AppointmentsList from './AppointmentsList'
import AddDoctor from './AddDoctor'
import { useApp } from '../../context/AppContext'

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState('doctors')
  const navigate = useNavigate()
  const { refreshFromStorage } = useApp()

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('currentUser'))
    if (!user || user.role !== 'admin') {
      navigate('/')
    }

    // Ensure latest data after switching roles/tabs
    refreshFromStorage()

    gsap.from('.admin-content', {
      opacity: 1,
      x: 30,
      duration: 0.8,
      ease: 'power3.out'
    })
  }, [navigate, refreshFromStorage])

  return (
    <div className="min-h-screen bg-gray-50 ">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="ml-64 p-8 admin-content">
        {activeTab === 'doctors' && <DoctorsList />}
        {activeTab === 'add-doctor' && <AddDoctor />}
        {activeTab === 'appointments' && <AppointmentsList />}
      </div>
    </div>
  )
}

export default AdminPanel

