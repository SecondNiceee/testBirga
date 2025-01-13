import React, { memo, useRef } from "react";
import cl from "./BudgetInput.module.css";
import Info from "../../../images/icons/info.svg";
import Text from "../../../components/Text/Text";
import en from "../../../constants/language";

const textPrice = en ? "USD" : "RUB"

const BudgetInput = ({
  className,
  setBudget,
  budget,
  tonValue,
  style,
  errorTon
}) => {
  const KisInteger = function (obj) {
    return "0123456789,.".includes(obj[obj.length - 1]);
  };

  function budgetWidth() {
    if (ref1.current) {
      ref1.current.innerText = budget;
      return "calc(" + (ref1.current.offsetWidth + 15) + "px)";
    } else {
      return "0px";
    }
  }

  function format(strPar) {
    const newStr = strPar.replace('.' , ',')
    console.log(newStr)
    const one = newStr.split(',')[0]
    const two = newStr.split(',')[1]
    if (two){
      return Number(one.replace(/\s/g, '')).toLocaleString("ru-RU") + ',' + two 
    }
    else{
      if (newStr.includes(',')){
        return Number(one.replace(/\s/g, '')).toLocaleString("ru-RU") + ','
      }
      else{
        return Number(one.replace(/\s/g, '')).toLocaleString("ru-RU") 
      }
    }

  }

  const ref1 = useRef(null);

  return (
    <label htmlFor="budget"
      className={
        className ? [className, cl.BudgetInput].join(" ") : cl.BudgetInput
      }
    >

      <Text className={[cl.input, cl.hidden].join(" ")} ref={ref1}></Text>
      <Text style={ budget ? {display : 'none'} : {color : style.color}  }  className = { [cl.input , cl.absolute].join(' ') }> 0 </Text>
      <input 
      autoComplete="off"
         style={style}
        value={budget}
        
        onChange={(e) => {
          setBudget(
            KisInteger(e.target.value)
              ? format(e.target.value)
              : e.target.value.substring(0, e.target.value.length - 1)
          );
        }}
        inputMode="numeric"
        
        id="budget"
        name="budget"
        type="text"
        maxLength={7}
        // onFocus={(e) => {
        //   document.documentElement.style.overflowY = 'hidden'
        //   setTimeout( () => {
        //       document.documentElement.style.overflowY = 'unset'
        //   } , 2000)
        //   setBudget(e.target.value === "0" ? "" : e.target.value);
        // }}
        onBlur={(e) => {
          setBudget(e.target.value.length > 0 ? e.target.value : "0");
        }}
        className={cl.input}
        // style={{ width: budgetWidth(budget) }}
        pattern="0"
        // style={{position: 'absolute'  , background: 'rgb(32, 48, 63)' , width : '80%' , color : 'rgb(32, 48, 63)' , fontFamily : 'regular'}}
      />

        {/* <Text  className={cl.input}>{budget}</Text> */}

      <Text style={ {left : budgetWidth() , color : style.color  }} className={cl.budgetText}>{textPrice}</Text>

      {!errorTon 
      ? (
        <div className={cl.bottomTextContainer}>
          <div className={cl.costPrice}>
          <Text className={cl.text}>
          Стоимость
            </Text>
            <span> {tonValue} TON </span> 
          </div>
            <img src={Info} alt="" />
      </div>
      )
      :
          <div className={cl.bottomTextContainer}>
            <Text className={cl.text} style={{color : '#FF6767'}}>
              Сумма должна быть больше 0.1 TON
              </Text>
          </div>


          }
      
    </label>
  );
};

export default memo(BudgetInput);
