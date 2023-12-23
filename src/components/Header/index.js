import React from 'react';
import WalletConnect from '../WalletConnect/WalletConnect'; // 適切なパスに変更してください
import './styles.css';

function Header(props) {
  return (
    <header className="header">
      <h1 className="title">PAOPAO MUSIC STASION</h1>
      <div className="user-info">
        <WalletConnect {...props} />
      </div>
    </header>
  );
}

export default Header;
