import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from "react";
import cl from "./CategoryBlock.module.css";
import Text from "../../Text/Text";
import en from "../../../constants/language";


const priceText = en ? "USD" : "RUB"
const place = en ? "300 USD" : "5000 RUB"
const InputBlock = ({ value, setValue, func = () => {}, ...props }) => {
  const inputRef = useRef(null);
  const textRef = useRef(null);
  const rubRef = useRef(null);
  const convertedValue = useMemo(() => {
    if (value === "0") {
      
        return "";
      
    }
    return new Intl.NumberFormat("ru-RU").format(value);
  }, [value]);

  useEffect( () =>{
    inputRef.current.blur()
  } , [] )
  useEffect(() => {
    if (inputRef.current.value === "") {
      inputRef.current.style.width = "66px";
    } else {
      inputRef.current.style.width = String(textRef.current.offsetWidth + 6) + "px";
    }
  }, [convertedValue]);

  const unFocusHandler = useCallback(() => {
    // if (convertedValue === "") {
    //   inputRef.current.value = "0";
    //   inputRef.current.style.width = "8px";
    //   rubRef.current.style.display = "block";
    // }
  }, [ ]);

  return (
    <label htmlFor="myInput" style={{width : "110px"}} onClick={func} {...props} className={cl.wrapper}>
      <div className={cl.left}>
        <Text className={cl.name}>{"Сумма от"}</Text>
        <Text ref={textRef} className={cl.hiddenText}>
          {convertedValue}
        </Text>
        <div className={cl.inputBlock}>
          <input
            id="myInput"
            inputMode="numeric"
            // onFocus={(e) => {
            //   document.documentElement.style.overflow = "hidden"
            //   setTimeout( () => {
            //     document.documentElement.style.overflow = "unset"
            //   } , 500 )
            // }}
            onBlur={unFocusHandler}
            onChange={(e) => {
              setValue(e.target.value);
            }}
            value={convertedValue}
            placeholder={place}
            className={cl.input}
            ref={inputRef}
            type="text"
          />
          <Text
            ref={rubRef}
            style={convertedValue === "" ? { display: "none" } : {}}
            className={cl.afterText}
          >
            {priceText}
          </Text>
        </div>
      </div>
    </label>
  );
};

export default InputBlock;
