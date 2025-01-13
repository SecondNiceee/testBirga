import React from 'react';
import cl from './MethodPayment.module.css'
import valletIcon from '../../../images/icons/wallet.svg'
import upDown from '../../../images/icons/UpDown.svg'
import Text from '../../../components/Text/Text';
const PaymentMethod = ({className}) => {
    return (
        <div className={className ? [cl.PaymentMethod , className].join(' ') : cl.PaymentMethod}>
            <div className={cl.left}>
                <div className="block" style={{display : 'block' , lineHeight : 0}}>
                    <img style={ {margin : 0}}  src={valletIcon} alt="" />
                </div>
                <Text>Способ оплаты</Text>
            </div>
            <Text className={cl.link} >
                <Text>Wallet Pay</Text>
                <div className="block" style={{display : 'block', lineHeight : 0}}>
                    <img src={upDown} style={ {width : 'auto' , height : '13px'  }} alt="" />
                </div>
            </Text>
        </div>
    );
};

export default PaymentMethod;