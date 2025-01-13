import React from 'react';
import cl from "../index.module.scss"
import translation from '../../../functions/translate';
const BalanceAlert = () => {
    return (
    <div className={ [cl.alertBlock, cl.latter].join(' ')}>
        <p>{translation("Баланс обновляется!")}</p>
        <p>
            { translation("После успешной транзакции, баланс может быть изменен вплоть до 10 минут.") }
        </p>
      </div>
    );
};

export default BalanceAlert;