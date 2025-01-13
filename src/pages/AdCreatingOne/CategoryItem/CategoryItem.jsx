import React, { useMemo } from 'react';
import cl from './CategoryItem.module.css'
import '../../../images/icons/Palitra.png'
import designIcon from "../../../images/icons/TrulyDesign.svg"
import ItIcon from "../../../images/icons/IT.svg"
import MoreSvg from "../../../images/icons/More.svg"
import Text from '../../../components/Text/Text';
const CategoryItem = ({className , id , category  }) => {
    const imageSrc = useMemo( () => {
        switch (id){
            case 3:
                return ItIcon
            case 2: 
                return designIcon
            default :
                return MoreSvg
        }
    }  , [id])
    return (
        <div value = {id} className = {className ? [cl.CategoryItem , className].join(' ') : cl.CategoryItem }>
            <img src = {imageSrc}  alt="" />
            <Text>{category}</Text>
        </div>
    );
};

export default CategoryItem;