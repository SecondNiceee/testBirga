import React, { useMemo } from "react";
import formatDate from "../../../functions/makeDate";
import Text from "../../Text/Text";
import translation from "../../../functions/translate";
import en from "../../../constants/language";

const TimeAndWatches = ({ time, watches, responses }) => {
  

  

  const textOne = useMemo( () => {
    const w = Number(watches)
    if (!en){
      if (w === 0){
        return "просмотров"
      }
      if (w === 1){
        return "просмотр"
      }
      else{

        if (0 < w && w < 5){
          return translation("просмотра")
        }
        else{
    
          if (w < 21){
            return translation("просмотров")
          }
          else{
            if (String(w).slice(String(w).length - 1, String(w).length) === "1"){
              return translation("просмотр")
            }
            else{
              if ( 1 < Number(String(w).slice(String(w).length - 1, String(w).length)) && Number(String(w).slice(String(w).length - 1, String(w).length))  < 5  ){
                return "просмотра"
              }
              else{
                return "просмотров"
              }
            } 
          }
        }
      }
    }
    else{
      if (w === 1){
        return "watch"
      }
      return "watches"
    }

  } , [watches] )
  const textTwo = useMemo( () => {
    const w = Number(responses)
    if (!en){

      if ( w === 1){
        return "отклик"
      }
      if (1 < w  && w < 5){
        return translation("отклика")
      }
      else{
  
        if (w < 21){
          return translation("откликов")
        }
        else{
          if (String(w).slice(String(w).length - 1, String(w).length) === "1"){
            return translation("отклик")
          }
          else{
            if ( 1 < Number(String(w).slice(String(w).length - 1, String(w).length)) &&  Number(String(w).slice(String(w).length - 1, String(w).length))  < 5  ){
              return "отклика"
            }
            else{
              return "откликов"
            }
          } 
        }
      }
    }
    else{
      if (w === 1){
        return "response"
      }
      return "reponses"
    }

  } , [responses] )
  return (
    <div className="timeAndWatches">
      {(responses !== null && responses !== undefined)  ? <p className="watches"><span>{watches}</span> {textOne} {'\u00A0'}   <span>{responses}</span> {textTwo}</p> : <></>}
      <div className="createdAt-block">
        <Text>Создано</Text>
        <p>{formatDate(new Date(time))}</p>
        
      </div>
    </div>
  );
};

export default TimeAndWatches;
