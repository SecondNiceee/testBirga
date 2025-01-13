import React, { useCallback, useRef } from "react";
import cl from "./Categories.module.css";
import Text from "../../../components/Text/Text";
import translation from "../../../functions/translate";

const Categories = ({
  className,
  taskInformation,
  setCatagoryChoiceOpen,
  setSubcategoryChoiceOpen,
  categoryOnly,
}) => {
  function format(arg) {
    if (arg) {
      let str = arg.split(" ");
      let rezult = "";
      for (let word of str) {
        if (rezult.length < 15) {
          rezult += word + " ";
        } else {
          rezult = rezult.slice(0, rezult.length - 1);
          if (rezult[rezult.length - 1] === ",") {
            rezult = rezult.slice(0, rezult.length - 1);
          }
          rezult += "..";
          break;
        }
      }

      return rezult;
    }
    return "";
  }

  const topRef = useRef(null);
  const topText = useRef(null);
  const topWhiteText = useRef(null)
  
  const bottomRef = useRef(null);
  const bottomText = useRef(null);
  const bottomWhiteText = useRef(null)


  const topVibrate = useCallback(() => {
    if (topRef.current && topText.current && topWhiteText.current)  {
    topRef.current.style.transition = "ease-in 0.1s ease 0.1s"
    topWhiteText.current.style.transition = "ease-in 0.1s ease 0.1s"
    topText.current.style.transition = "ease-in 0.1s ease 0.1s"
      topWhiteText.current.style.color = "#EBEBEC"
      topRef.current.style.backgroundColor = "#3D4855";
      topText.current.style.color = "#47A2E8"
    }
    setTimeout(() => {
      if (topRef.current && topText.current) {
        topRef.current.style.transition = "ease-out 0.3s ease 0.3s"
        topWhiteText.current.style.transition = "ease-out 0.3s ease 0.3s"
        topText.current.style.transition = "ease-out 0.3s ease 0.3s"
        topRef.current.style.backgroundColor = "rgb(32, 48, 63)";
        topWhiteText.current.style.color = "white"
        topText.current.style.color = "rgb(46, 165, 255)"
      }
    }, 100);
    // eslint-disable-next-line
  }, []);
  const topClickHandler = useCallback((e) => {

    if (topRef.current && topWhiteText.current) {
        topRef.current.style.transition = "ease-in 0.1s ease 0.1s"
        topWhiteText.current.style.transition = "ease-in 0.1s ease 0.1s"
        topText.current.style.transition = "ease-in 0.1s ease 0.1s"
        topWhiteText.current.style.color = "#EBEBEC" 
        topText.current.style.color = "#47A2E8"
        topRef.current.style.backgroundColor = "#3D4855";
    }
    // eslint-disable-next-line
  }, []);
  const topTouchEnd = useCallback((e) => {
    if (topRef.current && topWhiteText.current) {
        topRef.current.style.transition = "ease-out 0.3s"
        topWhiteText.current.style.transition = "ease-out 0.3s"
        topText.current.style.transition = "ease-out 0.3s"
        topRef.current.style.backgroundColor = "rgb(32, 48, 63)";
        topWhiteText.current.style.color = "white"
        topText.current.style.color = "rgb(46, 165, 255)"
    }
  }, []);

  const bottomVibrate = useCallback(() => {
    if (bottomRef.current && bottomWhiteText.current) {
        bottomRef.current.style.transition = "ease-in 0.1s ease 0.1s"
    bottomWhiteText.current.style.transition = "ease-in 0.1s ease 0.1s"
    bottomText.current.style.transition = "ease-in 0.1s ease 0.1s"
    bottomWhiteText.current.style.color = "#EBEBEC"
      bottomRef.current.style.backgroundColor = "#3D4855";
      bottomText.current.style.color = "#47A2E8"
    }
    setTimeout(() => {
      if (bottomRef.current && bottomWhiteText.current) {
        bottomRef.current.style.transition = "ease-out 0.3s ease 0.3s"
        bottomWhiteText.current.style.transition = "ease-out 0.3s ease 0.3s"
        bottomText.current.style.transition = "ease-out 0.3s ease 0.3s"
        bottomRef.current.style.backgroundColor = "rgb(32, 48, 63)";
        bottomWhiteText.current.style.color = "white"
        bottomText.current.style.color = "rgb(46, 165, 255)"
      }
    }, 100);
    // eslint-disable-next-line
  }, []);
  const bottomClickHandler = useCallback((e) => {

    if (bottomRef.current && bottomWhiteText.current && bottomText.current) {
        bottomRef.current.style.transition = "ease-in 0.1s ease 0.1s"
        bottomWhiteText.current.style.transition = "ease-in 0.1s ease 0.1s"
        bottomText.current.style.transition = "ease-in 0.1s ease 0.1s"
        bottomWhiteText.current.style.color = "#EBEBEC" 
        bottomText.current.style.color = "#47A2E8"
        bottomRef.current.style.backgroundColor = "#3D4855";
    }
    // eslint-disable-next-line
  }, []);
  const bottomTouchEnd = useCallback((e) => {
    if (bottomRef.current && bottomWhiteText.current && bottomText.current) {
        bottomRef.current.style.transition = "ease-out 0.3s"
        bottomWhiteText.current.style.transition = "ease-out 0.3s"
        bottomText.current.style.transition = "ease-out 0.3s"
        bottomRef.current.style.backgroundColor = "rgb(32, 48, 63)";
        topWhiteText.current.style.color = "white"
        bottomText.current.style.color = "rgb(46, 165, 255)"
    }
  }, []);

  return (
    <div
      className={
        className ? [cl.Categories, className].join(" ") : cl.Categories
      }
    >
      <div
        ref={topRef}
        onTouchStart={topClickHandler}
        onTouchEnd={topTouchEnd}
        className={cl.topBlock}
      ></div>
      <div
        ref={bottomRef}
        onTouchEnd={bottomTouchEnd}
        onTouchStart={bottomClickHandler}
        onClick={() => {
          setSubcategoryChoiceOpen(true);
          bottomVibrate();
        }}
        className={cl.bottomBlock}
      ></div>

      <div
    
        onTouchEnd={topTouchEnd}
        onTouchStart={topClickHandler}
        onClick={(e) => {
          topVibrate();
          setCatagoryChoiceOpen(true);
        }}
        style={{
          zIndex: 200,
        }}
        className={cl.Categories__block}
      >
        <Text ref={topWhiteText} >Категория</Text>
        <Text ref={topText} className={[cl.Category__link, cl.quest].join(" ")} href="">
          {taskInformation.category.category
            ? taskInformation.category.category
            : ""}
        </Text>
      </div>
      {categoryOnly ? (
        <></>
      ) : (
        <>
          <hr className={cl.line} />

          <div
            onTouchEnd={bottomTouchEnd}
            onTouchStart={bottomClickHandler}
            onClick={() => {
              setSubcategoryChoiceOpen(true);
              bottomVibrate();
            }}
            style={{
              zIndex: 200,
            }}
            className={cl.Categories__block}
          >
            <Text ref={bottomWhiteText}>Подкатегория</Text>
            <Text ref={bottomText} className={[cl.Category__link, cl.quest].join(" ")} href="">
              {taskInformation.subCategory.subCategory
                ? format( translation(taskInformation.subCategory.subCategory))
                : ""}
              {/* {taskInformation.subCategory=== 'Выбрать' ? '' : '.'} */}
            </Text>
          </div>
        </>
      )}
    </div>
  );
};

export default Categories;
