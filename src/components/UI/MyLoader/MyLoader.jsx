import { Triangle } from "react-loader-spinner";
import cl from "./MyLoader.module.css"
import { forwardRef } from "react";
const MyLoader = forwardRef(({text, ...props}, ref) => {
    return (
      <div
       {...props}
        className={cl.main}
      >

            <div ref={ref} style={{
                width : "1px",
                height : "2000px",
                position : "absolute",
                top : "-2000px",
                opacity : "0",
                zIndex : -1,
                left : '40px'
            }} className="catch_block"></div>
        <Triangle
          visible={true}
          height="80"
          width="80"
          color="white"
          ariaLabel="triangle-loading"
          wrapperStyle={{}}
          wrapperClass=""
        />
        {text && <p className={cl.text}>{text}</p>}
      </div>
    );
  } );
export default MyLoader