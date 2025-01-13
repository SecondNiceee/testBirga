import React from "react";
import cl from "./Choicer.module.css";
import { CSSTransition } from "react-transition-group";
import ChoicerModal from "../ChoicerModal/ChoicerModal";
const Choicer = ({ className, text, arr, isActive, setActive, onChoice  }) => {

  return (
    <>
    <div onClick={() => {
        setActive(true)
    }} className={className ?  [cl.Choicer, className].join(' ') : cl.Choicer}>
      <Text>{text}</Text>
      <svg
        width="12"
        height="13"
        viewBox="0 0 12 13"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M1.33073 4.73236L5.9974 0.999023L10.6641 4.73236"
          stroke="#2EA5FF"
          strokoWidth ="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M10.6654 8.3321L5.9987 12.0654L1.33203 8.3321"
          stroke="#2EA5FF"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

    </div>
      <CSSTransition in = {isActive} 
      mountOnEnter
      unmountOnExit
      classNames={"dropdown-modal"}
      timeout={300}
      >
          <ChoicerModal onChoice={onChoice} className={'dropdown-modal'} arr={arr} setOpen={setActive}/>
      </CSSTransition>
    </>
  );
};

export default Choicer;
