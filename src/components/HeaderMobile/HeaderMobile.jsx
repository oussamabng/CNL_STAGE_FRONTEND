import React,{useState} from 'react';
import { Icon,Image } from "semantic-ui-react";

//? import css
import "./HeaderMobile.css";

import Img from "../../assets/img.jpg";

export default function HeaderMobile(props) {
    const {isOpen,setIsOpen} = props;
    const handleOpen = ()=>{
        setIsOpen(prevState=>!prevState);
    }
    return (
        <div className="header_mobile">
            <div className="row">
                <div className="left_part">
                    <Image src={Img} alt="profile picture" />
                    <div className="texts">
                    <h2>George John</h2>
                    <p>Ministère</p>
                    </div>
                </div>
                <div className="right_part">
                    <Icon name="search" />
                    <div className={isOpen?"nav-icon opened":"nav-icon"} onClick={handleOpen} >
                        <div></div>
                    </div>
                </div>
            </div>
        </div>
    )
}
