import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

import  info  from '../images/icons/info.svg';
import plus from '../images/icons/Plus.svg'
import upUp from '../images/icons/UpUp.svg'
import wallet from '../images/icons/wallet.svg'
import upDownArr from '../images/icons/UpDown.svg'
import white_dymond from '../images/icons/whiteDymond.svg'
import download from '../images/icons/download.svg'
import BackButton from '../constants/BackButton';
import { useNavigate } from 'react-router-dom';
import pagesHistory from '../constants/pagesHistory';

const Balance = () => {
    const ref1 = useRef(null)
    const ref2 = useRef(null)
    const ref3 = useRef(null)
    const [whatShow,  setWhatShow] = useState('all')
    const [widthOfDocument , setWidthOfDocument] = useState(document.documentElement.clientWidth)
    const navigate = useNavigate()
    function goBack(){
        navigate(-1)
    }

    useEffect( () => {
        return () => {
          pagesHistory.push('/Balance')
        }
      } , [] )

    useEffect( () => {
        BackButton.show()
        BackButton.onClick( goBack )
        return () => {
            BackButton.offClick( goBack )
        }
    }  )

    useEffect(() => {
        ref1.current.style.minWidth = (document.documentElement.clientWidth - 32).toString() + 'px' 
        ref2.current.style.minWidth = (document.documentElement.clientWidth - 32).toString() + 'px' 
        ref3.current.style.minWidth = (document.documentElement.clientWidth - 32).toString() + 'px'
        function addKey(){
            ref1.current.style.minWidth = (document.documentElement.clientWidth - 32).toString() + 'px' 
            ref2.current.style.minWidth = (document.documentElement.clientWidth - 32).toString() + 'px' 
            ref3.current.style.minWidth = (document.documentElement.clientWidth - 32).toString() + 'px' 
            setWidthOfDocument(document.documentElement.clientWidth)
        }
        window.addEventListener('resize' , addKey)
        return () => {window.removeEventListener('resize' , addKey)}
    } 
     , []
)
    
    function setGreyBlock(whatShow){
            switch (whatShow){
                case 'all' : return 'translateX(calc(0% + 2px)) translateY(50%)'
                case 'plus' : return 'translateX(calc(100% )) translateY(50%)'
                case 'minus' : return 'translateX(calc(200% - 2px)) translateY(50%)'
                default :
                    return ''
            }
    }
    function setTransform(whatShow){
        switch (whatShow){
            case 'all' : return 'translateX(0px)'
            case 'plus' : return "translateX(" + (widthOfDocument*(-1)).toString() + "px)"
            case 'minus' : return "translateX(" + (widthOfDocument*(-2)).toString() + "px)"
            default :
                return ''
        } 
    }
    
    return (
        <motion.div className="all__balance" 
        initial = { {opacity : 0 }}
        animate = { { opacity : 1}}
        transition={ { duration : 0.1}}
         >


        <div className='balance__container'>
            <div className="ur__schet">
                <p>Счет</p>
                <img className='info' src={info} alt="" />
            </div>
            <div className="real__balance-block">
                <div className="real__balance-block-up">
                    <p className='balance-text'>117</p>
                    <p>TON</p>
                    <div className="blue__dymond">
                        <img src={white_dymond} alt="" />

                    </div>
                </div>
                <div className="real__balance-block-down">
                    <p>~ 15 000 RUB</p>

                </div>
            </div>
            <div className="balance__interesting">
                <div className="balance__interesting-top">
                    <div className="top-block">
                        <img src={plus} alt="" />
                        <p>Пополнить</p>
                    </div>
                    <div className="top-block">
                        <img src={upUp} alt="" />
                        <p>Отправить</p>
                    </div>
                </div>
                <div className="choice-of-get-more-block">
                    <img src={wallet} alt="" />
                    <p>Способ пополнения</p>
                    <div className="block-of-choice">
                        <p>Wallet</p>
                        <img className='upDown' src={upDownArr} alt="" />
                    </div>
                </div>
                <div className="choice-of-get-more-block">
                    <img src={wallet} alt="" />
                    <p>Способ пополнения</p>
                    <div className="block-of-choice">
                        <p>Wallet</p>
                        <img className='upDown' src={upDownArr} alt="" />
                    </div>
                </div>
            </div>

            
        </div>

        <div className="transaction">
                <p>ИСТОРИЯ ТРАНЗАКЦИЙ</p>

                <div className="stages">
                <div style={
                    {transform : setGreyBlock(whatShow)}
                 } className="grey__block">
                    
                </div>
                    <div onClick={() => setWhatShow('all')} className="stage">
                        <p>Все</p>
                    </div>
                    <div onClick={() => setWhatShow('plus')} className="stage">
                        <p>Пополнения</p>
                    </div>
                    <div onClick={() => setWhatShow('minus')} className="stage">
                        <p>Списания</p>
                    </div>
                </div>



                <div className="transtion__main-wrapper">

                    <div className="transaction__main"   style={{transform : setTransform(whatShow)}}
                 >
                        <div style={whatShow === 'all' ? {opacity : 1} : {opacity : 0}} className="common"  ref={ref1}>
                            <div className="common__block" >
                                <div className="download">
                                    <img className='download-image' src={download} alt="" />
                                </div>
                                <div className="common-text" >
                                    <p>Пополнение TON</p>
                                    <p className='date-text'>3 марта в 00:38</p>
                                </div>
                                <div className="common-color-text" >
                                    <div className="how__many">
                                        <p className='how__many-text'>+ </p>
                                        <p className='how__many-text'>1 TON</p>
                                    </div>
                                    <p>Получено</p>
                                </div>
                            </div>
                        </div >
                        <div style={whatShow === 'plus' ? {opacity : 1} : {opacity : 0}} className="common plus" ref={ref2}>
                        <div className="common__block">
                                <div className="download">
                                    <img className='download-image' src={download} alt="" />
                                </div>
                                <div className="common-text">
                                    <p>Пополнение TON</p>
                                    <p className='date-text'>3 марта в 00:38</p>
                                </div>
                                <div className="common-color-text">
                                    <div className="how__many">
                                        <p className='how__many-text'>+ </p>
                                        <p className='how__many-text'>1 TON</p>
                                    </div>
                                    <p>Получено</p>
                                </div>
                            </div>
                        </div>
                        <div style={whatShow === 'minus' ? {opacity : 1} : {opacity : 0}} className="common minus" ref={ref3}>
                        {/* <div className="common__block">
                                <div className="download">
                                    <img className='download-image' src={download} alt="" />
                                </div>
                                <div className="common-text">
                                    <p>Пополнение TON</p>
                                    <p className='date-text'>3 марта в 00:38</p>
                                </div>
                                <div className="common-color-text">
                                    <div className="how__many">
                                        <p className='how__many-text'>+ </p>
                                        <p className='how__many-text'>1 TON</p>
                                    </div>
                                    <p>Получено</p>
                                </div>
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default Balance;