import React, { useRef, useState, useContext, useEffect, useCallback } from 'react';
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
    // バナーカードのプロパティと状態管理
    const { image, collectionName, nftName, openseaLink, animationUrl } = banner;
    const mediaRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const { currentPlaying, setCurrentPlaying } = useContext(CurrentPlayingContext);

    useEffect(() => {
        console.log('BannerCard: useEffect for isPlaying, isPlaying:', isPlaying);
        if (isPlaying) {
            console.log('BannerCard: isPlaying updated to true');
        }
      }, [isPlaying]);

      useEffect(() => {
        console.log('BannerCard: useEffect for currentPlaying, currentPlaying:', currentPlaying);
        if (currentPlaying) {
          console.log('BannerCard: currentPlaying updated:', currentPlaying);
          // その他の必要な処理
        }
      }, [currentPlaying]);

    //   const playSample = async (httpUrl, onPlaySuccess, onPlayFailure) => {
    //     mediaRef.current.src = httpUrl;
    //     try {
    //       await mediaRef.current.play();
    //       onPlaySuccess(mediaRef.current);
    //     } catch (error) {
    //       console.error('Playback failed:', error);
    //       onPlayFailure();
    //     }
    //   };

    const updateStates = useCallback((newIsPlaying, newCurrentPlaying) => {
        return new Promise(resolve => {
          setIsPlaying(newIsPlaying);
          setCurrentPlaying(newCurrentPlaying);
          resolve();
        });
      }, [setIsPlaying, setCurrentPlaying]);

      const toggleSamplePlay = async () => {
        console.log('BannerCard: toggleSamplePlay - START');

        console.log('BannerCard: toggleSamplePlay, currentPlaying before:', currentPlaying);
        console.log('BannerCard: toggleSamplePlay, isPlaying before:', isPlaying);
      
        if (currentPlaying?.type === 'audio') {
            await currentPlaying.player.pause();
            await updateStates(false, null);
        }
      
    //     if (!isPlaying || currentPlaying?.type !== 'sample') {
    //       const httpUrl = convertIpfsToHttp(animationUrl);
    //       mediaRef.current.src = httpUrl;
    //       try {
    //         await mediaRef.current.play();
    //         console.log('BannerCard: mediaRef.current.play() - Success');

    //               // 再生が成功したことを確認する追加のロギング
    //   if (mediaRef.current && !mediaRef.current.paused) {
    //     console.log('BannerCard: Media is playing');
    //   } else {
    //     console.log('BannerCard: Media is not playing');
    //   }

        //     setIsPlaying(true);
        //     console.log('BannerCard: setIsPlaying(true) - Called');

        //     setCurrentPlaying({ player: mediaRef.current, type: 'sample' });
        //     console.log('BannerCard: setCurrentPlaying - Called');

      
        //     setTimeout(async () => {
        //       if (mediaRef.current && isPlaying) {
        //         await mediaRef.current.pause();
        //         setIsPlaying(false);
        //         setCurrentPlaying({ player: null, type: null });
        //         console.log('BannerCard: Sample Playback Stopped');

        //       }
        //     }, 20000);
        //   } catch (error) {
        //     console.error('Playback failed:', error);
        //     setIsPlaying(false);
        //     setCurrentPlaying({ player: null, type: null });
        //   }
        // } else {
        //   await mediaRef.current.pause();
        //   mediaRef.current.currentTime = 0;
        //   setIsPlaying(false);
        //   setCurrentPlaying({ player: null, type: null });
        //   console.log('BannerCard: Sample Playback Stopped');

        // }

        if (!isPlaying || currentPlaying?.type !== 'sample') {
            const httpUrl = convertIpfsToHttp(animationUrl);
            mediaRef.current.src = httpUrl;

            try {
                await mediaRef.current.play();
                await updateStates(true, { player: mediaRef.current, type: 'sample' });
              } catch (error) {
                console.error('Playback failed:', error);
                await updateStates(false, null);
              }
            } else {
              mediaRef.current.pause();
              await updateStates(false, null);
            }
        
      
        console.log('BannerCard: toggleSamplePlay, currentPlaying after:', currentPlaying);
        console.log('BannerCard: toggleSamplePlay, isPlaying after:', isPlaying);
        console.log('BannerCard: toggleSamplePlay - END');

      };
  
    useEffect(() => {
      // 再生状態やコンテキストの変更に応じて状態を更新
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
          <audio ref={mediaRef} src={animationUrl} hidden></audio>
        </div>
      </div>
    );
  };
  
  export default BannerCard;
