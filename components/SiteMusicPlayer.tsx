"use client";

import {Pause, Play} from "lucide-react";
import {useRef, useState} from "react";

export default function SiteMusicPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);

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

  return <aside className="site-music-player" aria-label="網站音樂播放器">
    <audio ref={audioRef} src="/audio/walk-through-every-today.mp3" preload="metadata" loop onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)}/>
    <button type="button" className="music-play-button" onClick={togglePlayback} aria-label={playing ? "暫停《陪你走過每個今天》" : "播放《陪你走過每個今天》"}>
      {playing ? <Pause size={15} fill="currentColor"/> : <Play size={15} fill="currentColor"/>}
    </button>
  </aside>;
}
