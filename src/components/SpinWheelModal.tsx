import React, { useState, useEffect, useRef } from 'react';
import { 
  X, 
  Sparkles, 
  Copy, 
  Check, 
  ShoppingBag, 
  ArrowRight, 
  RotateCw, 
  Flame, 
  Volume2, 
  VolumeX,
  Clock,
  Award
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { formatINR } from '../utils/helpers';

export interface SpinPrize {
  id: string;
  code: string;
  discountPercent: number; // Strictly 60% - 80%
  label: string;
  sublabel: string;
  bgColor: string;
  textColor: string;
}

// All offers strictly 60% to 80%
export const SPIN_PRIZES: SpinPrize[] = [
  {
    id: 'p-80',
    code: 'DIWALI80',
    discountPercent: 80,
    label: '80% OFF',
    sublabel: 'Mega Clearance',
    bgColor: '#b91c1c', // Crimson Red
    textColor: '#ffffff',
  },
  {
    id: 'p-65',
    code: 'SPARK65',
    discountPercent: 65,
    label: '65% OFF',
    sublabel: 'Deluxe Pyro',
    bgColor: '#d97706', // Warm Amber
    textColor: '#ffffff',
  },
  {
    id: 'p-75',
    code: 'FACTORY75',
    discountPercent: 75,
    label: '75% OFF',
    sublabel: 'Direct Factory',
    bgColor: '#047857', // Emerald Green
    textColor: '#ffffff',
  },
  {
    id: 'p-60',
    code: 'BLAST60',
    discountPercent: 60,
    label: '60% OFF',
    sublabel: 'Cracker Blast',
    bgColor: '#7c3aed', // Royal Purple
    textColor: '#ffffff',
  },
  {
    id: 'p-78',
    code: 'DHAMAKA78',
    discountPercent: 78,
    label: '78% OFF',
    sublabel: 'Family Dhamaka',
    bgColor: '#c2410c', // Bright Orange-Red
    textColor: '#ffffff',
  },
  {
    id: 'p-70',
    code: 'FESTIVE70',
    discountPercent: 70,
    label: '70% OFF',
    sublabel: 'Green Crackers',
    bgColor: '#059669', // Teal Green
    textColor: '#ffffff',
  },
  {
    id: 'p-68',
    code: 'VINAYAKAM68',
    discountPercent: 68,
    label: '68% OFF',
    sublabel: 'Sivakasi Direct',
    bgColor: '#991b1b', // Deep Maroon
    textColor: '#ffffff',
  },
  {
    id: 'p-72',
    code: 'PATAKA72',
    discountPercent: 72,
    label: '72% OFF',
    sublabel: 'Aerial Shots',
    bgColor: '#b45309', // Golden Ochre
    textColor: '#ffffff',
  },
];

export const SpinWheelModal: React.FC = () => {
  const { 
    isSpinWheelOpen, 
    setIsSpinWheelOpen, 
    applyCoupon, 
    setIsCartOpen,
    setActiveView,
    showToast 
  } = useStore();

  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [winningPrize, setWinningPrize] = useState<SpinPrize | null>(null);
  const [showCelebration, setShowCelebration] = useState(false);
  const [hasCopied, setHasCopied] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(900); // 15 mins countdown
  const [spinsCount, setSpinsCount] = useState(0);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);

  // Initialize Web Audio synthesizer for tick & fanfare
  const playSound = (type: 'tick' | 'win') => {
    if (isMuted) return;
    try {
      if (!audioCtxRef.current) {
        const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        if (AudioCtx) {
          audioCtxRef.current = new AudioCtx();
        }
      }
      const ctx = audioCtxRef.current;
      if (!ctx) return;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      if (type === 'tick') {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(450, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(180, ctx.currentTime + 0.04);
        gain.gain.setValueAtTime(0.08, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.04);
      } else if (type === 'win') {
        // Festive fanfare arpeggio
        const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
        notes.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.value = freq;
          const startTime = ctx.currentTime + idx * 0.12;
          gain.gain.setValueAtTime(0.12, startTime);
          gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.4);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(startTime);
          osc.stop(startTime + 0.4);
        });
      }
    } catch {
      // Audio might be blocked by browser policy
    }
  };

  // Confetti Particle Animation
  useEffect(() => {
    if (!showCelebration) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = canvas.parentElement?.clientWidth || 400;
    canvas.height = canvas.parentElement?.clientHeight || 500;

    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      color: string;
      size: number;
      rotation: number;
      vRot: number;
    }

    const colors = ['#f59e0b', '#ef4444', '#10b981', '#fbbf24', '#ec4899', '#6366f1', '#ffffff'];
    const particles: Particle[] = Array.from({ length: 60 }, () => ({
      x: canvas.width / 2,
      y: canvas.height / 2,
      vx: (Math.random() - 0.5) * 12,
      vy: (Math.random() - 0.5) * 12 - 4,
      color: colors[Math.floor(Math.random() * colors.length)],
      size: Math.random() * 8 + 4,
      rotation: Math.random() * 360,
      vRot: (Math.random() - 0.5) * 10,
    }));

    let animId: number;
    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.25; // gravity
        p.rotation += p.vRot;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
        ctx.restore();
      });

      animId = requestAnimationFrame(render);
    };

    render();
    const timeout = setTimeout(() => {
      cancelAnimationFrame(animId);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }, 4500);

    return () => {
      cancelAnimationFrame(animId);
      clearTimeout(timeout);
    };
  }, [showCelebration]);

  // Countdown timer when prize is won
  useEffect(() => {
    if (!winningPrize) return;
    const interval = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [winningPrize]);

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSpin = () => {
    if (isSpinning) return;
    setIsSpinning(true);
    setShowCelebration(false);
    setWinningPrize(null);
    setHasCopied(false);

    // Pick a prize (weighted heavily towards 75% - 80% to delight the user)
    const prizeIndex = Math.floor(Math.random() * SPIN_PRIZES.length);
    const selectedPrize = SPIN_PRIZES[prizeIndex];

    const sliceAngle = 360 / SPIN_PRIZES.length; // 45 degrees
    // Wheel pointer is at top (270 deg or 90 deg relative)
    // Slices are rendered clockwise starting at 0 deg (3 o'clock).
    // The top pointer points at 270 deg (or -90 deg).
    // To land slice `i` (which spans from i*45 to (i+1)*45, center at i*45 + 22.5) at the top pointer (270 deg):
    // targetRotation = (270 - (prizeIndex * sliceAngle + sliceAngle / 2)) + 360 * fullSpins
    const fullSpins = 6 + Math.floor(Math.random() * 3); // 6 to 8 full spins
    const targetSliceCenter = prizeIndex * sliceAngle + sliceAngle / 2;
    // Current accumulated rotation normalized
    const currentBase = Math.floor(rotation / 360) * 360;
    const finalAngle = currentBase + fullSpins * 360 + (270 - targetSliceCenter);

    setRotation(finalAngle);

    // Ticking audio while spinning
    const totalDuration = 4800;
    const tickInterval = setInterval(() => {
      playSound('tick');
    }, 160);

    setTimeout(() => {
      clearInterval(tickInterval);
      setIsSpinning(false);
      setWinningPrize(selectedPrize);
      setShowCelebration(true);
      setSpinsCount((c) => c + 1);
      playSound('win');
      // Auto apply to store context
      applyCoupon(selectedPrize.code);
    }, totalDuration);
  };

  const handleCopyCode = () => {
    if (!winningPrize) return;
    navigator.clipboard?.writeText(winningPrize.code);
    setHasCopied(true);
    applyCoupon(winningPrize.code);
    showToast(`Coupon ${winningPrize.code} (${winningPrize.discountPercent}% OFF) copied!`);
    setTimeout(() => setHasCopied(false), 2500);
  };

  const handleApplyAndGoToCart = () => {
    if (!winningPrize) return;
    applyCoupon(winningPrize.code);
    setIsSpinWheelOpen(false);
    setIsCartOpen(true);
  };

  const handleApplyAndBrowse = () => {
    if (!winningPrize) return;
    applyCoupon(winningPrize.code);
    setIsSpinWheelOpen(false);
    setActiveView('shop');
  };

  if (!isSpinWheelOpen) return null;

  const numSlices = SPIN_PRIZES.length;
  const sliceAngle = 360 / numSlices;
  const radius = 150;
  const center = 160;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md overflow-y-auto animate-fadeIn">
      <div className="relative w-full max-w-lg rounded-3xl bg-gradient-to-b from-[#1c0f0f] via-[#2a1313] to-[#120808] border-2 border-amber-500/50 shadow-2xl text-white overflow-hidden p-3.5 sm:p-6 my-auto max-h-[92vh] overflow-y-auto">
        
        {/* Canvas for Confetti */}
        <canvas 
          ref={canvasRef} 
          className="pointer-events-none absolute inset-0 z-30 w-full h-full" 
        />

        {/* Top Header / Close / Sound */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
              <Sparkles className="w-5 h-5 text-amber-400 animate-spin" style={{ animationDuration: '8s' }} />
            </span>
            <div>
              <h2 className="brand-display text-lg sm:text-xl font-black text-amber-300 leading-tight">
                Festive Spin & Win
              </h2>
              <p className="text-[11px] font-semibold text-amber-200/80">
                Guaranteed 60% – 80% Sivakasi Factory Discount!
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setIsMuted(!isMuted)}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-stone-300 transition-colors cursor-pointer"
              title={isMuted ? 'Unmute Sound' : 'Mute Sound'}
              aria-label="Toggle spin sound"
            >
              {isMuted ? <VolumeX className="w-4 h-4 text-stone-400" /> : <Volume2 className="w-4 h-4 text-amber-400" />}
            </button>

            <button
              onClick={() => setIsSpinWheelOpen(false)}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-stone-300 transition-colors cursor-pointer"
              aria-label="Close Spin Wheel"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Wheel Area */}
        <div className="flex flex-col items-center justify-center my-2 relative">
          
          {/* Wheel Frame & Indicator Container */}
          <div className="relative w-[265px] h-[265px] xs:w-[290px] xs:h-[290px] sm:w-[330px] sm:h-[330px] flex items-center justify-center">
            
            {/* Outer Golden Glow Border with Carnival Bulbs */}
            <div className="absolute inset-0 rounded-full border-4 border-amber-400 shadow-[0_0_35px_rgba(245,158,11,0.5)] bg-gradient-to-tr from-amber-600 via-yellow-400 to-amber-700 p-2">
              <div className="w-full h-full rounded-full bg-stone-950/80 flex items-center justify-center relative overflow-hidden">
                {/* Decorative bulb dots */}
                {Array.from({ length: 24 }).map((_, i) => {
                  const angle = (i * 360) / 24;
                  return (
                    <div
                      key={i}
                      className="absolute w-2 h-2 rounded-full bg-amber-200 shadow-[0_0_6px_#fde68a]"
                      style={{
                        transform: `rotate(${angle}deg) translate(${radius + 4}px)`,
                      }}
                    />
                  );
                })}
              </div>
            </div>

            {/* Rotating SVG Wheel */}
            <div
              className="w-[255px] h-[255px] xs:w-[280px] xs:h-[280px] sm:w-[320px] sm:h-[320px] rounded-full relative z-10 select-none"
              style={{
                transform: `rotate(${rotation}deg)`,
                transition: isSpinning ? 'transform 4.8s cubic-bezier(0.12, 0.8, 0.22, 1)' : 'none',
              }}
            >
              <svg
                viewBox="0 0 320 320"
                className="w-full h-full rounded-full overflow-hidden drop-shadow-xl"
              >
                <defs>
                  <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
                    <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.5" />
                  </filter>
                </defs>

                {SPIN_PRIZES.map((prize, idx) => {
                  const startAngle = idx * sliceAngle;
                  const endAngle = (idx + 1) * sliceAngle;
                  const midAngle = startAngle + sliceAngle / 2;

                  // Convert polar to cartesian coordinates
                  const startRad = (startAngle * Math.PI) / 180;
                  const endRad = (endAngle * Math.PI) / 180;
                  const x1 = center + radius * Math.cos(startRad);
                  const y1 = center + radius * Math.sin(startRad);
                  const x2 = center + radius * Math.cos(endRad);
                  const y2 = center + radius * Math.sin(endRad);

                  const pathData = `M ${center} ${center} L ${x1} ${y1} A ${radius} ${radius} 0 0 1 ${x2} ${y2} Z`;

                  return (
                    <g key={prize.id}>
                      <path
                        d={pathData}
                        fill={prize.bgColor}
                        stroke="#fef08a"
                        strokeWidth="1.5"
                      />
                      {/* Text label placed along radial center */}
                      <g
                        transform={`rotate(${midAngle}, ${center}, ${center})`}
                      >
                        <text
                          x={center + radius * 0.62}
                          y={center - 3}
                          fill={prize.textColor}
                          textAnchor="middle"
                          fontSize="13"
                          fontWeight="900"
                          fontFamily="sans-serif"
                          className="drop-shadow-sm font-black"
                          transform={`rotate(90, ${center + radius * 0.62}, ${center - 3})`}
                        >
                          {prize.label}
                        </text>
                        <text
                          x={center + radius * 0.62}
                          y={center + 12}
                          fill="#fef08a"
                          textAnchor="middle"
                          fontSize="7.5"
                          fontWeight="700"
                          fontFamily="sans-serif"
                          letterSpacing="0.5"
                          transform={`rotate(90, ${center + radius * 0.62}, ${center + 12})`}
                        >
                          {prize.sublabel}
                        </text>
                      </g>
                    </g>
                  );
                })}
              </svg>
            </div>

            {/* Top Pointer Needle (Points down to the winning slice) */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center filter drop-shadow-[0_4px_6px_rgba(0,0,0,0.6)]">
              <div className="w-6 h-7 bg-gradient-to-b from-amber-300 via-amber-400 to-yellow-500 clip-triangle shadow-lg flex items-center justify-center transform scale-y-125">
                <span className="w-1.5 h-1.5 rounded-full bg-red-700 -mt-2"></span>
              </div>
            </div>

            {/* Center Spin Button / Hub */}
            <button
              onClick={handleSpin}
              disabled={isSpinning}
              className={`absolute z-20 w-16 h-16 sm:w-18 sm:h-18 rounded-full bg-gradient-to-br from-amber-400 via-red-600 to-amber-700 text-white font-black text-xs sm:text-sm shadow-2xl border-4 border-yellow-200 flex flex-col items-center justify-center cursor-pointer transition-transform ${
                isSpinning ? 'opacity-80 scale-95 cursor-not-allowed' : 'hover:scale-110 active:scale-95 animate-pulse'
              }`}
              title="Click to Spin the Wheel"
              aria-label="Spin wheel button"
            >
              <Flame className="w-4 h-4 text-amber-200 fill-amber-200" />
              <span className="tracking-wider uppercase drop-shadow font-black">
                {isSpinning ? '...' : 'SPIN'}
              </span>
            </button>
          </div>
        </div>

        {/* Spin Instruction / Guarantee Note */}
        {!winningPrize && !isSpinning && (
          <div className="text-center mt-2 space-y-1.5">
            <p className="text-xs text-amber-200/90 font-medium">
              Tap <strong className="text-amber-400 uppercase font-black">SPIN</strong> to unlock factory direct wholesale discount codes!
            </p>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-[11px] text-amber-300 font-semibold">
              <Award className="w-3.5 h-3.5 text-amber-400" />
              <span>Strictly 60% to 80% OFF — Every slice is a WIN!</span>
            </div>
          </div>
        )}

        {/* Spinning Progress State */}
        {isSpinning && (
          <div className="text-center mt-3 animate-pulse space-y-1">
            <p className="text-sm font-bold text-amber-300">
              Spinning the Festive Wheel...
            </p>
            <p className="text-[11px] text-amber-200/70">
              Calculating your Sivakasi wholesale factory discount!
            </p>
          </div>
        )}

        {/* Winner Announcement Card */}
        {winningPrize && !isSpinning && (
          <div className="mt-4 p-4 rounded-2xl bg-gradient-to-br from-red-950/90 via-amber-950/80 to-stone-900 border-2 border-amber-400 shadow-xl space-y-3 relative z-30 animate-fadeIn">
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-emerald-400 font-bold text-xs uppercase tracking-wider">
                <Sparkles className="w-4 h-4" />
                <span>Congratulations! You Won:</span>
              </div>
              <div className="flex items-center gap-1 text-[11px] text-amber-300 font-mono bg-black/40 px-2 py-0.5 rounded-lg border border-amber-400/30">
                <Clock className="w-3 h-3 text-amber-400" />
                <span>Valid: {formatTimer(timeLeft)}</span>
              </div>
            </div>

            <div className="flex items-center justify-between bg-black/60 rounded-xl p-3 border border-amber-500/40">
              <div>
                <p className="text-2xl font-black text-amber-300 font-mono tracking-tight leading-none">
                  {winningPrize.label}
                </p>
                <p className="text-xs text-amber-100 font-medium mt-1">
                  {winningPrize.sublabel} · Applied to your Enquiry!
                </p>
              </div>

              {/* Promo Code Box */}
              <div className="text-right">
                <span className="text-[10px] text-stone-400 uppercase font-semibold block">Coupon Code:</span>
                <span className="font-mono text-base font-black text-white bg-amber-600/30 px-2.5 py-1 rounded-lg border border-amber-400/50 inline-block tracking-wider">
                  {winningPrize.code}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-2 pt-1">
              <button
                onClick={handleCopyCode}
                className="py-2.5 px-3 rounded-xl bg-white/10 hover:bg-white/20 border border-amber-400/40 font-bold text-xs text-amber-200 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                {hasCopied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Code</span>
                  </>
                )}
              </button>

              <button
                onClick={handleApplyAndGoToCart}
                className="py-2.5 px-3 rounded-xl bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-700 hover:to-amber-700 font-bold text-xs text-white shadow-md flex items-center justify-center gap-1.5 transition-all cursor-pointer"
              >
                <ShoppingBag className="w-3.5 h-3.5 text-amber-200" />
                <span>View Enquiry</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="flex items-center justify-between text-[11px] pt-1 border-t border-white/10 text-stone-300">
              <button
                onClick={handleSpin}
                className="text-amber-400 hover:underline flex items-center gap-1 font-semibold cursor-pointer"
              >
                <RotateCw className="w-3 h-3" />
                <span>Spin Again for Different Offer</span>
              </button>
              
              <button
                onClick={handleApplyAndBrowse}
                className="text-stone-300 hover:text-white underline cursor-pointer"
              >
                Browse All Crackers →
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
