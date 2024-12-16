import React, { useCallback, useRef } from "react";
import cl from "./CreateButton.module.scss";

const CreateButton = ({ className, onClick = () => {}, children }) => {


    const myRef = useRef(null)
  const vibrate = useCallback(() => {

    myRef.current.style.backgroundColor = "rgb(94 181 248)";
    myRef.current.style.color = "#E6E6E7";
    myRef.current.style.scale = "0.98"
    setTimeout(() => {
        myRef.current.style.backgroundColor = "rgb(46, 165, 255)";
        myRef.current.style.color = "white";
        myRef.current.style.scale = "1"
    }, 100);
  }, []);
  const clickHandler = useCallback((e) => {
    myRef.current.style.scale = "0.95"
    myRef.current.style.backgroundColor = "rgb(94 181 248)";
    myRef.current.style.color = "#E6E6E7";
  }, []);
  const touchEnd = useCallback((e) => {
        myRef.current.style.scale = "1"
      myRef.current.style.backgroundColor = "rgb(46, 165, 255)";
      myRef.current.style.color = "white";

  }, []);

  return (
    <div
      ref={myRef}
      onTouchEnd={touchEnd}
      onTouchStart={clickHandler}
      onClick={() => {
        onClick();
        vibrate();
      }}
      className={className ? [cl.container, className].join(" ") : cl.container}
    >
      {children}
    </div>
  );
};

export default CreateButton;
