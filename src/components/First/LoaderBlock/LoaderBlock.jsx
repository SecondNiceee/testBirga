import React from "react";
import cl from "./LoaderBlock.module.css";
import MyLoader from "../../UI/MyLoader/MyLoader";
const LoaderBlock = ({top}) => {
  return (
    <>
      <div style={{top : top}} className={cl.wrapper}></div>
      <MyLoader  style={{    width: "100vw",
    height: "100vh",
    zIndex: "2000",
    position: "fixed",
    left: "0px",
    top: top}} />
    </>
  );
};

export default LoaderBlock;
