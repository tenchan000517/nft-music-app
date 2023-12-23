import React from 'react';

function RecommendedSongs({ songs }) {
  return (
    <div className="recommended-songs">
      <h2>おススメ曲一覧</h2>
      <ul>
        {songs.map(song => (
          <li key={song.id}>
            {song.title} - {song.artist} ({song.duration})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RecommendedSongs;
