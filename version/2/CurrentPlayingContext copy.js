// contexts/CurrentPlayingContext.js
import React, { createContext, useState } from 'react';

export const CurrentPlayingContext = createContext();

export const CurrentPlayingProvider = ({ children }) => {
    const [currentPlaying, setCurrentPlayingState] = useState({player: null, type: null});

    // Promiseベースで状態更新をラップ
    const setCurrentPlaying = (newState) => {
        return new Promise(resolve => {

          console.log('CurrentPlayingContext: setCurrentPlaying - state changing:', newState);

          setCurrentPlayingState(newState);

          console.log('CurrentPlayingContext: setCurrentPlaying - state changed');

          resolve();
        });
      };

    return (
        <CurrentPlayingContext.Provider value={{ currentPlaying, setCurrentPlaying }}>
            {children}
        </CurrentPlayingContext.Provider>
    );
};

