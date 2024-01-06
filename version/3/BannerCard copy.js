import React, { useRef, useState, useContext, useCallback } from 'react';
import { PlayQueueContext } from '../Context/CurrentPlayingContext';
import './BannerCard.css';

// IPFSリンクをHTTPリンクに変換する関数
const convertIpfsToHttp = (ipfsUrl) => {
  if (ipfsUrl.startsWith('ipfs://')) {
    return ipfsUrl.replace('ipfs://', 'https://ipfs.io/ipfs/');
  }
  return ipfsUrl;
};

const BannerCard = ({ banner }) => {
    // バナーカードのプロパティと状態管理
    const { image, collectionName, nftName, openseaLink, animationUrl } = banner;
    const mediaRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const { isAudioPlaying, pauseAudioPlayer } = useContext(PlayQueueContext); // Contextから関数を取得
    const fadeOutTimeout = useRef();
    const { setIsSamplePlaying } = useContext(PlayQueueContext);


    const stopSample = useCallback(() => {
        if (mediaRef.current && !mediaRef.current.paused) {
          mediaRef.current.pause();
          mediaRef.current.currentTime = 0;
        }
        setIsPlaying(false);
        clearTimeout(fadeOutTimeout.current);
      }, [setIsPlaying]);

    const toggleSamplePlay = async () => {

        if (isAudioPlaying()) {
            pauseAudioPlayer(); // オーディオが再生中なら停止する
          }
          setIsSamplePlaying(true);  // サンプル再生状態を true に設定


        if (isPlaying) {
    // サンプルの再生処理
    const httpUrl = convertIpfsToHttp(animationUrl);
    mediaRef.current.src = httpUrl;
    try {
        await mediaRef.current.play();
        setIsPlaying(true);
      } catch (error) {
        console.error('Playback failed:', error);
        setIsPlaying(false);
      }
    } else {
        stopSample();

        }
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
            <button onClick={toggleSamplePlay} className="sample-play-button">
          {isPlaying ? '停止' : 'サンプル再生'}
            </button>
          )}
          <audio ref={mediaRef} src={animationUrl} hidden></audio>
        </div>
      </div>
    );
  };
  
  export default BannerCard;