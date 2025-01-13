import React, { memo, useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import FullPicker from "../../components/UI/FullPicker/FullPicker";
import Choicer from "../../components/SavedPage/Choicer/Choicer";
import { CSSTransition } from "react-transition-group";
import FirstDetails from "../../components/First/FirstDetails/FirstDetails";
import Responce from "../First/Responce";
import MainButton from "../../constants/MainButton";
import BackButton from "../../constants/BackButton";
import axios from "axios";
import { addResponce } from "../../store/information";
import pagesHistory from "../../constants/pagesHistory";
import SavedResponse from "../../components/SavedPage/SavedReponse/SavedResponse";
import SavedProfile from "../../components/SavedPage/SavedProfile/SavedProfile";
import CardPage from "../CardPage/CardPage";
import AboutReaction from "../MyAds/components/AboutReaction";
import { clearAll, fetchSavedAdvertisements, fetchSavedCards, fetchSavedResponses } from "../../store/saves";
import translation from "../../functions/translate";
import en from "../../constants/language";

const values = ["Заказы", "Отклики", "Кейсы"];
const keys = ["advertisment", "responces", "cards"];

const buttonText = translation("ОТКЛИКНУТЬСЯ")
const textButton = translation("Вы действительно хотите откликнуться?")
const menu = document.documentElement.querySelector(".FirstMenu")
const Yes = translation("Да")
const No = translation("Нет")
const SavedPage = () => {

  useEffect( () => {
    
    const input = document.querySelectorAll('input');
    const textarea  = document.querySelectorAll('textarea');
    for (let smallInput of input){
      smallInput.addEventListener('focus', () => {
        menu.style.display = 'none'; // скрываем меню
      });
      smallInput.addEventListener('blur', () => {
        menu.style.display = 'flex'; // скрываем меню
      });
    }
    for (let smallTextarea of textarea){
      smallTextarea.addEventListener('focus', () => {
        menu.style.display = 'none'; // скрываем меню
      });
      smallTextarea.addEventListener('blur', () => {
        menu.style.display = 'flex'; // скрываем меню
      });
    }
  } , [] )


  const [card, setCard] = useState({
    isOpen: false,
    card: {
      behanceLink : "",
      description : "",
      dribbbleLink : "",
      id : 0,
      photos : [],
      photosNames : [],
      title : ""
    },
  });

  const [myResponse, setMyResponse] = useState({
    responce: {},
    isActive: false,
  });

  const [responce, setResponce] = useState({
    isOpen: false,
    text: "",
    photos: [],
    name: "привет",
    isShablonModalActive: false,
    shablonIndex: 0,
    isShablon: false,
    shablonMaker: false,
  });


  const dispatch = useDispatch();
  const [nowKey, setNowKey] = useState("advertisment");

  const [isProfileOpen , setProfileOpen] = useState(false)

  const [isProfile , setProfile] = useState(false)

  const GreyIntWidth = useMemo(() => {
    return (document.documentElement.clientWidth - 36) / 3;
  }, []);
  const GreyWidth = useMemo(() => {
    return GreyIntWidth.toString() + "px";
  }, [GreyIntWidth]);

  const [details, setDetails] = useState({
    isOpen: false,
    id: 0,
  });
  const [extraDetails, setExtraDetails] = useState({
    isOpen : false,
    id : 0
    })

  useEffect(() => {
    dispatch(fetchSavedAdvertisements([1]))
    dispatch(fetchSavedCards([1]))
    dispatch(fetchSavedResponses([1]))
    return () => {

      pagesHistory.push("/SavedPage");
      dispatch(clearAll())

    };
  }, [dispatch]);
  const savedTasks = useSelector((state) => state.saves.tasks);

  const gotIt = useMemo(() => {
    if (
      savedTasks !== null &&
      savedTasks.length > 0 &&
      savedTasks[details.id]
    ) {
      if (savedTasks[details.id].responces) {
        if (savedTasks[details.id].responces.find(e => String(e.user.id) === "window.Telegram.WebApp.initDataUnsafe.user.id")){
          return true
        }
        else{
          return false
        }
      }
    }
    return false;
  }, [savedTasks, details.id]);

  useEffect(() => {
    // setStep(varStep)
    // setDetailsActive({...isDetailsActive , isOpen : isDetailsActiveVar})
    if (details.isOpen) {
      BackButton.show();
    }
  }, [details.isOpen]);

  useEffect(() => {
    function forward() {
      if (gotIt) {
        window.Telegram.WebApp.showPopup({
          title: translation("Ошибка"),
          message:
            translation("Вы уже откликнулись на это задание. Заказчик обязательно увидит ваш отклик."),
        });
      } else {
        if (!responce.isOpen) {
          setResponce((value) => ({ ...value, isOpen: true }));
        }
      }
    }

    function back() {
      if (false) {
        // setSliderActive({...sliderActive, isActive : false})
      } else {

        

          if (responce.isShablonModalActive) {
            setResponce((responce) => ({
              ...responce,
              isShablonModalActive: false,
            }));
          } else {
            if (responce.shablonMaker) {
              setResponce((responce) => ({ ...responce, shablonMaker: false }));
            } else {
              if (responce.isOpen) {
                setResponce((value) => ({ ...value, isOpen: false }));
              } else {
                if (card.isOpen){
                  setCard((value) => ({...value , isOpen : false}))
                }
                else{
                  if (isProfile){
                    setProfile(false)
                  }
                  else{
                    setDetails((value) => ({ ...value, isOpen: false }));
                  }
                }
              }
            
          }
        
        }


      }
    }

    MainButton.onClick(forward);
    BackButton.onClick(back);
    if (details.isOpen) {
      menu.classList.add("disappearAnimation")
      menu.classList.remove("appearAnimation")
      BackButton.show();
      MainButton.show();
      

      if (gotIt) {
        MainButton.setParams({
          //неизвесетно
          color: "#2f2f2f",
          text_color: "#606060",
        });
      } else {
        if (!responce.isOpen) {
          MainButton.setParams({
            is_active: true,
            color: "#2ea5ff",
            text_color: "#ffffff",
          });
        }
      }
    } else {
      menu.classList.add("appearAnimation")
      menu.classList.remove("disappearAnimation")
      BackButton.hide();
      MainButton.hide();
      MainButton.offClick(forward);
      BackButton.offClick(back);
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
    details.isOpen,
    responce.isOpen,
    gotIt,
    responce.isShablonModalActive,
    responce.shablonMaker,
    isProfile,
    setProfile,
    card.isOpen,
    setCard
  ]);

  useEffect( () => {
      function backFunction(){
          if (card.isOpen){
            setCard((value) => ({...value , isOpen : false}))
          }
          else{
            
            if (isProfileOpen){
              setProfileOpen(false)
            }
            else{
              if (extraDetails.isOpen){
                setExtraDetails((value) => ({...value , isOpen : false}))
              }
              else{
                if (myResponse.isActive){
                  setMyResponse((value) => ({...value , isActive : false}))
                }
              }
            }
          }
      }
      if (myResponse.isActive){
        BackButton.onClick(backFunction)
        BackButton.show()
      }
      else{
        BackButton.offClick(backFunction)
      }
      return () => {
        BackButton.offClick(backFunction)
        
      }
  } , [myResponse.isActive, isProfileOpen, card.isOpen, setMyResponse, setProfileOpen, extraDetails.isOpen, setCard] )



  useEffect( () => {
    function backFunction(){
      if (card.isOpen){
        setCard((value) => ({...value , isOpen : false}))
      }
    }
    if (card.isOpen){
      BackButton.show()
      BackButton.onClick(backFunction)
    }
    else{
      if (!myResponse.isActive){
      }
      BackButton.offClick(backFunction)
    }
  } , [setCard, card.isOpen, myResponse.isActive] )

  useEffect(() => {
    if (details.isOpen) {
      MainButton.setText(buttonText);
    }
  }, [details.isOpen]);

  useEffect(() => {
    if (responce.text.length < 3 && responce.isOpen) {
      MainButton.setParams({
        is_active: false, //неизвесетно
        color: "#2f2f2f",
        text_color: "#606060",
      });
    } else {
      if (responce.isOpen) {
        MainButton.setParams({
          color: "#2ea5ff",
          text_color: "#ffffff",
          is_active: true,
        });
      }
    }
  }, [responce.text, responce.isOpen]);

  const forwardFunction = useCallback(() => {
    async function postResponce(advertismetId, userId) {
      let myFormData = new FormData();
      myFormData.append("information", String(responce.text.trim()));

      myFormData.append("userId", String(userId));
      myFormData.append("advertismentId", String(advertismetId));

      responce.photos.forEach((e, i) => {
        myFormData.append(`photos`, e);
      });
      try {
        let im = await axios.post(
          "https://www.connectbirga.ru/response",
          myFormData,
          {
            params: {
              userId: userId,
              advertisementId: advertismetId,
            },
            headers : {
              "X-API-KEY-AUTH" : process.env.REACT_APP_API_KEY
            }
          }
        );
        const messageOne = translation("📣 Вы получили отклик на задачу «")
        const messageTwo = translation("» от ")
        await axios.get("https://www.connectbirga.ru/user/sendMessage", {
          params: {
            chatId: im.data.user.chatId,
            text:
            messageOne +
              savedTasks[details.id].taskName.bold() +
              messageTwo +
              im.data.user.fl,
              buttonUrl : "https://birga.ywa.su/ResponsePage?advertisemet=" + String(savedTasks[details.id].id) + "&response=" + String(im.data.id),
              languageCode : en ? "en" : "ru"
            
          },
          headers : {
            "X-API-KEY-AUTH" : process.env.REACT_APP_API_KEY
          }
        });
        dispatch(addResponce([savedTasks[details.id].id, im.data]));
      } catch (e) {
        window.Telegram.WebApp.showAlert("ничего не вышло");
        console.warn(e);
      }
    }

    if (responce.isOpen && !responce.shablonMaker) {
      window.Telegram.WebApp.showPopup(
        {
          title: translation("Откликнуться?"),
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
            postResponce(savedTasks[details.id].id, window.Telegram.WebApp.initDataUnsafe.user.id);
            setResponce((value) => ({ ...value, isOpen: false }));
            setDetails((value) => ({ ...value, isOpen: false }));
          }
        }
      );
    }
  }, [responce, savedTasks, details.id, dispatch]);

  window.Telegram.WebApp.disableVerticalSwipes();

  useEffect(() => {
    MainButton.onClick(forwardFunction);
    return () => {
      MainButton.offClick(forwardFunction);
    };
  }, [forwardFunction]);


  const openCard = useCallback(
    (card) => {
      setCard({ isOpen: true, card: card });
    },
    [setCard]
  );

  const changer = useSelector(state => state.menuSlice.changer)

  useEffect( () => {
    setCard((value) => ({...value , isOpen : false}))
    setDetails( (value) => ({...value , isOpen : false}) )
    setExtraDetails( (value) => ({...value , isOpen : false}) )
    setMyResponse( (value) => ({...value,isActive : false}) )
    setProfile(false)
    setProfileOpen(false)
    setResponce(value => ({...value , isOpen : false , isShablon : false ,isShablonModalActive : false , shablonMaker:false }))
  } , [changer] )


  return (
    <div className="saved-wraper">
      <FullPicker
        GreyIntWidth={GreyIntWidth}
        GreyWidth={GreyWidth}
        nowKey={nowKey}
        setNowKey={setNowKey}
        values={values}
        keys={keys}

      />

      <Choicer setCard = {setCard} setResponce = {setMyResponse} setDetails={setDetails} keys={keys} nowKey={nowKey} />

      <CSSTransition
        in={myResponse.isActive}
        timeout={400}
        unmountOnExit
        mountOnEnter
        classNames={"left-right"}
      >
        <SavedResponse setDetails = {setExtraDetails} setProfileOpen = {setProfileOpen} response={myResponse.responce} />
      </CSSTransition>
      
      <CSSTransition
        in={isProfileOpen}
        classNames={"left-right"}
        timeout={400}
        unmountOnExit
        mountOnEnter
      >
            <SavedProfile openFunc={openCard}  responce={myResponse.responce} />
      </CSSTransition>
      

      <CSSTransition
        in={extraDetails.isOpen}
        timeout={400}
        classNames={"left-right"}
        unmountOnExit
        mountOnEnter
      >
        <FirstDetails style = {{
          zIndex : '2002'
        }}  orderInformation={myResponse.responce.advertisement} />
      </CSSTransition>

      <CSSTransition
        in={details.isOpen}
        timeout={400}
        classNames={"left-right"}
        unmountOnExit
        mountOnEnter
      >
        <FirstDetails setProfile={setProfile}  orderInformation={savedTasks[details.id]} />
      </CSSTransition>

      <CSSTransition
        in={responce.isOpen}
        timeout={400}
        style = {{position : "fixed"}}
        classNames={"left-right"}
        unmountOnExit
        mountOnEnter
      >
          <Responce
            
            left="0%"
            responce={responce}
            setResponce={setResponce}
            orderInformation={savedTasks[details.id]}
          />
      </CSSTransition>

      <CSSTransition
        in={card.isOpen}
        classNames={"left-right"}
        timeout={400}
        unmountOnExit
        mountOnEnter
      >
        <CardPage card={card.card} />
      </CSSTransition>


      <CSSTransition
            in={isProfile}
            timeout={400}
            classNames="left-right"
            mountOnEnter
            unmountOnExit
          >
            <AboutReaction setOneCard={setCard} responce={savedTasks[details.id] ? { createNumber : savedTasks[details.id].createNumber  , user : savedTasks[details.id].user} : {}}
            />
          </CSSTransition>


    </div>
  );
};

export default memo(SavedPage);
