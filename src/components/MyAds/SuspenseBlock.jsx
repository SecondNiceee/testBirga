import React, { lazy, Suspense, useEffect, useMemo, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import Block from '../../pages/MyAds/components/Block';

const SuspenseBlock = ({i , e, setSecondPage ,  viewsNumber = 0, setViewsNumber = () => {}}) => {
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
    } , [inView, isVisible] )
    const style = useMemo( () =>{
        if (e.photos.length > 0){
            return {minHeight : "calc(184px + 35vh)" , position : "relative"}
        }
        else{
            return {minHeight : "calc(178px)", position : "relative"}
        }
    } , [e.photos] )
    return (
        <div className='First__block' style={!isVisible ? style : {}} >
            <div ref={ref} style={{
                width : "1px",
                height : "2000px",
                position : "absolute",
                top : "-1800px",
                opacity : "0",
                left : "40px",
                zIndex : -1
            }} className="catch_block"></div>
            {isVisible &&
                        <Block e={e} i={i} setSecondPage={setSecondPage}/>
                }
        </div>
    );
};

export default SuspenseBlock;