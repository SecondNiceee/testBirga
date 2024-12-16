import React, { memo } from "react";
import cl from "../index.module.scss";
import StageThree from "./StageThree";
import StageOne from "./StageOne";
import StageTwo from "./StageTwo";
const Stages = ({ address }) => {
  return (
    <div  className={cl.stages}>
      <svg
        className={cl.lineTwo}
        width="2"
        height="201"
        viewBox="0 0 2 201"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M1 0.90625L1 200.906"
          stroke="#4A6275"
          stroke-linejoin="round"
          stroke-dasharray="4 4"
        />
      </svg>
      <StageOne address={address} />

      <StageTwo />

      <StageThree />
    </div>
  );
};

export default memo(Stages);
