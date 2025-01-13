import React, { memo, useEffect } from "react";
import TaskName from "../../components/UI/TaskName/TaskName";
import DescriptionAndPhoto from "../../components/UI/DescriptionAndPhoto/DescriptionAndPhoto";
import BackButton from "../../constants/BackButton";
import MainButton from "../../constants/MainButton";
import { useDispatch } from "react-redux";
import { postShablon, putShablon } from "../../store/shablon";
import sortFiles from "../../functions/sortFiles";
import Text from "../../components/Text/Text";
import translation from "../../functions/translate";


const menu = document.documentElement.querySelector(".FirstMenu")
const updateText = translation("Изменить шаблон")
const addText = translation("Добавить шаблон")
const Shablon = ({shablon, setShablon, setActive, put, isExitShow, exitText, mistakes, ...props}) => {
  const dispatch = useDispatch()
  let localShablon = shablon



  useEffect( () => {
    function forward(){
      let myFormData = new FormData()
      // myFormData.append("userId" ,  window.Telegram.WebApp.initDataUnsafe.user.id )
      myFormData.append("name" , String(localShablon.name.trim()) )
      myFormData.append("text" , String(localShablon.text.trim()))
      if (put){
        let filesArr = sortFiles(shablon.photosNames, shablon.photos)
        filesArr.addedArr.forEach((e, i) => {
          myFormData.append(`addFiles` , e)
        })
        filesArr.removedArr.forEach((e, i) => {
          myFormData.append(`deleteFiles[${i}]` , e)
        })
        dispatch(putShablon([myFormData , shablon.id, shablon]))
      }
      else{
        shablon.photos.forEach((e,i) => {
          myFormData.append("photos" , e)
        })
        // myFormData.append("photos" , shablon.photos)
        dispatch(postShablon([myFormData, shablon]))
      }
      setActive(false)
    }

    

    


    if (put){
      MainButton.setText(updateText)
    }
    else{
      MainButton.setText(addText)
    }

    MainButton.onClick(forward)
    return () => {
      MainButton.offClick(forward)

    }
  }, [shablon, dispatch, localShablon.name, localShablon.text, put, setActive , isExitShow , exitText])

  useEffect( () => {

    menu.classList.add("disappearAnimation")
    menu.classList.remove("appearAnimation")
    MainButton.show()
    BackButton.show()
    return () => {
      MainButton.setText(exitText)
      if (!isExitShow){
        menu.classList.add("appearAnimation")
        menu.classList.remove("disappearAnimation")
        MainButton.hide()
        
      }
      else{
        MainButton.setText(exitText)
      }
    }
  } , [exitText, isExitShow] )

  window.Telegram.WebApp.disableVerticalSwipes();



  useEffect( () => {
    if (shablon.name.length < 3 || shablon.text.length < 5 || shablon.text.length > 500){
      MainButton.setParams({
        is_active : false, //неизвесетно
        color : '#2f2f2f',
        text_color : '#606060',
      })

    }
    else{
      MainButton.setParams({
        is_active : true, //неизвесетно
        color : '#2ea5ff',
        text_color : '#ffffff'
      })
    }
  } , [shablon.name , shablon.text] )



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
    return () => {
      MainButton.setParams({
        color : '#2ea5ff',
        text_color : '#ffffff',
        is_active : true
      })
    }
  } , [] )


  return (
    <div {...props} className="shablon-wrapper">
      <Text className="shablon-title">{put ? shablon.name : "Новый шаблон"}</Text>
      {/* <button onClick={forward}>Сделать!</button> */}
      <TaskName
        
        className={"shablon-name"}
        title={"НАЗВАНИЕ ШАБЛОНА"}
        text={shablon.name}
        setText={(e) => {
          setShablon( (value ) => ({...value , name : e}) )
        }}
        errorValue={mistakes.name}
        underText={""}
        placeholder={translation("Введите название шаблона")}
      />
      <DescriptionAndPhoto
      textError = {mistakes.text}
      className={'shablon-description'}
        text={shablon.text}
        setText={(e) => {
          setShablon( (value ) => ({...value , text : e}) )
        }}
        photos={shablon.photos}
        setPhotos={(e) => {
          setShablon( (value ) => ({...value, photos :e}) )
        }}
        textTitle={"ТЕКСТ ОТКЛИКА"}
        filesTitle={""}
        MyInformation={false}
        textPlaceholder={translation("Почему задание нужно доверить именно вам")}
        
      />

      <Text className="shablon-notice">Расскажите о себе и своем опыте работы. Прикрепите примеры.</Text>



    </div>
  );
};

export default memo(Shablon);
