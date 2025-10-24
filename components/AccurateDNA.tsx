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
}

interface AccurateDNAProps {
  skillData: SkillData
  onSegmentHover: (type: 'skills' | 'education' | 'characteristics' | 'personalInfo' | 'workExperience' | 'achievements', index: number, position: { x: number; y: number }) => void
  onSegmentLeave: () => void
}

export default function AccurateDNA({ skillData, onSegmentHover, onSegmentLeave }: AccurateDNAProps) {
  const groupRef = useRef<THREE.Group>(null)
  const rotationRef = useRef(0)

  // Создаем точную структуру ДНК с двойной спиралью
  const dnaStructure = useMemo(() => {
    const structure = []
    const totalItems = Math.max(
      skillData.skills.length + skillData.education.length + skillData.characteristics.length + 
      skillData.personalInfo.length + skillData.workExperience.length + skillData.achievements.length,
      15
    )
    
    // Параметры спирали ДНК (увеличенные)
    const helixRadius = 1.8
    const helixPitch = 3.4 // Расстояние между витками в ангстремах
    const turnsPerSegment = 0.08
    const totalTurns = totalItems * turnsPerSegment
    
    for (let i = 0; i < totalItems; i++) {
      const t = i / totalItems
      const angle1 = t * totalTurns * Math.PI * 2
      const angle2 = angle1 + Math.PI // Вторая спираль смещена на 180°
      const height = t * 10 - 5
      
      // Определяем тип и цвет сегмента
      let segmentType: 'skills' | 'education' | 'characteristics' | 'personalInfo' | 'workExperience' | 'achievements'
      let segmentIndex: number
      let color: string
      
      const skillsCount = skillData.skills.length
      const educationCount = skillData.education.length
      const characteristicsCount = skillData.characteristics.length
      const personalInfoCount = skillData.personalInfo.length
      const workExperienceCount = skillData.workExperience.length
      
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
      } else {
        segmentType = 'achievements'
        segmentIndex = i - skillsCount - educationCount - characteristicsCount - personalInfoCount - workExperienceCount
        color = '#eab308'
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

  const handlePointerEnter = (type: 'skills' | 'education' | 'characteristics' | 'personalInfo' | 'workExperience' | 'achievements', index: number, event: any) => {
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
          <mesh 
            position={segment.pos1}
            onPointerEnter={(e) => {
              e.stopPropagation()
              onSegmentHover('skills', -1, e) // Специальный индекс для фосфатных групп
            }}
            onPointerLeave={onSegmentLeave}
          >
            <sphereGeometry args={[0.15, 12, 12]} />
            <meshStandardMaterial 
              color="#ff6b6b"
              emissive="#ff6b6b"
              emissiveIntensity={0.2}
            />
          </mesh>

          {/* Невидимая интерактивная область для фосфатной группы */}
          <mesh 
            position={segment.pos1}
            onPointerEnter={(e) => {
              e.stopPropagation()
              onSegmentHover('skills', -1, e)
            }}
            onPointerLeave={onSegmentLeave}
          >
            <sphereGeometry args={[0.3, 8, 8]} />
            <meshStandardMaterial 
              transparent
              opacity={0}
              colorWrite={false}
            />
          </mesh>

          {/* Сахарная группа */}
          <mesh 
            position={[
              segment.pos1.x * 0.7,
              segment.pos1.y,
              segment.pos1.z * 0.7
            ]}
            onPointerEnter={(e) => {
              e.stopPropagation()
              onSegmentHover('education', -1, e) // Специальный индекс для сахарных групп
            }}
            onPointerLeave={onSegmentLeave}
          >
            <sphereGeometry args={[0.12, 10, 10]} />
            <meshStandardMaterial 
              color="#4ecdc4"
              emissive="#4ecdc4"
              emissiveIntensity={0.2}
            />
          </mesh>

          {/* Невидимая интерактивная область для сахарной группы */}
          <mesh 
            position={[
              segment.pos1.x * 0.7,
              segment.pos1.y,
              segment.pos1.z * 0.7
            ]}
            onPointerEnter={(e) => {
              e.stopPropagation()
              onSegmentHover('education', -1, e)
            }}
            onPointerLeave={onSegmentLeave}
          >
            <sphereGeometry args={[0.25, 8, 8]} />
            <meshStandardMaterial 
              transparent
              opacity={0}
              colorWrite={false}
            />
          </mesh>

          {/* Связь между фосфатом и сахаром */}
          {index < dnaStructure.length - 1 && (
            <mesh
              position={[
                (segment.pos1.x + dnaStructure[index + 1].pos1.x) / 2,
                (segment.height + dnaStructure[index + 1].height) / 2,
                (segment.pos1.z + dnaStructure[index + 1].pos1.z) / 2
              ]}
            >
              <cylinderGeometry args={[0.01, 0.01, 0.2, 4]} />
              <meshStandardMaterial color="#64748b" />
            </mesh>
          )}
        </group>
      ))}

      {/* Сахарно-фосфатный остов - правая спираль */}
      {dnaStructure.map((segment, index) => (
        <group key={`backbone2-${index}`}>
          {/* Фосфатная группа */}
          <mesh 
            position={segment.pos2}
            onPointerEnter={(e) => {
              e.stopPropagation()
              onSegmentHover('skills', -1, e)
            }}
            onPointerLeave={onSegmentLeave}
          >
            <sphereGeometry args={[0.15, 12, 12]} />
            <meshStandardMaterial 
              color="#ff6b6b"
              emissive="#ff6b6b"
              emissiveIntensity={0.2}
            />
          </mesh>

          {/* Невидимая интерактивная область для фосфатной группы */}
          <mesh 
            position={segment.pos2}
            onPointerEnter={(e) => {
              e.stopPropagation()
              onSegmentHover('skills', -1, e)
            }}
            onPointerLeave={onSegmentLeave}
          >
            <sphereGeometry args={[0.3, 8, 8]} />
            <meshStandardMaterial 
              transparent
              opacity={0}
              colorWrite={false}
            />
          </mesh>

          {/* Сахарная группа */}
          <mesh 
            position={[
              segment.pos2.x * 0.7,
              segment.pos2.y,
              segment.pos2.z * 0.7
            ]}
            onPointerEnter={(e) => {
              e.stopPropagation()
              onSegmentHover('education', -1, e)
            }}
            onPointerLeave={onSegmentLeave}
          >
            <sphereGeometry args={[0.12, 10, 10]} />
            <meshStandardMaterial 
              color="#4ecdc4"
              emissive="#4ecdc4"
              emissiveIntensity={0.2}
            />
          </mesh>

          {/* Невидимая интерактивная область для сахарной группы */}
          <mesh 
            position={[
              segment.pos2.x * 0.7,
              segment.pos2.y,
              segment.pos2.z * 0.7
            ]}
            onPointerEnter={(e) => {
              e.stopPropagation()
              onSegmentHover('education', -1, e)
            }}
            onPointerLeave={onSegmentLeave}
          >
            <sphereGeometry args={[0.25, 8, 8]} />
            <meshStandardMaterial 
              transparent
              opacity={0}
              colorWrite={false}
            />
          </mesh>

          {/* Связь между фосфатом и сахаром */}
          {index < dnaStructure.length - 1 && (
            <mesh
              position={[
                (segment.pos2.x + dnaStructure[index + 1].pos2.x) / 2,
                (segment.height + dnaStructure[index + 1].height) / 2,
                (segment.pos2.z + dnaStructure[index + 1].pos2.z) / 2
              ]}
            >
              <cylinderGeometry args={[0.01, 0.01, 0.2, 4]} />
              <meshStandardMaterial color="#64748b" />
            </mesh>
          )}
        </group>
      ))}

      {/* Пары оснований (интерактивные сегменты) */}
      {dnaStructure.map((segment, index) => (
        <group key={`basepair-${index}`}>
          {/* Основание 1 (левая спираль) */}
          <mesh
            position={[
              segment.pos1.x * 0.5,
              segment.height,
              segment.pos1.z * 0.5
            ]}
            onPointerEnter={(e) => {
              e.stopPropagation()
              handlePointerEnter(segment.type, segment.index, e)
            }}
            onPointerLeave={onSegmentLeave}
          >
            <sphereGeometry args={[0.25, 16, 16]} />
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
            position={[
              segment.pos2.x * 0.5,
              segment.height,
              segment.pos2.z * 0.5
            ]}
            onPointerEnter={(e) => {
              e.stopPropagation()
              handlePointerEnter(segment.type, segment.index, e)
            }}
            onPointerLeave={onSegmentLeave}
          >
            <sphereGeometry args={[0.25, 16, 16]} />
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
            position={[
              (segment.pos1.x + segment.pos2.x) / 4,
              segment.height,
              (segment.pos1.z + segment.pos2.z) / 4
            ]}
            onPointerEnter={(e) => {
              e.stopPropagation()
              onSegmentHover('characteristics', -1, e) // Специальный индекс для водородных связей
            }}
            onPointerLeave={onSegmentLeave}
          >
            <cylinderGeometry args={[0.012, 0.012, 2.2, 4]} />
            <meshStandardMaterial 
              color="#fbbf24"
              emissive="#fbbf24"
              emissiveIntensity={0.2}
              transparent
              opacity={0.8}
            />
          </mesh>

          {/* Невидимая интерактивная область для водородных связей */}
          <mesh
            position={[
              (segment.pos1.x + segment.pos2.x) / 4,
              segment.height,
              (segment.pos1.z + segment.pos2.z) / 4
            ]}
            onPointerEnter={(e) => {
              e.stopPropagation()
              onSegmentHover('characteristics', -1, e)
            }}
            onPointerLeave={onSegmentLeave}
          >
            <cylinderGeometry args={[0.15, 0.15, 2.2, 4]} />
            <meshStandardMaterial 
              transparent
              opacity={0}
              colorWrite={false}
            />
          </mesh>

          {/* Невидимая интерактивная область для всего сегмента */}
          <mesh
            position={[
              (segment.pos1.x + segment.pos2.x) / 4,
              segment.height,
              (segment.pos1.z + segment.pos2.z) / 4
            ]}
            onPointerEnter={(e) => {
              e.stopPropagation()
              handlePointerEnter(segment.type, segment.index, e)
            }}
            onPointerLeave={onSegmentLeave}
          >
            <sphereGeometry args={[0.4, 8, 8]} />
            <meshStandardMaterial 
              transparent
              opacity={0}
              colorWrite={false}
            />
          </mesh>

          {/* Дополнительные водородные связи */}
          <mesh
            position={[
              (segment.pos1.x + segment.pos2.x) / 6,
              segment.height + 0.05,
              (segment.pos1.z + segment.pos2.z) / 6
            ]}
          >
            <cylinderGeometry args={[0.003, 0.003, 1.2, 4]} />
            <meshStandardMaterial 
              color="#fbbf24"
              transparent
              opacity={0.5}
            />
          </mesh>

          <mesh
            position={[
              (segment.pos1.x + segment.pos2.x) / 6,
              segment.height - 0.05,
              (segment.pos1.z + segment.pos2.z) / 6
            ]}
          >
            <cylinderGeometry args={[0.003, 0.003, 1.2, 4]} />
            <meshStandardMaterial 
              color="#fbbf24"
              transparent
              opacity={0.5}
            />
          </mesh>
        </group>
      ))}

      {/* Центральная ось с эффектом свечения */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.02, 0.02, 10, 8]} />
        <meshStandardMaterial 
          color="#8b5cf6" 
          transparent 
          opacity={0.3}
          emissive="#8b5cf6"
          emissiveIntensity={0.1}
        />
      </mesh>

      {/* Декоративные частицы вокруг ДНК (упрощенные) */}
      {Array.from({ length: 12 }).map((_, i) => {
        const angle = (i / 12) * Math.PI * 2
        const radius = 2.5
        const height = (i / 12) * 10 - 5
        
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
