import { useChatStore } from '../store/chatStore'
import { motion } from 'framer-motion'

const roles: Array<{ label: string; value: 'Aspirante' | 'Estudiante' | 'Graduado' | 'otro' }> = [
  { label: 'Aspirante', value: 'Aspirante' },
  { label: 'Estudiante', value: 'Estudiante' },
  { label: 'Graduado', value: 'Graduado' },
  { label: 'Otro', value: 'otro' },
]

export const RoleSelector = () => {
  const setUserRole = useChatStore((state) => state.setUserRole)

  const handleSelect = (role: typeof roles[number]['value']) => {
    setUserRole(role)
    console.log('Rol seleccionado:', role)
  }

  return (
    <div className="flex flex-col items-center gap-6 p-16">
      <h2 className="text-lg font-semibold text-center text-gray-800">Selecciona Tu Rol</h2>
      <div className="flex flex-col gap-3 w-full">
        {roles.map(({ label, value }) => (
          <motion.button
            key={value}
            onClick={() => handleSelect(value)}
            whileHover={{
              scale: 1.07,
              backgroundColor: '#7f1d1d', // rojo más oscuro (Tailwind: red-900)
              boxShadow: '0px 8px 20px rgba(0, 0, 0, 0.2)',
            }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className="bg-red-600 text-white py-2 px-4 rounded-lg w-full"
          >
            {label}
          </motion.button>

        ))}
      </div>
    </div>
  )
}

export default RoleSelector