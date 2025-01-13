import React from 'react';
import { Hourglass } from 'react-loader-spinner';

const BlockSpinner = ({...props}) => {
    return (
    <div {...props} className="First__block loaderBlock">
        <Hourglass
        visible={true}
        height="45"
        width="45"
        ariaLabel="hourglass-loading"
        wrapperStyle={{}}
        wrapperClass=""
        colors={['#306cce', '#72a1ed']}
        />
    </div>
    );
};

export default BlockSpinner;