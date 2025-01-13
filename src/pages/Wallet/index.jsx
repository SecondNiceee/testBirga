import React, { useCallback, useEffect, useState } from "react";
import cl from "./index.module.scss";
import useProtect from "./hooks/useProtect";
import MainPage from "./components/MainPage";
import DepositPage from "./components/DepositPage";
import { useSelector } from "react-redux";
import { CSSTransition } from "react-transition-group";
import { useNavigate } from "react-router-dom";
import BackButton from "../../constants/BackButton"
import WithdrawalPage from "./components/WithdrawalPage";
import pagesHistory from "../../constants/pagesHistory";
const Wallet = ({ onClose = false , isFixed = false, left = false, ...props}) => {
  useProtect()
  const address = useSelector((state) => state.telegramUserInfo.address);
  const navigate = useNavigate()
  const [withdrawal, setWithDrawal] = useState(false)
  const [depositShow, setDepositShow] = useState(false)

  useEffect( () => {
    return () => {
      pagesHistory.push('/Wallet')
    }
  } , []  )

  const BackFunction = useCallback( () => {
    if (depositShow){
      setDepositShow(false)
    }
    else{
      if (withdrawal){
        setWithDrawal(false)
      }
      else{
        if (!onClose){
          if (pagesHistory[pagesHistory.length - 1] === "/WalletEnter" || pagesHistory[pagesHistory.length - 1] === "/WalletInit" || pagesHistory[pagesHistory.length - 1] === "/HappyPage"){
            console.warn(pagesHistory[pagesHistory.length - 1])
            if (pagesHistory[pagesHistory.length - 1] === "/HappyPage"){
                navigate('/')
            }
            else{
              navigate(-2)
            }
          }
          else{
            navigate(-1)
          }
        }
        else{
          onClose(false)
        }
      }
    }
  } , [depositShow, setDepositShow, withdrawal, setWithDrawal, navigate, onClose] )

  useEffect( () => {


    BackButton.show()

    BackButton.onClick(BackFunction)
    
    return () => {
      BackButton.offClick(BackFunction)
      
    }
  } , [depositShow, BackFunction] )

  const balance = useSelector(state => state.balance.value)

  useEffect( () => {
    const menu = document.documentElement.querySelector(".FirstMenu");
    menu.classList.add("appearAnimation")
    menu.classList.remove("disappearAnimation")
    if (!(withdrawal || depositShow)){
      document.documentElement.style.overflowY = "hidden"
      document.body.style.overflowY = "hidden"
      menu.style.display = "flex"
    }
    else{
      document.body.style.overflowY = "auto"
      document.documentElement.style.overflowY = "auto"
       menu.style.display = "none"
    }
    return () => {
      if (isFixed){
        document.body.style.overflowY = "hidden"
        document.documentElement.style.overflowY = "hidden"
      }
      menu.style.display = "flex"
    }
  }, [withdrawal, depositShow, isFixed] )
  


  return (
    <div className={cl.mainContainer} {...props}>

        <MainPage balance={balance} setWithDrawal = {setWithDrawal} setDepositShow={setDepositShow} />

        <CSSTransition  in = {depositShow} timeout={0}
        mountOnEnter
        unmountOnExit
        >
          <DepositPage left = {left}  address={address} />
        </CSSTransition>

        <CSSTransition
        timeout={0} unmountOnExit mountOnEnter in = {withdrawal} >
            <WithdrawalPage setWithDrawal={setWithDrawal} balance={balance} />
        </CSSTransition> 

    </div>
  );
};

export default Wallet;
