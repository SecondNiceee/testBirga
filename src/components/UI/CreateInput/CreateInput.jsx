import React, { forwardRef, memo } from 'react';
import cl from './CreateInput.module.css'
const CreateInput = forwardRef(({className , value , setValue , type , inputMode, mistake = false,   ...props }, ref) => {
    return (
        <input style={mistake ? {border : "1px solid #fe6766", color : "#fe6766" } : {}} ref={ref} inputMode={inputMode} spellCheck="false" autoComplete="off" value={value} onChange={(e) => {
            setValue(e.target.value)}} className = {className ? [cl.CreateInput , className].join(' ') : cl.CreateInput} type={type} {...props}  />
    );
});

    export default memo(CreateInput);