import React, { memo, useEffect, useMemo } from "react";
import cl from "./CardPage.module.css";
import InnerCase from "../../components/CardPage/InnerCase/InnerCase";
import FullDescription from "../../components/First/FirstDetails/FullDescription";
import LinkComp from "../../components/CardPage/Link/LinkComp";
import MainButton from "../../constants/MainButton";
const menu = document.documentElement.querySelector(".FirstMenu")
const CardPage = ({ card , ...props }) => {
    window.Telegram.WebApp.disableVerticalSwipes();

    useEffect( () => {
    
      const input = document.querySelectorAll('input');
      const textarea  = document.querySelectorAll('textarea');
      for (let smallInput of input){
        smallInput.addEventListener('focus', () => {
          menu.style.display = 'none'; // скрываем меню
        });
        smallInput.addEventListener('blur', () => {
          menu.style.display = 'flex'; // скрываем меню
        });
      }
      for (let smallTextarea of textarea){
        smallTextarea.addEventListener('focus', () => {
          menu.style.display = 'none'; // скрываем меню
        });
        smallTextarea.addEventListener('blur', () => {
          menu.style.display = 'flex'; // скрываем меню
        });
      }
    } , [] )


    const linksComponents = useMemo( () => {
            return (
            <div  className={cl.cardsLinks}>
            {card.behanceLink.length > 0 ? 
                <LinkComp navigate={"behance"} link={card.behanceLink}  />
                :
                <></>
            }

            {card.dribbbleLink.length > 0 ? 
                <LinkComp navigate={"driple"} link={card.dribbbleLink}  />
                :
                <></>
            }

            {card.dropfileLink.length > 0 ? 
            <LinkComp navigate={"dropfile"} link={card.dropfileLink}  />
            :
            <></>
    }




            
            </div>
        )
    } , [card.dropfileLink, card.behanceLink , card.dribbbleLink] )

  return (
    <div {...props} className={cl.wrapper}>
      <InnerCase
        task={card}
        title={card.title}
        description={card.description}
        photos={card.photos}
      />
      <FullDescription style = {{
        marginTop : "8px"
      }}  fullDescription={card.description} />
      {card.dropfileLink.length > 0}
      {linksComponents}
      
    </div>
  );
};

export default memo(CardPage);
