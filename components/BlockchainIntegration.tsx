'use client'

import { useState, useEffect } from 'react'
import { useAccount } from 'wagmi'
import { ethers } from 'ethers'
import { SkillDNAContract, blockchainUtils } from '@/lib/contracts'
import { motion } from 'framer-motion'
import { Loader2, CheckCircle, AlertCircle, Upload, Download } from 'lucide-react'

// Расширяем типы для window.ethereum
declare global {
  interface Window {
    ethereum?: any
  }
}

interface SkillData {
  skills: string[]
  education: string[]
  characteristics: string[]
  personalInfo: string[]
  workExperience: string[]
  achievements: string[]
  smartContracts: string[]
}

interface BlockchainIntegrationProps {
  skillData: SkillData
  onDataUpdate: (data: SkillData) => void
}

export default function BlockchainIntegration({ skillData, onDataUpdate }: BlockchainIntegrationProps) {
  const { address, isConnected } = useAccount()
  const [signer, setSigner] = useState<ethers.Signer | null>(null)
  const [contract, setContract] = useState<SkillDNAContract | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')
  const [hasBlockchainData, setHasBlockchainData] = useState(false)

  useEffect(() => {
    const getSigner = async () => {
      if (isConnected && window.ethereum) {
        try {
          const provider = new ethers.BrowserProvider(window.ethereum)
          const signerInstance = await provider.getSigner()
          setSigner(signerInstance)
          
          const contractInstance = new SkillDNAContract(provider, signerInstance)
          setContract(contractInstance)
        } catch (error) {
          console.error('Error getting signer:', error)
        }
      }
    }

    getSigner()
  }, [isConnected])

  // Проверка существования данных в блокчейне
  useEffect(() => {
    const checkBlockchainData = async () => {
      if (contract && address) {
        try {
          const exists = await contract.hasUserSkillDNA(address)
          setHasBlockchainData(exists)
        } catch (error) {
          console.error('Error checking blockchain data:', error)
        }
      }
    }

    checkBlockchainData()
  }, [contract, address])

  // Загрузка данных в блокчейн
  const uploadToBlockchain = async () => {
    if (!contract || !isConnected) {
      setStatus('error')
      setMessage('Не подключен кошелек')
      return
    }

    setIsLoading(true)
    setStatus('idle')

    try {
      const result = await contract.createOrUpdateSkillDNA(skillData)
      
      if (result.success) {
        setStatus('success')
        setMessage('Данные успешно сохранены в блокчейн!')
        setHasBlockchainData(true)
      } else {
        setStatus('error')
        setMessage(result.error || 'Ошибка при сохранении')
      }
    } catch (error) {
      setStatus('error')
      setMessage('Ошибка при загрузке в блокчейн')
      console.error('Upload error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  // Загрузка данных из блокчейна
  const downloadFromBlockchain = async () => {
    if (!contract || !isConnected) {
      setStatus('error')
      setMessage('Не подключен кошелек')
      return
    }

    setIsLoading(true)
    setStatus('idle')

    try {
      const data = await contract.getMySkillDNA()
      
      if (data) {
        onDataUpdate(data)
        setStatus('success')
        setMessage('Данные загружены из блокчейна!')
      } else {
        setStatus('error')
        setMessage('Данные не найдены в блокчейне')
      }
    } catch (error) {
      setStatus('error')
      setMessage('Ошибка при загрузке из блокчейна')
      console.error('Download error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  if (!isConnected) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-dark rounded-xl p-6 text-center"
      >
        <AlertCircle className="w-8 h-8 text-yellow-400 mx-auto mb-4" />
        <h3 className="text-lg font-semibold mb-2">Блокчейн интеграция</h3>
        <p className="text-gray-400 text-sm">
          Подключите кошелек для работы с блокчейном
        </p>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-dark rounded-xl p-6"
    >
      <div className="flex items-center space-x-3 mb-4">
        <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
        <h3 className="text-lg font-semibold">Блокчейн интеграция</h3>
        {hasBlockchainData && (
          <CheckCircle className="w-5 h-5 text-green-400" />
        )}
      </div>

      <div className="space-y-4">
        {/* Статус */}
        {status !== 'idle' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`p-3 rounded-lg flex items-center space-x-2 ${
              status === 'success' ? 'bg-green-900/20 text-green-400' : 'bg-red-900/20 text-red-400'
            }`}
          >
            {status === 'success' ? (
              <CheckCircle className="w-4 h-4" />
            ) : (
              <AlertCircle className="w-4 h-4" />
            )}
            <span className="text-sm">{message}</span>
          </motion.div>
        )}

        {/* Кнопки */}
        <div className="flex space-x-3">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={uploadToBlockchain}
            disabled={isLoading}
            className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 disabled:opacity-50 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 flex items-center justify-center space-x-2"
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Upload className="w-4 h-4" />
            )}
            <span>Сохранить в блокчейн</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={downloadFromBlockchain}
            disabled={isLoading}
            className="flex-1 bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 disabled:opacity-50 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 flex items-center justify-center space-x-2"
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Download className="w-4 h-4" />
            )}
            <span>Загрузить из блокчейна</span>
          </motion.button>
        </div>

        {/* Информация */}
        <div className="text-xs text-gray-500 space-y-1">
          <div>• Данные сохраняются в блокчейне навсегда</div>
          <div>• Вы можете обновлять свои данные</div>
          <div>• Все изменения записываются в блокчейн</div>
        </div>
      </div>
    </motion.div>
  )
}
