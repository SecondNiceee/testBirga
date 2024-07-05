import { lazy, useEffect, Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import "./css/Main.css";
import "./css/Fonts.css";
import "./css/Values.css";
import "./css/style.css";

// import { postEvent } from '@tma.js/sdk';
// import { initPopup } from '@tma.js/sdk';

import FirstMenu from "./pages/FirstMenu/FirstMenu";

import { fetchTon } from "./store/ton";
import { fetchUserInfo } from "./store/telegramUserInfo";
import { fetchMyOrders } from "./store/information";
import { Triangle } from "react-loader-spinner";
import { getCategorys, getSubCategorys } from "./store/categorys";
import { fetchAllShablons } from "./store/shablon";
const First = lazy(() => import("./pages/First/First"));
const AdCreating = lazy(() => import("./pages/AdCreating"));
const Profile = lazy(() => import("./pages/Profile/Profile"));
const Balance = lazy(() => import("./pages/Balance"));
const MyAds = lazy(() => import("./pages/MyAds/MyAds"));
const AllShablons = lazy(() => import("./pages/AllShablons/AllShablons"));
const SavedPage = lazy( () => import("./pages/SavedPage/SavedPage") )

const MyLoader = () => {
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
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
  const isMenuActive = useSelector((state) => state.menu.value);
  // useEffect(() => {

  //   // navigate('/MyAds')
  //   // navigate('/')
  // }, []

  // )
  return (
    <div className="container">
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
            path="/MyAds"
            element={
              <Suspense fallback={<MyLoader />}>
                <MyAds />
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
  );
};

function App() {
  // useEffect( () => {
  //   document.documentElement.style.overflowY = 'hidden'
  //   document.documentElement.style.marginTop = '15px'
  //   window.scrollTo(0 , 15)
  // },[] )

  console.log('приыет')
  window.Telegram.WebApp
  .showPopup({
    title: "Мое окно из улицы",
    message: "даааааааа",
    buttons: [
      { id: "save", type: "default", text: "Да" },
      { id: "delete", type: "destructive", text: "Нет" },
      {id : "jj" , type : "cancel"},
      {id : "jjss" , type : "close"}
    ],
  } , (buttonId) => {

    if (buttonId === "delete" || buttonId === null) {
      // setShablon({...shablon , isActive : false})
    }
    if (buttonId === "save") {

  } })

  const dispatch = useDispatch();

  window.Telegram.WebApp.expand();

  useEffect(() => {
    dispatch(fetchTon());
    dispatch(fetchUserInfo());
    dispatch(fetchMyOrders());
    dispatch(getCategorys());
    dispatch(getSubCategorys());
    dispatch(getCategorys());
    dispatch(getSubCategorys());
    dispatch(fetchAllShablons());
  }, [dispatch]);
  return (
    <BrowserRouter>
      <div className="UperContainer">
        <FirstMenu />
        <div className="MainContainer">
          <AnimatedSwitch />
        </div>
      </div>
    </BrowserRouter>
    // <SwiperComponent />
  );
}

export default App;
