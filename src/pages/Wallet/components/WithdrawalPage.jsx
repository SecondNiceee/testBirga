import React, { memo, useCallback, useEffect, useState } from "react";
import cl from "../index.module.scss";
import WithdrawalCap from "./WithdrawalCap";
import Compact from "./Compact";
import InformationBlock from "./InformationBlock";
import BalanceBlock from "./BalanceBlock";
import RoundedBlocks from "./RoundedBlocks";
import MainButton from "../../../constants/MainButton";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getBalance } from "../../../store/balance";
import translation from "../../../functions/translate";
import formateMoney from "../../../functions/formateMoney";
import { fetchUserInfo } from "../../../store/telegramUserInfo";
const WithdrawalPage = ({balance, setWithDrawal}) => { 

  const [undetText , setUnderText ] = useState(false)

  const [myValues, setMyValues] = useState({
    address: "",
    summ: "",
  });
  const [mistakes, setMistakes] = useState({
    address : false,
    summ : false
  })
  const dispatch = useDispatch()
  const address = useSelector( state => state.telegramUserInfo.address )

  const lastTransaction = useSelector( state => state.telegramUserInfo.lastTransaction )


  useEffect( () => {
    dispatch(getBalance({userAddress : address}))
  } , [dispatch, address] )
  useEffect( () => {
    async function buttonFunction(){

      if ( (new Date() - new Date(lastTransaction))  / (1000 * 60) < 2){
        window.Telegram.WebApp.showPopup(
          {
            title: translation("Ошибка!"),
            message: translation("Вы недавно проводили транзакцию , пожалуйста , перезайдите в приложение через 5 минут и попробуйте операцию снова."),
            buttons: [
              { id: "save", type: "default", text: translation("Понятно") },
            ],
          },
          (buttonId) => {
            if (buttonId === "save" || buttonId === null) {
              console.log("ок");
              
            }
          }
        );
      }
      else{

        MainButton.showProgress()
        try{
          console.log("window.Telegram.WebApp.initDataUnsafe.user.id", myValues.address, String(myValues.summ.replace(',', '.')), String((Number(formateMoney(String(Number(myValues.summ.replace(',', '.'))) , 3, '.')) - 0.004).toFixed(3)));
          
          await axios.get('https://www.connectbirga.ru/user/sendToAddress', {
            params : {
              fromId : window.Telegram.WebApp.initDataUnsafe.user.id,
              toAddress : myValues.address,
              amount: String((Number(formateMoney(String(Number(myValues.summ.replace(',', '.'))) , 3, '.')) - 0.004).toFixed(6))
            },
            headers : {
              "X-API-KEY-AUTH" : process.env.REACT_APP_API_KEY
            }
          })
          dispatch(getBalance({userAddress : address}))
          MainButton.hideProgress()
          window.Telegram.WebApp.showPopup(
            {
              title: translation("Вывод в пути."),
              message: translation("Ваши тоны поступят на баланс в течении нескольких минут"),
              buttons: [
                { id: "save", type: "default", text: translation("Понятно") },
              ],
            },
            (buttonId) => {
              if (buttonId === "save" || buttonId === null) {
                dispatch(fetchUserInfo())
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
              title: translation("Ошибка!"),
              message: translation("Введите правильный адресс кошелька и попробуйте снова"),
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

    }
    MainButton.hideProgress()

    MainButton.setText(translation("Отправить"))

    MainButton.onClick(buttonFunction)
    return () => {

      MainButton.offClick(buttonFunction)
    }
  } , [myValues, setWithDrawal, address, dispatch, lastTransaction] )
  
  console.log('====================================');
  console.log(lastTransaction);
  console.log('====================================');


  const valuesChanger = useCallback((e) => {
    setMyValues((value) => ({ ...value, address: e }));
  }, []);

  useEffect( () => {
    MainButton.showProgress()
    function timeoutFunction(){
      if (Number(myValues.summ.replace(',', '.')) < 0.05){
        setUnderText(true)
      }
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
    if ((Number(myValues.summ.replace(',', '.')) > balance || Number(myValues.summ.replace(',', '.')) < 0.05) && Number(myValues.summ.replace(',', '.')) !== 0){
       timeout = setTimeout( timeoutFunction, 2000 )
       if (Number(myValues.summ.replace(',', '.')) > 0.05){
        setUnderText(false)
       }
    }
    else{
      if (Number(myValues.summ.replace(',', '.')) === 0){
        MainButton.setParams({
          is_active: false, //неизвесетно
          color: "#2f2f2f",
          text_color: "#606060",
        });
      }
      else{

        MainButton.setParams({
          color: "#2ea5ff",
          text_color: "#ffffff",
          is_active: true,
        });
      }
      setUnderText(false)
      MainButton.hideProgress()
      setMistakes( (value) => ({...value, summ : false}) )
    }
    return () => {

        clearTimeout(timeout)
      
    }
  } , [myValues.summ, balance, setUnderText] )


  useEffect( () => {
    MainButton.show()
    return () => {
      MainButton.hide()
    }
  }, [] )


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
        greyText={translation("Адрес")}
        inputPlaceholder={translation("Введите адрес кошелька")}
        inputType={"text"}
        inputValue={myValues.address}
        onChange={valuesChanger}
        
        
      />

    <InformationBlock  />


    <BalanceBlock underText={undetText} inputMistake = {mistakes.summ} balance={balance} setMyValues={setMyValues} sum={myValues.summ} />



      <RoundedBlocks summ={myValues.summ} />
    </div>
    </>
  );
};

export default memo(WithdrawalPage);
