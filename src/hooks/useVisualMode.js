import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = (newMode, replace = false) => {
    // Update mode
    setMode(newMode);

    // Make a copy of current history array mutate it
    setHistory(prev => {
      const newArr = [...prev];
      if (replace) {
        newArr.pop();
      }

      newArr.push(newMode);

      // Update history
      return newArr;
    });
  };

  const back = () => {
    // Array length should be greater then 1
    if (history.length <= 1) {
      return;
    }

    // Make a copy of current history array and remove current mode;
    const newArr = [...history];
    newArr.pop();

    // Gets previous mode
    const prevMode = newArr[newArr.length - 1];

    // Update mode and history
    setMode(prevMode);
    setHistory(newArr);
  };

  return { mode, transition, back };
}