import React, { memo } from 'react';
import cl from "./Block.module.scss"
const Block = ({left , right, additionalText, className}) => {
    return (
        <div className={className ? [cl.container, className].join(' '): cl.container}>
            <p>{left}</p>
            <p>{right}</p>
        </div>
    );
};

export default memo(Block);