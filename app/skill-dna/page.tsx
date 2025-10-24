'use client'

import { Suspense, useEffect, useState, lazy } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, Info, RotateCcw } from 'lucide-react'
import { Canvas } from '@react-three/fiber'
import SkillLegend from '@/components/SkillLegend'
import SkillTooltip from '@/components/SkillTooltip'
import LoadingSpinner from '@/components/LoadingSpinner'
import BlockchainIntegration from '@/components/BlockchainIntegration'

// Ленивая загрузка 3D компонента
const LineDNA = lazy(() => import('@/components/LineDNA'))

interface SkillData {
  skills: string[]
  education: string[]
  characteristics: string[]
  personalInfo: string[]
  workExperience: string[]
  achievements: string[]
  smartContracts: string[]
}

export default function SkillDNAPage() {
  const [skillData, setSkillData] = useState<SkillData>({
    skills: [],
    education: [],
    characteristics: [],
    personalInfo: [],
    workExperience: [],
    achievements: [],
    smartContracts: []
  })
  const [hoveredSegment, setHoveredSegment] = useState<{
    type: 'skills' | 'education' | 'characteristics' | 'personalInfo' | 'workExperience' | 'achievements' | 'smartContracts'
    index: number
    position: { x: number; y: number }
  } | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Загружаем данные из localStorage
    const savedData = localStorage.getItem('skillDNA')
    if (savedData) {
      setSkillData(JSON.parse(savedData))
    }
    setIsLoading(false)
  }, [])

  const handleSegmentHover = (type: 'skills' | 'education' | 'characteristics' | 'personalInfo' | 'workExperience' | 'achievements' | 'smartContracts', index: number, position: { x: number; y: number }) => {
    try {
      // Проверяем, что данные существуют
      const data = skillData[type]
      if (data && data[index]) {
        setHoveredSegment({ type, index, position })
      }
    } catch (error) {
      console.log('Hover error:', error)
    }
  }

  const handleSegmentLeave = () => {
    setHoveredSegment(null)
  }


  const goBack = () => {
    window.location.href = '/'
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <LoadingSpinner size="lg" text="Загрузка SkillDNA..." />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-float"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-float" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Header */}
      <header className="relative z-10 flex justify-between items-center p-6">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={goBack}
          className="flex items-center space-x-2 text-white hover:text-purple-300 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Назад</span>
        </motion.button>

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h1 className="text-2xl font-bold gradient-text">Ваша SkillDNA</h1>
          <p className="text-gray-400 text-sm">Наведите на сегменты для просмотра навыков</p>
        </motion.div>

        <div className="flex items-center space-x-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="text-white hover:text-purple-300 transition-colors"
            title="Информация"
          >
            <Info className="w-5 h-5" />
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="text-white hover:text-purple-300 transition-colors"
            title="Повернуть"
          >
            <RotateCcw className="w-5 h-5" />
          </motion.button>
        </div>
      </header>

      {/* 3D Canvas */}
      <div className="relative z-10 h-[calc(100vh-120px)]">
        <Suspense fallback={
          <div className="flex items-center justify-center h-full">
            <LoadingSpinner size="md" text="Загрузка 3D модели..." />
          </div>
        }>
          <Canvas
            camera={{ position: [0, 0, 10], fov: 50 }}
            style={{ background: 'transparent' }}
          >
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1} />
            <pointLight position={[-10, -10, -10]} intensity={0.5} color="#8b5cf6" />
            
            <LineDNA
              skillData={skillData}
              onSegmentHover={handleSegmentHover}
              onSegmentLeave={handleSegmentLeave}
            />
          </Canvas>
        </Suspense>
      </div>

      {/* Legend */}
      <SkillLegend />


      {/* Tooltip */}
      {hoveredSegment && (
        <SkillTooltip
          type={hoveredSegment.type}
          index={hoveredSegment.index}
          position={hoveredSegment.position}
          data={skillData}
        />
      )}

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="absolute bottom-6 left-6 glass-dark rounded-xl p-4"
      >
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-blue-400">
              {skillData.skills.length}
            </div>
            <div className="text-xs text-gray-400">Навыки</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-green-400">
              {skillData.education.length}
            </div>
            <div className="text-xs text-gray-400">Обучение</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-purple-400">
              {skillData.characteristics.length}
            </div>
            <div className="text-xs text-gray-400">Характеристики</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-red-400">
              {skillData.personalInfo.length}
            </div>
            <div className="text-xs text-gray-400">Личная информация</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-teal-400">
              {skillData.workExperience.length}
            </div>
            <div className="text-xs text-gray-400">Опыт работы</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-yellow-400">
              {skillData.achievements.length}
            </div>
            <div className="text-xs text-gray-400">Достижения</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-orange-400">
              {skillData.smartContracts.length}
            </div>
            <div className="text-xs text-gray-400">Смарт-контракты</div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}