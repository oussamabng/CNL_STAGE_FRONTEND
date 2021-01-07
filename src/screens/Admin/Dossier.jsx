import React,{useEffect,useState} from 'react';

//? import components
import Index from "../../components/index.jsx";
import DossierTable from "../../components/DossierTable/DossierTable";
import AddDossier from "../../components/DossierTable/AddDossier";
import { useHistory } from 'react-router-dom';
import API from '../../API/API.js';

const Dossier = (props) => {
    const {add} = props;
    const history = useHistory();
        //? check if logged in
        useEffect(()=>{
            if (localStorage.getItem("token")){
                API.get("/api/agents/self")
                .then(res=>{
                    if (res.status === 200){
                        !res.data.is_admin && history.push("/admin/login")
                    }
                    else {
                        history.push('/admin/login')
                    }
                })
                .catch(err=>{
                    history.push("/error")
                })
            }
            else history.push('/admin/login')
        },[history])
    return (
        <>
        <Index title={!add ? "Les dossiers" : "Ajouter des dossiers"} owner={0}  active="dossiers" >
            {!add && <DossierTable />}
            {add && <AddDossier />}
        </Index>
        </>
    );
}

export default Dossier;
