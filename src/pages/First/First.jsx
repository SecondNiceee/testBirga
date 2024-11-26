import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { motion } from "framer-motion";

import BackButton from "../../constants/BackButton";
import "../MyAds/MyAds.css";
import MainButton from "../../constants/MainButton";
import AllTasks from "./AllTasks";
import { useDispatch, useSelector } from "react-redux";
import Responce from "./Responce";
import { CSSTransition } from "react-transition-group";
import pagesHistory from "../../constants/pagesHistory";
import { useFilteredArr } from "../../hooks/useFilteredArr";
import FirstChoiceCategory from "../AdCreatingOne/ChoiceCategory/FirstChoiceCategory";
import FirstChoiceSubCategory from "../AdCreatingOne/FirstChoiceSubCategory";
import AboutReaction from "../MyAds/components/AboutReaction";
import CardPage from "../CardPage/CardPage";
import axios from "axios";
import makeNewFile from "../../functions/newMakeFile";
import {  clearTasks } from "../../store/information";
import FirstDetails from "../../components/First/FirstDetails/FirstDetails";
import translation from "../../functions/translate";
import en from "../../constants/language";
import { useNavigate } from "react-router-dom";
import makeNewUser from "../../functions/makeNewUser";

let isDetailsActiveVar = false;
let localResponce;
let localStep;

const messageOne = translation("📣 Вы получили отклик на задачу «")
const messageTwo = translation("» от ")
const menu = document.documentElement.querySelector(".FirstMenu");
let resp = translation("Откликнуться?")

const textButton = translation("Вы действительно хотите откликнуться?")
const buttonText = translation("ОТКЛИКНУТЬСЯ")

const Yes = translation("Да")
const No = translation("Нет")




