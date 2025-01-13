import React, {  memo,  useCallback, useEffect, useMemo, useRef, useState } from 'react';
import MyLoader from '../../../components/UI/MyLoader/MyLoader';
import SuspenseBlock from '../../../components/MyAds/SuspenseBlock';
import { useDispatch, useSelector } from 'react-redux';
import { clearMyOrders, fetchMyOrders } from '../../../store/information';
import MyAnimation from './MyAnimation';

const AdsContainer = ({setSecondPage,  viewsNumber , setViewsNumber , valueTwo, myAdsArray}) => {


    const [page , setPage] = useState(2)
    const orderStatus = useSelector(state => state.information.myOrderStatus)
    const elementRef = useRef(null)
    const dispatch = useDispatch()

    // eslint-disable-next-line
    const [reFetch, setReFetch] = useState(false)

    useEffect(() =>{

        dispatch(fetchMyOrders(1));
      return () => {
        dispatch(clearMyOrders())
      }
    },[dispatch] )

    console.log(page)
    console.log(orderStatus)
    const getMore = useCallback(async () => {
      dispatch(fetchMyOrders(page));
      setPage(page + 1);
    }, [page, setPage, dispatch]);

    const onIntersaction = useCallback(
      (entries) => {
        const firtEntry = entries[0];
        // if (!firtEntry.isIntersecting && orderStatus !== "all" && page === 2){
        //   setTimeout( () => {
        //     setReFetch( (value) => (!value) )
        //   } , 500 )
        // }
        if (firtEntry.isIntersecting && orderStatus !== "all" && orderStatus !== "loading") {
          getMore();
        }
      },
      [orderStatus, getMore]
    );


    useEffect(() => {
      const observer = new IntersectionObserver(onIntersaction);
      if (observer && elementRef.current) {
        observer.observe(elementRef.current);
      }
      return () => {
        observer.disconnect();
      };
      // eslint-disable-next-line
    }, [myAdsArray, onIntersaction]);

    const text = useMemo( () => {
      switch (valueTwo){
  
        case "all":
          return "У вас нет созданных заданий"
        case "active":
          return "У вас нет активных заданий"
        case "inProcess":
          return "У вас нет заданий в работе"
        case "completed":
          return "У вас нет завершенных заданий"
        default :
          
      }
    } , [valueTwo] )
  


    console.log(viewsNumber);
    
    return (
      <>
      
        {myAdsArray.lenght === 0 ?
        
            <MyAnimation style = {{height : "calc(calc(100vh) - 300px)"}} text={text}/>

            :

            <div className="AdsContainer">
              {myAdsArray.map((e, i) => {
                return (
                    <SuspenseBlock  viewsNumber = {viewsNumber} setViewsNumber = {setViewsNumber} key={i} e={e} i={i} setSecondPage={setSecondPage} />

                );
              })}
              { (orderStatus !== "all")  &&  <MyLoader   style = {{ height : "200px" , marginLeft : "-16px"}} />}
              { (orderStatus !== "all")  &&              <div ref={elementRef} style={{
                width : "1px",
                height : "2000px",
                position : "absolute",
                bottom : "0px",
                opacity : "0",
                left : "150vw",
                zIndex : -1
            }} className="catch_block"></div>}

            </div>
        }
      </>
    );
};

export default memo(AdsContainer);  