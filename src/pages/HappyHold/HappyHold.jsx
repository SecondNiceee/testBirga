import React, { useEffect } from 'react';
import cl from "./HappyHold.module.scss";
import { useLottie } from "lottie-react";
import chemodan from "../../animation/Chemodan.json"
import translation from '../../functions/translate';
import MainButton from '../../constants/MainButton';
const HappyHold = ({response ,task}) => {
    useEffect( () => {
        setTimeout( () => {
            MainButton.setText(translation("Перейти к заданию"))
        } , 500 )
        const menu = document.querySelector('.FirstMenu')
        menu.style.display = "none"
        return () => {
            menu.style.display = "flex"
        }

    } , [] )


    const options = {
        animationData: chemodan,
        loop: true,
        style: {
          display: "flex",
          justifyContent: "center",
          marginLeft: "auto",
          marginRight: "auto",
          width: "100px",
          marginBottom : "10px"
        },
      };

    const { View } = useLottie(options);
    return (
        <div className={cl.container}>
            <div className={cl.up}>
                {View}
                <h3>{translation("Успешно!")}</h3>
                {/* <h2>Ваше задание принятно в работу исполнителем {response.user.fl}</h2> */}
                <h2>{translation("Ваше задание принятно в работу исполнителем")} {response.user.fl}</h2>
            </div>
            <p className={cl.bottomBlock}>
                <span>{task.tonValue} TON</span>  {translation("были захолдированы до конца выполнения задания")} 
            </p>
        </div>
    );
};

export default HappyHold;