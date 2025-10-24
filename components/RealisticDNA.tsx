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

interface RealisticDNAProps {
  skillData: SkillData
  onSegmentHover: (type: 'skills' | 'education' | 'characteristics', index: number, position: { x: number; y: number }) => void
  onSegmentLeave: () => void
}

export default function RealisticDNA({ skillData, onSegmentHover, onSegmentLeave }: RealisticDNAProps) {
  const groupRef = useRef<THREE.Group>(null)
  const rotationRef = useRef(0)

  // Создаем реалистичную структуру ДНК
  const dnaStructure = useMemo(() => {
    const structure = []
    const totalItems = Math.max(
      skillData.skills.length + skillData.education.length + skillData.characteristics.length,
      8
    )
    
    // Создаем пары оснований (base pairs)
    for (let i = 0; i < totalItems; i++) {
      const angle = (i / totalItems) * Math.PI * 4 // 2 полных оборота
      const radius = 1.0
      const height = (i / totalItems) * 6 - 3
      
      // Определяем тип и цвет
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
      const leftPos = new Vector3(
        Math.cos(angle) * radius,
        height,
        Math.sin(angle) * radius
      )
      
      // Правая спираль (смещена на 180 градусов)
      const rightPos = new Vector3(
        Math.cos(angle + Math.PI) * radius,
        height,
        Math.sin(angle + Math.PI) * radius
      )

      structure.push({
        type: segmentType,
        index: segmentIndex,
        leftPos,
        rightPos,
        color,
        height,
        angle
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

  const handlePointerEnter = (type: 'skills' | 'education' | 'characteristics', index: number, event: any) => {
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
      {/* Центральная ось */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.02, 0.02, 6, 8]} />
        <meshStandardMaterial color="#64748b" transparent opacity={0.1} />
      </mesh>

      {/* Спиральные нити и основания */}
      {dnaStructure.map((basePair, index) => (
        <group key={`basepair-${index}`}>
          {/* Левая спираль */}
          <mesh
            position={basePair.leftPos}
            onPointerEnter={(e) => {
              e.stopPropagation()
              handlePointerEnter(basePair.type, basePair.index, e)
            }}
            onPointerLeave={onSegmentLeave}
          >
            <sphereGeometry args={[0.12, 16, 16]} />
            <meshStandardMaterial 
              color={basePair.color}
              emissive={basePair.color}
              emissiveIntensity={0.1}
              transparent
              opacity={0.8}
            />
          </mesh>

          {/* Правая спираль */}
          <mesh
            position={basePair.rightPos}
            onPointerEnter={(e) => {
              e.stopPropagation()
              handlePointerEnter(basePair.type, basePair.index, e)
            }}
            onPointerLeave={onSegmentLeave}
          >
            <sphereGeometry args={[0.12, 16, 16]} />
            <meshStandardMaterial 
              color={basePair.color}
              emissive={basePair.color}
              emissiveIntensity={0.1}
              transparent
              opacity={0.8}
            />
          </mesh>

          {/* Соединительная связь между основаниями */}
          <mesh
            position={[
              (basePair.leftPos.x + basePair.rightPos.x) / 2,
              basePair.height,
              (basePair.leftPos.z + basePair.rightPos.z) / 2
            ]}
            rotation={[0, basePair.angle, 0]}
          >
            <cylinderGeometry args={[0.01, 0.01, 2.0, 4]} />
            <meshStandardMaterial 
              color="#94a3b8" 
              transparent 
              opacity={0.6}
            />
          </mesh>

          {/* Спиральные связи */}
          {index < dnaStructure.length - 1 && (
            <>
              {/* Левая спиральная связь */}
              <mesh
                position={[
                  (basePair.leftPos.x + dnaStructure[index + 1].leftPos.x) / 2,
                  (basePair.height + dnaStructure[index + 1].height) / 2,
                  (basePair.leftPos.z + dnaStructure[index + 1].leftPos.z) / 2
                ]}
              >
                <cylinderGeometry args={[0.008, 0.008, 0.3, 4]} />
                <meshStandardMaterial 
                  color="#64748b" 
                  transparent 
                  opacity={0.4}
                />
              </mesh>

              {/* Правая спиральная связь */}
              <mesh
                position={[
                  (basePair.rightPos.x + dnaStructure[index + 1].rightPos.x) / 2,
                  (basePair.height + dnaStructure[index + 1].height) / 2,
                  (basePair.rightPos.z + dnaStructure[index + 1].rightPos.z) / 2
                ]}
              >
                <cylinderGeometry args={[0.008, 0.008, 0.3, 4]} />
                <meshStandardMaterial 
                  color="#64748b" 
                  transparent 
                  opacity={0.4}
                />
              </mesh>
            </>
          )}
        </group>
      ))}

      {/* Освещение */}
      <pointLight position={[2, 2, 2]} intensity={1.0} color="#8b5cf6" />
      <pointLight position={[-2, -2, -2]} intensity={0.6} color="#3b82f6" />
      <ambientLight intensity={0.4} />
    </group>
  )
}
