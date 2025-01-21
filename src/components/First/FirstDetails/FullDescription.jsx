import React, { memo,  useEffect, useRef, useState } from "react";
import Linkify from 'react-linkify';
const lineHeight = 19.7;
const FullDescription = ({ fullDescription, ...props }) => {
  const textAreaRef = useRef(null)
  const refTwo = useRef(null)

  const [showButton, setShowButton] = useState(false)
  const [maxHeight, setMaxHeight] = useState(lineHeight * 8)

  useEffect(() => {
    const checkLineCount = () => {
      if (textAreaRef.current) {
        setMaxHeight(String(lineHeight * 8) + "px")
        console.log(String(lineHeight * 8) + "px")
        console.log(lineHeight)
        console.log(lineHeight * 8, textAreaRef.current.scrollHeight)
        setShowButton(textAreaRef.current.scrollHeight > lineHeight * 8 ? 'show' : false);
      }
    };

    checkLineCount();
  }, [fullDescription]);


  useEffect( () => {
    if (textAreaRef.current && refTwo.current) 
      textAreaRef.current.style.height = (refTwo.current.scrollHeight).toString() + 'px'
  } , [fullDescription] )

  const clickHandler = () => {
    setMaxHeight(null)
    setShowButton('hide')
  }

  const clickHandlerHide = () => {
    setMaxHeight(String(lineHeight * 8) + "px")
    setShowButton(true)
  }

  console.log(maxHeight)

  
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
          <Linkify>
            <textarea style={{
              maxHeight : !maxHeight ? 'auto' : maxHeight,
              fontSize : "16px"
            }} readOnly ref = {textAreaRef} value={fullDescription} className="FullDescriptionBottom leading-[131%]"/>
          </Linkify>
        </div>
      ) : (
        ""
      )}
      {showButton === "show" ?   <button onClick={clickHandler} className="w-[100%] py-[14px] bg-[#2ea5ff] rounded-[6px_6px_10px_10px] flex justify-center items-center">
          <p className="font-semibold !font-font-3 text-white tracking-[.02em]">Развернуть</p>
      </button> : showButton === "hide" ? <button onClick={clickHandlerHide} className="w-[100%] py-[14px] bg-[#2ea5ff] rounded-[6px_6px_10px_10px] flex justify-center items-center">
          <p className="font-semibold !font-font-3 text-white">Свернуть</p>
      </button> : <></> }

    </div>
  );
};

export default memo(FullDescription);
