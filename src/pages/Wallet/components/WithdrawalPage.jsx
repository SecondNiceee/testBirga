import React, { memo, useCallback, useEffect, useState } from "react";
import cl from "../index.module.scss";
import WithdrawalCap from "./WithdrawalCap";
import Compact from "./Compact";
import InformationBlock from "./InformationBlock";
import BalanceBlock from "./BalanceBlock";
import RoundedBlocks from "./RoundedBlocks";
import MainButton from "../../../constants/MainButton";
import axios from "axios";
const WithdrawalPage = ({balance, setWithDrawal}) => { 

  console.log("Хай")
  const [myValues, setMyValues] = useState({
    address: "",
    summ: "",
  });
  const [mistakes, setMistakes] = useState({
    address : false,
    summ : false
  })


  useEffect( () => {
    async function buttonFunction(){
      MainButton.showProgress()
      try{
        console.log("858931156", myValues.address, String(myValues.summ.replace(',', '.')) );
        
        await axios.get('https://www.connectbirga.ru/user/sendToAddress', {
          params : {
            fromId : 858931156,
            toAddress : myValues.address,
            amount: String(myValues.summ.replace(',', '.'))
          },
          headers : {
            "X-API-KEY-AUTH" : process.env.REACT_APP_API_KEY
          }
        })
        
        MainButton.hideProgress()

        window.Telegram.WebApp.showPopup(
          {
            title: "Вывод в пути.",
            message: "Ваши тоны поступят на баланс в течении нескольких минут",
            buttons: [
              { id: "save", type: "default", text: "Понятно" },
            ],
          },
          (buttonId) => {
            if (buttonId === "save" || buttonId === null) {
              setWithDrawal(false)
            }
          }
        );

      }
      catch(e){
        console.log('====================================');
        console.log(e);
        console.log('====================================');
        window.Telegram.WebApp.HapticFeedback.notificationOccurred("error")
        window.Telegram.WebApp.showPopup(
          {
            title: "Ошибка!",
            message: "Введите правильный адресс кошелька и попробуйте снова",
            buttons: [
              { id: "save", type: "destructive", text: "Понятно" },
            ],
          },
          (buttonId) => {
            if (buttonId === "save" || buttonId === null) {
              console.log("Он что - то нажал");
              
            }
          }
        );
      }
      MainButton.hideProgress()

    }
    MainButton.hideProgress()
    MainButton.show()
    MainButton.setText("ВЫВЕСТИ")

    MainButton.onClick(buttonFunction)
    return () => {
      MainButton.hide()
      MainButton.offClick(buttonFunction)
    }
  } , [myValues, setWithDrawal] )
  

  const valuesChanger = useCallback((e) => {
    setMyValues((value) => ({ ...value, address: e }));
  }, []);

  useEffect( () => {
    MainButton.showProgress()
    function timeoutFunction(){
      setMistakes((value) => ({...value, summ : true}))
      MainButton.hideProgress()
      MainButton.setParams({
        is_active: false, //неизвесетно
        color: "#2f2f2f",
        text_color: "#606060",
      });
      window.Telegram.WebApp.HapticFeedback.notificationOccurred("error")
    }
    let timeout
    if (Number(myValues.summ.replace(',', '.')) > balance){
       timeout = setTimeout( timeoutFunction, 2000 )
    }
    else{
      MainButton.hideProgress()
      MainButton.setParams({
        color: "#2ea5ff",
        text_color: "#ffffff",
        is_active: true,
      });
      setMistakes( (value) => ({...value, summ : false}) )
    }
    return () => {

        clearTimeout(timeout)
      
    }
  } , [myValues.summ, balance] )


  console.log('====================================');
  console.log(myValues.summ);
  console.log('====================================');

  return (
    <>
    <div className={cl.withDrawal}>
      <WithdrawalCap />

      <Compact
        isGreyRed = {true}
        inputMistake = {mistakes.address}
        greyText={"Адрес"}
        inputPlaceholder={"Введите адрес кошелька"}
        inputType={"text"}
        inputValue={myValues.address}
        onChange={valuesChanger}
        
        
      />

    <InformationBlock  />


    <BalanceBlock  inputMistake = {mistakes.summ} balance={balance} setMyValues={setMyValues} summ={myValues.summ} />



      <RoundedBlocks summ={myValues.summ} />
    </div>
    </>
  );
};

export default memo(WithdrawalPage);
