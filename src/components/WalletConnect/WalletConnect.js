// WalletConnect.js
import React from 'react';
import './WalletConnect.css';

function WalletConnect({ userAddress, setUserAddress, showMetamaskInstallPrompt, setShowMetamaskInstallPrompt, connectToMetamask }) {
  return (
    <div>
      {userAddress ? (
        <span>Connected: {userAddress}</span>
      ) : (
        <button className="connect-button" onClick={connectToMetamask}>Connect to Wallet</button>
      )}
      {showMetamaskInstallPrompt && (
        <button onClick={() => window.location.href = "https://metamask.io/download.html"}>Install MetaMask</button>
      )}
    </div>
  );
}

export default WalletConnect;
