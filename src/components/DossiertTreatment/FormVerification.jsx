import React,{useEffect,useState} from 'react';
import { Form,TransitionablePortal,Segment, Icon,Message } from "semantic-ui-react";
import DatePicker from "react-datepicker";
import API from '../../API/API.js';

const FormVerification =(props)=>{
    const {end,dossierId,start} = props;
    const [date_bloque,setDateBloque] = useState(null);
    const [date_debloque,setDateDebloque] = useState(null);
    const [dateBordoreau,setDateBordoreau] = useState(null);
    const [dateReceptionR,setReceptionR] = useState(null);
    const [piece_manq,setPM] = useState(false);
    const [dossierBloque,setDossierBloque] = useState(false);
    const [dossierAvecReserve,setDossierAvecReserve] = useState(false);
    const [showSuccess,setShowSuccess] = useState(false);
    const [numB,setNumB] = useState("");
    const [err,setErr] = useState(false);

    //? if add it to the body if POST request
    const [untPM,setUNPM] = useState(true);
    const [untBloque,setUNTBloque] = useState(true);
    const [untDebloque,setUNDebloque] = useState(true);
    const [untouchableDateBloque,setUntouchableDateBloque] = useState(true);
    const [untouchableDateDebloque,setUntouchableDateDebloque] = useState(true);
    const [untouchableDateEnvoieBord,setUntouchableDateEnvoieBord] = useState(true);
    const [untouchableDateReceptionReserve,setUntouchableDateReceptionReserve] = useState(true);
    const [untouchableNumeroBord,setUntouchableNumeroBord] = useState(true);

    //? get input values from api
    useEffect(()=>{
    API.get(`/api/dossier/${dossierId}`)
    .then(res=>{
        const {is_piece_manque,is_dossier_bloque,is_dossier_avec_reserve,num_bordoreau} = res.data;
        res.data.date_bloque && setDateBloque(new Date(res.data.date_bloque));
        res.data.date_envoie_bordoreau && setDateBordoreau(new Date(res.data.date_envoie_bordoreau));
        res.data.date_debloque && setDateDebloque(new Date(res.data.date_debloque));
        res.data.date_reception_reserve && setReceptionR(new Date(res.data.date_reception_reserve));
        is_piece_manque !== null && setPM(is_piece_manque);
        is_dossier_bloque !== null && setDossierBloque(is_dossier_bloque);
        is_dossier_avec_reserve !== null && setDossierAvecReserve(is_dossier_avec_reserve);
        num_bordoreau && setNumB(num_bordoreau);
        


    })
    .catch(err=>{
        console.error(err);
    })
    },[])

    const handleAddTreat = async()=>{
        if (!start){
            setErr(true);
        } else if (!end){
            let body = {
            }
            if (!untPM) body["is_piece_manque"] = piece_manq;
            if (!untBloque) body["is_dossier_avec_reserve"] = dossierAvecReserve;
            if (!untDebloque) body["is_dossier_bloque"] = dossierBloque;
            if (!untouchableDateBloque) body["date_bloque"] = date_bloque;
            if (!untouchableDateDebloque) body["date_debloque"] = date_debloque;
            if (!untouchableNumeroBord) body["num_bordoreau"] = numB;
            if (!untouchableDateEnvoieBord) body["date_envoie_bordoreau"] = dateBordoreau;
            if (!untouchableDateReceptionReserve) body["date_reception_reserve"] = dateReceptionR;


            API.post("/api/verification",{...body,
                "DossierId":dossierId})
            .then(res=>{
                API.put("/api/dossier/"+dossierId,body)
                .then(res=>{
                    setShowSuccess(true);
                    setTimeout(()=>{
                        setShowSuccess(false)
                        window.location.reload();
                    },2000)
                })
                .catch(err=>{
                    console.log(err.response);
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
                    <div className="date_input">
                            <label>
                                Date Bloquer
                            </label>
                        <DatePicker disabled={end} dateFormat="MMMM d, yyyy h:mm aa" showTimeSelect selected={date_bloque} onChange={date => {
                            setErr(false);
                            setUntouchableDateBloque(false);
                            setDateBloque(date)
                        }} />
                    </div>
                    <div className="date_input">
                            <label>
                                Date Debloquer
                            </label>
                        <DatePicker disabled={end} dateFormat="MMMM d, yyyy h:mm aa" showTimeSelect selected={date_debloque} onChange={date => {
                            setErr(false);
                            setUntouchableDateDebloque(false);
                            setDateDebloque(date)
                        }} />
                    </div>
                    </Form.Group>
                    
                <Form.Group>
                    <div className="date_input">
                            <label>
                                Date Envoie Bordoreau
                            </label>
                        <DatePicker disabled={end} dateFormat="MMMM d, yyyy h:mm aa" showTimeSelect selected={dateBordoreau} onChange={date => {
                            setErr(false);
                            setUntouchableDateEnvoieBord(false);
                            setDateBordoreau(date)
                        }} />
                    </div>
                    <div className="date_input">
                            <label>
                                Date Reception des reserves
                            </label>
                        <DatePicker disabled={end} dateFormat="MMMM d, yyyy h:mm aa" showTimeSelect selected={dateReceptionR} onChange={date => {
                            setErr(false);
                            setUntouchableDateReceptionReserve(false);
                            setReceptionR(date)
                        }} />
                    </div>
                    </Form.Group>
                    <Form.Group>
                        <Form.Input disabled={end} className="date_input other_input" label="Numero Bordoreau" value={numB} onChange={(e,{value})=>{
                            setErr(false);
                            setUntouchableNumeroBord(false);
                            setNumB(value)}
                        } />
                    </Form.Group>
                    <Form.Group>
                    <Form.Radio disabled={end} checked={piece_manq} onClick={()=>{
                        setErr(false)
                        setUNPM(false);
                        setPM(prevState=>!prevState)
                    }} className={piece_manq?"radio_input active" :"radio_input"} label="pièce manquante" />
                    <Form.Radio disabled={end} className={dossierBloque?"radio_input active" :"radio_input"} label="dossier bloquer" checked={dossierBloque} onClick={()=>{
                        setErr(false)
                        setUNTBloque(false);
                        setDossierBloque(prevState=>!prevState)
                    }}  />
                    <Form.Radio disabled={end} className={dossierAvecReserve?"radio_input active" :"radio_input"} label="dossier avec reserves" checked={dossierAvecReserve} onClick={()=>{
                        setErr(false)
                        setUNDebloque(false);
                        setDossierAvecReserve(prevState=>!prevState)
                    }} />
                    </Form.Group>
                    
                    <div className="actions">
                        <Form.Button disabled={end} content="Sauvegarder" onClick={handleAddTreat} />
                    </div>
                    <Message error content="Veilleuz ajouter une date de debut avant" />

                </Form>
            </div>
    )
}
export default FormVerification;
