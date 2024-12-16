import React, { memo, useEffect, useState } from 'react';
import cl from './SavedProfile.module.css'
import AboutInfo from '../../../pages/MyAds/components/AboutInfo';
import AboutMain from '../../../pages/MyAds/components/AboutMain';
import Compact from '../../UI/Compact/Compact';
import Stage from '../../UI/Stage/Stage';
import MyLoader from '../../UI/MyLoader/MyLoader';
import ExampleWorks from '../../../pages/MyAds/components/ExampleWorks';
import makeNewFile from '../../../functions/newMakeFile';
import AboutTop from '../../../pages/MyAds/components/AboutTop';
import axios from 'axios';
const SavedProfile = ({responce, openFunc}) => {


    const [cards , setCards] = useState(null)
    useEffect( () => {
      async function getAllCards(){
        let localCards = []
        try{
  
          let allCards = await axios.get("https://www.connectbirga.ru/card/findByUser" , {
              params : {
                  userId : responce.user.id,
                  
              },
              headers : {
                "X-API-KEY-AUTH" : process.env.REACT_APP_API_KEY
              }
          })
  
          
          for (let e of allCards.data){
  
            let files = await makeNewFile(e.folder , e.photos)
            localCards.push({
                id : e.id,
                title : e.title,
                description : e.description,
                behanceLink : e.behance,
                dribbbleLink : e.dribble,
                dropfileLink : e.dropFile,
                photosNames : e.photos,
                photos : files
            })
          }
      
        return localCards
  
  
        }
        catch(e){
          window.Telegram.WebApp.showAlert(e)
          console.log(e)
        }
  
  
  
      }
      getAllCards().then((value) => {
        setCards(value)
      })
      // eslint-disable-next-line
    } , [])

    




    return (
        <div className={cl.wrapper}>
            <AboutTop responce={responce} />
            <AboutInfo responce={responce} />
            <AboutMain aboutU = {responce.user.about}  />
            <Compact className={"stage-compact"} title = {"Стаж работы"}>
                        <Stage number={responce.user.stage} />
            </Compact>
            {cards === null ? <MyLoader/> :
      <ExampleWorks openFunc = {openFunc} cards={cards}/>}
    
        </div>
    );
};

export default memo(SavedProfile);