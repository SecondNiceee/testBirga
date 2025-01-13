import React from 'react';
import cl from "../index.module.scss"
import translation from '../../../functions/translate';
import Text from '../../../components/Text/Text';
export const clickHandler = () => {
    window.Telegram.WebApp.openTelegramLink("https://t.me/wallet/start");
}
const StageTwo = () => {

    
    return (
    <div className={cl.stage}>
        <div className={cl.circle}>
            <p className={cl.circleText}>2</p>
        </div>
        <div className={cl.stageWithButton}>
            <p>
            { translation("Перейдите в ")} <span onClick={clickHandler} className={cl.blue}>Wallet.</span> {translation("Выберите Отправить -> Внешний кошелек -> Toncoin")}

            </p>
            <button onClick={clickHandler}>
                <Text>Купить на Wallet</Text>
                <svg
                    width="10"
                    height="10"
                    viewBox="0 0 10 10"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                    d="M9.89611 7.12454L9.88997 0.964252C9.88997 0.53475 9.60773 0.240234 9.16596 0.240234H2.99953C2.5823 0.240234 2.29392 0.553157 2.29392 0.921302C2.29392 1.28331 2.60685 1.58396 2.98113 1.58396H5.18386L7.78541 1.49806L6.66871 2.47978L0.845887 8.30874C0.704765 8.456 0.625 8.6278 0.625 8.7996C0.625 9.16161 0.95633 9.50521 1.33061 9.50521C1.50241 9.50521 1.67421 9.43158 1.82147 9.29046L7.65043 3.4615L8.64442 2.34479L8.54011 4.83591V7.14295C8.54011 7.52336 8.84076 7.84242 9.21504 7.84242C9.58319 7.84242 9.89611 7.5295 9.89611 7.12454Z"
                    fill="white"
                    />
                </svg>
            </button>
        </div>
    </div>
    );
};

export default StageTwo;