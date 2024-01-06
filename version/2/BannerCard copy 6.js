import React, { useRef, useState, useContext, useEffect } from 'react';
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

//     // 状態更新のロギング
// useEffect(() => {
//     console.log('BannerCard: useEffect - isPlaying state updated:', isPlaying);
//   }, [isPlaying]);
  
//   useEffect(() => {
//     console.log('BannerCard: useEffect - currentPlaying state updated:', currentPlaying);
//   }, [currentPlaying]);

      const toggleSamplePlay = async () => {

        console.log('BannerCard: toggleSamplePlay - START');
        console.log('BannerCard: toggleSamplePlay, currentPlaying before:', currentPlaying);
        console.log('BannerCard: toggleSamplePlay, isPlaying before:', isPlaying);
      
        if (currentPlaying?.type === 'audio') {
            if (currentPlaying?.type === 'audio') {
                await currentPlaying.player.pause();
                
                console.log('BannerCard: Paused current audio player');

              }
        }

        if (currentPlaying?.type === 'sample') {
            await currentPlaying.player.pause();
            await setCurrentPlaying(null);
        }

        // 新しいサンプル再生
        if (!isPlaying) {
            const httpUrl = convertIpfsToHttp(animationUrl);
            mediaRef.current.src = httpUrl;

            try {
                await mediaRef.current.play();
               
                console.log('BannerCard: Played mediaRef sample');

                setIsPlaying(true);
                await setCurrentPlaying({ player: mediaRef.current, type: 'sample' });
               
                console.log('BannerCard: Sample playing started');

                    // 20秒後にフェードアウト
                    setTimeout(() => {

                        console.log('BannerCard: Timeout started for fade out');

                        if (mediaRef.current && !mediaRef.current.paused) {
                            mediaRef.current.pause();
                            setIsPlaying(false);
                            setCurrentPlaying(null);

                            console.log('BannerCard: Sample playback stopped after timeout');

                        }
                    }, 20000);

              } catch (error) {
                console.error('Playback failed:', error);
             
                setIsPlaying(false);
                await setCurrentPlaying(null);
          
                console.log('BannerCard: Sample playback stopped');

              }

              console.log('BannerCard: toggleSamplePlay - END');

            } else {
              mediaRef.current.pause();
              setIsPlaying(false);
              await setCurrentPlaying(null);
            }
        
        console.log('BannerCard: toggleSamplePlay, currentPlaying after:', currentPlaying);
        console.log('BannerCard: toggleSamplePlay, isPlaying after:', isPlaying);
        console.log('BannerCard: toggleSamplePlay - END');

      };
  
    // useEffect(() => {
    //   // 再生状態やコンテキストの変更に応じて状態を更新
    //   if (currentPlaying && currentPlaying !== mediaRef.current && isPlaying) {
    //     setIsPlaying(false);

    //     console.log('BannerCard: useEffect - Reset isPlaying due to currentPlaying change');
    //     console.log('BannerCard: useEffect - isPlaying updated:', isPlaying);


    //   }
    // }, [currentPlaying, isPlaying]);
  
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
          {console.log('BannerCard: Button Label:', isPlaying ? '停止' : 'サンプル再生')}
            </button>
          )}
          <audio ref={mediaRef} src={animationUrl} hidden></audio>
        </div>
      </div>
    );
  };
  
  export default BannerCard;
