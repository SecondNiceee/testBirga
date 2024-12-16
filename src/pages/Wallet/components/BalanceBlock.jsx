import React, { memo, useCallback, useMemo } from 'react';
import cl from "../index.module.scss"
import CompactWithWidth from './CompactWithWidth';
const BalanceBlock = ({setMyValues, summ, balance, inputMistake}) => {
    const summChange = useCallback((e) => {
        const newStr = e.replace(/\s/g, '');
        if (!isNaN(newStr.replace(',' , ""))){
            setMyValues((value) => ({ ...value, summ: String(newStr) }));
        }
      }, [setMyValues]);
    
      const summValue = useMemo( () => {
        const newStrOne = summ.split(',')[0]
        const newStrTwo = summ.split(",")[1]
    
        const formattedNumber = summ.includes(',') ? new Intl.NumberFormat('ru-RU').format(Number(newStrOne)) + ',' + newStrTwo : new Intl.NumberFormat('ru-RU').format(Number(newStrOne))
        return formattedNumber
      } , [summ] )
      const styleError = useMemo(() => {
        return inputMistake ? {color : "#fe6766"} : {}
      }, [inputMistake] )
    
    const maxFunction = useCallback( () => {
      setMyValues( (value) => ({...value, summ : String(balance).replace('.', ',')}) )
    } , [balance, setMyValues] )
    return (
        <div className={cl.balanceBlock}>

        <CompactWithWidth
            
            greyText={"Сумма"}
            inputPlaceholder={""}
            inputType={"text"}
            inputMode="decimal"
            inputValue={summValue}
            onChange={summChange}
            className={cl.summBlock}
            inputMistake = {inputMistake}
        />
        <p style={styleError} className={cl.balanceText}>Ваш Баланс: <span style={styleError} className={cl.white}>{balance} TON ·</span>  <span onClick={maxFunction} style={styleError} className={cl.blue}>Max</span></p>
     </div>

    );
};

export default memo(BalanceBlock);