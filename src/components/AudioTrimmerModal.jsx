import React, { useState, useRef } from 'react';
import { X, Scissors, Play, Pause, Download, Sparkles, Sliders, Volume2 } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function AudioTrimmerModal({ track, onClose }) {
  if (!track) return null;

  const totalDuration = track.durationSec || 200;
  const [startTime, setStartTime] = useState(15);
  const [endTime, setEndTime] = useState(Math.min(45, totalDuration));
  const [fadeEffect, setFadeEffect] = useState(true);
  const [bitrate, setBitrate] = useState('320');
  const [isPlayingPreview, setIsPlayingPreview] = useState(false);

  const previewAudioRef = useRef(null);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleTogglePreview = () => {
    if (!previewAudioRef.current) return;
    if (isPlayingPreview) {
      previewAudioRef.current.pause();
      setIsPlayingPreview(false);
    } else {
      previewAudioRef.current.src = `/api/trim-preview/${track.videoId}?start=${startTime}&end=${endTime}&bitrate=${bitrate}&fade=${fadeEffect}`;
      previewAudioRef.current.play().then(() => setIsPlayingPreview(true)).catch(() => {});
    }
  };

  const handleDownloadTrimmed = () => {
    confetti({
      particleCount: 90,
      spread: 70,
      origin: { y: 0.6 }
    });

    const trimDownloadUrl = `/api/trim/${track.videoId}?start=${startTime}&end=${endTime}&bitrate=${bitrate}&fade=${fadeEffect}&title=${encodeURIComponent(track.title)}`;
    
    const a = document.createElement('a');
    a.href = trimDownloadUrl;
    a.download = `${track.title}_Trimmed_${Math.floor(startTime)}s-${Math.floor(endTime)}s_${bitrate}kbps.mp3`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
      <div className="glass-panel-glow w-full max-w-xl rounded-3xl p-6 relative border border-purple-500/50 shadow-2xl">
        
        {/* Hidden In-Modal Preview Audio Player */}
        <audio
          ref={previewAudioRef}
          onEnded={() => setIsPlayingPreview(false)}
        />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-800 border border-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition-all"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Title */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-2xl bg-purple-500/20 border border-purple-500/40 text-purple-300 flex items-center justify-center shadow-[0_0_15px_rgba(112,0,255,0.4)]">
            <Scissors className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">Precision MP3 Ringtone Cutter</h3>
            <p className="text-xs text-slate-400">Set start and end markers to export custom trimmed audio tracks</p>
          </div>
        </div>

        {/* Track Metadata Card */}
        <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 flex items-center gap-4 mb-6">
          <img src={track.thumbnail} alt={track.title} className="w-14 h-14 rounded-xl object-cover ring-2 ring-purple-500/30 shrink-0" />
          <div className="min-w-0 flex-1">
            <h4 className="text-sm font-bold text-white truncate">{track.title}</h4>
            <p className="text-xs text-slate-400">{track.author} • Total Length: {track.duration}</p>
          </div>
        </div>

        {/* Interactive Waveform Bar Visualizer */}
        <div className="mb-6 p-4 rounded-2xl bg-slate-950 border border-slate-800 relative overflow-hidden">
          <div className="h-16 flex items-center justify-between gap-1 opacity-80">
            {Array.from({ length: 50 }).map((_, idx) => {
              const pct = (idx / 50) * totalDuration;
              const isSelected = pct >= startTime && pct <= endTime;
              return (
                <div
                  key={idx}
                  style={{ height: `${Math.sin(idx * 0.7) * 40 + 50}%` }}
                  className={`flex-1 rounded-full transition-all ${
                    isSelected 
                      ? 'bg-gradient-to-t from-purple-500 to-cyan-400 shadow-[0_0_10px_rgba(0,240,255,0.8)]' 
                      : 'bg-slate-800/80'
                  }`}
                ></div>
              );
            })}
          </div>
        </div>

        {/* Timestamps Slider Controls */}
        <div className="space-y-4 mb-6">
          <div>
            <div className="flex justify-between text-xs font-semibold text-slate-300 mb-1">
              <span>Start Timestamp Marker:</span>
              <span className="text-cyan-400 font-mono font-bold">{formatTime(startTime)}</span>
            </div>
            <input
              type="range"
              min="0"
              max={Math.max(0, endTime - 2)}
              step="1"
              value={startTime}
              onChange={(e) => setStartTime(parseFloat(e.target.value))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs font-semibold text-slate-300 mb-1">
              <span>End Timestamp Marker:</span>
              <span className="text-purple-400 font-mono font-bold">{formatTime(endTime)}</span>
            </div>
            <input
              type="range"
              min={startTime + 2}
              max={totalDuration}
              step="1"
              value={endTime}
              onChange={(e) => setEndTime(parseFloat(e.target.value))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-purple-400"
            />
          </div>
        </div>

        {/* Bitrate & Fade Options */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
          
          {/* Bitrate Selector */}
          <div className="flex items-center gap-2 p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs">
            <Sliders className="w-4 h-4 text-cyan-400 shrink-0" />
            <select
              value={bitrate}
              onChange={(e) => setBitrate(e.target.value)}
              className="bg-transparent text-white font-semibold text-xs focus:outline-none cursor-pointer w-full"
            >
              <option value="320" className="bg-slate-900">320 kbps (Ultra HD)</option>
              <option value="256" className="bg-slate-900">256 kbps (High Quality)</option>
              <option value="192" className="bg-slate-900">192 kbps (Standard)</option>
              <option value="128" className="bg-slate-900">128 kbps (Fast File)</option>
            </select>
          </div>

          {/* Audio Fade Effect Checkbox */}
          <div className="flex items-center gap-2 p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs">
            <input
              type="checkbox"
              id="fadeEffect"
              checked={fadeEffect}
              onChange={(e) => setFadeEffect(e.target.checked)}
              className="w-4 h-4 rounded text-purple-500 accent-purple-500 cursor-pointer"
            />
            <label htmlFor="fadeEffect" className="text-slate-300 font-medium cursor-pointer text-[11px]">
              Smooth Fade-in & Fade-out Curves
            </label>
          </div>

        </div>

        {/* Modal Action Buttons (Listen Preview & Export Download) */}
        <div className="flex flex-col sm:flex-row gap-3">
          
          <button
            onClick={handleTogglePreview}
            className="flex-1 py-3 px-4 rounded-2xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            {isPlayingPreview ? (
              <>
                <Pause className="w-4 h-4 text-purple-400 fill-purple-400" />
                <span>PAUSE PREVIEW</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4 text-cyan-400 fill-cyan-400" />
                <span>LISTEN TO TRIMMED PREVIEW</span>
              </>
            )}
          </button>

          <button
            onClick={handleDownloadTrimmed}
            className="flex-1 py-3 px-4 rounded-2xl btn-glow-pink text-white font-extrabold text-xs font-mono flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg"
          >
            <Download className="w-4 h-4 fill-white" />
            <span>EXPORT TRIMMED MP3 ({Math.round(endTime - startTime)}s)</span>
          </button>

        </div>

      </div>
    </div>
  );
}
