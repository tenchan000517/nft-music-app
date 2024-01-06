import React, { useContext, useEffect, useRef } from 'react';
import './AudioPlayer.css';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import { CurrentPlayingContext } from '../Context/CurrentPlayingContext';

function convertIpfsUriToHttp(uri) {
  if (uri && uri.startsWith('ipfs://')) {
    return uri.replace('ipfs://', 'https://ipfs.io/ipfs/');
  }
  return uri;
}

function CombinedAudioPlayer({ src, currentSong }) {
  const audioRef = useRef(null);
  const { currentPlaying, setCurrentPlaying } = useContext(CurrentPlayingContext);
  const audioSrc = convertIpfsUriToHttp(src);
  const imageUri = currentSong ? convertIpfsUriToHttp(currentSong.image) : '';

  useEffect(() => {
    console.log('CombinedAudioPlayer: useEffect - START');

    console.log('CombinedAudioPlayer: useEffect, currentPlaying:', currentPlaying);
    if (currentPlaying?.player && currentPlaying.player !== audioRef.current.audio.current) {
      currentPlaying.player.pause();
    }
    console.log('CombinedAudioPlayer: useEffect - END');

  }, [currentPlaying]);

  const handleAudioPlay = () => {
    console.log('CombinedAudioPlayer: handleAudioPlay - START');

    console.log('CombinedAudioPlayer: handleAudioPlay, currentPlaying before:', currentPlaying);
    if (currentPlaying && currentPlaying.type === 'sample') {
      currentPlaying.player.pause();
      currentPlaying.player.currentTime = 0;
    }
    setCurrentPlaying({ player: audioRef.current.audio.current, type: 'audio' });
    console.log('CombinedAudioPlayer: setCurrentPlaying called');
    console.log('CombinedAudioPlayer: handleAudioPlay - END');

  };

  return (
    <div className="combined-audio-player">
      {currentSong && (
        <div className="current-song-image">
          <img src={imageUri} alt={currentSong.name} />
        </div>
      )}
      <AudioPlayer
        ref={audioRef}
        autoPlay={false}
        src={audioSrc}
        onPlay={handleAudioPlay}
        onError={e => console.error("Audio Error:", e)}
        autoPlayAfterSrcChange={false}
      />
    </div>
  );
}

export default CombinedAudioPlayer;
