import React from 'react';
import { Music, Heart, ShieldCheck, Zap } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-slate-950/80 backdrop-blur-md py-12 px-4 sm:px-6 lg:px-8 text-slate-400 text-xs mt-20">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Brand info */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-cyan-500 text-black flex items-center justify-center font-bold">
            <Music className="w-4 h-4" />
          </div>
          <div>
            <span className="font-extrabold text-lg text-white font-mono">SONIC<span className="text-cyan-400">STREAM</span></span>
            <p className="text-[11px] text-slate-400">© 2026 SonicStream HyperX Inc. All rights reserved.</p>
          </div>
        </div>

        {/* Links */}
        <div className="flex flex-wrap justify-center gap-6 text-xs text-slate-300 font-medium">
          <a href="#hero" className="hover:text-cyan-400 transition-colors">Converter</a>
          <a href="#faq" className="hover:text-cyan-400 transition-colors">FAQ & SEO</a>
          <a href="#terms" className="hover:text-cyan-400 transition-colors">Terms of Service</a>
          <a href="#privacy" className="hover:text-cyan-400 transition-colors">Privacy Policy</a>
          <a href="#contact" className="hover:text-cyan-400 transition-colors">Contact Support</a>
        </div>

        {/* Badges */}
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[11px] font-semibold">
            <ShieldCheck className="w-3.5 h-3.5" /> 100% Safe & Virus Free
          </span>
        </div>

      </div>
    </footer>
  );
}
