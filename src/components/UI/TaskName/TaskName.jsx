import React, { useEffect, useMemo } from 'react';
import cl from './TaskName.module.css'
import GreyText from '../GreyText/GreyText';
import CreateInput from '../CreateInput/CreateInput';
import Text from '../../Text/Text';
import translation from '../../../functions/translate';
const menu = document.documentElement.querySelector(".FirstMenu")
const TaskName = ({className , text , title , setText , noLength = false, maxLength, errorValue , underText, placeholder,  ...props}) => {
    const place = useMemo( () => {
        return translation(placeholder)
    }  , [placeholder])
    console.warn(noLength)
    console.warn(maxLength)
    useEffect( () => {
    
        const input = document.querySelectorAll('input');
        const textarea  = document.querySelectorAll('textarea');
        for (let smallInput of input){
          smallInput.addEventListener('focus', () => {
            menu.style.display = 'none'; // скрываем меню
          });
          smallInput.addEventListener('blur', () => {
            menu.style.display = 'flex'; // скрываем меню
          });
        }
        for (let smallTextarea of textarea){
          smallTextarea.addEventListener('focus', () => {
            menu.style.display = 'none'; // скрываем меню
          });
          smallTextarea.addEventListener('blur', () => {
            menu.style.display = 'flex'; // скрываем меню
          });
        }
      } , [] )


    return (
        <div {...props} className = { className ? [ cl.TaskName, className].join(' ') : cl.TaskName}>
            <GreyText className={cl.GreyText}>{title}</GreyText>
            <CreateInput
            maxLength = {maxLength}
            noLength = {noLength}
             style = {errorValue
                ? {border : 'solid 1px #FF6767'}
                : {}
            } value={text}  setValue={ setText } className={cl.CreateInput} placeholder = {place} />
            <Text style={errorValue ? {color : '#FF6767',
                fontFamily : "SF Pro Display 400"
            } : {}}>
                {errorValue ?  'Название слишком короткое' :  underText}
            </Text>
        </div>
    );
};

export default TaskName;