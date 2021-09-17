import { useEffect, useRef, useState } from "react";
import "./styles.css";

const useClick = (onClick) => {
  if (typeof onClick !== "function") {
    return;
  }

  const element = useRef();

  // https://lktprogrammer.tistory.com/130 -> 컴포넌트 생명주기 설명
  useEffect(() => {

    // componentDidMount
    if (element.current) {
      element.current.addEventListener("click", onClick);
    }

    // componentWillUnmount
    return () => {
      if (element.current) {
        element.current.removeEventListener("click", onClick);
      }
    };
  }, []); // only once

  return element;

};

const App = () => {
  const sayHello = () => console.log("hello guys");
  const title = useClick(sayHello);
  return (
    <div className="App">
      <h1 ref={title}>Hi</h1>
    </div>
  );
};

export default App;
