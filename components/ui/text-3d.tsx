'use client';

import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { cn } from '@/lib/utils';
import { RotateCw, Sparkles } from 'lucide-react';

interface Text3DProps {
  text: string;
  className?: string;
  layersCount?: number;
  spacing?: number;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  hue?: number;
  interactive?: boolean;
  showBadge?: boolean;
}

export function Text3D({
  text,
  className,
  layersCount = 28,
  spacing = 1.3,
  size = 'md',
  hue = 255,
  interactive = true,
  showBadge = false,
}: Text3DProps) {
  const stageRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);
  const stateRef = useRef({ rx: -10, ry: -20 });
  const [isGrabbing, setIsGrabbing] = useState(false);
  const [currentHue, setCurrentHue] = useState(hue);
  const idleTweenRef = useRef<gsap.core.Tween | null>(null);

  // Size configurations
  const sizeClasses = {
    sm: 'text-xl sm:text-2xl',
    md: 'text-2xl sm:text-3xl lg:text-4xl',
    lg: 'text-4xl sm:text-5xl lg:text-6xl',
    xl: 'text-5xl sm:text-7xl lg:text-8xl',
  };

  useEffect(() => {
    const scene = sceneRef.current;
    const stage = stageRef.current;
    if (!scene || !stage) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const state = stateRef.current;

    // Clear previous
    scene.innerHTML = '';

    // 1. Invisible sizer element so normal layout flow is preserved
    const sizer = document.createElement('span');
    sizer.className = 'invisible select-none pointer-events-none block font-extrabold tracking-tight';
    sizer.textContent = text;
    scene.appendChild(sizer);

    // 2. Extrusion layers
    const layers: HTMLElement[] = [];
    for (let i = 0; i < layersCount; i++) {
      const layer = document.createElement('span');
      layer.className = 'absolute inset-0 select-none pointer-events-none block font-extrabold tracking-tight';
      layer.setAttribute('aria-hidden', 'true');
      layer.textContent = text;

      // Color calculation: front layer is bright/luminous, back layers deepen
      const isEnd = i === 0 || i === layersCount - 1;
      const lightness = isEnd
        ? 68
        : 26 + (i / layersCount) * 16;
      const saturation = isEnd ? 95 : 70;

      layer.style.color = `hsl(${currentHue} ${saturation}% ${lightness}%)`;
      layer.style.textShadow = isEnd
        ? `0 0 16px hsl(${currentHue} 90% 60% / 0.35)`
        : 'none';

      scene.appendChild(layer);
      layers.push(layer);
    }

    // Set 3D z-depth for each layer
    gsap.set(layers, {
      z: (i: number) => (i - (layersCount - 1) / 2) * spacing,
    });

    const applyRotation = () => {
      gsap.set(scene, { rotationX: state.rx, rotationY: state.ry });
    };

    // Idle sway
    const startSway = () => {
      if (reduceMotion) return;
      idleTweenRef.current = gsap.to(state, {
        ry: '+=24',
        rx: '-=6',
        duration: 3.2,
        yoyo: true,
        repeat: -1,
        ease: 'sine.inOut',
        onUpdate: applyRotation,
      });
    };

    // Intro entrance animation
    if (!reduceMotion) {
      state.rx = -25;
      state.ry = -120;
      applyRotation();

      gsap.from(layers, {
        z: (i: number) => (i - (layersCount - 1) / 2) * 20,
        opacity: 0,
        duration: 1.2,
        ease: 'power4.out',
        stagger: { each: 0.008, from: 'center' },
      });

      gsap.to(state, {
        rx: -10,
        ry: -20,
        duration: 1.8,
        ease: 'power3.out',
        onUpdate: applyRotation,
        onComplete: startSway,
      });
    } else {
      state.rx = -10;
      state.ry = -20;
      applyRotation();
    }

    // Interactive Dragging with Inertia
    if (!interactive) return;

    let isDragging = false;
    let lx = 0;
    let ly = 0;
    let vx = 0;
    let vy = 0;
    let lt = 0;

    const onPointerDown = (e: PointerEvent) => {
      isDragging = true;
      setIsGrabbing(true);
      lx = e.clientX;
      ly = e.clientY;
      vx = 0;
      vy = 0;
      lt = performance.now();

      if (idleTweenRef.current) idleTweenRef.current.kill();
      gsap.killTweensOf(state);
      stage.setPointerCapture(e.pointerId);
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!isDragging) return;
      const dx = e.clientX - lx;
      const dy = e.clientY - ly;
      lx = e.clientX;
      ly = e.clientY;
      vx = dx;
      vy = dy;
      lt = performance.now();

      state.ry += dx * 0.45;
      state.rx -= dy * 0.45;
      applyRotation();
    };

    const onPointerUp = () => {
      if (!isDragging) return;
      isDragging = false;
      setIsGrabbing(false);

      if (performance.now() - lt > 80) {
        vx = 0;
        vy = 0;
      }

      if (!reduceMotion) {
        gsap.to(state, {
          ry: state.ry + vx * 10,
          rx: Math.max(-45, Math.min(45, state.rx - vy * 10)),
          duration: 1.5,
          ease: 'power3.out',
          onUpdate: applyRotation,
          onComplete: startSway,
        });
      } else {
        startSway();
      }
    };

    const onDblClick = () => {
      if (idleTweenRef.current) idleTweenRef.current.kill();
      gsap.to(state, {
        ry: state.ry + 360,
        duration: 1.2,
        ease: 'power3.inOut',
        onUpdate: applyRotation,
        onComplete: startSway,
      });
    };

    stage.addEventListener('pointerdown', onPointerDown);
    stage.addEventListener('pointermove', onPointerMove);
    stage.addEventListener('pointerup', onPointerUp);
    stage.addEventListener('pointercancel', onPointerUp);
    stage.addEventListener('dblclick', onDblClick);

    return () => {
      if (idleTweenRef.current) idleTweenRef.current.kill();
      gsap.killTweensOf(state);
      gsap.killTweensOf(layers);
      stage.removeEventListener('pointerdown', onPointerDown);
      stage.removeEventListener('pointermove', onPointerMove);
      stage.removeEventListener('pointerup', onPointerUp);
      stage.removeEventListener('pointercancel', onPointerUp);
      stage.removeEventListener('dblclick', onDblClick);
    };
  }, [text, layersCount, spacing, currentHue, interactive]);

  const handleSpin = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (idleTweenRef.current) idleTweenRef.current.kill();
    gsap.to(stateRef.current, {
      ry: stateRef.current.ry + 360,
      duration: 1.2,
      ease: 'power3.inOut',
      onUpdate: () => {
        if (sceneRef.current) {
          gsap.set(sceneRef.current, {
            rotationX: stateRef.current.rx,
            rotationY: stateRef.current.ry,
          });
        }
      },
    });
  };

  const handleCycleColor = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentHue((prev) => (prev + 60) % 360);
  };

  return (
    <div className={cn('relative inline-flex items-center gap-3', className)}>
      {/* Accessible semantic heading for SEO & screen readers */}
      <span className="sr-only">{text}</span>

      {/* 3D Stage Container */}
      <div
        ref={stageRef}
        title="3D Extruded Text - Drag to rotate, Double-click to spin"
        className={cn(
          'relative inline-block touch-none select-none transition-transform',
          interactive && (isGrabbing ? 'cursor-grabbing' : 'cursor-grab'),
          sizeClasses[size]
        )}
        style={{ perspective: 1200 }}
      >
        <div
          ref={sceneRef}
          className="relative inline-block whitespace-nowrap will-change-transform"
          style={{ transformStyle: 'preserve-3d' }}
          aria-hidden="true"
        />
      </div>

      {/* Optional Interactive Controls Badge */}
      {showBadge && (
        <div className="hidden sm:inline-flex items-center gap-1.5 rounded-full border border-zinc-200 bg-white/80 px-2 py-0.5 text-[10px] text-zinc-500 shadow-2xs backdrop-blur-xs dark:border-zinc-800 dark:bg-zinc-900/80 dark:text-zinc-400">
          <button
            type="button"
            onClick={handleSpin}
            className="flex items-center gap-1 hover:text-indigo-600 dark:hover:text-indigo-400 transition"
            title="Spin 360"
          >
            <RotateCw className="h-3 w-3" />
            <span>Spin</span>
          </button>
          <span>·</span>
          <button
            type="button"
            onClick={handleCycleColor}
            className="flex items-center gap-1 hover:text-indigo-600 dark:hover:text-indigo-400 transition"
            title="Cycle Hue"
          >
            <Sparkles className="h-3 w-3" />
            <span>Color</span>
          </button>
        </div>
      )}
    </div>
  );
}
