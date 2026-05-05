'use client';

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { 
  Float, 
  OrbitControls, 
  PerspectiveCamera, 
  MeshReflectorMaterial, 
  Text,
  Environment,
  ContactShadows,
  MeshTransmissionMaterial
} from '@react-three/drei';
import * as THREE from 'three';

function Vinyl() {
  const meshRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();
    
    // Slow, cinematic rotation
    meshRef.current.rotation.y += 0.005;
    
    // Breathing effect
    const scale = 1 + Math.sin(t * 0.5) * 0.02;
    meshRef.current.scale.set(scale, scale, scale);

    if (ringRef.current) {
      ringRef.current.rotation.z -= 0.01;
      ringRef.current.rotation.x = Math.sin(t * 0.3) * 0.1;
    }
  });

  return (
    <group rotation={[Math.PI / 8, -Math.PI / 6, 0]}>
      {/* Main Vinyl Disc - Chrome / Glass Material */}
      <mesh ref={meshRef} receiveShadow castShadow>
        <cylinderGeometry args={[3, 3, 0.05, 128]} />
        <meshPhysicalMaterial
          color="#111"
          metalness={0.9}
          roughness={0.1}
          reflectivity={1}
          clearcoat={1}
          clearcoatRoughness={0.1}
          emissive="#220033"
          emissiveIntensity={0.5}
        />
        
        {/* Subtle Grooves (using a ring with high-end material) */}
        {[2.8, 2.5, 2.2, 1.9, 1.6, 1.3].map((radius, i) => (
          <mesh key={i} position={[0, 0.026, 0]}>
            <ringGeometry args={[radius, radius + 0.01, 128]} />
            <meshStandardMaterial 
              color="#A855F7" 
              emissive="#A855F7" 
              emissiveIntensity={0.5} 
              transparent 
              opacity={0.2} 
            />
          </mesh>
        ))}

        {/* Center Label - Neon Core */}
        <group position={[0, 0.03, 0]}>
          <mesh rotation={[-Math.PI / 2, 0, 0]}>
            <circleGeometry args={[0.8, 64]} />
            <MeshTransmissionMaterial
              backside
              samples={16}
              resolution={512}
              transmission={1}
              roughness={0.2}
              thickness={0.5}
              ior={1.5}
              chromaticAberration={0.5}
              anisotropy={0.3}
              distortion={0.5}
              color="#A855F7"
            />
          </mesh>
        </group>
      </mesh>

      {/* Floating Outer Glass Ring - Refractive */}
      <mesh ref={ringRef} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[3.5, 0.02, 16, 100]} />
        <MeshTransmissionMaterial
          samples={16}
          resolution={256}
          transmission={1}
          roughness={0}
          thickness={1}
          ior={1.2}
          chromaticAberration={1}
          color="#06B6D4"
          emissive="#06B6D4"
          emissiveIntensity={0.5}
        />
      </mesh>

      {/* Ambient particles */}
      {[...Array(20)].map((_, i) => (
        <Float key={i} speed={2} rotationIntensity={1} floatIntensity={1}>
          <mesh position={[
            (Math.random() - 0.5) * 10,
            (Math.random() - 0.5) * 10,
            (Math.random() - 0.5) * 5
          ]}>
            <sphereGeometry args={[0.02, 8, 8]} />
            <meshStandardMaterial color="#A855F7" emissive="#A855F7" emissiveIntensity={2} />
          </mesh>
        </Float>
      ))}
    </group>
  );
}

export default function Vinyl3D() {
  return (
    <div className="w-full h-full relative group">
      <Canvas 
        shadows 
        dpr={[1, 2]} 
        camera={{ position: [0, 0, 8], fov: 40 }}
        gl={{ antialias: true, alpha: true }}
      >
        <PerspectiveCamera makeDefault position={[0, 0, 8]} />
        <ambientLight intensity={0.2} />
        
        {/* Cinematic Lighting */}
        <spotLight position={[10, 15, 10]} angle={0.3} penumbra={1} intensity={2} castShadow color="#A855F7" />
        <spotLight position={[-10, 15, -10]} angle={0.3} penumbra={1} intensity={1} color="#06B6D4" />
        <pointLight position={[0, 0, 5]} color="#A855F7" intensity={0.5} />
        
        <Environment preset="night" />
        
        <Vinyl />
        
        <ContactShadows 
          position={[0, -4, 0]} 
          opacity={0.4} 
          scale={20} 
          blur={3} 
          far={10} 
          color="#000000" 
        />
        
        <OrbitControls 
          enableZoom={false} 
          enablePan={false}
          autoRotate={false}
          maxPolarAngle={Math.PI / 1.5}
          minPolarAngle={Math.PI / 3}
        />
      </Canvas>
      
      {/* Soft vignette overlay */}
      <div className="absolute inset-0 bg-radial-gradient from-transparent via-rh-black/20 to-rh-black pointer-events-none" />
    </div>
  );
}

