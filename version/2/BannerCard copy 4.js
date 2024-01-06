import React, { useRef, useState, useContext, useEffect } from 'react';
import { CurrentPlayingContext } from '../Context/CurrentPlayingContext';
import './BannerCard.css';

// IPFSリンクをHTTPリンクに変換する関数
const convertIpfsToHttp = (ipfsUrl) => {
  if (ipfsUrl.startsWith('ipfs://')) {
    return ipfsUrl.replace('ipfs://', 'https://ipfs.io/ipfs/');
  }
  return ipfsUrl;
};

const BannerCard = ({ banner }) => {
  const { image, collectionName, nftName, openseaLink, animationUrl } = banner;
  const mediaRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const { currentPlaying, setCurrentPlaying } = useContext(CurrentPlayingContext);

    // オーディオ再生ボタンのクリック時の処理を追加
    const handleAudioPlayerPlay = () => {
        if (isPlaying) {
          setIsPlaying(false);
        }
      };

  const toggleSamplePlay = () => {
    if (currentPlaying && currentPlaying !== mediaRef.current) {
      currentPlaying.pause();
      currentPlaying.currentTime = 0; // 再生位置をリセット
      setCurrentPlaying(null);
    }

    if (mediaRef.current) {
        if (isPlaying) {
          mediaRef.current.pause();
          setIsPlaying(false);
          setCurrentPlaying(null);
        } else {
          const httpUrl = convertIpfsToHttp(animationUrl);
          mediaRef.current.src = httpUrl;
          mediaRef.current.play();
          setCurrentPlaying(mediaRef.current);
          setIsPlaying(true);
  
          setTimeout(() => {
            if (mediaRef.current) {
              mediaRef.current.pause();
              mediaRef.current.currentTime = 0;
              setIsPlaying(false);
              setCurrentPlaying(null);
            }
          }, 20000); // 20秒後に停止
        }
      }
    };

    useEffect(() => {
        // オーディオ再生状態が変わったときの処理
        if (currentPlaying && currentPlaying !== mediaRef.current && isPlaying) {
          setIsPlaying(false);
        }
      }, [currentPlaying, isPlaying]);

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
          <button onClick={toggleSamplePlay}>
            {isPlaying ? '停止' : 'サンプル再生'}
          </button>
        )}
        <audio ref={mediaRef} src={animationUrl} hidden onPlay={handleAudioPlayerPlay}></audio>
      </div>
    </div>
  );
};

export default BannerCard;
