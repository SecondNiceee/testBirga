import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useDispatch, useSelector } from "react-redux";

import { CSSTransition } from "react-transition-group";

import { useNavigate } from "react-router-dom";
import BackButton from "../../constants/BackButton";
import userPhoto from "../../images/userPhoto/user.png";

import SmallTextarea from "../../components/UI/SmallTextarea/SmallTextarea";
import Compact from "../../components/UI/Compact/Compact";
import SmallInput from "../../components/UI/SmallInput/SmallInput";
import AdCreateFunc from "../../components/UI/AdCreateFunc/AdCreateFunc";
import MainButton from "../../constants/MainButton";
import Cards from "../Cards/Cards";
import Options from "./components/Options/Options";
import ChangeCards from "../ChangeCard/ChangeCard";
import {
  changeProfile,
  deleteCard,
  deleteServerCard,
  putUserInfo,
} from "../../store/telegramUserInfo";
import pagesHistory from "../../constants/pagesHistory";
import MyLoader from "../../components/UI/MyLoader/MyLoader";
import CardsArray from "./components/CardsArray/CardsArray";
import Text from "../../components/Text/Text";
import translation from "../../functions/translate";
import PayBlock from "./components/PayBlock/PayBlock";
import en from "../../constants/language";

const lett = translation("лет");
const goda = translation("года");
const god = translation("год");
let aboutULocal = null;

let userInfoLocal = null;


