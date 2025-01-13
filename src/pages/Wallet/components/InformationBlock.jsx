import React, { memo } from 'react';
import cl from "../index.module.scss"
import Text from '../../../components/Text/Text';
const InformationBlock = () => {
    return (
        <div className={cl.informationBlock}>
        <Text>
          Убедитесь, что вы выводите свои токены на правильный адрес и в
          правильную сеть (TON).
        </Text>
      </div>
    );
};

export default memo(InformationBlock);