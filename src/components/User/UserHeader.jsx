import { useNavigate } from 'react-router-dom'
import { LogOut, Calendar, User } from 'lucide-react'

const UserHeader = () => {
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem('currentUser'))

  const handleLogout = () => {
    localStorage.removeItem('currentUser')
    navigate('/')
  }

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
              <Calendar className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-800">Doctor Appointment</h1>
              <p className="text-sm text-gray-600">Book your appointment easily</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-gray-700">
              <User className="w-5 h-5" />
              <span className="font-medium">{user?.name || 'User'}</span>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default UserHeader

