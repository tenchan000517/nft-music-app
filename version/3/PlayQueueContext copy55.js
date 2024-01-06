// PlayQueueContext.js
import React, { createContext, useState, useEffect, useCallback } from 'react';

export const PlayQueueContext = createContext({

isAudioPlaying: false, // 初期値を追加
setIsAudioPlaying: () => {} // 初期値を追加
});

export const PlayQueueProvider = ({ children }) => {
    const [queue, setQueue] = useState([]);
    const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
    const [isSamplePlaying, setIsSamplePlaying] = useState(false); // サンプル再生状態の追加
    const [isAudioPlaying, setIsAudioPlaying] = useState(false); // 追加
    // const [isAudioPaused, setIsAudioPaused] = useState(false); // 追加
    const [state, setState] = useState({
        queue: [],
        currentTrackIndex: 0,
        isSamplePlaying: false,
        isAudioPlaying: false,
      });

    const addToQueue = (track) => {
        console.log('Adding to queue:', track);
        if (!track.url) {
            console.error('Track URL missing!');
            return; // URLがなければ、キューに追加しない
        }
        const newQueue = [...queue, track];
        setQueue(newQueue);
        setCurrentTrackIndex(newQueue.length - 1); // 新しいトラックを再生
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
              // オーディオが再生中なら一時停止
              pauseAudioPlayer();
            }
            setIsSamplePlaying(true);
          }, [isAudioPlaying]);

        // サンプルを停止する関数
        const stopSample = useCallback(() => {
            console.log('PlayQueueContext: stopSample called');

            setIsSamplePlaying(false);
            if (!isAudioPlaying) {
              // オーディオが一時停止中なら再開
              resumeAudioPlayer();
            }
          }, [isAudioPlaying]);

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

  useEffect(() => {
    // 状態が更新されたらログ出力
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
            isSamplePlaying, // 追加
            setIsSamplePlaying, // 追加
            startSample,
            stopSample,
            isAudioPlaying, // 追加
            setIsAudioPlaying // 追加
        }}>
            {children}
        </PlayQueueContext.Provider>
    );
};
