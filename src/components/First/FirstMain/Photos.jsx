import React, { memo, useMemo } from "react";

const Photos = ({ photos }) => {
    const style = useMemo( () => {
        if (photos.length === 1){
            return {
                width: "calc(100% - 3.67px)",
                marginLeft: "auto",
                marginRight: "auto",
              }
        }
        else{
            return {}
        }
    }, [photos] )
  return (
    <>
      {photos.length ? (
        <div className="first__photos">
          {photos.map((e, i) => {
            return (
              <img
                key={i}
                src={URL.createObjectURL(e)}
                style={style}
                className="first__photo"
                alt=""
              />
            );
          })}
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default memo(Photos);
