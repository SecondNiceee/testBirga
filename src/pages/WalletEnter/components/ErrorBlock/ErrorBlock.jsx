import React from 'react';
import cl from "./ErrorBlock.module.scss"
import Text from '../../../../components/Text/Text';
const ErrorBlock = () => {
    return (
        <div className={cl.container}>
            <Text className={cl.text}>Некорректная сид-фраза. Проверьте ее и введите снова</Text>
        </div>
    );
};

export default ErrorBlock;