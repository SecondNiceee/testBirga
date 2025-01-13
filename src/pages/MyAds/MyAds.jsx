import React, { useCallback, useEffect, useMemo, useState } from "react";

// import myImage from '../../images/desccription.png'
import { useDispatch, useSelector } from "react-redux";
import "./MyAds.css";

import LastAds from "./components/LastAds";
import MyAdOne from "./components/MyAdOne";
import AboutReaction from "./components/AboutReaction";
import AboutOne from "./components/AboutOne";
import { CSSTransition } from "react-transition-group";
import sortFiles from "../../functions/sortFiles";
import AdCreatingOne from "../AdCreatingOne/AdCreatingOne/AdCreatingOne";
import { useButton } from "../../hooks/MyAds/useButton";
import { useSave } from "../../hooks/MyAds/useSave";
import ShowMyResponse from "../../components/MyAds/ShowMyResponse/ShowMyResponse";
import FirstDetails from "../../components/First/FirstDetails/FirstDetails";
import { deleteResponse } from "../../store/responses";
import MyLastAds from "./components/MyLastAds";
import CardPage from "../CardPage/CardPage";
import makeNewFile from "../../functions/newMakeFile";
import axios from "axios";
import MyLoader from "../../components/UI/MyLoader/MyLoader";
import translation from "../../functions/translate";
import AdCreatingThree from "../AdCreatingThree/AdCreatingThree";
import HappyHold from "../HappyHold/HappyHold";
import Wallet from "../Wallet";
import usePut from "../../hooks/MyAds/usePut";
import useWriteFucntion from "../../hooks/MyAds/writeFunction";
import useBack from "./components/useBack";
import pagesHistory from "../../constants/pagesHistory";

// const LastAds = lazy( () => import ("./components/LastAds") )
// const MyAdOne = lazy( () => import ("./components/MyAdOne") )
// const AboutOne = lazy( () => import ("./components/AboutOne") )
// const AboutReaction = lazy( () => import ("./components/AboutReaction") )


let detailsVar;

const Yes = translation("Да")
const No = translation("Нет")

const sureText = translation("Вы уверены, что хотите удалить этот отклик?")


const menu = document.documentElement.querySelector(".FirstMenu")


// const advertisementId = window.Telegram.WebApp.initDataUnsafe.start_param.split("m")[0]
// const responseId = window.Telegram.WebApp.initDataUnsafe.start_param.split("m")[1]

let url = new URL(window.location.href);
let advertisementId = url.searchParams.get("advertisement")
let responseId = url.searchParams.get("response")


const defaultDate = new Date(0)




