import React, { memo } from 'react';
import formatDate from '../../../functions/makeDate';
import Text from '../../Text/Text';

const FirstMainMiddle = ({time}) => {
    return (
        <div className="FirstMain__middle">
        <Text>Дедлайн: </Text>
        <p>{formatDate(time.end, true)}</p>

      </div>
    );
};

export default memo(FirstMainMiddle);