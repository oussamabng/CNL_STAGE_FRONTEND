import React,{useEffect,useState} from 'react';
import { Button, Dropdown,TransitionablePortal,Segment, Icon } from "semantic-ui-react";
import "./DossiertTreatment.css";
import Index from "../index";
import FormVerification from "./FormVerification";
import API from '../../API/API.js';
import { useHistory } from 'react-router-dom';
import FormRevenue from './FormRevenue';
import FormControl from './FormControl';
import FormCf from './FormCf';
import FormAff from './FormAff';


const DossiertTreatment = (props)=>{
    const history = useHistory();
    const [dossier,setDossier] = useState(null);
    const [activeItem,setActiveItem] = useState("Vérification");
    const [disableDebut,setDisableDebut] = useState(false);
    const [disableEnd,setDisableEnd] = useState(false);
    const [code,setCode] = useState(0);
    const [show,setShow] = useState(false);
    const [start,setStart] = useState(false);
    const options = [
        {
            key:0,
            value:"Vérification",
            text:"Vérification"
        },
        {
            key:2,
            value:"Revenue",
            text:"Revenue"
        },
        {
            key:3,
            value:"Controle",
            text:"Controle"
        },
        {
            key:4,
            value:"Cf",
            text:"Cf"
        },
        {
            key:5,
            value:"Affiliation",
            text:"Affiliation"
        },
        
    ]
    //? get dossier info
    useEffect(()=>{
        props.location.state && setDossier(props.location.state.dossier);
    },[props.location.state])


    //? get if date debut and date_fin already exist
    useEffect(()=>{
        dossier && API.get(`/api/dossier/${dossier.id}`)
        .then(res=>{
            switch (code) {
                case 0:
                    res.data.date_debut_verification && setDisableDebut(true);
                    res.data.date_fin_verification && setDisableEnd(true);
                    break;
                case 1:
                    res.data.date_debut_verification_reserve && setDisableDebut(true);
                    res.data.date_fin_verification_reserve && setDisableEnd(true);
                    break;      
                case 2:
                    res.data.date_debut_revenue && setDisableDebut(true);
                    res.data.date_fin_revenue && setDisableEnd(true);
                    break;  
                case 3:
                    res.data.date_debut_ctrl && setDisableDebut(true);
                    res.data.date_fin_ctrl && setDisableEnd(true);
                    break;
                case 4:
                    res.data.date_debut_cf && setDisableDebut(true);
                    res.data.date_fin_cf && setDisableEnd(true);
                    break;
                case 5:
                    res.data.date_debut_aff && setDisableDebut(true);
                    res.data.date_fin_aff && setDisableEnd(true);
                    break;
                default:
                    break;
            }
            setStart(true);
        })
        .catch(err=>{
            console.log(err.response);
            return history.push("/error");

        })
    },[code,dossier])

    const handleTypeTreatement = (e,{value})=>{
        setActiveItem(value);
        handleType(value);
        setDisableDebut(false);
        setDisableEnd(false);
    }
    const handleType = (choice)=>{
        switch (choice) {
            case "Vérification":
                setCode(0);
                break;
            case "Réserves vérification":
                setCode(1);
                break;
            case "Revenue":
                setCode(2);
                break;
            case "Controle":
                setCode(3);
                break;
            case "Cf":
                setCode(4);
                break;
            case "Affiliation":
                setCode(5);
                break;
            default:
                break;
        }
    }

    const getBody = (type)=>{
            //? begin 0
            //? end 1
            const date_now = new Date();           
            switch (code) {
                case 0:
                    return type === 0 ? {date_debut_verification: date_now}  : {date_fin_verification: date_now}
                case 1:
                    return type === 0 ? {date_debut_verification_reserve: date_now}  : {date_fin_verification_reserve: date_now}
                case 2:
                    return type === 0 ? {date_debut_revenue: date_now}  : {date_fin_revenue: date_now}
                case 3:
                    return type === 0 ? {date_debut_ctrl: date_now}  : {date_fin_ctrl: date_now}
                case 4:
                    return type === 0 ? {date_debut_cf: date_now}  : {date_fin_cf: date_now}
                case 5:
                    return type === 0 ? {date_debut_aff: date_now}  : {date_fin_aff: date_now}
                default:
                    break;
            }
    }

    const handleDateStep = (e)=>{
        const name = e.currentTarget.attributes["date-id"].value;
        switch (name) {
            //? begin 0
            //? end 1
            case "begin":
                updateDateStep(getBody(0),0);
                break;
            case "end":
                updateDateStep(getBody(1),1);
                break;
        
            default:
                break;
        }
    }

    const updateDateStep = (body,type)=>{
        API.put(`/api/dossier/${dossier.id}`,body)
        .then(res=>{
            if (type === 0){
                setDisableDebut(true);
            } else if (type === 1){
                setDisableEnd(true);
            }
            setShow(true);
            setTimeout(()=>{
                setShow(false);
            },2000)
        })
        .catch(err=>{
            console.log(err.response);
            return history.push("/error");
        })
    }

    return (
        <>
        {
            start ?     
            <Index title="Traitement dossier" owner={1}  active="dossiers" >
            <div className="projet_sip">
               <div className="header_table">
                   
                    <TransitionablePortal
                   open={show}
                   onClose={()=>setShow(false)}
               >
                   <Segment className="modal-date"
       >
         <h1>Succès <Icon name="check circle" /> </h1>
         <p>Date {activeItem} ajouté avec succès</p>
       </Segment>
               </TransitionablePortal>
                   <div className="row treat">
                       <div className="dropdown_date">
                           <Dropdown onChange={handleTypeTreatement} value={activeItem} size="big" label="Projet" selection options={options} />
                           <div className="date_treat">
                               <Button disabled={disableDebut} onClick={handleDateStep} content="Debut" id="debut" date-id="begin"  />
                               <Button disabled={disableEnd} onClick={handleDateStep} content="Fin" date-id="end" />
                           </div>
                       </div>
                   {code === 0 && <FormVerification dossierId={dossier.id} end={disableEnd} start={disableDebut}/> }
                   {
                       code === 2 && <FormRevenue dossierId={dossier.id} end={disableEnd} start={disableDebut} />
                   }
                    {
                        code === 3 && <FormControl  dossierId={dossier.id} end={disableEnd} start={disableDebut}/>
                    }
                    {
                        code === 4 && <FormCf dossierId={dossier.id} end={disableEnd} start={disableDebut} />
                    }
                     {
                        code === 5 && <FormAff dossierId={dossier.id} end={disableEnd} start={disableDebut} />
                    }
                   </div>
               </div>
           </div>
       </Index>
    :null
        }
        </>
    )
}
export default DossiertTreatment;
