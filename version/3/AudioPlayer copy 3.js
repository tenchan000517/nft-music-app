import React, { useContext, useEffect, useRef } from 'react';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import { PlayQueueContext } from '../Context/PlayQueueContext';
import './AudioPlayer.css';

function convertIpfsUriToHttp(uri) {
  if (uri && uri.startsWith('ipfs://')) {
    return uri.replace('ipfs://', 'https://ipfs.io/ipfs/');
  }
  return uri;
}

const CombinedAudioPlayer = () => {
  const { queue, currentTrackIndex, playNext, stopSample, isSamplePlaying, setIsAudioPlaying, isAudioPlaying } = useContext(PlayQueueContext);
  const audioPlayerRef = useRef(null);

  useEffect(() => {
    const audioElement = audioPlayerRef.current.audio.current;

    if (queue.length > 0 && currentTrackIndex < queue.length) {
      const currentTrack = queue[currentTrackIndex];
      const audioElement = audioPlayerRef.current.audio.current;

      // const trackUrl = convertIpfsUriToHttp(currentTrack.url);

      audioElement.src = convertIpfsUriToHttp(currentTrack.url);
      audioElement.load();
    }

    if (isSamplePlaying) {
      audioElement.pause();
    } else if (isAudioPlaying) {
      audioElement.play().catch(e => console.error('Playback error:', e));
    }
  }, [queue, currentTrackIndex, isSamplePlaying, isAudioPlaying]);

  const handleAudioPlay = () => {
    if (isSamplePlaying) stopSample();
    setIsAudioPlaying(true);
  };

  const handleAudioPause = () => {
    setIsAudioPlaying(false);
  };

  const handleTrackEnd = () => {
    playNext();
  };

  const handleTrackError = (e) => {
    console.error('Audio error:', e);
    playNext();
  };

  const currentTrack = queue.length > 0 && currentTrackIndex < queue.length ? queue[currentTrackIndex] : null;
  const imageUri = currentTrack ? convertIpfsUriToHttp(currentTrack.image) : '';

  // Render component with controls
  return (
    <div className="combined-audio-player">
    {currentTrack && (
      <div className="current-song-image">
        <img src={imageUri} alt={currentTrack.name} />
      </div>
    )}
    <AudioPlayer
      ref={audioPlayerRef}
      autoPlay={false}
      onPlay={handleAudioPlay}
      onPause={handleAudioPause}
      onEnded={handleTrackEnd}
      onError={handleTrackError}
      autoPlayAfterSrcChange={true}
    />
    </div>

  );
};

export default CombinedAudioPlayer;
