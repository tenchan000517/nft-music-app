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

    let fadeOutTimeout = useRef();

    const stopSample = useCallback(() => {
        if (mediaRef.current && !mediaRef.current.paused) {
          mediaRef.current.pause();
          mediaRef.current.currentTime = 0;
        }
        setIsPlaying(false);
        setCurrentPlaying(null);
        clearTimeout(fadeOutTimeout.current);
      }, [setCurrentPlaying]);

      const toggleSamplePlay = async () => {

        console.log('BannerCard: toggleSamplePlay - START');
        console.log('BannerCard: toggleSamplePlay, currentPlaying before:', currentPlaying);
        console.log('BannerCard: toggleSamplePlay, isPlaying before:', isPlaying);

        if (!mediaRef.current) {
            console.error('Media element is not available');
            return;
          }
      
          if (currentPlaying?.type === 'audio' && currentPlaying.player) {
            await currentPlaying.player.pause();
            console.log('BannerCard: Paused current audio player');
          }
        
          if (currentPlaying?.type === 'sample' && currentPlaying.player) {
            await currentPlaying.player.pause();
            await setCurrentPlaying(null);
          }

                console.log('BannerCard: Paused current audio player');


        // 新しいサンプル再生
        if (isPlaying) {
            stopSample();
          } else {
            const httpUrl = convertIpfsToHttp(animationUrl);
            mediaRef.current.src = httpUrl;

            try {
                await mediaRef.current.play();
               
                console.log('BannerCard: Played mediaRef sample');

                setIsPlaying(true);
                setCurrentPlaying({ player: mediaRef.current, type: 'sample' });
               
                console.log('BannerCard: Sample playing started');

                // 20秒後に自動停止
                fadeOutTimeout.current = setTimeout(stopSample, 20000);

            } catch (error) {
                console.error('Playback failed:', error);
                setIsPlaying(false);
                setCurrentPlaying(null);
              }
            }
        
        console.log('BannerCard: toggleSamplePlay, currentPlaying after:', currentPlaying);
        console.log('BannerCard: toggleSamplePlay, isPlaying after:', isPlaying);
        console.log('BannerCard: toggleSamplePlay - END');

      };

      useEffect(() => {
        if (currentPlaying && currentPlaying.player !== mediaRef.current && isPlaying) {
          stopSample();
        }
      }, [currentPlaying, isPlaying, stopSample]);
  
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
