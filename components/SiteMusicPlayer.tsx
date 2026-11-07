"use client";

import {Music2, Pause, Play, X} from "lucide-react";
import {useRef, useState} from "react";

export default function SiteMusicPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [visible, setVisible] = useState(true);

  async function togglePlayback() {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      try {
        await audio.play();
      } catch {
        setPlaying(false);
      }
    } else {
      audio.pause();
    }
  }

  function closePlayer() {
    const audio = audioRef.current;
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
    }
    setPlaying(false);
    setVisible(false);
  }

  if (!visible) return null;

  return <aside className="site-music-player" aria-label="網站音樂播放器">
    <audio ref={audioRef} src="/audio/walk-through-every-today.mp3" preload="metadata" loop onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)}/>
    <button type="button" className="music-play-button" onClick={togglePlayback} aria-label={playing ? "暫停《陪你走過每個今天》" : "播放《陪你走過每個今天》"}>
      {playing ? <Pause size={18} fill="currentColor"/> : <Play size={18} fill="currentColor"/>}
    </button>
    <Music2 className="music-note-icon" size={17} aria-hidden="true"/>
    <span className="music-copy"><small>網站音樂</small><strong>陪你走過每個今天</strong></span>
    <button type="button" className="music-close-button" onClick={closePlayer} aria-label="關閉網站音樂播放器"><X size={17}/></button>
  </aside>;
}
