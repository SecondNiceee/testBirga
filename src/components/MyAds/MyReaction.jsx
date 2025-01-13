import React from "react";


import "../../pages/MyAds/MyAds.css";
import MyButton from "../UI/MyButton/MyButton";
import userPhoto from "../../images/userPhoto/user.png"
import Text from "../Text/Text";
const MyReaction = ({
  openAboutReactionFunc,
  responce,
  deleteFunction,
  setLastAds,
  agree = false,
}) => {
  return (
    <>
      <div className="reaction">
        {responce.photos.length > 0 ? (
          <div className="reactions__images">
            {responce.photos.map((e, i) => (
              <img
                
                style={responce.photos.length === 1 ? { width: "100%" } : {}}
                src={URL.createObjectURL(e)}
                alt=""
                key={i}
              />
            ))}
          </div>
        ) : (
          <></>
        )}

        <div
          className="reaction__middle"
          style={{
            marginBottom: "18px",
          }}
        >
          <img
            onClick={() => {
              openAboutReactionFunc({ isActive: true, responce: responce });
            }}
            className="icon"
            style={{objectFit : "cover"}}
            src={responce.user.photo.length > 0 ? responce.user.photo.split('https://').length === 2 ? responce.user.photo : `${process.env.REACT_APP_HOST}/${responce.user.id}/${responce.user.photo}` : userPhoto}
            alt=""
          />
          <div
            onClick={() => {
              openAboutReactionFunc({ isActive: true, responce: responce });
            }}
            className="reaction__middle-midle"
          >
            <Text className="reaction__userName">{responce.user.fl.length > 12 ? responce.user.fl.slice(0,12) + "..." : responce.user.fl }</Text>
            <div className="reaction__rates">
              {/* <img src={star} alt="" /> */}
              <div className="rates__text">
                {/* <Text><span>4</span></Text>
                                  <Text>◦</Text>
                                  <Text>158 отзывов</Text>
                                  <Text>◦</Text> */}
                <Text>Отклик</Text>
              </div>
            </div>
          </div>
          <div className="right">
            <MyButton onClick = {() => {
              setLastAds({
                isOpen : true,
                response : responce
              })
            }}>Подробнее</MyButton>
            { (responce.isWatched !== "inProcess" && responce.isWatched !== "completed")   && (
              <div
                onClick={() => {
                  deleteFunction(responce.id);
                }}
                className="circle"
              >
                <svg
                  className="center"
                  width="25"
                  height="25"
                  viewBox="0 0 25 25"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9.10742 19.8033H15.3744C16.4246 19.8033 17.0997 19.1691 17.1542 18.1189L17.6111 8.29909H18.3612C18.709 8.29909 18.975 8.02632 18.975 7.68535C18.975 7.34439 18.7022 7.08525 18.3612 7.08525H15.3335V6.06235C15.3335 5.01218 14.6652 4.39844 13.5263 4.39844H10.935C9.79618 4.39844 9.12788 5.01218 9.12788 6.06235V7.08525H6.11374C5.77277 7.08525 5.5 7.35121 5.5 7.68535C5.5 8.03314 5.77277 8.29909 6.11374 8.29909H6.86387L7.32076 18.1189C7.37531 19.1759 8.04361 19.8033 9.10742 19.8033ZM10.4031 6.12373C10.4031 5.77594 10.6486 5.5509 11.0237 5.5509H13.4377C13.8128 5.5509 14.0583 5.77594 14.0583 6.12373V7.08525H10.4031V6.12373ZM9.24381 18.5826C8.86875 18.5826 8.59597 18.303 8.57552 17.9007L8.11862 8.29909H16.3359L15.8927 17.9007C15.879 18.3099 15.6131 18.5826 15.2244 18.5826H9.24381ZM10.2258 17.4847C10.519 17.4847 10.7031 17.3006 10.6963 17.0278L10.4917 9.89481C10.4849 9.62204 10.294 9.44474 10.0144 9.44474C9.72798 9.44474 9.54386 9.62886 9.55068 9.90163L9.75526 17.0346C9.76208 17.3074 9.95302 17.4847 10.2258 17.4847ZM12.2375 17.4847C12.5239 17.4847 12.7217 17.3074 12.7217 17.0346V9.90163C12.7217 9.62886 12.5239 9.44474 12.2375 9.44474C11.9511 9.44474 11.7601 9.62886 11.7601 9.90163V17.0346C11.7601 17.3074 11.9511 17.4847 12.2375 17.4847ZM14.2492 17.4915C14.522 17.4915 14.7129 17.3074 14.7197 17.0346L14.9243 9.90163C14.9311 9.62886 14.747 9.45156 14.4606 9.45156C14.181 9.45156 13.9901 9.62886 13.9832 9.90163L13.7787 17.0346C13.7718 17.3006 13.956 17.4915 14.2492 17.4915Z"
                    fill="#F83D3D"
                  />
                </svg>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default MyReaction;
