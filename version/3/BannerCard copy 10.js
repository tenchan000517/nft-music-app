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
    // mediaRef.currentの存在と状態をログに出力
    console.log('stopSample called, mediaRef.current:', mediaRef.current);
    if (mediaRef.current && !mediaRef.current.paused) {
        console.log('mediaRef.current.paused before pause():', mediaRef.current.paused);
      mediaRef.current.pause();
      console.log('mediaRef.current.paused after pause():', mediaRef.current.paused);
      mediaRef.current.currentTime = 0;
    }
    setIsPlaying(false);
    clearTimeout(fadeOutTimeout.current);
    if (isAudioPlaying) {
      resumeAudioPlayer(); 
    }
}, [setIsPlaying, isAudioPlaying, resumeAudioPlayer]);

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
//   const toggleSamplePlay = async () => {
//     if (isAudioPlaying) {
//       pauseAudioPlayer();
//     }
    
//     if (isSamplePlaying) {
//       stopSample();
//     } else {
//       const httpUrl = convertIpfsToHttp(animationUrl);
//       mediaRef.current.src = httpUrl;
//       try {
//         await mediaRef.current.play();
//         setIsPlaying(true);
//         setIsSamplePlaying(true);
//         fadeOutTimeout.current = setTimeout(startFadeOut, 20000); // 20秒後にフェードアウト開始
//       } catch (error) {
//         console.error('Playback failed:', error);
//         setIsPlaying(false);
//         setIsSamplePlaying(false);
//       }
//     }
//   };

const toggleSamplePlay = async () => {

    console.log('BannerCard: toggleSamplePlay - START');

    if (isPlaying) {
        stopSample();
        setIsPlaying(false);
    if (isAudioPlaying) {
        resumeAudioPlayer();
      }
    } else {
        if (isSamplePlaying) {
            stopActiveSample(); // 他のサンプルを停止
        }
        if (isAudioPlaying) {
            pauseAudioPlayer();
        }
        const httpUrl = convertIpfsToHttp(animationUrl);
        mediaRef.current.src = httpUrl;
        console.log('BannerCard: HTTP URL for sample play:', httpUrl); // HTTP URL変換のログ

        try {
            await mediaRef.current.play();
            console.log('BannerCard: mediaRef.current.play() - Success'); // 再生成功のログ
            console.log('BannerCard: Played mediaRef sample');

            setIsPlaying(true);
            setIsSamplePlaying(true);
            console.log('BannerCard: Sample playing started');


            fadeOutTimeout.current = setTimeout(startFadeOut, 20000); // 20秒後にフェードアウト開始
            
        } catch (error) {
            console.error('Playback failed:', error);
            setIsPlaying(false);
        }
    }
    console.log('BannerCard: toggleSamplePlay, isPlaying after:', isPlaying);
    console.log('BannerCard: toggleSamplePlay - END');
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
