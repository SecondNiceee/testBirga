import  { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const useProtect = () => {
    const address = useSelector( state => state.telegramUserInfo.address )
    const id = useSelector( state => state.telegramUserInfo.id )
    
    const navigate = useNavigate()

    useEffect( () => {
        if (id){

            if (!address){
                navigate("/CreateWallet")
            }

        }
    } , [address, id, navigate] )
};

export default useProtect