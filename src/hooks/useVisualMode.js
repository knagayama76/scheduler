import { update } from "lodash";
import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = (updatedMode, replace = false) => {
    if (replace) {
      setMode(updatedMode);
    } else {
      setMode(updatedMode);
      const newHistory = [...history, updatedMode];
      setHistory(newHistory);
    }
  };

  const back = () => {
    if (history.length === 1) {
      setMode(history[0]);
    } else {
      const newHistory = history.slice(0, -1);
      setHistory(newHistory);
      setMode(newHistory[newHistory.length - 1]);
    }
  };

  return {
    mode,
    transition,
    back,
  };
}
