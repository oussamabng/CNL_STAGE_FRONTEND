import React,{useEffect,useState} from 'react';
import { Form,TransitionablePortal,Segment, Icon, Message } from "semantic-ui-react";
import DatePicker from "react-datepicker";
import API from '../../API/API.js';
import ReplaceForNull from "../../helpers/ReplaceForNull";

const FormCf =(props)=>{
    const {end,dossierId,start} = props;
    const [showSuccess,setShowSuccess] = useState(false);
    const [num_cf,setNumCf] = useState("");
    const [date_resultat_cf,setDate_resultat_cf] = useState("");
    const [dateCfRejet,setDateCfRejet] = useState(null);
    const [is_cf_rejet,setCF] = useState(false)
    const [err,setErr] = useState(false);
    const [dateCf,setDateCf] = useState(null);
    const [uncr,setUNCR] = useState(true);
    const [resulta_cf,setresulta_cf] = useState("");

    //? get data to input
    useEffect(()=>{
        API.get("/api/dossier/"+dossierId)
        .then(res=>{
            if (res.data.rejet_cf) setCF(res.data.rejet_cf);
            if (res.data.num_cf) setNumCf(res.data.num_cf);
            if (res.data.date_resultat_cf) setDate_resultat_cf(new Date(res.data.date_resultat_cf));    
            if (res.data.date_rejet_cf) setDateCfRejet(new Date(res.data.date_rejet_cf));
            if (res.data.date_cf) setDateCf(new Date(res.data.date_cf));
            if (res.data.resultat_cf) setresulta_cf(res.data.resultat_cf);
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
        if (!uncr) body["rejet_cf"] = is_cf_rejet;
        if (num_cf.length > 0 ) body["num_cf"] = num_cf;
        if (date_resultat_cf) body["date_resultat_cf"] = date_resultat_cf;
        if (dateCfRejet) body["date_rejet_cf"] = dateCfRejet;
        if (dateCf) body["date_cf"] = dateCf;
        if (resulta_cf.length) body["resultat_cf"] = resulta_cf;
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
                        <Form.Input className="date_input other_input" label="Numéro Cf"  value={num_cf} onChange={(e,{value})=>{
                            setErr(false);
                            setNumCf(value)
                        }} /> 
                        <div className="date_input">
                            <label>
                                Date Cf
                            </label>
                        <DatePicker dateFormat="MMMM d, yyyy h:mm aa" showTimeSelect selected={dateCf} onChange={date => {
                            setErr(false);
                            setDateCf(date)
                        }} />
                    </div>
                    </Form.Group>
                    <Form.Group>
                        
                        
                    <Form.Input className="date_input other_input" label="Résultat Controle"  value={resulta_cf} onChange={(e,{value})=>{
                            setErr(false);
                            setresulta_cf(value)
                        }} />
                    <div className="date_input">
                            <label>
                                Date Résultat Cf
                            </label>
                        <DatePicker dateFormat="MMMM d, yyyy h:mm aa" showTimeSelect selected={date_resultat_cf} onChange={date => {
                            setErr(false);
                            setDate_resultat_cf(date)
                        }} />
                    </div>
                    </Form.Group> 
                    <Form.Group>
                    <div className="date_input">
                            <label>
                                Date Rejet Cf
                            </label>
                        <DatePicker dateFormat="MMMM d, yyyy h:mm aa" showTimeSelect selected={dateCfRejet} onChange={date => {
                            setErr(false);
                            setDateCfRejet(date)
                        }} />
                    </div>
                    
                    <Form.Radio checked={is_cf_rejet} onClick={()=>{
                        setUNCR(false);
                        setCF(prevState=>!prevState)
                    }} className={is_cf_rejet?"radio_input active" :"radio_input"} label="Rejet pour cf" />
                    </Form.Group>
                    <div className="actions">
                        <Form.Button content="Sauvegarder" onClick={handleAddControl} />
                    </div>
                    <Message error content="Veilleuz ajouter une date de debut avant" />
                </Form>
            </div>
    )
}
export default FormCf;
