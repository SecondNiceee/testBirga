import React, { forwardRef, memo, useCallback, useEffect, useState } from "react";
import DescriptionAndPhoto from "../../components/UI/DescriptionAndPhoto/DescriptionAndPhoto";
import MakePrivate from "../../components/UI/MakePrivate/MakePrivate";
import {  useSelector } from "react-redux";
import ShablinBlock from "./components/ShablonBlock/ShablinBlock";
import Block from "../../components/First/Block";
import MainButton from "../../constants/MainButton";
import translation from "../../functions/translate";
import { CSSTransition } from "react-transition-group";
import LoaderBlock from "../../components/First/LoaderBlock/LoaderBlock";


let myResponse = {
  text : "",
  photos : ""
}
const textPlace = translation("Почему задание должны дать именно вам")
const useTemplate = translation("Использовать шаблон")
const menu = document.documentElement.querySelector(".FirstMenu")
const Responce = forwardRef(({ orderInformation, responce, setResponce , left = "100%" , putStatus, ...props   } , ref) => {
  const shablonsArr = useSelector((state) => state.shablon.shablonsArr);


  const [clearPhoto , setClearPhoto] = useState(1)
  useEffect( () => {
    function func(){
      setClearPhoto(clearPhoto + 1)
    }
    MainButton.onClick(func)
    return () => {
      MainButton.offClick(func)
    }
  } , [clearPhoto , setClearPhoto] )


  useEffect( () => {
    console.log("Это рендер AdCreating")
    
    const input = document.querySelectorAll('input');
    const textarea  = document.querySelectorAll('textarea');
    for (let smallInput of input){
      smallInput.addEventListener('focus', () => {
        menu.style.display = 'none'; // скрываем меню
      });
      smallInput.addEventListener('blur', () => {
        menu.style.display = 'flex'; // скрываем меню
      });
    }
    for (let smallTextarea of textarea){
      smallTextarea.addEventListener('focus', () => {
        menu.style.display = 'none'; // скрываем меню
      });
      smallTextarea.addEventListener('blur', () => {
        menu.style.display = 'flex'; // скрываем меню
      });
    }
  } , [] )

  // useEffect( () => {
  //   document.documentElement.style.overflowY = "auto"
  //   return () => {
  //     document.documentElement.style.overflowY = "scroll"
  //   }
  // } , [])
  const onFocus = useCallback((e) => {
    e.preventDefault()
    e.target.preventDefault()
} , [] )

  return (
    
    <div ref={ref} {...props} className="responce-wrapper">



      <Block {...orderInformation} />
      <MakePrivate
        isPrivate={responce.isShablon}
        setPrivate={(value) => {
          setClearPhoto(clearPhoto + 1)
          if (value){
            myResponse = {
              text : responce.text,
              photos : responce.photos
            }
            setResponce({
              ...responce,
              isShablon: value,
              text: shablonsArr.length > 0 ?  shablonsArr[responce.shablonIndex].text : "",
              photos: shablonsArr.length > 0 ? shablonsArr[responce.shablonIndex].photos : [],
              name : shablonsArr.length > 0 ? shablonsArr[responce.shablonIndex].name : ""
            });

          }
          else{
            setResponce({
              ...responce,
              isShablon : value,
              text : myResponse.text,
              photos : myResponse.photos,
            })
          }


        }}
        text={useTemplate}
        className={"responce-make-private"}
      />
      {responce.isShablon && (
        <ShablinBlock
        clearPhoto = {clearPhoto}
          setClearPhoto = {setClearPhoto}
          left={left}
          responce={responce}
          setResponce={setResponce}
          shablonsArr={shablonsArr}
        />
      ) }
       
          {(shablonsArr.length > 0 || !responce.isShablon) && 
                    <DescriptionAndPhoto
                    onFocus={onFocus}
                    clearPhoto={clearPhoto}
                    className={"responce-descriprion"}
                    text={responce.text}
                    photos={responce.photos}
                    textPlaceholder={textPlace}
                    textTitle={"ТЕКСТ ОТКЛИКА"}
                    setText={(e) => {
                      setResponce({ ...responce, text: e });
                    }}
                    setPhotos={(e) => {
                      setResponce( (value) =>  ({ ...value, photos: e }));
                    }}
                  />
          }

      <CSSTransition
      in = {putStatus}
      timeout={0}
      unmountOnExit
      mountOnEnter
      >
        <LoaderBlock top={ ref.current ? String(ref.current.scrollTop) + "px" : "0px"}  />
      </CSSTransition>
      
    </div>
  );
} );

export default memo(Responce);
