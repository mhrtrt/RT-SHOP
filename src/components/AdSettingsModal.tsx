import React, { useState } from 'react';
import { Settings, X, ExternalLink, Code2, Check, HelpCircle } from 'lucide-react';
import { AdConfig } from '../types';

interface AdSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: AdConfig;
  onSaveConfig: (newConfig: AdConfig) => void;
  onOpenDeployGuide: () => void;
}

export const AdSettingsModal: React.FC<AdSettingsModalProps> = ({
  isOpen,
  onClose,
  config,
  onSaveConfig,
  onOpenDeployGuide
}) => {
  const [directLinkUrl, setDirectLinkUrl] = useState(config.directLinkUrl);
  const [autoOpenTab, setAutoOpenTab] = useState(config.autoOpenTab);
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveConfig({
      ...config,
      directLinkUrl,
      autoOpenTab
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-md bg-slate-900 border border-amber-500/30 rounded-3xl p-6 shadow-2xl text-white max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-800">
          <div className="flex items-center gap-2 text-amber-400">
            <Settings size={22} />
            <h3 className="font-bold text-lg">এ্যাড সেটিং (Adsterra Direct Link)</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSave} className="space-y-4">
          
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Adsterra Direct Link (এ্যাড লিংক):
            </label>
            <input
              type="url"
              value={directLinkUrl}
              onChange={(e) => setDirectLinkUrl(e.target.value)}
              placeholder="https://www.highratecpmgateway.com/..."
              className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-sm text-amber-300 placeholder-slate-500 focus:outline-none focus:border-amber-500"
            />
            <p className="text-[11px] text-slate-400 mt-1">
              আপনার Adsterra একাউন্ট থেকে Direct Link কপি করে এখানে পেস্ট করুন।
            </p>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-950/60 border border-slate-800">
            <input
              type="checkbox"
              id="autoOpenTab"
              checked={autoOpenTab}
              onChange={(e) => setAutoOpenTab(e.target.checked)}
              className="w-4 h-4 accent-amber-500 rounded cursor-pointer"
            />
            <label htmlFor="autoOpenTab" className="text-xs text-slate-200 cursor-pointer">
              স্পিন শেষ হওয়ার সাথে সাথে নতুন ট্যাবে এ্যাড লিংক ওপেন হবে (Auto Open)
            </label>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 font-bold text-sm shadow-lg hover:from-amber-400 hover:to-yellow-400 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            {savedSuccess ? (
              <>
                <Check size={18} />
                <span>সেভ হয়েছে!</span>
              </>
            ) : (
              <span>সেটিং সেভ করুন</span>
            )}
          </button>

        </form>

        {/* GitHub Deployment Button Shortcut */}
        <div className="mt-6 pt-4 border-t border-slate-800 space-y-2">
          <button
            onClick={() => {
              onClose();
              onOpenDeployGuide();
            }}
            className="w-full py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-amber-300 text-xs font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            <HelpCircle size={16} />
            <span>গিটহাবে ফ্রী ওয়েবসাইট বানানোর বাংলা গাইড দেখুন</span>
          </button>
        </div>

      </div>
    </div>
  );
};
