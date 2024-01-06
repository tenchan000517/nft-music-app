// NFTDisplay.js
import React from 'react';
import MusicCard from '../MusicCard/MusicCard';
import Slider from 'react-slick';
import { useSelector } from 'react-redux';
import './NFTDisplay.css';

function NFTDisplay({ handleSelectSong }) {
  const nftData = useSelector(state => state.data.nftData);

  const groupedNFTs = nftData.reduce((acc, nft) => {
    const key = nft.animation_url || 'default'; 
    acc[key] = acc[key] || [];
    acc[key].push(nft);
    return acc;
  }, {});

  const isMobile = window.innerWidth < 768;

  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: isMobile ? 2 : 3,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    swipeToSlide: true,
    variableWidth: true,
    responsive: [
      {
        breakpoint: 640, // 640px以下のビューポートサイズで適用
        settings: {
          slidesToShow: 1, // 1枚のスライドを表示
          slidesToScroll: 1,
          infinite: true,
          dots: false
        }
      }
      // 他のビューポートサイズの設定を追加可能
    ]
  };

  return (
    <div className="nft-display">
      {Object.entries(groupedNFTs).map(([key, nfts]) => (
        <div key={key} className="nft-group">
          {nfts.length > 1 ? (
            <Slider {...sliderSettings}>
              {nfts.map((nft, idx) => (
                <div key={`${nft.tokenId}-${idx}`} className="nft-card-container">
                  <MusicCard song={nft} onSelect={handleSelectSong} />
                </div>
              ))}
            </Slider>
          ) : (
            nfts.map((nft, idx) => (
              <div key={`${nft.tokenId}-${idx}`} className="nft-card-container">
                <MusicCard song={nft} onSelect={handleSelectSong} />
              </div>
            ))
          )}
        </div>
      ))}
    </div>
  );
}

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div className={className} style={{ ...style, display: "block" }} onClick={onClick} />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div className={className} style={{ ...style, display: "block" }} onClick={onClick} />
  );
}

export default NFTDisplay;
