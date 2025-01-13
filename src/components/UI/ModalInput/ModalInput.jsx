import React, { useEffect } from 'react';
import cl from './ModalInput.module.css'
import TaskName from '../TaskName/TaskName';
import BackButton from '../../../constants/BackButton';
const ModalInput = ( {setting , setModal, ...props} ) => {
    useEffect( () => {
        function back(){
            setModal(false)
        }
        const wrap = document.getElementById('modalInput')
        wrap.querySelector('input').focus()
        BackButton.onClick(back)
        return () => {
            BackButton.offClick(back)
        }
    } , [setModal] )
    return (
        <div {...props} id = 'modalInput' className={cl.modalInput}>
            <div  onClick={() => {
                setModal(false)
            }} className={cl.blackArea}></div>
            <TaskName
            maxLength={100}
            noLength = {true}
            underText={""}
            className={cl.modalTextName}
            text = {setting.text}
            title={''}
            setText={(e) => {
                setting.setText(e)
                setting.text = e
            }}
            placeholder={setting.placeholder}
             />
        </div>
    );
};

export default ModalInput;