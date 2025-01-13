import { useEffect } from 'react';


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