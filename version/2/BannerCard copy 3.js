// BannerCard.js
import React, { useRef, useState, useContext } from 'react';
import { CurrentPlayingContext } from '../Context/CurrentPlayingContext';
import './BannerCard.css';

// IPFSリンクをHTTPリンクに変換する関数
const convertIpfsToHttp = (ipfsUrl) => {
    if (ipfsUrl.startsWith('ipfs://')) {
      return ipfsUrl.replace('ipfs://', 'https://ipfs.io/ipfs/');
    }
    return ipfsUrl; // IPFSリンクでない場合はそのまま返す
  };

  const BannerCard = ({ banner }) => {
    const { image, collectionName, nftName, openseaLink, animationUrl } = banner;
    const mediaRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const { currentPlaying, setCurrentPlaying } = useContext(CurrentPlayingContext);

    const toggleSamplePlay = () => {
        if (currentPlaying && currentPlaying !== mediaRef.current) {
            currentPlaying.pause(); // 他の再生中の音声を停止
        }

        const httpUrl = convertIpfsToHttp(animationUrl); // IPFSリンクをHTTPに変換
        if (mediaRef.current) {
            if (isPlaying) {
                mediaRef.current.pause();
                setCurrentPlaying(null);
                setIsPlaying(false);

            } else {
                mediaRef.current.src = httpUrl;
                mediaRef.current.play();
                setCurrentPlaying(mediaRef.current);
                setIsPlaying(true);

                setTimeout(() => {
                    mediaRef.current.pause();
                    setCurrentPlaying(null);
                    setIsPlaying(false);
                }, 30000); // 20秒後に停止
            }
            setIsPlaying(!isPlaying);
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