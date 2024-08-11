import React, { forwardRef,  useEffect,  useMemo, useRef } from 'react';
import MyAnimation from './MyAnimation';
import MyResponses from './MyResponses';
import MyLoader from '../../../components/UI/MyLoader/MyLoader';
import {  useDispatch, useSelector } from 'react-redux';
import { clearResponses, fetchResponses } from '../../../store/responses';


const PickerOne = forwardRef(({responsesArr, buttonFunction,  oneValue ,  nowValue, viewsNumber, setViewsNumber } , ref) => {








    const interRef = useRef(null)

  
    const responsesStatus = useSelector(state => state.responses.status)
  
   

    const text = useMemo( () => {
        switch (oneValue){
            case "all":
                return "Вы не откликнулись ни на одно задание"
            case "watched":
                return "У вас нет просмотренных откликов"
            case "inProcess":
                return "У вас нет выполняемых заказов"
            case "unWatched":
                return "У вас нет непросмотренных задани"
            case "completed":
                return "У вас нет завершенных заказов"
            default : 
                window.Telegram.WebApp.showAlert("Что - то не то в PickerOne")
        }
    }  , [oneValue])

    const dispatch = useDispatch()

    const me = useSelector(state => state.telegramUserInfo)

    useEffect( () => {
        if (nowValue === "freelancer"){
            dispatch(clearResponses())
          dispatch(fetchResponses([me, 1]))
        }
    
      } , [nowValue] )

    return (


        <div ref={ref} style={{
            alignSelf : "flex-start"
        }} className="picker__block">
            {responsesArr.length === 0 && responsesStatus === "all" ? 
            
                <MyAnimation text={text}/> 
            :
                <MyResponses nowValue = {nowValue}  viewsNumber = {viewsNumber} setViewsNumber = {setViewsNumber} responsesArr = {responsesArr} buttonFunction = {buttonFunction} />
             }
             <div ref={interRef} className="intersection-block">

             </div>
      </div>

    );
} );

export default PickerOne;