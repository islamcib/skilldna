'use client'

import { motion } from 'framer-motion'
import { Circle } from 'lucide-react'

export default function SkillLegend() {
  const legendItems = [
    {
      type: 'skills',
      label: 'Навыки',
      color: '#3b82f6',
      description: 'Профессиональные компетенции'
    },
    {
      type: 'education',
      label: 'Обучение',
      color: '#10b981',
      description: 'Курсы и сертификаты'
    },
    {
      type: 'characteristics',
      label: 'Характеристики',
      color: '#8b5cf6',
      description: 'Личные качества'
    },
    {
      type: 'personalInfo',
      label: 'Личная информация',
      color: '#ef4444',
      description: 'Пол, возраст, местоположение'
    },
    {
      type: 'workExperience',
      label: 'Опыт работы',
      color: '#14b8a6',
      description: 'Где работал, причины увольнения'
    },
    {
      type: 'achievements',
      label: 'Достижения',
      color: '#eab308',
      description: 'Награды, проекты, успехи'
    },
    {
      type: 'smartContracts',
      label: 'Смарт-контракты',
      color: '#f97316',
      description: 'Блокчейн контракты, DeFi, NFT'
    }
  ]

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.3 }}
      className="absolute top-24 right-6 glass-dark rounded-xl p-4 max-w-xs"
    >
      <h3 className="text-lg font-semibold mb-4 text-white">Легенда</h3>
      
      <div className="space-y-3">
        {legendItems.map((item, index) => (
          <motion.div
            key={item.type}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 + index * 0.1 }}
            className="flex items-center space-x-3"
          >
            <div className="relative">
              <Circle 
                size={16} 
                fill={item.color}
                color={item.color}
                className="drop-shadow-lg"
              />
              <motion.div
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  delay: index * 0.5
                }}
                className="absolute inset-0 rounded-full"
                style={{ 
                  backgroundColor: item.color,
                  filter: 'blur(4px)'
                } as React.CSSProperties}
              />
            </div>
            
            <div className="flex-1">
              <div className="text-sm font-medium text-white">
                {item.label}
              </div>
              <div className="text-xs text-gray-400">
                {item.description}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-4 pt-4 border-t border-slate-700"
      >
        <div className="text-xs text-gray-500 space-y-1">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
            <span>Наведите на сегменты</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-red-400 rounded-full" />
            <span>Личная информация</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-teal-400 rounded-full" />
            <span>Опыт работы</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-yellow-400 rounded-full" />
            <span>Достижения</span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
