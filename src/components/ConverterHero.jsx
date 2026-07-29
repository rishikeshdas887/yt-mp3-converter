import React, { useState } from 'react';
import { Video, Search, Clipboard, Sparkles, Sliders, Play, Download, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

export default function ConverterHero({ 
  onExtract, 
  videoData, 
  loading, 
  error, 
  selectedBitrate, 
  setSelectedBitrate,
  onPlayTrack,
  onDownloadTrack,
  trendingTracks,
  userCredits
}) {
  const [urlInput, setUrlInput] = useState('');

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text) {
        setUrlInput(text);
      }
    } catch (err) {
      console.warn("Clipboard access denied");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (urlInput.trim()) {
      onExtract(urlInput);
    }
  };

  const handleQuickSelect = (track) => {
    const youtubeUrl = `https://www.youtube.com/watch?v=${track.id}`;
    setUrlInput(youtubeUrl);
    onExtract(youtubeUrl);
  };

  return (
    <section className="relative pt-12 pb-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center">
      
      {/* Glow Backdrop */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-tr from-cyan-500/20 to-purple-600/20 blur-[120px] rounded-full pointer-events-none"></div>

      {/* Hero Badge */}
      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-semibold mb-6 shadow-[0_0_15px_rgba(0,240,255,0.2)]">
        <Sparkles className="w-4 h-4 text-cyan-400 animate-spin-slow" />
        <span>⚡ 100x Faster YouTube MP3 Audio Conversion Engine</span>
      </div>

      {/* Title */}
      <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white mb-6 leading-none">
        Convert YouTube to <br />
        <span className="text-gradient-cyan drop-shadow-[0_0_35px_rgba(0,240,255,0.4)]">320kbps MP3 Audio</span>
      </h1>

      {/* Subtitle */}
      <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto mb-10 leading-relaxed font-normal">
        Paste any YouTube link, Short, or Playlist. Experience crystal-clear studio sound quality, built-in waveform visualizer, live audio playback, ringtone cutter, and instant MP3 download.
      </p>

      {/* Main Converter Form Box */}
      <div className="glass-panel-glow rounded-3xl p-4 sm:p-6 mb-8 text-left shadow-2xl relative overflow-hidden">
        <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-3">
          
          {/* Input field */}
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <svg className="w-6 h-6 fill-red-500" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
            </div>
            <input
              type="text"
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              placeholder="Paste YouTube Video URL or Video ID (e.g. https://www.youtube.com/watch?v=...)"
              className="w-full pl-12 pr-28 py-4 bg-slate-900/90 border border-slate-700/80 rounded-2xl text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20 text-sm font-medium transition-all"
            />
            <button
              type="button"
              onClick={handlePaste}
              className="absolute right-3 top-1/2 -translate-y-1/2 px-3 py-1.5 rounded-xl bg-slate-800 border border-slate-600 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-semibold flex items-center gap-1.5 transition-all"
            >
              <Clipboard className="w-3.5 h-3.5" />
              <span>Paste</span>
            </button>
          </div>

          {/* Bitrate Selector Dropdown */}
          <div className="relative min-w-[160px]">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Sliders className="w-4 h-4 text-cyan-400" />
            </div>
            <select
              value={selectedBitrate}
              onChange={(e) => setSelectedBitrate(e.target.value)}
              className="w-full pl-9 pr-8 py-4 bg-slate-900/90 border border-slate-700/80 rounded-2xl text-white text-sm font-semibold focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20 appearance-none cursor-pointer"
            >
              <option value="320">320 kbps (Studio HD)</option>
              <option value="256">256 kbps (High Quality)</option>
              <option value="192">192 kbps (Standard)</option>
              <option value="128">128 kbps (Fast Size)</option>
            </select>
          </div>

          {/* Convert Button */}
          <button
            type="submit"
            disabled={loading}
            className="px-8 py-4 rounded-2xl text-black font-extrabold text-sm font-mono btn-glow-cyan flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>CONVERTING...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5 fill-black" />
                <span>CONVERT TO MP3</span>
              </>
            )}
          </button>

        </form>

        {/* Loading Bar Animation */}
        {loading && (
          <div className="mt-4">
            <div className="flex justify-between text-xs text-cyan-300 font-mono mb-1.5">
              <span>Extracting Audio Stream & ID3 Metadata...</span>
              <span>88%</span>
            </div>
            <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 animate-pulse w-[88%] rounded-full"></div>
            </div>
          </div>
        )}

        {/* Error Alert */}
        {error && (
          <div className="mt-4 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
            <span>{error}</span>
          </div>
        )}

      </div>

      {/* Extracted Video Card Result */}
      {videoData && (
        <div className="glass-panel rounded-3xl p-6 text-left border border-cyan-500/40 shadow-2xl mb-8 animate-fade-in">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
            
            {/* Thumbnail */}
            <div className="relative group shrink-0 w-full sm:w-56 h-36 rounded-2xl overflow-hidden border border-white/10 shadow-lg">
              <img 
                src={videoData.thumbnail} 
                alt={videoData.title} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <button 
                  onClick={() => onPlayTrack(videoData)}
                  className="w-12 h-12 rounded-full bg-cyan-400 text-black flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
                >
                  <Play className="w-6 h-6 fill-black ml-1" />
                </button>
              </div>
              <span className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-black/80 text-white text-[11px] font-mono">
                {videoData.duration}
              </span>
            </div>

            {/* Video Metadata & Controls */}
            <div className="flex-1 space-y-3 text-center sm:text-left">
              <div>
                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/30 mb-2">
                  <CheckCircle2 className="w-3 h-3" /> Ready for Playback & Download
                </span>
                <h3 className="text-xl font-bold text-white line-clamp-2">{videoData.title}</h3>
                <p className="text-sm text-slate-400 font-medium">{videoData.author} • {videoData.views} Views</p>
              </div>

              {/* Bitrate Selection Chips */}
              <div className="flex flex-wrap items-center gap-2 pt-2">
                {videoData.availableBitrates.map((b) => (
                  <button
                    key={b.value}
                    onClick={() => setSelectedBitrate(b.value)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all border ${
                      selectedBitrate === b.value
                        ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 shadow-[0_0_12px_rgba(0,240,255,0.3)]'
                        : 'bg-slate-800/80 border-slate-700 text-slate-400 hover:text-white'
                    }`}
                  >
                    <span>{b.label}</span>
                    {b.badge && <span className="ml-1 px-1.5 py-0.2 bg-amber-500 text-black font-extrabold text-[9px] rounded-full">{b.badge}</span>}
                  </button>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 pt-2">
                <button
                  onClick={() => onPlayTrack(videoData)}
                  className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-600 text-white font-bold text-xs flex items-center gap-2 transition-all hover:scale-105"
                >
                  <Play className="w-4 h-4 text-cyan-400 fill-cyan-400" />
                  <span>PLAY AUDIO IN PLAYER</span>
                </button>

                <button
                  onClick={() => onDownloadTrack(videoData, selectedBitrate)}
                  className="px-6 py-2.5 rounded-xl btn-glow-cyan text-black font-extrabold text-xs flex items-center gap-2 transition-all font-mono"
                >
                  <Download className="w-4 h-4 fill-black" />
                  <span>DOWNLOAD MP3 ({selectedBitrate}KBPS)</span>
                </button>
              </div>

            </div>

          </div>
        </div>
      )}

      {/* Quick Trending Recommendations */}
      <div className="text-left mt-8">
        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-purple-400" />
          <span>Trending 1-Click Convert Recommendations</span>
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {trendingTracks.map((track) => (
            <div
              key={track.id}
              onClick={() => handleQuickSelect(track)}
              className="p-3 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-cyan-500/40 hover:bg-slate-800/60 cursor-pointer transition-all flex items-center gap-3 group"
            >
              <img src={track.thumbnail} alt={track.title} className="w-12 h-12 rounded-xl object-cover" />
              <div className="flex-1 min-w-0">
                <h5 className="text-xs font-bold text-white truncate group-hover:text-cyan-300">{track.title}</h5>
                <p className="text-[11px] text-slate-400">{track.author} • {track.duration}</p>
              </div>
              <div className="w-8 h-8 rounded-lg bg-cyan-500/10 text-cyan-400 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Play className="w-4 h-4 fill-cyan-400" />
              </div>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}
