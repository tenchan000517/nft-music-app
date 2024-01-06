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
  const audioRef = useRef(null); // audio要素へのref
  const [isPlaying, setIsPlaying] = useState(false);
  const { isAudioPlaying, pauseAudioPlayer, resumeAudioPlayer, isSamplePlaying, setIsSamplePlaying, stopSample } = useContext(PlayQueueContext);
  const fadeOutTimeout = useRef();

//   useEffect(() => {
//     setMediaRef(audioRef.current); // コンテキストにaudio要素のrefを設定
//   }, [setMediaRef]);

  const stopLocalSample = useCallback(() => {
    if (audioRef.current && !audioRef.current.paused) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setIsPlaying(false);
    clearTimeout(fadeOutTimeout.current);
    if (isAudioPlaying) {
      resumeAudioPlayer();
    }
  }, [audioRef, isAudioPlaying, resumeAudioPlayer, setIsPlaying]);

  const startFadeOut = useCallback(() => {
    if (audioRef.current) {
      let volume = 1.0;
      const fadeOut = () => {
        volume -= 0.1;
        if (volume <= 0) {
          stopLocalSample();
          resumeAudioPlayer();
        } else {
          audioRef.current.volume = volume;
          setTimeout(fadeOut, 200);
        }
      };
      fadeOut();
    }
  }, [audioRef, resumeAudioPlayer, stopLocalSample]);

  const toggleSamplePlay = async () => {
    if (isAudioPlaying) {
      pauseAudioPlayer();
    }

    if (isSamplePlaying) {
      stopSample(audioRef.current);
      clearTimeout(fadeOutTimeout.current);
    }

    if (!isPlaying) {
      const httpUrl = convertIpfsToHttp(animationUrl);
      audioRef.current.src = httpUrl;

      try {
        await audioRef.current.play();
        setIsSamplePlaying(true);
        setIsPlaying(true);
        fadeOutTimeout.current = setTimeout(() => {
          if (audioRef.current.src === httpUrl) {
            startFadeOut();
          }
        }, 20000);
      } catch (error) {
        console.error('Playback failed:', error);
        setIsPlaying(false);
      }
    } else {
      stopLocalSample();
    }
  };

  return (
    <div className="banner-card">
      <img src={image} alt={`${collectionName} banner`} />
      <div className="card-info">
        <h3>{collectionName}</h3>
        <p>{nftName}</p>
        {openseaLink && <a href={openseaLink} target="_blank" rel="noopener noreferrer" className="opensea-button">Opensea</a>}
        {animationUrl && <button onClick={toggleSamplePlay} className="sample-play-button">{isPlaying ? '停止' : 'サンプル再生'}</button>}
        <audio ref={audioRef} src={animationUrl} hidden></audio>
      </div>
    </div>
  );
};

export default BannerCard;
