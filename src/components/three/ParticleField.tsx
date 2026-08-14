import { useMemo, useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

interface FieldProps {
  count: number
}

const ACCENT = new THREE.Color('#00ffa6')
const VIOLET = new THREE.Color('#8b6bff')
const CYAN = new THREE.Color('#3ec5ff')

const SPRING_K = 1.8
const DAMPING = 0.88
const REPEL_RADIUS = 2.4
const REPEL_STRENGTH = 5.5
const DRIFT_AMOUNT = 0.12
const MAX_EDGE_DIST = 2.1
const MAX_LINKS_PER_POINT = 3
const EDGE_RECOMPUTE_EVERY_N_FRAMES = 6
const MAX_DELTA = 1 / 30

function NeuralField({ count }: FieldProps) {
  const groupRef = useRef<THREE.Group>(null)
  const pointsRef = useRef<THREE.Points>(null)
  const linesRef = useRef<THREE.LineSegments>(null)
  const { viewport } = useThree()

  const { home, positions, velocities, phases, colors } = useMemo(() => {
    const home = new Float32Array(count * 3)
    const positions = new Float32Array(count * 3)
    const velocities = new Float32Array(count * 3)
    const phases = new Float32Array(count)
    const colors = new Float32Array(count * 3)
    const palette = [ACCENT, CYAN, VIOLET]

    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 14
      const y = (Math.random() - 0.5) * 9
      const z = (Math.random() - 0.5) * 6
      home[i * 3] = x
      home[i * 3 + 1] = y
      home[i * 3 + 2] = z
      positions[i * 3] = x
      positions[i * 3 + 1] = y
      positions[i * 3 + 2] = z
      phases[i] = Math.random() * Math.PI * 2

      const color = palette[i % palette.length]
      colors[i * 3] = color.r
      colors[i * 3 + 1] = color.g
      colors[i * 3 + 2] = color.b
    }

    return { home, positions, velocities, phases, colors }
  }, [count])

  // Edge topology (which particles connect) is recomputed periodically against
  // live positions; the initial set mirrors that same neighbour search over
  // home positions so the field looks connected before the first frame runs.
  const initialEdges = useMemo(() => computeEdges(home, count), [home, count])
  const edgeIndices = useRef<number[]>(initialEdges)
  const linePositions = useMemo(() => new Float32Array(count * MAX_LINKS_PER_POINT * 6), [count])

  const raycaster = useMemo(() => new THREE.Raycaster(), [])
  const groundPlane = useMemo(() => new THREE.Plane(new THREE.Vector3(0, 0, 1), 0), [])
  const cursorWorld = useMemo(() => new THREE.Vector3(), [])
  const cursorLocal = useMemo(() => new THREE.Vector3(), [])

  const frameCount = useRef(0)

  useFrame((state, rawDelta) => {
    const delta = Math.min(rawDelta, MAX_DELTA)
    const t = state.clock.getElapsedTime()
    const group = groupRef.current
    const pts = pointsRef.current
    const lines = linesRef.current
    if (!group || !pts || !lines) return

    // Ambient rotation: slow idle spin plus a gentle mouse-driven parallax tilt.
    group.rotation.y = t * 0.03 + state.pointer.x * 0.18
    group.rotation.x = state.pointer.y * 0.1
    group.updateMatrixWorld()

    // Project the cursor into the field's local coordinate space via a
    // camera raycast against a plane at z=0.
    raycaster.setFromCamera(state.pointer, state.camera)
    const hit = raycaster.ray.intersectPlane(groundPlane, cursorWorld)
    if (hit) {
      cursorLocal.copy(cursorWorld)
      group.worldToLocal(cursorLocal)
    }

    for (let i = 0; i < count; i++) {
      const idx = i * 3
      const driftX = Math.sin(t * 0.15 + phases[i]) * DRIFT_AMOUNT
      const driftY = Math.cos(t * 0.12 + phases[i] * 1.3) * DRIFT_AMOUNT

      let ax = (home[idx] + driftX - positions[idx]) * SPRING_K
      let ay = (home[idx + 1] + driftY - positions[idx + 1]) * SPRING_K
      let az = (home[idx + 2] - positions[idx + 2]) * SPRING_K

      if (hit) {
        const dx = positions[idx] - cursorLocal.x
        const dy = positions[idx + 1] - cursorLocal.y
        const dz = positions[idx + 2] - cursorLocal.z
        const distSq = dx * dx + dy * dy + dz * dz
        if (distSq < REPEL_RADIUS * REPEL_RADIUS) {
          const dist = Math.sqrt(distSq) || 0.0001
          const falloff = 1 - dist / REPEL_RADIUS
          const force = falloff * falloff * REPEL_STRENGTH
          ax += (dx / dist) * force
          ay += (dy / dist) * force
          az += (dz / dist) * force
        }
      }

      velocities[idx] = (velocities[idx] + ax * delta) * DAMPING
      velocities[idx + 1] = (velocities[idx + 1] + ay * delta) * DAMPING
      velocities[idx + 2] = (velocities[idx + 2] + az * delta) * DAMPING

      positions[idx] += velocities[idx]
      positions[idx + 1] += velocities[idx + 1]
      positions[idx + 2] += velocities[idx + 2]
    }

    const posAttr = pts.geometry.attributes.position as THREE.BufferAttribute
    posAttr.needsUpdate = true

    frameCount.current++
    if (frameCount.current % EDGE_RECOMPUTE_EVERY_N_FRAMES === 0) {
      edgeIndices.current = computeEdges(positions, count)
    }

    const edges = edgeIndices.current
    for (let e = 0; e < edges.length / 2; e++) {
      const a = edges[e * 2]
      const b = edges[e * 2 + 1]
      const base = e * 6
      linePositions[base] = positions[a * 3]
      linePositions[base + 1] = positions[a * 3 + 1]
      linePositions[base + 2] = positions[a * 3 + 2]
      linePositions[base + 3] = positions[b * 3]
      linePositions[base + 4] = positions[b * 3 + 1]
      linePositions[base + 5] = positions[b * 3 + 2]
    }
    const lineAttr = lines.geometry.attributes.position as THREE.BufferAttribute
    lineAttr.needsUpdate = true
    lines.geometry.setDrawRange(0, edges.length)
  })

  return (
    <group ref={groupRef} scale={Math.min(viewport.width / 12, 1.4)}>
      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[linePositions, 3]} />
        </bufferGeometry>
        <lineBasicMaterial color="#1c2536" transparent opacity={0.5} />
      </lineSegments>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
          <bufferAttribute attach="attributes-color" args={[colors, 3]} />
        </bufferGeometry>
        <pointsMaterial size={0.05} vertexColors transparent opacity={0.9} sizeAttenuation />
      </points>
    </group>
  )
}

/** Nearest-neighbour edge search, capped per point. Cheap enough (O(n^2)
 * on a few hundred points) to run throttled inside the animation loop. */
function computeEdges(pts: Float32Array, count: number): number[] {
  const edges: number[] = []
  for (let i = 0; i < count; i++) {
    let links = 0
    for (let j = i + 1; j < count && links < MAX_LINKS_PER_POINT; j++) {
      const dx = pts[i * 3] - pts[j * 3]
      const dy = pts[i * 3 + 1] - pts[j * 3 + 1]
      const dz = pts[i * 3 + 2] - pts[j * 3 + 2]
      const dist = Math.sqrt(dx * dx + dy * dy + dz * dz)
      if (dist < MAX_EDGE_DIST) {
        edges.push(i, j)
        links++
      }
    }
  }
  return edges
}

export function ParticleField({ density = 'full' }: { density?: 'full' | 'light' }) {
  const count = density === 'full' ? 200 : 90

  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 8], fov: 50 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'low-power' }}
    >
      <NeuralField count={count} />
    </Canvas>
  )
}
