import React, { memo, useCallback, useEffect } from "react";
import cl from "./ShowMyResponse.module.css";
import ResponseBlock from "../ResponseBlock";
import MyReaction from "../MyReaction";
import Customer from "../Customer/Customer";
import formatDate from "../../../functions/makeDate";
import { useDispatch } from "react-redux";
import MyLoader from "../../UI/MyLoader/MyLoader";
import MainButton from "../../../constants/MainButton";
import axios from "axios";
import Text from "../../Text/Text";
import translation from "../../../functions/translate";
const menu = document.documentElement.querySelector(".FirstMenu");

const textButtonOne = translation("ВЫПОЛНИЛ")
const isTake = translation("Вы выполнили это задание?")
const bigText = translation("Мы выслали подтверждение заказчику.\nПожалуйста, не нажимайте эту кнопку много раз.\nПодтверждение точно было выслано. ")
const Yes = translation("Да")
const No = translation("Нет")
const ShowMyResponse = ({
  response = { advertisement: { user: {} }, id: 0, user: { fuck: "fuck" } },
  openDetails,
  index,
  deleteFunction,
  setLastAds,
  openAboutReaction,
}) => {
  useEffect(() => {
    function click() {
      window.Telegram.WebApp.showPopup(
        {
          title: translation("Выбрать?"),
          message: isTake,
          buttons: [
            { id: "save", type: "default", text: Yes },
            { id: "delete", type: "destructive", text: No },
          ],
        },
        (buttonId) => {
          if (buttonId === "save") {
            clickHandler();
          }
          if (buttonId === "delete" || buttonId === null) {
            console.log("Он отказался");
          }
        }
      );
    }
    async function clickHandler() {
      try {
        await axios.get("https://www.connectbirga.ru/bot/notification", {
          params: {
            executorId: String(response.user.id),
            consumerId: String(response.advertisement.user.id),
            responseId: String(response.id),
            chatId: String(response.advertisement.user.id),
            advertisementId: String(response.advertisement.id),
          },
         headers : {
          "X-API-KEY-AUTH" : process.env.REACT_APP_API_KEY
         } 
        });

        window.Telegram.WebApp.showAlert(
          bigText
        );
      } catch (e) {
        window.Telegram.WebApp.showAlert(
          translation("Извините, подверждение не удалось отправить заказчику. Обратитесь в поддержку.")
        );
        window.Telegram.WebApp.showAlert(JSON.stringify(e));
        console.log(e);
      }
    }

    if (response.isWatched === "inProcess") {
      menu.classList.add("disappearAnimation")
      menu.classList.remove("appearAnimation")
      MainButton.show();
      MainButton.setParams({
        color: "#2ea5ff",
        text_color: "#ffffff",
        is_active: true,
      });
      
      MainButton.setText(textButtonOne);
      MainButton.onClick(click);
    }
    return () => {
      menu.classList.add("appearAnimation")
      menu.classList.remove("disappearAnimation")
      MainButton.hide();
      MainButton.offClick(click);
    };
  }, [
    response.advertisement.id,
    response.advertisement.user.id,
    response.advertisement.user.chatId,
    response.id,
    response.isWatched,
    response.user.id,
  ]);


  const onImageClick = useCallback(() => {
    openAboutReaction({
      isActive: true,
      responce: {
        user: response.advertisement.user,
        createNumber: response.advertisement.createNumber,
      },
    });
  }, [
    openAboutReaction,
    response.advertisement.user,
    response.advertisement.createNumber,
  ]);

  return (
    <>
      {response.user.fuck ? (
        <div className={cl.wrapper}>
          <MyLoader style={{ width: "100vw", height: "calc(100vh)" }} />
        </div>
      ) : (
        <div style={MainButton.isVisible ? {paddingBottom : "74px"} : {paddingBottom : "97px"}} className={cl.wrapper}>
          <ResponseBlock
            isWatched={response.isWatched}
            index={index}
            func={openDetails}
            className={cl.response}
            buttonText={"Подробнее"}
            {...response.advertisement}
            task={response.advertisement}
          />
          <MyReaction
            openAboutReactionFunc={openAboutReaction}
            setLastAds={setLastAds}
            deleteFunction={deleteFunction}
            responce={response}
          />
          <Customer
            onImageClick={onImageClick}
            fl={response.advertisement.user.fl}
            photo={response.advertisement.user.photo}
            link={response.advertisement.user.link}
          />
            <div className="createdAt-block">
              <Text>Создано </Text>
              <p>{formatDate(new Date(response.advertisement.creationTime))}</p>
            </div>
          
        </div>
      )}
    </>
  );
};

export default memo(ShowMyResponse);
