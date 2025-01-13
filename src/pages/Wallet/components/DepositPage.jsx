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
import Text from "../../../components/Text/Text";



const DepositPage = ({address, left, ...props}) => {
  const [copyState, setCopyState] = useState(false);

  const clickHandler = useCallback(() => {

    if (address) {
      window.Telegram.WebApp.HapticFeedback.notificationOccurred("success");
      copyTextToClipboard(address);
      setCopyState((value) => !value);

    }
  }, [address]);

  return (
    <>
    <div className={cl.depositContainer}>
      {address ? (
        <>
          <Text className={cl.capText}>Сделать депозит TON</Text>

          <QRCodeCanvas level="L"  imageSettings={{
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

    <CopyText style = {left ? {left : "calc(100vw + 16px)"} : {}} copyState={copyState} />
</>
  );
};

export default memo(DepositPage);
