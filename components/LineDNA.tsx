'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Vector3 } from 'three'
import * as THREE from 'three'

interface SkillData {
  skills: string[]
  education: string[]
  characteristics: string[]
  personalInfo: string[]
  workExperience: string[]
  achievements: string[]
  smartContracts: string[]
}

interface LineDNAProps {
  skillData: SkillData
  onSegmentHover: (type: 'skills' | 'education' | 'characteristics' | 'personalInfo' | 'workExperience' | 'achievements' | 'smartContracts', index: number, position: { x: number; y: number }) => void
  onSegmentLeave: () => void
}

export default function LineDNA({ skillData, onSegmentHover, onSegmentLeave }: LineDNAProps) {
  const groupRef = useRef<THREE.Group>(null)
  const rotationRef = useRef(0)

  // Создаем структуру ДНК с линиями и горизонтальными элементами
  const dnaStructure = useMemo(() => {
    const structure = []
    const totalItems = Math.max(
      skillData.skills.length + skillData.education.length + skillData.characteristics.length + 
      skillData.personalInfo.length + skillData.workExperience.length + skillData.achievements.length + 
      skillData.smartContracts.length,
      12
    )
    
    // Параметры спирали ДНК
    const helixRadius = 2.0
    const helixPitch = 3.4
    const turnsPerSegment = 0.1
    const totalTurns = totalItems * turnsPerSegment
    
    for (let i = 0; i < totalItems; i++) {
      const t = i / totalItems
      const angle1 = t * totalTurns * Math.PI * 2
      const angle2 = angle1 + Math.PI // Вторая спираль смещена на 180°
      const height = t * 8 - 4
      
      // Определяем тип и цвет сегмента
      let segmentType: 'skills' | 'education' | 'characteristics' | 'personalInfo' | 'workExperience' | 'achievements' | 'smartContracts'
      let segmentIndex: number
      let color: string
      
      const skillsCount = skillData.skills.length
      const educationCount = skillData.education.length
      const characteristicsCount = skillData.characteristics.length
      const personalInfoCount = skillData.personalInfo.length
      const workExperienceCount = skillData.workExperience.length
      const achievementsCount = skillData.achievements.length
      
      if (i < skillsCount) {
        segmentType = 'skills'
        segmentIndex = i
        color = '#3b82f6'
      } else if (i < skillsCount + educationCount) {
        segmentType = 'education'
        segmentIndex = i - skillsCount
        color = '#10b981'
      } else if (i < skillsCount + educationCount + characteristicsCount) {
        segmentType = 'characteristics'
        segmentIndex = i - skillsCount - educationCount
        color = '#8b5cf6'
      } else if (i < skillsCount + educationCount + characteristicsCount + personalInfoCount) {
        segmentType = 'personalInfo'
        segmentIndex = i - skillsCount - educationCount - characteristicsCount
        color = '#ef4444'
      } else if (i < skillsCount + educationCount + characteristicsCount + personalInfoCount + workExperienceCount) {
        segmentType = 'workExperience'
        segmentIndex = i - skillsCount - educationCount - characteristicsCount - personalInfoCount
        color = '#14b8a6'
      } else if (i < skillsCount + educationCount + characteristicsCount + personalInfoCount + workExperienceCount + achievementsCount) {
        segmentType = 'achievements'
        segmentIndex = i - skillsCount - educationCount - characteristicsCount - personalInfoCount - workExperienceCount
        color = '#eab308'
      } else {
        segmentType = 'smartContracts'
        segmentIndex = i - skillsCount - educationCount - characteristicsCount - personalInfoCount - workExperienceCount - achievementsCount
        color = '#f97316'
      }

      // Позиции для двух спиралей
      const pos1 = new Vector3(
        Math.cos(angle1) * helixRadius,
        height,
        Math.sin(angle1) * helixRadius
      )
      
      const pos2 = new Vector3(
        Math.cos(angle2) * helixRadius,
        height,
        Math.sin(angle2) * helixRadius
      )

      structure.push({
        type: segmentType,
        index: segmentIndex,
        pos1,
        pos2,
        color,
        height,
        angle1,
        angle2,
        t
      })
    }

    return structure
  }, [skillData])

  // Анимация вращения
  useFrame((state, delta) => {
    if (groupRef.current) {
      rotationRef.current += delta * 0.2
      groupRef.current.rotation.y = rotationRef.current
    }
  })

  const handlePointerEnter = (type: 'skills' | 'education' | 'characteristics' | 'personalInfo' | 'workExperience' | 'achievements' | 'smartContracts', index: number, event: any) => {
    try {
      onSegmentHover(type, index, {
        x: event.clientX || 0,
        y: event.clientY || 0
      })
    } catch (error) {
      console.log('Hover error:', error)
    }
  }

  return (
    <group ref={groupRef}>
      {/* Сахарно-фосфатный остов - левая спираль */}
      {dnaStructure.map((segment, index) => (
        <group key={`backbone1-${index}`}>
          {/* Фосфатная группа */}
          <mesh position={segment.pos1}>
            <sphereGeometry args={[0.12, 12, 12]} />
            <meshStandardMaterial color="#ff6b6b" emissive="#ff6b6b" emissiveIntensity={0.2} />
          </mesh>
          
          {/* Сахарная группа */}
          <mesh position={[segment.pos1.x * 0.7, segment.pos1.y, segment.pos1.z * 0.7]}>
            <sphereGeometry args={[0.09, 10, 10]} />
            <meshStandardMaterial color="#4ecdc4" emissive="#4ecdc4" emissiveIntensity={0.2} />
          </mesh>
          
          {/* Связь между фосфатом и сахаром */}
          {index < dnaStructure.length - 1 && (
            <mesh position={new Vector3().lerpVectors(segment.pos1, dnaStructure[index + 1].pos1, 0.5)}>
              <cylinderGeometry args={[0.01, 0.01, segment.pos1.distanceTo(dnaStructure[index + 1].pos1), 4]} />
              <meshStandardMaterial color="#64748b" transparent opacity={0.4} />
            </mesh>
          )}
        </group>
      ))}

      {/* Сахарно-фосфатный остов - правая спираль */}
      {dnaStructure.map((segment, index) => (
        <group key={`backbone2-${index}`}>
          {/* Фосфатная группа */}
          <mesh position={segment.pos2}>
            <sphereGeometry args={[0.12, 12, 12]} />
            <meshStandardMaterial color="#ff6b6b" emissive="#ff6b6b" emissiveIntensity={0.2} />
          </mesh>
          
          {/* Сахарная группа */}
          <mesh position={[segment.pos2.x * 0.7, segment.pos2.y, segment.pos2.z * 0.7]}>
            <sphereGeometry args={[0.09, 10, 10]} />
            <meshStandardMaterial color="#4ecdc4" emissive="#4ecdc4" emissiveIntensity={0.2} />
          </mesh>
          
          {/* Связь между фосфатом и сахаром */}
          {index < dnaStructure.length - 1 && (
            <mesh position={new Vector3().lerpVectors(segment.pos2, dnaStructure[index + 1].pos2, 0.5)}>
              <cylinderGeometry args={[0.01, 0.01, segment.pos2.distanceTo(dnaStructure[index + 1].pos2), 4]} />
              <meshStandardMaterial color="#64748b" transparent opacity={0.4} />
            </mesh>
          )}
        </group>
      ))}

      {/* Пары оснований (интерактивные горизонтальные элементы) */}
      {dnaStructure.map((segment, index) => (
        <group key={`basepair-${index}`}>
          {/* Основание 1 (левая спираль) */}
          <mesh
            position={[segment.pos1.x * 0.5, segment.height, segment.pos1.z * 0.5]}
            onPointerEnter={(e) => { e.stopPropagation(); handlePointerEnter(segment.type, segment.index, e) }}
            onPointerLeave={onSegmentLeave}
          >
            <sphereGeometry args={[0.18, 16, 16]} />
            <meshStandardMaterial 
              color={segment.color}
              emissive={segment.color}
              emissiveIntensity={0.3}
              transparent
              opacity={0.9}
            />
          </mesh>

          {/* Основание 2 (правая спираль) */}
          <mesh
            position={[segment.pos2.x * 0.5, segment.height, segment.pos2.z * 0.5]}
            onPointerEnter={(e) => { e.stopPropagation(); handlePointerEnter(segment.type, segment.index, e) }}
            onPointerLeave={onSegmentLeave}
          >
            <sphereGeometry args={[0.18, 16, 16]} />
            <meshStandardMaterial 
              color={segment.color}
              emissive={segment.color}
              emissiveIntensity={0.3}
              transparent
              opacity={0.9}
            />
          </mesh>

          {/* Водородные связи между основаниями */}
          <mesh
            position={new Vector3().lerpVectors(
              new Vector3(segment.pos1.x * 0.5, segment.height, segment.pos1.z * 0.5),
              new Vector3(segment.pos2.x * 0.5, segment.height, segment.pos2.z * 0.5),
              0.5
            )}
            rotation-y={Math.atan2(segment.pos2.z - segment.pos1.z, segment.pos2.x - segment.pos1.x)}
          >
            <cylinderGeometry args={[0.008, 0.008, new Vector3(segment.pos1.x * 0.5, segment.height, segment.pos1.z * 0.5).distanceTo(new Vector3(segment.pos2.x * 0.5, segment.height, segment.pos2.z * 0.5)), 4]} />
            <meshStandardMaterial 
              color="#fbbf24" 
              emissive="#fbbf24"
              emissiveIntensity={0.2}
              transparent
              opacity={0.8}
            />
          </mesh>
        </group>
      ))}

      {/* Центральная ось с эффектом свечения */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.02, 0.02, 8, 8]} />
        <meshStandardMaterial 
          color="#8b5cf6" 
          transparent 
          opacity={0.3}
          emissive="#8b5cf6"
          emissiveIntensity={0.1}
        />
      </mesh>

      {/* Декоративные частицы вокруг ДНК */}
      {Array.from({ length: 8 }).map((_, i) => {
        const angle = (i / 8) * Math.PI * 2
        const radius = 2.5
        const height = (i / 8) * 8 - 4
        
        return (
          <mesh
            key={`particle-${i}`}
            position={[
              Math.cos(angle) * radius,
              height,
              Math.sin(angle) * radius
            ]}
          >
            <sphereGeometry args={[0.02, 6, 6]} />
            <meshStandardMaterial 
              color="#ffffff" 
              transparent 
              opacity={0.4}
              emissive="#ffffff"
              emissiveIntensity={0.1}
            />
          </mesh>
        )
      })}

      {/* Улучшенное освещение */}
      <pointLight position={[4, 4, 4]} intensity={1.5} color="#8b5cf6" />
      <pointLight position={[-4, -4, -4]} intensity={1.0} color="#3b82f6" />
      <pointLight position={[0, 6, 0]} intensity={0.8} color="#10b981" />
      <pointLight position={[0, -6, 0]} intensity={0.6} color="#fbbf24" />
      <ambientLight intensity={0.5} />
    </group>
  )
}