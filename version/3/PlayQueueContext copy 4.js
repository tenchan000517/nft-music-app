// PlayQueueContext.js
import React, { createContext, useState, useEffect, useCallback } from 'react';

export const PlayQueueContext = createContext({
  isAudioPlaying: false,
  setIsAudioPlaying: () => {},
  setMediaRef: () => {}, // mediaRef を設定するための関数

});

export const PlayQueueProvider = ({ children }) => {
  const [queue, setQueue] = useState([]);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isSamplePlaying, setIsSamplePlaying] = useState(false);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [currentSampleUrl, setCurrentSampleUrl] = useState(null);
  const [mediaRef, setMediaRef] = useState(null);

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
    console.log('isSamplePlaying:', isSamplePlaying);
    // console.log('currentSampleUrl:', currentSampleUrl);
    if (isSamplePlaying && mediaRef.current) {
        const audioElement = mediaRef.current;
        audioElement.pause();        // 再生を停止
        audioElement.currentTime = 0;  // 再生位置をリセット
        setIsSamplePlaying(false);  // サンプル再生状態を更新
        // setPreviousSampleUrl(""); // 停止後、previousSampleUrlをクリア
    } else {
        console.log('No action taken: audioElement is undefined or src does not match');
      }
    }, [isSamplePlaying, mediaRef]);  // mediaRef を依存関係から除外
    

    const startSample = useCallback(() => {
        console.log('PlayQueueContext: startSample called');
    if (isAudioPlaying) {
      pauseAudioPlayer();
    }
    if (isSamplePlaying) {
      stopSample(); // 既存のサンプルを停止
      console.log('PlayQueueContext: stopSample PlayQueueContext called');

    }
    setIsSamplePlaying(true); // 新しいサンプルの再生を開始
    // setPreviousSampleUrl(currentSampleUrl); // 一つ前のサンプルURLを更新
    // setCurrentSampleUrl(newSampleUrl);      // 新しいサンプルURLを更新

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
      isSamplePlaying,
      setCurrentSampleUrl,  // この行を追加
      setMediaRef ,
      setIsSamplePlaying,
      startSample,
      stopSample,
      isAudioPlaying,
      setIsAudioPlaying
    }}>
      {children}
    </PlayQueueContext.Provider>
  );
};
