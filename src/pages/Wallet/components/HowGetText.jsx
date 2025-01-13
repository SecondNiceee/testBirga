import React, { memo } from 'react';
import cl from "../index.module.scss"
import Text from '../../../components/Text/Text';
const HowGetText = () => {
    return (
        <>

            <div className={cl.howGetText}>
            <Text>Как получить TON</Text>
            <Text>
                Отправьте монеты на указанный выше адрес, чтобы они стали доступны в
                кошельке.
            </Text>
            </div>

            <svg
            className={cl.line}
            width="328"
            height="2"
            viewBox="0 0 328 2"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            >
            <path
                d="M0.957031 1.20605H327.046"
                stroke="#4A6275"
                stroke-width="0.666667"
                stroke-linejoin="round"
                stroke-dasharray="4 4"
            />
            </svg>

        </>
    );
};

export default memo(HowGetText);