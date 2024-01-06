// CombinedAudioPlayer.js
import React from 'react';
import './AudioPlayer.css';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

function convertIpfsUriToHttp(uri) {
  if (uri && uri.startsWith('ipfs://')) {
    return uri.replace('ipfs://', 'https://ipfs.io/ipfs/');
  }
  return uri;
}

function CombinedAudioPlayer({ src, currentSong }) {
  const audioSrc = convertIpfsUriToHttp(src);
  const imageUri = currentSong ? convertIpfsUriToHttp(currentSong.image) : '';


  return (
    <div className="combined-audio-player">
      {currentSong && (
        <div className="current-song-image">
          <img src={imageUri} alt={currentSong.name} />
        </div>
      )}
      <AudioPlayer
        autoPlay={false}
        src={audioSrc}
        onPlay={e => console.log("onPlay")}
        onError={e => console.error("Audio Error:", e)}
        autoPlayAfterSrcChange={false}
      />
    </div>
  );
}

export default CombinedAudioPlayer;
