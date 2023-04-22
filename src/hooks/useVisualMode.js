import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = (newMode, replace = false) => {
    // Update mode
    setMode(newMode);

    // Make a copy of current history array mutate it
    const newArr = [...history];
    if (replace === true) {
      newArr[newArr.length - 1] = newMode;
    } else {
      newArr.push(newMode);
    }

    // Update history
    setHistory(newArr);
  };

  const back = () => {
    // Array length should be greater then 1
    if (history.length <= 1) {
      return;
    }
    // Make a copy of current history array and remove current mode
    const newArr = [...history];
    newArr.pop();

    // Gets previous mode
    const prevMode = history[history.length - 2];

    // Update mode and history
    setMode(prevMode);
    setHistory(newArr);
  };

  return { mode, transition, back };
}
