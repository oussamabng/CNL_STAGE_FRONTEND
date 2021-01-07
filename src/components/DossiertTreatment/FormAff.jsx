import React,{useEffect,useState} from 'react';
import { Form,TransitionablePortal,Segment, Icon, Message, Dropdown } from "semantic-ui-react";
import DatePicker from "react-datepicker";
import API from '../../API/API.js';
import ReplaceForNull from "../../helpers/ReplaceForNull";

const FormAff =(props)=>{
    const {end,dossierId,start} = props;
    const [showSuccess,setShowSuccess] = useState(false);
    const [num_aff,setNumAff] = useState("");
    const [date_resultat_aff,setDate_resultat_aff] = useState("");
    const [dateconformité,setDateconformité] = useState(null);
    const [conformité,setCF] = useState(false)
    const [err,setErr] = useState(false);
    const [dateAff,setDateAff] = useState(null);
    const [caisse,setcaisse] = useState("");
    const [uncr,setUNCR] = useState(true);
    const [resulta_aff,setresulta_aff] = useState("");
    const caisses = [
        {
            key:0,
            value:"CNAS",
            text:"CNAS"
        },
        {
            key:0,
            value:"CASNOS",
            text:"CASNOS"
        },
        {
            key:0,
            value:"CNR",
            text:"CNR"
        },
    ]

    //? get data to input
    useEffect(()=>{
        API.get("/api/dossier/"+dossierId)
        .then(res=>{
            if (res.data.rejet_cf) setCF(res.data.rejet_cf);
            if (res.data.num_cf) setNumAff(res.data.num_cf);
            if (res.data.date_resultat_cf) setDate_resultat_aff(new Date(res.data.date_resultat_cf));    
            if (res.data.date_rejet_cf) setDateconformité(new Date(res.data.date_rejet_cf));
            if (res.data.date_cf) setDateAff(new Date(res.data.date_cf));
            if (res.data.resultat_cf) setresulta_aff(res.data.resultat_cf);
            if (res.data.caisse) setcaisse(res.data.caisse);
        })
        .catch(err=>{
            console.error(err)
        })
    },[])

    const handleAddControl = ()=>{
        if (!start){
            setErr(true);
        } else if (!end){
        let body = {};
        if (!uncr) body["rejet_cf"] = conformité;
        if (num_aff.length > 0 ) body["num_cf"] = num_aff;
        if (date_resultat_aff) body["date_resultat_cf"] = date_resultat_aff;
        if (dateconformité) body["date_rejet_cf"] = dateconformité;
        if (dateAff) body["date_cf"] = dateAff;
        if (caisse.length>0) body["caisse"] = caisse;
        if (resulta_aff.length) body["resultat_cf"] = resulta_aff;
        API.post("/api/cf_rejet",{...body,DossierId:dossierId})
        .then(res=>{
            API.put(`/api/dossier/${dossierId}`,body)
            .then(res=>{
                setShowSuccess(true);
                    setTimeout(()=>{
                        setShowSuccess(false)
                        window.location.reload();
                    },2000)
            })
        })
        .catch(err=>{
            console.log(err.response);
        })
        }
    }

        return (
            <div className="form_treat">
                 <TransitionablePortal
                   open={showSuccess}
                   onClose={()=>{
                    setShowSuccess(false);
                    window.location.reload();
                   }}
               >
                   <Segment className="modal-date"
       >
         <h1>Succès <Icon name="check circle" /> </h1>
         <p>informations ajouté avec succès</p>
       </Segment>
               </TransitionablePortal>
                   
                <Form error={err}>
                <Form.Group>
                        <Form.Input className="date_input other_input" label="Numéro Affiliation"  value={num_aff} onChange={(e,{value})=>{
                            setErr(false);
                            setNumAff(value)
                        }} /> 
                        <div className="date_input">
                            <label>
                                Date Affiliation
                            </label>
                        <DatePicker dateFormat="MMMM d, yyyy h:mm aa" showTimeSelect selected={dateAff} onChange={date => {
                            setErr(false);
                            setDateAff(date)
                        }} />
                    </div>
                    </Form.Group>
                    <Form.Group>
                    <Form.Input className="date_input other_input" label="Résultat Affiliation"  value={resulta_aff} onChange={(e,{value})=>{
                            setErr(false);
                            setresulta_aff(value)
                        }} />
                    <div className="date_input">
                            <label>
                                Date Résultat Affiliation
                            </label>
                        <DatePicker dateFormat="MMMM d, yyyy h:mm aa" showTimeSelect selected={date_resultat_aff} onChange={date => {
                            setErr(false);
                            setDate_resultat_aff(date)
                        }} />
                    </div>
                    </Form.Group> 
                    <Form.Group>
                    <div className="date_input other_input">
                            <label>
                            Type De Caisse
                            </label>
                            
                        <Dropdown className="dropdown_input_treat" onChange={(e,{value})=>{
                            setErr(false);
                            setcaisse(value)
                        }} value={caisse} size="big" label="Type De Caisse" selection options={caisses} />
                    </div>
                    <div className="date_input">
                            <label>
                                Date conformité
                            </label>
                        <DatePicker dateFormat="MMMM d, yyyy h:mm aa" showTimeSelect selected={dateconformité} onChange={date => {
                            setErr(false);
                            setDateconformité(date)
                        }} />
                    </div>
                    </Form.Group>
                    <Form.Group>
                    <Form.Radio checked={conformité} onClick={()=>{
                        setUNCR(false);
                        setCF(prevState=>!prevState)
                    }} className={conformité?"radio_input active" :"radio_input"} label="conformité pour affiliaiton" />
                    </Form.Group>
                    <div className="actions">
                        <Form.Button content="Sauvegarder" onClick={handleAddControl} />
                    </div>
                    <Message error content="Veilleuz ajouter une date de debut avant" />
                </Form>
            </div>
    )
}
export default FormAff;
