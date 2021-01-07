import React,{useState,useEffect} from 'react';

//? import css
import "./Loading.css";

import {ReactComponent as Logo} from "../../assets/logo.svg"

const Loading = () => {
    const [active,setActive] = useState(0);
    useEffect(()=>{
        const interval = setInterval(()=>{
            setActive(prevState=>{
                if (prevState === 3) {
                    return 0
                } else return prevState +1
            });
        },1200)
        return ()=>{
            clearInterval(interval)
        }
    },[])
    
    return (
        <div className="loading_sip">
            <div className="row">
            <div className="circles">
                <div 
                style={{
                left:"50%",
                top:"0"
                }}
                className={active === 0?"circle_loading orange top":"circle_loading top"}>
                </div>
                <div
                style={{
                left:"0%",
                top:"50%"
                }} 
                className={active === 1?"circle_loading orange left":"circle_loading left"}>
                </div>
                <div
                style={{
                left:"50%",
                top:"100%"
                }}
                className={active === 2?"circle_loading orange bottom":"circle_loading bottom"}>
                </div>
                <div
                style={{
                left:"100%",
                top:"50%"
                }}
                className={active === 3?"circle_loading orange right":"circle_loading right"}>
                </div>
            </div>           
            <div className="texts">
                <p>chargement en cours</p>
                <span>Veuillez Patienter</span>
                <Logo />
            </div>
            </div>
        </div>
    );
}

export default Loading;
