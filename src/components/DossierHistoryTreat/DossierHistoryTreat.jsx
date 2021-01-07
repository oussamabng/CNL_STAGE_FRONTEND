import React,{useEffect,useState} from 'react';
import { Menu } from 'semantic-ui-react'
import API from '../../API/API.js';
import moment from 'moment'
import 'moment/locale/fr';  
import { useHistory } from "react-router-dom";

import "./DossierHistoryTreat.css";
import DossierInfo from './DossierInfo';
import VerificationLogs from './VerificationLogs';
import RevenueLogs from './RevenueLogs';
import ControleInfo from './ControleInfo';
import CfLogs from './CfLogs';
import AffLogs from './AffLogs';

const DossierHistoryTreat = (props)=>{
    moment.locale('fr');
    const history = useHistory();
    const [activeItem,setActiveItem] = useState("Information du dossier")
    const {dossier} = props;
    const [transmition,setTransmition] = useState({});
    const [dossierData,setDossierData] = useState({});
    const [verificationData,setVerificationData] = useState([]);
    const [revenueData,setRevenueData] = useState([]);
    const [controleData,setControleData] = useState([]);
    const [cfData,setCfData] = useState([]);
    const [affData,setAffData] = useState([]);
    

    const handleItemClick = (e, { name }) => setActiveItem(name)

    useEffect(()=>{
        if (dossier){
           dossier.Transmition && setTransmition(
                {
                    date:dossier.Transmition.date,
                    agent:dossier.Transmition.Agent.username
                }
            );
            dossier.Postulant && dossier.Conjoint && setDossierData(
                {
                    postulant:dossier.Postulant.first_name+" "+dossier.Postulant.last_name,
                    conjoint:dossier.Conjoint[0].first_name+" "+dossier.Conjoint[0].last_name,
                    place:dossier.Postulant.place_of_birth,
                    family_situation:dossier.Postulant.family_situation,
                    date_debut_verification: dossier.date_debut_verification ? (dossier.date_debut_verification) : null,
                    date_fin_verification:dossier.date_fin_verification ? (dossier.date_fin_verification) : null
                }
            )
        }
    },[dossier])

    //? get all data ordered by date
    useEffect(()=>{
        dossier && dossier.id && API.get(`/api/verification?dossierId=${dossier.id}&ordering=createdAt&limit=9999999999999999999999999999999999`)
        .then(res=>{
            setVerificationData(res.data.results);
        })
        .catch(err=>{
            history.push("/error")
        })
    },[dossier])


    useEffect(()=>{
        dossier && dossier.id && API.get(`/api/revenue_rejet?dossierId=${dossier.id}&ordering=createdAt&limit=9999999999999999999999999999999999`)
        .then(res=>{
            setRevenueData(res.data.results);
        })
        .catch(err=>{
            history.push("/error")
        })
    },[dossier])

    useEffect(()=>{
        dossier && dossier.id && API.get(`/api/control_rejet?dossierId=${dossier.id}&ordering=createdAt&limit=9999999999999999999999999999999999`)
        .then(res=>{
            setControleData(res.data.results);
        })
        .catch(err=>{
            history.push("/error")
        })
    },[dossier])

    useEffect(()=>{
        dossier && dossier.id && API.get(`/api/cf_rejet?dossierId=${dossier.id}&ordering=createdAt&limit=9999999999999999999999999999999999`)
        .then(res=>{
            setCfData(res.data.results);
        })
        .catch(err=>{
            history.push("/error")
        })
    },[dossier])
    
    useEffect(()=>{
        dossier && dossier.id && API.get(`/api/aff_rejet?dossierId=${dossier.id}&ordering=createdAt&limit=9999999999999999999999999999999999`)
        .then(res=>{
            setAffData(res.data.results);
        })
        .catch(err=>{
            history.push("/error")
        })
    },[dossier])

    console.log({dossier})

    return (
        <div className="historyDossier">
           <div className="menuDossier">
        <Menu pointing secondary>
          <Menu.Item
            name='Information du dossier'
            active={activeItem === 'Information du dossier'}
            onClick={handleItemClick}
          />
          <Menu.Item
            name='Vérification'
            active={activeItem === 'Vérification'}
            onClick={handleItemClick}
          />
          <Menu.Item
            name='Revenue'
            active={activeItem === 'Revenue'}
            onClick={handleItemClick}
          />
          <Menu.Item
              name='Controle'
              active={activeItem === 'Controle'}
              onClick={handleItemClick}
            />
            <Menu.Item
              name='cf'
              active={activeItem === 'cf'}
              onClick={handleItemClick}
            />
            <Menu.Item
              name='Affiliation'
              active={activeItem === 'Affiliation'}
              onClick={handleItemClick}
            />
        </Menu>
        {
                activeItem === "Information du dossier" && 
                <DossierInfo dossierData={dossierData} transmition={transmition} />
        }
        {
                activeItem === "Vérification" &&
                <VerificationLogs dossierData={dossierData} verificationData={verificationData} />
        }
        {
            activeItem === "Revenue" &&
            <RevenueLogs revenueData={revenueData} dossier={dossier} />
        }
        {
            activeItem === "Controle" &&
            <ControleInfo controleData={controleData} dossier={dossier} />
        }
        {
            activeItem === "cf" &&
            <CfLogs cfData={cfData} dossier={dossier} />
        }
        {
            activeItem === "Affiliation" &&
            <AffLogs affData={affData} dossier={dossier} />
        }
            </div>
            
          </div>
    )
}

export default DossierHistoryTreat;