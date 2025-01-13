import React, {
  forwardRef,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import MyLoader from "../../../components/UI/MyLoader/MyLoader";
import ResponseSuspense from "./ResponseSuspense";
import { useDispatch, useSelector } from "react-redux";
import {  fetchResponses } from "../../../store/responses";
import MyAnimation from "./MyAnimation";
const MyResponses = forwardRef(
  (
    { responsesArr, buttonFunction, viewsNumber, setViewsNumber, nowValue , text },
    ref
  ) => {
    const [page, setPage] = useState(2);
    const orderStatus = useSelector((state) => state.responses.status);
    const elementRef = useRef(null);
    const dispatch = useDispatch();
    const me = useSelector((state) => state.telegramUserInfo);

    const getMore = useCallback(async () => {
      if (me.id){
        dispatch(fetchResponses([me, page]));
        setPage(page + 1);
      }
    }, [page, setPage, dispatch, me]);

    const onIntersaction = useCallback(
      (entries) => {
        const firtEntry = entries[0];

        if (firtEntry.isIntersecting && orderStatus !== "all") {
          getMore();
        }
      },
      [orderStatus, getMore]
    );

    // useEffect( () => {
    //   if (nowValue === "cus")
    // } , [nowValue] )

    useEffect(() => {
      const observer = new IntersectionObserver(onIntersaction);
      if (observer && elementRef.current) {
        observer.observe(elementRef.current);
      }
      return () => {
        observer.disconnect();
      };
      // eslint-disable-next-line
    }, [responsesArr]);

    return (
      <div className="AdsContainer">
        {responsesArr.length === 0 ? (
          <MyAnimation text={text} />
        ) : (
          <>
            {responsesArr.map((e, i) => {
              return (
                <ResponseSuspense
                  viewsNumber={viewsNumber}
                  setViewsNumber={setViewsNumber}
                  func={buttonFunction}
                  index={i}
                  buttonText={"МОЙ ОТКЛИК"}
                  task={e}
                  isWatched={e.isWatched}
                  advertisement={e.advertisement}
                />
              );
            })}
          </>
        )}

        {orderStatus !== "all" && (
          <MyLoader
            ref={elementRef}
            style={{ height: "90px", marginLeft: "-16px" }}
          />
        )}
      </div>
    );
  }
);

export default MyResponses;
