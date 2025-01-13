import React, { memo } from 'react';
import cl from "./InputBlock.module.scss"
const InputBlock = ({number, placeholder, index, onChange, value, mistake, className }) => {
    return (
        <div style = {mistake ? {border: "1px solid #fe6766"} : {}} className={className ? [cl.container, className].join(' ') : cl.container}>
            <p style = {mistake ? {color: "#fe6766"} : {}}>{number}.</p>
            <input value={value} maxLength={15} placeholder={placeholder} type="text" onChange={(e) => {
                onChange(e.target.value, index)
            }} />
        </div>
    );
};

export default memo(InputBlock);