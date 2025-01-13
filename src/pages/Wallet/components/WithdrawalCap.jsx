import React from "react";
import cl from "../index.module.scss";
import TonIcon from "../../../components/UI/TonIcon/TonIcon";
import Text from "../../../components/Text/Text";
const WithdrawalCap = () => {
  return (
    <div className={cl.WithdrawalCap}>


       <TonIcon />
      <Text>Вывести TON</Text>

    </div>
  );
};

export default WithdrawalCap;
