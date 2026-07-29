import React, { useState } from 'react';
import { Crown, Sparkles, CheckCircle2, Zap, Gift, ShieldCheck, DollarSign, X, ExternalLink } from 'lucide-react';
import confetti from 'canvas-confetti';

export function VIPModal({ isOpen, onClose, onUpgradeSuccess }) {
  const [selectedPlan, setSelectedPlan] = useState('monthly');
  const [paymentLoading, setPaymentLoading] = useState(false);

  if (!isOpen) return null;

  const handleCheckout = (method) => {
    setPaymentLoading(true);
    setTimeout(() => {
      setPaymentLoading(false);
      confetti({ particleCount: 100, spread: 80, origin: { y: 0.5 } });
      onUpgradeSuccess();
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="glass-panel-glow w-full max-w-lg rounded-3xl p-6 relative border border-amber-500/40 shadow-2xl">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-800 border border-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition-all"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Title */}
        <div className="text-center mb-6">
          <div className="w-14 h-14 rounded-2xl bg-amber-500/20 border border-amber-500/50 text-amber-400 flex items-center justify-center mx-auto mb-3 shadow-[0_0_20px_rgba(255,215,0,0.4)]">
            <Crown className="w-7 h-7 fill-amber-400" />
          </div>
          <h3 className="text-2xl font-extrabold text-white">Upgrade to SonicStream PRO</h3>
          <p className="text-xs text-slate-400 mt-1">Unlock Studio 320kbps Audio, Zero Ads & Batch Playlists</p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          
          <div 
            onClick={() => setSelectedPlan('monthly')}
            className={`p-4 rounded-2xl border cursor-pointer transition-all ${
              selectedPlan === 'monthly'
                ? 'bg-amber-500/10 border-amber-400 ring-2 ring-amber-400/30'
                : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
            }`}
          >
            <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider">MONTHLY VIP</span>
            <div className="text-2xl font-black text-white my-1 font-mono">$4.99<span className="text-xs text-slate-400 font-sans">/mo</span></div>
            <p className="text-[11px] text-slate-400">Cancel anytime. Instant unlock.</p>
          </div>

          <div 
            onClick={() => setSelectedPlan('lifetime')}
            className={`p-4 rounded-2xl border cursor-pointer transition-all relative ${
              selectedPlan === 'lifetime'
                ? 'bg-cyan-500/10 border-cyan-400 ring-2 ring-cyan-400/30'
                : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
            }`}
          >
            <span className="absolute -top-2.5 right-3 px-2 py-0.5 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 text-white font-extrabold text-[9px]">BEST VALUE</span>
            <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider">LIFETIME PASS</span>
            <div className="text-2xl font-black text-white my-1 font-mono">$29.99<span className="text-xs text-slate-400 font-sans">/once</span></div>
            <p className="text-[11px] text-slate-400">One-time payment forever.</p>
          </div>

        </div>

        {/* PRO Features Matrix */}
        <div className="space-y-2 mb-6 text-xs text-slate-300">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Unlimited 320kbps Studio Sound Downloads</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>100% Ad-Free Clean UI & Instant Downloads</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Batch YouTube Playlist Converter & ID3 Tag Editor</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Ultra High-Priority Conversion Server Pipeline</span>
          </div>
        </div>

        {/* Payment Buttons */}
        <div className="space-y-2">
          <button
            onClick={() => handleCheckout('google_pay')}
            disabled={paymentLoading}
            className="w-full py-3.5 rounded-2xl bg-white hover:bg-slate-100 text-black font-extrabold text-xs flex items-center justify-center gap-2 transition-all font-mono"
          >
            <Zap className="w-4 h-4 fill-black text-black" />
            <span>{paymentLoading ? 'PROCESSING PAYROLL...' : 'PAY WITH GOOGLE PAY / CREDIT CARD'}</span>
          </button>
        </div>

      </div>
    </div>
  );
}

export function DailySpinWheelModal({ isOpen, onClose, onWinCredits }) {
  const [spinning, setSpinning] = useState(false);
  const [wonAmount, setWonAmount] = useState(null);

  if (!isOpen) return null;

  const handleSpin = () => {
    if (spinning) return;
    setSpinning(true);
    setTimeout(() => {
      const prizes = [50, 100, 250, 500];
      const prize = prizes[Math.floor(Math.random() * prizes.length)];
      setWonAmount(prize);
      setSpinning(false);
      confetti({ particleCount: 90, spread: 70, origin: { y: 0.5 } });
      onWinCredits(prize);
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="glass-panel-glow w-full max-w-md rounded-3xl p-6 relative border border-purple-500/40 text-center shadow-2xl">
        
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-800 border border-slate-700 text-slate-400 hover:text-white flex items-center justify-center"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="w-12 h-12 rounded-2xl bg-purple-500/20 text-purple-400 flex items-center justify-center mx-auto mb-2">
          <Gift className="w-6 h-6" />
        </div>
        <h3 className="text-xl font-extrabold text-white">Daily Streak Spin Wheel</h3>
        <p className="text-xs text-slate-400 mb-6">Spin daily to win bonus 320kbps audio conversion credits!</p>

        {/* Wheel Display */}
        <div className="relative w-48 h-48 mx-auto mb-6 flex items-center justify-center">
          <div className={`w-full h-full rounded-full border-4 border-purple-500/50 bg-gradient-to-tr from-purple-900 via-cyan-900 to-pink-900 flex items-center justify-center shadow-[0_0_30px_rgba(112,0,255,0.4)] ${spinning ? 'animate-spin' : ''}`}>
            <Sparkles className="w-16 h-16 text-cyan-400" />
          </div>
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2 w-4 h-6 bg-amber-400 clip-triangle"></div>
        </div>

        {wonAmount && (
          <div className="p-3 rounded-2xl bg-amber-500/20 border border-amber-500/40 text-amber-300 font-bold text-sm mb-4 animate-bounce">
            🎉 CONGRATS! You won +{wonAmount} Conversion Credits!
          </div>
        )}

        <button
          onClick={handleSpin}
          disabled={spinning || wonAmount !== null}
          className="w-full py-3.5 rounded-2xl btn-glow-pink text-white font-extrabold text-xs font-mono disabled:opacity-50"
        >
          {spinning ? 'SPINNING WHEEL...' : wonAmount ? 'PRIZE CLAIMED!' : 'SPIN THE WHEEL NOW'}
        </button>

      </div>
    </div>
  );
}

export function AdBannerPlacement({ position, isVipAdFree, onOpenVIP }) {
  if (isVipAdFree) return null;

  if (position === 'header') {
    return (
      <div className="max-w-5xl mx-auto px-4 my-6">
        <div className="p-4 rounded-2xl bg-gradient-to-r from-slate-900 via-purple-950/60 to-slate-900 border border-purple-500/30 flex items-center justify-between text-left shadow-lg relative overflow-hidden group">
          <div className="flex items-center gap-3">
            <span className="text-[9px] font-bold text-purple-400 bg-purple-500/20 px-2 py-0.5 rounded border border-purple-500/30">SPONSORED</span>
            <div>
              <h5 className="text-xs font-bold text-white group-hover:text-cyan-300 transition-colors">🔥 VPN Unlimited 80% Off - Stream Music Anywhere Safely</h5>
              <p className="text-[11px] text-slate-400">High speed encrypted proxies with zero logs.</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <a href="https://google.com" target="_blank" rel="noreferrer" className="px-3 py-1.5 rounded-xl bg-purple-600 text-white text-xs font-bold flex items-center gap-1">
              <span>GET DEAL</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <button onClick={onOpenVIP} className="text-[10px] text-slate-500 hover:text-slate-300 underline">Hide Ads</button>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
