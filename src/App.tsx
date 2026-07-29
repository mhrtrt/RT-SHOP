import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, HelpCircle, Gift, Trophy, Sparkles, ExternalLink, ShieldCheck, Flame } from 'lucide-react';
import { LuckyWheel } from './components/LuckyWheel';
import { AdModal } from './components/AdModal';
import { AdSettingsModal } from './components/AdSettingsModal';
import { GithubDeployGuideModal } from './components/GithubDeployGuideModal';
import { LiveWinnersTicker } from './components/LiveWinnersTicker';
import { WHEEL_SEGMENTS } from './data/wheelSegments';
import { AdConfig } from './types';
import { soundFx } from './utils/audio';

export default function App() {
  // App state
  const [spinsLeft, setSpinsLeft] = useState<number>(3);
  const [totalSpinAttempts, setTotalSpinAttempts] = useState<number>(0);
  const [isSpinning, setIsSpinning] = useState<boolean>(false);
  const [currentTargetIndex, setCurrentTargetIndex] = useState<number | null>(null);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);

  // Modals state
  const [activeModalType, setActiveModalType] = useState<'ad_cancelled' | 'ad_sorry' | 'extra_spins' | null>(null);
  const [isAdSettingsOpen, setIsAdSettingsOpen] = useState<boolean>(false);
  const [isDeployGuideOpen, setIsDeployGuideOpen] = useState<boolean>(false);

  // Adsterra Configuration
  const [adConfig, setAdConfig] = useState<AdConfig>({
    directLinkUrl: '',
    bannerScriptCode: '',
    autoOpenTab: true,
    simulatedAdSeconds: 3
  });

  // Check URL path or hash for secret settings route (/11111111/setting or #11111111/setting)
  useEffect(() => {
    const checkSecretRoute = () => {
      const url = window.location.href.toLowerCase();
      if (url.includes('11111111') || url.includes('/setting')) {
        setIsAdSettingsOpen(true);
      }
    };

    checkSecretRoute();
    window.addEventListener('hashchange', checkSecretRoute);
    window.addEventListener('popstate', checkSecretRoute);

    return () => {
      window.removeEventListener('hashchange', checkSecretRoute);
      window.removeEventListener('popstate', checkSecretRoute);
    };
  }, []);

  // Sound toggle
  const toggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    soundFx.enabled = next;
  };

  // Rigged spin logic requested by user
  const handleSpinStart = () => {
    if (isSpinning || spinsLeft <= 0) return;

    setIsSpinning(true);
    setSpinsLeft((prev) => Math.max(0, prev - 1));

    // Determine target slice based on current cycle count (totalSpinAttempts % 3)
    const cycleStep = totalSpinAttempts % 3;
    let targetIdx = 0;

    if (cycleStep === 0) {
      // 1st Spin in cycle: Lands on Refrigerator (index 0)
      targetIdx = 0;
    } else if (cycleStep === 1) {
      // 2nd Spin in cycle: Lands on "দুঃখিত" (index 1)
      targetIdx = 1;
    } else {
      // 3rd Spin in cycle: Lands on "+৩ টি স্পিন" (index 6)
      targetIdx = 6;
    }

    setCurrentTargetIndex(targetIdx);
  };

  // Spin complete handler called when wheel animation finishes
  const handleSpinComplete = () => {
    setIsSpinning(false);
    const cycleStep = totalSpinAttempts % 3;

    if (cycleStep === 0) {
      setActiveModalType('ad_cancelled');
    } else if (cycleStep === 1) {
      setActiveModalType('ad_sorry');
    } else {
      setActiveModalType('extra_spins');
    }

    setTotalSpinAttempts((prev) => prev + 1);
  };

  const handleClaimExtraSpins = () => {
    setSpinsLeft((prev) => prev + 3);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-between font-sans selection:bg-amber-500 selection:text-slate-950 overflow-x-hidden">
      
      {/* Mobile-First Constrained Wrapper */}
      <div className="w-full max-w-md mx-auto min-h-screen flex flex-col justify-between px-3 py-3 sm:px-4">
        
        {/* ================= HEADER BAR ================= */}
        <header className="flex items-center justify-between pb-2 border-b border-slate-800/80">
          
          {/* Logo Badge */}
          <div
            className="flex items-center gap-2 select-none"
            title="লকি স্পিন অফার"
          >
            <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-amber-500 via-yellow-400 to-amber-600 flex items-center justify-center text-slate-950 font-black shadow-lg shadow-amber-900/40">
              <Trophy size={20} />
            </div>
            <div>
              <h1 className="font-extrabold text-sm sm:text-base text-amber-400 leading-tight flex items-center gap-1">
                লকি স্পিন অফার
                <Sparkles size={14} className="text-yellow-300" />
              </h1>
              <span className="text-[10px] text-slate-400 font-medium">অফিশিয়াল গিভওয়ে ২০২৬</span>
            </div>
          </div>

          {/* Action Buttons (Clean UI for end users) */}
          <div className="flex items-center gap-1.5">
            
            {/* Audio Toggle */}
            <button
              onClick={toggleSound}
              className="p-2 rounded-xl bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-300 hover:text-amber-400 transition-colors cursor-pointer"
              title={soundEnabled ? 'সাউন্ড বন্ধ করুন' : 'সাউন্ড চালু করুন'}
            >
              {soundEnabled ? <Volume2 size={18} /> : <VolumeX size={18} />}
            </button>

          </div>
        </header>

        {/* ================= TOP AD BANNER SLOT (320x50 / Adsterra) ================= */}
        <div className="my-2 w-full p-2 rounded-2xl bg-slate-900/80 border border-amber-500/20 text-center flex flex-col items-center justify-center min-h-[54px] shadow-sm">
          {adConfig.bannerScriptCode ? (
            <div dangerouslySetInnerHTML={{ __html: adConfig.bannerScriptCode }} />
          ) : (
            <div className="flex items-center justify-between w-full text-xs px-2">
              <span className="text-[10px] bg-amber-500/20 text-amber-300 px-1.5 py-0.5 rounded font-bold">SPONSOR</span>
              <span className="text-slate-300 font-medium truncate mx-2">🔥 প্রতিদিন ফ্রি স্পিন করে ৫০০০ টাকা পর্যন্ত জিতুন!</span>
              <a
                href={adConfig.directLinkUrl || '#'}
                target="_blank"
                rel="noreferrer"
                className="text-[10px] bg-amber-500 text-slate-950 font-bold px-2 py-1 rounded-lg shrink-0 flex items-center gap-0.5"
              >
                <span>দেখুন</span>
                <ExternalLink size={10} />
              </a>
            </div>
          )}
        </div>

        {/* ================= MAIN CONTENT ================= */}
        <main className="flex-1 flex flex-col items-center justify-center my-1 space-y-3">
          
          {/* Main Headline requested by user */}
          <div className="text-center space-y-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-amber-500/20 via-yellow-500/20 to-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-bold shadow-sm animate-pulse">
              <Flame size={14} className="text-amber-400" />
              <span>আজকের মেগা মেলা স্পিন</span>
            </div>

            {/* Exact headline requested by user */}
            <h2 className="text-xl sm:text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-amber-300 to-yellow-100 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] tracking-tight px-2">
              নিচে স্পিন করে জিতুন আকর্ষণীয় পুরস্কার
            </h2>
          </div>

          {/* Spins Remaining Badge */}
          <div className="flex items-center gap-3 px-4 py-1.5 rounded-full bg-slate-900 border border-amber-500/40 text-amber-300 font-extrabold text-xs sm:text-sm shadow-md">
            <Gift size={16} className="text-yellow-400" />
            <span>অবশিষ্ট স্পিন: <strong className="text-white text-base ml-1">{spinsLeft}</strong> টি</span>
          </div>

          {/* LUCKY WHEEL COMPONENT */}
          <LuckyWheel
            segments={WHEEL_SEGMENTS}
            isSpinning={isSpinning}
            targetIndex={currentTargetIndex}
            onSpinStart={handleSpinStart}
            onSpinComplete={handleSpinComplete}
            disabled={spinsLeft <= 0}
            spinsLeft={spinsLeft}
          />

          {/* No Spins Warning / Get Extra Spins */}
          {spinsLeft <= 0 && !isSpinning && (
            <div className="p-3 rounded-2xl bg-red-950/80 border border-red-800 text-center space-y-2 animate-bounce">
              <p className="text-xs text-red-200 font-bold">
                আপনার স্পিন শেষ হয়ে গেছে! আবার ৩টি স্পিন পেতে নিচের বাটনে ক্লিক করুন।
              </p>
              <button
                onClick={() => setSpinsLeft(3)}
                className="py-2 px-5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 font-black text-xs shadow-lg cursor-pointer hover:scale-105 transition-transform"
              >
                ফ্রি ৩টি স্পিন নিন (+৩)
              </button>
            </div>
          )}

          {/* LIVE WINNERS TICKER */}
          <LiveWinnersTicker />

          {/* AVAILABLE GIFTS SHOWCASE GRID WITH ATTRACTIVE REAL IMAGES */}
          <div className="w-full mt-2 p-3.5 rounded-2xl bg-slate-900/80 border border-amber-500/30 space-y-2.5 shadow-xl">
            <div className="flex items-center justify-between text-xs text-amber-400 font-bold px-1">
              <span className="flex items-center gap-1.5">
                <Sparkles size={14} className="text-yellow-300" />
                আকর্ষণীয় পুরস্কারসমূহ:
              </span>
              <span className="text-[10px] text-emerald-400 bg-emerald-950/80 border border-emerald-500/40 px-2 py-0.5 rounded-full font-semibold">
                ১০০% ফ্রি ডেলিভারি
              </span>
            </div>

            <div className="grid grid-cols-4 gap-2 text-center text-[10px]">
              
              {/* Product 1: AirPods Pro */}
              <div className="p-2 rounded-xl bg-slate-950 border border-slate-800 hover:border-amber-500/40 transition-colors flex flex-col items-center">
                <div className="w-12 h-12 mb-1.5 rounded-lg overflow-hidden border border-amber-500/30 bg-slate-900 shadow">
                  <img
                    src="https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?auto=format&fit=crop&w=200&q=80"
                    alt="AirPods Pro"
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="font-bold text-slate-200 truncate w-full">AirPods Pro</span>
                <span className="text-[9px] text-amber-400 font-semibold mt-0.5">অরিজিনাল</span>
              </div>

              {/* Product 2: Realme C75 */}
              <div className="p-2 rounded-xl bg-slate-950 border border-slate-800 hover:border-amber-500/40 transition-colors flex flex-col items-center">
                <div className="w-12 h-12 mb-1.5 rounded-lg overflow-hidden border border-amber-500/30 bg-slate-900 shadow">
                  <img
                    src="https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=200&q=80"
                    alt="Realme C75"
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="font-bold text-slate-200 truncate w-full">Realme C75</span>
                <span className="text-[9px] text-blue-400 font-semibold mt-0.5">স্মার্টফোন</span>
              </div>

              {/* Product 3: Refrigerator */}
              <div className="p-2 rounded-xl bg-slate-950 border border-slate-800 hover:border-amber-500/40 transition-colors flex flex-col items-center">
                <div className="w-12 h-12 mb-1.5 rounded-lg overflow-hidden border border-amber-500/30 bg-slate-900 shadow">
                  <img
                    src="https://images.unsplash.com/photo-1584992236310-6edddc08acff?auto=format&fit=crop&w=200&q=80"
                    alt="রেফ্রিজারেটর"
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="font-bold text-slate-200 truncate w-full">রেফ্রিজারেটর</span>
                <span className="text-[9px] text-red-400 font-semibold mt-0.5">ডাবল ডোর</span>
              </div>

              {/* Product 4: Blender */}
              <div className="p-2 rounded-xl bg-slate-950 border border-slate-800 hover:border-amber-500/40 transition-colors flex flex-col items-center">
                <div className="w-12 h-12 mb-1.5 rounded-lg overflow-hidden border border-amber-500/30 bg-slate-900 shadow">
                  <img
                    src="https://images.unsplash.com/photo-1570222094114-d054a817e56b?auto=format&fit=crop&w=200&q=80"
                    alt="ব্লেন্ডার"
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="font-bold text-slate-200 truncate w-full">ব্লেন্ডার</span>
                <span className="text-[9px] text-purple-400 font-semibold mt-0.5">স্মার্ট ৩ ইন ১</span>
              </div>

            </div>
          </div>

        </main>

        {/* ================= FOOTER ================= */}
        <footer className="pt-2 pb-1 border-t border-slate-800/80 text-center space-y-1 text-[11px] text-slate-500">
          <div className="flex items-center justify-center gap-3 text-slate-400">
            <span className="flex items-center gap-1">
              <ShieldCheck size={12} className="text-emerald-400" /> সিকিউর ওয়েবসাইট
            </span>
            <span>•</span>
            <span>গিটহাব ফ্রী হোস্টিং</span>
          </div>
          <p>© 2026 লকি স্পিন কন্টেস্ট। সর্বস্বত্ব সংরক্ষিত।</p>
        </footer>

      </div>

      {/* ================= MODALS ================= */}
      <AdModal
        isOpen={activeModalType !== null}
        type={activeModalType || 'ad_cancelled'}
        adConfig={adConfig}
        onClose={() => setActiveModalType(null)}
        onClaimExtraSpins={handleClaimExtraSpins}
      />

      <AdSettingsModal
        isOpen={isAdSettingsOpen}
        onClose={() => setIsAdSettingsOpen(false)}
        config={adConfig}
        onSaveConfig={setAdConfig}
        onOpenDeployGuide={() => setIsDeployGuideOpen(true)}
      />

      <GithubDeployGuideModal
        isOpen={isDeployGuideOpen}
        onClose={() => setIsDeployGuideOpen(false)}
      />

    </div>
  );
}
