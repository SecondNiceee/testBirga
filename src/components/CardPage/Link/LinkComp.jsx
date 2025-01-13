import React, { memo, useCallback, useMemo } from 'react';
import cl from './LinkComp.module.css'
import behanceIcon from "../../../images/icons/behance.svg";
import dripleIcon from "../../../images/icons/Dribble.svg";
import dropfileIcon from "../../../images/icons/Dropfile.svg";
import Text from '../../Text/Text';
import translation from '../../../functions/translate';
const Yes = translation("Да")
const No = translation("Нет")

const LinkComp = ({navigate, link, name}) => {
    const imageLink = useMemo( () => {
        switch (navigate){
            case "behance":
                return behanceIcon;

            case "driple":
                return dripleIcon;
            case "dropfile":
                return dropfileIcon
            default:
                window.Telegram.WebApp.showAlert("Что - то пошло не так")
        }
    } , [navigate] )
    const linkHandler = useCallback( (par) => {
        window.Telegram.WebApp
        .showPopup({
          title: translation("Перейти?"),
          message: translation(`Вы уверены, что хотите перейти по ссылке `) + par + `?`,
          buttons: [
            { id: "save", type: "default", text: Yes },
            { id: "delete", type: "destructive", text: No },
          ],
        } , (buttonId) => {
    
          if (buttonId === "delete" || buttonId === null) {
            
          }
          if (buttonId === "save") {
            window.Telegram.WebApp.openLink(link)
          }
    
    
        } )
    } , [link] )



    

    
    return (
        <div  onClick={(par) => {
            linkHandler(link)
        }} className={ [cl.cardsLink, cl.blue].join(' ')}>
            <img src={imageLink} alt="" />
            <Text>{name}</Text>
        </div>
    );
};

export default memo(LinkComp);