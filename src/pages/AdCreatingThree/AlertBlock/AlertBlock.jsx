import React, { useMemo } from 'react';
import cl from "./AlertBlock.module.scss"
import translation from '../../../functions/translate';
const AlertBlock = ({address, tonValue}) => {
    const text = useMemo( () => {
        if (!address){
            return translation(`Для выбора исполнителя необходимо создать Коннект Кошелёк (бесплатно) и пополнить его на стоимость заказа `) + `(${tonValue} TON)`
        }
        return translation("На вашем кошельке отсутствует сумма, необходимая для выбора исполнителя. Пополните кошелёк и попробуйте снова!")
    }  , [address, tonValue])
    return (
        <div className={cl.container}>
            <h4>Обратите внимание!</h4>
            <p>{text}</p>
        </div>
    );
};

export default AlertBlock;