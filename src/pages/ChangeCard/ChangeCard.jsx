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
import ChoiceCategory from "../AdCreatingOne/ChoiceCategory/ChoiceCategory";
import { putCard } from "../../store/telegramUserInfo";
import sortFiles from "../../functions/sortFiles";
import Text from "../../components/Text/Text";
import translation from "../../functions/translate";

let localCardSetting;
let mainLocalErrors;
let inputObject = {
  text: "",
};
let cardStart;
const menu = document.documentElement.querySelector(".FirstMenu")
const changeText = translation("Изменить кейс")
const saveText = translation("Сохранить")
const Yes = translation("Да")
const No = translation("Нет")
const ChangeCards = ({save, setCardsOpen, setAboutU, index, card, aboutU }) => {


  // useEffect( () => {
  //   document.documentElement.style.overflow = 'hidden'
  //   return () => {
  //      document.documentElement.style.overflow = 'auto'
  //   }
  // } , [] )
  useEffect(  () => {

    cardStart =  Object.assign({}, card);
  } , [card])

  window.Telegram.WebApp.disableVerticalSwipes();
  
  const [cardsSetting, setCardsSetting] = useState(Object.assign({}, card));


  console.log(cardsSetting)
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({
    nameError: false,
    fileError: false,
    descriptionError : false
  });

  const [modalActive, setModalActive] = useState(false);

  const [isCategoryChoiceOpen, setCatagoryChoiceOpen] = useState(false);

  const subCategorys = useSelector((state) => state.categorys.subCategory);

  const categorys = useSelector((state) => state.categorys.category);

  localCardSetting = cardsSetting;
  mainLocalErrors = errors;


  const compare2Objects = useCallback( (a , b) => {
    if (a.title !== b.title){
      return false
    }
    if (a.description !== b.description){
      return false
    }
    if (a.behanceLink !== b.behanceLink){
      return false
    }
    if (a.dribbbleLink !== b.dribbbleLink){
      return false
    }
    if (a.dropfileLink !== b.dropfileLink){
      return false
    }
    if (a.photos.length !== b.photos.length){
      return false
    }
    for (let i = 0; i < a.photos.length; i++){
      if (a.photos[i].name !== b.photos[i].name){
        return false
      }
    }
    return true

  }  , [])

  useEffect(() => {
    let photos = false;
    let title = false;
    let description = false
    if (cardsSetting.title.length < 3) {
      title = true;
    }
    if (cardsSetting.photos.length < 1) {
      photos = true;
    }
    if (cardsSetting.description.length > 500){
      description = true
    }
    let localErrors = { nameError: title, fileError: photos , descriptionError : description };

    if (Object.values(mainLocalErrors).includes(true)) {
      setErrors(localErrors);
    }

    if (!Object.values(localErrors).every((value) => value === false)) {
      MainButton.setParams({
        is_active: false, //неизвесетно
        color: "#2f2f2f",
        text_color: "#606060",
      });
    } else {

      if (!modalActive && !isCategoryChoiceOpen){
        if (compare2Objects(cardsSetting, card)){
          console.log("Я тут")
          MainButton.setParams({
            is_active: false, //неизвесетно
            color: "#2f2f2f",
            text_color: "#606060",
          });
        }
        else{
          console.log("Сравнение не сработало")
          MainButton.setParams({
            color: "#2ea5ff",
            text_color: "#ffffff",
            is_active: true,
          });
        }
      }
      else{
      }

  
      
  }}, [cardsSetting.title, cardsSetting.photos, cardsSetting.description, modalActive, isCategoryChoiceOpen , card, cardsSetting, compare2Objects]);




  const mainRef = useRef(null)


  useEffect(() => {


    function checkMistakes() {
      let fileError = false;
      let titleError = false;
      let descriptionError = false;
  
      if (localCardSetting.title.length < 3) {
        titleError = true;
      }
      if (localCardSetting.photos.length < 1) {
        fileError = true;
      }
      if (localCardSetting.description.length > 500){
        window.Telegram.WebApp.showAlert("У вашего описания более 500 символов")
        descriptionError = true
      }
      setErrors({ fileError: fileError, nameError: titleError, descriptionError : descriptionError });
      let localErrors = { fileError: fileError, nameError: titleError, descriptionError : descriptionError };
      return Object.values(localErrors).every((value) => value === false);
    }


    
  function saveFunc() {
    if (checkMistakes()) {
      // setAboutU({
      //   ...aboutU,
      //   cards: [
      //     ...aboutU.cards.map((e, i) => {
      //       if (i === index) {
      //         return localCardSetting;
      //       } else {
      //         return e;
      //       }
      //     }),
      //   ],
      // });
      
      let myFormData = new FormData()
      myFormData.append("title" , String(localCardSetting.title).trim())
      myFormData.append("description" , String(localCardSetting.description.trim()))
      myFormData.append("behance" , String(localCardSetting.behanceLink.trim()))
      myFormData.append("dribble" , String(localCardSetting.dribbbleLink.trim()))
      myFormData.append("dropFile" , String(localCardSetting.dropfileLink.trim()))
      
      let files = sortFiles(cardsSetting.photosNames , cardsSetting.photos)
      files.addedArr.forEach((e,i) => {
        myFormData.append(`addFiles` , e)
      })
      files.removedArr.forEach( (e, i )  => {
        myFormData.append(`deleteFiles[${i}]` , e)
      })
      dispatch(putCard([myFormData, localCardSetting.id, cardsSetting]))
      // localCardSetting.photos.forEach(e => {
      //   myFormData.append('photos' , e)
      // })

      // dispatch(changeCards({ id: index, card: localCardSetting }));
      // document.documentElement.style.overflow = "auto";
      setCardsOpen(false);
    }
    else{
      window.Telegram.WebApp.HapticFeedback.notificationOccurred("error")
    }
  }
                                      
    function compareTwo(a1 ,a2){
      if (JSON.stringify(a1) !== JSON.stringify(a2)){
          return false 
      }
      if (a1.photos.length !== a2.photos.length ){
        return false
      }
      for (let i = 0; i < a1.photos.length;i++){
        if (a1.photos[i].name !== a2.photos[i].name){
          return false
        }
      }
      return true
    }
    
    function backFunc() {
      if (!compareTwo(cardsSetting, cardStart)){

        window.Telegram.WebApp
        .showPopup({
          title: translation("Изменить?"),
          message: translation(`Изменить этот кейс?`),
          buttons: [
            { id: "save", type: "default", text: Yes },
            { id: "delete", type: "destructive", text: No },
          ],
        } , (buttonId) => {
    
          if (buttonId === "delete" ) {
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


      }
      else{
        setCardsOpen(false);  
      }
      // document.documentElement.style.overflow = "auto";
    }
    


    
    MainButton.setText(changeText);
    if (!modalActive && !isCategoryChoiceOpen){
      mainRef.current.style.overflow = "scroll"
      menu.classList.add("disappearAnimation")
      menu.classList.remove("appearAnimation")
      MainButton.show()
      MainButton.onClick(saveFunc);
      BackButton.onClick(backFunc);
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

}, [modalActive , isCategoryChoiceOpen, cardsSetting ,dispatch, setCardsOpen ]);

  useEffect( () => {
    return () => {
      MainButton.setText(saveText)
      MainButton.setParams({
        color: "#2ea5ff",
        text_color: "#ffffff",
        is_active: true,
      });
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


  return (
    <div ref={mainRef} className="cards">
      <Text className="cards-title">{cardsSetting.title}</Text>

    


      <TaskName
        placeholder={"Придумайте название для  кейса"}
        className={"cards-taskName"}
        title={"НАЗВАНИЕ КЕЙСА"}
        text={cardsSetting.title}
        description={cardsSetting.description}
        setText={(e) => {
          setCardsSetting({ ...cardsSetting, title: e });
        }}
        errorValue={errors.nameError}
        underText={""}
      />

      <DescriptionAndPhoto
        className={"cards-descriptionAndPhoto"}
        text={cardsSetting.description}
        textPlaceholder={"Опишите в чем особенность ваших работ"}
        setText={(e) => {
          setCardsSetting({ ...localCardSetting, description: e });
        }}
        setPhotos={(e) => {
          setCardsSetting( (value) => ({ ...value, photos: e }));
        }}
        photos={cardsSetting.photos}
        MyInformation={false}
        textTitle={"ОПИСАНИЕ КЕЙСА"}
        filesTitle={""}
        fileError={errors.fileError}
      />
      <Text className="cards-underText">Расскажите о себе и своем опыте работы. Прикрепите релевантные примеры.</Text>






      <div className="cards-links">

      <div
          className="behans-link cards-link"
          onClick={() => {
            inputObject = {
              text: cardsSetting.dropfileLink,
              setText: function (e) {
                setCardsSetting({ ...cardsSetting, dropfileLink: e });
              },
              placeholder: "Вставьте ссылку на Dropfile",
            };
            setModalActive(true);
          }}
        >
          <img src={dropfileIcon} alt="" />
          <Text>
            {"Ccылка на Dropfile"}
          </Text>
      </div>

        <div
          className="behans-link cards-link"
          onClick={() => {
            inputObject = {
              text: cardsSetting.behanceLink,
              setText: function (e) {
                setCardsSetting({ ...cardsSetting, behanceLink: e });
              },
              placeholder: "Вставте ссылку на кейс в Behance",
            };
            setModalActive(true);
          }}
        >
          <img src={behanceIcon} alt="" />
          <Text>
            {"Ссылка на Behance"}
          </Text>
        </div>
        <div
          className="behans-link cards-link"
          onClick={() => {
            inputObject = {
              text: cardsSetting.dribbbleLink,
              setText: function (e) {
                setCardsSetting({ ...cardsSetting, dribbbleLink: e });
              },
              placeholder: "Вставте ссылку на кейс в Dribble",
            };
            setModalActive(true);
          }}
        >
          <img src={dripleIcon} alt="" />
          <Text>
            {"Ссылка на Dribbble"}
          </Text>
        </div>



      </div>
      <CSSTransition
        mountOnEnter
        unmountOnExit
        classNames={"inputModal"}
        in={modalActive}
        timeout={0}
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
            isBackHide = {false}
            taskInformation={localCardSetting}
            setTaskInformation={setCardsSetting}
            setCatagoryChoiceOpen={setCatagoryChoiceOpen}
            categorys = {categorys}
            subCategorys={subCategorys}
          />
      </CSSTransition>

    </div>
  );
};

export default ChangeCards;
