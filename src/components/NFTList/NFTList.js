import React from 'react';
import './styles.css';

function NFTList({ songs, onSelectSong }) {
  return (
    <div className="nft-list">
      {songs.map(song => (
        <div key={song.name} onClick={() => onSelectSong(song)}>
          {song.title}
        </div>
      ))}
    </div>
  );
}

export default NFTList;
