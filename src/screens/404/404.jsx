import React from 'react';
import { Image, Button } from "semantic-ui-react"

//? import css 
import "./404.css";

//? import components
import Index from "../../components/index.jsx";

import ImgError from "../../assets/404.png";

const ErrorPage = () => {
    const handleReturn  = ()=>{
        window.history.back();
    }
    return (
        <>
        <Index owner={0} >
            <div className="error_container">
                <div className="error_circle">
                    <Image src={ImgError} alt='img' />
                    <p>Erreur 404</p>
                    <h2>Oups, page introuvable</h2>
                    <Button onClick={handleReturn} content="Retourner" />
                </div>
            </div>
        </Index>
        </>
    );
}

export default ErrorPage;
