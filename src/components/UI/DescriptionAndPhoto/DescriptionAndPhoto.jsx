import React, { memo, useEffect,  useMemo,  useRef } from "react";
import cl from "./DescriptionAndPhoto.module.css";
import GreyText from "../../../components/UI/GreyText/GreyText";
import FileInput from "../../../components/UI/FileInput/FileInput";
import TextArea from "../../../components/UI/TextArea/TextArea";
import translation from "../../../functions/translate";
const DescriptionAndPhoto = ({
  className,
  text,
  photos,
  setText,
  setPhotos,
  MyInformation,
  textTitle,
  filesTitle,
  textPlaceholder,
  fileError,
  clearPhoto,
  textError = false,
  onFocus = () => {}
}) => {

  const hiddenRef = useRef(null)
  const myRef = useRef(null)

  useEffect( () => {
    // textAreaRef.current.style.height = (12 + 11 + 17.6*len).toString() + 'px'
    myRef.current.style.height = (hiddenRef.current.scrollHeight).toString() + 'px'
} , [text] )

  const miniRef = useRef(null)


  const place = useMemo( () => {
    return translation(textPlaceholder)
  } , [textPlaceholder] )



  return (
    <div
      className={
        className
          ? [cl.DescriptionAndPhoto, className].join(" ")
          : cl.DescriptionAndPhoto
      }
    >
      <GreyText className={cl.GreyText}>{textTitle}</GreyText>
      <div style={ textError ? {border : "1px solid rgb(255, 103, 103)"} : {}} className={cl.InputContainer}>
        
        <textarea ref={hiddenRef} value={text} className={cl.hiddenText}/>

        <TextArea
        
        onFocus = {onFocus}
        ref={myRef}
          value={text}
          className={cl.DescriptionInput}
          placeholder={place}
          setValue={setText}
        ></TextArea>

<p
ref={miniRef}
          className={cl.inputCounter}
          style={text.length < 500 ? {} : { color: "#8a0303" }}
        >
          {text.length} / 500
        </p>


      </div>

      {MyInformation ? (
        <GreyText className={cl.SecondGreyText}>{filesTitle}</GreyText>
      ) : (
        ""
      )}
    
        <FileInput
        clear= {clearPhoto}
          fileError={fileError}
          setFiles={setPhotos}
          files={photos}
          className={
            MyInformation
              ? [cl.FileInput, cl.marginTop].join(" ")
              : cl.FileInput
          }
        />
    </div>
  );
};

export default memo(DescriptionAndPhoto);
