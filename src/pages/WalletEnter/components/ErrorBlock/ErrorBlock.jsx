import React from 'react';
import cl from "./ErrorBlock.module.scss"
const ErrorBlock = () => {
    return (
        <div className={cl.container}>
            <p className={cl.text}>Некорректная сид-фраза. Проверьте ее и введите снова</p>
        </div>
    );
};

export default ErrorBlock;