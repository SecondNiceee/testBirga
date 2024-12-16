import React, { memo, useCallback, useEffect,  useRef, useState,  } from "react";

import { deleteAd } from "../../../store/information";
import { useDispatch, useSelector,  } from "react-redux";
import BackButton from "../../../constants/BackButton";
import PickerTwo from "./PickerTwo";
import PickerOne from "./PickerOne";
import translation from "../../../functions/translate";


const Yes = translation("Да")
const No = translation("Нет")
const PickerContent = ({
  nowValue,
  setSecondPage,
  valueTwo,
  valueOne,
  setMyResponse,
  responsesArr,
  myAdsArray
}) => {
  const dispatch = useDispatch();


  

  const buttonFunction = useCallback( (index) => {
      setMyResponse({isOpen : true , id : index})
  } , [setMyResponse]  )





  const containerOne = useRef(null)
  const containerTwo = useRef(null)
  const pickerRef = useRef(null)

  const [viewsNumber, setViewsNumber] = useState(0)


  const advertisementStatus = useSelector(state => state.information.myOrderStatus)

  const responsesStatus = useSelector(state => state.responses.status)
  
  useEffect( () => {
    if (containerOne.current && containerTwo.current){
      if (containerOne.current.offsetHeight < containerTwo.current.offsetHeight){
        if (nowValue === "freelancer"){
          pickerRef.current.style.overflowY = "hidden"
          pickerRef.current.style.minHeight = String(containerOne.current.offsetHeight) + "px"
          
        }
        else{
          pickerRef.current.style.overflowY = "hidden"
          pickerRef.current.style.minHeight = String(containerTwo.current.offsetHeight) + "px"
        }
      }
      else{
        if (nowValue === "customer"){
            pickerRef.current.style.overflowY = "hidden"
            pickerRef.current.style.minHeight = String(containerTwo.current.offsetHeight) + "px"
          
        }
        else{
            pickerRef.current.style.overflowY = "hidden"
            pickerRef.current.style.minHeight = String(containerOne.current.offsetHeight) + "px"
        }
      }
    }

    

    return () => {

    }
  }  , [nowValue, responsesArr, myAdsArray, advertisementStatus, responsesStatus, viewsNumber] )
  





  return (
    <div
    ref={pickerRef}
      className="PickerContent"
      style={
        nowValue === "customer"
          ? { transform: "translateX(-50%)" }
          : { transform: "translateX(0%)" }
      }
    >
      

      <PickerOne viewsNumber = {viewsNumber} setViewsNumber = {setViewsNumber} ref={containerOne} oneValue = {valueOne} nowValue = {nowValue}  responsesArr = {responsesArr} buttonFunction = {buttonFunction} />

      <PickerTwo  viewsNumber = {viewsNumber} setViewsNumber = {setViewsNumber} ref={containerTwo} valueTwo = {valueTwo} myAdsArray={myAdsArray} setSecondPage = {setSecondPage}  />





    </div>
  );
};

export default memo(PickerContent);
