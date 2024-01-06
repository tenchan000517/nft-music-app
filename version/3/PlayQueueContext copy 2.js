// PlayQueueContext.js
import React, { createContext, useState, useEffect, useCallback } from 'react';

export const PlayQueueContext = createContext({
    isAudioPlaying: false,
    setIsAudioPlaying: () => {}
  });

export const PlayQueueProvider = ({ children }) => {
    const [queue, setQueue] = useState([]);
    const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
    const [isSamplePlaying, setIsSamplePlaying] = useState(false);
    const [isAudioPlaying, setIsAudioPlaying] = useState(false);
    const [state, setState] = useState({
        queue: [],
        currentTrackIndex: 0,
        isSamplePlaying: false,
        isAudioPlaying: false,
    });

    
    // オーディオプレイヤーの再生を一時停止する関数
    const pauseAudioPlayer = useCallback(() => {
        console.log('PlayQueueContext: pauseAudioPlayer called');
        setIsAudioPlaying(false);
    }, []);

    // オーディオプレイヤーの再開
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

    console.log('PlayQueueContext State:', {
        queue,
        currentTrackIndex,
        isSamplePlaying,
        isAudioPlaying,
      });

        // 状態変更時のロギング
        useEffect(() => {
            console.log(`PlayQueueContext: isAudioPlaying=${isAudioPlaying}, isSamplePlaying=${isSamplePlaying}`);
        }, [isAudioPlaying, isSamplePlaying]);

          // サンプルを再生する関数
          const startSample = useCallback(() => {
            console.log('PlayQueueContext: startSample called');
            if (isAudioPlaying) {
                pauseAudioPlayer();
            }
            setIsSamplePlaying(true);
        }, [isAudioPlaying, pauseAudioPlayer]);

        // サンプルを停止する関数
        const stopSample = useCallback(() => {
            console.log('PlayQueueContext: stopSample called');
            setIsSamplePlaying(false);
            if (!isAudioPlaying) {
                resumeAudioPlayer();
            }
        }, [isAudioPlaying, resumeAudioPlayer]);

        useEffect(() => {
            setState((prevState) => ({
              ...prevState,
              isSamplePlaying: isSamplePlaying,
              isAudioPlaying: isAudioPlaying,
            }));
        }, [isSamplePlaying, isAudioPlaying]);

  console.log(`PlayQueueContext State: ${JSON.stringify(state)}`);


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
