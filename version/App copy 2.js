import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import SearchBox from './components/SearchBox';
// import SongList from './components/SongList';
import RecommendedSongs from './components/RecommendedSongs';
// import NFTList from './components/NFTList';
import AudioPlayer from './components/AudioPlayer';
import WalletConnect from './components/WalletConnect/WalletConnect';
import NFTDisplay from './components/NFTDisplay/NFTDisplay';
import MusicCard from './components/MusicCard/MusicCard';
import contracts from './contracts/config';

import { useSelector, useDispatch } from 'react-redux'; // 追加
import { fetchCollectionData } from './redux/dataActions'; // fetchCollectionData アクションをインポート

import { Goerli } from "@thirdweb-dev/chains";
import { smartWallet, metamaskWallet, coinbaseWallet, walletConnect, localWallet, embeddedWallet } from "@thirdweb-dev/react";
import { ThirdwebProvider } from "@thirdweb-dev/react";


import './App.css';

const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
const SECRET_KEY = process.env.REACT_APP_SECRET_KEY;
const FACTORY_ADDRESS = process.env.REACT_APP_FACTORY_ADDRESS;

const smartWalletOptions = {
    factoryAddress: FACTORY_ADDRESS,
    gasless: true,
};

function App() {
  const [userAddress, setUserAddress] = useState('');
  const [showMetamaskInstallPrompt, setShowMetamaskInstallPrompt] = useState(false);
  const [currentSong, setCurrentSong] = useState(null);

  const songs = useSelector(state => state.data.songs); // Reduxから曲データを取得
  const dispatch = useDispatch();

  const handleSelectSong = (song) => {
    setCurrentSong(song);
  };

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
    <div className="App">
      <Header 
        userAddress={userAddress} 
        setUserAddress={setUserAddress}
        showMetamaskInstallPrompt={showMetamaskInstallPrompt}
        setShowMetamaskInstallPrompt={setShowMetamaskInstallPrompt}
      />
      <SearchBox />

      <ThirdwebProvider 
                clientId={CLIENT_ID} 
                secretKey={SECRET_KEY} 
                supportedChains={[Goerli]} 
                supportedWallets={[
                    smartWallet(metamaskWallet({ recommended: true }), smartWalletOptions),
                    smartWallet(coinbaseWallet(), smartWalletOptions),
                    smartWallet(walletConnect(), smartWalletOptions),
                    smartWallet(localWallet(), smartWalletOptions),
                    embeddedWallet(),
                ]}
            >

<WalletConnect 
        userAddress={userAddress} 
        setUserAddress={setUserAddress} 
        showMetamaskInstallPrompt={showMetamaskInstallPrompt}
        setShowMetamaskInstallPrompt={setShowMetamaskInstallPrompt}
        connectToMetamask={connectToMetamask}
      />


      </ThirdwebProvider>

      <NFTDisplay handleSelectSong={handleSelectSong} />
      <div className="music-list">
        {songs.map(song => (
          <MusicCard key={song.name} song={song} onSelect={handleSelectSong} />
        ))}
      </div>
      {/* <NFTList songs={songs} onSelectSong={handleSelectSong} /> */}
      {/* <SongList songs={songs} onSelectSong={handleSelectSong} /> */}
      <RecommendedSongs />
      {currentSong && (
      <AudioPlayer
        src={currentSong.animation_url}
        currentSong={currentSong}
        autoPlay={false}
      />
      )}
    </div>
  );
}

export default App;
