'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX, SkipBack, SkipForward } from 'lucide-react';
import SoundWaveAnim from './SoundWaveAnim';
import { cn } from '@/lib/utils';

export interface Track {
  id:       string;
  title:    string;
  genre:    string;
  bpm?:     number;
  src:      string;
  cover?:   string;
  duration: string;
}

interface AudioPlayerProps {
  tracks:      Track[];
  initialIndex?: number;
  className?:  string;
}

export default function AudioPlayer({ tracks, initialIndex = 0, className }: AudioPlayerProps) {
  const [currentIdx, setCurrentIdx] = useState(initialIndex);
  const [playing,    setPlaying]    = useState(false);
  const [muted,      setMuted]      = useState(false);
  const [progress,   setProgress]   = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);
  const track    = tracks[currentIdx];

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const updateProgress = () => setProgress((audio.currentTime / audio.duration) * 100 || 0);
    audio.addEventListener('timeupdate', updateProgress);
    audio.addEventListener('ended',      handleNext);
    return () => {
      audio.removeEventListener('timeupdate', updateProgress);
      audio.removeEventListener('ended',      handleNext);
    };
  });

  useEffect(() => {
    if (audioRef.current) {
      playing ? audioRef.current.play().catch(() => setPlaying(false)) : audioRef.current.pause();
    }
  }, [playing, currentIdx]);

  const handlePlayPause = () => setPlaying(!playing);

  const handlePrev = () => {
    setPlaying(false);
    setProgress(0);
    setTimeout(() => {
      setCurrentIdx((i) => (i - 1 + tracks.length) % tracks.length);
      setPlaying(true);
    }, 50);
  };

  const handleNext = () => {
    setPlaying(false);
    setProgress(0);
    setTimeout(() => {
      setCurrentIdx((i) => (i + 1) % tracks.length);
      setPlaying(true);
    }, 50);
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect  = e.currentTarget.getBoundingClientRect();
    const ratio = (e.clientX - rect.left) / rect.width;
    if (audioRef.current && !isNaN(audioRef.current.duration)) {
      audioRef.current.currentTime = ratio * audioRef.current.duration;
    }
  };

  return (
    <div className={cn('glass-dark rounded-2xl border border-rh-border p-5', className)}>
      <audio ref={audioRef} src={track.src} muted={muted} preload="metadata" />

      {/* Track info */}
      <div className="flex items-center gap-4 mb-4">
        <div className="w-12 h-12 rounded-xl bg-gradient-purple flex items-center justify-center shrink-0">
          {playing ? (
            <SoundWaveAnim bars={5} color="purple" />
          ) : (
            <span className="font-mono text-xs text-white">RH</span>
          )}
        </div>
        <div className="min-w-0 flex-1">
          <AnimatePresence mode="wait">
            <motion.p
              key={track.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
              className="font-syne font-semibold text-rh-white text-sm truncate"
            >
              {track.title}
            </motion.p>
          </AnimatePresence>
          <p className="text-rh-grey text-xs mt-0.5">
            {track.genre}{track.bpm ? ` · ${track.bpm} BPM` : ''} · {track.duration}
          </p>
        </div>
        <button
          onClick={() => setMuted(!muted)}
          className="text-rh-grey hover:text-rh-white transition-colors cursor-pointer p-1"
          aria-label={muted ? 'Activer le son' : 'Couper le son'}
        >
          {muted ? <VolumeX size={16} /> : <Volume2 size={16} />}
        </button>
      </div>

      {/* Progress bar */}
      <div
        className="relative h-1.5 bg-rh-border rounded-full mb-4 cursor-pointer group"
        onClick={handleSeek}
        role="progressbar"
        aria-valuenow={progress}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Progression de la lecture"
      >
        <motion.div
          className="absolute left-0 top-0 h-full rounded-full bg-gradient-neon"
          style={{ width: `${progress}%` }}
          transition={{ duration: 0.1 }}
        />
        <div
          className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-rh-purple opacity-0 group-hover:opacity-100 transition-opacity"
          style={{ left: `calc(${progress}% - 6px)` }}
        />
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-5">
        <button
          onClick={handlePrev}
          className="text-rh-grey hover:text-rh-white transition-colors cursor-pointer"
          aria-label="Piste précédente"
        >
          <SkipBack size={18} />
        </button>

        <motion.button
          onClick={handlePlayPause}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.94 }}
          className="w-12 h-12 rounded-full bg-gradient-neon flex items-center justify-center text-white glow-purple cursor-pointer"
          aria-label={playing ? 'Pause' : 'Lecture'}
        >
          {playing ? <Pause size={18} fill="white" /> : <Play size={18} fill="white" className="ml-0.5" />}
        </motion.button>

        <button
          onClick={handleNext}
          className="text-rh-grey hover:text-rh-white transition-colors cursor-pointer"
          aria-label="Piste suivante"
        >
          <SkipForward size={18} />
        </button>
      </div>

      {/* Track list */}
      {tracks.length > 1 && (
        <div className="mt-4 flex items-center justify-center gap-1.5" role="tablist" aria-label="Liste des pistes">
          {tracks.map((t, i) => (
            <button
              key={t.id}
              role="tab"
              aria-selected={i === currentIdx}
              aria-label={`Lire : ${t.title}`}
              onClick={() => { setCurrentIdx(i); setPlaying(true); setProgress(0); }}
              className={cn(
                'h-1 rounded-full transition-all duration-200 cursor-pointer',
                i === currentIdx ? 'w-6 bg-rh-purple' : 'w-1.5 bg-rh-border hover:bg-rh-grey'
              )}
            />
          ))}
        </div>
      )}
    </div>
  );
}
