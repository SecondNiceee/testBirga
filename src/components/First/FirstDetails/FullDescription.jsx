import React, { memo,  useEffect, useRef } from "react";
import Text from "../../Text/Text";
const FullDescription = ({ fullDescription, ...props }) => {
  const textAreaRef = useRef(null)
  const refTwo = useRef(null)
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
        <div  {...props}  className="FullDescription">
          <textarea readOnly ref = {textAreaRef} value={fullDescription} className="FullDescriptionBottom leading-[131%]"/>
        </div>
      ) : (
        ""
      )}
      <button className="w-[100%] py-[11px] bg-[#2ea5ff] rounded-[6px_6px_10px_10px] flex justify-center items-center">
          <p className="font-semibold !font-font-3 text-white">Развернуть</p>
      </button>
    </div>
  );
};

export default memo(FullDescription);
