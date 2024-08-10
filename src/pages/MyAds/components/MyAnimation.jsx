import React from "react";
import sad from "../../../animation/sadAnimation.json";
import { useLottie } from "lottie-react";
const MyAnimation = ({
  text = "Вы не откликнулись ни на одно задание",
  height = "calc(var(--tg-viewport-height)-252px)",
  ...props
}) => {
  const options = {
    animationData: sad,
    loop: true,
    style: {
      display: "flex",
      justifyContent: "center",
      marginLeft: "auto",
      marginRight: "auto",
      width: "200px",
    },
  };

  const { View } = useLottie(options);
  return (
    <div 
        {...props}
      className="animation-block"
      onClick={() => {
        window.Telegram.WebApp.openTelegramLink("https://t.me/addstickers/DonutTheDog")
      }}
    >
      {View}
      <p className="animation-text">{text}</p>
    </div>
  );
};

export default MyAnimation;
