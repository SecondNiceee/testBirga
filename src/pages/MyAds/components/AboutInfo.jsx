import React, { useCallback } from "react";
import Text from "../../../components/Text/Text";
import translation from "../../../functions/translate";

const AboutInfo = ({ responce, isTelesgramVisible = true }) => {
  const counter = useCallback((par) => {
    if (Number(par) === 1) {
      return translation("Задание");
    } else {
      if (Number(par) > 1 && Number(par) < 5) {
        return translation("Задания");
      } else {
        return translation("Заданий");
      }
    }
    // eslint-disable-next-line
  }, []);

  console.warn(responce.user);
  const clickHanlder = useCallback(() => {
    if (isTelesgramVisible) {
      if (responce.user.link && responce.user.link !== "-1") {
        window.Telegram.WebApp.openTelegramLink("https://t.me/" + responce.user.link);
      } else {
        window.Telegram.WebApp.showPopup(
          {
            title: translation("Упс"),
            message: "Похоже, у пользователя закрытый профиль",
            buttons: [{ id: "save", type: "default", text: "Понятно" }],
          },
          (buttonId) => {
            if (buttonId === "save" || buttonId === null) {
              console.log("Ok");
            }
          }
        );
      }
    } else {
      window.Telegram.WebApp.showAlert(
        translation(
          "Для доступа к контактам заказчика необходимо откликнуться."
        )
      );
    }
  }, [responce, isTelesgramVisible]);

  console.warn(responce.user.completedAdvertisements);
  return (
    <div className="aboutInfo">
      <div className="name">
        <Text>{responce.user.fl}</Text>
      </div>

      <div onClick={clickHanlder} className="userLink">
        <Text className="telegramLink"> Открыть в Telegram </Text>
      </div>
      <div className="aboutDown">
        <div className="block">
          <Text>{responce.createNumber}</Text>
          <p className="aboutInfo__text">
            {counter(responce.createNumber)} {translation("создано")}
          </p>
        </div>
        <div className="block">
          <p>{responce.user.completedAdvertisements}</p>
          <p className="aboutInfo__text">
            {counter(Number(responce.user.completedAdvertisements))}{" "}
            {translation("выполнено")}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutInfo;
