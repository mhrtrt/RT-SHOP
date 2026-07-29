import React, { useState } from 'react';
import { HelpCircle, X, Check, Copy, ExternalLink, Code2, Globe, Sparkles, DollarSign } from 'lucide-react';

interface GithubDeployGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GithubDeployGuideModal: React.FC<GithubDeployGuideModalProps> = ({ isOpen, onClose }) => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  if (!isOpen) return null;

  const copyCode = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const sampleAdsterraScript = `<script type="text/javascript">
	atOptions = {
		'key' : 'YOUR_ADSTERRA_KEY_HERE',
		'format' : 'iframe',
		'height' : 50,
		'width' : 320,
		'params' : {}
	};
</script>
<script type="text/javascript" src="//www.highperformanceformat.com/YOUR_KEY/invoke.js"></script>`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-xl bg-slate-900 border border-amber-500/40 rounded-3xl p-5 sm:p-6 shadow-2xl text-white max-h-[88vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-800">
          <div className="flex items-center gap-2 text-amber-400">
            <Globe size={24} />
            <h3 className="font-extrabold text-base sm:text-lg">গিটহাব ফ্রী হোস্টিং ও এ্যাডস্টারাকোড বসানোর গাইড</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="space-y-6 text-xs sm:text-sm text-slate-200">
          
          {/* Overview Card */}
          <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 space-y-2">
            <div className="flex items-center gap-2 text-amber-300 font-bold text-sm">
              <Sparkles size={16} />
              <span>আপনার ইনকাম টার্গেট ও সিস্টেম সুবিধা:</span>
            </div>
            <ul className="list-disc list-inside space-y-1 text-slate-300 text-xs">
              <li>১ম স্পিন: রেফ্রিজারেটর আসবে ➔ এ্যাড দেখাবে ➔ "বিজ্ঞাপন কেটে দেওয়ার জন্য বাতিল" নোটিশ।</li>
              <li>২য় স্পিন: দুঃখিত আসবে ➔ এ্যাড দেখাবে ➔ "ট্রাই করুন" নোটিশ।</li>
              <li>৩য় স্পিন: অভিনন্দন +৩ স্পিন আসবে ➔ ইউজার আরো ৩ বার স্পিন সুযোগ পাবে!</li>
              <li>এই ৩টি ধাপের লুপ ক্রমাগত চলতে থাকবে, যাতে ইউজার প্রতিবার এ্যাড দেখে!</li>
            </ul>
          </div>

          {/* Step 1 */}
          <div className="space-y-2">
            <h4 className="font-bold text-sm text-amber-300 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-amber-500 text-slate-950 text-xs flex items-center justify-center font-extrabold">১</span>
              গিটহাবে ফ্রী ওয়েবসাইট চালু করার নিয়ম:
            </h4>
            <ol className="list-decimal list-inside space-y-1 text-slate-300 pl-2">
              <li>GitHub.com এ গিয়ে ফ্রী একটি Repository খুলুন (নাম দিন e.g., <code className="text-amber-300">lucky-spin-bd</code>)।</li>
              <li>এই প্রজেক্টের সব ফাইল GitHub Repository তে Upload / Push করুন।</li>
              <li>Repository Settings ➔ Pages অপশনে যান।</li>
              <li>Branch হিসেবে <code className="text-amber-300">main</code> সিলেক্ট করে Save করুন।</li>
              <li>২ মিনিটের মধ্যে আপনার ফ্রী লাইভ ওয়েবসাইট লিংক পেয়ে যাবেন! (e.g. <code className="text-emerald-400">https://username.github.io/lucky-spin-bd/</code>)</li>
            </ol>
          </div>

          {/* Step 2 */}
          <div className="space-y-2">
            <h4 className="font-bold text-sm text-amber-300 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-amber-500 text-slate-950 text-xs flex items-center justify-center font-extrabold">২</span>
              Adsterra (এ্যাডস্টারা) Direct Link বা সেটিং ওপেন করার সিক্রেট নিয়ম:
            </h4>
            <p className="text-slate-300">
              <b>সিক্রেট লিঙ্ক দিয়ে অ্যাডমিন প্যানেল খোলা:</b> সাধারণ ইউজার যেন কোনো সেটিং আইকন না দেখে, তাই সম্পূর্ণ ওয়েবসাইট থেকে সেটিং আইকন লুকিয়ে ফেলা হয়েছে। আপনি নিজের ওয়েবসাইটের লিংকের শেষে <code className="text-amber-300">/11111111/setting</code> অথবা <code className="text-amber-300">#11111111/setting</code> যোগ করে এন্টার দিলেই গোপন অ্যাডমিন প্যানেল খুলে যাবে!
            </p>
            <p className="text-slate-300">
              <b>HTML ফাইলে স্ক্রিপ্ট বসানো:</b> Adsterra Social Bar, Popunder, বা 320x50 Banner Code <code className="text-amber-300">index.html</code> ফাইলের <code className="text-amber-300">&lt;head&gt;</code> বা <code className="text-amber-300">&lt;body&gt;</code> ট্যাগের ভেতর পেস্ট করুন:
            </p>

            <div className="relative p-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 font-mono text-[11px] overflow-x-auto">
              <button
                onClick={() => copyCode(sampleAdsterraScript, 1)}
                className="absolute top-2 right-2 px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-amber-300 text-[10px] flex items-center gap-1 border border-slate-700 cursor-pointer"
              >
                {copiedIndex === 1 ? <Check size={12} /> : <Copy size={12} />}
                <span>{copiedIndex === 1 ? 'কপি হয়েছে' : 'কপি করুন'}</span>
              </button>
              <pre>{sampleAdsterraScript}</pre>
            </div>
          </div>

          {/* Step 3 */}
          <div className="space-y-2">
            <h4 className="font-bold text-sm text-amber-300 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-amber-500 text-slate-950 text-xs flex items-center justify-center font-extrabold">৩</span>
              ইউজার অভিজ্ঞতা ও সিক্রেসি (Important Tips):
            </h4>
            <ul className="list-disc list-inside space-y-1 text-slate-300 pl-2">
              <li>অ্যাপের ডিজাইনটি এমনভাবে করা হয়েছে যেন কেউ বুঝতে না পারে যে বড় উপহারগুলো কখনো আসে না।</li>
              <li>সরাসরি জয়ী তালিকা (Live Ticker) অনবরত নতুন কাল্পনিক বিজয়ী দেখায়, যার ফলে ইউজার বিশ্বাস করে স্পিন করতে থাকবে।</li>
              <li>স্পিন +৩ পাওয়ার পর ইউজার আরো বেশি স্পিন করে আপনার এ্যাড ভিউ বাড়িয়ে দেবে!</li>
            </ul>
          </div>

        </div>

        {/* Footer */}
        <div className="mt-6 pt-4 border-t border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs sm:text-sm cursor-pointer shadow-lg active:scale-95 transition-all"
          >
            বুঝেছি, কাজ শুরু করুন
          </button>
        </div>

      </div>
    </div>
  );
};
