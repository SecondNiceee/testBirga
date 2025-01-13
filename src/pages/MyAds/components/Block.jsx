import React, { memo } from 'react';
import MyFirstBlock from '../../../components/MyAds/MyFirstBlock';

const Block = ({e, i, setSecondPage }) => {
    return (
        <>
          <div 
              className="block"
            >
              <MyFirstBlock
    
                {...e}
  
                myAdsFunc={(value) => {
                  setSecondPage({ isActive: true, task: e, index: i });
                }}
                isButton={true}
              />


            </div>
           

    </>

    );
};

export default memo(Block);