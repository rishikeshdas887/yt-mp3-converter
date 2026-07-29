import React from 'react';
import { Music, Zap, Crown, User, Sparkles, LogIn, Coins } from 'lucide-react';

export default function Navbar({ 
  user, 
  onOpenAuth, 
  onOpenVIP, 
  onOpenSpinWheel, 
  userCredits, 
  vipAdFree,
  onToggleAdFree
}) {
  return (
    <header className="sticky top-0 z-40 w-full glass-panel border-b border-white/10 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand Logo */}
        <div className="flex items-center gap-3 cursor-pointer group">
          <div className="w-11 h-11 rounded-xl btn-glow-cyan flex items-center justify-center relative overflow-hidden group-hover:scale-105 transition-transform">
            <Music className="w-6 h-6 text-black animate-pulse" />
            <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-2xl tracking-tight text-white font-mono">SONIC<span className="text-cyan-400">STREAM</span></span>
              <span className="bg-cyan-500/20 text-cyan-300 text-[10px] font-bold px-2 py-0.5 rounded-full border border-cyan-500/30">PRO v2.0</span>
            </div>
            <p className="text-[11px] text-slate-400 font-medium hidden sm:block">Ultra 320kbps YouTube to MP3 Converter</p>
          </div>
        </div>

        {/* Action Controls & Navigation */}
        <div className="flex items-center gap-3">

          {/* Spin Wheel Reward Button */}
          <button 
            onClick={onOpenSpinWheel}
            className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-purple-500/10 border border-purple-500/30 hover:bg-purple-500/20 text-purple-300 text-xs font-semibold transition-all hover:scale-105"
            title="Spin the Daily Wheel to win free 320kbps credits"
          >
            <Sparkles className="w-4 h-4 text-purple-400 animate-spin-slow" />
            <span>Daily Spin</span>
          </button>

          {/* User Credits Badge */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold font-mono">
            <Coins className="w-4 h-4 text-amber-400 animate-bounce" />
            <span>{userCredits} Credits</span>
          </div>

          {/* AdBlock / VIP Toggle Switch */}
          <button
            onClick={onToggleAdFree}
            className={`hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all border ${
              vipAdFree 
                ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-300' 
                : 'bg-slate-800/60 border-slate-700 text-slate-400 hover:text-white'
            }`}
            title="Toggle VIP Ad-Free Browsing Mode"
          >
            <Zap className={`w-3.5 h-3.5 ${vipAdFree ? 'text-emerald-400' : 'text-slate-400'}`} />
            <span>{vipAdFree ? 'VIP Ad-Free' : 'Ads Enabled'}</span>
          </button>

          {/* VIP Upgrade Button */}
          <button 
            onClick={onOpenVIP}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-black btn-glow-cyan font-mono"
          >
            <Crown className="w-4 h-4 fill-black" />
            <span className="hidden sm:inline">UPGRADE TO VIP</span>
            <span className="sm:hidden">VIP</span>
          </button>

          {/* User Profile / Auth Button */}
          {user ? (
            <button 
              onClick={onOpenAuth}
              className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-slate-800/80 border border-cyan-500/40 hover:border-cyan-400 transition-all"
            >
              <img src={user.avatar} alt={user.name} className="w-7 h-7 rounded-full object-cover ring-2 ring-cyan-400" />
              <span className="text-xs font-semibold text-white hidden md:inline">{user.name.split(' ')[0]}</span>
              <Crown className="w-3.5 h-3.5 text-amber-400" />
            </button>
          ) : (
            <button 
              onClick={onOpenAuth}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/15 hover:bg-white/10 text-white text-xs font-semibold transition-all"
            >
              <LogIn className="w-4 h-4 text-cyan-400" />
              <span>Sign In</span>
            </button>
          )}

        </div>
      </div>
    </header>
  );
}
