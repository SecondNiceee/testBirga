import  { useCallback } from 'react';
import { putMyTask } from '../../store/information';
import sortFiles from '../../functions/sortFiles';

const usePut = ({details, setSecondPage, setDetails, dispatch , setDetailsShow}) => {
    const putTask = useCallback( () => {
        let myFormData = new FormData();
        myFormData.append('title' , String(details.taskName))
        myFormData.append('description' , String(details.taskDescription))
        myFormData.append("deadline" , String(1))
        myFormData.append("price" , String(details.tonValue) )
        myFormData.append("startTime" , details.time.start)
        myFormData.append("endTime" , details.time.end)
  
        let files = sortFiles(details.photosNames ,  details.photos)
        
          for (let i = 0; i <  files.removedArr.length; i++){
            myFormData.append(`deleteFiles[${i}]` , files.removedArr[i])
          }
          for (let i = 0; i < files.addedArr.length ; i++){
            myFormData.append(`addFiles` , files.addedArr[i] )
          }
  
      dispatch(putMyTask([myFormData, details.id , details]))
  
      setSecondPage( (value) => ({...value , task : {...details}}) )
      setDetailsShow(false)
      
    } , [details, setSecondPage, dispatch, setDetailsShow] ) 
    return putTask
};

export default usePut;