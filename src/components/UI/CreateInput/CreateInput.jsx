import React, { forwardRef, memo } from 'react';
import cl from './CreateInput.module.css'
const CreateInput = forwardRef(({className , noLength = false, maxLength = false, value , setValue , type , inputMode, mistake = false,   ...props }, ref) => {
    return (
        <input maxLength={ !maxLength ? noLength ? 100 : 50 : maxLength} style={mistake ? {border : "1px solid #fe6766", color : "#fe6766" } : {}} ref={ref} inputMode={inputMode} spellCheck="false" autoComplete="off" value={value} onChange={(e) => {
            setValue(e.target.value)}} className = {className ? [cl.CreateInput , className].join(' ') : cl.CreateInput} type={type} {...props}  />
    );
});

    export default memo(CreateInput);