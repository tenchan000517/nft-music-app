// CombinedAudioPlayer.js
import React from 'react';
import './AudioPlayer.css';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

function CombinedAudioPlayer({ src, currentSong }) {
  return (
    <div className="rhap_container">
      <div className="current-song-image">
          <img src={currentSong?.image || "https://nft-mint.xyz/data/paoimages/1.png"} alt={currentSong?.name || "#1"} />
      </div>
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
