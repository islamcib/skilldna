'use client'

import { motion } from 'framer-motion'
import { X } from 'lucide-react'

interface SkillTooltipProps {
  type: 'skills' | 'education' | 'characteristics' | 'personalInfo' | 'workExperience' | 'achievements' | 'smartContracts'
  index: number
  position: { x: number; y: number }
  data: {
    skills: string[]
    education: string[]
    characteristics: string[]
    personalInfo: string[]
    workExperience: string[]
    achievements: string[]
    smartContracts: string[]
  }
}

export default function SkillTooltip({ type, index, position, data }: SkillTooltipProps) {
  const getTypeInfo = () => {
    // Специальные случаи для опциональных элементов
    if (index === -1) {
      switch (type) {
        case 'skills':
          return {
            title: 'Фосфатная группа',
            color: '#ff6b6b',
            icon: '🧪',
            description: 'Опция не добавлена - это структурный элемент ДНК'
          }
        case 'education':
          return {
            title: 'Сахарная группа',
            color: '#4ecdc4',
            icon: '🍬',
            description: 'Опция не добавлена - это структурный элемент ДНК'
          }
        case 'characteristics':
          return {
            title: 'Водородная связь',
            color: '#fbbf24',
            icon: '🔗',
            description: 'Опция не добавлена - это структурный элемент ДНК'
          }
      }
    }

    // Обычные случаи для пользовательских данных
    switch (type) {
      case 'skills':
        return {
          title: 'Навык',
          color: '#3b82f6',
          icon: '💼',
          description: 'Ваш профессиональный навык'
        }
      case 'education':
        return {
          title: 'Обучение',
          color: '#10b981',
          icon: '🎓',
          description: 'Ваше образование или курс'
        }
      case 'characteristics':
        return {
          title: 'Характеристика',
          color: '#8b5cf6',
          icon: '⭐',
          description: 'Ваша личная характеристика'
        }
      case 'personalInfo':
        return {
          title: 'Личная информация',
          color: '#ef4444',
          icon: '👤',
          description: 'Ваша личная информация'
        }
      case 'workExperience':
        return {
          title: 'Опыт работы',
          color: '#14b8a6',
          icon: '💼',
          description: 'Ваш опыт работы'
        }
      case 'achievements':
        return {
          title: 'Достижение',
          color: '#eab308',
          icon: '🏆',
          description: 'Ваше достижение'
        }
      case 'smartContracts':
        return {
          title: 'Смарт-контракт',
          color: '#f97316',
          icon: '📜',
          description: 'Ваш смарт-контракт'
        }
    }
  }

  const typeInfo = getTypeInfo()
  
  // Для опциональных элементов (index === -1) всегда показываем подсказку
  if (index === -1) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.8, y: 10 }}
        transition={{ duration: 0.2 }}
        className="fixed z-50 pointer-events-none"
        style={{
          left: Math.min(Math.max(position.x - 100, 10), window.innerWidth - 220),
          top: Math.max(position.y - 120, 10),
        } as React.CSSProperties}
      >
        <div className="glass-dark rounded-lg p-4 max-w-xs border border-slate-600">
          {/* Header */}
          <div className="flex items-center space-x-2 mb-2">
            <span className="text-lg">{typeInfo.icon}</span>
            <div 
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: typeInfo.color }}
            />
            <span className="text-sm font-medium text-white">
              {typeInfo.title}
            </span>
          </div>

          {/* Content */}
          <div className="text-sm text-gray-300 mb-2">
            {typeInfo.description}
          </div>

          {/* Arrow */}
          <div 
            className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent"
            style={{ borderTopColor: '#1e293b' }}
          />
        </div>
      </motion.div>
    )
  }
  
  // Безопасная проверка данных для обычных элементов
  if (!data || !data[type] || !data[type][index]) {
    return null
  }
  
  const item = data[type][index]

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.8, y: 10 }}
      transition={{ duration: 0.2 }}
      className="fixed z-50 pointer-events-none"
      style={{
        left: Math.min(Math.max(position.x - 100, 10), window.innerWidth - 220),
        top: Math.max(position.y - 120, 10),
      } as React.CSSProperties}
    >
      <div className="glass-dark rounded-lg p-4 max-w-xs border border-slate-600">
        {/* Header */}
        <div className="flex items-center space-x-2 mb-2">
          <span className="text-lg">{typeInfo.icon}</span>
          <div 
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: typeInfo.color }}
          />
          <span className="text-sm font-medium text-white">
            {typeInfo.title}
          </span>
        </div>

        {/* Content */}
        <div className="text-sm text-gray-300 mb-2">
          {item}
        </div>

        {/* Footer */}
        <div className="text-xs text-gray-500">
          Сегмент {index + 1} из {data[type].length}
        </div>

        {/* Arrow */}
        <div 
          className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent"
          style={{ borderTopColor: '#1e293b' }}
        />
      </div>
    </motion.div>
  )
}
