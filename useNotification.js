// hook은 아니래요...
// 알림을 발생시키는 버튼 만들기
// option이 궁금하면 google에 notification mdn이라고 검색 ㄱㄱ

import { useEffect, useRef, useState } from "react";
import "./styles.css";

const useNotification = (title, options) => {
  if (!("Notification" in window)) {
    return;
  }
  const createNotif = (title, options) => new Notification(title, options);
  const fireNotif = () => {
    if (Notification.permission !== "granted") {
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          createNotif(title, options);
        } else {
          return;
        }
      });
    } else {
      createNotif(title, options);
    }
  };

  return fireNotif;
};

const App = () => {
  const triggerNotif = useNotification("This is Notification Message!");
  return (
    <div className="App">
      <button onClick={triggerNotif}>Hello</button>
    </div>
  );
};

export default App;
