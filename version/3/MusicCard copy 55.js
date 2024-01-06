import React, { useContext } from 'react';
import './MusicCard.css';
import { PlayQueueContext } from '../Context/PlayQueueContext';

function convertIpfsUriToHttp(uri) {
  if (uri.startsWith('ipfs://')) {
    return uri.replace('ipfs://', 'https://ipfs.io/ipfs/');
  }
  return uri;
}

function MusicCard({ song }) {
  const { addToQueue } = useContext(PlayQueueContext);
  const imageUri = convertIpfsUriToHttp(song.image);
  const { 
    isAudioPlaying, 
    pauseAudioPlayer, 

  } = useContext(PlayQueueContext);

  const handleClick = () => {
    console.log(`MusicCard: handleClick called, song=${song.name}, isAudioPlaying=${isAudioPlaying}`);
  
    let trackUrl = song.url || song.animation_url; // 'url' または 'animation_url' を使用
    trackUrl = convertIpfsUriToHttp(trackUrl); // IPFS URL を変換
  
    if (!trackUrl) {
      console.error("MusicCard: Track URL missing for", song);
      return; // URLがなければ、キューに追加しない
    }
  
    const trackWithUrl = {
      ...song,
      url: trackUrl // 'url' プロパティに変換された URL を設定
    };
  
    if (isAudioPlaying) {
      pauseAudioPlayer();
    }
  
    addToQueue(trackWithUrl);
    console.log("MusicCard: Selected song", trackWithUrl);
  };
  
  

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
