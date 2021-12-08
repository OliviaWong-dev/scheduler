import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);
  const transition = function (newMode, replace = false) {
    if (replace === true) {
      let newHisotryReplace = history.slice(0, -1);
      setHistory([...newHisotryReplace, newMode]);
    } else {
      setHistory([...history, newMode]);
    }
    setMode(newMode);
  };
  const back = function () {
    if (history.length > 1) {
      let newHistory = history.slice(0, -1);
      setHistory((prev) => [...prev].slice(0, -1));
      setMode(history[history.length - 2]);
    } else {
      setMode(initial);
      setHistory(initial);
    }
  };
  return { mode, transition, back };
}
