'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { X, Plus, Trash2, Save } from 'lucide-react'

interface SkillData {
  skills: string[]
  education: string[]
  characteristics: string[]
  personalInfo: string[]
  workExperience: string[]
  achievements: string[]
  smartContracts: string[]
}

interface SkillFormProps {
  onSubmit: () => void
}

export default function SkillForm({ onSubmit }: SkillFormProps) {
  const [data, setData] = useState<SkillData>({
    skills: [''],
    education: [''],
    characteristics: [''],
    personalInfo: [''],
    workExperience: [''],
    achievements: [''],
    smartContracts: ['']
  })

  const [activeTab, setActiveTab] = useState<'skills' | 'education' | 'characteristics' | 'personalInfo' | 'workExperience' | 'achievements' | 'smartContracts'>('skills')

  const addItem = (category: keyof SkillData) => {
    setData(prev => ({
      ...prev,
      [category]: [...prev[category], '']
    }))
  }

  const removeItem = (category: keyof SkillData, index: number) => {
    setData(prev => ({
      ...prev,
      [category]: prev[category].filter((_, i) => i !== index)
    }))
  }

  const updateItem = (category: keyof SkillData, index: number, value: string) => {
    setData(prev => ({
      ...prev,
      [category]: prev[category].map((item, i) => i === index ? value : item)
    }))
  }

  const handleSubmit = () => {
    // Сохраняем данные в localStorage (в реальном приложении - в блокчейн)
    const filteredData = {
      skills: data.skills.filter(skill => skill.trim() !== ''),
      education: data.education.filter(edu => edu.trim() !== ''),
      characteristics: data.characteristics.filter(char => char.trim() !== ''),
      personalInfo: data.personalInfo.filter(info => info.trim() !== ''),
      workExperience: data.workExperience.filter(work => work.trim() !== ''),
      achievements: data.achievements.filter(ach => ach.trim() !== ''),
      smartContracts: data.smartContracts.filter(contract => contract.trim() !== '')
    }
    
    localStorage.setItem('skillDNA', JSON.stringify(filteredData))
    onSubmit()
  }

  const tabs = [
    { id: 'skills' as const, label: 'Навыки', color: 'blue' },
    { id: 'education' as const, label: 'Обучение', color: 'green' },
    { id: 'characteristics' as const, label: 'Характеристики', color: 'purple' },
    { id: 'personalInfo' as const, label: 'Личная информация', color: 'red' },
    { id: 'workExperience' as const, label: 'Опыт работы', color: 'teal' },
    { id: 'achievements' as const, label: 'Достижения', color: 'yellow' },
    { id: 'smartContracts' as const, label: 'Смарт-контракты', color: 'orange' }
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-dark rounded-2xl p-6 max-w-2xl mx-auto"
    >
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-bold">Создание SkillDNA</h3>
        <button
          onClick={() => window.location.reload()}
          className="text-gray-400 hover:text-white transition-colors"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 mb-6 bg-slate-800 rounded-lg p-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
              activeTab === tab.id
                ? `bg-${tab.color}-600 text-white`
                : 'text-gray-400 hover:text-white'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Form Content */}
      <div className="space-y-4 mb-6">
        {data[activeTab].map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center space-x-3"
          >
            <input
              type="text"
              value={item}
              onChange={(e) => updateItem(activeTab, index, e.target.value)}
              placeholder={`Введите ${tabs.find(t => t.id === activeTab)?.label.toLowerCase()}...`}
              className="flex-1 bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors"
            />
            {data[activeTab].length > 1 && (
              <button
                onClick={() => removeItem(activeTab, index)}
                className="text-red-400 hover:text-red-300 transition-colors"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            )}
          </motion.div>
        ))}
      </div>

      {/* Add Button */}
      <button
        onClick={() => addItem(activeTab)}
        className="w-full flex items-center justify-center space-x-2 py-3 border-2 border-dashed border-slate-600 rounded-lg text-gray-400 hover:text-white hover:border-slate-500 transition-colors mb-6"
      >
        <Plus className="w-5 h-5" />
        <span>Добавить еще</span>
      </button>

      {/* Submit Button */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={handleSubmit}
        className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 flex items-center justify-center space-x-2"
      >
        <Save className="w-5 h-5" />
        <span>Сохранить SkillDNA</span>
      </motion.button>

      <p className="text-xs text-gray-500 text-center mt-4">
        Все данные опциональны. Вы можете заполнить только те разделы, которые считаете важными.
      </p>
    </motion.div>
  )
}
