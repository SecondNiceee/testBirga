import React, { forwardRef, memo, useEffect, useRef } from 'react';
import TaskDetailsContainer from './TaskDetailsContainer';
import TimeAndWatches from './TimeAndWatches';
import SimilarAds from './SimilarAds';
import { useDispatch } from 'react-redux';
import { addWatch } from '../../../store/information';

const FirstDetails = forwardRef(({  orderInformation , className , setProfile, end = false, breakRef, isDetailsActive, ...props}, ref) => {
    
    // useEffect( () => {  
    //     if (isDetailsActive ){
    //         if (breakRef.current && mainRef.current){

    //             breakRef.current.style.overflow = "hidden"
    //             mainRef.current.style.overflow = "scroll"
    //         }
    //     }
    //     else{
    //         if (breakRef){
    //             breakRef.current.style.overflow = "scroll"
    //         }
    //     }

    // } , [isDetailsActive , breakRef] )
    

    const disatch = useDispatch()
    useEffect( () => {
        if (!end && orderInformation ){
            disatch(addWatch(orderInformation))
        }
    } , [disatch, end , orderInformation] )

    console.log(orderInformation)
    return (
        <>
        {orderInformation
            ? 
            (
            
            <div ref={ref} {...props} className  =  {className ? ['TaskDetails' , className].join(' ') : 'TaskDetails'} >

                <TaskDetailsContainer setProfile = {setProfile} end = {end}  orderInformation = {orderInformation} />
                
                {end ? <></> :<TimeAndWatches time={orderInformation.creationTime} watches={orderInformation.viewsNumber} />}
                
    
    
            </div>
            )
            :
            <>
            </>
        }
        </>
    );
});

export default memo(FirstDetails);