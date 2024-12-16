import React, { memo } from 'react';
import cl from "../index.module.scss"
const InformationBlock = () => {
    return (
        <div className={cl.informationBlock}>
        <p>
          Убедитесь, что вы выводите свои токены на правильный адрес и в
          правильную сеть (TON)
        </p>
      </div>
    );
};

export default memo(InformationBlock);