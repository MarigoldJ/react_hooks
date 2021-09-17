// online 여부를 감지하는 hook

import { useEffect, useRef, useState } from "react";
import "./styles.css";

const useNetwork = (onChange) => {
  const [status, setStatus] = useState(navigator.onLine);
  const handleChange = () => {
    if (typeof onChange === "function") {
      onChange(navigator.onLine);
    }
    setStatus(navigator.onLine);
  };

  useEffect(() => {
    window.addEventListener("online", handleChange);
    window.addEventListener("offline", handleChange);

    return () => {
      window.removeEventListener("online", handleChange);
      window.removeEventListener("offline", handleChange);
    };
  }, []);

  return status;
};

const App = () => {
  const handleNetworkChange = (online) => {
    console.log(online?"We just went online" : "We are offline");
  };
  const isOnline = useNetwork();
  return (
    <div className="App">
      <h1>{isOnline ? "Online" : "Offline"}</h1>
    </div>
  );
};

export default App;
