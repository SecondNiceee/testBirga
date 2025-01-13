import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AdCreateFunc from "../../components/UI/AdCreateFunc/AdCreateFunc";
import GreyText from "../../components/UI/GreyText/GreyText";
import ShablonsWrap from "./components/ShablonsWrap/ShablonsWrap";
import { CSSTransition } from "react-transition-group";
import Shablon from "../Shablon/Shablon";
import { deleteShablon, postShablon, putShablon } from "../../store/shablon";
import { useNavigate } from "react-router-dom";
import BackButton from "../../constants/BackButton";
import pagesHistory from "../../constants/pagesHistory";
import MyLoader from "../../components/UI/MyLoader/MyLoader";
import MyAnimation from "../MyAds/components/MyAnimation";
import translation from "../../functions/translate";
import sortFiles from "../../functions/sortFiles";
import { compareTwoObject } from "../MyAds/components/compareTwoObject";
const menu = document.documentElement.querySelector(".FirstMenu");

const Yes = translation("Да");
const No = translation("Нет");
const AllShablons = () => {
  window.Telegram.WebApp.disableVerticalSwipes();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [putShablonState , setPutShablon] = useState({})

  const [shablon, setShablon] = useState({
      id: 0,
      name: "",
      text: "",
      photos: [],
      photosNames: [],
  });

  const [shablonShow , setShablonShow] = useState({
    isActive : false,
    put : false
  })

  useEffect(() => {
    return () => {
      pagesHistory.push("/AllShablons");
    };
  }, []);

  const shablonsArr = useSelector((state) => state.shablon.shablonsArr);

  console.log('====================================');
  console.log(shablonsArr);
  console.log('====================================');
  const [mistakes, setMistakes] = useState( {
    name : false,
    text : false
  } )

  useEffect( () => {
    const localMistakes = {    name : true,
      text : true}
    if (Object.values(mistakes).includes(true)){
      if (shablon.name.length >= 3){
        localMistakes.name = false
      }
      if (shablon.text.length >= 5){
        localMistakes.text = false
      }
      if (JSON.stringify(localMistakes) !== JSON.stringify(mistakes)){
        setMistakes({...localMistakes})
      }
    }
  } , [shablon , mistakes, setMistakes] )



  function clickOnFunc() {
    setShablon({

        id: 0,
        name: "",
        text: "",
        photos: [],
        photosNames: [],
    });
    setShablonShow({
      isActive : true, 
      put : false
    })
  }

  const putFunction = useCallback(
    (e) => {
      setShablon(e)
      setShablonShow(
        {isActive : true,
          put : true
        }
      )
      setPutShablon(e)
    },
    [setShablon, setPutShablon]
  );

  const deleteFunction = useCallback(
    (e) => {
      window.Telegram.WebApp.showPopup(
        {
          title: translation("Удалить?"),
          message: translation("Вы хотите удалить этот шаблон?"),
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
            dispatch(deleteShablon(e.id));
          }
        }
      );
    },
    [dispatch]
  );


  

  const save = useCallback( (put) => {
    const myFormData = new FormData()
    myFormData.append("name" , String(shablon.name.trim()) )
    myFormData.append("text" , String(shablon.text.trim()))
    if (put){
      let filesArr = sortFiles(shablon.photosNames, shablon.photos)
      filesArr.addedArr.forEach((e, i) => {
        myFormData.append(`addFiles` , e)
      })
      filesArr.removedArr.forEach((e, i) => {
        myFormData.append(`deleteFiles[${i}]` , e)
      })
      dispatch(putShablon([myFormData , shablon.id, shablon]))
    }
    else{
      shablon.photos.forEach((e,i) => {
        myFormData.append("photos" , e)
      })
      // myFormData.append("photos" , shablon.photos)
      dispatch(postShablon([myFormData, shablon]))
    }

    setShablonShow( (value) => ({...value, isActive : false}) )
    // myFormData.append("photos" , shablon.photos)

  } , [dispatch, shablon, setShablonShow] )
  const check = useCallback( () => {
    const localMistakes = {name : false, text : false}
    if (shablon.name.trim().length < 3){
      localMistakes.name = true
    }
    if (shablon.text.trim().length < 5){
      localMistakes.name = true
    }
    if (JSON.stringify(localMistakes) !== JSON.stringify(mistakes)){
      setMistakes(localMistakes)
    }
    return Object.values(localMistakes).every(value => !value )
  } , [mistakes, shablon] )

  const exitTemplate = useCallback( (put) => {
    if (!compareTwoObject(shablon,putShablonState )){

      window.Telegram.WebApp.showPopup(
        {
          title: put ? translation("Изменить?") : translation("Сохранить?"),
          message: put ? translation("Сохранить изменения перед выходом?") : translation("Сохранить шаблон перед выходом?"),
          buttons: [
            { id: "save", type: "default", text: translation("Да") },
            { id: "delete", type: "destructive", text: translation("Нет") },
          ],
        },
        (buttonId) => {
          if (buttonId === "save") {
            if (check()){
                save(put)
                setShablonShow((value) => ({...value , isActive : false}))
                
            }
            else{
              window.Telegram.WebApp.HapticFeedback.notificationOccurred("error")
            }
          }
          if (buttonId === "delete" || buttonId === null) {
            setShablonShow( (value) => ({...value , isActive : false}) )
          }
        }
      );
    }
    else{
      setShablonShow( (value) => ({...value , isActive : false}) )
    }
  } , [check, save, shablon, putShablonState, setShablonShow] )



  useEffect(() => {
    function back() {
      if (shablonShow.isActive) {
        exitTemplate(shablonShow.put)
        // setShablon((value) => ({ ...value, isActive: false }));
      } else {
        navigate(-1);
      }
    }
    BackButton.onClick(back);
    return () => {
      BackButton.offClick(back);
    };
  }, [shablonShow, navigate, exitTemplate]);
  const postStatus = useSelector((state) => state.shablon.postStatus);
  const putStatus = useSelector((state) => state.shablon.putStatus);

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

  const shablonStyle = useMemo( () => {
    if (shablonShow.isActive){
      return {
        transform : "translate3d(-100vw , 0px, 0px)"
      }
    }
    return {
      transform : "translate3d(0px , 0px, 0px)"
    }
  } , [shablonShow.isActive] ) 

  const activeCallback = useCallback( (val) => {
    setShablonShow((value) => ({...value, isActive : val}))
  } , [setShablonShow] )

  return (
    <div style={shablonStyle}  className="shablon-container">
      <div className="all-shablon-wrapper">
        {postStatus === "pending" || putStatus === "pending" ? (
          <MyLoader style={{ transform: "translateX(-8px)" }} />
        ) : (
          <>
            {shablonsArr.length === 6 ? (
              <></>
            ) : (
              <AdCreateFunc
                className="all-shablons-func"
                text={"Создать новый шаблон"}
                func={clickOnFunc}
              />
            )}

            {shablonsArr.length > 0 ? (
              <GreyText className={"shablon-wrapper-grey"}>
                АКТУАЛЬНЫЕ ШАБЛОНЫ
              </GreyText>
            ) : (
              <></>
            )}

            {shablonsArr.length === 0 ? (
              <MyAnimation
                style={{ height: "80vh" }}
                text="У вас нет ни одного шаблона"
              />
            ) : (
              <ShablonsWrap
                deleteFunction={deleteFunction}
                className={"shablons-wrap"}
                shablonsArr={shablonsArr}
                putFunction={putFunction}
              />
            )}
          </>
        )}
      </div>
        <CSSTransition
          in={shablonShow.isActive}
          // classNames={"left-right"}
          mountOnEnter
          unmountOnExit
          timeout={400}
        >
          <Shablon
            mistakes = {mistakes}
            shablon={shablon}
            setActive={activeCallback}
            setShablon={setShablon}
            put={shablonShow.put}
          />
        </CSSTransition>
    </div>
  );
};

export default AllShablons;
