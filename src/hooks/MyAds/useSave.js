import { useCallback } from "react";
import { putMyTask } from "../../store/information";
import translation from "../../functions/translate";

const Yes = translation("Да")
const No = translation("Нет")
export const useSave = ({detailsVar, myAdsArray, secondPage, checkMistakes, sortFiles, dispatch, details , setDetailsShow }) =>{

    const save = useCallback( () => {
        if (details !== myAdsArray[secondPage.index] ) {
          window.Telegram.WebApp
            .showPopup({
              title: translation("Сохранить?"),
              message: translation("Сохранить изменения перед выходом?"),
              buttons: [
                { id: "save", type: "default", text: Yes },
                { id: "delete", type: "destructive", text: No },
              ],
            } , (buttonId) => {
    
              if (buttonId === "delete" || buttonId === null) {
                setDetailsShow(false)
              }
              if (buttonId === "save") {
              if (checkMistakes(details)){
              let myFormData = new FormData();
              myFormData.append('title' , String(detailsVar.taskName))
              myFormData.append('description' , String(detailsVar.taskDescription))
              myFormData.append("deadline" , String(1))
              myFormData.append("price" , String(detailsVar.tonValue ))
              myFormData.append("startTime" , detailsVar.time.start)
              myFormData.append("endTime" , detailsVar.time.end)
    
              let files = sortFiles(details.photosNames ,  details.photos)
            
                for (let i = 0; i <  files.removedArr.length; i++){
                  myFormData.append(`deleteFiles[${i}]` , files.removedArr[i])
                }
                for (let i = 0; i < files.addedArr.length ; i++){
                  myFormData.append(`addFiles` , files.addedArr[i] )
                }
    
              dispatch(putMyTask([myFormData, details.id , details]))
    
              setDetailsShow(false)
              }
              else{
                window.Telegram.WebApp.HapticFeedback.notificationOccurred("error")
              }
    
            }
            } )
            
        } else {
          setDetailsShow(false)
        }
         // eslint-disable-next-line
      }, [details , dispatch , myAdsArray  , secondPage.index, checkMistakes  ] ) 

      return save
}