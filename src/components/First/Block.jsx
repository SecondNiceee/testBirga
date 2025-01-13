import React, { memo, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

import Photos from "./FirstMain/Photos";
import MyAdsTop from "./FirstMain/MyAdsTop";
import FirstMainTop from "./FirstMain/FirstMainTop";
import FirstMainMiddle from "./FirstMain/FirstMainMiddle";
import MainBottom from "./FirstMain/MainBottom";

const Block = ({
  className,
  taskName,
  time,
  end = false,

  setDetailsActive,
  isButton,
  photos,
  isMyAds,
  deleteFunction,
  myAdsFunc,
  isResponce,
  isWatched,
  index,
  id,
  tonValue,
  task,
  agree = false,
  responseCounter,
  viewsNumber,
  category,
  endTime,
  singleTime,
  whichOne,
  status,
  showStatus = false
}) => {
  const dispatch = useDispatch();
  const tonConstant = useSelector((state) => state.ton.value);

  const timing = useMemo( () => {
    if (!end){
      return time
    }
    else{
      if (whichOne === "startOnly"){
        return {end : singleTime}
      }
      else{
        return {end : endTime}
      }
    }
  } , [end, endTime, singleTime, time, whichOne] )

  
  return (
    <>
      {photos && (
        <div
          className={
            className ? ["First__block", className].join(" ") : "First__block"
          }
        >
          <Photos photos={photos} />

          <MyAdsTop showStatus = {showStatus} status = {status} isMyAds={isMyAds} isResponce={isResponce} viewsNumber={viewsNumber} responseCounter={responseCounter} />

          <FirstMainTop isMyAds={isMyAds} category={category} isWatched={isWatched} taskName={taskName} id={id}  end={end} />

          <FirstMainMiddle  time={timing} />

        <MainBottom 
          {...{tonConstant, tonValue, isMyAds, myAdsFunc, isButton, end, id, agree, task, isResponce, setDetailsActive,index, dispatch,deleteFunction}}
            />
        </div>
      ) 
    }
    </>
  );
};

export default memo(Block);