const Yes = translation("Да");
const No = translation("Нет");
const menu = document.documentElement.querySelector(".FirstMenu");
const Profile = () => {
  const mainRef = useRef(null);

  window.Telegram.WebApp.disableVerticalSwipes();

  const [index, setIndex] = useState(1);

  useEffect(() => {
    MainButton.hide()
    return () => {
      pagesHistory.push("/Profile");
    };
  }, []);

  const dispatch = useDispatch();

  const userInfo = useSelector((state) => state.telegramUserInfo);

  const [errors, setErrors] = useState({
    stageError: false,
  });

  const navigate = useNavigate();

  const [cardsActive, setCardsActive] = useState(false);

  const [changeActive, setChangeActive] = useState(false);

  const changer = useSelector((state) => state.menuSlice.changer);
  useEffect(() => {
    setCardsActive(false);
    setChangeActive(false);
  }, [changer]);

  const [aboutU, setAboutU] = useState({
    ...userInfo.profile,
    stage: userInfo.profile.stage,
    userId: userInfo.id,
  });

  const cards = useSelector((state) => state.telegramUserInfo.profile.cards);

  aboutULocal = aboutU;
  userInfoLocal = userInfo;

  useEffect(() => {
    let stage = String(userInfoLocal.profile.stage);
    let numb = String(stage).slice(stage.length - 1, stage.length);

    const numberInput = document.getElementById("numberInput");

    if (numberInput) {
      if (en) {
        if (Number(stage) === 1) {
          if (!numberInput.value.includes("year")) {
            numberInput.value += ` year`;
          }
        } else {
          if (!numberInput.value.includes("years")) {
            numberInput.value += ` years`;
          }
        }
      } else {
        if (Number(stage) > 10 && Number(stage) < 20) {
          if (!numberInput.value.includes(lett)) {
            numberInput.value += ` ${lett}`;
          }
        } else {
          if (numb > 1 && numb < 5) {
            if (!numberInput.value.includes(`${goda}`)) {
              numberInput.value += ` ${goda}`;
            }
          } else {
            if (numb === 1) {
              if (!numberInput.value.includes(`${god}`)) {
                numberInput.value += ` ${god}`;
              }
            } else {
              if (!numberInput.value.includes(`${lett}`)) {
                numberInput.value += ` ${lett}`;
              }
            }
          }
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const save = useCallback(() => {
    dispatch(changeProfile({...aboutULocal , about : aboutULocal.about.trim()}));
    dispatch(
      putUserInfo([
        { stage: Number(aboutULocal.stage), about: aboutULocal.about.trim() },  
      ])
    );
    const input = document.querySelectorAll("input");
    const textarea = document.querySelectorAll("textarea");
    for (let smallInput of input) {
      smallInput.blur();
    }
    for (let smallTextarea of textarea) {
      smallTextarea.blur();
    }
  }, [dispatch]);

  useEffect(() => {
    function compare2Objects(x, y) {
      if (x.about === y.about && x.stage === y.stage) {
        return true;
      } else {
        return false;
      }
      // if (JSON.stringify(x) !== JSON.stringify(y)){
      //   return false
      // }
      // if (x.cards.length !== y.cards.length){
      //   return false
      // }
      // else{
      //   for (let xCard of x.cards){
      //     for (let yCard of y.cards){
      //       if (JSON.stringify(xCard) !== JSON.stringify(yCard)){
      //         return false
      //       }
      //     }
      //   }
      // }
      // return true;
    }
    
    
    if (!cardsActive && !changeActive) {
      if (compare2Objects(userInfo.profile, {...aboutU, about : aboutU.about.trim()}) === false && userInfo.state === "yes" && userInfo.profile.about !== null && aboutU.about !== null) {
        console.log('====================================');
        console.log(userInfo.profile);
        console.log(aboutU);
        console.log('====================================');
        MainButton.enable();
        MainButton.setParams({
          text: translation("Сохранить"),
          is_visible: true,
        });
        MainButton.onClick(save);
        menu.classList.add("disappearAnimation");
        menu.classList.remove("appearAnimation");

        if (!MainButton.isVisible) {
          MainButton.show();
        }

        if (aboutU.stage >= 40) {
          MainButton.disable();
          MainButton.setParams({
            color: "#2f2f2f",
            text_color: "#606060",
          });
          setErrors((value) => ({ ...value, stageError: true }));
        } else {
          if (errors.stageError) {
            MainButton.enable();
            setErrors((value) => ({ ...value, stageError: false }));
          }
          MainButton.setParams({
            color: "#2ea5ff",
            text_color: "#ffffff",
          });
        }
      } else {
        menu.classList.add("appearAnimation");
        menu.classList.remove("disappearAnimation");
        MainButton.hide();
        MainButton.offClick(save);
      }
    } else {
      MainButton.offClick(save);
      // MainButton.hide()
      // MainButton.setParams({
      //   color : '#2ea5ff',
      //   text_color : '#ffffff'
      // })
    }
  }, [
    userInfo.state,
    aboutU,
    changeActive,
    cardsActive,
    save,
    errors.stageError,
    userInfo.profile,
  ]);

  useEffect(() => {
    BackButton.show();
    function goBack() {
      navigate(-1);
    }
    if (cardsActive || changeActive) {
      BackButton.offClick(goBack);
    } else {
      BackButton.onClick(goBack);
    }
    return () => {
      BackButton.offClick(goBack);
    };
  });

  const onBlurFunc = useCallback((e) => {
    let numb = Number(
      e.target.value.slice(e.target.value.length - 1, e.target.value.length)
    );

    if (e.target.value === "") {
      if (en) {
        setAboutU((value) => ({ ...value, stage: `0 years` }));
      } else {
        setAboutU((value) => ({ ...value, stage: `0 ${lett}` }));
      }
    }

    if (en) {
      if (Number(e.target.value) === 1) {
        e.target.value += " year";
      } else {
        e.target.value += " years";
      }
    } else {
      if (Number(e.target.value) > 10 && Number(e.target.value) < 20) {
        e.target.value += ` ${lett}`;
      } else {
        if (numb > 1 && numb < 5) {
          e.target.value += ` ${goda}`;
        } else {
          if (numb === 1) {
            e.target.value += ` ${god}`;
          } else {
            e.target.value += ` ${lett}`;
          }
        }
      }
    }
  }, []);

  const onFocusFunc = useCallback((e) => {
    e.target.value = String(aboutULocal.stage).split(" ")[0];
  }, []);

  const setValueFunc = useCallback((e) => {
    if (!isNaN(e)) {
      if (e.slice(0, 1) !== "0") {
        setAboutU({ ...aboutULocal, stage: Number(e) });
      } else {
        if (e !== "00") {
          setAboutU({ ...aboutULocal, stage: Number(e.slice(1, 2)) });
        } else {
          setAboutU({ ...aboutULocal, stage: 0 });
        }
      }
    }
  }, []);

  function deleteFunction(index, e) {
    window.Telegram.WebApp.showPopup(
      {
        title: translation("Удалить?"),
        message: translation("Вы хотите удалить этот кейс?"),
        buttons: [
          { id: "save", type: "default", text: Yes },
          { id: "delete", type: "destructive", text: No },
        ],
      },
      (buttonId) => {
        if (buttonId === "delete" || buttonId === null) {
        }
        if (buttonId === "save") {
          dispatch(deleteServerCard(e.id));
          dispatch(deleteCard(index));
        }
      }
    );
  }

  const postStatus = useSelector((state) => state.telegramUserInfo.postState);
  const putStatus = useSelector((state) => state.telegramUserInfo.putState);

  useEffect(() => {
    const input = document.querySelectorAll("input");
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



  const profileStyle = useMemo(() => {
    if (cardsActive || changeActive) {
      return {
        transform: "translate3d(-100vw , 0 , 0)",
      };
    }
    return {
      transform: "translate3d(0, 0, 0)",
    };
  }, [cardsActive, changeActive]);

  useEffect( () => {
    MainButton.hide()
    return () => {
      if (pagesHistory[pagesHistory.length - 1] === "/AdCreating"){
        MainButton.hide()
      }
    }
  } , [] )

  return (
    <>
      {userInfo.state !== "yes" ? (
        <MyLoader />
      ) : (
        <div
        
          ref={mainRef}
          className="profile__wrapper"
          style={profileStyle}
        >
          <div className="profile__container">
            <img
              style={{ objectFit: "cover" }}
              src={userInfo.photo.length > 0 ? userInfo.photo.split('https://').length === 2 ? userInfo.photo : `${process.env.REACT_APP_HOST}/${userInfo.id}/${userInfo.photo}` : userPhoto}
              className="profile__icon icon"
              alt=""
            />

            <Text className="urName" id="Name">
              {userInfo.firstName.length > 22
                ? userInfo.firstName.slice(0, 22) + ".."
                : userInfo.firstName}
            </Text>

            <PayBlock className="pay-block" />

            <Options />

            <Compact title={"О себе"} className={"compact-block"}>
              <SmallTextarea
                value={aboutULocal.about}
                setValue={(e) => {
                  setAboutU({ ...aboutULocal, about: e });
                }}
              />
            </Compact>

            <Compact title={"Стаж работы"} className={"compact-block"}>
              <SmallInput
                mistakeText={"Стаж должен быть меньше 40 лет!"}
                mistake={errors.stageError}
                id="numberInput"
                maxLength={2}
                onBlur={onBlurFunc}
                onFocus={onFocusFunc}
                inputMode="numeric"
                // type = "number"
                value={aboutULocal.stage === null ? "0" : aboutULocal.stage}
                setValue={setValueFunc}
              />
            </Compact>

            <Compact title={"Примеры работ"} className={"compact-block"}>
              <AdCreateFunc
                text={"Добавить кейс"}
                style={
                  cards.length >= 6 ? { display: "none" } : { marginTop: "0px" }
                }
                func={(e) => {
                  setCardsActive(true);
                }}
              />
            </Compact>

            {postStatus === "pending" || putStatus === "pending" ? (
              <MyLoader style={{ transform: "translateX(-8px)" }} />
            ) : (
              <CardsArray
                deleteFunction={deleteFunction}
                cards={cards}
                setChangeActive={setChangeActive}
                setIndex={setIndex}
              />
            )}
          </div>

          <CSSTransition
            mountOnEnter
            unmountOnExit
            in={cardsActive}
            timeout={400}
          >
            <Cards
              save={save}
              aboutU={aboutU}
              setAboutU={setAboutU}
              setCardsOpen={setCardsActive}
            />
          </CSSTransition>

          <CSSTransition
            mountOnEnter
            unmountOnExit
            in={changeActive}
            timeout={400}
          >
            <ChangeCards
              save={save}
              index={index}
              card={cards[index]}
              aboutU={aboutU}
              setAboutU={setAboutU}
              setCardsOpen={setChangeActive}
            />
          </CSSTransition>



          
          {/* <CSSTransition
            mountOnEnter
            unmountOnExit
            in={true}
            timeout={400}
          >
            <PaymentPageOne />
          </CSSTransition> */}


        </div>
      )}
    </>
  );
};

export default Profile;
