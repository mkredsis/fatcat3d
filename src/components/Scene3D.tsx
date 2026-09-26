import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Sparkles, ContactShadows, MeshDistortMaterial } from '@react-three/drei'
import * as THREE from 'three'

/** Pieza "impresa": toroide anudado con material naranja marca */
function PrintedPiece() {
  const mesh = useRef<THREE.Mesh>(null)

  useFrame((state, delta) => {
    if (!mesh.current) return
    mesh.current.rotation.y += delta * 0.25
    mesh.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.4) * 0.15
  })

  return (
    <Float speed={1.6} rotationIntensity={0.6} floatIntensity={1.4}>
      <mesh ref={mesh} castShadow position={[0, 0.3, 0]}>
        <torusKnotGeometry args={[0.95, 0.3, 220, 36]} />
        <MeshDistortMaterial
          color="#f5820b"
          roughness={0.25}
          metalness={0.35}
          distort={0.12}
          speed={2}
        />
      </mesh>
    </Float>
  )
}

/** Filamento flotante: anillos girando alrededor */
function FilamentRings() {
  const group = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (!group.current) return
    const t = state.clock.elapsedTime
    group.current.rotation.y = t * 0.12
    group.current.rotation.x = Math.sin(t * 0.25) * 0.2
  })

  return (
    <group ref={group}>
      <mesh rotation={[Math.PI / 2.4, 0, 0]}>
        <torusGeometry args={[2.3, 0.025, 12, 90]} />
        <meshStandardMaterial color="#ffa040" emissive="#f5820b" emissiveIntensity={0.6} />
      </mesh>
      <mesh rotation={[-Math.PI / 2.6, 0.4, 0.3]}>
        <torusGeometry args={[2.85, 0.02, 12, 90]} />
        <meshStandardMaterial color="#e8e6e3" transparent opacity={0.35} />
      </mesh>
    </group>
  )
}

/** Grid tipo cama de impresora */
function PrintBed() {
  return (
    <group position={[0, -1.6, 0]}>
      <gridHelper args={[14, 28, '#f5820b', '#232028']} position={[0, 0, 0]} />
      <mesh position={[0, -0.01, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[30, 30]} />
        <meshStandardMaterial color="#0a0a0c" />
      </mesh>
    </group>
  )
}

export default function Scene3D() {
  return (
    <div className="absolute inset-0 z-0" aria-hidden>
      <Canvas
        camera={{ position: [0, 0.8, 5.2], fov: 45 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <fog attach="fog" args={['#0a0a0c', 7, 15]} />
        <ambientLight intensity={0.35} />
        <spotLight position={[5, 6, 4]} angle={0.5} penumbra={1} intensity={80} color="#ffa040" />
        <pointLight position={[-5, 2, -3]} intensity={25} color="#4f6bff" />
        <directionalLight position={[0, 4, 6]} intensity={0.8} />

        <PrintedPiece />
        <FilamentRings />
        <PrintBed />

        <Sparkles count={90} scale={[9, 5, 6]} size={2} speed={0.35} color="#ffa040" opacity={0.55} />
        <ContactShadows position={[0, -1.58, 0]} opacity={0.55} scale={10} blur={2.4} far={4} color="#f5820b" />
      </Canvas>
      {/* Velo para legibilidad del texto */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-coal/70 via-transparent to-coal" />
    </div>
  )
}
