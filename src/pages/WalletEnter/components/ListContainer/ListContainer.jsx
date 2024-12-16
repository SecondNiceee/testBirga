import React from 'react';
import cl from "./ListContainer.module.scss"
import ListItem from '../ListItem/ListItem';
const ListContainer = ({keys}) => {
    
    return (
      <>
      {keys ? 

       <div className={cl.listContainer}>
        <div className={cl.list}>
            {keys.slice(0, 6).map((e, i) => 
            <ListItem key={i} number={i + 1} name={e} />
          )}
        </div>
        <div className={cl.list}>
            {keys.slice(6, 12).map((e, i) => 
            <ListItem key={i + 7} number={i + 7} name={e} />
          )}
        </div>
      </div>
      :
      <>
      </>
      }
      </>
    );
};

export default ListContainer;