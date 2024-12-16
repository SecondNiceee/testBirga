import React, { forwardRef, memo, useEffect, useMemo,  } from 'react';
import AdCreateFunc from '../../../components/UI/AdCreateFunc/AdCreateFunc';
import MyAnimation from './MyAnimation';
import AdsContainer from './AdsContainer';
import { useSelector } from 'react-redux';
import MyLoader from '../../../components/UI/MyLoader/MyLoader';

const PickerTwo = forwardRef(({setSecondPage  , valueTwo ,  viewsNumber , setViewsNumber, myAdsArray } , ref) => {



  const status = useSelector(state => state.information.myOrderStatus)
  
    return (
        <div className="picker__block" ref={ref}>
        <AdCreateFunc text={"Создать объявление"} link={"/AdCreating"} />
        <AdsContainer valueTwo = {valueTwo}  viewsNumber = {viewsNumber} setViewsNumber = {setViewsNumber} myAdsArray={myAdsArray} setSecondPage={setSecondPage}  />






      </div>
    );
} );

export default memo(PickerTwo);