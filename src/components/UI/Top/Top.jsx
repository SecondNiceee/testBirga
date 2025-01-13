import React, { memo } from 'react';
import Burger from '../Burger/Burger';
import { useSelector } from 'react-redux';
import cl from './Top.module.css'
import userPhoto from "../../../images/userPhoto/user.png"
const Top = ({setMenuActive , name , className, ...props}) => {
    const userInfo = useSelector(state => state.telegramUserInfo)
    return (
        <div {...props} className={className ? [cl.top , className].join(' ') : cl.top}>
            <Burger
                style = {
                    {
                        position : 'unset'
                    }
                }
                onClick={(e) => {
                setMenuActive(true);
                }}
            />
            <Text className={cl.MyAds}>{name}</Text>
            <img style={{objectFit : "cover"}} className={cl.topIcon} src={userInfo.photo.length > 0 ? userInfo.photo.split('https://').length === 2 ? userInfo.photo : `${process.env.REACT_APP_HOST}/${userInfo.id}/${userInfo.photo}` : userPhoto} alt="" />

        </div>
    );
};

export default memo(Top);