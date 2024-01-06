// BannerCard.js
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
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const { isAudioPlaying, pauseAudioPlayer, resumeAudioPlayer, isSamplePlaying, setIsSamplePlaying, currentSampleUrl, setCurrentSampleUrl, stopSample, setMediaRef  } = useContext(PlayQueueContext);
  const fadeOutTimeout = useRef();

  useEffect(() => {
    setMediaRef(audioRef.current);
  }, [setMediaRef]);

  const stopLocalSample  = useCallback(() => {
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

    console.log('BannerCard: mediaRef.current', mediaRef.current);


    if (isAudioPlaying) {
      pauseAudioPlayer();  // オーディオが再生中なら一時停止
    }

  // 現在再生中のサンプルを停止し、フェードアウト処理をキャンセル
  if (isSamplePlaying) {
    stopSample(mediaRef.current, currentSampleUrl);
    clearTimeout(fadeOutTimeout.current); // フェードアウトのタイムアウトをクリア
  }

  // 新しいサンプルの再生処理
  if (!isPlaying) {
    const httpUrl = convertIpfsToHttp(animationUrl);
    mediaRef.current.src = httpUrl;

    // // 再生終了時に currentSampleUrl を更新するイベントリスナーを追加
    // mediaRef.current.onended = () => {
    //     setCurrentSampleUrl(httpUrl);
    // };

    try {
      await mediaRef.current.play();
      setIsSamplePlaying(true);
      setIsPlaying(true);
      setCurrentSampleUrl(httpUrl);  // 新しいサンプルのURLを設定

      // フェードアウトのタイムアウトを設定
      fadeOutTimeout.current = setTimeout(() => {
        if (mediaRef.current.src === httpUrl) {
          startFadeOut();
        }
      }, 20000); // 20秒後にフェードアウト開始
    } catch (error) {
      console.error('Playback failed:', error);
      setIsPlaying(false);
    }
  } else {
    stopLocalSample(); // 手動で停止する場合の処理
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
        <audio ref={audioRef} src={animationUrl} hidden></audio>
      </div>
    </div>
  );
};

export default BannerCard;
