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
import { Address, TonClient } from "ton";
const Wallet = () => {
  useProtect()
  const address = useSelector((state) => state.telegramUserInfo.address);
  const navigate = useNavigate()
  const [withdrawal, setWithDrawal] = useState(false)
  const [depositShow, setDepositShow] = useState(false)

  const BackFunction = useCallback( () => {
    if (depositShow){
      setDepositShow(false)
    }
    else{
      if (withdrawal){
        setWithDrawal(false)
      }
      else{

        navigate("/Profile")
      }
    }
  } , [depositShow, setDepositShow, withdrawal, setWithDrawal, navigate] )

  useEffect( () => {


    BackButton.show()

    BackButton.onClick(BackFunction)
    
    return () => {
      BackButton.offClick(BackFunction)
      
    }
  } , [depositShow, BackFunction] )

  const [balance, setBalance] = useState(0)

  useEffect( () => {
    const menu = document.documentElement.querySelector(".FirstMenu");
    if (!(withdrawal || depositShow)){
      menu.style.display = "flex"
    }
    else{
       menu.style.display = "none"
    }
    return () => {
      menu.style.display = "flex"
    }
  }, [withdrawal, depositShow] )
    

  const getBalance = useCallback(async () => {

    const client = new TonClient({
      endpoint: "https://toncenter.com/api/v2/jsonRPC",
      apiKey : process.env.REACT_APP_API_KEY_TWO
    });

    console.log(address);

    const balance = await client.getBalance(Address.parse(address))


    setBalance((Number(balance) / 10**9) ) 


  }, [address, setBalance]);

    
  useEffect( () => {
    if (address){
      getBalance()
    }
  }, [address, getBalance] )

  return (
    <div className={cl.mainContainer}>

        <MainPage balance={balance} setWithDrawal = {setWithDrawal} setDepositShow={setDepositShow} />

        <CSSTransition  in = {depositShow} timeout={0}
        mountOnEnter
        unmountOnExit
        >
          <DepositPage  address={address} />
        </CSSTransition>

        <CSSTransition unmountOnExit mountOnEnter in = {withdrawal} >
            <WithdrawalPage setWithDrawal={setWithDrawal} balance={balance} />
        </CSSTransition> 

    </div>
  );
};

export default Wallet;
