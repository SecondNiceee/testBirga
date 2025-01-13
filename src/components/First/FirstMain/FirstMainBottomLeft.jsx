import React, { memo } from 'react';
import Text from '../../Text/Text';
import en from '../../../constants/language';
import TonIcon from "../../../images/icons/RealTon.svg"
const textPrice = en ? 'USD' : "RUB"
const FirstMainBottomLeft = ({tonValue, tonConstant}) => {
    return (
        <div className="FirstMain__bottom-left">
        <div className="FirstMain__price-up">
          <p>{tonValue} TON</p>
          <img src={TonIcon} alt="" />
        </div>
        <div className='FirstMain__price-bottom'>
          <p>
            ~ {Number((tonValue * tonConstant).toFixed(2)).toLocaleString(
              "ru-RU"
            ).replace(',', '.')}
          </p>
            <Text>
            {textPrice}
          </Text>
        </div>
      </div>
    );
};

export default memo(FirstMainBottomLeft);