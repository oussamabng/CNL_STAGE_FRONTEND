import React,{useEffect,useState} from 'react';
import DossierHistoryTreat from '../../components/DossierHistoryTreat/DossierHistoryTreat.jsx';

//? import components
import Index from "../../components/index.jsx";

const DossierHistory = (props) => {
    const [dossier,setDossier] = useState({});
    useEffect(()=>{
        props.location && props.location.state && setDossier(props.location.state.dossier)
    },[props.location])
    return (
        <>
        <Index title={"Historique du dossier"}  owner={0}  active="dossiers" >
            <DossierHistoryTreat dossier={dossier} />
        </Index>
        </>
    );
}

export default DossierHistory;
