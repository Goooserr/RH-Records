"use client";

import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { BarChart2 } from 'lucide-react';
import { cn } from '@/lib/utils';

// Sonic Waveform Canvas Component
export const SonicWaveformCanvas = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        
        let animationFrameId: number;
        const mouse = { x: canvas.width / 2, y: canvas.height / 2 };
        let time = 0;

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        
        const draw = () => {
            ctx.fillStyle = 'rgba(10, 10, 10, 0.1)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            const lineCount = 60;
            const segmentCount = 80;
            const height = canvas.height / 2;
            
            for (let i = 0; i < lineCount; i++) {
                ctx.beginPath();
                const progress = i / lineCount;
                const colorIntensity = Math.sin(progress * Math.PI);
                
                // Adapting to RH Records Colors (Purple to Cyan)
                const r = Math.floor(168 + (6 - 168) * progress);
                const g = Math.floor(85 + (182 - 85) * progress);
                const b = Math.floor(247 + (212 - 247) * progress);
                
                ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${colorIntensity * 0.4})`;
                ctx.lineWidth = 1.2;

                for (let j = 0; j < segmentCount + 1; j++) {
                    const x = (j / segmentCount) * canvas.width;
                    
                    // Mouse influence
                    const distToMouse = Math.hypot(x - mouse.x, height - mouse.y);
                    const mouseEffect = Math.max(0, 1 - distToMouse / 500);

                    // Wave calculation
                    const noise = Math.sin(j * 0.1 + time + i * 0.2) * 20;
                    const spike = Math.cos(j * 0.2 + time + i * 0.1) * Math.sin(j * 0.05 + time) * 60;
                    const y = height + noise + spike * (1 + mouseEffect * 2.5);
                    
                    if (j === 0) {
                        ctx.moveTo(x, y);
                    } else {
                        ctx.lineTo(x, y);
                    }
                }
                ctx.stroke();
            }

            time += 0.015;
            animationFrameId = requestAnimationFrame(draw);
        };

        const handleMouseMove = (event: MouseEvent) => {
            mouse.x = event.clientX;
            mouse.y = event.clientY;
        };

        window.addEventListener('resize', resizeCanvas);
        window.addEventListener('mousemove', handleMouseMove);
        
        resizeCanvas();
        draw();

        return () => {
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener('resize', resizeCanvas);
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    return <canvas ref={canvasRef} className="absolute inset-0 z-0 w-full h-full bg-rh-black" />;
};

// The main hero component wrapper for the waveform
const SonicWaveformHero = ({ children }: { children?: React.ReactNode }) => {
    return (
        <div className="relative w-full h-full min-h-screen flex flex-col items-center justify-center overflow-hidden bg-rh-black">
            <SonicWaveformCanvas />
            
            <div className="absolute inset-0 bg-gradient-to-t from-rh-black via-transparent to-rh-black/40 z-10"></div>

            {/* Content Container */}
            <div className="relative z-20 w-full">
                {children}
            </div>
        </div>
    );
};

export default SonicWaveformHero;
