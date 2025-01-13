
import { useNavigate } from 'react-router-dom';
import { compareTwoObject } from './compareTwoObject';

const useBack = ({walletH, happyHold, setOpen, isOpen, setBuyPage, setHappyHold, buyPage, oneCards, setOneCard, openAboutReaction, details, detailsTwo, setDetailsTwo, setPageValueTwo,secondPage,  setPageValueOne, setSecondPage, lastAdsTwo, setLastAdsTwo, myResponse, setMyResponse, save, setOpenAboutReaction , setShowDetails , showDetails, myAdOneAdvertisement}) => {
    const navigate = useNavigate()


    function goBack() {
        if (!walletH){
    
        
        if (happyHold){
          setOpen({ ...isOpen, isActive: false });
          setBuyPage(false)
          setHappyHold(false)
          // setSecondPage({ ...secondPage, isActive: false });
        }
        else{
    
          if (buyPage){
            setBuyPage(false)
          }
          else{
    
            if (oneCards.isOpen) {
              setOneCard((value) => ({ ...value, isOpen: false }));
            } else {
              if (!openAboutReaction.isActive) {
                if (!showDetails) {
                  if (detailsTwo.isOpen) {
                    setDetailsTwo((value) => ({ ...value, isOpen: false }));
                  } else {
                    if (isOpen.isActive) {
                      setPageValueTwo(false)
                      // isPageValueTwo = false
                      setOpen({ ...isOpen, isActive: false });
                    } else {
                      if (secondPage.isActive) {
                        setPageValueOne(false)
                        setSecondPage((value) => ({ ...value, isActive: false }));
                        // isPageValueOne = false
                      } else {
                        // if (history[history.length - 1] === '/AdCreating'){
      
                        //   navigate();
                        // }
                        // else{
                        //   navigate(-1)
                        // }
                        if (lastAdsTwo.isOpen) {
                          setLastAdsTwo((value) => ({ ...value, isOpen: false }));
                        } else {
                          if (myResponse.isOpen) {
                            setMyResponse((value) => ({ ...value, isOpen: false }));
                          } else {
                            navigate("/");
                          }
                        }
                      }
                    }
                  }
                } else {
                  if (!compareTwoObject(myAdOneAdvertisement, {...details, myAds : undefined})){
                    save();
                  }
                  else{
                    setShowDetails(false)
                  }
                  
                }
              } else {
                setOpenAboutReaction({ ...openAboutReaction, isActive: false });
              }
            }
          }
        }
      }
      }
      return goBack
};

export default useBack;