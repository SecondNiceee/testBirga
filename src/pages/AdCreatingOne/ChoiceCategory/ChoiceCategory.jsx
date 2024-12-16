import React, { useEffect, useMemo, useState } from "react";
import cl from "./ChoiceCategory.module.css";
import OneInput from "../../../components/UI/OneInput/OneInput";
import CategoryItem from "../CategoryItem/CategoryItem";
import BackButton from "../../../constants/BackButton";
import MainButton from "../../../constants/MainButton";
import Text from "../../../components/Text/Text";
import translation from "../../../functions/translate";





const menu = document.documentElement.querySelector(".FirstMenu")
const place = translation("Поиск по категориям")
const ChoiceCategory = ({
  setTaskInformation,
  taskInformation,
  setCatagoryChoiceOpen,
  categorys,
  subCategorys,
  categoryOnly ,
  isBackHide = false,
  designOnly = false,
  text = "Прочие категории скоро появятся..",
  ...props
}) => {

  useEffect( () => {
    document.documentElement.style.overflowY = "hidden"
    return () => {
      document.documentElement.style.overflowY = "auto"
    }
  } , [] )
  
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

  useEffect( () => {
    MainButton.setParams({
      is_active: false, //неизвесетно
      color: "#2f2f2f",
      text_color: "#606060",
    });
    return () => {
      MainButton.setParams({
        color: "#2ea5ff",
        text_color: "#ffffff",
        is_active: true,
      });
    }
  } , []  )
  const [inputValue, setInputValue] = useState("");


  const realCategorys = useMemo( () => {
    if (!designOnly){
      return categorys
    }
    else{
      return [categorys.find(e => e.id === 2)]
    }
  } , [designOnly , categorys] )
  
  useEffect( () => {
    function closeFunction(){
      setCatagoryChoiceOpen(false)
    }
    BackButton.show()
    BackButton.onClick(closeFunction)
    return () => {
      BackButton.offClick(closeFunction)
      if (isBackHide){
        BackButton.hide()
      }
    }
    // eslint-disable-next-line
  } , [] )

  useEffect( () => {
    function closeCategory(){
      setCatagoryChoiceOpen(false)
    }
    BackButton.onClick( closeCategory )
    return () => {
      BackButton.offClick( closeCategory )
    }
  }, [setCatagoryChoiceOpen]  )


  const myFilteredCategory = useMemo( () => {
    return realCategorys.filter(e =>  translation(e.category).includes(inputValue))
  } , [realCategorys , inputValue] )
  

  return (
    <div className={cl.ChoiceCategory} {...props}>
      <OneInput
        placeholder={place}
        value={inputValue}
        setInputValue={setInputValue}
        className={cl.OneInput}
      />
      <div className={cl.categoryContainer}>

        {myFilteredCategory.map((e) => {
          return (
            <div
              onClick={() => {
                if(e.category === 'Другое'){
                    setTaskInformation({ ...taskInformation, category: e , subCategory : subCategorys.find(e => e.subCategory === 'Другое')});
                }
                else{
                  let sortedCategorys = subCategorys.filter(el => el.category.id === e.id)
                  setTaskInformation({ ...taskInformation, category: e , subCategory : sortedCategorys.find(e => e.subCategory === 'Другое')});
                }
                setCatagoryChoiceOpen(false);
              }}
              className={cl.wrap}
            >
              <CategoryItem {...e} />
            </div>
          );
        })}

      </div>
      <Text className={cl.anotherText}>{text}</Text>
    </div>
  );
};

export default ChoiceCategory;
