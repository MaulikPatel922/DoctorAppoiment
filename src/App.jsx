import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Login from './components/Auth/Login'
import AdminPanel from './components/Admin/AdminPanel'
import UserPanel from './components/User/UserPanel'
import { AppProvider } from './context/AppContext'

function App() {
  const [user, setUser] = useState(null)
  const [userLoaded, setUserLoaded] = useState(false)

  useEffect(() => {
    try {
      const savedUser = localStorage.getItem('currentUser')
      if (savedUser) {
        setUser(JSON.parse(savedUser))
      }
    } catch (error) {
      console.error('Error loading user:', error)
    } finally {
      setUserLoaded(true)
    }
  }, [])

  const Loading = (
    <div className="min-h-screen flex items-center justify-center text-gray-600">Loading...</div>
  )

  return (
    <AppProvider>
      <Router   basename="/DoctorAppoiment"
   future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <Routes>
          <Route path="/" element={<Login setUser={setUser} />} />
          <Route 
            path="/admin" 
            element={userLoaded ? (user?.role === 'admin' ? <AdminPanel /> : <Navigate to="/" />) : Loading} 
          />
          <Route 
            path="/user" 
            element={userLoaded ? (user?.role === 'user' ? <UserPanel /> : <Navigate to="/" />) : Loading} 
          />
        </Routes>
      </Router>
    </AppProvider>
  )
}

export default App

