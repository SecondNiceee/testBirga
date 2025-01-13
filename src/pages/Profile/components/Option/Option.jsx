import React, { useCallback, useEffect, useRef } from 'react';
import ArrowRight from "../../../../images/icons/rightArrow.svg";
import { Link } from 'react-router-dom';
import Text from '../../../../components/Text/Text';
const Option = ({to, index = 1, text}) => {

    const myRef = useRef(null)
    const vibrate = useCallback( () => {
        if (myRef.current){
            myRef.current.style.backgroundColor = "#3D4855"
        }
        setTimeout( () => {
            if (myRef.current){
                myRef.current.style.backgroundColor = "rgb(32, 48, 63)"
            }
        } , 100 )
        // eslint-disable-next-line 
    }  , [])
    const clickHandler = useCallback( (e) => {
        if (myRef.current){
            myRef.current.style.backgroundColor = "#3D4855"
        }
        // eslint-disable-next-line 
    }  , [])
    const touchEnd = useCallback( (e) => {
        if (myRef.current){
            myRef.current.style.backgroundColor = "rgb(32, 48, 63)"
        }
    }, [] )

    useEffect( () => {

      function click(){
        window.Telegram.WebApp.HapticFeedback.impactOccurred('soft')
      }
      if (myRef.current){
        myRef.current.addEventListener("click" , click)

      }
      
    } , [] )
    
    
    return (
        <Link
        ref={myRef}
        onClick={vibrate}
        onTouchStart={clickHandler}
        onTouchEnd={touchEnd}
        to={to}
        className="option"
      >
        <div className="option__left">
          <div className="shablonIcon">
            <svg
            className="shablonIcon__inner"
              width="20"
              height="16"
              viewBox="0 0 20 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2.7691 15.9997H17.2309C19.0545 15.9997 20 15.0677 20 13.2794V3.05327C20 1.26495 19.0545 0.333008 17.2309 0.333008H2.7691C0.945547 0.333008 0 1.25655 0 3.05327V13.2794C0 15.0677 0.945547 15.9997 2.7691 15.9997ZM3.94259 4.95073C3.49515 4.95073 3.11524 4.57292 3.11524 4.12793C3.11524 3.67456 3.49515 3.29674 3.94259 3.29674C4.40692 3.29674 4.76995 3.66616 4.76995 4.12793C4.76995 4.58131 4.40692 4.95073 3.94259 4.95073ZM6.55129 4.69885C6.22203 4.69885 5.96876 4.43858 5.96876 4.12793C5.96876 3.8005 6.23048 3.54022 6.55129 3.54022H16.336C16.6484 3.54022 16.9185 3.8005 16.9185 4.12793C16.9185 4.43858 16.6568 4.69885 16.336 4.69885H6.55129ZM3.94259 7.60382C3.49515 7.60382 3.11524 7.22601 3.11524 6.78103C3.11524 6.32765 3.49515 5.94984 3.94259 5.94984C4.40692 5.94984 4.76995 6.31925 4.76995 6.78103C4.76995 7.2344 4.40692 7.60382 3.94259 7.60382ZM6.55129 7.36034C6.23048 7.36034 5.96876 7.09167 5.96876 6.78103C5.96876 6.46198 6.23048 6.19332 6.55129 6.19332H11.9966C12.3174 6.19332 12.5791 6.46198 12.5791 6.78103C12.5791 7.09167 12.3174 7.36034 11.9966 7.36034H6.55129ZM3.94259 10.2401C3.4867 10.2401 3.11524 9.8791 3.11524 9.41732C3.11524 8.97234 3.4867 8.60293 3.94259 8.60293C4.40692 8.60293 4.76995 8.96395 4.76995 9.41732C4.76995 9.8791 4.40692 10.2401 3.94259 10.2401ZM6.55129 10.005C6.22203 10.005 5.96876 9.75316 5.96876 9.41732C5.96876 9.09828 6.22203 8.8548 6.55129 8.8548H16.336C16.6568 8.8548 16.9185 9.09828 16.9185 9.41732C16.9185 9.75316 16.6568 10.005 16.336 10.005H6.55129ZM3.94259 13.0275C3.49515 13.0275 3.11524 12.6497 3.11524 12.1964C3.11524 11.7514 3.49515 11.3736 3.94259 11.3736C4.40692 11.3736 4.76995 11.743 4.76995 12.1964C4.76995 12.6581 4.40692 13.0275 3.94259 13.0275ZM6.55129 12.7841C6.23048 12.7841 5.96876 12.5238 5.96876 12.1964C5.96876 11.8857 6.22203 11.6254 6.55129 11.6254H11.9966C12.3259 11.6254 12.5791 11.8857 12.5791 12.1964C12.5791 12.5238 12.3174 12.7841 11.9966 12.7841H6.55129Z"
                fill="white"
              />
            </svg>
          </div>
          <Text>{text}</Text>
        </div>
        <img className="arrowRight" src={ArrowRight} alt="" />
      </Link>
    );
};

export default Option;