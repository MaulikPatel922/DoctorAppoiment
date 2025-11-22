import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { gsap } from 'gsap'
import { User, Lock, Stethoscope } from 'lucide-react'

const Login = ({ setUser }) => {
  const [formData, setFormData] = useState({ email: '', password: '', role: 'user' })
  const navigate = useNavigate()

  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        const container = document.querySelector('.login-container')
        const card = document.querySelector('.login-card')
        
        if (container && card) {
          gsap.from(container, {
            opacity: 0,
            y: 50,
            duration: 1,
            ease: 'power3.out'
          })
          gsap.from(card, {
            scale: 0.9,
            opacity: 0,
            duration: 0.8,
            delay: 0.2,
            ease: 'back.out(1.7)'
          })
        }
      } catch (error) {
        console.error('GSAP animation error:', error)
      }
    }, 100)
    
    return () => clearTimeout(timer)
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Simple authentication - in production, use proper auth
    if (formData.email && formData.password) {
      const userData = {
        email: formData.email,
        role: formData.role,
        name: formData.role === 'admin' ? 'Admin' : 'User'
      }
      localStorage.setItem('currentUser', JSON.stringify(userData))
      setUser(userData)
      navigate(formData.role === 'admin' ? '/admin' : '/user')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 flex items-center justify-center p-4 login-container" style={{ opacity: 1 }}>
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md login-card" style={{ opacity: 1 }}>
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full mb-4">
            <Stethoscope className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Doctor Appointment</h1>
          <p className="text-gray-600">Sign in to your account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
            <select
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                placeholder="Enter your email"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                placeholder="Enter your password"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-cyan-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            Sign In
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Demo: Just enter any email and password to continue
        </p>
      </div>
    </div>
  )
}

export default Login

