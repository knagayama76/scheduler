import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = (updatedMode, replace = false) => {
    if (replace) {
      setMode(updatedMode);
      setHistory((prev) => [...prev.slice(0, prev.length - 1), updatedMode]);
    } else {
      setMode(updatedMode);
      const newHistory = [...history, updatedMode];
      setHistory(newHistory);
    }
  };

  const back = () => {
    if (history.length >= 2) {
      const newHistory = history.slice(0, history.length - 1);
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
