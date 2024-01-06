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
  const mediaRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const { isAudioPlaying, pauseAudioPlayer, resumeAudioPlayer, isSamplePlaying, setIsSamplePlaying } = useContext(PlayQueueContext);
  const fadeOutTimeout = useRef();

  const stopSample = useCallback(() => {
    if (mediaRef.current && !mediaRef.current.paused) {
      mediaRef.current.pause();
      mediaRef.current.currentTime = 0;
    }
    setIsPlaying(false);
    clearTimeout(fadeOutTimeout.current);
    if (isAudioPlaying) {
      resumeAudioPlayer();
    }
  }, [setIsPlaying, isAudioPlaying, resumeAudioPlayer]);

  const startFadeOut = useCallback(() => {
    if (mediaRef.current) {
      let volume = 1.0;
      const fadeOut = () => {
        volume -= 0.1;
        if (volume <= 0) {
          stopSample();
          resumeAudioPlayer();
        } else {
          mediaRef.current.volume = volume;
          setTimeout(fadeOut, 2000);
        }
      };
      fadeOut();
    }
  }, [stopSample, resumeAudioPlayer]);

  const toggleSamplePlay = async () => {
    console.log(`BannerCard: toggleSamplePlay called, isAudioPlaying=${isAudioPlaying}, isSamplePlaying=${isSamplePlaying}`);

    if (isAudioPlaying) {
      pauseAudioPlayer();  // オーディオが再生中なら一時停止
    }

    if (isSamplePlaying) {
      stopSample();  // 既存のサンプルが再生中なら停止
    }

    // 新しいサンプルの再生処理
    if (isPlaying) {
        stopSample();
      } else {
        const httpUrl = convertIpfsToHttp(animationUrl);
        mediaRef.current.src = httpUrl;
        try {
          await mediaRef.current.play();
          setIsSamplePlaying(true);
          setIsPlaying(true);
          fadeOutTimeout.current = setTimeout(startFadeOut, 20000); // ここでフェードアウト処理を設定
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
