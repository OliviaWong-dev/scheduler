import React, { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);
  const transition = function (mode, replace = false) {
    if (replace === true) {
      back();
    }
    setMode(mode);
    history.push(mode);
  };
  const back = function () {
    // console.log("history and mode", history, mode);
    if (history.length >= 2) {
      history.pop();
      setMode(history[history.length - 1]);
      // console.log("mode", mode, history, history[history.length - 1]);
    }
    if (history.length === 1) {
      setMode(history[0]);
    }
    return;
  };
  console.log("test", mode, history, history.length);
  return { mode, transition, back };
}
