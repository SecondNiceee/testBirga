import React, { memo, useMemo } from 'react';
import cl from './Pallete.module.css'
import PalleteImg from '../../../images/icons/TrulyDesign.svg'
import ItSvg from "../../../images/icons/IT.svg"
import MoreSvg from "../../../images/icons/More.svg"
const Pallete = ({className , category}) => {
    const imageSrc = useMemo( () => {
        switch (category){
            case 1 : 
                return MoreSvg
            case 2:
                return PalleteImg
            default :
                return ItSvg

        }
    } , [category]  )
    return (
        <div style={category === 2 ? {transform : "translateY(1px)"} : {}} className = {className ? [cl.Pallete , className].join(' ') : cl.Pallete}>
            <img src = {imageSrc} alt="" />
        </div>
    );
};

export default memo(Pallete);