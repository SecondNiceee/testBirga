import React from 'react';
import galks from '../../../images/icons/Subtract.svg'
import userImage from "../../../images/userPhoto/user.png"
import Text from '../../Text/Text';
const Customer = ({customerName, rate, userPhoto, setProfile}) => {
    return (
        <div onClick={() => {
            setProfile(true)
        }} className = 'customerContainer'>
            <Text className='customer__up'>Заказчик</Text>
            <div className="customer__information">
                <img style={{
                    borderRadius : '50%',
                    objectFit : "cover"
                }} className='information-icon' src={userPhoto.length > 0 ? userPhoto : userImage} alt="" />
                <div className="customer__information-right">
                    <div className="customer__information-right-name">
                        <Text>{customerName.length > 15 ? 
                        customerName.substring(0, 13) + '..'
                        : 
                        customerName
                    }</Text>
                        <img src= {galks} alt="" />
                    </div>
                    <div className="customer__information-right-rate">
                        {/* <div className="customer__information-right-rate-images">
                                <img src={Star} alt="" />
                                <img src={Star} alt="" />
                                <img src={Star} alt="" />
                                <img src={Star} alt="" />
                                <img src={Star} alt="" />
                        </div> */}
                        <Text className='rate'>Нет рейтинга</Text>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Customer;