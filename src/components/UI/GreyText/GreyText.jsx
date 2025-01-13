import React, { memo } from 'react';
import cl from './GreyText.module.css'
import Text from '../../Text/Text';
const GreyText = ({className , children, ...props}) => {
    return (
        <Text {...props} className= { className ? [cl.GreyText , className].join(' ') : cl.GreyText}>{children}</Text>
    );
};

export default memo(GreyText);