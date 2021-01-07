import React,{useState,useEffect} from 'react';

//? import components
import Index from "../../components/index.jsx";
import DossierInfoCompo from "../../components/DossierInfo/DossierInfoCompo.jsx";

export default function DossierInfo(props) {
    const [dossier,setDossier] = useState({});
    useEffect(()=>{
        props.location && props.location.state && setDossier(props.location.state.dossier)

    },[props.location])
    return (    
        <>
        <Index title="Informations du dossier" owner={1}  active="dossiers" >
            <DossierInfoCompo dossier={dossier} />
        </Index>
        </>
    )
}
