import React from 'react';
import cl from "./TextAlertBlock.module.scss"
const TextAlertBlock = () => {
    return (
    <div className={cl.textAlertBlock}>
        <p>Обратите внимание!</p>
        <p>
          Если вы потеряете свою сид-фразу, вы не сможете восстановить кошелёк!
          Скопируйте сид-фразу и сохраните ее в безопасном месте
        </p>
    </div>
    );
};

export default TextAlertBlock;