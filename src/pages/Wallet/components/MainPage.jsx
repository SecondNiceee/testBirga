import React, { memo, useCallback, useEffect, useRef, useState } from "react";
import cl from "../index.module.scss";
import Buttons from "./Buttons";
import { useDispatch, useSelector } from "react-redux";
import en from "../../../constants/language";
import formateMoney from "../../../functions/formateMoney";
import { getBalance } from "../../../store/balance";
import PropagateLoader from "react-spinners/PropagateLoader";
import { CSSTransition } from "react-transition-group";
import BalanceAlert from "./BalanceAlert";
import Text from "../../../components/Text/Text";
import { fetchTon } from "../../../store/ton";
const MainPage = ({ setDepositShow, setWithDrawal, balance }) => {


  const balanceStatus = useSelector(state => state.balance.status)
  const dispatch = useDispatch()
  const value = useSelector((state) => state.ton.value);
  const reloadRef = useRef(null)
  const address = useSelector(state => state.telegramUserInfo.address)

  useEffect( () => {
    if (value === 0){
      dispatch(fetchTon())
    }
  } , [dispatch, value] )

  const [clickLol, setClickLol] = useState(false)
  
  const [reloadBalance, setReloadBalande] = useState(false)

  useEffect( () => {
    if (reloadBalance){

      reloadRef.current.classList.add(cl.reloadBalanceAnimation)
      const timeOut = setTimeout( () => {
        if (balanceStatus === "completed"){
          reloadRef.current.classList.remove(cl.reloadBalanceAnimation)
          setReloadBalande(false)
        }
        if (balanceStatus === "reject"){
          dispatch(getBalance({userAddress : address}))
        }
      }, 2000 )
      return () => {
        clearTimeout(timeOut)
      }
    }
  } , [reloadBalance, balanceStatus, dispatch, address] )
  const balanceClickHandler = useCallback( () => {
    setClickLol((value) => (!value))
    setReloadBalande(true)
    dispatch(getBalance({userAddress : address}))

  } , [setReloadBalande, setClickLol, address, dispatch] )
  return (
    <div className={cl.wrapper}>
      <div onClick={balanceClickHandler} className={cl.top}>
        <Text>Кошелек</Text>
        <svg ref={reloadRef}  className={cl.reloadBalance} width="22" height="21" viewBox="0 0 22 21" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M18.5371 9.45068H17.6142C17.2253 6.10864 14.3249 3.42578 10.8313 3.42578C8.89988 3.42578 7.14646 4.26953 5.93357 5.58789C5.61057 5.9043 5.62376 6.32617 5.88743 6.57007C6.15769 6.82056 6.54661 6.82056 6.8762 6.51733C7.85837 5.45605 9.26902 4.79028 10.8313 4.79028C13.613 4.79028 15.8608 6.82715 16.2365 9.45068H15.228C14.7204 9.45068 14.582 9.82642 14.8786 10.2351L16.4541 12.4631C16.698 12.7927 17.0671 12.7993 17.3044 12.4631L18.8865 10.2417C19.1831 9.82642 19.0512 9.45068 18.5371 9.45068ZM3.12546 11.0393H4.05491C4.44382 14.3813 7.34421 17.0642 10.8313 17.0642C12.7759 17.0642 14.5293 16.2139 15.7422 14.8955C16.0586 14.5791 16.0454 14.1572 15.7817 13.9133C15.5115 13.6628 15.1291 13.6628 14.7929 13.9727C13.824 15.0339 12.4133 15.6997 10.8313 15.6997C8.05613 15.6997 5.80833 13.6628 5.43259 11.0393H6.43455C6.93552 11.0393 7.08054 10.6636 6.78391 10.2549L5.20188 8.02686C4.96458 7.69727 4.59544 7.69067 4.35813 8.02686L2.7761 10.2483C2.47288 10.6636 2.6113 11.0393 3.12546 11.0393Z" fill="#2EA5FF" />
</svg>
      </div>

      {reloadBalance ?       <PropagateLoader color="white" cssOverride={
        {
          display : 'flex',
          height : "40px",
          alignItems : "center",
          justifyContent : "center",
          marginTop : "45px",
          marginLeft : "auto",
          marginRight : "auto"
        }
      }  /> :       <p className={cl.priceText}>
      {formateMoney(String(balance * value).replace('.', ',') , 2,',' )}
       <span>{en ? "$" : "₽"}</span>
     </p>
}




      <Buttons setWithDrawal={setWithDrawal} setDepositShow={setDepositShow} />

      <div className={cl.monetka}>
        <div className={cl.left}>
          <svg
            width="41"
            height="41"
            viewBox="0 0 41 41"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clip-path="url(#clip0_2409_16018)">
              <path
                d="M20.668 40.333C31.7137 40.333 40.668 31.3787 40.668 20.333C40.668 9.28729 31.7137 0.333008 20.668 0.333008C9.62225 0.333008 0.667969 9.28729 0.667969 20.333C0.667969 31.3787 9.62225 40.333 20.668 40.333Z"
                fill="#0098EA"
              />
              <path
                d="M27.4957 11.4961H13.8373C11.326 11.4961 9.73432 14.205 10.9978 16.395L19.4272 31.0055C19.9773 31.9595 21.3558 31.9595 21.9058 31.0055L30.337 16.395C31.5987 14.2085 30.007 11.4961 27.4974 11.4961H27.4957ZM19.4203 26.624L17.5845 23.0711L13.155 15.1487C12.8628 14.6417 13.2237 13.9919 13.8356 13.9919H19.4186V26.6257L19.4203 26.624ZM28.1746 15.147L23.7468 23.0728L21.911 26.624V13.9902H27.494C28.1059 13.9902 28.4668 14.64 28.1746 15.147Z"
                fill="white"
              />
            </g>
            <defs>
              <clipPath id="clip0_2409_16018">
                <rect
                  width="40"
                  height="40"
                  fill="white"
                  transform="translate(0.667969 0.333008)"
                />
              </clipPath>
            </defs>
          </svg>
          <p>TON</p>
        </div>
        <div className={cl.right}>
           <p>
            ≈{ formateMoney(String(balance * value).replace(',' , '.'),2,'.' ) }
            {en ? "$" : "₽"}
          </p>
          <p>{ formateMoney(String(balance).replace(',','.'),3,'.')}</p>

        </div>
      </div>
      <div className={cl.monetka}>
        <div className={cl.left}>
          <svg
            width="41"
            height="41"
            viewBox="0 0 41 41"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clip-path="url(#clip0_2409_16029)">
              <path
                d="M20.668 40.834C31.7137 40.834 40.668 31.8797 40.668 20.834C40.668 9.78827 31.7137 0.833984 20.668 0.833984C9.62225 0.833984 0.667969 9.78827 0.667969 20.834C0.667969 31.8797 9.62225 40.834 20.668 40.834Z"
                fill="#3DA8F8"
              />
              <path
                d="M13.2148 22.3622V19.7126C13.2148 14.5087 15.9595 11.4244 20.7286 11.4244C23.0384 11.4244 24.9271 12.1309 26.245 13.4625C27.1554 14.3728 27.7261 15.5277 27.7261 16.343C27.7261 17.1446 27.1962 17.6474 26.4217 17.6474C25.8238 17.6474 25.4298 17.4164 24.9407 16.6963C23.8673 14.9299 22.6172 14.1147 20.8781 14.1147C17.9432 14.1147 16.2856 16.1799 16.2856 19.8077V22.2806C16.2856 25.99 17.9296 28.0416 20.8781 28.0416C22.6444 28.0416 23.9896 27.24 24.995 25.5144C25.4842 24.8079 25.8374 24.5497 26.4081 24.5497C27.2233 24.5497 27.7261 25.066 27.7261 25.8541C27.7261 26.7644 27.0875 27.9737 26.0684 28.8841C24.7776 30.0797 22.9705 30.7319 20.7286 30.7319C15.9323 30.7319 13.2148 27.6748 13.2148 22.3622Z"
                fill="white"
              />
              <rect
                x="19.1523"
                y="9"
                width="2.33745"
                height="3.21399"
                rx="1.16872"
                fill="white"
              />
              <rect
                x="19.1523"
                y="29.4531"
                width="2.33745"
                height="3.21399"
                rx="1.16872"
                fill="white"
              />
            </g>
            <defs>
              <clipPath id="clip0_2409_16029">
                <rect
                  width="40"
                  height="40"
                  fill="white"
                  transform="translate(0.667969 0.833984)"
                />
              </clipPath>
            </defs>
          </svg>

          <p>CON</p>
        </div>
        <div className={cl.right}>
          <p>
            ≈{0}
            {en ? "$" : "₽"}
          </p>
          <p>0</p>
        </div>
      </div>

      <CSSTransition classNames = "errorModalTwo" in = {clickLol} timeout={10000}  >
        <BalanceAlert />
      </CSSTransition>
    </div>
  );
};

export default memo(MainPage);
