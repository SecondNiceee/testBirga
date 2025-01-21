import React, { memo,  useEffect, useRef, useState } from "react";
import Linkify from 'react-linkify';
const lineHeight = 19.7;
const FullDescription = ({ fullDescription, ...props }) => {
  const textAreaRef = useRef(null)
  const refTwo = useRef(null)

  const [showButton, setShowButton] = useState(false)
  const [maxHeight, setMaxHeight] = useState(null)

  useEffect(() => {
    const checkLineCount = () => {
      if (textAreaRef.current) {
        setMaxHeight()
        console.log(lineHeight * 8, textAreaRef.current.scrollHeight)
        setShowButton(textAreaRef.current.scrollHeight > lineHeight * 8);
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
    setShowButton(false)
  }

  const clickHandlerHide = () => {
    setMaxHeight(lineHeight)
    setShowButton(true)
  }

  
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
              maxHeight : maxHeight ?? 'unset'
            }} readOnly ref = {textAreaRef} value={fullDescription} className="FullDescriptionBottom leading-[131%]"/>
          </Linkify>
        </div>
      ) : (
        ""
      )}
      {showButton ?   <button onClick={clickHandler} className="w-[100%] py-[11px] bg-[#2ea5ff] rounded-[6px_6px_10px_10px] flex justify-center items-center">
          <p className="font-semibold !font-font-3 text-white">Развернуть</p>
      </button> : <button onClick={clickHandlerHide} className="w-[100%] py-[11px] bg-[#2ea5ff] rounded-[6px_6px_10px_10px] flex justify-center items-center">
          <p className="font-semibold !font-font-3 text-white">Свернуть</p>
      </button> }

    </div>
  );
};

export default memo(FullDescription);
