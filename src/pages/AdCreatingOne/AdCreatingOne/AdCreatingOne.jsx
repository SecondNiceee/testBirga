import React, { memo, useCallback, useEffect, useState } from "react";
import { CSSTransition } from "react-transition-group";
import cl from "./AdCreatingOne.module.scss";
import Cap from "../../../components/UI/Cap/Cap";
import Categories from "../Categories/Categories";
import TaskName from "../../../components/UI/TaskName/TaskName";
import DescriptionAndPhoto from "../../../components/UI/DescriptionAndPhoto/DescriptionAndPhoto";
import ChoiceCategory from "../ChoiceCategory/ChoiceCategory";
import ChoiceSubCategory from "../ChoiceSubCategory";

import CatchDate from "../../ADCreatingTwo/CatchDate/CatchDate";
import "../../ADCreatingTwo/AdCreatingTwo/SecondAddCreating.module.css";
import MyDatePicker from "../../../components/AdCreating/MyDatePicker/MyDatePicker";
import Text from "../../../components/Text/Text";
import translation from "../../../functions/translate";
import en from "../../../constants/language";



// eslint-disable-next-line
Date.prototype.addHours = function (h) {
  this.setTime(this.getTime() + h * 60 * 60 * 1000);
  return this;
};
let monthMap;
if (en){
  monthMap = {
    1: "Jan",
    2: "Feb",
    3: "March",
    4: "Apr",
    5: "May",
    6: "June",
    7: "July",
    8: "Aug",
    9: "Sep",
    10: "Oct",
    11: "Nov",
    12: "Dec",
  };
}
else{

  monthMap = {
    1: "Янв",
    2: "Фев",
    3: "Март",
    4: "Апр",
    5: "Май",
    6: "Июнь",
    7: "Июль",
    8: "Авг",
    9: "Сен",
    10: "Окт",
    11: "Ноя",
    12: "Дек",
  };
}
let dateConfig;
if (en){
  dateConfig = {
    month: {
      format: (value) => monthMap[value.getMonth() + 1],
      caption: "Month",
      step: 1,
    },
    date: {
      format: "DD",
      caption: "Day",
      step: 1,
    },
    hour: {
      format: "hh",
      caption: "Hour",
      step: 1,
    },
  };
}
else{
  dateConfig = {
    month: {
      format: (value) => monthMap[value.getMonth() + 1],
      caption: "Мес",
      step: 1,
    },
    date: {
      format: "DD",
      caption: "День",
      step: 1,
    },
    hour: {
      format: "hh",
      caption: "Час",
      step: 1,
    },
  };
}

