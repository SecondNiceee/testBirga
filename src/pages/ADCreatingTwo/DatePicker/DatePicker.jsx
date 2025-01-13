import React, { memo } from "react";
import cl from "./DatePicker.module.css";
import GreyText from "../../../components/UI/GreyText/GreyText";
import CatchDate from "../CatchDate/CatchDate";
import FullPicker from "../../../components/UI/FullPicker/FullPicker";

const MyDatePicker = ({
  className,
  taskInformation,
  setTaskInformation,
  GreyIntWidth,
  GreyWidth,
  setState,
  state,
  errors,
  whichOne,
  setWhichOne,
  ...props
}) => {
  
  const keys = ["startOnly", "startAndEnd"];

  return (
    <div
      {...props}
      className={
        className ? [cl.DatePicker, className].join(" ") : cl.DatePickerr
      }
    >
      <GreyText className={cl.GreyText}>Время выполнения</GreyText>
      {/* <Picker
        className={cl.picker}
        whichOne={whichOne}
        setWhichOne={setWhichOne}
        taskInformation={taskInformation}
        setTaskInformation={setTaskInformation}
      /> */}

      {/* <CatchDate className={cl.CatchDate} whichOne={whichOne} />  */}
      <FullPicker
        values={["Дата дедлайна", "Период выполнения"]}
        keys={keys}
        nowKey={whichOne}
        setNowKey={setWhichOne}
        GreyIntWidth={GreyIntWidth}
        GreyWidth={GreyWidth}
      />
      <CatchDate
        className={cl.CatchDate}
        whichOne={whichOne}
        state={state}
        setState={setState}
        errors={errors}
        isMyInformation={false}
      />
    </div>
  );
};

export default memo(MyDatePicker);
