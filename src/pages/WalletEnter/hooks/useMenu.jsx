import React, { useEffect } from 'react';
import menu from '../../../constants/menu';

const useMenu = () => {
    useEffect( () => {
        const menu = document.querySelector(".FirstMenu")

        if (menu){
          menu.style.display = "none"
        }
        return () => {
          menu.style.display = "flex"
        }
      } , [] )
};

export default useMenu;