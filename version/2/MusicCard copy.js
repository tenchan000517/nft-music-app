// MusicCard.js
import React from 'react';
import './MusicCard.css'; // CSSファイルのインポート

function convertIpfsUriToHttp(uri) {
  // console.log('Original URI:', uri);
  if (uri.startsWith('ipfs://')) {
    const convertedUri = uri.replace('ipfs://', 'https://ipfs.io/ipfs/');
    // console.log('Converted URI:', convertedUri);
    return convertedUri;
  }
  return uri;
}


function MusicCard({ song, onSelect }) {
  const imageUri = convertIpfsUriToHttp(song.image);
  const handleClick = () => {
    if (typeof onSelect === 'function') {
      onSelect(song);
    }
    // console.log(song.image)
  };

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
