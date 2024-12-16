import { useCallback, useEffect, useMemo } from "react";
import BackButton from "../../constants/BackButton";
import MainButton from "../../constants/MainButton";
import { useDispatch, useSelector } from "react-redux";
import { putMyTask, setStartTask } from "../../store/information";
import { setStartResponse } from "../../store/responses";
import sortFiles from "../../functions/sortFiles";
import translation from "../../functions/translate";
const menu = document.documentElement.querySelector(".FirstMenu")

const choiceText = translation("ВЫБРАТЬ")
const choiceTextTwo = translation("Перед выбором исполнителя\n ознакомьтесь с FAQ Биржи.")
const lastChoice = translation("Вы уверены, что хотите выбрать\n этого исполнителя?")
let isTake = translation("Выбрать?")
const Yes = translation("Да")
const No = translation("Нет")  
export const useButton = ({
  setOpen,
  setSecondPage,
  navigate,
  setOpenAboutReaction,
  myAdOneResponse,
  myAdOneAdvertisement,
  openAboutReaction,
  isOpen,
  setDetails,
  details,
  secondPage,
  save,
  oneCards,
  setOneCard,
  detailsTwo,
  setDetailsTwo,
  myResponse,
  setMyResponse,
  lastAdsTwo,
  setLastAdsTwo,
  checkMistakes,
  setPageValueOne,
  setPageValueTwo
}) => {
  const dispatch = useDispatch();
  const myAdsArray = useSelector((state) => state.information.myAdsArray);

  const putTask = useCallback( () => {
      console.log("ВЫХОВ ЭТОЙ ШТУКИ")
      console.log(details.task)
      let myFormData = new FormData();
      myFormData.append('title' , String(details.task.taskName))
      myFormData.append('description' , String(details.task.taskDescription))
      myFormData.append("deadline" , String(1))
      myFormData.append("price" , String(details.task.tonValue) )
      myFormData.append("startTime" , details.task.time.start)
      myFormData.append("endTime" , details.task.time.end)

      let files = sortFiles(details.task.photosNames ,  details.task.photos)
      
        for (let i = 0; i <  files.removedArr.length; i++){
          myFormData.append(`deleteFiles[${i}]` , files.removedArr[i])
        }
        for (let i = 0; i < files.addedArr.length ; i++){
          myFormData.append(`addFiles` , files.addedArr[i] )
        }

    dispatch(putMyTask([myFormData, details.task.id , details.task]))

    setSecondPage( (value) => ({...value , task : {...details.task}}) )
    setDetails((value) => ({...value , isActive : false}))
    
  } , [details] ) 
  useEffect(() => {
    async function writeFucntion() {
      window.Telegram.WebApp.showPopup(
        {
          title: translation("Внимание"),
          message: choiceTextTwo,
          buttons: [
            { id: "delete", type: "default", text: translation("Продолжить") },
            { id: "save", type: "destructive", text: translation("Прочитать") },
          ],
        },
        (buttonId) => {
          if (buttonId === "delete") {
            window.Telegram.WebApp.showPopup(
              {
                title: isTake,
                message: lastChoice,
                buttons: [
                  { id: "save", type: "default", text: Yes },
                  { id: "delete", type: "destructive", text: No },
                ],
              },
              (buttonId) => {
                if (buttonId === "save") {
                  
                  
  
                  // dispatch(clearMyOrders())
                  dispatch(setStartTask(myAdOneAdvertisement.id));
                  dispatch(setStartResponse([myAdOneResponse , myAdOneAdvertisement]));
                  setOpen({ ...isOpen, isActive: false });
                  setSecondPage({ ...secondPage, isActive: false });
                  // dispatch(fetchMyOrders(1));


                }
                if (buttonId === "delete" || buttonId === null) {
                  console.log("Он отказался");
                }
              }
            );
          }
          if (buttonId === "save") {
            window.Telegram.WebApp.openLink(
              "https://walletru.helpscoutdocs.com/"
            );
          }
          if (buttonId === null) {
            console.log("Он отказался");
          }
        }
      );
    }

    function compareTwoObject(a1, a2) {
      console.log(a1 , a2)
      if (JSON.stringify({...a1 , myAds : true}) !== JSON.stringify({...a2 , myAds : true})) {
        return false;
      }
      if (JSON.stringify(a1.time) !== JSON.stringify(a2.time)) {
        return false;
      }
      if (a1.photos.length !== a2.photos.length) {
        return false;
      }
      for (let i = 0; i < a1.photos.length; i++) {
        if (a1.photos[i].name !== a2.photos[i].name) {
          return false;
        }
      }
      return true;
    }





    function goBack() {
      if (oneCards.isOpen) {
        setOneCard((value) => ({ ...value, isOpen: false }));
      } else {
        if (!openAboutReaction.isActive) {
          if (!details.isActive) {
            if (detailsTwo.isOpen) {
              setDetailsTwo((value) => ({ ...value, isOpen: false }));
            } else {
              if (isOpen.isActive) {
                setPageValueTwo(false)
                // isPageValueTwo = false
                setOpen({ ...isOpen, isActive: false });
              } else {
                if (secondPage.isActive) {
                  setPageValueOne(false)
                  setSecondPage((value) => ({ ...value, isActive: false }));
                  // isPageValueOne = false
                } else {
                  // if (history[history.length - 1] === '/AdCreating'){

                  //   navigate();
                  // }
                  // else{
                  //   navigate(-1)
                  // }
                  if (lastAdsTwo.isOpen) {
                    setLastAdsTwo((value) => ({ ...value, isOpen: false }));
                  } else {
                    if (myResponse.isOpen) {
                      setMyResponse((value) => ({ ...value, isOpen: false }));
                    } else {
                      navigate("/");
                    }
                  }
                }
              }
            }
          } else {
            if (!compareTwoObject(secondPage.task, details.task)){
              save();
            }
            else{
              setDetails((value) => ({...value , isActive : false}))
            }
            
          }
        } else {
          setOpenAboutReaction({ ...openAboutReaction, isActive: false });
        }
      }
    }

    BackButton.show();

    if (isOpen.isActive && secondPage.task.status !== "inProcess" && secondPage.task.status !== "completed") {
      menu.classList.add("disappearAnimation")
      menu.classList.remove("appearAnimation")
      MainButton.show();
      
      MainButton.setParams({
        color: "#2ea5ff",
        text_color: "#ffffff",
        is_active: true,
      });

      MainButton.setText(choiceText);
      MainButton.onClick(writeFucntion);
    } else {
      MainButton.offClick(writeFucntion);
      if (!myResponse.isOpen && !details.isActive) {
        menu.classList.add("appearAnimation")
        menu.classList.remove("disappearAnimation")
        MainButton.hide();
      }
    }

    if (details.isActive) {
      MainButton.setText(translation("ОБНОВИТЬ"));
      if (!compareTwoObject(secondPage.task, details.task)) {
        menu.classList.add("disappearAnimation")
        menu.classList.remove("appearAnimation")
        MainButton.show();
        MainButton.setParams({
          color: "#2ea5ff",
          text_color: "#ffffff",
          is_active: true,
        });
        

        if (checkMistakes(details.task, false)) {
          MainButton.setParams({
            color: "#2ea5ff",
            text_color: "#ffffff",
            is_active: true,
          });
        } else {
          MainButton.setParams({
            is_active: false, //неизвесетно
            color: "#2f2f2f",
            text_color: "#606060",
          });
        }
        MainButton.offClick(putTask)
        MainButton.onClick(putTask);
      }
      else{
        menu.classList.add("disappearAnimation")
        menu.classList.remove("appearAnimation")
          MainButton.show()
          MainButton.setParams({
            is_active: false, //неизвесетно
            color: "#2f2f2f",
            text_color: "#606060",
          });
          MainButton.offClick(putTask)
      }
    } else {
      if (!isOpen.isActive && !myResponse.isOpen){
        menu.classList.add("appearAnimation")
        menu.classList.remove("disappearAnimation")
        MainButton.hide();
        MainButton.offClick(putTask)
        MainButton.setParams({
          is_active: false, //неизвесетно
          color: "#2f2f2f",
          text_color: "#606060",
        });
      }
    }

    BackButton.onClick(goBack);
    return () => {
      MainButton.setParams({
        color: "#2ea5ff",
        text_color: "#ffffff",
        is_active: true,
      });
      BackButton.offClick(goBack);
      MainButton.offClick(writeFucntion);
      MainButton.offClick(putTask)
    };

    // eslint-disable-next-line
  }, [
    myAdsArray,
    secondPage.isActive,
    secondPage.task,
    isOpen.isActive,
    openAboutReaction.isActive,
    isOpen,
    details,
    navigate,
    save,
    setOneCard,
    oneCards.isOpen,
    detailsTwo.isOpen,
    setDetailsTwo,
    myResponse.isOpen,
    setMyResponse,
    lastAdsTwo,
    setLastAdsTwo,
    setPageValueOne,
    setPageValueTwo
  ]);
};
