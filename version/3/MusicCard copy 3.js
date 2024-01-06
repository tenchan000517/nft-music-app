// MusicCard.js
import React, { useContext } from 'react';
import './MusicCard.css';
import { PlayQueueContext } from '../Context/CurrentPlayingContext';

function convertIpfsUriToHttp(uri) {
  // console.log('Original URI:', uri);
  if (uri.startsWith('ipfs://')) {
    const convertedUri = uri.replace('ipfs://', 'https://ipfs.io/ipfs/');
    // console.log('Converted URI:', convertedUri);
    return convertedUri;
  }
  return uri;
}

function MusicCard({ song }) {
  const { addToQueue } = useContext(PlayQueueContext);
  const imageUri = convertIpfsUriToHttp(song.image);
  const audioUri = song.url ? convertIpfsUriToHttp(song.url) : 'default-audio-path.mp3'; // トラックURLのチェックと変換


  const handleClick = () => {
    addToQueue(song);
    console.log("MusicCard: Selected song", song);  // 既存のログ出力
    if (song.url) {
        console.log("Track URL:", song.url);  // URLが存在する場合はログ出力
    } else {
        console.error("Track URL missing!");  // URLが存在しない場合はエラーをログ出力
    }
};
    // console.log(song.image)

  // console.log('Song data:', song);


  return (
    <div className="music-card" onClick={handleClick}>
      <div className="music-card-image">
      <img src={imageUri} alt={song.name} onError={(e) => { console.log('Image load error:', song.image); e.target.src = 'default-image-path.jpg'; }} />
      </div>
      <div className="music-card-content">
        <h3>{song.name}</h3>
        <p>{song.description}</p>
      </div>
    </div>
  );
}

export default MusicCard;
