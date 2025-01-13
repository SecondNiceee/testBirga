import React, { memo } from "react";
import cl from "./Two.module.scss";
import UpTextContainer from "../UpText/UpTextContainer";
import InputBlock from "../InputBlock/InputBlock";
import translation from "../../../../functions/translate";

const numberNames = [
  "Первое слово",
  "Второе слово",
  "Третье слово",
  "Четвертое слово",
  "Пятое слово",
  "Шестое слово",
  "Седьмое слово",
  "Восьмое слово",
  "Девятое слово",
  "Десятое слово",
  "Одиннадцатое слово",
  "Двенадцатое слово",
];
const Two = ({values , mistakes, changeHandler, numbers}) => {
  
  return (
    <div className={cl.container}>
      <UpTextContainer className={cl.UpTextContainer} />
      <div className={cl.inputBlocks}>
        {numbers.map((e, i) => (
          <InputBlock  mistake = {mistakes[i]} value={values[i]} onChange={changeHandler} index={i} key={i} placeholder={ translation(numberNames[e-1])} number={e} />
        ))}
      </div>
    </div>
  );
};

export default memo(Two);
