'use client'

import { useState, lazy, Suspense } from 'react'
import { motion } from 'framer-motion'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { Dna, User, BookOpen, Award, Sparkles } from 'lucide-react'
import { useAccount } from 'wagmi'
import LoadingSpinner from '@/components/LoadingSpinner'

// Ленивая загрузка формы
const SkillForm = lazy(() => import('@/components/SkillForm'))

export default function Home() {
  const { isConnected } = useAccount()
  const [showForm, setShowForm] = useState(false)
  const [hasData, setHasData] = useState(false)

  const handleFormSubmit = () => {
    setHasData(true)
    setShowForm(false)
  }

  const handleViewSkillDNA = () => {
    // Переход на страницу с 3D ДНК
    window.location.href = '/skill-dna'
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-40 left-1/2 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float" style={{ animationDelay: '4s' }}></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <header className="flex justify-between items-center mb-12">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center space-x-3"
          >
            <Dna className="w-8 h-8 text-purple-400" />
            <h1 className="text-2xl font-bold gradient-text">SkillDNA</h1>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <ConnectButton />
          </motion.div>
        </header>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-12"
          >
            <h2 className="text-5xl md:text-7xl font-bold mb-6">
              Создайте свою
              <span className="gradient-text block">цифровую ДНК навыков</span>
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Визуализируйте свои навыки, обучение и характеристики в уникальной 3D анимации ДНК с интеграцией Web3 технологий
            </p>
          </motion.div>

          {!isConnected ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              className="glass-dark rounded-2xl p-8 max-w-md mx-auto"
            >
              <Sparkles className="w-12 h-12 text-purple-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-4">Подключите кошелек</h3>
              <p className="text-gray-400 mb-6">
                Для создания вашей SkillDNA необходимо подключить Web3 кошелек
              </p>
              <ConnectButton />
            </motion.div>
          ) : !hasData ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              {!showForm ? (
                <div className="space-y-8">
                  <div className="grid md:grid-cols-3 gap-6 mb-8">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className="glass-dark rounded-xl p-6"
                    >
                      <User className="w-8 h-8 text-blue-400 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold mb-2">Навыки</h3>
                      <p className="text-gray-400 text-sm">
                        Профессиональные навыки и компетенции
                      </p>
                    </motion.div>
                    
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className="glass-dark rounded-xl p-6"
                    >
                      <BookOpen className="w-8 h-8 text-green-400 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold mb-2">Обучение</h3>
                      <p className="text-gray-400 text-sm">
                        Курсы, сертификаты и образование
                      </p>
                    </motion.div>
                    
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className="glass-dark rounded-xl p-6"
                    >
                      <Award className="w-8 h-8 text-purple-400 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold mb-2">Характеристики</h3>
                      <p className="text-gray-400 text-sm">
                        Личные качества и особенности
                      </p>
                    </motion.div>
                  </div>

                  <div className="grid md:grid-cols-3 gap-6 mb-8">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className="glass-dark rounded-xl p-6"
                    >
                      <User className="w-8 h-8 text-red-400 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold mb-2">Личная информация</h3>
                      <p className="text-gray-400 text-sm">
                        Пол, возраст, местоположение и др.
                      </p>
                    </motion.div>
                    
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className="glass-dark rounded-xl p-6"
                    >
                      <BookOpen className="w-8 h-8 text-teal-400 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold mb-2">Опыт работы</h3>
                      <p className="text-gray-400 text-sm">
                        Где работал, причины увольнения
                      </p>
                    </motion.div>
                    
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className="glass-dark rounded-xl p-6"
                    >
                      <Award className="w-8 h-8 text-yellow-400 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold mb-2">Достижения</h3>
                      <p className="text-gray-400 text-sm">
                        Награды, проекты, успехи
                      </p>
                    </motion.div>
                  </div>

                  <div className="grid md:grid-cols-1 gap-6 mb-8">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className="glass-dark rounded-xl p-6"
                    >
                      <Award className="w-8 h-8 text-orange-400 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold mb-2">Смарт-контракты</h3>
                      <p className="text-gray-400 text-sm">
                        Блокчейн контракты, DeFi, NFT проекты
                      </p>
                    </motion.div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowForm(true)}
                    className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 neon-glow"
                  >
                    Начать создание SkillDNA
                  </motion.button>
                </div>
              ) : (
                <Suspense fallback={
                  <div className="flex items-center justify-center p-8">
                    <LoadingSpinner size="sm" text="Загрузка формы..." />
                  </div>
                }>
                  <SkillForm onSubmit={handleFormSubmit} />
                </Suspense>
              )}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="space-y-8"
            >
              <div className="glass-dark rounded-2xl p-8">
                <Dna className="w-16 h-16 text-purple-400 mx-auto mb-4 animate-pulse" />
                <h3 className="text-2xl font-bold mb-4">Ваша SkillDNA готова!</h3>
                <p className="text-gray-300 mb-6">
                  Теперь вы можете просмотреть свою уникальную 3D визуализацию навыков
                </p>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleViewSkillDNA}
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 neon-glow"
                >
                  Просмотреть мою SkillDNA
                </motion.button>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}
