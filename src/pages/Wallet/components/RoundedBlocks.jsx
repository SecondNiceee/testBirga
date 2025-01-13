import React, { useMemo } from "react";
import cl from "../index.module.scss"
import en from "../../../constants/language";
import { useSelector } from "react-redux";
import formateMoney from "../../../functions/formateMoney";
import Text from "../../../components/Text/Text";



const RoundedBlocks = ({summ}) => {
  const price = useSelector(state => state.ton.value)
  const itog = useMemo( () => {
    const newStrTwo = summ.split(",")[1] ? summ.split(",")[1] : "0"
    const toFixedWhat = Math.max(4, newStrTwo.length)
    const rez = Number(summ.replace(",", '.')) - 0.004
    return rez < 0 ? 0 : rez.toFixed(toFixedWhat) 
  }, [summ] ) 
  return (
    <div className={cl.roundedsBlock}>
      <div className={cl.roundBlock}>
        <div className={cl.left}>
          <Text>Комиссия за блокчейн</Text>
          {/* <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8.11533 15.8752C12.4348 15.8752 16 12.31 16 7.99814C16 3.68634 12.4271 0.121094 8.10771 0.121094C3.7959 0.121094 0.238281 3.68634 0.238281 7.99814C0.238281 12.31 3.80352 15.8752 8.11533 15.8752ZM8.11533 14.3059C4.61865 14.3059 1.82283 11.4948 1.82283 7.99814C1.82283 4.50147 4.61865 1.69803 8.10771 1.69803C11.6044 1.69803 14.4154 4.50147 14.4231 7.99814C14.4307 11.4948 11.612 14.3059 8.11533 14.3059ZM7.94773 9.51413C8.36673 9.51413 8.63336 9.27036 8.65621 8.95802C8.65621 8.93516 8.65621 8.89707 8.66383 8.8666C8.68668 8.47808 8.95332 8.21907 9.44849 7.89149C10.2027 7.40394 10.6826 6.96209 10.6826 6.08602C10.6826 4.82142 9.5399 4.09009 8.18389 4.09009C6.88121 4.09009 5.9899 4.6843 5.75374 5.40039C5.70803 5.5299 5.67756 5.65941 5.67756 5.79653C5.67756 6.16982 5.96705 6.39836 6.31748 6.39836C6.76694 6.39836 6.86597 6.16982 7.10213 5.9108C7.34591 5.5299 7.66587 5.30898 8.11533 5.30898C8.71716 5.30898 9.11329 5.65179 9.11329 6.1622C9.11329 6.6269 8.79334 6.87829 8.1458 7.32014C7.60492 7.70104 7.20879 8.08956 7.20879 8.77518V8.85898C7.20879 9.29321 7.47542 9.51413 7.94773 9.51413ZM7.9325 11.8529C8.42005 11.8529 8.82381 11.5024 8.82381 11.0149C8.82381 10.535 8.42767 10.1769 7.9325 10.1769C7.43733 10.1769 7.03357 10.535 7.03357 11.0149C7.03357 11.4948 7.43733 11.8529 7.9325 11.8529Z"
              fill="#2EA5FF"
            />
          </svg> */}
        </div>
        <p className={cl.right}>0.004 TON</p>
      </div>

      <div className={cl.roundBlock}> 
        <Text>Будет получено</Text>

        <p className={cl.right}>
          { String(Number(itog).toFixed(3)).replace('.', ',')} TON ≈ {formateMoney(String((itog * price).toFixed(2)).replace('.' , ','), 2, ',')}
          {en ? "$" : "₽"}
        </p>
      </div>
    </div>
  );
};

export default RoundedBlocks;
