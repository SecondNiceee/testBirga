import React, { memo, useMemo } from "react";
import MyAdsTopRight from "./MyAdsTopRight";
import Text from "../../Text/Text";

const MyAdsTop = ({isMyAds, isResponce, viewsNumber, responseCounter, status, showStatus = false }) => {
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
      {isMyAds || isResponce || showStatus ? (
        <div className="myAds__top">
          <Text style = {style} className="myAds__top-left">{textStatus}</Text>
          <MyAdsTopRight viewsNumber={viewsNumber} responseCounter={responseCounter} />
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default memo(MyAdsTop);
