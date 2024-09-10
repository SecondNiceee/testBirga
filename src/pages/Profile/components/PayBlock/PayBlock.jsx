import React, { memo, useCallback } from "react";
import cl from "./PayBlock.module.scss";
import CreateButton from "../CreateButton/CreateButton";
import PayTextContainer from "../PayTextContainer/PayTextContainer";
import { useNavigate } from "react-router-dom";
const PayBlock = ({ className }) => {
  const navigate = useNavigate();
  const clickHandler = useCallback(() => {
    navigate("/createWallet");
  }, []);
  return (
    <div
      className={className ? [cl.container, className].join(" ") : className}
    >
      <CreateButton onClick={clickHandler} className={cl.createButton}>
        <p>Создать кошелек</p>
        <svg
          width="20"
          height="17"
          viewBox="0 0 20 17"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6.69293 2.51299V3.32222H13.3154V2.51299C13.3154 2.1414 13.0595 1.90193 12.6466 1.90193H7.35353C6.94891 1.90193 6.69293 2.1414 6.69293 2.51299ZM9.99593 8.31801C6.75073 8.31801 3.65417 7.82256 0.648438 6.56742V5.96462C0.648438 4.22229 1.55676 3.32222 3.31561 3.32222H4.97537V2.43867C4.97537 1.11747 5.82589 0.333008 7.24618 0.333008H12.7539C14.1742 0.333008 15.0247 1.11747 15.0247 2.43867V3.32222H16.6845C18.4516 3.32222 19.3517 4.22229 19.3517 5.96462V6.56742C16.3459 7.82256 13.2494 8.31801 9.99593 8.31801ZM3.31561 16.6663C1.55676 16.6663 0.648438 15.7745 0.648438 14.0239V8.13634C3.15872 9.05293 5.42127 9.48232 7.7086 9.65572V10.3081C7.7086 10.9356 8.07193 11.2825 8.70776 11.2825H11.2841C11.9282 11.2825 12.2915 10.9356 12.2915 10.3081V9.65572C14.5788 9.48232 16.8414 9.05293 19.3517 8.13634V14.0239C19.3517 15.7745 18.4516 16.6663 16.6845 16.6663H3.31561Z"
            fill="white"
          />
        </svg>
      </CreateButton>

      <PayTextContainer />
    </div>
  );
};

export default memo(PayBlock);
