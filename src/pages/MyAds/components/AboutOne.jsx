import React from 'react';

import FirstBlock from '../../../components/First/FirstMain/FirstBlock';

import Top from './Top';
import ReactionBlock from './ReactionBlock';
const AboutOne = ({task, setMenuActive, goForward, setClosed}) => {
    return (
        <div className="aboutOne">
          <Top name={'Мои задания'} setMenuActive={setMenuActive}/>


          <FirstBlock  className={'FirstAdsBlock'}  {...task} />
 
          <ReactionBlock setClosed={setClosed} goForward = {goForward} />

        </div>
    );
};

export default AboutOne;