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
    <>
      <textarea style={{
        position : "absolute",
        opacity : 0,
        height : "17.65px",
        width : "calc(100vw - 66px)"
      }} ref={refTwo} readOnly value={fullDescription} className="FullDescriptionBottom"/>
      {fullDescription.length > 0 ? (
        <div  {...props}  className="FullDescription">
          <div  className="FullDescription-top">
            <svg width="12" height="14" viewBox="0 0 12 14" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0.664062 9.99837V3.22059C0.664062 2.36874 1.17517 0.665039 3.21962 0.665039C5.26406 0.665039 6.96036 0.665039 7.55295 0.665039M2.88628 12.1095C2.88628 12.5169 3.13073 13.3317 4.10851 13.3317C5.08628 13.3317 8.51591 13.3317 10.1085 13.3317C10.5159 13.2947 11.3307 12.9984 11.3307 12.1095C11.3307 11.2206 11.3307 6.40578 11.3307 4.10948C11.3307 3.70208 11.0863 2.88726 10.1085 2.88726C9.13073 2.88726 5.7011 2.88726 4.10851 2.88726C3.7011 2.9243 2.88628 3.22059 2.88628 4.10948C2.88628 4.99837 2.88628 9.81319 2.88628 12.1095Z" stroke="#95979E" stroke-linecap="round" />
      </svg>
          </div>
          <textarea readOnly ref = {textAreaRef} value={fullDescription} className="FullDescriptionBottom"/>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default memo(FullDescription);
