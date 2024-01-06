import React, { useRef, useState, useContext, useCallback, useEffect } from 'react';
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
  const mediaRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const { 
    isAudioPlaying, 
    pauseAudioPlayer, 
    resumeAudioPlayer,
    isSamplePlaying, 
    setIsSamplePlaying,
    stopActiveSample 
  } = useContext(PlayQueueContext);
  const fadeOutTimeout = useRef();

  // サンプルを停止する関数
  const stopSample = useCallback(() => {
    console.log('stopSample called');
    if (mediaRef.current && !mediaRef.current.paused) {
      mediaRef.current.pause();
      mediaRef.current.currentTime = 0;
    }
    setIsPlaying(false);
    clearTimeout(fadeOutTimeout.current);
    if (isAudioPlaying) {
      resumeAudioPlayer();
    }
  }, [isAudioPlaying, resumeAudioPlayer]);

  
    // isSamplePlayingの変更を監視し、変更があった場合はstopSampleを実行
    useEffect(() => {
        if (!isSamplePlaying) {
          stopSample();
        }
      }, [isSamplePlaying, stopSample]);

  // フェードアウト処理
  const startFadeOut = useCallback(() => {
    if (mediaRef.current) {
      let volume = 1.0;
      const fadeOut = () => {
        volume -= 0.1;
        if (volume <= 0) {
          stopSample();
        } else {
          mediaRef.current.volume = volume;
          setTimeout(fadeOut, 200);
        }
      };
      fadeOut();
    }
  }, [stopSample]);

  // サンプルの再生/停止を切り替える関数
  const toggleSamplePlay = async () => {
    console.log(`toggleSamplePlay called - isPlaying: ${isPlaying}, isSamplePlaying: ${isSamplePlaying}, isAudioPlaying: ${isAudioPlaying}`);
    if (isPlaying) {
      stopSample();
    } else {
      if (isSamplePlaying) {
        stopActiveSample(); // 他のサンプルを停止
        await new Promise(resolve => setTimeout(resolve, 2000)); // 1秒待機

      }
      if (isAudioPlaying) {
        pauseAudioPlayer();
        await new Promise(resolve => setTimeout(resolve, 1000)); // 1秒待機

      }
      const httpUrl = convertIpfsToHttp(animationUrl);
      mediaRef.current.src = httpUrl;

      try {
        await mediaRef.current.play();
        setIsPlaying(true);
        setIsSamplePlaying(true);
        fadeOutTimeout.current = setTimeout(startFadeOut, 20000); // 20秒後にフェードアウト開始
      } catch (error) {
        console.error('Playback failed:', error);
        setIsPlaying(false);
      }
    }
  };

  return (

    <div className="banner-card">
      <img src={image} alt={`${collectionName} banner`} />
      <div className="card-info">
      <div className="card-info-child">

        <h3>{collectionName}</h3>
        <p>{nftName}</p>
        </div>

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
