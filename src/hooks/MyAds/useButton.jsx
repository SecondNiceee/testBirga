import {  useEffect, useMemo } from "react";
import BackButton from "../../constants/BackButton";
import MainButton from "../../constants/MainButton";
import translation from "../../functions/translate";
import { useSelector } from "react-redux";
import { compareTwoObject } from "../../pages/MyAds/components/compareTwoObject";
const menu = document.documentElement.querySelector(".FirstMenu")




const choiceText = translation("Выбрать исполнителя")
 
export const useButton = ({
  isOpen,
  details,
  secondPage,
  myResponse,
  checkMistakes,
  buyPage,
  happyHold,
  walletH,
  putTask,
  writeFucntion,
  goBack,
  showDetails,
  myAdOneAdvertisement
}) => {

  const balance = useSelector(state => state.balance.value)


    
  const perventValue = useMemo( () => {
    return  Number((Number(myAdOneAdvertisement.tonValue) * 0.04).toFixed(3))
  }, [myAdOneAdvertisement.tonValue] ) 
  
  const rezult = useMemo( () => {
    return  Number(myAdOneAdvertisement.tonValue) + perventValue + 0.02
  }, [perventValue, myAdOneAdvertisement.tonValue] )






  


  useEffect(() => {

    
    if (!walletH){

    
      
      BackButton.show();

      if (isOpen.isActive) {

        menu.classList.add("disappearAnimation")
        menu.classList.remove("appearAnimation")
        MainButton.show();
        MainButton.setParams({
          color: "#2ea5ff",
          text_color: "#ffffff",
          is_active: true,
        });
        MainButton.onClick(writeFucntion);
        if (( myAdOneAdvertisement.status === "inProcess" || myAdOneAdvertisement.status === "completed") && !happyHold ){
          MainButton.hide()
        }
        if (!buyPage){
            MainButton.setText(choiceText);
        }
        else{
          if (happyHold){
            MainButton.setText(translation("Перейти к заданию"))
          }
          else{
            if (Number(balance) < rezult){
              MainButton.setText(translation("КОШЕЛЕК"))
            }
            else{
              if (happyHold){
                MainButton.setText(translation("Перейти к заданию"))
              }
              else{
                MainButton.setText(translation("ЗАХОЛДИРОВАТЬ"))

              }

            }
          }
        }
      } else {
        MainButton.offClick(writeFucntion);
        if (!myResponse.isOpen && !showDetails && !happyHold ) {
          menu.classList.add("appearAnimation")
          menu.classList.remove("disappearAnimation")
          MainButton.hide();
        }
      }
  
  
      if (showDetails) {
        MainButton.setText(translation("ОБНОВИТЬ"));
        if (!compareTwoObject(secondPage.task, details.task)) {
          menu.classList.add("disappearAnimation")
          menu.classList.remove("appearAnimation")
          MainButton.show();
          MainButton.setParams({
            color: "#2ea5ff",
            text_color: "#ffffff",
            is_active: true,
          });
          
  
          if (checkMistakes(details, false)) {
            MainButton.setParams({
              color: "#2ea5ff",
              text_color: "#ffffff",
              is_active: true,
            });
          } else {
            MainButton.setParams({
              is_active: false, //неизвесетно
              color: "#2f2f2f",
              text_color: "#606060",
            });
          }
          MainButton.offClick(putTask)
          MainButton.onClick(putTask);
        }
        else{
          menu.classList.add("disappearAnimation")
          menu.classList.remove("appearAnimation")
            MainButton.show()
            MainButton.setParams({
              is_active: false, //неизвесетно
              color: "#2f2f2f",
              text_color: "#606060",
            });
            MainButton.offClick(putTask)
        }
      } else {
        if (!isOpen.isActive && !myResponse.isOpen && !happyHold){
          menu.classList.add("appearAnimation")
          menu.classList.remove("disappearAnimation")
          MainButton.hide();
          MainButton.offClick(putTask)
          MainButton.setParams({
            is_active: false, //неизвесетно
            color: "#2f2f2f",
            text_color: "#606060",
          });
        }
      }
  
      BackButton.onClick(goBack);
    }
    else{
      menu.classList.add("appearAnimation")
      menu.classList.remove("disappearAnimation")
    }
    if (happyHold){
      MainButton.setText(translation("Перейти к заданию"))
    }
    

    return () => {
      MainButton.setParams({
        color: "#2ea5ff",
        text_color: "#ffffff",
        is_active: true,
      });
      BackButton.offClick(goBack);
      MainButton.offClick(writeFucntion);
      MainButton.offClick(putTask)
    };

    // eslint-disable-next-line
  } );
};
