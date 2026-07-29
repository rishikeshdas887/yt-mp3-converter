import React, { useState } from 'react';
import { ChevronDown, HelpCircle, ShieldCheck, Zap, Headphones, Smartphone, Sparkles } from 'lucide-react';

const FAQ_ITEMS = [
  {
    q: "How to convert YouTube videos to 320kbps MP3 audio format?",
    a: "Simply copy and paste your YouTube video link, Short, or Playlist URL into the SonicStream converter search box above. Select 320kbps from the bitrate dropdown menu, click 'Convert to MP3', and click Download once extraction finishes."
  },
  {
    q: "Is SonicStream YouTube to MP3 Converter 100% Free to use?",
    a: "Yes! SonicStream is completely free to use online without requiring any software installation or registration. You can convert unlimited audio tracks directly in your browser."
  },
  {
    q: "Can I play converted YouTube MP3 files before downloading?",
    a: "Absolutely! SonicStream features an integrated HTML5 live audio player with real-time waveform spectrum visualizer, allowing you to listen, adjust speed, and preview your track before saving."
  },
  {
    q: "Does SonicStream support audio trimming for ringtones?",
    a: "Yes, our built-in MP3 Ringtone Cutter allows you to set custom start and end markers to trim any song into a custom phone ringtone with smooth fade-in and fade-out effects."
  },
  {
    q: "Is it compatible with Android, iPhone, Mac, and Windows?",
    a: "SonicStream is built with responsive web technologies that run flawlessly on all devices including iOS Safari, Android Chrome, Windows, macOS, and Linux."
  }
];

export default function SEOSection() {
  const [openIdx, setOpenIdx] = useState(0);

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto border-t border-white/5">
      
      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        
        <div className="p-6 rounded-3xl glass-panel border-cyan-500/20 text-left space-y-3 hover:border-cyan-400/40 transition-all group">
          <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center group-hover:scale-110 transition-transform">
            <Zap className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-white">Ultra 100x Speed Pipeline</h3>
          <p className="text-xs text-slate-400 leading-relaxed">High-performance multi-threaded cloud servers extract YouTube audio streams in less than 3 seconds with zero server lag.</p>
        </div>

        <div className="p-6 rounded-3xl glass-panel border-purple-500/20 text-left space-y-3 hover:border-purple-400/40 transition-all group">
          <div className="w-12 h-12 rounded-2xl bg-purple-500/10 text-purple-400 flex items-center justify-center group-hover:scale-110 transition-transform">
            <Headphones className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-white">Studio 320kbps HD Audio</h3>
          <p className="text-xs text-slate-400 leading-relaxed">Preserves full dynamic frequency spectrum with ID3 metadata tags (Title, Artist, Album Cover, Bitrate) automatically embedded.</p>
        </div>

        <div className="p-6 rounded-3xl glass-panel border-pink-500/20 text-left space-y-3 hover:border-pink-400/40 transition-all group">
          <div className="w-12 h-12 rounded-2xl bg-pink-500/10 text-pink-400 flex items-center justify-center group-hover:scale-110 transition-transform">
            <Smartphone className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-white">Mobile & Tablet Optimized</h3>
          <p className="text-xs text-slate-400 leading-relaxed">Fully responsive web application optimized for iOS Safari, Android Chrome, and Desktop browsers with 100% SEO indexing score.</p>
        </div>

      </div>

      {/* SEO Content Article */}
      <div className="glass-panel p-8 rounded-3xl text-left mb-16 border border-slate-800 space-y-4">
        <h2 className="text-2xl font-extrabold text-white">The Ultimate Online YouTube to MP3 Converter & Player</h2>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          SonicStream HyperX is the premier web solution for extracting crystal-clear audio from YouTube music videos, podcasts, live streams, shorts, and DJ mixes. Our platform combines cutting-edge Web Audio API visualizers with cloud stream processing, providing instant playable streams and direct 320kbps MP3 downloads.
        </p>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          Whether you are looking to create custom ringtones using our integrated MP3 Trimmer tool, build offline playlists, or convert tracks on Android or iPhone, SonicStream delivers maximum speed without annoying popups or virus threats.
        </p>
      </div>

      {/* FAQ Accordion Section */}
      <div className="text-left mb-12">
        <div className="flex items-center gap-2 mb-6">
          <HelpCircle className="w-6 h-6 text-cyan-400" />
          <h3 className="text-2xl font-extrabold text-white">Frequently Asked Questions (FAQ)</h3>
        </div>

        <div className="space-y-3">
          {FAQ_ITEMS.map((item, idx) => (
            <div
              key={idx}
              className="rounded-2xl bg-slate-900/80 border border-slate-800 overflow-hidden transition-all"
            >
              <button
                onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
                className="w-full p-4 text-left font-bold text-sm text-white flex items-center justify-between gap-4 hover:text-cyan-300"
              >
                <span>{item.q}</span>
                <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${openIdx === idx ? 'rotate-180 text-cyan-400' : ''}`} />
              </button>
              {openIdx === idx && (
                <div className="px-4 pb-4 text-xs text-slate-300 leading-relaxed border-t border-slate-800/60 pt-3">
                  {item.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Keywords Tag Cloud */}
      <div className="text-left">
        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Popular Search Tags & Bitrates</h4>
        <div className="flex flex-wrap gap-2 text-[11px] text-slate-400 font-mono">
          {["#youtube-to-mp3", "#yt2mp3", "#320kbps-hd", "#mp3-trimmer", "#online-audio-player", "#free-mp3-downloader", "#convert-youtube-shorts", "#ringtone-maker", "#sonicstream-hyperx", "#id3-tag-editor"].map((tag) => (
            <span key={tag} className="px-3 py-1 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700">{tag}</span>
          ))}
        </div>
      </div>

    </section>
  );
}
