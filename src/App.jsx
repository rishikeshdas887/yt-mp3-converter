import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import ConverterHero from './components/ConverterHero';
import AudioPlayerVisualizer from './components/AudioPlayerVisualizer';
import AudioTrimmerModal from './components/AudioTrimmerModal';
import AuthModal from './components/AuthModal';
import { VIPModal, DailySpinWheelModal, AdBannerPlacement } from './components/MonetizationHub';
import SEOSection from './components/SEOSection';
import Footer from './components/Footer';
import confetti from 'canvas-confetti';

export default function App() {
  // State
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('sonicstream_user');
    return saved ? JSON.parse(saved) : null;
  });

  const [userCredits, setUserCredits] = useState(150);
  const [selectedBitrate, setSelectedBitrate] = useState('320');
  const [videoData, setVideoData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [currentTrack, setCurrentTrack] = useState(null);
  const [trimmedTrack, setTrimmedTrack] = useState(null);

  // Modals
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showVIPModal, setShowVIPModal] = useState(false);
  const [showSpinWheel, setShowSpinWheel] = useState(false);
  const [vipAdFree, setVipAdFree] = useState(false);

  const [trendingTracks, setTrendingTracks] = useState([]);

  // Fetch trending tracks on launch
  useEffect(() => {
    fetch('/api/trending')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setTrendingTracks(data.tracks);
        }
      })
      .catch(err => console.warn("Failed to fetch trending:", err));
  }, []);

  // Sync user state with localStorage
  const handleAuthSuccess = (userData) => {
    setUser(userData);
    localStorage.setItem('sonicstream_user', JSON.stringify(userData));
    setShowAuthModal(false);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('sonicstream_user');
  };

  // Convert / Extract handler
  const handleExtract = async (url) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/extract', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url })
      });

      const data = await response.json();
      if (data.success) {
        setVideoData(data.data);
        // Deduct 1 credit
        setUserCredits(prev => Math.max(0, prev - 1));
        confetti({ particleCount: 60, spread: 70, origin: { y: 0.6 } });
      } else {
        setError(data.error || 'Failed to extract video information.');
      }
    } catch (err) {
      console.error("Extract API Error:", err);
      setError('Connection error reaching SonicStream backend engine.');
    } finally {
      setLoading(false);
    }
  };

  // Download MP3 handler
  const handleDownload = (track, bitrateChoice) => {
    confetti({ particleCount: 70, spread: 60, origin: { y: 0.5 } });
    
    const downloadUrl = `/api/download/${track.videoId}?title=${encodeURIComponent(track.title)}&bitrate=${bitrateChoice}`;
    const a = document.createElement('a');
    a.href = downloadUrl;
    a.download = `${track.title}_${bitrateChoice}kbps.mp3`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="min-h-screen flex flex-col bg-cyber-grid relative selection:bg-cyan-500 selection:text-black">
      
      {/* Top Navbar */}
      <Navbar
        user={user}
        onOpenAuth={() => setShowAuthModal(true)}
        onOpenVIP={() => setShowVIPModal(true)}
        onOpenSpinWheel={() => setShowSpinWheel(true)}
        userCredits={userCredits}
        vipAdFree={vipAdFree}
        onToggleAdFree={() => setVipAdFree(!vipAdFree)}
      />

      {/* Monetization Native Ad Placement */}
      <AdBannerPlacement 
        position="header" 
        isVipAdFree={vipAdFree} 
        onOpenVIP={() => setShowVIPModal(true)} 
      />

      {/* Main Hero & Converter */}
      <main className="flex-1">
        <ConverterHero
          onExtract={handleExtract}
          videoData={videoData}
          loading={loading}
          error={error}
          selectedBitrate={selectedBitrate}
          setSelectedBitrate={setSelectedBitrate}
          onPlayTrack={(track) => setCurrentTrack(track)}
          onDownloadTrack={handleDownload}
          trendingTracks={trendingTracks}
          userCredits={userCredits}
        />

        {/* 1000% SEO Content Section */}
        <SEOSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Playable Live Audio Player with Canvas Spectrum Visualizer */}
      <AudioPlayerVisualizer
        currentTrack={currentTrack}
        bitrate={selectedBitrate}
        onOpenTrimmer={(track) => setTrimmedTrack(track)}
        onDownload={handleDownload}
      />

      {/* Audio Ringtone Cutter Modal */}
      {trimmedTrack && (
        <AudioTrimmerModal
          track={trimmedTrack}
          onClose={() => setTrimmedTrack(null)}
          onDownload={handleDownload}
        />
      )}

      {/* Google & Apple Auth Modal */}
      {showAuthModal && (
        <AuthModal
          user={user}
          onAuthSuccess={handleAuthSuccess}
          onLogout={handleLogout}
          onClose={() => setShowAuthModal(false)}
        />
      )}

      {/* VIP PRO Subscription Modal */}
      <VIPModal
        isOpen={showVIPModal}
        onClose={() => setShowVIPModal(false)}
        onUpgradeSuccess={() => {
          setVipAdFree(true);
          setUserCredits(9999);
          if (user) {
            setUser({ ...user, vipStatus: true, credits: 9999 });
          }
        }}
      />

      {/* Daily Reward Spin Wheel Modal */}
      <DailySpinWheelModal
        isOpen={showSpinWheel}
        onClose={() => setShowSpinWheel(false)}
        onWinCredits={(prize) => setUserCredits(prev => prev + prize)}
      />

    </div>
  );
}
