import { useCallback } from "react";
import { putMyTask } from "../../store/information";
import translation from "../../functions/translate";

const Yes = translation("Да")
const No = translation("Нет")
export const useSave = ({detailsVar, myAdsArray, secondPage, checkMistakes, sortFiles, dispatch, setDetails, details }) =>{

    const save = useCallback( () => {
        if (details.task !== myAdsArray[secondPage.index] ) {
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
                setDetails((value) => ({...value , isActive : false}))
              }
              if (buttonId === "save") {
              if (checkMistakes(details.task)){
              let myFormData = new FormData();
              myFormData.append('title' , String(detailsVar.task.taskName))
              myFormData.append('description' , String(detailsVar.task.taskDescription))
              myFormData.append("deadline" , String(1))
              myFormData.append("price" , String(detailsVar.task.tonValue ))
              myFormData.append("startTime" , detailsVar.task.time.start)
              myFormData.append("endTime" , detailsVar.task.time.end)
    
              let files = sortFiles(details.task.photosNames ,  details.task.photos)
            
                for (let i = 0; i <  files.removedArr.length; i++){
                  myFormData.append(`deleteFiles[${i}]` , files.removedArr[i])
                }
                for (let i = 0; i < files.addedArr.length ; i++){
                  myFormData.append(`addFiles` , files.addedArr[i] )
                }
    
              dispatch(putMyTask([myFormData, details.task.id , details.task]))
    
              
              setDetails((value) => ({...value , isActive : false}))
              }
              else{
                window.Telegram.WebApp.HapticFeedback.notificationOccurred("error")
              }
    
            }
            } )
            
        } else {
          setDetails((value) => ({...value , isActive : false}))
        }
         // eslint-disable-next-line
      }, [details , dispatch , myAdsArray , setDetails , secondPage.index, checkMistakes  ] ) 

      return save
}