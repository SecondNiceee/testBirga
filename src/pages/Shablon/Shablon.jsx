import React, { useEffect, useState } from "react";
import TaskName from "../../components/UI/TaskName/TaskName";
import DescriptionAndPhoto from "../../components/UI/DescriptionAndPhoto/DescriptionAndPhoto";
import BackButton from "../../constants/BackButton";
import { useNavigate } from "react-router-dom";
import MainButton from "../../constants/MainButton";
import { useDispatch } from "react-redux";
import { postShablon, putShablon } from "../../store/shablon";
import sortFiles from "../../functions/sortFiles";

const Shablon = ({shablon, setShablon, setActive, put, ...props}) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  console.log(shablon )
  let localShablon = shablon
  function forward(){
    let myFormData = new FormData()
    // myFormData.append("userId" ,  window.Telegram.WebApp.initDataUnsafe.user.id )
    console.log(shablon.name)
    myFormData.append("name" , localShablon.name )
    myFormData.append("text" , localShablon.text)
    if (put){
      let filesArr = sortFiles(shablon.photosNames, shablon.photos)
      filesArr.addedArr.forEach((e, i) => {
        myFormData.append(`addFiles${i}` , e)
      })
      filesArr.removedArr.forEach((e, i) => {
        myFormData.append(`deleteFiles${i}` , e)
      })
      console.log(shablon)
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


  useEffect( () => {

    


    BackButton.show()
    MainButton.show()
    if (put){
      MainButton.setText('Изменить шаблон')
    }
    else{
      MainButton.setText('Добавить шаблон')
    }

    MainButton.onClick(forward)
    return () => {
      MainButton.offClick(forward)
      MainButton.hide()
    }
  }, [shablon])





  useEffect( () => {
    if (shablon.name.length < 3 || shablon.text.length < 5){
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


  return (
    <div {...props} className="shablon-wrapper">
      <h3 className="shablon-title">{put ? shablon.name : "Новый шаблон"}</h3>
      <button onClick={forward}>Сделать!</button>
      <TaskName
        className={"shablon-name"}
        title={"НАЗВАНИЕ ШАБЛОНА"}
        text={shablon.name}
        setText={(e) => {
          setShablon({ ...shablon, name: e });
        }}
        errorValue={false}
        underText={""}
        placeholder={"Введите название шаблона"}
      />
      <DescriptionAndPhoto
      className={'shablon-description'}
        text={shablon.text}
        setText={(e) => {
          setShablon({ ...shablon, text: e });
        }}
        photos={shablon.photos}
        setPhotos={(e) => {
          setShablon({ ...shablon, photos: e });
        }}
        textTitle={"ТЕКСТ ОТКЛИКА"}
        filesTitle={""}
        MyInformation={false}
        textPlaceholder={"Почему задание нужно доверить именно вам"}
      />

      <p className="shablon-notice">
        Расскажите о себе и своем опыте работы Прикрепите примеры
      </p>



    </div>
  );
};

export default Shablon;
