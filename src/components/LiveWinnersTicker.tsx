import React, { useState, useEffect } from 'react';
import { Gift, Sparkles, Trophy } from 'lucide-react';
import { FakeWinner } from '../types';
import { INITIAL_FAKE_WINNERS } from '../data/wheelSegments';

export const LiveWinnersTicker: React.FC = () => {
  const [winners, setWinners] = useState<FakeWinner[]>(INITIAL_FAKE_WINNERS);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % winners.length);
    }, 4000);

    return () => clearInterval(timer);
  }, [winners.length]);

  const current = winners[currentIndex];

  return (
    <div className="w-full max-w-sm mx-auto my-3 px-3">
      <div className="relative overflow-hidden rounded-2xl bg-slate-900/90 border border-amber-500/30 p-2.5 shadow-lg backdrop-blur-md">
        <div className="flex items-center gap-3">
          
          {/* Badge */}
          <div className="flex-shrink-0 w-8 h-8 rounded-xl bg-gradient-to-br from-amber-400 to-yellow-600 flex items-center justify-center text-slate-950 font-bold shadow">
            <Trophy size={16} />
          </div>

          {/* Winner Content Animation */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-1 text-[11px] text-amber-400 font-semibold mb-0.5">
              <span className="flex items-center gap-1 truncate">
                <Sparkles size={12} className="text-yellow-300 animate-spin" />
                সরাসরি জয়ী তালিকা
              </span>
              <span className="text-[10px] text-slate-400 font-normal">
                {current.timeAgo}
              </span>
            </div>
            
            <p className="text-xs text-white font-bold truncate">
              গ্রাহক <span className="text-amber-300">{current.phone}</span> জিতেছেন{' '}
              <span className="text-emerald-400 bg-emerald-950/60 px-1.5 py-0.5 rounded border border-emerald-500/30">
                {current.prize}
              </span>
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};
