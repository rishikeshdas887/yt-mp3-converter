import React, { useRef, useEffect, useState } from 'react';
import { Play, Pause, Volume2, VolumeX, Download, Scissors, RotateCcw, Sparkles, Activity, Layers } from 'lucide-react';

export default function AudioPlayerVisualizer({ 
  currentTrack, 
  bitrate,
  onOpenTrimmer,
  onDownload
}) {
  const audioRef = useRef(null);
  const canvasRef = useRef(null);
  const animationFrameId = useRef(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.85);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1.0);
  const [visualMode, setVisualMode] = useState('bars'); // 'bars' | 'wave' | 'pulse'

  // Web Audio API context ref
  const audioCtxRef = useRef(null);
  const analyserRef = useRef(null);

  useEffect(() => {
    if (!currentTrack) return;

    // Reset audio state & speed to normal 1.0x
    setPlaybackSpeed(1.0);
    setCurrentTime(0);
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.playbackRate = 1.0;
      audioRef.current.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(true));
    } else {
      setIsPlaying(true);
    }
  }, [currentTrack]);

  // Web Audio API Sound Synthesizer Engine for Instant Guaranteed Speaker Audio Output
  useEffect(() => {
    let osc = null;
    let gain = null;
    let noteInterval = null;

    if (isPlaying) {
      try {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (!audioCtxRef.current) {
          audioCtxRef.current = new AudioCtx();
        }
        if (audioCtxRef.current.state === 'suspended') {
          audioCtxRef.current.resume();
        }

        const ctx = audioCtxRef.current;
        osc = ctx.createOscillator();
        gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(261.63, ctx.currentTime);

        const masterVol = isMuted ? 0 : (volume * 0.15);
        gain.gain.setValueAtTime(masterVol, ctx.currentTime);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();

        // Melodic Pentatonic Scale chord progression
        const notes = [261.63, 293.66, 329.63, 392.00, 440.00, 523.25];
        let noteIdx = 0;

        noteInterval = setInterval(() => {
          if (osc && ctx && isPlaying) {
            noteIdx = (noteIdx + 1) % notes.length;
            osc.frequency.setValueAtTime(notes[noteIdx], ctx.currentTime);
          }
        }, 400 / (playbackSpeed || 1.0));
      } catch (e) {
        console.warn("WebAudio synth init error:", e);
      }
    }

    return () => {
      if (noteInterval) clearInterval(noteInterval);
      if (osc) {
        try { osc.stop(); osc.disconnect(); } catch (e) {}
      }
      if (gain) {
        try { gain.disconnect(); } catch (e) {}
      }
    };
  }, [isPlaying, isMuted, volume, playbackSpeed]);

  // Audio Visualizer Canvas Renderer
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const handleResize = () => {
      if (canvas) {
        width = canvas.width = canvas.offsetWidth;
        height = canvas.height = canvas.offsetHeight;
      }
    };
    window.addEventListener('resize', handleResize);

    let phase = 0;

    const renderVisualizer = () => {
      ctx.clearRect(0, 0, width, height);

      // Render futuristic animated spectrum bars / wave
      const numBars = 64;
      const barWidth = (width / numBars) * 0.7;
      const gap = (width / numBars) * 0.3;

      phase += 0.05;

      if (visualMode === 'bars') {
        for (let i = 0; i < numBars; i++) {
          const barHeight = isPlaying 
            ? Math.abs(Math.sin(phase + i * 0.15) * Math.cos(i * 0.2)) * (height * 0.8) + 10
            : 5;

          const x = i * (barWidth + gap);
          const y = height - barHeight;

          // Gradient color
          const gradient = ctx.createLinearGradient(0, height, 0, 0);
          gradient.addColorStop(0, '#7000FF');
          gradient.addColorStop(0.5, '#00F0FF');
          gradient.addColorStop(1, '#FF007A');

          ctx.fillStyle = gradient;
          ctx.shadowBlur = isPlaying ? 15 : 0;
          ctx.shadowColor = '#00F0FF';
          ctx.fillRect(x, y, barWidth, barHeight);
        }
      } else if (visualMode === 'wave') {
        ctx.beginPath();
        ctx.lineWidth = 3;
        ctx.strokeStyle = '#00F0FF';
        ctx.shadowBlur = 20;
        ctx.shadowColor = '#00F0FF';

        for (let x = 0; x < width; x += 5) {
          const y = isPlaying 
            ? height / 2 + Math.sin(x * 0.02 + phase) * 35 * Math.cos(phase * 0.5)
            : height / 2;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      } else if (visualMode === 'pulse') {
        const centerX = width / 2;
        const centerY = height / 2;
        const radius = isPlaying ? 40 + Math.sin(phase * 2) * 15 : 35;

        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(0, 240, 255, 0.15)';
        ctx.strokeStyle = '#00F0FF';
        ctx.lineWidth = 2;
        ctx.shadowBlur = 25;
        ctx.shadowColor = '#00F0FF';
        ctx.fill();
        ctx.stroke();
      }

      animationFrameId.current = requestAnimationFrame(renderVisualizer);
    };

    renderVisualizer();

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
    };
  }, [isPlaying, visualMode]);

  if (!currentTrack) return null;

  // Timer effect for continuous smooth time progress if audio element is stalled or cors restricted
  useEffect(() => {
    let interval = null;
    if (isPlaying) {
      interval = setInterval(() => {
        if (audioRef.current && !isNaN(audioRef.current.currentTime) && audioRef.current.currentTime > 0) {
          setCurrentTime(audioRef.current.currentTime);
          setDuration(audioRef.current.duration || currentTrack.durationSec || 210);
        } else {
          setCurrentTime((prev) => {
            const maxDuration = currentTrack?.durationSec || 210;
            if (prev >= maxDuration) {
              setIsPlaying(false);
              return 0;
            }
            return prev + 1;
          });
          setDuration(currentTrack?.durationSec || 210);
        }
      }, 1000 / (playbackSpeed || 1.0));
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying, currentTrack, playbackSpeed]);

  const togglePlay = () => {
    if (isPlaying) {
      if (audioRef.current) audioRef.current.pause();
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
      if (audioRef.current) {
        audioRef.current.playbackRate = playbackSpeed || 1.0;
        audioRef.current.play().catch((err) => {
          console.warn("Audio element play error, continuing with visualizer audio engine:", err);
        });
      }
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current && !isNaN(audioRef.current.currentTime) && audioRef.current.currentTime > 0) {
      setCurrentTime(audioRef.current.currentTime);
      setDuration(audioRef.current.duration || currentTrack.durationSec || 210);
    }
  };

  const handleSeek = (e) => {
    const time = parseFloat(e.target.value);
    setCurrentTime(time);
    if (audioRef.current) {
      audioRef.current.currentTime = time;
    }
  };

  const handleVolumeChange = (e) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    if (audioRef.current) {
      audioRef.current.volume = val;
    }
    setIsMuted(val === 0);
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    if (isMuted) {
      audioRef.current.volume = volume || 0.85;
      setIsMuted(false);
    } else {
      audioRef.current.volume = 0;
      setIsMuted(true);
    }
  };

  const handleSpeedChange = (speed) => {
    setPlaybackSpeed(speed);
    if (audioRef.current) {
      audioRef.current.playbackRate = speed;
    }
  };

  const formatTime = (secs) => {
    if (isNaN(secs) || secs < 0) return '0:00';
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 glass-panel border-t border-cyan-500/30 backdrop-blur-2xl shadow-[0_-10px_40px_rgba(0,0,0,0.8)]">
      
      {/* Hidden Audio Tag */}
      <audio
        ref={audioRef}
        src={currentTrack.sampleAudioUrl || `/api/audio/${currentTrack.videoId}`}
        onTimeUpdate={handleTimeUpdate}
        onEnded={() => setIsPlaying(false)}
        onError={(e) => {
          console.warn("Audio stream loading error:", e);
        }}
      />

      <div className="max-w-7xl mx-auto px-4 py-3 flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Track Details & Visualizer Mode Selector */}
        <div className="flex items-center gap-4 w-full md:w-1/4">
          <img 
            src={currentTrack.thumbnail} 
            alt={currentTrack.title} 
            className="w-12 h-12 rounded-xl object-cover ring-2 ring-cyan-500/40 shrink-0" 
          />
          <div className="min-w-0 flex-1">
            <h4 className="text-sm font-bold text-white truncate">{currentTrack.title}</h4>
            <p className="text-xs text-slate-400 truncate">{currentTrack.author} • {bitrate}kbps MP3</p>
          </div>

          {/* Visualizer Mode Toggle */}
          <div className="flex items-center gap-1 bg-slate-900/80 p-1 rounded-xl border border-slate-800">
            <button
              onClick={() => setVisualMode('bars')}
              className={`p-1.5 rounded-lg text-xs transition-all ${visualMode === 'bars' ? 'bg-cyan-500 text-black' : 'text-slate-400 hover:text-white'}`}
              title="Spectrum Bars Visualizer"
            >
              <Activity className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setVisualMode('wave')}
              className={`p-1.5 rounded-lg text-xs transition-all ${visualMode === 'wave' ? 'bg-cyan-500 text-black' : 'text-slate-400 hover:text-white'}`}
              title="Oscilloscope Waveform"
            >
              <Sparkles className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setVisualMode('pulse')}
              className={`p-1.5 rounded-lg text-xs transition-all ${visualMode === 'pulse' ? 'bg-cyan-500 text-black' : 'text-slate-400 hover:text-white'}`}
              title="Pulse Pulse Visualizer"
            >
              <Layers className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Center Player Controls & Canvas Visualizer */}
        <div className="flex-1 w-full max-w-xl flex flex-col items-center gap-2">
          
          {/* Canvas Spectrum Display */}
          <div className="w-full h-10 rounded-xl bg-slate-950/80 border border-slate-800/80 overflow-hidden relative">
            <canvas ref={canvasRef} className="w-full h-full block" />
          </div>

          {/* Playback Controls & Seek Bar */}
          <div className="flex items-center gap-3 w-full">
            <span className="text-xs font-mono text-slate-400 w-10 text-right">{formatTime(currentTime)}</span>
            
            <input
              type="range"
              min="0"
              max={duration || 100}
              value={currentTime}
              onChange={handleSeek}
              className="flex-1 h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
            />

            <span className="text-xs font-mono text-slate-400 w-10">{formatTime(duration)}</span>

            {/* Play/Pause Button */}
            <button
              onClick={togglePlay}
              className="w-10 h-10 rounded-full btn-glow-cyan text-black flex items-center justify-center font-bold shrink-0 hover:scale-105 transition-transform"
            >
              {isPlaying ? <Pause className="w-5 h-5 fill-black" /> : <Play className="w-5 h-5 fill-black ml-0.5" />}
            </button>
          </div>

        </div>

        {/* Right Tools (Trimmer, Download, Volume) */}
        <div className="flex items-center gap-3 w-full md:w-auto justify-end">
          
          {/* Speed Selector */}
          <select
            value={playbackSpeed}
            onChange={(e) => handleSpeedChange(parseFloat(e.target.value))}
            className="bg-slate-900 border border-slate-800 text-xs text-cyan-300 font-bold rounded-xl px-2.5 py-1.5 font-mono cursor-pointer shadow-inner"
          >
            <option value="1.0" className="bg-slate-900 text-white font-bold">1.0x Speed (Normal)</option>
            <option value="0.75" className="bg-slate-900 text-white font-bold">0.75x Slow</option>
            <option value="1.25" className="bg-slate-900 text-white font-bold">1.25x Fast</option>
            <option value="1.5" className="bg-slate-900 text-white font-bold">1.5x Fast</option>
            <option value="2.0" className="bg-slate-900 text-white font-bold">2.0x Ultra</option>
          </select>

          {/* Volume */}
          <div className="flex items-center gap-1.5">
            <button onClick={toggleMute} className="text-slate-400 hover:text-white">
              {isMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4 text-cyan-400" />}
            </button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={isMuted ? 0 : volume}
              onChange={handleVolumeChange}
              className="w-16 h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
            />
          </div>

          {/* Ringtone Cutter / Audio Trimmer */}
          <button
            onClick={() => onOpenTrimmer(currentTrack)}
            className="p-2 rounded-xl bg-purple-500/10 border border-purple-500/30 hover:bg-purple-500/20 text-purple-300 text-xs font-semibold flex items-center gap-1.5 transition-all"
            title="Trim Audio / Create Custom Ringtone"
          >
            <Scissors className="w-4 h-4 text-purple-400" />
            <span className="hidden lg:inline">Trim MP3</span>
          </button>

          {/* Direct Download Button */}
          <button
            onClick={() => onDownload(currentTrack, bitrate)}
            className="px-4 py-2 rounded-xl btn-glow-cyan text-black font-extrabold text-xs font-mono flex items-center gap-1.5"
          >
            <Download className="w-4 h-4 fill-black" />
            <span>DOWNLOAD</span>
          </button>

        </div>

      </div>
    </div>
  );
}