const MyAds = ({isPage = false}) => {
  const [isPageValueOne , setPageValueOne] = useState(true)
  const [isPageValueTwo , setPageValueTwo] = useState(true)
  const [buyPage, setBuyPage] = useState(false)
  const [walletH, setWalletH] = useState(false)
  console.log('====================================');
  console.log(buyPage);
  console.log('====================================');
  const [valueOne , setValueOne] = useState("all")

  const [valueTwo , setValueTwo] = useState("all")



  const responsesArr = useSelector((state) => state.responses.responses);

  const sortedResponses = useMemo( () => {
    let copy = [...responsesArr]
      return copy.sort((a,b) => {
        let order = {"inProcess" : 1 , "watched" : 2 , "" : 3, "completed" : 4}
        return order[a.isWatched] - order[b.isWatched]
      })
  } , [responsesArr] )

  const filteredResponses = useMemo( () => {
    switch (valueOne){
      case "all":
        return sortedResponses
      case "inProcess":
        return sortedResponses.filter(e => e.isWatched === "inProcess")
      case "watched": 
        return sortedResponses.filter(e => e.isWatched === "watched")
      case "unWatched":
        return sortedResponses.filter(e => e.isWatched === "")
      case "completed":
        return sortedResponses.filter(e => e.isWatched === "completed")
      default : 
        window.Telegram.WebApp.showAlert("Что - то пошло не так MyAds")
    }
  } , [sortedResponses , valueOne]  )




  const dispatch = useDispatch()

  const [happyHold , setHappyHold] = useState(false)

  const [details, setDetails] = useState({
      id: "",
      taskName: "",
      taskDescription: "",
      deadline: 1,
      category: 1,
      subCategory: 1,
      price: 2000,
      time: { start: "", end: "" },
      photos: [],
      photosNames: [],
    
  });

  const [showDetails, setShowDetails] = useState(false)

  detailsVar = details;


  
  
  const myAdsArray = useSelector((state) => state.information.myAdsArray);


  console.log(valueTwo);

  const filteredArray = useMemo( () => {
    switch (valueTwo){
      case "all":
        return myAdsArray
      case "active":
        return myAdsArray.filter((e, i) => {
          return e.status === "active"
        })
      case "inProcess":
        return myAdsArray.filter(e => e.status === "inProcess")
      case "completed":
        return myAdsArray.filter(e => e.status === "completed")
      default : 
        window.Telegram.WebApp.showAlert("Что - то пошло не так MyAds второй")
    }
  } , [myAdsArray , valueTwo] )

  console.log(filteredArray);
  


  
  const [secondPage, setSecondPage] = useState({
    isActive : false,
    task : {
      id: 0,
      taskName: "",
      executionPlace: "Можно выполнить удаленно",
      time: {
        start: new Date(),
        end: new Date(),
      },
      tonValue: 9,
      taskDescription: "",
      photos: [],
      photosNames: [],
      rate: "5",
      isActive: true,
      creationTime: new Date(),
      viewsNumber: 2,
      removedFiles: [],
      addedFiles: [],
      status: "",
      user : "",
      responseCounter : 2,
      category : 1
    },
    index : 0
  }
  );
  const [openAboutReaction, setOpenAboutReaction] = useState({
    isActive : false,
    responce : null
  });

  const [oneCards, setOneCard] = useState({
    isOpen : false,
    card : {}
  })






  function checkMistakes(changingTask , isSet = true) {
    let taskName = false;
    let timeError = false;
    let descriptionError = false;
    if (changingTask.taskName.length < 3) {
      taskName = true;
    }

    if (changingTask.time.end.getTime() !== defaultDate.getTime()) {
      if (changingTask.time.end < changingTask.time.start) {
        timeError = true;
        if (isSet){
          window.Telegram.WebApp.showAlert(translation("У вас дата начала меньше даты завершения."))
        }
      }
    }
    if (changingTask.taskDescription.length > 500){
      descriptionError = true
      if (isSet){
        window.Telegram.WebApp.showAlert("Описание больше 500 символов")
      }
    }
    let rezult = { taskName: taskName, timeError: timeError, descriptionError : descriptionError };

    if (isSet){
      setMistakes(rezult);
    }
    return Object.values(rezult).every((value) => value === false);
  } 



  const [isOpen, setOpen] = useState({ isActive: false, responce: {
    information: "",
    photos: [],
    user: {
        id: 0,
        fl: "",
        photo: "",
        about: "",
        stage: null,
    }
  } });







  const save = useSave({
  
    detailsVar,
    myAdsArray : filteredArray,
    secondPage,
    checkMistakes,
    sortFiles,
    dispatch,
    setDetails,
    details,
    setDetailsShow : setShowDetails
  })// функция сохранения , а также модалка телеграма



  const [myResponse, setMyResponse] = useState({
    isOpen: false,
    id: 0,
  });
  const [detailsTwo, setDetailsTwo] = useState({
    isOpen : false,
    id : 0
  })

  const openDetails = useCallback( (index) => {
    setDetailsTwo({isOpen : true, id : index})
  } , [] )


  const [lastAdsTwo , setLastAdsTwo] = useState({
    isOpen : false,
    response : {},
  })

  useEffect( () => {
    document.documentElement.scrollTop = 0
    window.scrollTo(0, 0)
  } , [] )






  const [mistakes, setMistakes] = useState({
    taskName: false,
    timeError: false,
  }); // контролер ошибок

  

  window.Telegram.WebApp.disableVerticalSwipes();




  
  const [nowValue , setNowKey] = useState("customer")

  useEffect( () => {
    
    const more = async () => {
      const imTwo = await axios.get(
        "https://www.connectbirga.ru/advertisement/findCount",
        {
          params: {
            userId: window.Telegram.WebApp.initDataUnsafe.user.id,
          },
          headers : {
            "X-API-KEY-AUTH" : process.env.REACT_APP_API_KEY
          }
        }
      );
      const imOne = await axios.get(
        "https://www.connectbirga.ru/response/findCount",
        {
          params: {
            userId: window.Telegram.WebApp.initDataUnsafe.user.id,
          },
          headers : {
            "X-API-KEY-AUTH" : process.env.REACT_APP_API_KEY
          }
        }
      );
      const advertisemetCount = imTwo.data
      const responseCount = imOne.data
      if (pagesHistory[pagesHistory.length - 1] === "/AdCreating"){
        setNowKey("customer")
      }
      else{

        if (advertisemetCount < responseCount){
          setNowKey("freelancer")
        }
        else{
          setNowKey("customer")
        }
      }
    }

    more()

    
  } , [] )



  // const sortedArray = useMemo( () => {
  //   let copy = [...myAdsArray]

  //     return copy.sort( (a , b) => {
  //       let order = {"inProcess" : 0 , "active" : 1, "completed" : 2 }
  //       return order[a.status] - order[b.status]
  //     } )
    
  // } , [myAdsArray , nowValue] )



//   useEffect( () => {
//     document.documentElement.style.overflowY = 'scroll'
//     document.documentElement.style.marginTop = '40px'
//     setTimeout( () => {

//       window.scrollTo({
//         top: 40,
//         behavior: "smooth",
//       });
//        document.documentElement.style.overflowY = 'hidden'
//     }, 350 )

// },[] )

  


  


  const [myAdeOneStatus , setMyAdOneStatus] = useState(null)
  const [pageResponseStatus , setPageResponseStatus] = useState(null)



  

  const myAdOneResponse = useMemo( () => {
    async function getResponse() {
      try{

      
      let im = await axios.get(
        "https://www.connectbirga.ru/response/findOne",
        {
          params: {
            id: responseId,
          },
          headers : {
            "X-API-KEY-AUTH" : process.env.REACT_APP_API_KEY
          }
        }
      );
      let responce = im.data;
        let photos = [];

        if (responce.photos) {
          photos = await makeNewFile(responce.folder, responce.photos);
        }

        let b = await axios.get("https://www.connectbirga.ru/card/countByUser" , {
            params : {
                advertisementId: responce.user.id,
            },
            headers : {
              "X-API-KEY-AUTH" : process.env.REACT_APP_API_KEY
            }
        } )

        responce.photos = photos;
        responce.advertisement = myAdeOneStatus
        responce.user.cardsNumber = b.data

          let imTwo = await axios.get(
            "https://www.connectbirga.ru/advertisement/findCount",
            {
              params: {
                userId: Number(responce.user.id),
              },
              headers : {
                "X-API-KEY-AUTH" : process.env.REACT_APP_API_KEY
              }
            }
          );
          responce.createNumber = imTwo.data;




        return responce;

      }
      catch(e){
        window.Telegram.WebApp.showAlert("Этот отклик был удален.")
        setOpen((value) => ({...value , isActive : false}))
        setPageValueOne(false)
        setPageValueTwo(false)
        console.log(e)
      }
      


    }
    if (isPage && isPageValueTwo){
      if (myAdeOneStatus === null || !myAdeOneStatus){
        return null
      }
      else{
        if (pageResponseStatus === null ){
          getResponse().then((value) => {setPageResponseStatus(value)})
          return null
        }
        else{
          return pageResponseStatus
        }
      }
    }
    else{
      return isOpen.responce
    }
  } , [myAdeOneStatus, pageResponseStatus , isOpen.responce  , isPage, isPageValueTwo] )

  const myAdOneAdvertisement = useMemo( () => {
    
    async function getAdvertisement() {
      try{

        let im = await axios.get("https://www.connectbirga.ru/advertisement/findOne" , {
          params : {
            id : advertisementId,
          },
          headers : {
            "X-API-KEY-AUTH" : process.env.REACT_APP_API_KEY
          }
        })
        let order = im.data
        let files = await makeNewFile(order.folder, order.photos);
        let responseCounter = await axios.get("https://www.connectbirga.ru/response/countByAdvertisement" , {
          params : {
            "advertisementId" : order.id,
            
          },
          headers : {
            "X-API-KEY-AUTH" : process.env.REACT_APP_API_KEY
          }
        })
        return {
          id: advertisementId,
          taskName: order.title,
          executionPlace: "Можно выполнить удаленно",
          time: {
            start: new Date(order.startTime),
            end: new Date(order.endTime),
          },
          tonValue: order.price,
          taskDescription: order.description,
          photos: files,
          photosNames: order.photos,
          rate: "5",
          isActive: true,
          creationTime: order.createdAt,
          viewsNumber: order.views,
          removedFiles: [],
          addedFiles: [],
          status: order.status,
          user : order.user,
          responseCounter : responseCounter.data,
          category : order.category.id
        };
      }
      catch(e){
        window.Telegram.WebApp.showAlert(translation("Вы удалили уже это задание."))
        setOpen((value) => ({...value , isActive : false}))
        setSecondPage((value) => ({...value , isActive : false}))
        setPageValueOne(false)
        setPageValueTwo(false)
        console.log(e)
      }
    }

    if (isPage && isPageValueOne){
      if (myAdeOneStatus === null){
        getAdvertisement().then((value) => {
          setMyAdOneStatus(value)})
        return null
      }
      else{
        return myAdeOneStatus
      }
    }
    else{
      return filteredArray[secondPage.index]
    }
  } , [isPage , myAdeOneStatus  , secondPage.index , filteredArray , isPageValueOne] )


  console.log('====================================');
  console.log(isPage , myAdOneAdvertisement, secondPage);
  console.log('====================================');




  const deleteFunction = useCallback( (index) => {
    window.Telegram.WebApp
    .showPopup({
      title: translation("Удалить?"),
      message: sureText,
      buttons: [
        { id: "save", type: "default", text: Yes },
        { id: "delete", type: "destructive", text: No },
      ],
    } , (buttonId) => {

      if (buttonId === "delete" || buttonId === null) {
        
      }
      if (buttonId === "save") {
        setMyResponse((value) => ({...value , isOpen : false}))
        dispatch(deleteResponse(index))
      }


    } )

} , [setMyResponse , dispatch])


  const postStatus = useSelector( state => state.information.postTaskStatus )


  const goBack = useBack(
    {buyPage : buyPage,
      details : details,
      detailsTwo : detailsTwo,
      happyHold : happyHold ,
      isOpen : isOpen,
      lastAdsTwo : lastAdsTwo ,
      myResponse : myResponse,
      oneCards : oneCards,
      openAboutReaction : openAboutReaction,
      save : save,
      secondPage : secondPage,
      setBuyPage : setBuyPage, 
      setDetails : setDetails,
      setDetailsTwo : setDetailsTwo,
      setHappyHold : setHappyHold,
      setLastAdsTwo : setLastAdsTwo,
      setMyResponse : setMyResponse,
      setOneCard : setOneCard,
      setOpen : setOpen,
      setOpenAboutReaction : setOpenAboutReaction,
      setPageValueOne : setPageValueOne ,
      setPageValueTwo : setPageValueTwo,
      setSecondPage : setSecondPage,
      walletH : walletH,
      setShowDetails : setShowDetails,
      showDetails : showDetails,
      myAdOneAdvertisement : myAdOneAdvertisement
    }
  )

  const putTask = usePut({
    details : details,
    setSecondPage : setSecondPage,
    setDetails : setDetails,
    dispatch : dispatch,
    setDetailsShow : setShowDetails
  })
  
  const writeFucntion  = useWriteFucntion(
    {
      buyPage : buyPage,
      happyHold : happyHold,
      isOpen : isOpen,
      myAdOneAdvertisement : myAdOneAdvertisement ? myAdOneAdvertisement : secondPage.task,
      myAdOneResponse : myAdOneResponse,
      secondPage : secondPage,
      setBuyPage : setBuyPage,
      setHappyHold : setHappyHold,
      setOpen : setOpen,
      setWalletH : setWalletH,
      walletH : walletH,

    }
  )
  useButton({
    buyPage : buyPage,
    checkMistakes : checkMistakes,
    details : details ,
    goBack : goBack,
    happyHold : happyHold, 
    isOpen : isOpen,
    myResponse : myResponse,
    putTask : putTask,
    secondPage : secondPage,
    walletH : walletH,
    writeFucntion : writeFucntion,
    showDetails : showDetails,
    myAdOneAdvertisement : myAdOneAdvertisement ? myAdOneAdvertisement : secondPage.task
  })



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


  const changer = useSelector( state => state.menuSlice.changer )


  useEffect( () => {
    setDetails(value => ({...value , isActive : false}))
    setDetailsTwo( (value) => ({...value, isOpen:false}) )
    setLastAdsTwo( (value) => ({...value , isOpen: false}) )
    setMyResponse( (value) => ({...value, isOpen : false}) )
    setOneCard( (value) => ({...value , isOpen : false}) )
    setOpen( (value) => ({...value , isActive : false}) )
    setOpenAboutReaction((value) => ({...value , isActive : false}))
    setSecondPage( (value) => ({...value , isActive : false}) )
  
  } , [changer])
  // const putStatus = useSelector((state) => state.information.putTaskStatus);

  // useEffect( () => {
  //   setDetails( (value) => ({...value , task : {putStatus , myAds : true}}) )
  // } , [putStatus] )


  const style = useMemo( () => {
    if (walletH){
      return {
        transform : "translateX(-100vw)"
      }
    }
    return {}
    
  }, [walletH] )

  console.log(secondPage.task)


  console.log(details)

  useEffect( () => {
    if (isPage){
      setSecondPage((value) => ({...value , isActive : true}))
      setOpen((value) => ({...value, isActive : true}))
    }
  } , [isPage, setSecondPage] )


  console.warn(secondPage)
  return (
    <>
      { postStatus === "pending" ? (
        <MyLoader />
      ) : (
        <div
          style={style}
          className="MyAdsContainer"
        >



          <MyAdOne
          responsesArr = {filteredResponses}
          setMyResponse = {setMyResponse}
            setOneValue = {setValueOne}
            setTwoValue = {setValueTwo}
            nowValue={nowValue}
            valueTwo={valueTwo}
            valueOne = {valueOne}
            setNowKey={setNowKey}
            myAdsArray={filteredArray}
            setSecondPage={setSecondPage}
          />





        <CSSTransition classNames="left-right" in={showDetails} timeout={400}
          mountOnEnter unmountOnExit>
            <AdCreatingOne
              style = {{
                height : "100vh",
                overflowY : "scroll",
                paddingBottom : "74px"
              }}
              mistakes={mistakes}
              className="AdCreatingMy"
              taskInformation={details}
              setTaskInformation={setDetails}
              MyInformation={true}
              isDetailsActive={showDetails}
            />
          </CSSTransition>

          <CSSTransition
            classNames="aboutOne"
            in={(secondPage.isActive && myAdOneAdvertisement !== null)}
            timeout={400}
            mountOnEnter
            unmountOnExit
          >
            <AboutOne
            setDetailsShow={setShowDetails}
            style = { (isPageValueOne && isPage) ? {left : "0px"} : {}}
            setDetails={setDetails}
              setSecondPage={setSecondPage}
              setOpen={setOpen}
              task={myAdOneAdvertisement}
              openAboutReactionFunc={setOpenAboutReaction}
            />
          </CSSTransition>



          <CSSTransition
            // classNames="left-right"
           
            in={isOpen.isActive && myAdOneResponse !== null && myAdOneResponse}
            timeout={0}
            mountOnEnter
            unmountOnExit
          >
            <LastAds
             style = { (isPageValueTwo && isPage) ? {left : "0px" , transition : "0s", transform : "translateX(0px)"} : {left : "0px" , transition : "0s", transform : "translateX(0px)"}}
            responce = {myAdOneResponse}
              openAboutReactionFunc={setOpenAboutReaction}

            />
          </CSSTransition>


          <CSSTransition
            classNames="left-right"
            in={lastAdsTwo.isOpen}
            timeout={400}
            mountOnEnter
            unmountOnExit
          >
            <MyLastAds
            responce = {lastAdsTwo.response}
              openAboutReactionFunc={setOpenAboutReaction}

            />
          </CSSTransition>



          <CSSTransition
            classNames="left-right"
            in={openAboutReaction.isActive}
            timeout={400}
            mountOnEnter
            unmountOnExit
          >
            <AboutReaction setOneCard = {setOneCard} responce = {openAboutReaction.responce}   />
          </CSSTransition>

          <CSSTransition
            classNames="left-right"
            in={oneCards.isOpen }
            timeout={400}
            mountOnEnter
            unmountOnExit
          >
           <CardPage card={oneCards.card} />
      </CSSTransition>


          <CSSTransition
        in={myResponse.isOpen}
        timeout={400}
        classNames={"left-right"}
        unmountOnExit
        mountOnEnter
  
      > 
        <ShowMyResponse openAboutReaction = {setOpenAboutReaction} setLastAds = {setLastAdsTwo} deleteFunction = {deleteFunction}  index={myResponse.id} openDetails = {openDetails} response={filteredResponses[myResponse.id]} />
      </CSSTransition>


      <CSSTransition
            in={detailsTwo.isOpen}
            timeout={400}
            classNames="left-right"
            mountOnEnter
            unmountOnExit
          >
            <FirstDetails
              // className={}
              style = {{paddingBottom : "96px"}}
              orderInformation={filteredResponses[detailsTwo.id] ? filteredResponses[detailsTwo.id].advertisement : ""  }

            />
        </CSSTransition>


        <CSSTransition in = {buyPage}
        unmountOnExit
        mountOnEnter

        >
          <AdCreatingThree taskInformation={{tonValue : myAdOneAdvertisement ? myAdOneAdvertisement.tonValue : 0}} />
        </CSSTransition>

        <CSSTransition             
            in={happyHold}
            timeout={400}
            classNames="left-right"
            mountOnEnter
            unmountOnExit
        >
          <HappyHold task={myAdOneAdvertisement} response={myAdOneResponse} />
        </CSSTransition>

        <CSSTransition in = {walletH}
        timeout={400}
        classNames={""}
        mountOnEnter
        unmountOnExit
        >
          <Wallet left = {true} isFixed = {true} onClose = {setWalletH} />
        </CSSTransition>




        </div>


      )}
    </>
  );
};

export default MyAds;
