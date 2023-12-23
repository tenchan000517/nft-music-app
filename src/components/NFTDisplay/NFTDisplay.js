import React from 'react';
import MusicCard from '../MusicCard/MusicCard';
import Slider from 'react-slick';
import { useSelector } from 'react-redux';
import './NFTDisplay.css';

function NFTDisplay({ handleSelectSong }) {
  const nftData = useSelector(state => state.data.nftData);

  // NFTをアニメーションURLごとにグループ化
  const groupedNFTs = nftData.reduce((acc, nft) => {
    const key = nft.animation_url || 'default'; 
    acc[key] = acc[key] || [];
    acc[key].push(nft);
    return acc;
  }, {});

  return (
    <div className="nft-display">
      {Object.entries(groupedNFTs).map(([key, nfts]) => {
        console.log(`Group: ${key}, NFTs: `, nfts);

        const sliderSettings = {
          dots: true,
          infinite: nfts.length > 6,
          speed: 500,
          slidesToShow: Math.min(6, nfts.length),
          slidesToScroll: 1,
          nextArrow: <SampleNextArrow />,
          prevArrow: <SamplePrevArrow />
        };

        return (
          <div key={key} className="nft-group">
            {nfts.length > 6 ? (
              <Slider {...sliderSettings}>
                {nfts.map((nft, idx) => (
                  <div key={`${nft.tokenId}-${idx}`} className="nft-card-container">
                    <MusicCard song={nft} onSelect={handleSelectSong} />
                  </div>
                ))}
              </Slider>
            ) : (
              <div className="nft-grid">
                {nfts.map((nft, idx) => (
                  <MusicCard key={`${nft.tokenId}-${idx}`} song={nft} onSelect={handleSelectSong} />
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div className={className} style={{ ...style, display: "block", background: "red" }} onClick={onClick} />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div className={className} style={{ ...style, display: "block", background: "red" }} onClick={onClick} />
  );
}

export default NFTDisplay;
