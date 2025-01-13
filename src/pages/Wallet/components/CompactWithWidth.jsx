import React, { memo, useCallback, useEffect, useRef } from 'react';
import cl from "../index.module.scss"
import GreyText from '../../../components/UI/GreyText/GreyText';
import CreateInput from '../../../components/UI/CreateInput/CreateInput';
const CompactWithWidth = ({greyText, onChange,inputMistake = false, inputType = "text", inputMode = "text", inputValue, inputPlaceholder, className = ""}) => {
    const hiddenRef = useRef(null)
    const inputRef = useRef(null)
    useEffect( () => {
        function focusFunction(e){
            if (e.target.value === "0"){
                e.target.value = ""
            }
        }
        function blurFunction(e){
            if (e.target.value === ""){
                e.target.value = "0"
            }
        }
        // function changeHandler(e){
        //     if (e.target.value === ""){
        //         e.target.value = ""
        //     }
        //     console.log("change");
            
        // }
        
        inputRef.current.addEventListener('focus' ,focusFunction )
        inputRef.current.addEventListener('blur',blurFunction)
        // inputRef.current.addEventListener('input',changeHandler)
        return () => {
        } 
    } , [] )
    useEffect( () => {
        hiddenRef.current.textContent = inputValue !== "0" ? inputValue : "0"
        inputRef.current.style.width = inputValue !== "0" ?  hiddenRef.current.offsetWidth + "px" : "27px"
    } , [inputValue] )
    const clickHndler = useCallback( () => {
        inputRef.current.focus()
    } , [] )
    console.log('====================================');
    console.log(inputValue);
    console.log('====================================');
    return (
        <div className={[className, cl.adressBlock].join(' ')}>
                <p ref={hiddenRef} className={cl.hiddenText}>{inputValue}</p>
                <GreyText className={cl.GreyText} >
                    {greyText}
                </GreyText>           

                <div onClick={clickHndler}  style={inputMistake ? {border : "1px solid #fe6766"} : {}} className={cl.createWrapper}>
                    <CreateInput maxLength = {12}  mistake = {inputMistake}  className = {cl.newPadding} ref = {inputRef}  inputMode={inputMode} type={inputType} value={inputValue}  placeholder = {inputPlaceholder} setValue={onChange} />
                    <p style={inputMistake ? {color : "#fe6766"} : {}}>TON</p>
                </div>
        </div>
    );
};

export default memo(CompactWithWidth);