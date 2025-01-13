import React, { memo, useCallback, useState } from "react";
import ListContainer from "../ListContainer/ListContainer";
import CreateButton from "../../../Profile/components/CreateButton/CreateButton";
import TextAlertBlock from "../TextAlertBlock/TextAlertBlock";
import cl from "./One.module.scss";
import MyLoader from "../../../../components/UI/MyLoader/MyLoader";
import copyTextToClipboard from "../../../../functions/copyTextToClipboard";
import CopyText from "../../../../components/UI/CopyText/CopyText";
import Text from "../../../../components/Text/Text";
import translation from "../../../../functions/translate";


const One = ({ keys, className }) => {
  const [copyState, setCopyState] = useState(false);

  const clickHandler = useCallback(() => {
    if (keys) {
      window.Telegram.WebApp.HapticFeedback.notificationOccurred("success");
      copyTextToClipboard(keys.join(" "));
      setCopyState((value) => !value);
    }
  }, [keys]);

  return (
    <div
      className={className ? [cl.container, className].join(" ") : cl.container}
    >
      {keys ? (
        <>
          <h2 className={cl.title}>{translation("Ваша секретная фраза")}</h2>

          <Text className={cl.topText}>
            Эта фраза — очень важное сочетание слов, которое поможет вам
            восстановить кошелек, если вы выйдете из системы или потеряете
            устройство.
          </Text>

          <ListContainer keys={keys} />

          <CreateButton onClick={clickHandler} className={cl.createButton}>
            <div className={cl.buttonContainer}>
              <Text>Скопировать</Text>
              <svg
                width="17"
                height="19"
                viewBox="0 0 17 19"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9.52914 16.6909V15.1988L10.7831 15.921C12.0053 16.6274 12.9339 16.1512 12.9339 14.6988V13.4448L14.0053 14.0639C15.2276 14.7702 16.1641 14.294 16.1641 12.8416V5.73053C16.1641 4.80196 15.8863 4.31784 15.0847 3.85752L8.81486 0.230533C7.91803 -0.28534 6.79105 0.0559302 6.79105 1.34164V2.78609L5.59263 2.08768C4.69581 1.5718 3.56882 1.92101 3.56882 3.20672V4.88133L2.18787 4.08768C1.29105 3.5718 0.164062 3.91307 0.164062 5.19879V12.5083C0.164062 13.421 0.394221 13.8813 1.22755 14.3655L7.37835 17.921C8.60057 18.6194 9.52914 18.1432 9.52914 16.6909ZM14.5053 12.5639L12.9339 11.6512V7.58768C12.9339 6.65911 12.6561 6.18291 11.8545 5.71466L8.32279 3.67498V1.8972C8.32279 1.82577 8.38628 1.78609 8.45771 1.82577L14.3069 5.20672C14.545 5.34958 14.6323 5.45276 14.6323 5.76228V12.5004C14.6323 12.5718 14.5768 12.6036 14.5053 12.5639ZM9.52914 9.57974C9.52914 8.65911 9.2593 8.17498 8.45771 7.70672L5.10057 5.77022V3.75434C5.10057 3.68291 5.15613 3.64323 5.22755 3.68291L11.0768 7.06387C11.3149 7.20672 11.4022 7.3099 11.4022 7.61942V14.3575C11.4022 14.4369 11.3545 14.4607 11.2831 14.421L9.52914 13.4131V9.57974ZM7.672 9.05593C7.91803 9.19879 7.9974 9.30196 7.9974 9.61942V16.3496C7.9974 16.4289 7.94978 16.4607 7.87835 16.421L2.00533 13.0162C1.7593 12.8655 1.69581 12.7385 1.69581 12.4528V5.74641C1.69581 5.67498 1.75136 5.6353 1.83073 5.68291L7.672 9.05593Z"
                  fill="white"
                />
              </svg>

            </div>
          </CreateButton>

          <TextAlertBlock />

          <CopyText copyState={copyState} />
        </>
      ) : (
        <MyLoader
          style={{
            width: "100vw",
            transform: "translateX(-16px)",
          }}
        />
      )}
    </div>
  );
};

export default memo(One);
