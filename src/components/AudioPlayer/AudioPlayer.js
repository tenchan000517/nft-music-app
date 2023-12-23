// CombinedAudioPlayer.js
import React from 'react';
import './AudioPlayer.css';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

function CombinedAudioPlayer({ src, currentSong }) {
  return (
    <div className="combined-audio-player">
      {currentSong && (
        <div className="current-song-image">
          <img src={currentSong.image} alt={currentSong.name} />
        </div>
      )}
      <AudioPlayer
        autoPlay={false}
        src={src}
        onPlay={e => console.log("onPlay")}
        onError={e => console.error("Audio Error:", e)}
        autoPlayAfterSrcChange={false}
      />
    </div>
  );
}

export default CombinedAudioPlayer;
