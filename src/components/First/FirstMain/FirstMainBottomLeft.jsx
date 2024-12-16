import React, { memo } from 'react';
import SmallDimond from '../../UI/SmallDimond/SmallDimond';
import Text from '../../Text/Text';
import en from '../../../constants/language';
const textPrice = en ? 'USD' : "RUB"
const FirstMainBottomLeft = ({tonValue, tonConstant}) => {
    return (
        <div className="FirstMain__bottom-left">
        <div className="FirstMain__price-up">
          <p>{tonValue} USDT</p>
          <SmallDimond />
        </div>
        <div className='FirstMain__price-bottom'>
          <p>
            ~ {Number((tonValue * tonConstant).toFixed(0)).toLocaleString(
              "ru-RU"
            )}
          </p>
            <Text>
            {textPrice}
          </Text>
        </div>
      </div>
    );
};

export default memo(FirstMainBottomLeft);