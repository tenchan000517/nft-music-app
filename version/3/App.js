import React, { useState, useEffect } from 'react';
// import Header from './components/Header';
import SearchBox from './components/SearchBox';
// import SongList from './components/SongList';
import RecommendedSongs from './components/RecommendedSongs';
// import NFTList from './components/NFTList';
import AudioPlayer from './components/AudioPlayer';
import WalletConnect from './components/WalletConnect/WalletConnect';
import NFTDisplay from './components/NFTDisplay/NFTDisplay';
// import MusicCard from './components/MusicCard/MusicCard';
import contracts from './contracts/config';

import { PlayQueueProvider } from './components/Context/PlayQueueContext';
import CollectionBanner from './components/CollectionBanner/CollectionBanner'; // CollectionBannerのインポート
import { BrowserRouter as Router } from 'react-router-dom';

import { useDispatch } from 'react-redux'; // 追加
import { fetchCollectionData } from './redux/dataActions'; // fetchCollectionData アクションをインポート

import './App.css';

function App() {
  const [userAddress, setUserAddress] = useState('');
  const [showMetamaskInstallPrompt, setShowMetamaskInstallPrompt] = useState(false);

  // const songs = useSelector(state => state.data.songs); // Reduxから曲データを取得
  const dispatch = useDispatch();

  // const handleSelectSong = (song) => {
  //   setCurrentSong(song);
  // };

  const connectToMetamask = async () => {
    const ethereum = window.ethereum;
    if (ethereum) {
      try {
        const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
        setUserAddress(accounts[0]);

        // ここでウォレットに接続した後にNFTデータを取得する
        contracts.forEach(contract => {
          dispatch(fetchCollectionData(accounts[0], contract.address, contract.abi));
        });
      } catch (error) {
        console.error("User rejected the connection request");
      }
    } else {
      console.log("No Metamask (or other wallet) installed!");
      setShowMetamaskInstallPrompt(true);
    }
  };

  useEffect(() => {
    if (userAddress) {
      // ウォレットアドレスが設定されている場合、NFTデータを取得
      contracts.forEach(contract => {
        dispatch(fetchCollectionData(userAddress, contract.address, contract.abi));
      });
    }
  }, [userAddress, dispatch]);

  return (
    <Router>

    <div className="App">
      {/* <Header 
        userAddress={userAddress} 
        setUserAddress={setUserAddress}
        showMetamaskInstallPrompt={showMetamaskInstallPrompt}
        setShowMetamaskInstallPrompt={setShowMetamaskInstallPrompt}
      /> */}
      <SearchBox />
      <WalletConnect 
        userAddress={userAddress} 
        setUserAddress={setUserAddress} 
        showMetamaskInstallPrompt={showMetamaskInstallPrompt}
        setShowMetamaskInstallPrompt={setShowMetamaskInstallPrompt}
        connectToMetamask={connectToMetamask}
      />

<PlayQueueProvider> {/* PlayQueueProviderでラップ */}

      <CollectionBanner /> {/* CollectionBannerのレンダリング */}

      <NFTDisplay />
        {/* {songs.map(song => (
          <MusicCard key={song.name} song={song} onSelect={handleSelectSong} />
        ))} */}
      {/* <NFTList songs={songs} onSelectSong={handleSelectSong} /> */}
      {/* <SongList songs={songs} onSelectSong={handleSelectSong} /> */}


      <RecommendedSongs />
      <AudioPlayer/>

</PlayQueueProvider>

    </div>
    </Router>

  );
}

export default App;