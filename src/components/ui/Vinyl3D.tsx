'use client';

import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, MeshWobbleMaterial, OrbitControls, PerspectiveCamera, MeshReflectorMaterial } from '@react-three/drei';
import * as THREE from 'three';

function Vinyl() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.z += 0.01;
    meshRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.2;
  });

  return (
    <group rotation={[Math.PI / 4, 0, 0]}>
      {/* Vinyl Disc */}
      <mesh ref={meshRef}>
        <cylinderGeometry args={[2, 2, 0.05, 64]} />
        <meshStandardMaterial 
          color="#0A0A0A" 
          roughness={0.1} 
          metalness={0.8}
        />
        
        {/* Center Label */}
        <mesh position={[0, 0.026, 0]}>
          <cylinderGeometry args={[0.7, 0.7, 0.01, 32]} />
          <meshStandardMaterial color="#A855F7" emissive="#7C3AED" emissiveIntensity={0.5} />
        </mesh>

        {/* Inner Hole */}
        <mesh position={[0, 0.03, 0]}>
          <cylinderGeometry args={[0.05, 0.05, 0.02, 16]} />
          <meshStandardMaterial color="#000" />
        </mesh>
      </mesh>

      {/* Decorative Floating Ring */}
      <Float speed={2} rotationIntensity={1} floatIntensity={1}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[2.5, 0.02, 16, 100]} />
          <meshStandardMaterial color="#06B6D4" emissive="#06B6D4" emissiveIntensity={2} />
        </mesh>
      </Float>
    </group>
  );
}

export default function Vinyl3D() {
  return (
    <div className="w-full h-[500px] relative">
      <Canvas shadows dpr={[1, 2]} camera={{ position: [0, 0, 5], fov: 45 }}>
        <PerspectiveCamera makeDefault position={[0, 0, 8]} />
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
        <pointLight position={[-10, -10, -10]} color="#EC4899" intensity={1} />
        <pointLight position={[10, 10, 10]} color="#A855F7" intensity={2} />
        
        <Vinyl />
        
        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
      </Canvas>
      
      {/* Glow Overlay */}
      <div className="absolute inset-0 bg-radial-gradient from-rh-purple/10 to-transparent pointer-events-none" />
    </div>
  );
}
