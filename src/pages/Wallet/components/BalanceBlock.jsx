import React, { memo, useCallback, useMemo } from "react";
import cl from "../index.module.scss";
import CompactWithWidth from "./CompactWithWidth";
import translation from "../../../functions/translate";
const BalanceBlock = ({
  setMyValues,
  sum,
  balance,
  inputMistake,
  underText,
}) => {
  
  const summChange = useCallback(
    (e) => {
      const newStr = e.replace(/\s/g, "");
      console.log(e);

      if (!isNaN(newStr.replace('.', ',').replace(",", ""))) {
        setMyValues((value) => ({ ...value, summ: String(newStr.replace('.' , ",")) }));
      }
    },
    [setMyValues]
  );

  const summValue = useMemo(() => {
    const newStrOne = sum.split(",")[0];
    const newStrTwo = sum.split(",")[1];

    const formattedNumber = sum.includes(",")
      ? new Intl.NumberFormat("ru-RU").format(Number(newStrOne)) +
        "," +
        newStrTwo
      : new Intl.NumberFormat("ru-RU").format(Number(newStrOne));
    return formattedNumber;
  }, [sum]);
  const styleError = useMemo(() => {
    return inputMistake ? { color: "#fe6766" } : {};
  }, [inputMistake]);

  const maxFunction = useCallback(() => {
    setMyValues((value) => ({
      ...value,
      summ: String(balance).replace(".", ","),
    }));
  }, [balance, setMyValues]);
  
  return (
    <div className={cl.balanceBlock}>
      <CompactWithWidth
        greyText={translation("Сумма")}
        inputPlaceholder={""}
        inputType={"text"}
        inputMode="decimal"
        inputValue={summValue}
        onChange={summChange}
        className={cl.summBlock}
        inputMistake={inputMistake}
      />
      <p style={styleError} className={cl.balanceText}>
        {underText ? "Минимальная сумма вывода 0.05 TON" :
        <>
        {translation("Ваш Баланс:")}{" "}
        <span style={styleError} className={cl.white}>
          {balance} TON ·
        </span>{" "}
        <span onClick={maxFunction} style={styleError} className={cl.blue}>
          Max
        </span>
        </>
}
      </p>
    </div>
  );
};

export default memo(BalanceBlock);
