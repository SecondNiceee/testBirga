import React, { useEffect, useMemo } from "react";

import Holding from "./Holding/Holding";

import cl from "./AdCreatingThree.module.css";
import Upper from "./Upper/Upper";
import Block from "./Block/Block";
import AlertBlock from "./AlertBlock/AlertBlock";
import { useDispatch, useSelector } from "react-redux";
import translation from "../../functions/translate";
import { getBalance } from "../../store/balance";

const AdCreatingThree = ({taskInformation }) => {

  const dispatch = useDispatch()

  const balance = useSelector(state => state.balance.value)
  const address = useSelector( state => state.telegramUserInfo.address )

  useEffect( () => {
    dispatch(getBalance({userAddress : address}))
  } , [dispatch, address] )

  // window.Telegram.WebApp.initDataUnsafe.user.id

  // window.Telegram.WebApp.initDataUnsafe.user.id
  const perventValue = useMemo( () => {
    return  Number((Number(taskInformation.tonValue) * 0.04).toFixed(3))
  }, [taskInformation.tonValue] ) 

  // window.Telegram.WebApp.initDataUnsafe.user.id

  const rezult = useMemo( () => {
    return  (Number(taskInformation.tonValue) + perventValue + 0.02).toFixed(3)
  }, [perventValue, taskInformation.tonValue] )
  return (
    <div className= {cl.AdCreatingThree}
    style={{minWidth : document.documentElement.clientWidth.toString() + 'px'}}

    >
      <Upper />
      
      <div className={cl.blocks}>
        <Block left={translation("Задание")} right={String(Number(taskInformation.tonValue)) + " TON"} />
        <div className={cl.newBlock}>
          <div className={cl.left}>
            <p>Комиссия</p>
          </div>
          <div className={cl.right}>
            <p className={cl.standart}>0,02 TON</p>
            <p className={cl.grob}>0,1 TON</p>
          </div>
        </div>
        <div className={cl.newBlock}>
          <div className={cl.left}>
            <p>Сервис. сбор</p>
          </div>
          <div className={cl.right}>
            <div className={cl.one}>
              <p className={cl.standart}>{perventValue} TON</p>
              
            </div>
            <div className={cl.two}>
              <p className={cl.standart}>4%</p>
                <p className={cl.grob}>8%</p>
            </div>
          </div>
        </div>
      </div>
      <Holding rezult={rezult} taskInformation={taskInformation}  className={cl.Holding} />
      { (balance < rezult)  && <AlertBlock address = {address} tonValue={rezult} />}
    </div> 
  );
};

export default AdCreatingThree;
