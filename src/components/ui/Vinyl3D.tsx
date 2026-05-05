'use client';

import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { 
  Float, 
  OrbitControls, 
  PerspectiveCamera, 
  MeshReflectorMaterial, 
  Text,
  Environment,
  ContactShadows
} from '@react-three/drei';
import * as THREE from 'three';

function Vinyl() {
  const meshRef = useRef<THREE.Mesh>(null);
  const labelRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();
    
    // Smooth rotation
    meshRef.current.rotation.y += 0.015;
    
    // Subtle tilt/float
    meshRef.current.rotation.x = Math.sin(t * 0.5) * 0.1;
    meshRef.current.position.y = Math.sin(t) * 0.1;
  });

  return (
    <group rotation={[Math.PI / 6, 0, 0]}>
      {/* Vinyl Disc with realistic reflections */}
      <mesh ref={meshRef} receiveShadow castShadow>
        <cylinderGeometry args={[2, 2, 0.04, 128]} />
        <MeshReflectorMaterial
          blur={[300, 100]}
          resolution={1024}
          mixBlur={1}
          mixStrength={40}
          roughness={1}
          depthScale={1.2}
          minDepthThreshold={0.4}
          maxDepthThreshold={1.4}
          color="#050505"
          metalness={0.9}
          mirror={1}
        />
        
        {/* Grooves (Visual trick with concentric cylinders or just specular) */}
        {[1.8, 1.6, 1.4, 1.2, 1.0].map((radius, i) => (
          <mesh key={i} position={[0, 0.021, 0]}>
            <ringGeometry args={[radius, radius + 0.005, 64]} />
            <meshStandardMaterial color="#222" transparent opacity={0.3} />
          </mesh>
        ))}

        {/* Center Label */}
        <group ref={labelRef} position={[0, 0.022, 0]}>
          <mesh rotation={[-Math.PI / 2, 0, 0]}>
            <circleGeometry args={[0.7, 32]} />
            <meshStandardMaterial 
              color="#A855F7" 
              emissive="#7C3AED" 
              emissiveIntensity={1.5}
            />
          </mesh>
          <Text
            position={[0, 0.01, 0]}
            rotation={[-Math.PI / 2, 0, 0]}
            fontSize={0.12}
            color="white"
            anchorX="center"
            anchorY="middle"
          >
            RH RECORDS
          </Text>
        </group>

        {/* Inner Hole */}
        <mesh position={[0, 0.025, 0]}>
          <cylinderGeometry args={[0.05, 0.05, 0.01, 16]} />
          <meshStandardMaterial color="#000" />
        </mesh>
      </mesh>

      {/* Spatial Glass Ring */}
      <Float speed={3} rotationIntensity={0.5} floatIntensity={0.5}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[2.4, 0.01, 16, 100]} />
          <meshStandardMaterial 
            color="#06B6D4" 
            emissive="#06B6D4" 
            emissiveIntensity={3} 
            transparent 
            opacity={0.6}
          />
        </mesh>
        
        {/* Glow particles or secondary ring */}
        <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0.1, 0]}>
          <torusGeometry args={[2.45, 0.005, 16, 100]} />
          <meshStandardMaterial 
            color="#A855F7" 
            emissive="#A855F7" 
            emissiveIntensity={2} 
            transparent 
            opacity={0.3}
          />
        </mesh>
      </Float>

      {/* Decorative floating bits */}
      {[...Array(3)].map((_, i) => (
        <Float key={i} speed={1 + i} rotationIntensity={2} floatIntensity={1}>
          <mesh position={[Math.cos(i * 2) * 3, Math.sin(i * 2) * 2, -1]}>
            <octahedronGeometry args={[0.1]} />
            <meshStandardMaterial color="#06B6D4" emissive="#06B6D4" emissiveIntensity={2} />
          </mesh>
        </Float>
      ))}
    </group>
  );
}

export default function Vinyl3D() {
  return (
    <div className="w-full h-full min-h-[400px] relative group cursor-grab active:cursor-grabbing">
      <Canvas shadows dpr={[1, 2]} camera={{ position: [0, 2, 6], fov: 35 }}>
        <PerspectiveCamera makeDefault position={[0, 2.5, 6]} />
        <ambientLight intensity={0.2} />
        
        {/* Dramatic Studio Lighting */}
        <spotLight position={[5, 10, 5]} angle={0.15} penumbra={1} intensity={2} castShadow />
        <pointLight position={[-5, 5, -5]} color="#EC4899" intensity={1.5} />
        <pointLight position={[5, -5, 5]} color="#06B6D4" intensity={1.5} />
        <pointLight position={[0, 5, 0]} color="#A855F7" intensity={2} />
        
        <Environment preset="night" />
        
        <Vinyl />
        
        <ContactShadows 
          position={[0, -2, 0]} 
          opacity={0.4} 
          scale={10} 
          blur={2.5} 
          far={4} 
          color="#000000" 
        />
        
        <OrbitControls 
          enableZoom={false} 
          enablePan={false} 
          autoRotate={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 3}
        />
      </Canvas>
      
      {/* Background glow that reacts to hover? (Optional CSS) */}
      <div className="absolute inset-0 bg-radial-gradient from-rh-purple/5 to-transparent pointer-events-none group-hover:from-rh-purple/10 transition-colors duration-1000" />
    </div>
  );
}

