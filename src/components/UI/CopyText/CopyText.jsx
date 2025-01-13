import React, { memo } from "react";
import cl from "./CopyText.module.scss";
import { CSSTransition } from "react-transition-group";
import Text from "../../Text/Text";

const CopyText = ({ copyState, ...props }) => {
  return (
    <CSSTransition in={copyState} timeout={2000} classNames={"modal-copy"}>
      <Text  className={cl.copyText} {...props}>Скопировано в буфер обмена!</Text>
    </CSSTransition>
  );
};
  
export default memo(CopyText);
