import { useNavigate } from 'react-router-dom'
import { Users, Calendar, Plus, LogOut, Stethoscope } from 'lucide-react'

const Sidebar = ({ activeTab, setActiveTab }) => {
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('currentUser')
    navigate('/')
  }

  const menuItems = [
    { id: 'doctors', label: 'Doctors List', icon: Users },
    { id: 'add-doctor', label: 'Add Doctor', icon: Plus },
    { id: 'appointments', label: 'Appointments', icon: Calendar },
  ]

  return (
    <div className="fixed left-0 top-0 h-full w-64 bg-gradient-to-b from-blue-600 to-blue-800 shadow-xl">
      <div className="p-6 border-b border-blue-500">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
            <Stethoscope className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h1 className="text-white font-bold text-lg">Admin Panel</h1>
            <p className="text-blue-200 text-xs">Doctor Management</p>
          </div>
        </div>
      </div>

      <nav className="p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                activeTab === item.id
                  ? 'bg-white text-blue-600 shadow-md'
                  : 'text-blue-100 hover:bg-blue-500 hover:text-white'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </button>
          )
        })}
      </nav>

      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-blue-500">
        <button
          onClick={handleLogout}
          className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-blue-100 hover:bg-blue-500 hover:text-white transition-all duration-200"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </div>
  )
}

export default Sidebar

