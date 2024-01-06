// BannerCard.js
import React from 'react';
import './BannerCard.css';

const BannerCard = ({ banner  }) => {

    const { image, collectionName, nftName } = banner;


    return (
        <div className="banner-card">
          <img src={image} alt={`${collectionName} banner`} />
          <div className="card-info">
            <h3>{collectionName}</h3>
            <p>{nftName}</p>
          </div>
          {/* その他のスタイリングや要素 */}
        </div>
      );
    };

export default BannerCard;