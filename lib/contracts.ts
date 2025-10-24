import { ethers } from 'ethers'

// ABI для смарт-контракта SkillDNA
export const SKILL_DNA_ABI = [
  "function createOrUpdateSkillDNA(string[] memory skills, string[] memory education, string[] memory characteristics, string[] memory personalInfo, string[] memory workExperience, string[] memory achievements) external",
  "function getUserSkillDNA(address user) external view returns (tuple(string[] skills, string[] education, string[] characteristics, string[] personalInfo, string[] workExperience, string[] achievements, uint256 timestamp, bool isActive))",
  "function getMySkillDNA() external view returns (tuple(string[] skills, string[] education, string[] characteristics, string[] personalInfo, string[] memory workExperience, string[] achievements, uint256 timestamp, bool isActive))",
  "function deleteSkillDNA() external",
  "function hasUserSkillDNA(address user) external view returns (bool)",
  "function getTotalUsers() external view returns (uint256)",
  "event SkillDNACreated(address indexed user, uint256 timestamp)",
  "event SkillDNAUpdated(address indexed user, uint256 timestamp)",
  "event SkillDNADeleted(address indexed user, uint256 timestamp)"
]

// Адрес контракта (замените на реальный адрес после деплоя)
export const SKILL_DNA_CONTRACT_ADDRESS = "0x0000000000000000000000000000000000000000"

// Интерфейс для данных навыков
export interface SkillData {
  skills: string[]
  education: string[]
  characteristics: string[]
  personalInfo: string[]
  workExperience: string[]
  achievements: string[]
  smartContracts: string[]
  timestamp: number
  isActive: boolean
}

// Класс для работы со смарт-контрактом
export class SkillDNAContract {
  private contract: ethers.Contract
  private provider: ethers.Provider
  private signer: ethers.Signer

  constructor(provider: ethers.Provider, signer: ethers.Signer) {
    this.provider = provider
    this.signer = signer
    this.contract = new ethers.Contract(
      SKILL_DNA_CONTRACT_ADDRESS,
      SKILL_DNA_ABI,
      signer
    )
  }

  // Создание или обновление SkillDNA
  async createOrUpdateSkillDNA(data: Omit<SkillData, 'timestamp' | 'isActive'>) {
    try {
      const tx = await this.contract.createOrUpdateSkillDNA(
        data.skills,
        data.education,
        data.characteristics,
        data.personalInfo,
        data.workExperience,
        data.achievements,
        data.smartContracts
      )
      
      await tx.wait()
      return { success: true, txHash: tx.hash }
    } catch (error) {
      console.error('Error creating/updating SkillDNA:', error)
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error' }
    }
  }

  // Получение данных пользователя
  async getUserSkillDNA(userAddress: string): Promise<SkillData | null> {
    try {
      const data = await this.contract.getUserSkillDNA(userAddress)
      return {
        skills: data.skills,
        education: data.education,
        characteristics: data.characteristics,
        personalInfo: data.personalInfo,
        workExperience: data.workExperience,
        achievements: data.achievements,
        smartContracts: data.smartContracts,
        timestamp: data.timestamp.toNumber(),
        isActive: data.isActive
      }
    } catch (error) {
      console.error('Error getting user SkillDNA:', error)
      return null
    }
  }

  // Получение собственных данных
  async getMySkillDNA(): Promise<SkillData | null> {
    try {
      const data = await this.contract.getMySkillDNA()
      return {
        skills: data.skills,
        education: data.education,
        characteristics: data.characteristics,
        personalInfo: data.personalInfo,
        workExperience: data.workExperience,
        achievements: data.achievements,
        smartContracts: data.smartContracts,
        timestamp: data.timestamp.toNumber(),
        isActive: data.isActive
      }
    } catch (error) {
      console.error('Error getting my SkillDNA:', error)
      return null
    }
  }

  // Удаление SkillDNA
  async deleteSkillDNA() {
    try {
      const tx = await this.contract.deleteSkillDNA()
      await tx.wait()
      return { success: true, txHash: tx.hash }
    } catch (error) {
      console.error('Error deleting SkillDNA:', error)
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error' }
    }
  }

  // Проверка существования SkillDNA
  async hasUserSkillDNA(userAddress: string): Promise<boolean> {
    try {
      return await this.contract.hasUserSkillDNA(userAddress)
    } catch (error) {
      console.error('Error checking SkillDNA existence:', error)
      return false
    }
  }

  // Получение общего количества пользователей
  async getTotalUsers(): Promise<number> {
    try {
      const count = await this.contract.getTotalUsers()
      return count.toNumber()
    } catch (error) {
      console.error('Error getting total users:', error)
      return 0
    }
  }

  // Подписка на события
  onSkillDNACreated(callback: (user: string, timestamp: number) => void) {
    this.contract.on('SkillDNACreated', callback)
  }

  onSkillDNAUpdated(callback: (user: string, timestamp: number) => void) {
    this.contract.on('SkillDNAUpdated', callback)
  }

  onSkillDNADeleted(callback: (user: string, timestamp: number) => void) {
    this.contract.on('SkillDNADeleted', callback)
  }

  // Отписка от событий
  removeAllListeners() {
    this.contract.removeAllListeners()
  }
}

// Утилиты для работы с блокчейном
export const blockchainUtils = {
  // Проверка подключения к сети
  async checkNetwork(provider: ethers.Provider): Promise<boolean> {
    try {
      const network = await provider.getNetwork()
      return network.chainId === BigInt(1) // Ethereum Mainnet
    } catch {
      return false
    }
  },

  // Получение баланса
  async getBalance(address: string, provider: ethers.Provider): Promise<string> {
    try {
      const balance = await provider.getBalance(address)
      return ethers.formatEther(balance)
    } catch {
      return '0'
    }
  },

  // Форматирование адреса
  formatAddress(address: string): string {
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }
}
