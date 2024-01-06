// AudioPlayer.js
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
  const {
    queue, currentTrackIndex, playNext,
    stopSample, isSamplePlaying, setIsAudioPlaying
  } = useContext(PlayQueueContext);
  const audioPlayerRef = useRef(null);

  useEffect(() => {
    console.log("CombinedAudioPlayer: useEffect - Queue:", queue);
    console.log("CombinedAudioPlayer: useEffect - Current Track Index:", currentTrackIndex);

    if (queue.length > 0 && currentTrackIndex < queue.length) {
      const currentTrack = queue[currentTrackIndex];
      const audioElement = audioPlayerRef.current.audio.current;
      const trackUrl = convertIpfsUriToHttp(currentTrack.url);
      console.log("Converted track URL:", trackUrl);

      audioElement.src = convertIpfsUriToHttp(currentTrack.url);
      console.log("Converted track URL:", audioElement.src);

      audioElement.load();
      console.log("CombinedAudioPlayer: Track loaded:", currentTrack);

      audioElement.play().catch(e => console.error('Playback error:', e));
    }
  }, [queue, currentTrackIndex]);

  const handleAudioPlay = () => {
    console.log("CombinedAudioPlayer: handleAudioPlay - Sample Playing:", isSamplePlaying);

    if (isSamplePlaying) {
      stopSample();
      console.log("CombinedAudioPlayer: Stopped sample play.");

    }
    setIsAudioPlaying(true);
    console.log("CombinedAudioPlayer: Audio play started.");

  };

  const handleTrackEnd = () => {
    playNext();
    console.log("CombinedAudioPlayer: Track ended, playing next track.");
  };

  const handleTrackError = (e) => {
    console.error('Audio error:', e);
    if (audioPlayerRef.current && audioPlayerRef.current.audio.current) {
      console.log('Error occurred with URL:', audioPlayerRef.current.audio.current.src);
    }
    playNext();
    console.log("CombinedAudioPlayer: Error occurred, playing next track.");
  };

  const currentTrack = queue.length > 0 && currentTrackIndex < queue.length ? queue[currentTrackIndex] : null;
  const imageUri = currentTrack ? convertIpfsUriToHttp(currentTrack.image) : '';

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
        onError={handleTrackError}
        onEnded={handleTrackEnd}
        autoPlayAfterSrcChange={false}
      />
    </div>
  );
}

export default CombinedAudioPlayer;
