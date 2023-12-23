import React from 'react';
import WalletConnect from '../WalletConnect/WalletConnect'; // WalletConnectをインポート
import './styles.css';

function Header(props) {
  return (
    <header className="header">
      <h1 className="title">My Music App</h1>
      <div className="user-info">
        <WalletConnect {...props} />
      </div>
    </header>
  );
}

export default Header;
