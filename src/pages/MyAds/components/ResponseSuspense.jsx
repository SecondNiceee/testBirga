
import React, { lazy, Suspense, useEffect, useMemo, useState } from 'react';
import BlockSpinner from '../../../components/UI/BlockSpinner/BlockSpinner';
import { useInView } from 'react-intersection-observer';
// import ResponseBlock from '../../../components/MyAds/ResponseBlock';

const ResponseBlock = lazy( () => import("../../../components/MyAds/ResponseBlock") )
const ResponseSuspense = ({func , index, buttonText , task, isWatched, advertisement,  viewsNumber = 0, setViewsNumber = () => {}}) => {
    const { ref, inView } = useInView({
        threshold: 0, // Порог видимости (от 0 до 1)
      });
    const [isVisible, setVisible] = useState(false)
    useEffect( () => {
        if (!isVisible){

            if (inView){
                setVisible(true)
                setViewsNumber((value) => (value + 1))
            }

        }
    } , [inView, isVisible, setViewsNumber] )
    const style = useMemo( () =>{
        if (advertisement.photos.length > 0){
            return {minHeight : "315px"}
        }
        else{
            return {minHeight : "178px"}
        }
    } , [advertisement.photos] )

    return (
        <div style={!isVisible ? style : {position : "relative"}} className="First__block">
            {
                isVisible && <Suspense fallback = {<BlockSpinner style = {advertisement.photos.length > 0 ? {minHeight : "315px"} : {minHeight : "178px"}} />}>
                    <ResponseBlock func={func} index={index} buttonText={buttonText} task={task} isWatched={isWatched} {...advertisement} />
                </Suspense>
            }
            <div ref={ref} style={{
                height : "2000px",
                position : "absolute",
                top : "-1800px",
                opacity : "0",
                zIndex : -1,
                width : "30px",
                right : "-25px"
              
            }} className="catch_block"></div>
    </div>
       
    );
};

export default ResponseSuspense;