import {
  lazy,
  useEffect,
  Suspense,
  useRef,
  useState,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import axios from 'axios'

import "./css/Main.css";
import "./css/Fonts.css";
import "./css/Values.css";
import "./css/style.css";
import "./scss/Profile/_Profile.scss";
import "./scss/main.scss";

// import { postEvent } from '@tma.js/sdk';
// import { initPopup } from '@tma.js/sdk';

import FirstMenu from "./pages/FirstMenu/FirstMenu";

import { fetchTon } from "./store/ton";
import { fetchUserInfo } from "./store/telegramUserInfo";
import { Triangle } from "react-loader-spinner";
import { getCategorys, getSubCategorys } from "./store/categorys";
import { fetchAllShablons } from "./store/shablon";

import { fetchAllIds } from "./store/saves";

import { getBalance } from "./store/balance";
const HappyPage = lazy( () => import("./pages/HappyHold/HappyPage") )
const First = lazy(() => import("./pages/First/First"));
const AdCreating = lazy(() => import("./pages/AdCreating"));
const Profile = lazy(() => import("./pages/Profile/Profile"));
const Balance = lazy(() => import("./pages/Balance"));
const MyAds = lazy(() => import("./pages/MyAds/MyAds"));
const AllShablons = lazy(() => import("./pages/AllShablons/AllShablons"));
const SavedPage = lazy(() => import("./pages/SavedPage/SavedPage"));
const ProfilePage = lazy(() => import("./pages/ProfilePage/ProfilePage"));
const WalletEnter = lazy( () => import("./pages/WalletEnter/WalletEnter") )
const Wallet = lazy( () => (import("./pages/Wallet")) )
const WalletInit = lazy( () => (import("./pages/WalletEnter/WalletInit")) )


export const API_KEY = process.env.REACT_APP_API_KEY;
const MyLoader = () => {
  return (
    <div
      style={{
        width: "100vw",
        height: "calc(100vh)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Triangle
        visible={true}
        height="80"
        width="80"
        color="white"
        ariaLabel="triangle-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>
  );
};

const AnimatedSwitch = () => {
  const location = useLocation();
  const isMenuActive = useSelector((state) => state.menuSlice.value);

  const menuRef = useRef(null);
  const navigate = useNavigate()

  useEffect(() => {

    if (location.pathname === "/AdCreating" || location.pathname === "/createWallet" || location.pathname === "/Wallet" || location.pathname === "/WalletInit" || location.pathname === "/HappyPage") {
        if (location.pathname !== "/Wallet"){
          document.documentElement.style.overflowY = "auto";
          document.body.style.overflowY = "auto"
        }
        
        if(location.pathname !== "/Wallet"){
          menuRef.current.classList.add("disappearAnimation");
          menuRef.current.classList.remove("appearAnimation");
        }
        else{
          menuRef.current.classList.add("appearAnimation");
          menuRef.current.classList.remove("disappearAnimation");
        }
        
    } else {
      document.documentElement.style.overflowY = "hidden";
      document.body.style.overflowY = "hidden"
      menuRef.current.classList.add("appearAnimation");
      menuRef.current.classList.remove("disappearAnimation");
    }
  }, [location.pathname]);

  const congratulate = useSelector(state => state.telegramUserInfo.congratulate)
  const userId = useSelector(state => state.telegramUserInfo.id)

  const [showCongradulate , setShowCongradulate] = useState(true)

  useEffect( () => {
    if (congratulate && congratulate.length > 0 && showCongradulate){
      navigate('/HappyPage')
    }
  } , [congratulate, navigate, showCongradulate] )

  useEffect(() => {
    console.log(userId)
    axios.put(`${process.env.REACT_APP_HOST}/user/visit`, {}, {
      params: {
        userId: String(userId)
      },
      headers: {
        "X-API-KEY-AUTH" : process.env.REACT_APP_API_KEY
      }
    })
  }, [userId])
  
  
  return (
    <>
      <FirstMenu ref={menuRef} />
      <div
        className="container"
        style={{
          minHeight: "calc(100vh)",
        }}
      >
        <div
          style={isMenuActive ? { opacity: "0.6" } : { maxWidth: "0px" }}
          className="black"
        ></div>

        <AnimatePresence>
          <Routes location={location} key={location.pathname}>
            <Route
              path="/"
              element={
                <Suspense fallback={<MyLoader />}>
                  <First />
                </Suspense>
              }
            />

            <Route
              path="/FirstPage"
              element={
                <Suspense fallback={<MyLoader />}>
                  <First isPage={true} />
                </Suspense>
              }
            />

            <Route
              path="/WalletInit"
              element={
                <Suspense fallback={<MyLoader />}>
                  <WalletInit  />
                </Suspense>
              }
            />

            <Route
              path="/createWallet"
              element={
                <Suspense fallback={<MyLoader />}>
                  <WalletEnter />
                </Suspense>
              }
            />

          <Route
              path="/Wallet"
              element={
                <Suspense fallback={<MyLoader />}>
                  <Wallet />
                </Suspense>
              }
            />


            <Route
              path="/ProfilePage"
              element={
                <Suspense fallback={<MyLoader />}>
                  <ProfilePage />
                </Suspense>
              }
            />

            <Route
              path="/savedPage"
              element={
                <Suspense fallback={<MyLoader />}>
                  <SavedPage />
                </Suspense>
              }
            />

            <Route
              path="/AdCreating"
              element={
                <Suspense fallback={<MyLoader />}>
                  <AdCreating />
                </Suspense>
              }
            />

            <Route
              path="/Profile"
              element={
                <Suspense fallback={<MyLoader />}>
                  <Profile />
                </Suspense>
              }
            />

            <Route
              path="/Balance"
              element={
                <Suspense fallback={<MyLoader />}>
                  <Balance />
                </Suspense>
              }
            />
            
            <Route
              path="/HappyPage"
              element={
                <Suspense fallback={<MyLoader />}>
                  <HappyPage setShowCongradulate = {setShowCongradulate} congradulate={congratulate} task={ congratulate ?  congratulate[congratulate.length - 1] : []} />
                </Suspense>
              }
            />
            <Route
              path="/MyAds"
              element={
                <Suspense fallback={<MyLoader />}>
                  <MyAds />
                </Suspense>
              }
            />

            <Route
              path="/ResponsePage"
              element={
                <Suspense fallback={<MyLoader />}>
                  <MyAds isPage = {true}/>
                </Suspense>
              }
            />

            <Route
              path="/AllShablons"
              element={
                <Suspense fallback={<MyLoader />}>
                  <AllShablons />
                </Suspense>
              }
            />
          </Routes>
        </AnimatePresence>
      </div>
    </>
  );
};
function App() {

  

  window.Telegram.WebApp.disableVerticalSwipes();

  window.Telegram.WebApp.disableVerticalSwipes();

  window.Telegram.WebApp.setHeaderColor("#18222d");
  window.Telegram.WebApp.setBackgroundColor("#18222d");

  const dispatch = useDispatch();

  const address = useSelector( state => state.telegramUserInfo.address )

  window.Telegram.WebApp.expand();


  useEffect(() => {
    dispatch(fetchTon());
    dispatch(fetchUserInfo());
    dispatch(getCategorys());
    dispatch(getSubCategorys());
    dispatch(getCategorys());
    dispatch(getSubCategorys());
    dispatch(fetchAllShablons());
    dispatch(fetchAllIds());
    // dispatch(fetchAllValues());
  }, [dispatch]);



  // useEffect(() =>{
  //   dispatch(fetchMyOrders(1));
  // },[] )



  useEffect( () => {
    if (address){
      dispatch(getBalance({userAddress : address}))
    }
  } , [address, dispatch] )


  

  


  
  return (
    <BrowserRouter>
      <div className="UperContainer">
        <div className="MainContainer">
          <AnimatedSwitch />
          {/* <ModalChoicer /> */}
        </div>
      </div>
    </BrowserRouter>
    // Это ветка тестинг
    // Тут какое - то изменение
    // Тут огромное изменение
  );
}

export default App;
