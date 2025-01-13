import React, { useEffect, useRef, useState } from "react";

import dateIcon from "../../../images/icons/date.svg";
import rightArrow from "../../../images/icons/ArrowRight.svg";
import './CatchDate.css'
import Text from "../../../components/Text/Text";
import formatDate from "../../../functions/makeDate";
import translation from "../../../functions/translate";

let errorDate = new Date(0)
const CatchDate = ({ className , whichOne , state, setState,errors, isMyInformation,  ...props }) => {
  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const [widthOfDocument, setWidthOfDocument] = useState(
    document.documentElement.clientWidth
  );
  useEffect(() => {
    ref1.current.style.minWidth =
      (document.documentElement.clientWidth - 32).toString() + "px";
    ref2.current.style.minWidth =
      (document.documentElement.clientWidth - 32).toString() + "px";
    function addKey() {
      ref1.current.style.minWidth =
        (document.documentElement.clientWidth - 32).toString() + "px";
      ref2.current.style.minWidth =
        (document.documentElement.clientWidth - 32).toString() + "px";
      setWidthOfDocument(document.documentElement.clientWidth);
    }
    window.addEventListener("resize", addKey);
    return () => {
      window.removeEventListener("resize", addKey);
    };
  }, []);
  function getTranslate(){
    return 'translateX(' + (-1)*widthOfDocument.toString() + 'px)'  
  }

  console.log(isMyInformation)
return (
    <div
    {...props}
     style={ whichOne === 'startOnly' ? {} : {transform : getTranslate() }}
      id="dateSwapper"
      className={className ? ['CatchDate', className].join(" ") : 'CatchDate'   }>
        {/* <input type="datetime-local" name="startOnly" />
        <input type="datetime" name='start' />
        <input type="datetime" name="end" /> */}
      <label
      onClick = {() => {
        setState({...state, isOpen : true , isSingleOpen : true})
      }} 
        htmlFor="startOnly" ref={ref1} className={['DateTimePicker' , 'flexStart'].join(' ')} 
        style={errors.singleError ? {border : '1px solid #FF6767'} : {}}
        >
        <div className={'left'}>
          <img className={'leftImage'} src={dateIcon} alt="" />
          <Text className={'text'}>

             {state.singleTime ? formatDate(new Date(state.singleTime)) : 'Дата и время'  } 
          </Text>
        </div>
        <img src={rightArrow} alt="" className={'arrowRight'} />
      </label>

      <div ref={ref2} className={'PeriodInput'} >
        {isMyInformation ? <p className={'myAdsGreyText'}>{translation("НАЧАТЬ")}:</p> 
: 
            <></>
        }


        <div 
              onClick = {() => {
                setState({...state, isOpen : true , isStartOpen : true})
              }} 
         className={'DateTimePicker'}   style={errors.startError ? {border : '1px solid #FF6767'} : {}} >
          <div className={'left'}>
            <img className={'leftImage'} src={dateIcon} alt="" />
            <Text className={'text'}>
               {state.startTime && state.startTime.getTime() !== new Date(0).getTime()  ?  formatDate(state.startTime, true) : 'Дата и время начала'  } 
            </Text>
          </div>
          <img src={rightArrow} alt="" className={'arrowRight'} />
        </div>


        {isMyInformation ? 
        <p className={ 'myAdsGreyTextTwo'} >{translation("ДЕДЛАЙН")}:</p> 
        :
        <>
        </>
      }
        <div className={'DateTimePicker'}
                      onClick = {() => {
                        setState({...state, isOpen : true , isEndOpen : true})
                      }} 
                      style={errors.endError ? {border : '1px solid #FF6767'} : {}}
        >
          
          <div className={'left'}>
            <img className={'leftImage'} src={dateIcon} alt="" />
            <Text className={'text'}>

            {state.endTime && String(state.endTime) !== String(errorDate) ? formatDate(state.endTime, true) : 'Дата и время дедлайна'  } 
            </Text>
          </div>
          <img src={rightArrow} alt="" className={'arrowRight'} />
        </div>
      </div>

    </div>
  );
};

export default CatchDate;
