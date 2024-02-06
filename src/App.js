import React, { useState, useEffect } from 'react';
import './App.css'; 

const AudioPlayer = ({ playlist, currentTrack, setCurrentTrack }) => {
  const [audioRef, setAudioRef] = useState(new Audio());
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    
    audioRef.src = playlist[currentTrack]?.url;

    
    audioRef.addEventListener('ended', () => {
      setCurrentTrack((prevTrack) => (prevTrack + 1) % playlist.length);
    });

    return () => {
      
      audioRef.removeEventListener('ended', () => {});
    };
  }, [currentTrack, playlist, setCurrentTrack, audioRef]);

  useEffect(() => {
   
    audioRef.load();
    audioRef.play().then(() => setIsPlaying(true));

    return () => {
     
      audioRef.pause();
      setIsPlaying(false);
      audioRef.currentTime = 0;
    };
  }, [audioRef]);

  const handlePlayPause = () => {
    if (isPlaying) {
      audioRef.pause();
    } else {
      audioRef.play().then(() => setIsPlaying(true));
    }
  };

  return (
    <div>
      <h2>Now Playing: {playlist[currentTrack]?.name}</h2>
      <audio controls ref={setAudioRef} />
      <button onClick={handlePlayPause}>{isPlaying ? 'Pause' : 'Play'}</button>
    </div>
  );
};

const App = () => {
  const initialPlaylist = [
    { name: 'Track 1', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' },
    { name: 'Track 2', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3' },
    
  ];

  const [currentTrack, setCurrentTrack] = useState(0);

  useEffect(() => {
    localStorage.setItem('currentTrack', currentTrack.toString());
  }, [currentTrack]);

  useEffect(() => {
    
    const lastTrack = localStorage.getItem('currentTrack');
    if (lastTrack !== null) {
      setCurrentTrack(parseInt(lastTrack, 10));
    }
  }, []);

  return (
    <div className="container">
      <h1>Audio Player App</h1>
      <AudioPlayer
        playlist={initialPlaylist}
        currentTrack={currentTrack}
        setCurrentTrack={setCurrentTrack}
      />
    </div>
  );
};

export default App;
