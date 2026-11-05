import { useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { CanvasTexture, LatheGeometry, RepeatWrapping, SRGBColorSpace, Vector2 } from 'three'
import type { Group, PointLight } from 'three'

/** Textura procedural de carne: capas de ternera (marrón) y pollo (dorado) con vetas. */
function useMeatTexture() {
  return useMemo(() => {
    const c = document.createElement('canvas')
    c.width = 512; c.height = 512
    const g = c.getContext('2d')!
    let seed = 7
    const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647)
    const layers = ['#7a3b1c', '#9a5226', '#b6692f', '#6b3018', '#c88543']
    for (let y = 0; y < 512; y += 16) {
      g.fillStyle = layers[Math.floor(rnd() * layers.length)]
      g.fillRect(0, y, 512, 17)
      for (let k = 0; k < 40; k++) {
        g.fillStyle = rnd() > 0.6 ? 'rgba(244,214,150,.55)' : 'rgba(40,16,6,.4)'
        g.fillRect(rnd() * 512, y + rnd() * 14, 10 + rnd() * 50, 2 + rnd() * 4)
      }
    }
    const t = new CanvasTexture(c)
    t.wrapS = t.wrapT = RepeatWrapping
    t.repeat.set(2, 1.4)
    t.colorSpace = SRGBColorSpace
    return t
  }, [])
}

function Doner() {
  const group = useRef<Group>(null)
  const fire = useRef<PointLight>(null)
  const map = useMeatTexture()
  const geo = useMemo(() => {
    // perfil: más estrecho abajo, ensanchándose hacia arriba, con ondulaciones
    const pts: Vector2[] = []
    for (let i = 0; i <= 48; i++) {
      const t = i / 48
      const r = 0.5 + 0.55 * Math.pow(t, 0.85) + Math.sin(t * 38) * 0.018
      pts.push(new Vector2(Math.max(0.05, r), t * 2.6 - 1.3))
    }
    pts.push(new Vector2(0.05, 1.3))
    return new LatheGeometry(pts, 72)
  }, [])
  useFrame((s, d) => {
    if (group.current) {
      group.current.rotation.y += d * 0.9
      group.current.rotation.x = Math.sin(s.clock.elapsedTime * 0.5) * 0.04
    }
    if (fire.current) fire.current.intensity = 14 + Math.sin(s.clock.elapsedTime * 11) * 2.5
  })
  return (
    <>
      <ambientLight intensity={0.45} />
      <pointLight ref={fire} position={[2.2, -0.4, 1.6]} color="#ff6a3a" intensity={14} distance={9} />
      <directionalLight position={[-3, 3, 4]} intensity={1.4} color="#ffd9a0" />
      <group ref={group} position={[0, -0.1, 0]}>
        <mesh geometry={geo}>
          <meshStandardMaterial map={map} roughness={0.78} metalness={0.02} />
        </mesh>
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[0.05, 0.05, 3.8, 16]} />
          <meshStandardMaterial color="#d9d2c6" metalness={0.9} roughness={0.25} />
        </mesh>
        <mesh position={[0, 1.95, 0]}><sphereGeometry args={[0.1, 20, 20]} /><meshStandardMaterial color="#d9d2c6" metalness={0.9} roughness={0.25} /></mesh>
        <mesh position={[0, -1.32, 0]}><cylinderGeometry args={[0.75, 0.75, 0.06, 40]} /><meshStandardMaterial color="#8d867d" metalness={0.85} roughness={0.35} /></mesh>
      </group>
      {/* resistencias */}
      {[-1.7, 1.7].map((x) => (
        <mesh key={x} position={[x, -0.1, -0.2]}>
          <boxGeometry args={[0.12, 2.8, 0.12]} />
          <meshStandardMaterial color="#ff5a2e" emissive="#ff3a10" emissiveIntensity={2.4} />
        </mesh>
      ))}
    </>
  )
}

export default function Doner3D() {
  return (
    <Canvas dpr={[1, 1.6]} camera={{ position: [0, 0.2, 5.4], fov: 38 }} gl={{ antialias: true, powerPreference: 'low-power' }} aria-label="Döner girando en 3D" role="img">
      <Doner />
    </Canvas>
  )
}
