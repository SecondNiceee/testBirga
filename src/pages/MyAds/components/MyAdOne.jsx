import React, {  memo, useEffect, useMemo, useRef} from "react";

import MyAdsBlock from "./MyAdsBlock";
import PickerContent from "./PickerContent";
import { useSelector } from "react-redux";
import MyLoader from "../../../components/UI/MyLoader/MyLoader";

// const popup = initPopup();
const MyAdOne = ({
  myAdsArray,
  setMenuActive,
  setSecondPage,
  nowValue,
  setNowKey,
  setOneValue,
  setTwoValue,
  valueTwo ,
  valueOne,
  setMyResponse,

  responsesArr
  
}) => {



  



  let putStatus = useSelector((state) => state.information.putTaskStatus);



  





  useEffect(() => {
    if (putStatus === "error") {
      window.Telegram.WebApp.showAlert('ничего не сохранилось')
    }
  }, [putStatus]); // проверка на то, что все работает






  const GreyIntWidth = useMemo(() => {
    return (document.documentElement.clientWidth - 36) / 2;
  }, []);
  const GreyWidth = useMemo(() => {
    return GreyIntWidth.toString() + "px";
  }, [GreyIntWidth]);



  const status = useSelector(state => state.information.myOrderStatus)

  const responseStatus = useSelector(state => state.responses.status)

  const containerRef = useRef()


  return (
  
    <div ref={containerRef} className="my-ad-one">



      <MyAdsBlock valueOne = {valueOne} valueTwo = {valueTwo} setOneValue = {setOneValue}  setTwoValue = {setTwoValue} setNowKey={setNowKey} nowValue = {nowValue} greyIntWidth={GreyIntWidth} greyWidth={GreyWidth} deals={1} finishedDeals={"0%"} />
          <PickerContent
          responsesArr = {responsesArr}
          setMyResponse={setMyResponse}
          nowValue={nowValue}
          valueOne = {valueOne}
          valueTwo = {valueTwo}
            myAdsArray={myAdsArray}
            setSecondPage = {setSecondPage}
          />
    </div>

  );
};

export default memo(MyAdOne);
