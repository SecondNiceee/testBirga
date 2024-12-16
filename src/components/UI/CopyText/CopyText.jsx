import React, { memo } from "react";
import cl from "./CopyText.module.scss";
import { CSSTransition } from "react-transition-group";
const CopyText = ({ copyState }) => {
  return (
    <CSSTransition in={copyState} timeout={2000} classNames={"modal-copy"}>
      <p className={cl.copyText}>Скопировано!</p>
    </CSSTransition>
  );
};

export default memo(CopyText);
