import React from 'react';
import cl from "../index.module.scss"
import translation from '../../../functions/translate';
const StageOne = ({address}) => {
    return (
        <div className={cl.stage}>
        <div className={cl.circle}>
            <p className={cl.circleText}>1</p>
        </div>
        <p>
            {translation("Найдите свой адрес Коннект кошелька выше (начинается с")  }
            {address.slice(0, 2)}{")"} {translation("и скопируйте его")}
        </p>
    </div>
    );
};

export default StageOne;