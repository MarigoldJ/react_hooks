import { useEffect, useRef, useState } from "react";
import "./styles.css";

const useFullScreen = (callback) => {
  const element = useRef();

  const runCb = (isFull) => {
    if (callback && typeof callback === "function") {
      callback(isFull);
    }
  }

  const openFull = () => {
    if (element.current) {  // 함수가 존재하는지 확인
      if (element.current.requestFullscreen) {
        element.current.requestFullscreen();
      } else if (element.current.mozRequestFullScreen) {
        element.current.mozRequestFullScreen();
      } else if (element.current.webkitRequestFullscreen) {
        element.current.webkitRequestFullscreen();
      } else if (element.current.msRequestFullscreen) {
        element.current.msRequestFullscreen();
      }
      runCb(true);
    }
  };
  const closeFull = () => {
    if (document.exitFullscreen) {  // 브라우져마다 fullscreen 닫는 함수가 다름
      document.exitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    }
    runCb(false);
  };

  return { element, openFull, closeFull };
};

const App = () => {
  const onFull = (isFull) => {
    console.log(isFull ? "We are full" : "We are not full");
  };
  const { element, openFull, closeFull } = useFullScreen(onFull);
  return (
    <div className="App">
      <div ref={element}>
        <img src="https://w.namu.la/s/5cb939ee09d5bfff10a53077f59ec1b926241671b7f5d973d6441dfa21e35f532b5d11531475ccd1ff81721fdb90f4d26df1311f0869aa3f104fc866cf966cd76482fc22c098800ea192c811245fdd3d67ff47834f597a3621c23c2a7cc51800" />
        <button onClick={closeFull}>Close fullscreen</button>
      </div>
      <button onClick={openFull}>Open fullscreen</button>
    </div>
  );
};

export default App;
