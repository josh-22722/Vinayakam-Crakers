import React, { useEffect, useRef, useState } from 'react';
import { Play, Pause, Wifi, Sparkles, Factory } from 'lucide-react';
import { ASSET_IMAGES } from '../assets/images';

interface ManufacturingStage {
  id: number;
  stageNumber: string;
  title: string;
  image: string;
}

const MANUFACTURING_STAGES: ManufacturingStage[] = [
  {
    id: 1,
    stageNumber: '01',
    title: 'Paper Tube Rolling',
    image: ASSET_IMAGES.workshop,
  },
  {
    id: 2,
    stageNumber: '02',
    title: 'Sparkler Testing',
    image: ASSET_IMAGES.testing,
  },
  {
    id: 3,
    stageNumber: '03',
    title: 'Aerial Assembly',
    image: ASSET_IMAGES.aerialShots,
  },
  {
    id: 4,
    stageNumber: '04',
    title: 'Moisture Sealing',
    image: ASSET_IMAGES.giftBoxes,
  },
];

export const ManufacturingVideoBackground: React.FC = () => {
  const [currentStageIdx, setCurrentStageIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isLowBandwidth, setIsLowBandwidth] = useState(false);
  const [videoFailed, setVideoFailed] = useState(false);
  
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const stageTimerRef = useRef<number | null>(null);

  const currentStage = MANUFACTURING_STAGES[currentStageIdx];

  // Looping stage rotator
  useEffect(() => {
    if (!isPlaying) return;

    const intervalMs = (isLowBandwidth ? 7 : 5) * 1000;
    const timer = window.setInterval(() => {
      setCurrentStageIdx((prev) => (prev + 1) % MANUFACTURING_STAGES.length);
    }, intervalMs);

    stageTimerRef.current = timer;

    return () => {
      if (stageTimerRef.current) clearInterval(stageTimerRef.current);
    };
  }, [isPlaying, isLowBandwidth]);

  // Subtle live floating spark particles on lightweight HTML5 canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const particleCount = isLowBandwidth ? 6 : 16;
    const particles = Array.from({ length: particleCount }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2 + 0.8,
      speedY: -(Math.random() * 0.7 + 0.2),
      speedX: (Math.random() - 0.5) * 0.4,
      alpha: Math.random() * 0.6 + 0.2,
      decay: Math.random() * 0.006 + 0.003,
      color: Math.random() > 0.3 ? '#FBBF24' : '#F59E0B',
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.y += p.speedY;
        p.x += p.speedX;
        p.alpha -= p.decay;

        if (p.alpha <= 0 || p.y < 0) {
          p.x = Math.random() * width;
          p.y = height + 10;
          p.alpha = Math.random() * 0.6 + 0.2;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.shadowBlur = 4;
        ctx.shadowColor = '#F59E0B';
        ctx.fill();
      });

      ctx.globalAlpha = 1.0;
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, [isLowBandwidth]);

  // Video element playback control
  useEffect(() => {
    if (videoRef.current) {
      if (isPlaying && !isLowBandwidth) {
        videoRef.current.play().catch(() => {
          setVideoFailed(true);
        });
      } else {
        videoRef.current.pause();
      }
    }
  }, [isPlaying, isLowBandwidth]);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden bg-stone-950 pointer-events-auto">
      {/* 1. Underlying Looping Video / Manufacturing Visuals */}
      <div className="absolute inset-0 w-full h-full">
        {!isLowBandwidth && !videoFailed && (
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            poster={currentStage.image}
            onError={() => setVideoFailed(true)}
            className="w-full h-full object-cover object-center transform scale-105 duration-700 ease-out opacity-80 transition-opacity"
          >
            <source
              src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"
              type="video/mp4"
            />
          </video>
        )}

        {/* Photographic Cross-Fade Stage Reel */}
        {MANUFACTURING_STAGES.map((stage, idx) => {
          const isActive = idx === currentStageIdx;
          return (
            <div
              key={stage.id}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                isActive ? 'opacity-85' : 'opacity-0'
              }`}
            >
              <img
                src={stage.image}
                alt={stage.title}
                className="w-full h-full object-cover object-center sm:object-[center_35%]"
                referrerPolicy="no-referrer"
              />
            </div>
          );
        })}
      </div>

      {/* 2. Measured Contrast Scrim Gradients */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/85 to-black/50 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40 pointer-events-none" />

      {/* 3. Subtle Live Pyrotechnic Spark Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none opacity-50 mix-blend-screen"
      />

      {/* 4. Minimalist, Interactive Floating Factory Badge */}
      <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 md:bottom-8 md:right-8 z-20">
        <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-stone-900/90 backdrop-blur-md border border-amber-500/30 text-white shadow-xl text-xs">
          <div className="flex items-center gap-1.5 font-bold text-amber-300">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[11px] tracking-wide">Vinayakam Factory</span>
          </div>

          <span className="text-stone-600">|</span>

          {/* Interactive Slide Dots */}
          <div className="flex items-center gap-1.5" title="Switch slideshow slide">
            {MANUFACTURING_STAGES.map((stg, idx) => (
              <button
                key={stg.id}
                onClick={() => setCurrentStageIdx(idx)}
                className={`h-2 rounded-full transition-all cursor-pointer ${
                  idx === currentStageIdx
                    ? 'w-4 bg-amber-400'
                    : 'w-2 bg-stone-600 hover:bg-stone-400'
                }`}
                title={`Stage ${stg.stageNumber}: ${stg.title}`}
                aria-label={`Slide ${idx + 1}`}
              />
            ))}
          </div>

          <span className="text-[11px] text-stone-300 font-medium hidden sm:inline">
            {currentStage.title}
          </span>

          <div className="flex items-center gap-1 ml-1 border-l border-stone-800 pl-1.5">
            <button
              onClick={() => setIsLowBandwidth(!isLowBandwidth)}
              className={`px-1.5 py-0.5 rounded text-[10px] font-bold cursor-pointer transition-colors ${
                isLowBandwidth ? 'bg-emerald-500 text-stone-950' : 'text-stone-400 hover:text-white'
              }`}
              title={isLowBandwidth ? 'Data Saver Active' : 'Switch to Data Saver'}
            >
              <Wifi className="w-3 h-3" />
            </button>

            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="p-1 text-stone-400 hover:text-amber-300 cursor-pointer transition-colors"
              title={isPlaying ? 'Pause Loop' : 'Play Loop'}
              aria-label="Toggle loop"
            >
              {isPlaying ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
