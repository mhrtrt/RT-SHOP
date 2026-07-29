import React, { useRef, useEffect } from 'react';
import { Headphones, Smartphone, Refrigerator, Zap, Frown, Gift, Sparkles } from 'lucide-react';
import { WheelSegment } from '../types';
import { soundFx } from '../utils/audio';

interface LuckyWheelProps {
  segments: WheelSegment[];
  isSpinning: boolean;
  targetIndex: number | null;
  onSpinStart: () => void;
  onSpinComplete: () => void;
  disabled: boolean;
  spinsLeft: number;
}

export const LuckyWheel: React.FC<LuckyWheelProps> = ({
  segments,
  isSpinning,
  targetIndex,
  onSpinStart,
  onSpinComplete,
  disabled,
  spinsLeft
}) => {
  const wheelRef = useRef<SVGGElement | null>(null);
  const currentRotationRef = useRef<number>(0);
  const totalSegments = segments.length;
  const segmentAngle = 360 / totalSegments;

  // Sound ticking logic during spin
  useEffect(() => {
    if (!isSpinning) return;

    let intervalId: NodeJS.Timeout;
    let tickCount = 0;
    const maxTicks = 35;
    let delay = 60;

    const playNextTick = () => {
      soundFx.playTick();
      tickCount++;
      if (tickCount < maxTicks && isSpinning) {
        delay += tickCount * 3.5; // Exponential slowdown effect
        intervalId = setTimeout(playNextTick, delay);
      }
    };

    intervalId = setTimeout(playNextTick, delay);

    return () => clearTimeout(intervalId);
  }, [isSpinning]);

  // Handle spin execution when targetIndex changes
  useEffect(() => {
    if (isSpinning && targetIndex !== null && wheelRef.current) {
      // Calculate final rotation so target segment lands under 12 o'clock needle
      const centerAngle = targetIndex * segmentAngle + segmentAngle / 2;
      const targetDeg = 360 - centerAngle;
      
      // Add 6 full 360-degree rotations for maximum excitement
      const extraSpins = 6 * 360;
      
      // Calculate total cumulative rotation so it always spins forward
      const currentMod = currentRotationRef.current % 360;
      const neededDelta = (targetDeg - currentMod + 360) % 360;
      const finalRotation = currentRotationRef.current + extraSpins + neededDelta;
      
      currentRotationRef.current = finalRotation;

      wheelRef.current.style.transition = 'transform 4.5s cubic-bezier(0.15, 0.85, 0.15, 1)';
      wheelRef.current.style.transform = `rotate(${finalRotation}deg)`;

      const timer = setTimeout(() => {
        onSpinComplete();
      }, 4600);

      return () => clearTimeout(timer);
    }
  }, [isSpinning, targetIndex, segmentAngle, onSpinComplete]);

  // Helper to draw SVG pie slices
  const getSlicePath = (index: number) => {
    const startAngle = (index * segmentAngle - 90) * (Math.PI / 180);
    const endAngle = ((index + 1) * segmentAngle - 90) * (Math.PI / 180);
    const radius = 180;

    const x1 = 200 + radius * Math.cos(startAngle);
    const y1 = 200 + radius * Math.sin(startAngle);
    const x2 = 200 + radius * Math.cos(endAngle);
    const y2 = 200 + radius * Math.sin(endAngle);

    const largeArc = segmentAngle > 180 ? 1 : 0;

    return `M 200 200 L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2} Z`;
  };

  const renderSegmentIcon = (seg: WheelSegment) => {
    if (seg.imageUrl) {
      return (
        <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full border border-yellow-300/80 overflow-hidden bg-slate-950 shadow-md flex items-center justify-center">
          <img src={seg.imageUrl} alt={seg.label} className="w-full h-full object-cover" />
        </div>
      );
    }
    const size = 20;
    switch (seg.iconName) {
      case 'airpods':
        return <Headphones size={size} className="text-amber-200 drop-shadow" />;
      case 'phone':
        return <Smartphone size={size} className="text-blue-200 drop-shadow" />;
      case 'fridge':
        return <Refrigerator size={size} className="text-red-100 drop-shadow" />;
      case 'blender':
        return <Zap size={size} className="text-purple-200 drop-shadow" />;
      case 'sorry':
        return <Frown size={size} className="text-slate-300 drop-shadow" />;
      case 'spins':
        return <Gift size={size} className="text-emerald-200 drop-shadow" />;
      default:
        return <Sparkles size={size} className="text-yellow-300" />;
    }
  };

  // Generate outer LED bulbs
  const bulbCount = 20;
  const bulbs = Array.from({ length: bulbCount });

  return (
    <div className="relative w-full max-w-[340px] xs:max-w-[380px] sm:max-w-[420px] aspect-square mx-auto my-2 flex items-center justify-center select-none">
      
      {/* Outer Glowing Decorative Aura */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-amber-500/20 via-yellow-500/10 to-red-500/20 blur-xl animate-pulse" />

      {/* Wheel Container Frame */}
      <div className="relative w-full h-full p-3 rounded-full bg-gradient-to-b from-yellow-600 via-amber-500 to-amber-700 shadow-2xl shadow-amber-900/60 border-4 border-yellow-300">
        
        {/* Inner Casino Rim with LED Lights */}
        <div className="relative w-full h-full rounded-full bg-slate-900 overflow-hidden shadow-inner border-4 border-amber-900">
          
          {/* Flashing Outer LED Bulbs */}
          {bulbs.map((_, i) => {
            const angle = (i * (360 / bulbCount)) * (Math.PI / 180);
            const r = 46.5; // percentage radius
            const left = 50 + r * Math.cos(angle);
            const top = 50 + r * Math.sin(angle);
            const isEven = i % 2 === 0;

            return (
              <div
                key={i}
                className={`absolute w-2.5 h-2.5 rounded-full -translate-x-1/2 -translate-y-1/2 z-10 transition-all duration-300 ${
                  isSpinning
                    ? isEven
                      ? 'bg-yellow-300 shadow-[0_0_8px_#fde047]'
                      : 'bg-white shadow-[0_0_8px_#ffffff]'
                    : 'bg-yellow-400 shadow-[0_0_4px_#facc15]'
                }`}
                style={{ left: `${left}%`, top: `${top}%` }}
              />
            );
          })}

          {/* Rotating SVG Wheel Canvas */}
          <svg viewBox="0 0 400 400" className="w-full h-full overflow-visible">
            <g ref={wheelRef} style={{ transformOrigin: '200px 200px' }}>
              {segments.map((seg, i) => {
                const angle = i * segmentAngle + segmentAngle / 2;
                const rad = (angle - 90) * (Math.PI / 180);
                // Center offset for text and icon placement inside slice
                const textRadius = 120;
                const textX = 200 + textRadius * Math.cos(rad);
                const textY = 200 + textRadius * Math.sin(rad);

                return (
                  <g key={seg.id || i}>
                    {/* Slice Path */}
                    <path
                      d={getSlicePath(i)}
                      fill={seg.bgColor}
                      stroke="#fbbf24"
                      strokeWidth="2.5"
                    />
                    
                    {/* Separator Divider Glow Line */}
                    <line
                      x1="200"
                      y1="200"
                      x2={200 + 180 * Math.cos((i * segmentAngle - 90) * (Math.PI / 180))}
                      y2={200 + 180 * Math.sin((i * segmentAngle - 90) * (Math.PI / 180))}
                      stroke="#fef08a"
                      strokeWidth="1.5"
                      strokeOpacity="0.6"
                    />

                    {/* Rotated Segment Content (Text + Icon) */}
                    <g transform={`translate(${textX}, ${textY}) rotate(${angle + 90})`}>
                      <foreignObject x="-45" y="-32" width="90" height="64">
                        <div className="flex flex-col items-center justify-center h-full text-center px-0.5">
                          <div className="mb-0.5 transform scale-90 sm:scale-100">
                            {renderSegmentIcon(seg)}
                          </div>
                          <span
                            className="font-bold text-[11px] sm:text-[13px] leading-tight drop-shadow-md tracking-tight truncate max-w-full"
                            style={{ color: seg.textColor }}
                          >
                            {seg.label}
                          </span>
                          {seg.subLabel && (
                            <span
                              className="text-[9px] sm:text-[10px] font-semibold opacity-95 leading-none mt-0.5 truncate max-w-full"
                              style={{ color: seg.textColor }}
                            >
                              {seg.subLabel}
                            </span>
                          )}
                        </div>
                      </foreignObject>
                    </g>
                  </g>
                );
              })}
            </g>
          </svg>

          {/* Center Hub & Spin Button */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
            <button
              onClick={onSpinStart}
              disabled={disabled || isSpinning || spinsLeft <= 0}
              className={`relative group w-20 h-20 sm:w-24 sm:h-24 rounded-full flex flex-col items-center justify-center font-bold transition-all duration-200 shadow-2xl active:scale-95 border-4 ${
                disabled || spinsLeft <= 0
                  ? 'bg-slate-700 border-slate-500 text-slate-400 cursor-not-allowed'
                  : isSpinning
                  ? 'bg-amber-600 border-yellow-300 text-yellow-100 cursor-wait animate-pulse'
                  : 'bg-gradient-to-b from-red-500 via-rose-600 to-red-700 hover:from-red-400 hover:to-red-600 border-yellow-300 text-white shadow-red-900/80 cursor-pointer animate-bounce'
              }`}
              id="spin-button"
            >
              {/* Button Outer Ring Glow */}
              <div className="absolute inset-0 rounded-full border-2 border-amber-200/50 pointer-events-none" />
              
              <span className="text-base sm:text-lg font-extrabold tracking-wider drop-shadow-md">
                {isSpinning ? 'ঘুরছে...' : 'স্পিন'}
              </span>
              <span className="text-[10px] sm:text-[11px] font-medium opacity-90 text-amber-200">
                {isSpinning ? 'অপেক্ষা করুন' : 'ক্লিক করুন'}
              </span>
            </button>
          </div>

        </div>
      </div>

      {/* Top Metallic Pointer Needle (Points directly down onto top segment at 12 o'clock) */}
      <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center pointer-events-none filter drop-shadow-[0_4px_8px_rgba(0,0,0,0.6)]">
        {/* Needle Top Cap */}
        <div className="w-8 h-8 rounded-full bg-gradient-to-b from-yellow-200 via-amber-400 to-yellow-600 border-2 border-yellow-100 flex items-center justify-center shadow-lg">
          <div className="w-3 h-3 rounded-full bg-red-600 border border-yellow-200 shadow-inner" />
        </div>
        {/* Downward Needle Tip */}
        <div className="w-0 h-0 -mt-2.5 border-l-[14px] border-l-transparent border-r-[14px] border-r-transparent border-t-[26px] border-t-yellow-400 filter drop-shadow" />
      </div>

    </div>
  );
};
