// MusicCard.js
import React from 'react';
import './MusicCard.css'; // CSSファイルのインポート

function MusicCard({ song, onSelect }) {
  const handleClick = () => {
    if (typeof onSelect === 'function') {
      onSelect(song);
    }
  };

  return (
    <div className="music-card" onClick={handleClick}>
      <div className="music-card-image">
        <img src={song.image} alt={song.name} />
      </div>
      <div className="music-card-content">
        <h3>{song.name}</h3>
        <p>{song.description}</p>
      </div>
    </div>
  );
}

export default MusicCard;
