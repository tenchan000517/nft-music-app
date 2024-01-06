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
    const fadeOutTimeout = useRef();

    const playSample = async (url) => {
        const httpUrl = convertIpfsToHttp(url);
        mediaRef.current.src = httpUrl;
        try {
          await mediaRef.current.play();
          setIsPlaying(true);
          setCurrentPlaying({ player: mediaRef.current, type: 'sample' });
        } catch (error) {
          console.error('Playback failed:', error);
          setIsPlaying(false);
          setCurrentPlaying(null);
        }
      };

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
            setCurrentPlaying(null);

          }
        
          if (currentPlaying?.type === 'sample' && currentPlaying.player) {
            await currentPlaying.player.pause();
            setCurrentPlaying(null);
          }

            console.log('BannerCard: Paused current audio player');


        // 新しいサンプル再生
        if (isPlaying) {
            stopSample();
          } else {
            await playSample(animationUrl);
            mediaRef.current.src = httpUrl;
            console.log('BannerCard: HTTP URL for sample play:', httpUrl); // HTTP URL変換のログ


            try {
                await mediaRef.current.play();
                console.log('BannerCard: mediaRef.current.play() - Success'); // 再生成功のログ

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
