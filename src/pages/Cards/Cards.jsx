import React, { useCallback, useEffect, useRef, useState } from "react";
import TaskName from "../../components/UI/TaskName/TaskName";
import DescriptionAndPhoto from "../../components/UI/DescriptionAndPhoto/DescriptionAndPhoto";
import behanceIcon from "../../images/icons/behance.svg";
import dripleIcon from "../../images/icons/Dribble.svg";
import dropfileIcon from "../../images/icons/Dropfile.svg";
import BackButton from "../../constants/BackButton";
import MainButton from "../../constants/MainButton";
import { useDispatch, useSelector } from "react-redux";
import { CSSTransition } from "react-transition-group";
import ModalInput from "../../components/UI/ModalInput/ModalInput";
import Categories from "../AdCreatingOne/Categories/Categories";
import ChoiceCategory from "../AdCreatingOne/ChoiceCategory/ChoiceCategory";
import {  postCard } from "../../store/telegramUserInfo";
import Text from "../../components/Text/Text";
import translation from "../../functions/translate";
let localCardSetting;
let mainLocalErrors ;
let inputObject = {
  text : ''
}
const menu = document.documentElement.querySelector(".FirstMenu")
const textButton = translation("Добавить кейс")
const saveText = translation("Сохранить")
const Yes = translation("Да")
const No = translation("Нет")
const caseTtile = translation("НАЗВАНИЕ КЕЙСА")
const placeOne = translation("Придумайте название для нового кейса")
const placeTwo = translation("Опишите в чем особенность ваших работ")
const descriptionOfCase = translation("ОПИСАНИЕ КЕЙСА")
const Cards = ({ setCardsOpen, setAboutU, aboutU , save  }) => {

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


  const categorys = useSelector((state) => state.categorys.category);

  const subCategorys = useSelector((state) => state.categorys.subCategory);

  const dispatch = useDispatch()

  const [cardsSetting, setCardsSetting] = useState({
    title: "",
    description: "",
    photos: [],
    behanceLink: "",
    dribbbleLink: "",
    dropfileLink: "",
    category : categorys.find((e) => e.category === "Дизайн")
  });


  const [errors, setErrors] = useState({
    nameError: false,
    fileError: false,
    description : false,
  });
  const [modalActive , setModalActive] = useState(false)

  const [isCategoryChoiceOpen, setCatagoryChoiceOpen] = useState(false);


  mainLocalErrors = errors
  

  useEffect(() => {
      let photos = false;
      let title = false;
      let description = false;
      if (cardsSetting.title.length < 3) {
        title = true;
      }
      if (cardsSetting.photos.length < 1) {
        photos = true;
      }
      if (cardsSetting.description.length > 500){
        description = true
      }
      let localErrors = { nameError: title, fileError: photos, description : description };


      if (Object.values(mainLocalErrors).includes(true)){
        setErrors(localErrors)
      }





      
      if (!Object.values(localErrors).every(value => value === false))
        {
          if (!modalActive && !isCategoryChoiceOpen){

            MainButton.setParams({
                color : "#2f2f2f",
                text_color : "#606060",
                is_visible : true
            })
          }
        }
      else{
        if (!modalActive && !isCategoryChoiceOpen){

          MainButton.setParams({
              color : "#2EA6FF",
              text_color : "#ffffff",
              is_visible : true
          })
        }
      }
    

    
  }, [cardsSetting.title, cardsSetting.photos, cardsSetting.description, isCategoryChoiceOpen, modalActive]);




  localCardSetting = cardsSetting;

  function checkMistakes() {
    let fileError = false;
    let titleError = false;
    let description = false

    if (localCardSetting.title.length < 3) {
      titleError = true;
    }
    if (localCardSetting.photos.length < 1) {
      fileError = true;
    }
    if (localCardSetting.description.length > 500){
      window.Telegram.WebApp.showAlert("У вашего описания более 500 символов")
      description = true
    }
    setErrors({ fileError: fileError, nameError: titleError, description : description });
    let localErrors = { fileError: fileError, nameError: titleError, description : description };

    return Object.values(localErrors).every((value) => value === false);
  }





  window.Telegram.WebApp.disableVerticalSwipes();

  const saveFunc = useCallback( () => {
    if (checkMistakes()) {
      setAboutU({ ...aboutU, cards: [...aboutU.cards, localCardSetting] });
      // dispatch(addCard(localCardSetting));


      let myFormData = new FormData()
      myFormData.append("categoryId", String(localCardSetting.category.id))
      myFormData.append("title" , String(localCardSetting.title).trim())
      myFormData.append("description" , String(localCardSetting.description.trim()))
      myFormData.append("behance" , String(localCardSetting.behanceLink.trim()))
      myFormData.append("dribble" , String(localCardSetting.dribbbleLink.trim()))
      myFormData.append("dropFile" , String(localCardSetting.dropfileLink.trim()))

      localCardSetting.photos.forEach(e => {
        myFormData.append('photos' , e)
      })


      dispatch( postCard([myFormData , aboutU.userId, localCardSetting] ))
      // document.documentElement.style.overflow = "auto";
      setCardsOpen(false);
    }
    else{
      window.Telegram.WebApp.HapticFeedback.notificationOccurred("error")
      MainButton.setParams({
        color : "#2f2f2f",
        text_color : "#606060",
        is_visible : true
    })
    }
    // eslint-disable-next-line
  } , [dispatch, setCardsOpen, aboutU, setAboutU , cardsSetting] )


  const backFunc = useCallback( () => {
    // document.documentElement.style.overflow = "auto";
  
    window.Telegram.WebApp
    .showPopup({
      title: translation("Сохранить?"),
      message: translation(`Сохранить новый кейс?`),
      buttons: [
        { id: "save", type: "default", text: Yes },
        { id: "delete", type: "destructive", text: No },
      ],
    } , (buttonId) => {

      if (buttonId === "delete") {
        setCardsOpen(false);
      }
      if (buttonId === "save") {
        if (checkMistakes()){
          saveFunc()
        }
        else{
          window.Telegram.WebApp.HapticFeedback.notificationOccurred("error")
        }
      }


    } )
  } , [setCardsOpen, saveFunc] )

  const mainRef = useRef(null)
  useEffect( () => {            
    MainButton.setText(textButton);
    BackButton.show()
    if (!modalActive && !isCategoryChoiceOpen){
      menu.classList.add("disappearAnimation")
      menu.classList.remove("appearAnimation")
      MainButton.show()
      MainButton.onClick(saveFunc);
      BackButton.onClick(backFunc);
      mainRef.current.style.overflow = "scroll"
    }
    else{
      mainRef.current.style.overflow = "hidden"
      menu.classList.add("appearAnimation")
      menu.classList.remove("disappearAnimation")
      MainButton.hide()
      BackButton.offClick(saveFunc)
    }
    return () => {
        // MainButton.hide()
        MainButton.offClick(saveFunc)
        BackButton.offClick(backFunc);
        // MainButton.onClick(save)
        
        
      };
  }, [modalActive, backFunc, save, saveFunc, isCategoryChoiceOpen] )


  useEffect( () => {
    return () => {
      MainButton.setText(saveText)
    }
  } , [] )





  return (
    <div className="cards" ref={mainRef}>
      <Text className="cards-title">Новый кейс</Text>

      <Categories className='cards-categorys' categoryOnly={true}  taskInformation={localCardSetting} setCatagoryChoiceOpen={setCatagoryChoiceOpen}  />



      {/* <button onClick={() => {
                                setAboutU({...aboutU, cards : [...aboutU.cards , cardsSetting] })
                                dispatch(addCard(cardsSetting))
                                setCardsOpen(false)

            }}>Сохранить</button> */}
      <TaskName
        placeholder={placeOne}
        className={"cards-taskName"}
        title={caseTtile}
        text={cardsSetting.title}
        description={cardsSetting.description}
        setText={(e) => {
          setCardsSetting({ ...cardsSetting, title: e });
        }}
        errorValue={errors.nameError}
        underText={""}
      />

      <DescriptionAndPhoto
        fileError={errors.fileError}
        className={"cards-descriptionAndPhoto"}
        text={cardsSetting.description}
        textPlaceholder={placeTwo}
        setText={(e) => {
          setCardsSetting({ ...cardsSetting, description: e });
        }}
        setPhotos={(e) => {
          setCardsSetting( (value) =>  ({ ...value, photos: e }));
        }}
        photos={cardsSetting.photos}
        MyInformation={false}
        textTitle={descriptionOfCase}
        filesTitle={""}
      />
      <Text className="cards-underText">
        Расскажите о себе и своем опыте работы. Прикрепите релевантные примеры.
      </Text>





      <div className="cards-links">
      <div className="behans-link cards-link" onClick={
          () => {
            inputObject = {
              text : cardsSetting.dropfileLink,
              setText : function(e){
                setCardsSetting({...cardsSetting , dropfileLink : e})
              },
              placeholder : translation('Вставте ссылку на кейс в Dropfile'),
            }
            setModalActive(true)
          }
        }>
          <img src={dropfileIcon} alt="" />
          <Text>{'Ссылка на Dprofile'}</Text>
        </div>
        <div className="behans-link cards-link" onClick={
          () => {
            inputObject = {
              text : cardsSetting.behanceLink,
              setText : function(e){

                setCardsSetting({...cardsSetting , behanceLink : e})
              },
              placeholder : translation('Вставте ссылку на кейс в Behance'),
            }
            setModalActive(true)
          }
        }>
          <img src={behanceIcon} alt="" />
          <Text>{'Ссылка на Behance'}</Text>
        </div>
        <div className="behans-link cards-link" onClick={
          () => {
            inputObject = {
              text : cardsSetting.dribbbleLink,
              setText : function(e){
                setCardsSetting({...cardsSetting , dribbbleLink : e})
              },
              placeholder : translation('Вставте ссылку на кейс в Dribble'),
            }
            setModalActive(true)
          }
        }>
          <img src={dripleIcon} alt="" />
          <Text>{'Ссылка на Dribbble'}</Text>
        </div>

      </div>

      <CSSTransition
              mountOnEnter
              unmountOnExit
              classNames={'inputModal'}
              in = {modalActive}
              timeout={200}
      >
        <ModalInput style = {mainRef.current && {top : String(mainRef.current.scrollTop) + "px"}}  setModal={setModalActive} setting={inputObject} />
      </CSSTransition>


      <CSSTransition
        classNames={"modal"}
        in={isCategoryChoiceOpen}
        timeout={0}
        mountOnEnter
        unmountOnExit
      >
          <ChoiceCategory
            designOnly = {true}
            isBackHide = {false}
            taskInformation={localCardSetting}
            setTaskInformation={setCardsSetting}
            setCatagoryChoiceOpen={setCatagoryChoiceOpen}
            categorys = {categorys}
            subCategorys={subCategorys}
            text={translation("Пока что можно создать карточки только с дизайном..")}
          />
      </CSSTransition>


    </div>

    
  );
};

export default Cards;
