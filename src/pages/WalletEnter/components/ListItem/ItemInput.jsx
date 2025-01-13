import React from 'react';
import cl from "./ListItem.module.scss"
const ItemInput = ({number}) => {
    return (
      <div style={number > 9 ? {paddingLeft : "18px"} : {}} className={cl.listItem}>
        <p>{number}.</p>
        <input type="text" />
      </div>
    );
};

export default ItemInput;