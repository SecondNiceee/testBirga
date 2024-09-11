import React, { memo } from 'react';
import cl from "../index.module.scss"
const makeAdress = (adress) => {
    
    if (adress){
        return (
          adress.slice(0, 20) +
          "..." +
          adress.slice(adress.length - 10, adress.length)
        );
    }
    return ""
};
const AddressBlock = ({address , onClick = () => {}}) => {
    return (
      <div onClick={onClick} className={cl.addressBlock}>
        <p>{makeAdress(address)}</p>
        <svg
          
          width="14"
          height="15"
          viewBox="0 0 14 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8.05095 13.1706V12.0204L9.01755 12.5771C9.95968 13.1216 10.6755 12.7545 10.6755 11.635V10.6684L11.5013 11.1456C12.4435 11.6901 13.1654 11.323 13.1654 10.2035V4.72197C13.1654 4.0062 12.9512 3.63302 12.3334 3.27819L7.50035 0.48239C6.80905 0.0847382 5.94033 0.3478 5.94033 1.33887V2.4523L5.01656 1.91394C4.32525 1.51629 3.45654 1.78547 3.45654 2.77654V4.06738L2.39205 3.4556C1.70075 3.05795 0.832031 3.32101 0.832031 4.31209V9.94651C0.832031 10.65 1.00945 11.0049 1.65181 11.3781L6.39304 14.1188C7.33517 14.6572 8.05095 14.2901 8.05095 13.1706ZM11.8868 9.98934L10.6755 9.2858V6.15352C10.6755 5.43775 10.4613 5.07068 9.84344 4.70974L7.12105 3.13748V1.76711C7.12105 1.71205 7.16999 1.68146 7.22505 1.71205L11.7338 4.3182C11.9173 4.42832 11.9846 4.50785 11.9846 4.74644V9.94039C11.9846 9.99545 11.9418 10.0199 11.8868 9.98934ZM8.05095 7.68907C8.05095 6.97941 7.84294 6.60623 7.22505 6.24529L4.63726 4.75256V3.19866C4.63726 3.1436 4.68008 3.11301 4.73514 3.1436L9.2439 5.74975C9.42744 5.85987 9.49473 5.9394 9.49473 6.17799V11.3719C9.49473 11.4331 9.45802 11.4515 9.40296 11.4209L8.05095 10.6439V7.68907ZM6.6194 7.2853C6.80905 7.39542 6.87023 7.47495 6.87023 7.71966V12.9075C6.87023 12.9687 6.83352 12.9931 6.77846 12.9626L2.25134 10.338C2.06169 10.2218 2.01275 10.1239 2.01275 9.90369V4.73421C2.01275 4.67915 2.05558 4.64856 2.11675 4.68527L6.6194 7.2853Z"
            fill="#95979E"
          />
        </svg>
      </div>
    );
};

export default memo(AddressBlock);