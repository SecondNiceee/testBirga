import React, { useEffect, useMemo, useState } from 'react';

import rightArrow from '../../images/icons/rightArrow.svg'
import OneInput from '../../components/UI/OneInput/OneInput';
import BackButton from '../../constants/BackButton';
import MainButton from '../../constants/MainButton';
import Text from '../../components/Text/Text';
import translation from '../../functions/translate';
const menu = document.documentElement.querySelector(".FirstMenu")
const place = translation("Поиск по подкатегориям")
const ChoiceSubCategory = ({taskInformation , setSubcategoryChoiceOpen , setTaskInformation, subCategorysPar, ...props}) => {

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

    useEffect( () => {
        function closeFunction(){
          setSubcategoryChoiceOpen(false)
        }
        BackButton.show()
        BackButton.onClick(closeFunction)
        return () => {
          BackButton.offClick(closeFunction)
        }
        // eslint-disable-next-line
      } , [] )

    const subCategorys = useMemo( () => {
        let subCategorysCopy = []
        if (taskInformation.category.category !== "Другое"){
    
            subCategorysCopy = [...subCategorysPar].filter(e => e.category.id === taskInformation.category.id && e.subCategory !== 'Другое')
            subCategorysCopy.push(subCategorysPar.find(e => taskInformation.category.id === e.category.id && e.subCategory === 'Другое'))
        }
        else{

            subCategorysCopy.push(subCategorysPar.find(e => taskInformation.category.id === e.category.id && e.subCategory === 'Другое'))

        }
        return subCategorysCopy
    } , [subCategorysPar, taskInformation] )



    const [inputValue , setInputValue] = useState('')

    // const sortSubCategory = useMemo(() => {
    //         let n = subCategory.filter((e) => {
    //                 return (e.includes(inputValue))
    //         } )
    //         return n
    
    // } , [inputValue, subCategory ]    )

    function closeSebCategory(){
        setSubcategoryChoiceOpen(false)
    }

    useEffect( () => {
        BackButton.onClick(closeSebCategory)
        return () => {
            BackButton.offClick(closeSebCategory)
        }
    } )


    const filteredSubCategorys = useMemo( () => {
      return subCategorys.filter( e => translation(e.subCategory).includes(inputValue) )
    } , [inputValue , subCategorys] )

    return (
    <div className="subCategory__container" {...props}>
      <OneInput
        placeholder={place}
        inputValue={inputValue}
        setInputValue={setInputValue}
        className='subCategory__oneInput'
      />
      <div className="sub__block" style={{
        paddingBottom : "20px"
      }}>
            <div className="sub__wrapper">
                    {filteredSubCategorys.map((e, id) => {
                        return (
                            <div key={id}  className="SubBlock" onClick={() => {
                        
                                    setTaskInformation( {...taskInformation , subCategory : e})
                                    setSubcategoryChoiceOpen(false)}} >

                                    <Text>{e.subCategory}</Text>
                                    <img className='arrowRight' src={rightArrow} alt="" />
                            </div>
                        )
                    })}
            </div>
      </div>
    </div>
    );
};

export default ChoiceSubCategory;