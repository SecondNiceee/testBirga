import React, { memo } from 'react';
import cl from "./ListItem.module.scss"
const ListItem = ({number, name}) => {
    return (
      <div style={number > 9 ? {paddingLeft : "18px"} : {}} className={cl.listItem}>
        <p>{number}.</p>
        <p>{name}</p>
      </div>
    );
};

export default memo(ListItem);