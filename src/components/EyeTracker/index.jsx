import React, { useEffect } from 'react';

function EyeTracker() {

  useEffect(() => {
    
    const wg = window?.webgazer;

    if (wg) {
      wg.setGazeListener((data, clock) => {
        console.log(data, clock);
      }).begin();
    }

    return () => {
      if (wg) {
        wg.end();
      }
    };
  
  }, []);

  return null;
}

export default EyeTracker;