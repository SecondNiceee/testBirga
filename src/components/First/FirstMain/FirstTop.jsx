import React, { memo, useMemo } from "react";
import OneInput from "../../UI/OneInput/OneInput";
import translation from "../../../functions/translate";


const FirstTop = ({ setFilterBy, filteredBy, setMenuActive , userInfo ,  ...props }) => {

  const place = useMemo( () => {
    return translation("Поиск по заданиям...")
  } , [] )

  return (
    <div  {...props} className="FirstTop">
      <OneInput
        value={filteredBy}
        onChange={(e) => {
          setFilterBy(e.target.value);
        }}
        placeholder={place}
      />
    </div>
  );
};

export default memo(FirstTop);
