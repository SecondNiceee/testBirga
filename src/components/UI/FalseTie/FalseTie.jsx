import React, { useCallback, useEffect, useRef, useState } from 'react';
import cl from './FalseTie.module.css'
import { useDispatch, useSelector } from 'react-redux';
import { addAdvertisment, addCard, addResponce, deleteAdvertisement, deleteCard, deleteResponce } from '../../../store/saves';
import translation from '../../../functions/translate';
const Yes = translation("Да")
const No = translation("Нет")
const FalseTie = ({className, id, task, navigate, agree, end = false, ...props}) => {
    const [active, setActive] = useState(false)
    // const tieRef = useRef(null)
    const savedTasks = useSelector(state => state.saves.advertisementIds)
    const savedResponces = useSelector(state => state.saves.responsesIds)
    const savedCards = useSelector(state => state.saves.cardIds)
    const dispatch = useDispatch()

    console.warn(task)
    console.warn(id)
    console.warn(savedTasks)
    useEffect( () => {
        switch (navigate){
            case "advertisement":{
                savedTasks.forEach( (e, i) => {
                    
                    if (e.id === id){
                        console.log(id)
                        console.log(e)
                        setActive(true)
                    }
                } )
                break
            }
            case ("responce"):{
                savedResponces.forEach( (e, i) => {
                    if (e.id === id){
                        setActive(true)
                    }
                } )
                break
            }
            case "card":{

                savedCards.forEach( (e,i ) => {
                    if (e.id === id){
                        setActive(true)
                    }
                } )
                break
            }
            default : {
                window.Telegram.WebApp.showAlert('что-то пошло не так')
            }
                

        }
        
    } , [navigate , savedCards, id, savedTasks, savedResponces] )




    const deleteCardFunction = useCallback( () => {
        if (agree){

            window.Telegram.WebApp
            .showPopup({
              title: translation("Удалить?"),
              message: translation("Удалить из избранного?"),
              buttons: [
                { id: "save", type: "default", text: Yes },
                { id: "delete", type: "destructive", text: No },
              ],
            } , (buttonId) => {
        
              if (buttonId === "delete" || buttonId === null) {
                
              }
              if (buttonId === "save") {
                dispatch(deleteCard(id))
                setActive(false)
              }
        
        
            } )
        }
        else{
            setActive(false)
            dispatch(deleteCard(id))
        }
    }  , [id , agree , dispatch, setActive] )


    const deleteResponceFunc = useCallback( () => {
        if (agree){

            window.Telegram.WebApp
            .showPopup({
              title: translation("Удалить?"),
              message: translation("Удалить из избранного?"),
              buttons: [
                { id: "save", type: "default", text: Yes },
                { id: "delete", type: "destructive", text: No },
              ],
            } , (buttonId) => {
        
              if (buttonId === "delete" || buttonId === null) {
                
              }
              if (buttonId === "save") {
                dispatch(deleteResponce(id))
                setActive(false)
              }
        
        
            } )
        }
        else{
            setActive(false)
            dispatch(deleteResponce(id))
        }
    } , [id , agree , dispatch, setActive] )
    const deleteAdFunction = useCallback(() => {
        if (agree){

            window.Telegram.WebApp
            .showPopup({
              title: translation("Удалить?"),
              message: translation("Удалить из избранного?"),
              buttons: [
                { id: "save", type: "default", text: Yes },
                { id: "delete", type: "destructive", text: No },
              ],
            } , (buttonId) => {
        
              if (buttonId === "delete" || buttonId === null) {
                
              }
              if (buttonId === "save") {
                dispatch(deleteAdvertisement(id))
                setActive(false)
              }
        
        
            } )
        }
        else{
            setActive(false)
            dispatch(deleteAdvertisement(id))
        }
    } , [id , agree, dispatch, setActive] )

    const el = useRef(null)
    useEffect( () => {
        function click(){
            window.Telegram.WebApp.HapticFeedback.impactOccurred('soft')
        }
        if (el.current){
            el.current.addEventListener("click" , click)
        }

    } , [] )

    return (
        <div ref = {el} {...props}  onClick={(e) => {
            if (!end){

                if (!active){
                    switch (navigate){
                        case ("advertisement"):
                            dispatch(addAdvertisment([id , task]))
                            break
                        case ("responce"):
                            dispatch(addResponce([id, task]))
                            break
                        case ("card"):
                            dispatch(addCard([id, task]))
                            break
                        default : 
                            window.Telegram.WebApp.showAlert("Что-то не то")
                    }
                    setActive(true)
                    
                }
                else{
                    switch (navigate){
                        case ("advertisement"):
                            deleteAdFunction()
                            break;
                        case ("responce"):
                            deleteResponceFunc()
                            break;
                        case ("card"):
                            deleteCardFunction()
                            break;
                        default :
                            window.Telegram.WebApp.showAlert('Что - то пошло не так')
                    }
                    
                    
                }
            }
        }} className = {className ? [cl.FalseTie , className].join(' ') : cl.FalseTie}>
            {!end ? 
                        <svg className={active ? [cl.falseTie, cl.animationClass].join(' ') : cl.falseTie} width="18" height="21" viewBox="0 0 18 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M14.0978 1.80176C15.8171 1.80176 16.247 3.18964 16.247 3.88358V19.2571C16.247 20.2179 15.4204 19.8976 14.0978 19.2571L9.46867 17.1752C9.46867 17.1752 9.08075 17.0151 8.64205 17.0151C8.20335 17.0151 7.81542 17.1752 7.81542 17.1752L3.18633 19.2571C1.86373 19.8976 1.03711 20.2179 1.03711 19.2571V3.88358C1.03711 2.21812 2.46992 1.80176 3.18633 1.80176H14.0978Z" stroke="#2EA5FF" strokeWidth="2" />
                      </svg>
                      :
                      <svg className={cl.falseTie} width="18" height="21" viewBox="0 0 18 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M14.0978 1.80176C15.8171 1.80176 16.247 3.18964 16.247 3.88358V19.2571C16.247 20.2179 15.4204 19.8976 14.0978 19.2571L9.46867 17.1752C9.46867 17.1752 9.08075 17.0151 8.64205 17.0151C8.20335 17.0151 7.81542 17.1752 7.81542 17.1752L3.18633 19.2571C1.86373 19.8976 1.03711 20.2179 1.03711 19.2571V3.88358C1.03711 2.21812 2.46992 1.80176 3.18633 1.80176H14.0978Z" stroke="#2EA5FF" strokeWidth="2" />
                    </svg>

        }

        </div>
    );
};

export default FalseTie;