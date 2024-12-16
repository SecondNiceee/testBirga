import React, { memo, useCallback, useState } from "react";
import cl from "../index.module.scss";
import AlertBlock from "./AlertBlock";
import HowGetText from "./HowGetText";
import Stages from "./Stages";
import AddressBlock from "./AddressBlock";
import MyLoader from "../../../components/UI/MyLoader/MyLoader";
import copyTextToClipboard from "../../../functions/copyTextToClipboard";
import CopyText from "../../../components/UI/CopyText/CopyText";
import { QRCodeCanvas} from 'qrcode.react';
import icon from "../../../images/icons/ThisTon.svg"



const DepositPage = ({address}) => {
  const [copyState, setCopyState] = useState(false);

  const clickHandler = useCallback(() => {
    if (address) {
      copyTextToClipboard(address);
      setCopyState((value) => !value);
    }
  }, [address]);

  return (
    <>
    <div className={cl.depositContainer}>
      {address ? (
        <>
          <p className={cl.capText}>Сделать депозит USDT (TON)</p>

          <QRCodeCanvas level="Q"  imageSettings={{
            src : icon,
            height : 22,
            width : 22,
          }
          } marginSize = {2}  bgColor="#ffffff" size={90} className={cl.qr} value={address} />

          <AddressBlock onClick={clickHandler} address={address} />

          <AlertBlock />

          <div className={cl.stagesBlock}>
            <HowGetText />

            <Stages address={address} />
          </div>
        </>
      ) : (
          <MyLoader />
      )}  

     

    </div>

    <CopyText copyState={copyState} />
</>
  );
};

export default memo(DepositPage);
