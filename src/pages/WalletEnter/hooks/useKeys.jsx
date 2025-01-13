import  { useEffect } from "react";
import { mnemonicNew } from "ton-crypto";

const useKeys = ({setKeys}) => {
  useEffect(() => {
    const getKeys = async () => {
      const keys = await mnemonicNew(12);
      return keys;
    };
    getKeys().then((value) => setKeys(value));
  }, [setKeys]);
};

export default useKeys;
