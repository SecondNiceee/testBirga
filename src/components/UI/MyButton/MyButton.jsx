import React, { useCallback, useEffect, useMemo, useRef } from "react";
import classes from "./MyButton.module.css";
import translation from "../../../functions/translate";
const MyButton = ({
  className,
  hard = false,
  blue = true,
  children,
  ...props
}) => {
  const myRef = useRef(null);
  const vibrate = useCallback(() => {
    // window.navigator.vibrate(100);
    myRef.current.style.backgroundColor = "#47A2E7";
    myRef.current.style.color = "#E6E6E7";
    setTimeout(() => {
      if (blue) {
        myRef.current.style.backgroundColor = "rgb(46, 165, 255)";
        myRef.current.style.color = "white";
      } else {
        myRef.current.style.backgroundColor = "transparent";
        myRef.current.style.color = "rgb(46, 165, 255)";
      }
    }, 100);
  }, [blue]);
  const clickHandler = useCallback((e) => {
    myRef.current.style.backgroundColor = "#47A2E7";
    myRef.current.style.color = "#E6E6E7";
  }, []);
  const touchEnd = useCallback((e) => {
    if (blue) {
      myRef.current.style.backgroundColor = "rgb(46, 165, 255)";
      myRef.current.style.color = "white";
    } else {
      myRef.current.style.backgroundColor = "transparent";
      myRef.current.style.color = "rgb(46, 165, 255)";
    }
  }, [blue]);
  const element = useRef(null);

  const text = useMemo( () => {
    return translation(children)
  } , [children] )
  useEffect(() => {
    function click() {
      if (hard && blue) {
        window.Telegram.WebApp.HapticFeedback.notificationOccurred("success");
      } else {
          window.Telegram.WebApp.HapticFeedback.impactOccurred("soft");
      }
    }
    if (element.current) {
      element.current.addEventListener("click", click);
    }
  }, [hard, blue]);
  return (
    <div
      ref={element}
      onClick={() => {
        vibrate();
      }}
      onTouchEnd={touchEnd}
      onTouchStart={clickHandler}
      {...props}
    >
      <button
        ref={myRef}
        className={
          className ? [classes.MyButton, className].join(" ") : classes.MyButton
        }
        {...props}
      >
        {text}
      </button>
    </div>
  );
};

export default MyButton;
