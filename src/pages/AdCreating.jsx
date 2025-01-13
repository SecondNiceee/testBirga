import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import AdCreatingOne from "./AdCreatingOne/AdCreatingOne/AdCreatingOne";
import AdCreatingTwo from "./ADCreatingTwo/AdCreatingTwo/AddCreatingTwo";

import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import {
  postMyTask,
} from "../store/information";
import BackButton from "../constants/BackButton";
import MainButton from "../constants/MainButton";
import { useNavigate } from "react-router-dom";
import PostLoader from "../loaders/PostLoader";
import pagesHistory from "../constants/pagesHistory";
import FirstDetails from "../components/First/FirstDetails/FirstDetails";
import translation from "../functions/translate";
import { CSSTransition } from "react-transition-group";


const textButton = translation("Вы уверены, что хотите создать новое задание?")
let create = translation("Создать?")
let spet = 0;
const menu = document.documentElement.querySelector(".FirstMenu")
const Yes = translation("Да")
const No = translation("Нет")
const endText = translation("СОЗДАТЬ ЗАДАНИЕ")
const continueText = translation("ДАЛЕЕ")

const AdCreating = () => {







  useEffect( () => {
    console.log("Это рендер AdCreating")
    
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


  const me = useSelector(state => state.telegramUserInfo)

  const [firstPage , setFirstPage] = useState({
    category: { name: "", value: "" },
    subCategory: "Выбрать",
    taskName: "",
    taskDescription: "",
    photos: [],
    customerName : me.firstName,
    creationTime : new Date(),
    userPhoto : me.photo ? me.photo : "",
    time : {start : new Date() , end : new Date(),

    }
  })

  const [secondPage , setSecondPage] = useState({
    budget: 0,
    tonValue: 0,
    startTime : new Date(0),
    endTime : new Date(0),
    singleTime : new Date(0),
    isPrivate : false,
    time : {start : new Date() , end : new Date()}
  })


  const tonConstant = useSelector((state) => state.ton.value);


  const navigate = useNavigate();

  const dispatch = useDispatch();

  const blurRef = useRef(null);

  const status = useSelector((state) => state.information.postTaskStatus);

  const subCategorysStatus = useSelector(state => state.categorys.subCategoryStatus)

  const categorysStatus = useSelector(state => state.categorys.categoryStatus)

  const categorys = useSelector((state) => state.categorys.category);

  const subCategorys = useSelector((state) => state.categorys.subCategory);



  useEffect( () => {
    pagesHistory.push("/AdCreating")
    return () => {
      window.scrollTo(0 ,0)
    }
  } , [] )

  useEffect(() => {
    if (categorys && subCategorys) {
      setFirstPage(
        (value) => ({...value,
        category: categorys.find((e) => e.category === "Другое"), 
        subCategory: subCategorys.find((e) => e.subCategory === "Другое"),
      })
      );
    }
  }, [categorys, subCategorys]);

  console.log("Хай")

  const [error, setError] = useState({
    name: false,
    ton: false,
    singleError: false,
    startError: false,
    endError: false,
  });

  useEffect(() => {
    let startError = false;
    let endError = false;
    let singleError = false;
    if (spet === 0) {
      if (error.name && firstPage.taskName.length > 3) {
        setError({ ...error, name: false });
      }
    }
    if (spet === 1) {
      if (error.ton && secondPage.tonValue >= 0.1) {
        setError({ ...error, ton: false });
      }
      if (document.getElementById("dateSwapper").style.transform) {
        if (secondPage.startTime.getTime() ===  new Date(0).getTime() ) {
          startError = true;
        }
        if (secondPage.endTime.getTime() === new Date(0).getTime()) {
          endError = true;
        }
        if (secondPage.endTime <= secondPage.startTime) {
          endError = true;
          startError = true;
        }
      } else {
        if (secondPage.singleTime.getTime() === new Date(0).getTime()) {
          singleError = true;
        }
      }
      if (
        (error.singleError === true &&
          !document.getElementById("dateSwapper").style.transform) ||
        ((error.startError === true || error.endError === true) &&                       
          document.getElementById("dateSwapper").style.transform)
      ) {
        if (
          error.singleError !== singleError ||
          error.startError !== startError ||
          error.endError !== endError
        ) {
          setError({
            ...error,
            singleError: singleError,
            startError: startError,
            endError: endError,
          });
        }
      }
    }
  }, [
    error,
    firstPage.taskName,
    firstPage.tonValue,
    secondPage.startTime,
    secondPage.endTime,
    secondPage.singleTime,
    secondPage.tonValue
  ]);


  
  const [isCategoryChoiceOpen, setCatagoryChoiceOpen] = useState(false);

  const [isSubcategoryChoiceOpen, setSubcategoryChoiceOpen] = useState(false);


  function finish() {
    let secondPageCopy = {...secondPage}
    if (document.getElementById("dateSwapper").style.transform) {
      secondPageCopy.time = {start : secondPageCopy.startTime , end : secondPageCopy.endTime}
      // setTaskInformation({...taskInformation , time : {start : taskInformation.startTime , end : taskInformation.endTime} })

    } else {
      secondPageCopy.time = {start : secondPageCopy.singleTime , end : ''}
    }
    let localTaskInformation = {...secondPageCopy , ...firstPage}
    window.Telegram.WebApp.HapticFeedback.notificationOccurred("success")
    post(localTaskInformation);
    // dispatch(addMyAds(taskInformationCopy))

    
    
    
    // MainButton.hide();
    spet = 0;
  }
  async function post(el) {
    let myFormData = new FormData();
    // myFormData.append("userId", window.Telegram.WebApp.initDataUnsafe.user.id );
     myFormData.append("userId", String(window.Telegram.WebApp.initDataUnsafe.user.id)  );
    myFormData.append("title", String(el.taskName.trim()));
    myFormData.append("description", String(el.taskDescription.trim()));
    myFormData.append("deadline", "1");
    myFormData.append("views", "0");
    myFormData.append("category", String(el.category.id));
    myFormData.append("subCategory", String(el.subCategory.id));
    myFormData.append("price", String(el.tonValue));
    if (document.getElementById("dateSwapper").style.transform) {
      myFormData.append("startTime", el.startTime);
      myFormData.append("endTime", el.endTime);
    } else {
      myFormData.append("endTime", el.singleTime);
      myFormData.append("startTime", "");
    }
    // myFormData.append("photos", el.photos);
    

    if (el.photos.length !== 0) {
      for (let file of el.photos) {
        myFormData.append("photos", file);
      }
    }
    window.Telegram.WebApp.HapticFeedback.notificationOccurred("success")
    await dispatch(postMyTask([myFormData, el.photos]))
    navigate("/MyAds")
    
    // for (let i = 0 ; i < 1; i++){
    //   try{
    //     console.log("Создание задания")
    //     await axios.post("https://www.connectbirga.ru/advertisement", myFormData, {
    //       headers: {
    //         "Content-Type" :'multipart/form-data',
    //         "Access-Control-Allow-Origin": "*"
    //       },
    //     });
    //   }
    //   catch(e){
    //     window.Telegram.WebApp.showAlert("Задание не было создано. Попробуйте позже")
    //     console.log(e)
    //   }
    // }

    // dispatch(changeMyAds([]))
    // dispatch(fetchMyOrders(1))


    
    //   let state = await axios.post(
    //   "https://www.connectbirga.ru/advertisement",
    //   myFormData,
    //   {
    //     headers: {
    //       "Content-Type": "multipart/form-data",
    //       "Access-Control-Allow-Origin": "*"
    //     },
    //   }
    // );
  }

  // useEffect( () => {
  //   return () => {
  //     if (pagesHistory[pagesHistory.length-1] === "/" || pagesHistory[pagesHistory.length-1] === "/MyAds" ){
  //       window.scrollTo({
  //         top: 40,
  //         behavior: "auto",
  //       });
  //       document.documentElement.style.overflowY = "hidden"
  //     }
  //     else{
  //       document.documentElement.style.overflowY = "unset"
  //     }
  //     pagesHistory.push('/AdCreating')
  //   }
  // } , [] )
  useEffect( () => {
      if (spet === 2){
        if (mainRef.current){
          mainRef.current.style.height = "100vh"
          mainRef.current.style.paddingBottom = "76px"
        }
      }
      else{
        if (mainRef.current){
          if (spet === 1){
            mainRef.current.style.height = "100vh"
            mainRef.current.style.paddingBottom = "0px"
          }
          else{
            mainRef.current.style.paddingBottom = "76px"
            mainRef.current.style.height = "100%"
          }
        }
      }
  } , []  )
  const mainRef = useRef(null)
  function checking() {
    let taskName = false;
    let ton = false;
    let singleError = false;
    let startError = false;
    let endError = false;
    switch (spet) {
      case 0: {
        if (firstPage.taskName.length < 3) {
          taskName = true;
        }
        setError({ ...error, name: taskName });
        return Object.values({ ...error, name: taskName }).every(
          (value) => value === false
        );
      }
      case 1: {
        if (secondPage.tonValue < 0.1) {
          ton = true;
        }
        if (document.getElementById("dateSwapper").style.transform) {
          if (secondPage.startTime.getTime() === new Date(0).getTime()) {
            startError = true;
          }
          if (secondPage.endTime.getTime() === new Date(0).getTime()) {
            endError = true;
          }
          if (secondPage.endTime <= secondPage.startTime) {
            endError = true;
            startError = true;
          }
        } else {
          if (secondPage.singleTime.getTime() === new Date(0).getTime()) {
            singleError = true;
          }
        }

        setError({
          ...error,
          ton: ton,
          singleError: singleError,
          startError: startError,
          endError: endError,
        });
        return Object.values({
          ...error,
          ton: ton,
          singleError: singleError,
          startError: startError,
          endError: endError,
        }).every((value) => value === false);
      }
      case 2: {
        return true;
      }
      default: {
        window.Telegram.WebApp.showAlert('Error (что - то не так пошло..')
        return false
      }
    }
  }

  useEffect( () => {
      if (firstPage.taskDescription.length > 500){
        MainButton.setParams({
          is_active : false, //неизвесетно
          color : '#2f2f2f',
          text_color : '#606060',
        })
      }
      else{
        MainButton.setParams({
          color : '#2ea5ff',
          text_color : '#ffffff',
          is_active : true
        })
      }
  } , [firstPage.taskDescription, navigate] )


  useEffect( () => {
    setTimeout( () => {
      MainButton.setText(translation("ДАЛЕЕ"))
  } , 2000 ) 
  } , []  )

  useEffect( () => {
    var inputs = document.getElementsByTagName('input');

    // Проходим по каждому инпуту и удаляем фокус
    for (var i = 0; i < inputs.length; i++) {
      inputs[i].blur();
    }
  } , [] )
  MainButton.setText(translation("ДАЛЕЕ"))

  // eslint-disable-next-line
  const goForward = () => {
    if (blurRef.current) {
      blurRef.current.focus();
    }
    if (checking()) {
      mainRef.current.classList.remove('oneBack')
      mainRef.current.classList.remove('twoBack')
      if (spet === 0){
          mainRef.current.classList.add('stepOne')
      }
      if (spet === 1){
        mainRef.current.classList.add('stepTwo')
      }

      spet += 1;
      
        // spet += 1;
        // animte()
        if (spet === 2 || spet === 3) {
          MainButton.setText(endText);
        } else {
          MainButton.setText(continueText);
        }
        if (spet === 3){

          window.Telegram.WebApp.showPopup({
            title: create,
            message: textButton,
            buttons: [
              { id: "save", type: "default", text: Yes },
              { id: "delete", type: "destructive", text: No },
            ],
          } , (buttonId) => {
      
            if (buttonId === "delete" || buttonId === null) {
              spet -= 1
            }
            if (buttonId === "save") {
              finish();
            }
            
          } )


        }
      
    }
    else{
      window.Telegram.WebApp.HapticFeedback.notificationOccurred("error")
    }
  } 

  window.Telegram.WebApp.disableVerticalSwipes();

  window.Telegram.WebApp.disableVerticalSwipes();



  const goBack = useCallback(() => {
    setError({    name: false,
      ton: false,
      singleError: false,
      startError: false,
      endError: false})
    if (isCategoryChoiceOpen || isSubcategoryChoiceOpen){
      if (isCategoryChoiceOpen){

        setCatagoryChoiceOpen(false)
      }
      else{

        setSubcategoryChoiceOpen(false)
      }
    }
    else{

      if (spet === 0) {
        // clearInput()
        // if (!isCategoryChoiceOpen && !isSubcategoryChoiceOpen){
        //   navigate(pagesHistory[pagesHistory.length-1]);
        // }
        navigate(-1)
      } else {
        
        if (spet === 1){

            mainRef.current.classList.remove('stepOne')
            mainRef.current.classList.remove('stepTwo')
            mainRef.current.classList.add('oneBack')
          
        }
        if (spet === 2){

            mainRef.current.classList.remove('stepTwo')
            mainRef.current.classList.remove('stepOne')
            mainRef.current.classList.add('twoBack')
          
        }

        spet -= 1;
        MainButton.setText(continueText)
        // backAnimte();
  
      }
    }
  } , [isCategoryChoiceOpen , isSubcategoryChoiceOpen,setCatagoryChoiceOpen,setSubcategoryChoiceOpen, navigate ])

  const GreyIntWidth = useMemo(() => {
    return (document.documentElement.clientWidth - 36) / 2;
  }, []);
  const GreyWidth = useMemo(() => {
    return GreyIntWidth.toString() + "px";
  }, [GreyIntWidth]);


  const [whichOne, setWhichOne] = useState("startOnly");

  window.Telegram.WebApp.disableVerticalSwipes();

  useEffect(() => {
    MainButton.onClick(goForward);
    BackButton.onClick(goBack);
  
    return () => {
      BackButton.offClick(goBack);
      MainButton.offClick(goForward);
    };
    // eslint-disable-next-line
  } , [goBack,goForward ]);

  useEffect(() => {
    MainButton.show();
    BackButton.show();
    MainButton.setText(continueText);
    return () => {
        MainButton.hide();
      
    };
  }, []);



  
  const twoPages = useMemo( () => {
    return (
      {
        ton: error.ton,
        singleError: error.singleError,
        startError: error.startError,
        endError: error.endError,
      }
    )
  } , [error] )


  useEffect( () => {
    return () => {
      MainButton.setParams({
        color : '#2ea5ff',
        text_color : '#ffffff',
        is_active : true
      })
    }
  } , [] )

  return (
    <motion.div
      ref={mainRef}
      className="AdCreating__container"
    >
      {status === "pending" || categorysStatus !== "OK" || subCategorysStatus !== "OK" ? (
        <>
          <PostLoader />
        </>
      ) : (
        <>
          <AdCreatingOne
            className={"adCreatingOne"}
            errorName={error.name}
            setTaskInformation={setFirstPage}
            taskInformation={firstPage}
            MyInformation={false}
            mistakes={{ timeError: false, taskName: false }}
            categorys={categorys}
            subCategorys={subCategorys}
            isCategoryChoiceOpen={isCategoryChoiceOpen}
            setCatagoryChoiceOpen={setCatagoryChoiceOpen}
            isSubcategoryChoiceOpen={isSubcategoryChoiceOpen}
            setSubcategoryChoiceOpen={setSubcategoryChoiceOpen}
          />
          <AdCreatingTwo
            whichOne={whichOne}
            setWhichOne={setWhichOne}
            errors={twoPages}
            GreyIntWidth={GreyIntWidth}
            GreyWidth={GreyWidth}
            setTaskInformation={setSecondPage}
            taskInformation={secondPage}
            tonConstant={tonConstant}
          />
          <div className="adCreatingThree-wrapper">
            <CSSTransition timeout={0}
            in = {spet !== 0}
            unmountOnExit mountOnEnter>
              <FirstDetails   style = {{position : "static" ,  minHeight : "unset" , "height" : "unset", overflowY : "unset" ,minWidth : "100vw", transform : "translateX(0%)"}} end = {true} orderInformation={{...firstPage , ...secondPage , category : firstPage.category.id , whichOne : whichOne } } />
            </CSSTransition>
            {/* <AdCreatingThree taskInformation={secondPage} /> */}
          </div>
        </>
      )}


    </motion.div>
  );
};

export default AdCreating;
