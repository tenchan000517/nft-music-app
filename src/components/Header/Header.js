import React from 'react';
// import WalletConnect from '../AudioPlayer/AudioPlayer'; // WalletConnectをインポート
import './styles.css';

function Header(props) {
  return (
    <header className="header">
      <h1 className="title">My Music App</h1>
      <div className="user-info">
      <WalletConnect 
        userAddress={userAddress} 
        setUserAddress={setUserAddress} 
        showMetamaskInstallPrompt={showMetamaskInstallPrompt}
        setShowMetamaskInstallPrompt={setShowMetamaskInstallPrompt}
        connectToMetamask={connectToMetamask}
      />      </div>
    </header>
  );
}

export default Header;
