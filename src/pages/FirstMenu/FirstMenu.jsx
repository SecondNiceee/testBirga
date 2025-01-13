import React, { forwardRef, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import userPhoto from '../../images/userPhoto/user.png'
import Text from "../../components/Text/Text";
import { setChanger } from "../../store/menuSlice";

const FirstMenu = forwardRef(({...props} , ref) => {
  const dispatch = useDispatch();

  const isMenuActive = useSelector((state) => state.menuSlice.value);


  const location = useLocation();

  const me = useSelector((state) => state.telegramUserInfo);

  const navigate = useNavigate()
  const onClick = useCallback( (par) => {
    dispatch(setChanger())
    navigate(par)
    ref.current.classList.add("fuckNuubs")
    ref.current.classList.remove("disappearAnimation")
  } , [navigate, dispatch, ref] )

  return (
    <div ref={ref} className={isMenuActive ? "FirstMenu" : "FirstMenu hidden"}>
      {/* <div ref={myRef} onTouchStart={clickHandler} onTouchEnd={touchEnd} onClick={() => {
                    vibrate()
                    window.Telegram.WebApp.showAlert("Мы скоро добавим.")
            }} className="MenuPrice">
                <Text  className='MenuTextPrice'>Скоро</Text>
                 <SmallDimond className= 'dymond' /> 
            </div> */}

      <div className="MenuList">
        <div className={ (location.pathname === "/" )  ? "menuLink active" : "menuLink"} onClick={() => {onClick("/")}}  >
          <svg
            width="33"
            height="25"
            viewBox="0 0 33 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
            className="menuPath"
              d="M0.0195312 18.4376C0.0195312 17.5211 0.170201 16.6296 0.647321 15.487L5.78265 3.39579C6.53599 1.61286 8.09291 0.608398 10.0767 0.608398C12.5879 0.608398 14.2201 2.21554 14.2201 4.65137V5.76883C14.873 5.5805 15.5762 5.48005 16.2919 5.48005C17.0452 5.48005 17.7358 5.55539 18.351 5.71861V4.65137C18.351 2.2281 19.9833 0.608398 22.4944 0.608398C24.4657 0.608398 26.0226 1.62542 26.7759 3.40834L31.9113 15.4996C32.401 16.6296 32.5516 17.5336 32.5516 18.4376C32.5516 22.016 29.3624 24.6904 25.445 24.6904C21.5151 24.6904 18.351 22.016 18.351 18.4376V15.3489C17.786 15.1606 17.0954 15.0852 16.2919 15.0852C15.5511 15.0852 14.8228 15.2108 14.2201 15.4242V18.4376C14.2201 22.0035 11.0435 24.6779 7.12612 24.6779C3.20871 24.6779 0.0195312 22.0035 0.0195312 18.4376ZM14.2076 11.5696C14.8228 11.3562 15.5511 11.2306 16.2919 11.2306C17.108 11.2306 17.786 11.3185 18.351 11.5068V9.57324C17.7358 9.41002 17.0452 9.33468 16.2919 9.33468C15.5762 9.33468 14.873 9.43513 14.2076 9.63602V11.5696ZM2.39258 18.4376C2.39258 20.7981 4.42662 22.3927 7.12612 22.3927C9.82561 22.3927 11.9224 20.7981 11.9224 18.4376C11.9224 16.0646 9.82561 14.47 7.12612 14.47C4.42662 14.47 2.39258 16.0646 2.39258 18.4376ZM20.6487 18.4376C20.6487 20.8107 22.7455 22.4053 25.445 22.4053C28.1445 22.4053 30.166 20.7981 30.166 18.4376C30.166 16.0771 28.1445 14.47 25.445 14.47C22.7455 14.47 20.6487 16.0771 20.6487 18.4376Z"
              fill="#DAF5FE"
            />
          </svg>

          <Text>Задания</Text>
        </div>
        <Link className={ location.pathname === "/AdCreating" ? "menuLink active" : "menuLink"} to="/AdCreating">
          <svg
            width="26"
            height="27"
            viewBox="0 0 26 27"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
            className="menuPath"
              d="M12.9827 26.7642C20.1018 26.7642 25.978 20.8881 25.978 13.7815C25.978 6.67494 20.0893 0.798828 12.9701 0.798828C5.86356 0.798828 0 6.67494 0 13.7815C0 20.8881 5.87612 26.7642 12.9827 26.7642ZM12.9827 24.1777C7.21959 24.1777 2.61161 19.5446 2.61161 13.7815C2.61161 8.01841 7.21959 3.39788 12.9701 3.39788C18.7333 3.39788 23.3664 8.01841 23.3789 13.7815C23.3915 19.5446 18.7458 24.1777 12.9827 24.1777ZM8.34961 14.9743H11.7899V18.4272C11.7899 19.1177 12.2796 19.6074 12.9576 19.6074C13.6607 19.6074 14.1629 19.1177 14.1629 18.4272V14.9743H17.6158C18.3064 14.9743 18.8086 14.4847 18.8086 13.7941C18.8086 13.1035 18.3189 12.6013 17.6158 12.6013H14.1629V9.14844C14.1629 8.44531 13.6607 7.95564 12.9576 7.95564C12.2796 7.95564 11.7899 8.44531 11.7899 9.14844V12.6013H8.34961C7.63393 12.6013 7.14425 13.1035 7.14425 13.7941C7.14425 14.4847 7.64648 14.9743 8.34961 14.9743Z"
              fill="#7D919E"
            />
          </svg>

          <Text>Разместить</Text>
        </Link>
        <div className={ (location.pathname === "/Profile" || location.pathname === "/AllShablons") ? "menuLink active" : "menuLink"} onClick={() => {onClick("/Profile")}}>
          <div className="menuCircle">
            <img className="menuPhoto" src={me.photo.length > 0 ? me.photo.split('https://').length === 2 ? me.photo : `${process.env.REACT_APP_HOST}/${me.id}/${me.photo}` : userPhoto} alt="" />
          </div>
        </div>
        <div className={ location.pathname === "/MyAds" ? "menuLink active" : "menuLink"} onClick={() => {onClick("/MyAds")}}>
          <svg
            width="30"
            height="23"
            viewBox="0 0 30 23"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
            className="menuPath"
              d="M4.29688 22.7794H25.7799C28.5045 22.7794 29.9233 21.3732 29.9233 18.6862V11.655C29.9233 10.2487 29.7224 9.64606 29.0695 8.79227L24.9512 3.30538C23.4821 1.35924 22.7162 0.819336 20.4562 0.819336H9.63309C7.36049 0.819336 6.59459 1.35924 5.13811 3.30538L1.00725 8.79227C0.366908 9.64606 0.166016 10.2487 0.166016 11.655V18.6862C0.166016 21.3732 1.58482 22.7794 4.29688 22.7794ZM15.0446 15.0576C13.1362 15.0576 11.9434 13.5384 11.9434 11.9689V11.8684C11.9434 11.2909 11.5918 10.7384 10.8761 10.7384H3.31752C2.85296 10.7384 2.77762 10.3617 2.99107 10.0604L7.57394 3.90806C8.10128 3.17983 8.76674 2.9036 9.62054 2.9036H20.4687C21.31 2.9036 21.9754 3.17983 22.5153 3.90806L27.0857 10.0604C27.2991 10.3617 27.2238 10.7384 26.7592 10.7384H19.2006C18.4849 10.7384 18.1459 11.2909 18.1459 11.8684V11.9689C18.1459 13.5384 16.9531 15.0576 15.0446 15.0576Z"
              fill="#7D919E"
            />
          </svg>

          <Text>Мои задания</Text>
        </div>
        <div className= { location.pathname === "/savedPage" ? "menuLink active" : "menuLink"} onClick={() => {onClick("/savedPage")}}>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
            className="menuPath"
              d="M4.13672 23.2605C1.44727 23.2605 0.0527344 21.8784 0.0527344 19.2139V4.06079C0.0527344 1.39624 1.44727 0.0141602 4.13672 0.0141602H19.2151C21.9045 0.0141602 23.2991 1.39624 23.2991 4.06079V19.2139C23.2991 21.866 21.9045 23.2605 19.2151 23.2605H4.13672ZM7.99658 18.4419C8.35767 18.4419 8.56934 18.2551 9.11719 17.7073L11.6572 15.2046C11.6821 15.1797 11.7319 15.1797 11.7693 15.2046L14.2969 17.7073C14.8572 18.2551 15.0688 18.4419 15.4175 18.4419C15.9031 18.4419 16.2268 18.0808 16.2268 17.5081V6.8125C16.2268 5.54248 15.5544 4.84521 14.2844 4.84521H9.12964C7.85962 4.84521 7.18726 5.54248 7.18726 6.8125V17.5081C7.18726 18.0808 7.51099 18.4419 7.99658 18.4419Z"
              fill="#7D919E"
            />
          </svg>

          <Text>Избранное</Text>
        </div>
      </div>
    </div>
  );
});

export default FirstMenu;
