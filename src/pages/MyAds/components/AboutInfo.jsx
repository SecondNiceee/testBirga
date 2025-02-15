import React, { useCallback, useMemo } from "react";
import Text from "../../../components/Text/Text";
import translation from "../../../functions/translate";

const AboutInfo = ({responce}) => {
  const counter = useCallback((par) => {
    if (Number(par) === 1){
      return translation("Задание")
    } 
    else{
      if (Number(par) > 1 && Number(par) < 5){
        return translation("Задания")
      }
      else{
        return translation("Заданий")
      }
    }
// eslint-disable-next-line
  }, [])

  


  return (
    <div className="aboutInfo">
      <div className="name">
        <Text>{responce.user.fl}</Text>
      </div>

      <div onClick={() => {
        window.Telegram.WebApp.openTelegramLink("https://t.me/" + responce.user.link)
      }} className="userLink">
        <Text className="telegramLink"> Открыть в Telegram </Text>

        
      </div>
      <div className="aboutDown">
        <div className="block">
          <Text>{responce.createNumber}</Text>
          <p className="aboutInfo__text">{counter(responce.createNumber)} {translation("создано")}</p>
          
        </div>
        <div className="block">
          <p>{responce.user.completedAdvertisements.length}</p>
          <p className="aboutInfo__text">{counter(responce.user.completedAdvertisements.length)} {translation("выполнено")}</p>
        </div>
      </div>

    </div>
  );
};

export default AboutInfo;
