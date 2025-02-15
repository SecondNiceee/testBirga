import React from "react";
import { Triangle } from 'react-loader-spinner';
import './loaders.css'
import Text from "../components/Text/Text";
const PostLoader = () => {
  return (
    <div className="postLoader">
        <Triangle
          visible={true}
          height="80"
          width="80"
          color="white"
          ariaLabel="triangle-loading"
          wrapperStyle={{}}
          wrapperClass=""
        />
        <div className="loaderText-block">
            <Text className="loaderText">Задание сохраняется</Text>

            {/* <ThreeDots
          visible={true}
          height="20"
          width="20"
          color="white"
          radius="9"
          ariaLabel="three-dots-loading"
          wrapperStyle={{}}
          wrapperClass="threeDots"
        /> */}
        </div>
      </div>
  );
};

export default PostLoader;
