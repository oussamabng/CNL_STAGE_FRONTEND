import React,{useState,useEffect} from 'react';
import LoginComponent from "../Login/Login";
import API from "../../API/API.js";
import { useHistory } from "react-router-dom";
import Loading from "../Loading/Loading.jsx";

const Login = ()=>{
        const [start,setStart] = useState(false);
        const history = useHistory();
        //? check if logged in
        useEffect(()=>{
            if (localStorage.getItem("token")){
                API.get("/api/agents/self")
                .then(res=>{
                    if (res.status === 200){
                        res.data.is_admin ? history.push("/admin") : history.push("/agent/dossier")
                    }
                    else {
                        setStart(true);
                    }
                })
                .catch(err=>{
                    setStart(true);
                    
                })
            }
            else{
                setStart(true);
            }
        },[history])
    return (
        <>
            { start && <LoginComponent  owner={0} /> }
            { !start && <Loading /> }
        </>
    )
}

export default Login;
