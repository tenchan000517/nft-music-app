// BannerCard.js
import React, { useState } from 'react';
import './BannerCard.css';

const BannerCard = ({ banner }) => {
    const { image, collectionName, nftName, openseaLink, animationUrl } = banner;
    const [isPlaying, setIsPlaying] = useState(false);
  
    const handlePlaySample = () => {
      // サンプルの再生を制御するロジック
      setIsPlaying(true);
      setTimeout(() => setIsPlaying(false), 20000); // 20秒後に停止
    };

    return (
        <div className="banner-card">
          <img src={image} alt={`${collectionName} banner`} />
          <div className="card-info">
            <h3>{collectionName}</h3>
            <p>{nftName}</p>
            {openseaLink && (
              <a href={openseaLink} target="_blank" rel="noopener noreferrer" className="opensea-button">Opensea</a>
            )}
            {animationUrl && (
              <button onClick={handlePlaySample} className="sample-play-button">
                {isPlaying ? '停止' : '再生'}</button>
            )}
          </div>
          {/* その他のスタイリングや要素 */}
        </div>
      );
    };

export default BannerCard;