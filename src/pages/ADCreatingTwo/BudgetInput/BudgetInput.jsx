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
    return "0123456789".includes(obj[obj.length - 1]);
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
    let str = strPar;
    if (str.length > 1) {
      if (str[0] === "0") {
        str = str.replace("0", "");
      }
    }
    str = str.replaceAll(" ", "").substring(0, 6);
    const s = str.length;
    const chars = str.split("");
    const strWithSpaces = chars.reduceRight((acc, char, i) => {
      const spaceOrNothing = (s - i) % 3 === 0 ? " " : "";
      return spaceOrNothing + char + acc;
    }, "");
    return strWithSpaces[0] === " " ? strWithSpaces.slice(1) : strWithSpaces;
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
            <span> {tonValue} USDT </span> 
          </div>
            <img src={Info} alt="" />
      </div>
      )
      :
          <div className={cl.bottomTextContainer}>
            <Text className={cl.text} style={{color : '#FF6767'}}>
              Сумма должна быть больше 5 USD
              </Text>
          </div>


          }
      
    </label>
  );
};

export default memo(BudgetInput);
