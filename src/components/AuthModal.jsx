import React, { useState } from 'react';
import { X, LogOut, CheckCircle2, Crown, Sparkles, Coins, ShieldCheck, Heart } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function AuthModal({ user, onAuthSuccess, onLogout, onClose }) {
  const [loadingProvider, setLoadingProvider] = useState(null);

  const handleGoogleSignIn = async () => {
    setLoadingProvider('google');
    try {
      const response = await fetch('/api/auth/google', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ credential: 'mock_google_id_token' })
      });
      const data = await response.json();
      if (data.success) {
        confetti({ particleCount: 50, spread: 60, origin: { y: 0.5 } });
        onAuthSuccess(data.user);
      }
    } catch (e) {
      console.error("Google Auth error:", e);
    } finally {
      setLoadingProvider(null);
    }
  };

  const handleAppleSignIn = async () => {
    setLoadingProvider('apple');
    try {
      const response = await fetch('/api/auth/apple', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: 'mock_apple_code' })
      });
      const data = await response.json();
      if (data.success) {
        confetti({ particleCount: 50, spread: 60, origin: { y: 0.5 } });
        onAuthSuccess(data.user);
      }
    } catch (e) {
      console.error("Apple Auth error:", e);
    } finally {
      setLoadingProvider(null);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="glass-panel-glow w-full max-w-md rounded-3xl p-6 relative border border-cyan-500/40 shadow-2xl">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-800 border border-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition-all"
        >
          <X className="w-4 h-4" />
        </button>

        {user ? (
          // Logged in User Profile View
          <div className="text-center py-2 space-y-4">
            <div className="relative inline-block">
              <img 
                src={user.avatar} 
                alt={user.name} 
                className="w-20 h-20 rounded-full object-cover ring-4 ring-cyan-400 mx-auto shadow-xl"
              />
              <span className="absolute bottom-0 right-0 p-1.5 rounded-full bg-amber-400 text-black shadow-lg">
                <Crown className="w-4 h-4 fill-black" />
              </span>
            </div>

            <div>
              <h3 className="text-xl font-bold text-white flex items-center justify-center gap-1.5">
                <span>{user.name}</span>
                <CheckCircle2 className="w-4 h-4 text-cyan-400" />
              </h3>
              <p className="text-xs text-slate-400 font-mono">{user.email}</p>
            </div>

            {/* Account Status Chips */}
            <div className="grid grid-cols-2 gap-2 pt-2">
              <div className="p-3 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-left">
                <p className="text-[10px] font-bold text-slate-400 uppercase">Account Rank</p>
                <p className="text-sm font-extrabold text-cyan-300 font-mono">PRO VIP MEMBER</p>
              </div>
              <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-left">
                <p className="text-[10px] font-bold text-slate-400 uppercase">Available Credits</p>
                <p className="text-sm font-extrabold text-amber-300 font-mono">{user.credits || 150} Coins</p>
              </div>
            </div>

            {/* Saved Audio Library */}
            <div className="text-left pt-2">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Cloud Conversion Sync</h4>
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <Heart className="w-4 h-4 text-pink-500 fill-pink-500" />
                  <span>32 Saved MP3 Tracks</span>
                </span>
                <span className="text-[10px] text-emerald-400 font-semibold bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/30">Synced</span>
              </div>
            </div>

            <button
              onClick={() => {
                onLogout();
                onClose();
              }}
              className="w-full py-3 rounded-2xl bg-red-500/10 border border-red-500/30 hover:bg-red-500/20 text-red-400 font-bold text-xs flex items-center justify-center gap-2 transition-all mt-4"
            >
              <LogOut className="w-4 h-4" />
              <span>SIGN OUT OF ACCOUNT</span>
            </button>
          </div>
        ) : (
          // Logged Out - Google & Apple Auth Options
          <div className="space-y-6">
            <div className="text-center">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-cyan-500 to-purple-600 p-0.5 mx-auto mb-3 shadow-[0_0_20px_rgba(0,240,255,0.4)]">
                <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-cyan-400" />
                </div>
              </div>
              <h3 className="text-2xl font-extrabold text-white">Sign In to SonicStream</h3>
              <p className="text-xs text-slate-400 mt-1">Unlock Unlimited 320kbps MP3 Conversions & Cloud Library</p>
            </div>

            {/* Auth Buttons */}
            <div className="space-y-3">
              
              {/* Google Sign-In */}
              <button
                onClick={handleGoogleSignIn}
                disabled={loadingProvider !== null}
                className="w-full py-3.5 px-4 rounded-2xl bg-white hover:bg-slate-100 text-slate-900 font-bold text-sm flex items-center justify-center gap-3 transition-all shadow-lg hover:scale-[1.02] cursor-pointer"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"/>
                  <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.28v3.15C3.26 21.3 7.31 24 12 24z"/>
                  <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.28C.46 8.21 0 10.05 0 12s.46 3.79 1.28 5.42l4-3.15z"/>
                  <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.7 1.28 6.58l4 3.15c.95-2.83 3.6-4.98 6.72-4.98z"/>
                </svg>
                <span>{loadingProvider === 'google' ? 'Connecting to Google...' : 'Sign in with Google'}</span>
              </button>

              {/* Apple Sign-In */}
              <button
                onClick={handleAppleSignIn}
                disabled={loadingProvider !== null}
                className="w-full py-3.5 px-4 rounded-2xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-white font-bold text-sm flex items-center justify-center gap-3 transition-all shadow-lg hover:scale-[1.02] cursor-pointer"
              >
                <svg className="w-5 h-5 fill-white" viewBox="0 0 170 170">
                  <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.34.13-9.16-1.9-14.48-6.1-3.26-2.63-7.24-7.27-11.94-13.92-7.85-11.12-14.15-23.75-18.91-37.89-4.76-14.14-7.14-27.42-7.14-39.84 0-16.1 3.86-29.35 11.58-39.75 7.72-10.4 17.59-15.7 29.62-15.9 4.8 0 10.02 1.2 15.66 3.6 5.64 2.4 9.53 3.6 11.67 3.6 1.74 0 5.64-1.2 11.71-3.6 6.07-2.4 11.13-3.52 15.18-3.37 11.03.49 20.35 4.54 27.95 12.16-9.91 5.99-14.73 14.34-14.46 25.05.27 10.71 4.7 19.34 14.3 25.88-2.29 6.86-5.23 13.56-8.82 20.1zM119.22 31.78c0-7.23 2.62-14.28 7.86-21.14 5.24-6.86 11.89-10.64 19.95-11.34.13.9.2 1.77.2 2.6 0 7.37-2.67 14.51-8.01 21.42-5.34 6.91-11.94 10.67-19.8 11.27-.07-.73-.2-1.66-.2-2.81z" />
                </svg>
                <span>{loadingProvider === 'apple' ? 'Connecting to Apple...' : 'Sign in with Apple'}</span>
              </button>

            </div>

            <div className="p-3 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-xs text-slate-300 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>100% Safe OAuth 2.0 Encryption. No password stored.</span>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
