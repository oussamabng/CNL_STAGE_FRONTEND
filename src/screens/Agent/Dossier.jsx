import React,{useEffect,useState} from 'react';

//? import components
import Index from "../../components/index.jsx";
import AgentDossierTable from "../../components/AgentDossierTable/AgentDossierTable";
import API from '../../API/API.js';
import { useHistory } from 'react-router-dom';

export default function Dossier(props) {
    const [AgentId,setAgentId] = useState(null);
    const history = useHistory();
    useEffect(() => {
        API.get("/api/agents/self")
        .then(res=>{
            setAgentId(res.data.id);
        })
        .catch(err=>{
            history.push("/error")
        })
    }, [history]);
    return (    
        <>
        <Index title="Les dossiers" owner={1}  active="dossiers" >
            <AgentDossierTable AgentId={AgentId} />
        </Index>
        </>
    )
}
