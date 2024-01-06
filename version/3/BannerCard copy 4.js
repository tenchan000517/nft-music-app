import React, { useRef, useState, useContext, useCallback } from 'react';
import { PlayQueueContext } from '../Context/PlayQueueContext';
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

  const { playSample, stopSample, isAudioPlaying, pauseAudioPlayer, resumeAudioPlayer } = useContext(PlayQueueContext);
  const mediaRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const fadeOutTimeout = useRef(null);

  const handleFadeOut = useCallback(() => {
    let volume = 1.0;
    const fadeOut = () => {
      volume -= 0.05;
      if (volume <= 0) {
        stopSample(); // サンプルを停止し、オーディオ再生を再開
        resumeAudioPlayer();
      } else {
        mediaRef.current.volume = volume;
        setTimeout(fadeOut, 200);
      }
    };
    fadeOut();
  }, [stopSample, resumeAudioPlayer]);

  const toggleSamplePlay = async () => {
    if (isPlaying) {
      clearTimeout(fadeOutTimeout.current);
      stopSample();
    } else {
      if (isAudioPlaying) pauseAudioPlayer();
      try {
        mediaRef.current.src = banner.animationUrl;
        await mediaRef.current.play();
        playSample();
        setIsPlaying(true);
        fadeOutTimeout.current = setTimeout(handleFadeOut, 20000); // 20秒後にフェードアウト開始
      } catch (error) {
        console.error('Sample playback failed:', error);
      }
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
