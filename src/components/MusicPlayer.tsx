'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { songs } from '@/data/songs'

export default function MusicPlayer() {
  const [currentSongIndex, setCurrentSongIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [volume, setVolume] = useState(70)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  const currentSong = songs[currentSongIndex]

  // Initialize audio element
  useEffect(() => {
    const audio = new Audio(currentSong.src)
    audio.volume = volume / 100
    audioRef.current = audio

    return () => {
      audio.pause()
      audio.src = ''
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // Update audio source when song changes
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const wasPlaying = isPlaying
    audio.src = currentSong.src
    audio.load()

    if (wasPlaying) {
      audio.play().catch(() => {})
    }
  }, [currentSongIndex]) // eslint-disable-line react-hooks/exhaustive-deps

  // Sync volume
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100
    }
  }, [volume])

  // Audio event listeners
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const onTimeUpdate = () => {
      setCurrentTime(audio.currentTime)
      if (audio.duration) {
        setProgress((audio.currentTime / audio.duration) * 100)
      }
    }

    const onLoadedMetadata = () => {
      setDuration(audio.duration)
    }

    const onEnded = () => {
      // Auto-advance to next song
      setCurrentSongIndex(prev => (prev < songs.length - 1 ? prev + 1 : 0))
    }

    audio.addEventListener('timeupdate', onTimeUpdate)
    audio.addEventListener('loadedmetadata', onLoadedMetadata)
    audio.addEventListener('ended', onEnded)

    return () => {
      audio.removeEventListener('timeupdate', onTimeUpdate)
      audio.removeEventListener('loadedmetadata', onLoadedMetadata)
      audio.removeEventListener('ended', onEnded)
    }
  }, [])

  const handlePlayPause = useCallback(() => {
    const audio = audioRef.current
    if (!audio) return

    if (isPlaying) {
      audio.pause()
    } else {
      audio.play().catch(() => {})
    }
    setIsPlaying(!isPlaying)
  }, [isPlaying])

  const handlePrev = useCallback(() => {
    setCurrentSongIndex(prev => (prev > 0 ? prev - 1 : songs.length - 1))
    setProgress(0)
    setCurrentTime(0)
  }, [])

  const handleNext = useCallback(() => {
    setCurrentSongIndex(prev => (prev < songs.length - 1 ? prev + 1 : 0))
    setProgress(0)
    setCurrentTime(0)
  }, [])

  const handlePlaylistClick = (index: number) => {
    setCurrentSongIndex(index)
    setProgress(0)
    setCurrentTime(0)
    setIsPlaying(true)
    // The useEffect for currentSongIndex will handle playing
  }

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const audio = audioRef.current
    if (!audio || !audio.duration) return

    const rect = e.currentTarget.getBoundingClientRect()
    const clickX = e.clientX - rect.left
    const newProgress = (clickX / rect.width) * 100
    audio.currentTime = (newProgress / 100) * audio.duration
    setProgress(newProgress)
  }

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVolume(Number(e.target.value))
  }

  const formatTime = (seconds: number) => {
    if (!seconds || isNaN(seconds)) return '0:00'
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <div className="box music-player">
      <div className="player-info">
        <div className="song-title">{currentSong.title}</div>
        <div style={{ fontSize: '0.85rem', color: '#718096' }}>{currentSong.artist}</div>
      </div>

      <div className="player-controls">
        <button className="player-btn" onClick={handlePrev}>
          <i className="fas fa-backward"></i>
        </button>
        <button className="player-btn" onClick={handlePlayPause}>
          <i className={`fas ${isPlaying ? 'fa-pause' : 'fa-play'}`}></i>
        </button>
        <button className="player-btn" onClick={handleNext}>
          <i className="fas fa-forward"></i>
        </button>
      </div>

      <div className="progress-container" onClick={handleProgressClick}>
        <div className="progress-bar" style={{ width: `${progress}%` }}></div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#718096', marginBottom: '10px' }}>
        <span>{formatTime(currentTime)}</span>
        <span>{formatTime(duration)}</span>
      </div>

      <div className="volume-control">
        <i className="fas fa-volume-up volume-icon"></i>
        <input
          type="range"
          min="0"
          max="100"
          value={volume}
          onChange={handleVolumeChange}
        />
      </div>

      <div className="playlist">
        {songs.map((song, index) => (
          <div
            key={index}
            className={`playlist-item ${index === currentSongIndex ? 'active' : ''}`}
            onClick={() => handlePlaylistClick(index)}
          >
            <span className="song-number">{String(index + 1).padStart(2, '0')}</span>
            <span className="song-title">{song.artist} - {song.title}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
