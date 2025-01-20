import React, { memo,  useEffect, useRef, useState } from "react";
import Text from "../../Text/Text";
const FullDescription = ({ fullDescription, ...props }) => {
  const textAreaRef = useRef(null)
  const refTwo = useRef(null)

  const [showButton, setShowButton] = useState(false)
  
  useEffect(() => {
    const checkLineCount = () => {
      if (textRef.current) {
        const lineHeight = parseInt(window.getComputedStyle(textAreaRef.current).lineHeight);
        const maxHeight = lineHeight * 8;
        setShowButton(textRef.current.scrollHeight > maxHeight);
      }
    };

    checkLineCount();

  }, [fullDescription, maxLines]);


  useEffect( () => {
    if (textAreaRef.current && refTwo.current) 
      textAreaRef.current.style.height = (refTwo.current.scrollHeight).toString() + 'px'
  } , [fullDescription] )

  
  return (
    <div className="flex flex-col items-center w-[100%] gap-[4px]">
      <textarea style={{
        position : "absolute",
        opacity : 0,
        height : "17.65px",
        width : "calc(100vw - 66px)"
      }} ref={refTwo} readOnly value={fullDescription} className="FullDescriptionBottom"/>
      {fullDescription.length > 0 ? (
        <div  {...props}  className="FullDescription w-[100%]">
          <textarea readOnly ref = {textAreaRef} value={fullDescription} className="FullDescriptionBottom leading-[131%]"/>
        </div>
      ) : (
        ""
      )}
      {showButton &&       <button className="w-[100%] py-[11px] bg-[#2ea5ff] rounded-[6px_6px_10px_10px] flex justify-center items-center">
          <p className="font-semibold !font-font-3 text-white">Развернуть</p>
      </button>}

    </div>
  );
};

export default memo(FullDescription);
