# 🧬 SkillDNA - 3D Web3 Skills Visualization Platform

<div align="center">

![SkillDNA Logo](https://img.shields.io/badge/SkillDNA-3D%20Web3%20Skills-blue?style=for-the-badge&logo=dna&logoColor=white)

**Создайте свою уникальную ДНК навыков в 3D и сохраните её в блокчейне навсегда**

[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18-blue?style=flat-square&logo=react)](https://reactjs.org/)
[![Three.js](https://img.shields.io/badge/Three.js-3D%20Graphics-green?style=flat-square&logo=three.js)](https://threejs.org/)
[![Web3](https://img.shields.io/badge/Web3-Blockchain-purple?style=flat-square&logo=ethereum)](https://web3.foundation/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)

[🚀 Демо](#-демо) • [📖 Документация](#-документация) • [🛠️ Установка](#️-установка) • [🎯 Возможности](#-возможности)

</div>

---

## 🎯 Что такое SkillDNA?

**SkillDNA** - это революционная платформа для создания, визуализации и верификации цифровых навыков в эпоху Web3. Каждый человек может создать свою уникальную "ДНК навыков" - интерактивную 3D модель, где каждый сегмент представляет конкретный навык, и сохранить её в блокчейне навсегда.

### 🧬 Как это работает:

1. **Введите свои навыки** - добавьте навыки, образование, характеристики и достижения
2. **Создайте 3D ДНК** - ваши навыки превращаются в интерактивную 3D модель ДНК
3. **Сохраните в блокчейне** - ваши навыки записываются в блокчейн навсегда
4. **Поделитесь с миром** - покажите свою уникальную ДНК навыков

---

## ✨ Возможности

### 🎨 **3D Визуализация**
- **Интерактивная ДНК** - наведение показывает детали навыка
- **Цветовая кодировка** - разные категории навыков разными цветами
- **Анимация** - живая, вращающаяся ДНК
- **Реалистичная структура** - сахарно-фосфатный остов и пары оснований

### 🔗 **Web3 Интеграция**
- **Блокчейн-хранилище** - навыки сохраняются навсегда
- **Смарт-контракты** - верификация компетенций
- **Кошельки** - интеграция с MetaMask и другими
- **Децентрализация** - никто не может удалить ваши навыки

### 🎯 **Категории навыков**
- **💼 Навыки** - профессиональные компетенции
- **🎓 Образование** - курсы и сертификаты
- **⭐ Характеристики** - личные качества
- **👤 Личная информация** - пол, возраст, местоположение
- **💼 Опыт работы** - где работал, причины увольнения
- **🏆 Достижения** - награды, проекты, успехи
- **📜 Смарт-контракты** - блокчейн контракты, DeFi, NFT

---

## 🚀 Демо

### 🎬 Видео демонстрация
[![SkillDNA Demo](https://img.shields.io/badge/🎬-Смотреть%20демо-red?style=for-the-badge)](https://youtu.be/VIPiZkWLtl8)

### 📱 Скриншоты

<div align="center">

| Главная страница | 3D ДНК модель | Форма навыков |
|:---:|:---:|:---:|
| ![Главная страница](https://via.placeholder.com/300x200/1e293b/ffffff?text=Главная+страница) | ![3D ДНК](https://via.placeholder.com/300x200/8b5cf6/ffffff?text=3D+ДНК) | ![Форма](https://via.placeholder.com/300x200/10b981/ffffff?text=Форма+навыков) |

</div>

---

## 🛠️ Установка

### Предварительные требования

- **Node.js** 18+ 
- **npm** или **yarn**
- **Git**

### Быстрый старт

```bash
# Клонируйте репозиторий
git clone https://github.com/islamcib/skilldna.git
cd skilldna

# Установите зависимости
npm install

# Создайте файл окружения
cp env.example .env.local

# Запустите проект
npm run dev
```

### 🔧 Настройка окружения

Создайте файл `.env.local`:

```env
# WalletConnect Project ID
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_project_id_here

# Ethereum RPC URL
NEXT_PUBLIC_ETHEREUM_RPC_URL=https://mainnet.infura.io/v3/your_key

# Contract Address (после деплоя)
NEXT_PUBLIC_CONTRACT_ADDRESS=0x...
```

---

## 📖 Документация

### 🏗️ Архитектура

```
skilldna/
├── app/                    # Next.js App Router
│   ├── globals.css        # Глобальные стили
│   ├── layout.tsx         # Корневой layout
│   ├── page.tsx           # Главная страница
│   ├── providers.tsx      # Web3 провайдеры
│   └── skill-dna/         # Страница 3D ДНК
│       └── page.tsx
├── components/             # React компоненты
│   ├── LineDNA.tsx        # 3D ДНК модель
│   ├── SkillForm.tsx      # Форма навыков
│   ├── SkillLegend.tsx    # Легенда цветов
│   ├── SkillTooltip.tsx   # Подсказки
│   └── BlockchainIntegration.tsx
├── contracts/             # Смарт-контракты
│   └── SkillDNA.sol
├── lib/                   # Утилиты
│   └── contracts.ts      # Блокчейн интеграция
└── README.md              # Этот файл
```

### 🔧 Технологии

- **Frontend**: Next.js 14, React 18, TypeScript
- **3D Graphics**: Three.js, @react-three/fiber, @react-three/drei
- **Styling**: Tailwind CSS, Framer Motion
- **Web3**: Wagmi, RainbowKit, Ethers.js
- **Blockchain**: Ethereum, Smart Contracts

### 📚 API

#### Компоненты

- **`LineDNA`** - 3D модель ДНК с интерактивностью
- **`SkillForm`** - форма для ввода навыков
- **`SkillLegend`** - легенда цветов
- **`SkillTooltip`** - подсказки при наведении
- **`BlockchainIntegration`** - интеграция с блокчейном

#### Смарт-контракты

- **`SkillDNA.sol`** - основной контракт для хранения навыков
- **`contracts.ts`** - TypeScript интерфейсы для работы с контрактами

---

## 🎯 Использование

### 1. Создание SkillDNA

```typescript
// Добавление навыков
const skillData = {
  skills: ['React', 'TypeScript', 'Next.js'],
  education: ['Computer Science', 'Web Development'],
  characteristics: ['Creative', 'Analytical'],
  personalInfo: ['Male', '25', 'Moscow'],
  workExperience: ['Frontend Developer', '2 years'],
  achievements: ['Best Project 2023'],
  smartContracts: ['ERC-20', 'NFT Marketplace']
}
```

### 2. 3D Визуализация

```typescript
// Рендеринг 3D ДНК
<LineDNA
  skillData={skillData}
  onSegmentHover={handleHover}
  onSegmentLeave={handleLeave}
/>
```

### 3. Блокчейн интеграция

```typescript
// Сохранение в блокчейне
const contract = new SkillDNAContract(provider, signer)
await contract.createOrUpdateSkillDNA(skillData)
```

---

## 🤝 Вклад в проект

Мы приветствуем вклад в развитие SkillDNA! 

### Как внести вклад:

1. **Fork** репозиторий
2. Создайте **feature branch** (`git checkout -b feature/amazing-feature`)
3. **Commit** изменения (`git commit -m 'Add amazing feature'`)
4. **Push** в branch (`git push origin feature/amazing-feature`)
5. Откройте **Pull Request**

### 🐛 Сообщения об ошибках

Если вы нашли ошибку, создайте [Issue](https://github.com/islamcib/skilldna/issues) с описанием:
- Что произошло
- Ожидаемое поведение
- Шаги для воспроизведения
- Скриншоты (если применимо)

---

## 📄 Лицензия

Этот проект лицензирован под MIT License - см. файл [LICENSE](LICENSE) для деталей.

---

## 👥 Авторы

- **islamcib** - *Основной разработчик* - [GitHub](https://github.com/islamcib)

---

## 🙏 Благодарности

- [Next.js](https://nextjs.org/) - React фреймворк
- [Three.js](https://threejs.org/) - 3D графика
- [Wagmi](https://wagmi.sh/) - Web3 React hooks
- [RainbowKit](https://www.rainbowkit.com/) - Wallet connection
- [Tailwind CSS](https://tailwindcss.com/) - CSS фреймворк
- [Framer Motion](https://www.framer.com/motion/) - Анимации

---

## 🔗 Полезные ссылки

- **Документация**: [GETTING_STARTED.md](GETTING_STARTED.md)
- **Смарт-контракты**: [contracts/SkillDNA.sol](contracts/SkillDNA.sol)
- **Web3 интеграция**: [lib/contracts.ts](lib/contracts.ts)
- **Issues**: [GitHub Issues](https://github.com/islamcib/skilldna/issues)
- **Discussions**: [GitHub Discussions](https://github.com/islamcib/skilldna/discussions)

---

<div align="center">

**⭐ Если вам нравится SkillDNA, поставьте звезду! ⭐**

[![GitHub stars](https://img.shields.io/github/stars/islamcib/skilldna?style=social)](https://github.com/islamcib/skilldna/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/islamcib/skilldna?style=social)](https://github.com/islamcib/skilldna/network)
[![GitHub watchers](https://img.shields.io/github/watchers/islamcib/skilldna?style=social)](https://github.com/islamcib/skilldna/watchers)

</div>
