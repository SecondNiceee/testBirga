import React, { useCallback, useEffect, useMemo, useState } from "react";
import cl from "./WalletEnter.module.scss";



import One from "./components/One/One";
import Two from "./components/Two/Two";


import useButton from "./hooks/useButton";
import useMenu from "./hooks/useMenu";
import useKeys from "./hooks/useKeys";
import MyLoader from "../../components/UI/MyLoader/MyLoader";
import pagesHistory from "../../constants/pagesHistory";
import MainButton from "../../constants/MainButton";






const WalletEnter = () => {


  const [keys, setKeys] = useState(null);
  const [step, setStep] = useState(0)
  const [numbers , setNumbers] = useState([])


  useEffect( () => {
    pagesHistory.push('/WalletEnter')
  } , [] )

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

  useEffect( () => {
    MainButton.show()
    return () => {
      MainButton.hide()
    }
  }, [] )

  
  const style = useMemo( () => {
    if (step){
      return {
        transform : "translateX(-100vw)"
      }
    }
    return {}
  } , [step] )
  
  const changeHandler = useCallback( (val, index) => {
        setValues( (value) => ([...value.map((e,i) => index === i ? val.toLowerCase() : e) ]) )
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
