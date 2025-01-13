import React, { memo, useMemo } from "react";
import MyButton from "../UI/MyButton/MyButton";
import Pallete from "../UI/Pallete/Pallete";
import ShareIcon from "../UI/ShareIcon/ShareIcon";
import { useSelector } from "react-redux";
import formatDate from "../../functions/makeDate";
import BlockSpinner from "../UI/BlockSpinner/BlockSpinner";
import Text from "../Text/Text";
import en from "../../constants/language";
import RealTon from "../../images/icons/RealTon.svg"
import translation from "../../functions/translate";
import { shareFunction } from "../../functions/shareFunction";

const textPrice = en ? 'USD' : "RUB"
const MyFirstBlock = ({
  className,
  taskName,
  time,
  end = false,
  isButton,
  photos,
  myAdsFunc,
  isWatched,
  setSlideActive,
  tonValue,
  status,
  viewsNumber,
  responseCounter = 0,
  category,
  id,
}) => {
  const tonConstant = useSelector((state) => state.ton.value);

  const textStatus = useMemo(() => {
    switch (status) {
      case "active":
        return "Активно";
      case "inProcess":
        return "В работе";
      case "completed":
        return "Завершено";
      default:
        console.log("Странная тема");
    }
  }, [status]);

  const style = useMemo(() => {
    switch (status) {
      case "active":
        return { color: "#30d158" };
      case "inProcess":
        return { color: "#2ea5ff" };
      case "completed":
        return { color: "#95979E" };
      default:
        console.log("Странная тема");
    }
  }, [status]);

  return (
    <>
      {photos !== undefined ? (
        <div
          className={
            className ? ["First__block", className].join(" ") : "First__block"
          }
        >
          {photos.length ? (
            <div className="first__photos">
              {photos.map((e, i) => {
                return (
                  <img
                    key={i}
                    src={URL.createObjectURL(e)}
                    style={
                      photos.length === 1
                        ? {
                            width: "calc(100% - 3.67px)",
                          }
                        : {}
                    }
                    className="first__photo"
                    alt=""
                  />
                );
                // return <img className='first__photo' src = {'https://www.connectbirga.ru/' + e} />
              })}
            </div>
          ) : (
            ""
          )}

          <div className="myAds__top">
            <Text style={style} className="myAds__top-left">
              {textStatus}
            </Text>
            <div className="myAds__top-right">
              <div className="one">
                <Text>{viewsNumber}</Text>
                <svg
                  width="16"
                  height="13"
                  viewBox="0 0 16 13"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4.27394 12.5776C6.31542 12.5776 7.87991 10.1864 7.87991 6.66308C7.87991 3.13343 6.31542 0.754883 4.27394 0.754883C2.23246 0.754883 0.667969 3.13343 0.667969 6.66308C0.667969 10.1864 2.23246 12.5776 4.27394 12.5776ZM12.3953 12.5776C14.4368 12.5776 16.0013 10.1864 16.0013 6.66308C16.0013 3.13343 14.4368 0.754883 12.3953 0.754883C10.3602 0.754883 8.78936 3.13343 8.78936 6.66308C8.78936 10.1864 10.3602 12.5776 12.3953 12.5776ZM2.99563 8.85083C4.06407 8.85083 4.77636 8.1131 4.77636 6.99379C4.77636 5.88719 4.06407 5.13674 2.99563 5.13674C2.55681 5.13674 2.18159 5.26394 1.88904 5.48653C2.14343 3.3115 3.12283 1.89328 4.27394 1.88692C5.63493 1.88056 6.74152 3.81392 6.74152 6.66308C6.74152 9.49317 5.63493 11.4392 4.27394 11.4456C3.25638 11.452 2.37874 10.3517 2.00987 8.59008C2.28334 8.7618 2.61405 8.85083 2.99563 8.85083ZM11.117 8.85083C12.1791 8.85083 12.8977 8.1131 12.8977 6.99379C12.8977 5.88719 12.1791 5.13674 11.117 5.13674C10.6718 5.13674 10.2966 5.26394 9.99771 5.48653C10.2585 3.3115 11.2379 1.89328 12.3953 1.89328C13.75 1.89328 14.8566 3.82664 14.8566 6.66308C14.8566 9.49953 13.75 11.4392 12.3953 11.4392C11.3778 11.4392 10.4938 10.3454 10.1249 8.59008C10.3984 8.7618 10.7354 8.85083 11.117 8.85083ZM2.49321 6.7712C2.27062 6.73304 2.12435 6.46593 2.17523 6.1861C2.23246 5.90627 2.45506 5.70912 2.67129 5.74728C2.90024 5.7918 3.03379 6.05891 2.97655 6.33238C2.92568 6.6122 2.71581 6.80936 2.49321 6.7712ZM10.6146 6.7712C10.3857 6.72668 10.2457 6.46593 10.2966 6.1861C10.3539 5.90627 10.5637 5.70912 10.7863 5.74728C11.0216 5.78544 11.1552 6.05891 11.0979 6.33238C11.0407 6.6122 10.8372 6.80936 10.6146 6.7712Z"
                    fill="#B5CED9"
                  />
                </svg>
              </div>
              <div className="two">
                <Text>{responseCounter}</Text>
                <svg
                  width="10"
                  height="12"
                  viewBox="0 0 10 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M0.985006 9.80004C0.607778 9.80004 0.333984 10.0799 0.333984 10.4632C0.333984 10.8465 0.607778 11.1264 0.985006 11.1264H9.00413C9.38744 11.1264 9.66732 10.8465 9.66732 10.4632C9.66732 10.0799 9.38744 9.80004 9.00413 9.80004H5.14059C5.28053 9.76962 5.40222 9.6966 5.50565 9.59317L9.38135 5.76005C9.52738 5.61403 9.60039 5.44367 9.60039 5.26722C9.60039 4.88391 9.32051 4.60403 8.94937 4.60403C8.75467 4.60403 8.58431 4.68313 8.46262 4.80482L7.21534 6.03385L5.61517 7.78613L5.67601 6.50842V0.892605C5.67601 0.478872 5.40222 0.205078 5.00065 0.205078C4.59909 0.205078 4.31921 0.478872 4.31921 0.892605V6.50842L4.38614 7.79221L2.78596 6.03385L1.54476 4.80482C1.41699 4.68313 1.24663 4.60403 1.05802 4.60403C0.68079 4.60403 0.406996 4.88391 0.406996 5.26722C0.406996 5.44367 0.480008 5.61403 0.626031 5.76005L4.49565 9.59317C4.59909 9.6966 4.72077 9.76962 4.85463 9.80004H0.985006Z"
                    fill="#B5CED9"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className="FirstMain__top" style={{ marginTop: "13px" }}>
            <Pallete category={category} />
            <Text className={isWatched ? "watchedTask" : ""}>{taskName}</Text>
            <ShareIcon
              onClick={shareFunction(id)}
              style={end ? { opacity: 0.5 } : {}}
              className="share__icon"
            />
          </div>
          <div className="FirstMain__middle">
            {/* <Text>{executionPlace}</Text> */}
            <Text>Дедлайн: </Text>
            <p>{formatDate(time.end, true)}</p>
          </div>
          <div className="FirstMain__bottom">
            <div className="FirstMain__bottom-left">
              <div className="FirstMain__price-up">
                <p>{tonValue} TON</p>
                <img src={RealTon} alt="" />
              </div>
              <div className="FirstMain__price-bottom">
                <p>
                ~ {Number((tonValue * tonConstant).toFixed(2)).toLocaleString(
                    "ru-RU"
                  ).replace(',','.')}
                </p>
                <Text>{textPrice}</Text>
              </div>
            </div>
            <div className="FirstMain__bottom-right">
              <MyButton
                style={isButton ? {} : { display: "none" }}
                onClick={(e) => myAdsFunc(true)}
              >
                Подробнее
              </MyButton>
            </div>
          </div>
        </div>
      ) : (
        <BlockSpinner
          style={photos.length > 0 ? { height: "313px" } : { height: "144px" }}
        />
      )}
    </>
  );
};

export default memo(MyFirstBlock);
