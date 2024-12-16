import React, { memo } from 'react';
import cl from "../index.module.scss"
const AlertBlock = () => {
    return (
    <div className={cl.alertBlock}>
        <p>Обратите внимание!</p>
        <p>
          Убедитесь, то вы переводите свои токены на правильный адрес и в
          правильную сеть (TON)
        </p>
      </div>
    );
};

export default memo(AlertBlock);