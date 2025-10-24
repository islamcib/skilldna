'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Vector3 } from 'three'
import * as THREE from 'three'

interface SkillData {
  skills: string[]
  education: string[]
  characteristics: string[]
}

interface DNAHelixProps {
  skillData: SkillData
  onSegmentHover: (type: 'skills' | 'education' | 'characteristics', index: number, position: { x: number; y: number }) => void
  onSegmentLeave: () => void
}

export default function DNAHelix({ skillData, onSegmentHover, onSegmentLeave }: DNAHelixProps) {
  const groupRef = useRef<THREE.Group>(null)
  const rotationRef = useRef(0)

  // Создаем более точную структуру ДНК
  const dnaSegments = useMemo(() => {
    const segments = []
    const totalItems = skillData.skills.length + skillData.education.length + skillData.characteristics.length
    const segmentsPerHelix = Math.max(totalItems, 12) // Минимум 12 сегментов для красивой спирали
    
    for (let i = 0; i < segmentsPerHelix; i++) {
      const angle = (i / segmentsPerHelix) * Math.PI * 6 // 3 полных оборота
      const radius = 1.2
      const height = (i / segmentsPerHelix) * 8 - 4 // Высота от -4 до 4
      
      // Определяем тип сегмента на основе данных
      let segmentType: 'skills' | 'education' | 'characteristics'
      let segmentIndex: number
      let color: string
      
      if (i < skillData.skills.length) {
        segmentType = 'skills'
        segmentIndex = i
        color = '#3b82f6'
      } else if (i < skillData.skills.length + skillData.education.length) {
        segmentType = 'education'
        segmentIndex = i - skillData.skills.length
        color = '#10b981'
      } else {
        segmentType = 'characteristics'
        segmentIndex = i - skillData.skills.length - skillData.education.length
        color = '#8b5cf6'
      }

      // Левая спираль
      segments.push({
        type: segmentType,
        index: segmentIndex,
        position: new Vector3(
          Math.cos(angle) * radius,
          height,
          Math.sin(angle) * radius
        ),
        color,
        side: 'left'
      })

      // Правая спираль (смещена на 180 градусов)
      segments.push({
        type: segmentType,
        index: segmentIndex,
        position: new Vector3(
          Math.cos(angle + Math.PI) * radius,
          height,
          Math.sin(angle + Math.PI) * radius
        ),
        color,
        side: 'right'
      })
    }

    return segments
  }, [skillData])

  // Анимация вращения
  useFrame((state, delta) => {
    if (groupRef.current) {
      rotationRef.current += delta * 0.3
      groupRef.current.rotation.y = rotationRef.current
    }
  })

  const handlePointerEnter = (type: 'skills' | 'education' | 'characteristics', index: number, event: any) => {
    try {
      // Получаем позицию мыши относительно экрана
      const mouse = new THREE.Vector2()
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1
      
      onSegmentHover(type, index, {
        x: event.clientX,
        y: event.clientY
      })
    } catch (error) {
      console.log('Hover error:', error)
    }
  }

  return (
    <group ref={groupRef}>
      {/* Центральная ось ДНК */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.05, 0.05, 8, 8]} />
        <meshStandardMaterial color="#64748b" transparent opacity={0.2} />
      </mesh>

      {/* Спиральные сегменты */}
      {dnaSegments.map((segment, index) => (
        <group key={`${segment.type}-${segment.index}-${segment.side}`}>
          {/* Основной сегмент */}
          <mesh
            position={segment.position}
            onPointerEnter={(e) => {
              e.stopPropagation()
              handlePointerEnter(segment.type, segment.index, e)
            }}
            onPointerLeave={onSegmentLeave}
          >
            <sphereGeometry args={[0.15, 12, 12]} />
            <meshStandardMaterial 
              color={segment.color}
              emissive={segment.color}
              emissiveIntensity={0.2}
              transparent
              opacity={0.9}
            />
          </mesh>

          {/* Соединительные связи между спиралями */}
          {segment.side === 'left' && (
            <mesh
              position={[
                segment.position.x * 0.5,
                segment.position.y,
                segment.position.z * 0.5
              ]}
            >
              <cylinderGeometry args={[0.02, 0.02, 2.4, 4]} />
              <meshStandardMaterial 
                color="#64748b" 
                transparent 
                opacity={0.4}
              />
            </mesh>
          )}
        </group>
      ))}

      {/* Дополнительные декоративные элементы */}
      {Array.from({ length: 8 }).map((_, i) => {
        const angle = (i / 8) * Math.PI * 2
        const radius = 0.8
        const height = (i / 8) * 8 - 4
        
        return (
          <mesh
            key={`decor-${i}`}
            position={[
              Math.cos(angle) * radius,
              height,
              Math.sin(angle) * radius
            ]}
          >
            <sphereGeometry args={[0.05, 8, 8]} />
            <meshStandardMaterial 
              color="#94a3b8" 
              transparent 
              opacity={0.3}
            />
          </mesh>
        )
      })}

      {/* Освещение */}
      <pointLight position={[3, 3, 3]} intensity={0.8} color="#8b5cf6" />
      <pointLight position={[-3, -3, -3]} intensity={0.5} color="#3b82f6" />
      <ambientLight intensity={0.3} />
    </group>
  )
}
