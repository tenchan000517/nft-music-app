import React, { useContext, useRef } from 'react';
import './AudioPlayer.css';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import { PlayQueueContext } from '../Context/CurrentPlayingContext';

function convertIpfsUriToHttp(uri) {
  if (uri && uri.startsWith('ipfs://')) {
    return uri.replace('ipfs://', 'https://ipfs.io/ipfs/');
  }
  return uri;
}

const CombinedAudioPlayer = ({ src, currentSong }) => {
  const audioRef = useRef(null);
  const { currentPlaying, setCurrentPlaying } = useContext(CurrentPlayingContext);
  const audioSrc = convertIpfsUriToHttp(src);
  const imageUri = currentSong ? convertIpfsUriToHttp(currentSong.image) : '';

  const handleAudioPlay = async () => {

    if (currentPlaying.player && currentPlaying.player !== audioRef.current) {
      currentPlaying.player.pause();
    }
    setCurrentPlaying({ player: audioRef.current, type: 'audio' });
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
