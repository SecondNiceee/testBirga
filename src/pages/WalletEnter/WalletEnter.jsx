import React, { useCallback, useEffect, useMemo, useState } from "react";
import cl from "./WalletEnter.module.scss";

import { mnemonicNew } from "ton-crypto";


import One from "./components/One/One";
import Two from "./components/Two/Two";


import useButton from "./hooks/useButton";
import useMenu from "./hooks/useMenu";
import useKeys from "./hooks/useKeys";
import MyLoader from "../../components/UI/MyLoader/MyLoader";






const WalletEnter = () => {


  const [keys, setKeys] = useState(null);
  const [step, setStep] = useState(0)
  const [numbers , setNumbers] = useState([])

  useEffect( () => {
    const localNumbers = []
    while(localNumbers.length < 4){
      let randomnumber = Math.floor(Math.random() * 12) + 1;
      if(localNumbers.indexOf(randomnumber) > -1) continue;
      localNumbers[localNumbers.length] = randomnumber;
  }
    setNumbers(localNumbers)
  } , [] )
  const [values, setValues] = useState([
    "", "", "" , "", "", ""
])
  const [mistakes, setMistakes] = useState([false, false, false, false, false, false])
  



  useMenu()

  useButton({step, setStep, keys, values, setMistakes, mistakes, numbers})

  useKeys({setKeys})

  
  const style = useMemo( () => {
    if (step){
      return {
        transform : "translateX(-100vw)"
      }
    }
    return {}
  } , [step] )
  
  const changeHandler = useCallback( (val, index) => {
        setValues( (value) => ([...value.map((e,i) => index === i ? val : e) ]) )
    } , [] )

  return (
    <>
    {keys ? 
    <div style={style} className={cl.wrapper}>
        <One keys={keys} />
        <Two numbers={numbers} values={values} mistakes={mistakes} changeHandler={changeHandler}  />
    </div>
    :
    <MyLoader />
    }
    </>
  );
};

export default WalletEnter;
