import React,{useState,useEffect} from 'react';

//? import components
import Sidebar from "../components/Sidebar/Sidebar.jsx";
import Header from "../components/Header/Header.jsx";
import HeaderMobile from "../components/HeaderMobile/HeaderMobile.jsx";
import API from "../API/API.js";
import {useHistory} from "react-router-dom";


const Index = (props) => {
    const {title,active,owner} = props;
    const [isOpen,setIsOpen] = useState(false);
    const [username,setUsername] = useState("");
    const history = useHistory();

    useEffect(()=>{
        if (owner === 0){
            API.get("/api/agents/self")
            .then(res=>{
                setUsername(res.data.username)
            })
            .catch(err=>{
                console.log(err.response);
                history.push("/admin/login")
            })
        } else{
            API.get("/api/agents/self")
            .then(res=>{
                setUsername(res.data.username)
            })
            .catch(err=>{
                console.log(err.response);
                history.push("/agent/login")
            })
        }
    },[]);
    return (
        <>
            <Header title={title} />
            <Sidebar isOpen={isOpen} username={username} owner={owner} active={active} />
            <HeaderMobile isOpen={isOpen} setIsOpen={setIsOpen} owner={owner} active={active} />
            <main className="main_">
                {props.children}
            </main>
            
        </>
    );
}

export default Index;
