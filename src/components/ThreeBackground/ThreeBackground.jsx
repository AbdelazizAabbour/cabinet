import React, { useRef, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

/**
 * Cinematic 3D Background - Optimized
 * New Brand Colors: Rose (#D81B60), Soft Rose (#E91E63), Purple (#7B1FA2)
 */

function InteractiveParticles({ count = 150 }) { // Reduced count for performance
    const mesh = useRef()
    const { mouse, viewport } = useThree()

    const [positions, sizes, colors] = useMemo(() => {
        const positions = new Float32Array(count * 3)
        const sizes = new Float32Array(count)
        const colors = new Float32Array(count * 3)

        const color1 = new THREE.Color('#D81B60') // Rose
        const color2 = new THREE.Color('#7B1FA2') // Purple

        for (let i = 0; i < count; i++) {
            positions[i * 3] = (Math.random() - 0.5) * 20
            positions[i * 3 + 1] = (Math.random() - 0.5) * 20
            positions[i * 3 + 2] = (Math.random() - 0.5) * 8
            sizes[i] = Math.random() < 0.1 ? 0.2 : 0.08

            const mixedColor = i % 2 === 0 ? color1 : color2
            colors[i * 3] = mixedColor.r
            colors[i * 3 + 1] = mixedColor.g
            colors[i * 3 + 2] = mixedColor.b
        }
        return [positions, sizes, colors]
    }, [count])

    useFrame((state) => {
        const time = state.clock.getElapsedTime()
        // Optimization: Skip heavy calculations every frame if possible, 
        // but here we just do simple sine waves which are cheap.

        const targetX = (mouse.x * viewport.width) / 15 // Reduced sensitivity
        const targetY = (mouse.y * viewport.height) / 15

        if (mesh.current) {
            mesh.current.rotation.x = THREE.MathUtils.lerp(mesh.current.rotation.x, targetY * 0.05, 0.02)
            mesh.current.rotation.y = THREE.MathUtils.lerp(mesh.current.rotation.y, targetX * 0.05, 0.02)

            const positionArray = mesh.current.geometry.attributes.position.array
            for (let i = 0; i < count; i++) {
                const i3 = i * 3
                positionArray[i3 + 1] += Math.sin(time * 0.3 + i * 0.1) * 0.003
            }
            mesh.current.geometry.attributes.position.needsUpdate = true
        }
    })

    return (
        <points ref={mesh}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={count}
                    array={positions}
                    itemSize={3}
                />
                <bufferAttribute
                    attach="attributes-color"
                    count={count}
                    array={colors}
                    itemSize={3}
                />
                <bufferAttribute
                    attach="attributes-size"
                    count={count}
                    array={sizes}
                    itemSize={1}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.15}
                vertexColors
                transparent
                opacity={0.6}
                sizeAttenuation
                depthWrite={false}
                blending={THREE.AdditiveBlending}
            />
        </points>
    )
}

function HelixDNA({ position, rotation }) {
    const group = useRef()

    useFrame((state) => {
        const t = state.clock.getElapsedTime()
        if (group.current) {
            group.current.rotation.y = t * 0.15 // Slower rotation
            group.current.rotation.z = Math.sin(t * 0.3) * 0.05
        }
    })

    // Reduced geometry density for performance
    const points = useMemo(() => {
        const p1 = []
        const p2 = []
        for (let i = 0; i <= 30; i++) { // Reduced from 50
            const t = i / 3.5
            p1.push(new THREE.Vector3(Math.cos(t), t * 0.6 - 6, Math.sin(t)))
            p2.push(new THREE.Vector3(Math.cos(t + Math.PI), t * 0.6 - 6, Math.sin(t + Math.PI)))
        }
        return { p1, p2 }
    }, [])

    return (
        <group ref={group} position={position} rotation={rotation}>
            {points.p1.map((p, i) => (
                <mesh key={`s1-${i}`} position={p}>
                    <sphereGeometry args={[0.09, 6, 6]} /> {/* Lower polygon count */}
                    <meshStandardMaterial color="#D81B60" emissive="#D81B60" emissiveIntensity={0.6} />
                </mesh>
            ))}
            {points.p2.map((p, i) => (
                <mesh key={`s2-${i}`} position={p}>
                    <sphereGeometry args={[0.09, 6, 6]} />
                    <meshStandardMaterial color="#7B1FA2" emissive="#7B1FA2" emissiveIntensity={0.6} />
                </mesh>
            ))}
        </group>
    )
}

const ThreeBackground = () => {
    return (
        <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: 0,
            pointerEvents: 'none' // Ensure it doesn't block scroll
        }}>
            <Canvas
                dpr={[1, 1.5]}
                camera={{ position: [0, 0, 8], fov: 60 }}
                gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }} // Disable AA for perf
                style={{ background: 'transparent' }}
            >
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={0.8} color="#E91E63" />

                <InteractiveParticles count={150} />
                <HelixDNA position={[3.5, 0, -4]} rotation={[0, 0, 0.2]} />
                {/* Removed second helix to improve performance */}
            </Canvas>
        </div>
    )
}

export default ThreeBackground
