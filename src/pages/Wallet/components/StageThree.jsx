import React from 'react';
import cl from "../index.module.scss"
const StageThree = () => {
    return (
        <div className={cl.stage}>
        <div className={cl.circle}>
            <p className={cl.circleText}>3</p>
        </div>
        <p>
            Вставьте скопированный адрес выше и нажмите CONTINUE. Подтвердите
            транзакцию
        </p>
    </div>
    );
};

export default StageThree;