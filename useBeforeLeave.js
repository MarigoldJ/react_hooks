// 마우스가 창 위쪽으로 벗어나면 실행되는 hook

import { useEffect, useRef, useState } from "react";
import "./styles.css";

const useBeforeLeave = (onBefore) => {
  if (typeof onBefore !== "function") {
    return;
  }

  const handle = (event) => {
    const { clientY } = event;
    if (clientY <= 0) {
      onBefore();
    }
  };
  useEffect(() => {
    document.addEventListener("mouseleave", handle);
    return () => document.removeEventListener("mouseleave", handle);
  }, []);
};

const App = () => {
  const begForLife = () => console.log("Plz don't leave");
  useBeforeLeave(begForLife);
  return (
    <div className="App">
      <h1>Hello</h1>
    </div>
  );
};

export default App;
