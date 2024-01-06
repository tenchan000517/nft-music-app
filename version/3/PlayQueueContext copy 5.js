import React, { createContext, useState, useEffect, useCallback } from 'react';

export const PlayQueueContext = createContext({
  isAudioPlaying: false,
  setIsAudioPlaying: () => {},
});

export const PlayQueueProvider = ({ children }) => {
  const [queue, setQueue] = useState([]);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isSamplePlaying, setIsSamplePlaying] = useState(false);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);

  const pauseAudioPlayer = useCallback(() => {
    console.log('PlayQueueContext: pauseAudioPlayer called');
    setIsAudioPlaying(false);
  }, []);

  const resumeAudioPlayer = useCallback(() => {
    console.log('PlayQueueContext: resumeAudioPlayer called');
    if (queue.length > 0 && currentTrackIndex < queue.length && !isSamplePlaying) {
      setIsAudioPlaying(true);
    }
  }, [queue, currentTrackIndex, isSamplePlaying]);

  const addToQueue = (track) => {
    console.log('Adding to queue:', track);
    if (!track.url) {
      console.error('Track URL missing!');
      return;
    }
    const newQueue = [...queue, track];
    setQueue(newQueue);
    setCurrentTrackIndex(newQueue.length - 1);
  };

  const playNext = () => {
    if (currentTrackIndex < queue.length - 1) {
      setCurrentTrackIndex(currentTrackIndex + 1);
    }
  };

  const playPrevious = () => {
    if (currentTrackIndex > 0) {
      setCurrentTrackIndex(currentTrackIndex - 1);
    }
  };

  useEffect(() => {
    console.log(`PlayQueueContext: isAudioPlaying=${isAudioPlaying}, isSamplePlaying=${isSamplePlaying}`);
  }, [isAudioPlaying, isSamplePlaying]);

  const stopSample = useCallback(() => {
    console.log('PlayQueueContext: stopSample called');
    console.log('isSamplePlaying:', isSamplePlaying); // isSamplePlayingの状態をログに出力

    if (isSamplePlaying && mediaRef && mediaRef.current) {
        mediaRef.current.pause();        // 再生を停止
      mediaRef.current.currentTime = 0;  // 再生位置をリセット
      setIsSamplePlaying(false);  // サンプル再生状態を更新
      console.log('Sample playback stopped');

    } else {
      console.log('No action taken: audioElement is undefined or src does not match');
    }
  }, [isSamplePlaying, mediaRef]);

  const startSample = useCallback(() => {
    console.log('PlayQueueContext: startSample called');
    if (isAudioPlaying) {
      pauseAudioPlayer();
    }
    if (isSamplePlaying) {
      stopSample();
      console.log('PlayQueueContext: stopSample called');
    }
    setIsSamplePlaying(true);
  }, [isAudioPlaying, pauseAudioPlayer, isSamplePlaying, stopSample]);

  return (
    <PlayQueueContext.Provider value={{
      queue,
      currentTrackIndex,
      addToQueue,
      playNext,
      playPrevious,
      setQueue,
      setCurrentTrackIndex,
      pauseAudioPlayer,
      resumeAudioPlayer,
      isAudioPlaying,
      setIsAudioPlaying,
      isSamplePlaying,
      setIsSamplePlaying,
      startSample,
      stopSample,
      setMediaRef  // mediaRefを設定する関数
    }}>
      {children}
    </PlayQueueContext.Provider>
  );
};
