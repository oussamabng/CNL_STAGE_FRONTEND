import React,{useEffect,useState} from 'react';
import { Form,TransitionablePortal,Segment, Icon, Message, Dropdown } from "semantic-ui-react";
import DatePicker from "react-datepicker";
import API from '../../API/API.js';
import ReplaceForNull from "../../helpers/ReplaceForNull";

const FormControl =(props)=>{
    const {end,dossierId,start} = props;
    const [showSuccess,setShowSuccess] = useState(false);
    const [num_ctrl,setNumCtrl] = useState("");
    const [date_resultat_ctrl,setDate_resultat_ctrl] = useState("");
    const [dateCtrlRejet,setDateCtrlRejet] = useState(null);
    const [is_ctrl_rejet,setCR] = useState(false)
    const [err,setErr] = useState(false);
    const [dateCtrl,setdateCtrl] = useState(null);
    const [nature_ctrl,setnature_ctrl] = useState("");
    const [uncr,setUNCR] = useState(true);
    const [resulta_ctrl,setresulta_ctrl] = useState("");
    const natures = [
        {
            key:0,
            value:"nv",
            text:"nouveau"
        },
        {
            key:1,
            value:"redressement",
            text:"redressement"
        },
        {
            key:2,
            value:"recours",
            text:"recours"
        },
    ]

    //? get data to input
    useEffect(()=>{
        API.get("/api/dossier/"+dossierId)
        .then(res=>{
            if (res.data.is_ctrl_rejet) setCR(res.data.is_ctrl_rejet);
            if (res.data.num_ctrl) setNumCtrl(res.data.num_ctrl);
            if (res.data.date_resultat_ctrl) setDate_resultat_ctrl(new Date(res.data.date_resultat_ctrl));    
            if (res.data.date_rejet_ctrl) setDateCtrlRejet(new Date(res.data.date_rejet_ctrl));
            if (res.data.date_ctrl) setdateCtrl(new Date(res.data.date_ctrl));
            if (res.data.resultat_ctrl) setresulta_ctrl(res.data.resultat_ctrl);
            if (res.data.rejet_ctrl) setnature_ctrl(res.data.rejet_ctrl)
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
        if (!uncr) body["is_ctrl_rejet"] = is_ctrl_rejet;
        if (num_ctrl.length > 0 ) body["num_ctrl"] = num_ctrl;
        if (date_resultat_ctrl) body["date_resultat_ctrl"] = date_resultat_ctrl;
        if (dateCtrlRejet) body["date_rejet_ctrl"] = dateCtrlRejet;
        if (dateCtrl) body["date_ctrl"] = dateCtrl;
        if (nature_ctrl.length>0) body["rejet_ctrl"] = nature_ctrl;
        if (resulta_ctrl.length) body["resultat_ctrl"] = resulta_ctrl;
        API.post("/api/control_rejet",{...body,DossierId:dossierId})
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
                        <Form.Input className="date_input other_input" label="Numéro Controle"  value={num_ctrl} onChange={(e,{value})=>{
                            setErr(false);
                            setNumCtrl(value)
                        }} /> 
                        <div className="date_input">
                            <label>
                                Date Controle
                            </label>
                        <DatePicker dateFormat="MMMM d, yyyy h:mm aa" showTimeSelect selected={dateCtrl} onChange={date => {
                            setErr(false);
                            setdateCtrl(date)
                        }} />
                    </div>
                    </Form.Group>
                    <Form.Group>
                        <div className="date_input other_input">
                            <label>
                            Nature Controle
                            </label>
                            
                        <Dropdown className="dropdown_input_treat" onChange={(e,{value})=>{
                             setErr(false);
                             setnature_ctrl(value)
                        }} value={nature_ctrl} size="big" label="Nature Controle" selection options={natures} />
                    </div>
                        
                    <div className="date_input">
                            <label>
                                Date Résultat Controle
                            </label>
                        <DatePicker dateFormat="MMMM d, yyyy h:mm aa" showTimeSelect selected={date_resultat_ctrl} onChange={date => {
                            setErr(false);
                            setDate_resultat_ctrl(date)
                        }} />
                    </div>
                    </Form.Group> 
                    <Form.Group>
                        
                    <Form.Input className="date_input other_input" label="Résultat Controle"  value={resulta_ctrl} onChange={(e,{value})=>{
                            setErr(false);
                            setresulta_ctrl(value)
                        }} />
                    <div className="date_input">
                            <label>
                                Date Rejet Controle
                            </label>
                        <DatePicker dateFormat="MMMM d, yyyy h:mm aa" showTimeSelect selected={dateCtrlRejet} onChange={date => {
                            setErr(false);
                            setDateCtrlRejet(date)
                        }} />
                    </div>
                    </Form.Group>
                    <Form.Group>
                        
                    <Form.Radio checked={is_ctrl_rejet} onClick={()=>{
                        setUNCR(false);
                        setCR(prevState=>!prevState)
                    }} className={is_ctrl_rejet?"radio_input active" :"radio_input"} label="Rejet pour controle" />
                    </Form.Group>
                    <div className="actions">
                        <Form.Button content="Sauvegarder" onClick={handleAddControl} />
                    </div>
                    <Message error content="Veilleuz ajouter une date de debut avant" />
                </Form>
            </div>
    )
}
export default FormControl;
