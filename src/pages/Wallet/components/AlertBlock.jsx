import React, { memo } from 'react';
import cl from "../index.module.scss"
import translation from '../../../functions/translate';
const AlertBlock = () => {
    return (
    <div className={cl.alertBlock}>
        <p>{ translation("Обратите внимание!")}</p>
        <p>
           {translation("Убедитесь, что вы переводите свои токены на правильный адрес и в правильную сеть (TON).")}
        </p>
      </div>
    );
};

export default memo(AlertBlock);