import React from 'react';
import './AudioPlayer.css'; // CSSファイルをインポート
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

function CombinedAudioPlayer({ src, currentSong }) {
  return (
    <div className="combined-audio-player"> {/* CSSクラス名を変更 */}
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
