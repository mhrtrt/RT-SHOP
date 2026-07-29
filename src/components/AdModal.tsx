import React, { useState, useEffect } from 'react';
import { AlertTriangle, Gift, ExternalLink, X, CheckCircle2, Frown, ShieldAlert, Play, Video } from 'lucide-react';
import confetti from 'canvas-confetti';
import { AdConfig } from '../types';
import { soundFx } from '../utils/audio';

interface AdModalProps {
  isOpen: boolean;
  type: 'ad_cancelled' | 'ad_sorry' | 'extra_spins';
  adConfig: AdConfig;
  onClose: () => void;
  onClaimExtraSpins: () => void;
}

export const AdModal: React.FC<AdModalProps> = ({
  isOpen,
  type,
  adConfig,
  onClose,
  onClaimExtraSpins
}) => {
  const [adStage, setAdStage] = useState<'watching_ad' | 'result_notice'>('watching_ad');
  const [countdown, setCountdown] = useState<number>(3);
  const [adClicked, setAdClicked] = useState<boolean>(false);

  // Trigger ad opening and setup countdown when modal opens
  useEffect(() => {
    if (!isOpen) return;

    if (type === 'extra_spins') {
      // Extra spins: no ad penalty! Directly show celebration
      setAdStage('result_notice');
      soundFx.playFanfare();
      
      // Fire confetti burst
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
      return;
    }

    // For Spin 1 & Spin 2: Auto-open Smartlink and directly show result notice
    setAdStage('result_notice');

    // Auto-open Smartlink / Direct Link immediately when spin stops
    const smartlink = adConfig.directLinkUrl || 'https://www.google.com';
    if (adConfig.autoOpenTab !== false) {
      try {
        window.open(smartlink, '_blank', 'noopener,noreferrer');
      } catch {
        // Popups might be blocked by browser
      }
    }
    soundFx.playFail();
  }, [isOpen, type, adConfig]);

  if (!isOpen) return null;

  const handleAdButtonClick = () => {
    setAdClicked(true);
    if (adConfig.directLinkUrl) {
      window.open(adConfig.directLinkUrl, '_blank', 'noopener,noreferrer');
    }
  };

  const handleFinishAd = () => {
    soundFx.playFail();
    setAdStage('result_notice');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      
      {/* Modal Container */}
      <div className="relative w-full max-w-sm bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 border-2 border-amber-500/40 rounded-3xl p-6 shadow-2xl text-center text-white overflow-hidden">
        
        {/* Background Decorative Pattern */}
        <div className="absolute -top-12 -left-12 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-12 -right-12 w-32 h-32 bg-red-500/10 rounded-full blur-2xl pointer-events-none" />

        {/* ================= STAGE 1: WATCHING SMARTLINK / VIDEO AD ================= */}
        {adStage === 'watching_ad' && (
          <div className="space-y-4">
            
            {/* Ad Header */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/30 text-amber-300 text-xs font-semibold">
              <Video size={14} className="animate-pulse text-red-400" />
              <span>স্মার্টলিংক ভিডিও বিজ্ঞাপন ভেরিফিকেশন</span>
            </div>

            {/* Video Player Simulation Box */}
            <div className="relative p-4 rounded-2xl bg-slate-950 border border-amber-500/40 text-left space-y-3 shadow-inner overflow-hidden">
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase font-bold tracking-wider text-red-400 bg-red-950/80 px-2 py-0.5 rounded flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />
                  Smartlink Video
                </span>
                <span className="text-xs text-amber-300 font-bold">
                  {countdown > 0 ? `ভিডিও লোড হচ্ছে... ${countdown}s` : 'সম্পূর্ণ প্রস্তুত!'}
                </span>
              </div>

              {/* Fake Video Player Screen */}
              <div
                onClick={handleAdButtonClick}
                className="relative w-full h-28 rounded-xl bg-slate-900 border border-slate-800 flex flex-col items-center justify-center cursor-pointer group hover:border-amber-500/50 transition-colors overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent z-10" />
                
                {/* Play Icon */}
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-red-600 to-amber-500 flex items-center justify-center text-white shadow-lg shadow-red-900/60 z-20 group-hover:scale-110 transition-transform">
                  <Play size={22} className="ml-1 fill-white" />
                </div>

                <p className="z-20 text-[11px] font-bold text-yellow-300 mt-2">
                  ভিডিও বিজ্ঞাপন প্লে করতে এখানে ক্লিক করুন (SmartLink)
                </p>
              </div>

              <div className="space-y-1">
                <h4 className="font-bold text-sm text-yellow-300">
                  🎥 স্পন্সর ভিডিও এ্যাড লোড হচ্ছে...
                </h4>
                <p className="text-[11px] text-slate-300 leading-relaxed">
                  পুরস্কার নিশ্চিত করতে ভিডিও স্মার্টলিংক অপেন করে পুরোটি দেখা আবশ্যক।
                </p>
              </div>

              <button
                onClick={handleAdButtonClick}
                className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 hover:from-amber-400 hover:to-yellow-300 text-slate-950 font-extrabold text-xs sm:text-sm shadow-lg flex items-center justify-center gap-2 transition-transform active:scale-95 cursor-pointer"
              >
                <Play size={16} className="fill-slate-950" />
                <span>স্মার্টলিংক ভিডিও অপেন করুন (Watch Video)</span>
                <ExternalLink size={14} />
              </button>
            </div>

            {/* Complete Ad / Continue Button */}
            <button
              onClick={handleFinishAd}
              disabled={countdown > 0}
              className={`w-full py-3 rounded-2xl font-bold text-sm transition-all shadow-lg flex items-center justify-center gap-2 ${
                countdown > 0
                  ? 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
                  : 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white cursor-pointer shadow-emerald-900/50 active:scale-95'
              }`}
            >
              <span>{countdown > 0 ? `দয়া করে ${countdown} সেকেন্ড অপেক্ষা করুন...` : 'ভিডিও দেখা সম্পন্ন হয়েছে (ফলাফল দেখুন)'}</span>
            </button>
          </div>
        )}

        {/* ================= STAGE 2: RESULT NOTICE ================= */}
        {adStage === 'result_notice' && (
          <div className="space-y-5">
            
            {/* ICON & TITLE BY TYPE */}
            {type === 'ad_cancelled' && (
              <>
                <div className="w-16 h-16 mx-auto rounded-full bg-red-500/20 border-2 border-red-500 flex items-center justify-center text-red-400 animate-pulse">
                  <ShieldAlert size={36} />
                </div>
                <div>
                  <h3 className="text-xl font-extrabold text-red-400 mb-2">
                    পুরস্কার বাতিল করা হয়েছে!
                  </h3>
                  {/* Exact text requested by user */}
                  <div className="p-4 rounded-2xl bg-red-950/60 border border-red-800/60 text-slate-200 text-xs sm:text-sm font-medium leading-relaxed text-center">
                    "দুঃখিত, আপনি বিজ্ঞাপন পুরো না দেখে কেটে দেওয়ার জন্য পুরস্কারটি বাতিল হয়েছে। আবার ট্রাই করুন।"
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="w-full py-3 px-4 rounded-2xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-bold text-sm shadow-lg shadow-red-900/50 active:scale-95 transition-all cursor-pointer"
                >
                  আবার স্পিন করুন
                </button>
              </>
            )}

            {type === 'ad_sorry' && (
              <>
                <div className="w-16 h-16 mx-auto rounded-full bg-slate-700/40 border-2 border-slate-500 flex items-center justify-center text-slate-300">
                  <Frown size={36} />
                </div>
                <div>
                  <h3 className="text-xl font-extrabold text-slate-300 mb-2">
                    দুঃখিত!
                  </h3>
                  <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700 text-slate-200 text-xs sm:text-sm font-medium leading-relaxed text-center">
                    এইবারে আপনি কোনো পুরস্কার পাননি। হতাশ হবেন না, আবার স্পিন করুন!
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="w-full py-3 px-4 rounded-2xl bg-gradient-to-r from-slate-700 to-slate-600 hover:from-slate-600 hover:to-slate-500 text-white font-bold text-sm shadow-lg active:scale-95 transition-all cursor-pointer"
                >
                  আবার স্পিন করুন
                </button>
              </>
            )}

            {type === 'extra_spins' && (
              <>
                <div className="w-16 h-16 mx-auto rounded-full bg-emerald-500/20 border-2 border-emerald-400 flex items-center justify-center text-emerald-400 animate-bounce">
                  <Gift size={36} />
                </div>
                <div>
                  <h3 className="text-2xl font-extrabold text-emerald-300 mb-2">
                    অভিনন্দন! 🎉
                  </h3>
                  <div className="p-4 rounded-2xl bg-emerald-950/70 border border-emerald-700/60 text-emerald-100 text-xs sm:text-sm font-semibold leading-relaxed text-center">
                    অভিনন্দন! আপনি জিতেছেন আরও ৩ বার স্পিন করার দারুণ সুযোগ! 🎁
                  </div>
                </div>
                <button
                  onClick={() => {
                    onClaimExtraSpins();
                    onClose();
                  }}
                  className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-extrabold text-base shadow-xl shadow-emerald-900/60 active:scale-95 transition-all cursor-pointer"
                >
                  স্পিন গ্রহণ করুন (+৩ স্পিন)
                </button>
              </>
            )}

          </div>
        )}

      </div>
    </div>
  );
};
