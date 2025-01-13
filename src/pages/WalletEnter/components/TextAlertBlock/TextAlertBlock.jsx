import React from 'react';
import cl from "./TextAlertBlock.module.scss"
import Text from '../../../../components/Text/Text';
const TextAlertBlock = () => {
    return (
    <div className={cl.textAlertBlock}>
        <Text>Обратите внимание!</Text>
        <Text>
          Если вы потеряете свою сид-фразу, вы не сможете восстановить кошелёк!
          Скопируйте сид-фразу и сохраните ее в безопасном месте
        </Text>
    </div>
    );
};

export default TextAlertBlock;