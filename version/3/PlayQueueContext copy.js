import React, { createContext, useState, useCallback } from 'react';

export const PlayQueueContext = createContext();

export const PlayQueueProvider = ({ children }) => {
    const [queue, setQueue] = useState([]);
    const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
    const [isSamplePlaying, setIsSamplePlaying] = useState(false);
    const [isAudioPlaying, setIsAudioPlaying] = useState(false);
    const [isAudioPaused, setIsAudioPaused] = useState(false);

    const convertIpfsUriToHttp = (uri) => {
        if (uri.startsWith('ipfs://')) {
            return uri.replace('ipfs://', 'https://ipfs.io/ipfs/');
        }
        return uri;
    };

    const addToQueue = useCallback((track) => {
        if (!track.url) {
            console.error('Track URL missing!');
            return;
        }
        const trackWithHttpUrl = { ...track, url: convertIpfsUriToHttp(track.url) };
        setQueue([...queue, trackWithHttpUrl]);
        setCurrentTrackIndex(queue.length); // 新しいトラックを再生
    }, [queue]);

    const playNext = useCallback(() => {
        if (currentTrackIndex < queue.length - 1) {
            setCurrentTrackIndex(currentTrackIndex + 1);
        }
    }, [currentTrackIndex, queue.length]);

    const playSample = useCallback(() => {
        if (isAudioPlaying) pauseAudioPlayer();
        setIsSamplePlaying(true);
    }, [isAudioPlaying]);

    const stopSample = useCallback(() => {
        setIsSamplePlaying(false);
        if (isAudioPaused) resumeAudioPlayer();
    }, [isAudioPaused]);

    const pauseAudioPlayer = useCallback(() => {
        setIsAudioPlaying(false);
        setIsAudioPaused(true);
    }, []);

    const resumeAudioPlayer = useCallback(() => {
        if (isAudioPaused) {
            setIsAudioPlaying(true);
            setIsAudioPaused(false);
        }
    }, [isAudioPaused]);

    return (
        <PlayQueueContext.Provider value={{
            queue,
            currentTrackIndex,
            addToQueue,
            playNext,
            isSamplePlaying,
            setIsSamplePlaying,
            playSample,
            stopSample,
            isAudioPlaying,
            setIsAudioPlaying,
            pauseAudioPlayer,
            resumeAudioPlayer
        }}>
            {children}
        </PlayQueueContext.Provider>
    );
};
