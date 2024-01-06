// PlayQueueContext.js
import React, { createContext, useState, useCallback } from 'react';

export const PlayQueueContext = createContext({
  isAudioPlaying: false,
  setIsAudioPlaying: () => {},
  isSamplePlaying: false,
  setIsSamplePlaying: () => {}
});

export const PlayQueueProvider = ({ children }) => {
  const [queue, setQueue] = useState([]);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isSamplePlaying, setIsSamplePlaying] = useState(false);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);

  // オーディオプレイヤーの一時停止関数
  const pauseAudioPlayer = useCallback(() => {
    console.log('PlayQueueContext: resumeAudioPlayer called, current isAudioPlaying:', isAudioPlaying, 'queue:', queue, 'currentTrackIndex:', currentTrackIndex, 'isSamplePlaying:', isSamplePlaying);

    setIsAudioPlaying(false);
  }, []);

  // オーディオプレイヤーの再生再開関数
  const resumeAudioPlayer = useCallback(() => {
    console.log('PlayQueueContext: resumeAudioPlayer called, current isAudioPlaying:', isAudioPlaying, 'queue:', queue, 'currentTrackIndex:', currentTrackIndex, 'isSamplePlaying:', isSamplePlaying);

    if (queue.length > 0 && currentTrackIndex < queue.length && !isSamplePlaying) {
      setIsAudioPlaying(true);
    }
  }, [queue, currentTrackIndex, isSamplePlaying]);

  // トラックをキューに追加する関数
  const addToQueue = useCallback((track) => {
    console.log('PlayQueueContext: addToQueue called, adding track:', track);

    const newQueue = [...queue, track];
    setQueue(newQueue);
    setCurrentTrackIndex(newQueue.length - 1);
  }, [queue]);

  // 次のトラックを再生する関数
  const playNext = useCallback(() => {
    console.log('PlayQueueContext: playNext called, currentTrackIndex:', currentTrackIndex, 'queue length:', queue.length);

    if (currentTrackIndex < queue.length - 1) {
      setCurrentTrackIndex(currentTrackIndex + 1);
    }
  }, [currentTrackIndex, queue.length]);

  // 前のトラックを再生する関数
  const playPrevious = useCallback(() => {
    console.log('PlayQueueContext: playPrevious called, currentTrackIndex:', currentTrackIndex);

    if (currentTrackIndex > 0) {
      setCurrentTrackIndex(currentTrackIndex - 1);
    }
  }, [currentTrackIndex]);

    // サンプルの再生を停止する関数
    const stopSample = useCallback(() => {
        console.log('PlayQueueContext: stopSample called, current isSamplePlaying:', isSamplePlaying);

        setIsSamplePlaying(false);
        if (!isAudioPlaying) {
        resumeAudioPlayer();
        }
        }, [isAudioPlaying, resumeAudioPlayer]);

  // コンテキストプロバイダー
  return (
    <PlayQueueContext.Provider value={{
      queue,
      currentTrackIndex,
      addToQueue,
      playNext,
      playPrevious,
      isAudioPlaying,
      setIsAudioPlaying,
      isSamplePlaying,
      setIsSamplePlaying,
      stopSample, 
      pauseAudioPlayer,
      resumeAudioPlayer
    }}>
      {children}
    </PlayQueueContext.Provider>
  );
};
