import { useEffect } from 'react'
import { gsap } from 'gsap'

const categories = [
  { name: 'All', icon: '🏥' },
  { name: 'Orthopedic', icon: '🦴' },
  { name: 'Gynecologist', icon: '👩' },
  { name: 'ENT', icon: '👂' },
  { name: 'Cardiologist', icon: '❤️' },
  { name: 'Dermatologist', icon: '🧴' },
  { name: 'Neurologist', icon: '🧠' },
  { name: 'Pediatrician', icon: '👶' },
  { name: 'General Physician', icon: '👨‍⚕️' }
]

const DoctorCategories = ({ selectedCategory, setSelectedCategory }) => {
  useEffect(() => {
    try {
      const cards = document.querySelectorAll('.category-card')
      if (cards && cards.length > 0) {
        gsap.from(cards, {
          opacity: 1,
          scale: 0.8,
          duration: 0.5,
          stagger: 0.05,
          ease: 'back.out(1.7)'
        })
      }
    } catch (error) {
      console.error('GSAP animation error (DoctorCategories):', error)
    }
  }, [])

  return (
    <div className="mb-12">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Select Category</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {categories.map((category) => (
          <button
            key={category.name}
            onClick={() => setSelectedCategory(category.name)}
            className={`category-card p-6 rounded-xl shadow-md transition-all duration-300  transform hover:scale-105 ${
              selectedCategory === category.name
                ? 'bg-gradient-to-br from-blue-500 to-cyan-500 text-white shadow-xl'
                : 'bg-white text-gray-800 hover:shadow-lg'
            }`}
          >
            <div className="text-4xl mb-2">{category.icon}</div>
            <div className="font-semibold text-sm">{category.name}</div>
          </button>
        ))}
      </div>
    </div>
  )
}

export default DoctorCategories

