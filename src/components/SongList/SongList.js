import React from 'react';
import './styles.css';

function SongList({ songs, onSelectSong }) {
  return (
    <div className="song-list">
      {songs.map(song => (
        <div key={song.name} onClick={() => onSelectSong(song)}>
          {song.title}
        </div>
      ))}
    </div>
  );
}

export default SongList;
