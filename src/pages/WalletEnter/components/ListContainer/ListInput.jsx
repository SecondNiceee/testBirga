import React from 'react';
import cl from "./ListContainer.module.scss"
import InputBlock from '../InputBlock/InputBlock';

const arr1 = [1, 2,3, 4,5,6, 7 , 8 ,9, 10, 11, 12]
const ListInput = ({className, inputClassName = "", inputs , setSomeInput}) => {
    
    return (
    <div className={className ? [cl.listContainer, className].join(' ') : className } >
        {arr1.map((e,i) => 
            <InputBlock value={inputs[i]} onChange={setSomeInput} className = {inputClassName} index={i} mistake={false} number={e} />
        )}
      </div>
    );
};

export default ListInput;