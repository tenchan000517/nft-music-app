import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import SearchBox from './components/SearchBox';
import SongList from './components/SongList';
import RecommendedSongs from './components/RecommendedSongs';
import NFTList from './components/NFTList';
import AudioPlayer from './components/AudioPlayer';
import WalletConnect from './components/WalletConnect';
import NFTDisplay from './components/NFTDisplay';

import MusicCard from './components/MusicCard/MusicCard';
import { useSelector } from 'react-redux'; // 追加

import './App.css';

function App() {
  const [userAddress, setUserAddress] = useState('');
  const [showMetamaskInstallPrompt, setShowMetamaskInstallPrompt] = useState(false);
  const [currentSong, setCurrentSong] = useState(null);
  
  const songs = useSelector(state => state.data.songs); // 追加

  const handleSelectSong = (song) => {
    setCurrentSong(song);
  };

  useEffect(() => {
    const ethereum = window.ethereum;
    if (ethereum) {
      ethereum.on('accountsChanged', (accounts) => {
        setUserAddress(accounts[0]);
      });
    } else {
      setShowMetamaskInstallPrompt(true);
    }
  }, []);

  return (
    <div className="App">
      <Header 
        userAddress={userAddress} 
        setUserAddress={setUserAddress}
        showMetamaskInstallPrompt={showMetamaskInstallPrompt}
        setShowMetamaskInstallPrompt={setShowMetamaskInstallPrompt}
      />
      <SearchBox />
      <WalletConnect 
        userAddress={userAddress} 
        setUserAddress={setUserAddress} 
        handleSelectSong={handleSelectSong} // ここで関数を渡す
        showMetamaskInstallPrompt={showMetamaskInstallPrompt} 
        setShowMetamaskInstallPrompt={setShowMetamaskInstallPrompt}
      />
      <NFTDisplay handleSelectSong={handleSelectSong} />

      <div className="music-list">
        {songs.map(song => (
          <MusicCard key={song.name} song={song} onSelect={handleSelectSong} />
        ))}
      </div>
      <NFTList songs={songs} onSelectSong={handleSelectSong} />
      {currentSong && <AudioPlayer src={currentSong.animation_url} autoPlay={false} />}
      <SongList songs={songs} onSelectSong={handleSelectSong} />
      <RecommendedSongs />
    </div>
  );
}

export default App;