const min = new Date(new Date().addHours(1) + 1);
const menu = document.documentElement.querySelector(".FirstMenu")
const AdCreatingOne = ({
  taskInformation,
  setTaskInformation,
  MyInformation,
  className,
  errorName,
  mistakes,
  isDetailsActive,
  categorys,
  subCategorys,
  isCategoryChoiceOpen,
  setCatagoryChoiceOpen,
  isSubcategoryChoiceOpen,
  setSubcategoryChoiceOpen,
  ...props
}) => {
  const [state, setState] = useState({
    time: new Date().addHours(1),
    isOpen: false,
    isPicked: false,
    singleOpen: null,
    startTime: taskInformation.time ? taskInformation.time.end : new Date(),
    endTime: taskInformation.time ? taskInformation.time.end : new Date(),
    isSingleOpen: false,
    isStartOpen: false,
    isEndOpen: false,
  });

  useEffect(() => {
    setState((value) => ({
      ...value,
      startTime: taskInformation.time.start,
      endTime: taskInformation.time.end,
    }));
  }, [isDetailsActive, taskInformation.time.start, taskInformation.time.end]);
  
  const handleSelect = useCallback(
    (time) => {
      if (state.isStartOpen) {
        setState((value) => ({
          ...value,
          time: time,
          isOpen: false,
          isStartOpen: false,
          startTime: time,
        }));
        if (taskInformation.myAds) {
          setTaskInformation( (value) => ({...value, time : {...value.time , start : time}} ))
        } else {
          setTaskInformation((value) => ({ ...value, startTime: time }));
        }
      }
      if (state.isSingleOpen) {
        setState({
          ...state,
          time: time,
          isOpen: false,
          isSingleOpen: false,
          singleTime: time,
        });
        setTaskInformation((value) => ({ ...value, singleTime: time }));
      }
      if (state.isEndOpen) {
        setState({
          ...state,
          time: time,
          isOpen: false,
          isEndOpen: false,
          endTime: time,
        });
        if (taskInformation.myAds) {
          setTaskInformation( (value) => ({...value , time : {...value.time , end : time}} ))
        } else {
          setTaskInformation((value) => ({ ...value, endTime: time }));
        }
      }
    },
    [setTaskInformation, state, taskInformation.myAds]
  );

  const handleCancel = useCallback(() => {
    setState((value) => ({ ...value, isOpen: false }));
  }, [setState]);

  let dateObject = document.querySelectorAll(".datepicker-modal")[0];
  let datePickerObject = document.querySelectorAll(".datepicker")[0];

  if (dateObject && datePickerObject) {
    dateObject.style.display = "block";
    dateObject.style.zIndex = "-1";
    dateObject.style.backgroundColor = "unset";
    dateObject.style.transition = "0.3s";
    datePickerObject.style.transition = "0.3s";
  }

  // useEffect( () => {
  //   document.documentElement.style.overflowY = "auto"
  //   return () => {
  //     document.documentElement.style.overflowY = "hidden"
  //   }
  // } , [] )

  useEffect(() => {
    function appear() {
      dateObject.style.zIndex = "100";
      dateObject.style.backgroundColor = "rgba(0, 0, 0, .6)";
      datePickerObject.style.transform = "translateY(0%)";
    }
    function disappear() {
      dateObject.style.backgroundColor = "unset";
      dateObject.style.display = "block";
      datePickerObject.style.transform = "translateY(100%)";

    }

    if (dateObject && datePickerObject) {
      if (state.isOpen) {
        appear();
        menu.style.display = "none"
      } else {
        menu.style.display = "flex"
        disappear();
      }
    }
  }, [state.isOpen, dateObject, datePickerObject]);


  const setTextDescription = useCallback( (e) => {
    console.log("Вызов этой штуки")
    
      setTaskInformation( (value) => ({...value, taskDescription : e}) )

  } , [ setTaskInformation] )

  const setTextTitle = useCallback( (e) => {
      setTaskInformation((value) =>  ({...value , taskName : e}) )
  } , [setTaskInformation] )

  const setFile = useCallback( (e) => {
    setTaskInformation( (value) => ({...value , photos : e}) )
    
  } , [setTaskInformation] )


  return (
    <div
      {...props}
      className={
        className ? [cl.AdCreating, className].join(" ") : cl.AdCreating
      }
    >
      {MyInformation ? (
        ""
      ) : (
        <Cap step={1} className={cl.Cap}> 
          {" "}
          <Text className={cl.CapText}> Создайте объявление </Text>{" "}
        </Cap>
      )}
      {MyInformation ? (
        ""
      ) : (
        <Categories
          className={cl.Categories}
          taskInformation={taskInformation}
          setCatagoryChoiceOpen={setCatagoryChoiceOpen}
          setSubcategoryChoiceOpen={setSubcategoryChoiceOpen}
        />
      )}

      <TaskName
        // style = {mistakes.taskName ? {border : '1px solid red'} : {}}
        title={translation("Название задания")}
        underText={MyInformation ? "" : "Например, разработать дизайн"}
        errorValue={mistakes.taskName || errorName ? true : false}
        text={taskInformation.taskName}
        placeholder={translation("Введите название задания")}
        setText={setTextTitle}
      />

      <DescriptionAndPhoto
      
        MyInformation={MyInformation}
        taskInformation={taskInformation}
        setTaskInformation={setTaskInformation}
        className={cl.DescriptionAndPhoto}
        textTitle={translation("Описание")}
        filesTitle={translation("ИЗОБРАЖЕНИЯ")}
        textPlaceholder={translation("Дайте подробное тз...")}
        text={taskInformation.taskDescription}
        setText={setTextDescription}
        photos={taskInformation.photos}
        photosNames={taskInformation.photosNames}
        setPhotos={setFile}
      />

      {MyInformation ? (
        <>
          <CatchDate
            className={cl.myCatchDate}
            whichOne={"startAndEnd"}
            state={state}
            setState={setState}
            errors={{}}
            isMyInformation={true}
          />
        </>
      ) : (
        ""
      )}

      <MyDatePicker
        confirmText= {en ? "Save" : "Сохранить"}
        cancelText= {en ? "Cancel" : "Отмена"}
        theme="ios"
        showCaption={true}
        dateConfig={dateConfig}
        value={state.time}
        isOpen={true}
        onSelect={handleSelect}
        onCancel={handleCancel}
        min={min}
      />

      <CSSTransition
        in={isCategoryChoiceOpen}
        timeout={0}
        mountOnEnter
        unmountOnExit
      >
        <ChoiceCategory
          style = {{top:document.documentElement.scrollTop + "px"}}
          taskInformation={taskInformation}
          setTaskInformation={setTaskInformation}
          setCatagoryChoiceOpen={setCatagoryChoiceOpen}
          categorys={categorys}
          subCategorys={subCategorys}
        />
      </CSSTransition>

      <CSSTransition
        in={isSubcategoryChoiceOpen}
        timeout={0}
        unmountOnExit
        mountOnEnter
      >
        <ChoiceSubCategory
         style = {{top:document.documentElement.scrollTop + "px"}}
          subCategorysPar={subCategorys}
          setTaskInformation={setTaskInformation}
          setSubcategoryChoiceOpen={setSubcategoryChoiceOpen}
          taskInformation={taskInformation}
        ></ChoiceSubCategory>
      </CSSTransition>
    </div>
  );
};

export default memo(AdCreatingOne);