const First = ({ isPage = false }) => {

  const [pageValue, setPageValue] = useState(true)
  const firstRef = useRef(null);

  const [step, setStep] = useState(0);

  const address = useSelector( state => state.telegramUserInfo.address )
  const navigate = useNavigate()
  localStep = step;

  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      pagesHistory.push("/");
    };
  }, []);

  const [isDetailsActive, setDetailsActive] = useState({
    id: -1,
    isOpen: false,
  });

  const responseRef = useRef(null)

  useEffect(() => {
    if (isPage) {
      setTimeout(() => {
        setDetailsActive((value) => ({ ...value, isOpen: true }));
      }, 300);
    }
    // eslint-disable-next-line
  }, []);

  const [responce, setResponce] = useState({
    text: "",
    photos: [],
    name: "привет",
    isShablonModalActive: false,
    shablonIndex: 0,
    isShablon: false,
    shablonMaker: false,
  });

  const tonConstant = useSelector((state) => state.ton.value);

  const ordersInformation = useSelector(
    (state) => state.information.orderInformations
  );

  const [filters, setFilters] = useState({
    category: { id: -1, category: "Все" },
    subCategory: { id: -1, subCategory: "Все" },
    price: 0,
  });

  const [filterBy, setFilterBy] = useState("");

  const filteredArr = useFilteredArr(ordersInformation, filterBy);

  useEffect(() => {
    window.Telegram.WebApp.disableVerticalSwipes();
    // const data = JSON.stringify({ allow_vertical_swipe: false });

    // window
    //   .TelegramWebviewProxy
    //   .postEvent('web_app_setup_swipe_behavior', data);
  }, []);

  const secFilteredArray = useMemo(() => {
    let copy = [...filteredArr];
    if (filters.category.id !== -1) {
      if (filters.subCategory.id !== -1) {
        return copy.filter((e) => {
          return (
            e.category === filters.category.id &&
            e.subCategory === filters.subCategory.id &&
            e.tonValue * tonConstant >= filters.price
          );
        });
      } else {
        return copy.filter((e) => {
          return (
            e.category === filters.category.id &&
            e.tonValue * tonConstant >= filters.price
          );
        });
      }
    } else {
      return copy.filter((e) => {
        return e.tonValue * tonConstant >= filters.price;
      });
    }
  }, [filteredArr, filters, tonConstant]);


  
  const [pageAdvertisement, setPageAdvertisement] = useState(null);



  const detailsAdertisement = useMemo(() => {
    async function getAdvertisement() {
      try {

        console.log(String(window.Telegram.WebApp.initDataUnsafe.start_param.split('m')[0]))
        let advertisement = await axios.get(
          process.env.REACT_APP_HOST + "/advertisement/findOne",
          {
            params: {
              id: String(window.Telegram.WebApp.initDataUnsafe.start_param.split('m')[0]),
            },
            headers : {
              "X-API-KEY-AUTH" : process.env.REACT_APP_API_KEY,
              
            }
          }
        );
        let order = advertisement.data;
        let one = new Date(order.startTime);

        let two;
        if (order.endTime) {
          two = new Date(order.endTime);
        } else {
          two = "";
        }

        let files = await makeNewFile(order.folder, order.photos);

        let imTwo = await axios.get(
          process.env.REACT_APP_HOST + "/advertisement/findCount",
          {
            params: {
              userId: order.user.id,
            },
            headers : {
              "X-API-KEY-AUTH" : process.env.REACT_APP_API_KEY
            }
          }
        );

        const newUser = await makeNewUser(order)

        return {
          id: order.id,
          taskName: order.title,
          executionPlace: "Можно выполнить удаленно",
          time: { start: one, end: two },
          tonValue: order.price,
          taskDescription: order.description,
          photos: files,
          photosName: order.photos,
          customerName: order.user.fl,
          userPhoto: order.user.photo ? order.user.photo : "",
          rate: "5",
          isActive: true,
          creationTime: order.createdAt,
          viewsNumber: order.views,
          responces: order.responses,
          status: order.status,
          user: newUser,
          createNumber: imTwo.data,
          category: order.category.id,
        };
      } catch (e) {
        setPageValue(false)
        setDetailsActive({ isOpen: false, id: 1 });
      }
    }

    if (ordersInformation === null) {
      return "";
    } else {
      if (pageValue && isPage) {
        if (pageAdvertisement === null) {
          getAdvertisement().then((value) => setPageAdvertisement(value));
        }

        return pageAdvertisement;
      } else {
        return secFilteredArray[isDetailsActive.id];
      }
    }
  }, [  
    isPage,
    pageAdvertisement,
    isDetailsActive.id,
    ordersInformation,
    secFilteredArray,
    pageValue
  ]);





  const gotIt = useMemo( () => {
    console.log(detailsAdertisement);
    
    if (detailsAdertisement){

      if (detailsAdertisement.responces){
        console.log(detailsAdertisement)
        if (detailsAdertisement.responces.find((e) =>
          String(e.user.id) === String(window.Telegram.WebApp.initDataUnsafe.user.id)) || String(detailsAdertisement.user.id) === String(window.Telegram.WebApp.initDataUnsafe.user.id))

        {
          return true
        }
        else{
          return false
        }
      }
    }
    return false
    // eslint-disable-next-line
  },[detailsAdertisement,isDetailsActive.isOpen ] )


  console.log(gotIt);
  


  useEffect(() => {
    if (isDetailsActive.isOpen) {
      BackButton.show();
    }
  }, [isDetailsActive]);

  isDetailsActiveVar = isDetailsActive.isOpen;

  const [isProfile, setProfile] = useState(false);

  const [isCardOpen, setCardOpen] = useState({
    isOpen: false,
    card: {},
  });




  useEffect(() => {
    function closeDetails() {
      setDetailsActive((value) => ({ ...value, isOpen: false }));
    }

    function forward() {
      if (gotIt) {
        window.Telegram.WebApp.showPopup({
          title: translation("Ошибка"),
          message:
            translation("Задание ваше или вы откликнулись уже на него."),
        });
      } else {
        if (step === 0){
        
            setStep(1)
          

        }
      }
    }

    function back() {
      if (responce.isShablonModalActive) {
        setResponce((value) => ({ ...value, isShablonModalActive: false }));
      } else {
        if (responce.shablonMaker) {
          setResponce((value) => ({ ...value, shablonMaker: false }));
        } else {
          if (step === 1) {
            setStep(0);
            MainButton.setParams({
              is_active: true,
              color: "#2ea5ff",
              text_color: "#ffffff",
            });

            // mainRef.current.classList.remove('secondStep')
          } else {
            if (isCardOpen.isOpen) {
              setCardOpen((value) => ({ ...value, isOpen: false }));
            } else {
              if (isProfile) {
                setProfile(false);
              } else {
                if (step === 0) {
                  setResponce({
                    text: "",
                    photos: [],
                    name: "привет",
                    isShablonModalActive: false,
                    shablonIndex: 0,
                    isShablon: false,
                    shablonMaker: false,
                  });
                  closeDetails();
                  setPageValue(false)
                }
              }
            }
          }
        }
      }
    }

    MainButton.onClick(forward);
    BackButton.onClick(back);
    if (isDetailsActiveVar) {
      menu.classList.add("disappearAnimation");
      menu.classList.remove("appearAnimation");
      MainButton.show();
      BackButton.show();
      if (gotIt) {
        MainButton.setParams({
          //неизвесетно
          color: "#2f2f2f",
          text_color: "#606060",
        });
      } else {
        if (localStep === 0 ) {

          if (isDetailsActive.isOpen){
            if (detailsAdertisement){
              if (detailsAdertisement.status === "active"){

                MainButton.setParams({
                  is_active: true,
                  color: "#2ea5ff",
                  text_color: "#ffffff",
                });

              }
              else{
                MainButton.setParams({
                  is_active: false, //неизвесетно
                  color: "#2f2f2f",
                  text_color: "#606060",
                });
              }
            } 
          }
        }
      }
    } else {
      BackButton.hide();
      MainButton.hide();
      menu.classList.add("appearAnimation");
      menu.classList.remove("disappearAnimation");
      MainButton.setParams({
        is_active: true,
        color: "#2ea5ff",
        text_color: "#ffffff",
      });
    }
    return () => {
      MainButton.offClick(forward);
      BackButton.offClick(back);
    };
  }, [
    isDetailsActive.isOpen,
    step,
    gotIt,
    responce.isShablonModalActive,
    responce.shablonMaker,
    isProfile,
    isCardOpen.isOpen,
    setProfile,
    setCardOpen,
    detailsAdertisement,
    navigate,
    address
  ]);

  useEffect(() => {
    if (step === 0) {
      MainButton.setText(buttonText);
    }
    if (step === 1) {
      MainButton.setText(buttonText);
    }
  }, [step, isDetailsActive.isOpen]);


  localResponce = responce;


  useEffect(() => {
    if (localResponce.text.length < 3 && localStep === 1) {
      MainButton.setParams({
        color: "#2f2f2f",
        text_color: "#606060",
      });
    } else {
      if (localStep === 1) {
        MainButton.setParams({
          color: "#2ea5ff",
          text_color: "#ffffff",
          is_active: true,
        });
      }
    }
  }, [responce.text, step]);

  const me = useSelector((state) => state.telegramUserInfo);

  const [categoryOpen, setCategoryOpen] = useState(false);

  const [subCategory, setSubCategory] = useState(false);

  // useEffect( () => {
  //   firstRef.current.style.overflowY = "scroll"
  //   firstRef.current.style.height = "200vh"
  //   firstRef.current.style.paddingBottom = "calc(100vh)"

  // }, [] )

  useEffect(() => {
    dispatch(clearTasks());
  }, [dispatch]);


  useEffect(() => {
    let inputs = document.querySelectorAll("input");
    function addH() {
      window.Telegram.WebApp.HapticFeedback.notificationOccurred("success");
    }
    // Добавляем обработчик события на каждый элемент input, у которого type не равен file
    inputs.forEach(function (input) {
      if (input.type !== "file") {
        input.addEventListener("focus", addH);
      }
    });
    return () => {
      inputs.forEach(function (input) {
        if (input.type !== "file") {
          input.removeEventListener("focus", addH);
        }
      });
    };
  }, []);


  const [putStatus , setPutStatus] = useState(false)

  
  const forwardFunction = useCallback(() => {
    async function post(par) {
      try {
        let im;
        setPutStatus(true)
        responseRef.current.style.overflowY = "hidden"
        for (let i = 0; i < 1; i++) {
          im = await axios.post(process.env.REACT_APP_HOST + "/response", par[0], {
            params: {
              advertisementId: par[1].advertisement.id,
              userId: window.Telegram.WebApp.initDataUnsafe.user.id,
            },
            headers : {
              "X-API-KEY-AUTH" : process.env.REACT_APP_API_KEY
            }
          });
        }
        try{

          await axios.get( process.env.REACT_APP_HOST + "/user/sendMessage", {
            params: {
              chatId: par[1].advertisement.user.chatId,
              text:
              messageOne +
                par[1].advertisement.taskName.bold() +
                messageTwo +
                par[1].user.fl,
              buttonUrl:
                "https://connectbirga.ru/ResponsePage?advertisement=" +
                String(par[1].advertisement.id) +
                "&response=" +
                String(im.data.id),
                languageCode : en ? "en" : "ru"
            },
            headers : {
              "X-API-KEY-AUTH" : process.env.REACT_APP_API_KEY
            }
          });
        }
        
        catch(e){
          console.warn(e)
        }




        setDetailsActive((value) => ({ ...value, isOpen: false }));
        setStep(0);
        setProfile(false);
        setCardOpen((value) => ({ ...value, isOpen: false }));
        setResponce({
          text: "",
          photos: [],
          name: "привет",
          isShablonModalActive: false,
          shablonIndex: 0,
          isShablon: false,
          shablonMaker: false,
        });
        menu.style.display = "flex"

        responseRef.current.style.overflowY = "scroll"
        setPutStatus(false)

        return par[1];



      } catch (e) {
        console.log(e);
        window.Telegram.WebApp.showAlert(e);
      }
    }
    async function postResponce(advertismetId, userId) {
      let myFormData = new FormData();
      myFormData.append("information", String(responce.text));

      myFormData.append("userId", String(userId));
      myFormData.append("advertismentId", String(advertismetId));

      responce.photos.forEach((e, i) => {
        myFormData.append(`photos`, e);
      });
      try {
        let gibrid = { ...responce };
        gibrid.isWatched = "";
        gibrid.advertisement = detailsAdertisement;
        gibrid.user = {
          id: me.id,
          fl: me.firstName,
          link: me.link,
          photo: me.photo ? me.photo : "",
          about: me.profile.about,
          stage: me.profile.stage,
        };
        await post([myFormData, gibrid]);
        // dispatch(clearResponses());
        // dispatch(fetchResponses([me, 1]));
        // dispatch(addResponce([gibrid.advertisement.id, gibrid]));
      } catch (e) {
        console.warn(e);
      }
    }

    if (step !== 0 && !responce.shablonMaker) {
          if (localResponce.text.length < 3){
            window.Telegram.WebApp.showAlert(translation("Ваш отклик пуст!"))
          }
          else{

            window.Telegram.WebApp.showPopup(
              {
                title: resp,
                message: textButton,
                buttons: [
                  { id: "save", type: "default", text: Yes },
                  { id: "delete", type: "destructive", text: No },
                ],
              },
              (buttonId) => {
                if (buttonId === "delete" || buttonId === null) {
                  // setShablon({...shablon , isActive : false})
                }
                if (buttonId === "save") {
                  window.Telegram.WebApp.HapticFeedback.notificationOccurred(
                    "success"
                  );
                  postResponce(detailsAdertisement.id, window.Telegram.WebApp.initDataUnsafe.user.id);
                  // mainRef.current.classList.remove('secondStep')
      
                }
              }
            );
          }
      
    }
  }, [

    responce,
    step,
    
    setDetailsActive,
    setStep,
    me,
    detailsAdertisement
  ]);

  const categorys = useSelector((state) => state.categorys.category);

  const subCategorys = useSelector((state) => state.categorys.subCategory);

  useEffect(() => {
    MainButton.onClick(forwardFunction);
    return () => {
      MainButton.offClick(forwardFunction);
    };
  }, [responce, forwardFunction]);



  const firsStyle = useMemo(() => {
    if (step === 1) {
      return {
        transform: "translateX(-200vw)",
      };
    } else {
      if (isDetailsActive.isOpen)
        return {
          transform: "translateX(-100vw)",
        };
      else {
        return {};
      }
    }
  }, [step, isDetailsActive.isOpen]);

  useEffect(() => {
    const input = document.querySelectorAll('input'); 
    const textarea = document.querySelectorAll("textarea");
    for (let smallInput of input) {
      smallInput.addEventListener("focus", () => {
        menu.style.display = "none"; // скрываем меню
      });
      smallInput.addEventListener("blur", () => {
        menu.style.display = "flex"; // скрываем меню
      });
    }
    for (let smallTextarea of textarea) {
      smallTextarea.addEventListener("focus", () => {
        menu.style.display = "none"; // скрываем меню
      });
      smallTextarea.addEventListener("blur", () => {
        menu.style.display = "flex"; // скрываем меню
      });
    }
  }, []);

  // useEffect( () => {
  //   firstRef.current.style.height = "100vh"
  //   setTimeout( () => {
  //     firstRef.current.style.height = "calc(100vh - 80px)"
  //   } , 600 )
  // } , [] )
  const changer = useSelector( state => state.menuSlice.changer )

  useEffect( () => {
    setCardOpen((value) => ({...value , isOpen : false}))
    setCategoryOpen(false)
    setDetailsActive((value) => ({...value , isOpen : false}))
    setProfile(false)
    setResponce((value) => ({...value , isShablon : false , isShablonModalActive: false, shablonMaker : false}))
    setStep(0)
    setSubCategory(false)
  } , [changer] )


  console.warn(detailsAdertisement)

  return (
    <div style={firsStyle} className="first-container">
      <motion.div
        // style={style}
        ref={firstRef}
        className="First"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        <div className="first-wrapper">
          <AllTasks
            setFilters={setFilters}
            setSubCategory={setSubCategory}
            filters={filters}
            setCategoryOpen={setCategoryOpen}
            filterBy={filterBy}
            setFilterBy={setFilterBy}
            ordersInformation={secFilteredArray}
            setDetailsActive={setDetailsActive}
          />
        </div>

        

        <CSSTransition in={categoryOpen} timeout={0} mountOnEnter unmountOnExit>
          <FirstChoiceCategory
              style={{
              paddingBottom: "100px",
              top : firstRef.current ? firstRef.current.scrollTop + "px" : "0px"
            }}
            subCategorys={subCategorys}
            categorys={categorys}
            setCatagoryChoiceOpen={setCategoryOpen}
            taskInformation={filters}
            setTaskInformation={setFilters}
          />
        </CSSTransition>

        <CSSTransition in={subCategory} timeout={0} mountOnEnter unmountOnExit>
          <FirstChoiceSubCategory
            style={{
              paddingBottom: "100px",
              top : firstRef.current ? firstRef.current.scrollTop + "px" : "0px"
            }}
            setSubcategoryChoiceOpen={setSubCategory}
            subCategorysPar={subCategorys}
            taskInformation={filters}
            setTaskInformation={setFilters}
          />
        </CSSTransition>
      </motion.div>

      <CSSTransition
        classNames="left-right"
        in={isCardOpen.isOpen}
        timeout={400}
        mountOnEnter
        unmountOnExit
      >
        <CardPage style={{ paddingBottom: "74px" , left : "100vw" }} card={isCardOpen.card} />
      </CSSTransition>

      <CSSTransition
        in={isProfile}
        timeout={400}
        classNames="left-right"
        mountOnEnter
        unmountOnExit
      >
        <AboutReaction
        isTelesgramVisible={false}
          style={{
            paddingBottom: "74px",
            left : "100vw"
          }}
          setOneCard={setCardOpen}
          responce={
            detailsAdertisement
          }
        />
      </CSSTransition>

      <CSSTransition
        in={isDetailsActive.isOpen}
        timeout={400}
        // classNames="left-right"
      >
        <FirstDetails
          isDetailsActive={isDetailsActive.isOpen}
          breakRef={firstRef}
          setProfile={setProfile}
          // style={pageValue && isPage ? { transform: "translateX(0%)" } : {}}
          // className={}
          orderInformation={detailsAdertisement}
        />
      </CSSTransition>

      <CSSTransition
         in={step === 1 ? true : false}
        // in = {true}
        timeout={400}
        mountOnEnter
        unmountOnExit
      >
        <Responce
          ref={responseRef}
          putStatus = {putStatus}
          responce={responce}
          setResponce={setResponce}
          orderInformation={
            (pageValue && isPage) ? 
            pageAdvertisement
            :
            secFilteredArray[isDetailsActive.id]
              ? secFilteredArray[isDetailsActive.id]
              : "he"
          }
        /> 
      </CSSTransition>
    </div>
  );
};

export default First;
