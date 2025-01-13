import React, { useMemo } from 'react';
import cl from "./Stage.module.css"
import Text from '../../Text/Text';
import translation from '../../../functions/translate';
import en from '../../../constants/language';

const Stage = ({className, numberB}) => {
    const kk = useMemo(() => {
      if (!numberB || numberB === null){
        return translation("Не указан")
      }
      else{
        let number = String(numberB)
        if (!en){

            let numb = Number(number.slice(number.length - 1 , number.length))
            if ( Number(number) > 10 && Number(number) < 20){
                return " Лет"
              }
              else{
          
                  if (numb > 1 && numb < 5){
                    return " Года"
                  }
                  else{
                    if(numb === 1){
                      return " Год"
                    }
                    else{
                      return " Лет"
                    }
                  }
                }

        }
        else{
            if (Number(number) === 1){
              return " year"
            }
            else{
              return " years"
            }
        }
      }
    } , [numberB])
    return (
        <div className={ className ? [cl.main, className].join(' ') : cl.main}>
                <div style={!numberB ? {opacity : 0.5} : {}} className={cl.one}>
                    <Text>{!numberB ? translation("Не указан") : numberB}</Text>
                </div>
                {!numberB ? 
                <>
                </>
    :
                <div className={cl.two}>
                    <Text>{kk}</Text>
                </div>
                }
        </div>
    );
};

export default Stage;