import React,{useEffect,useState} from 'react';
import { Form,TransitionablePortal,Segment, Icon, Message } from "semantic-ui-react";
import DatePicker from "react-datepicker";
import API from '../../API/API.js';
import ReplaceForNull from "../../helpers/ReplaceForNull";

const FormRevenue =(props)=>{
    const {end,dossierId,start} = props;
    const [showSuccess,setShowSuccess] = useState(false);
    const [revenue_p,setRevenueP] = useState("");
    const [revenue_c,setRevenueC] = useState("");
    const [dateRevenueRejet,setDateRevenueRejet] = useState(null);
    const [is_revenue_rejet,setRR] = useState(false);
    const [unRR,setUNRR] = useState(true);
    const [err,setErr] = useState(false);

    //? get data to input
    useEffect(()=>{
        API.get("/api/dossier/"+dossierId)
        .then(res=>{
            setRR(ReplaceForNull(res.data.rejet_revenue,false));
            setRevenueC(ReplaceForNull(res.data.revenue_conjoint,""));
            setRevenueP(ReplaceForNull(res.data.revenue_postulant,""));
            res.data.date_revenue_rejet && setDateRevenueRejet(ReplaceForNull(new Date(res.data.date_revenue_rejet),null));
        })
        .catch(err=>{
            console.log(err.response);
        })
    },[])

    const handleAddRevenue = ()=>{
        if (!start){
            setErr(true);
        } else if (!end){
        let body = {};
        if (revenue_c.length > 0) body["revenue_conjoint"] = revenue_c;
        if (revenue_p.length > 0) body["revenue_postulant"] = revenue_p;
        if (dateRevenueRejet) body["date_revenue_rejet"] = dateRevenueRejet;
        if (unRR) body['rejet_revenue'] = is_revenue_rejet;
        API.post("/api/revenue_rejet",{...body,DossierId:dossierId})
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

    const IconDA = ()=>{
        return <div className="dinard">DA</div>
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
                        <Form.Input className="date_input other_input" label="Revenue Postulant" icon={IconDA} value={revenue_p} onChange={(e,{value})=>{
                            setErr(false);
                            setRevenueP(value)
                        }} /> 
                        <Form.Input className="date_input other_input" label="Revenue Conjoint" icon={IconDA} value={revenue_c} onChange={(e,{value})=>{
                            setErr(false);
                            setRevenueC(value)
                        }} />
                    </Form.Group>
                    <Form.Group>
                    <div className="date_input">
                            <label>
                                Date Rejet Revenue
                            </label>
                        <DatePicker dateFormat="MMMM d, yyyy h:mm aa" showTimeSelect selected={dateRevenueRejet} onChange={date => {
                            setErr(false);
                            setDateRevenueRejet(date)
                        }} />
                    </div>
                    </Form.Group> 
                    <Form.Group>
                    <Form.Radio checked={is_revenue_rejet} onClick={()=>{
                        setUNRR(false);
                        setRR(prevState=>!prevState)
                    }} className={is_revenue_rejet?"radio_input active" :"radio_input"} label="Rejet pour revenue" />
                    </Form.Group>
                    
                    <div className="actions">
                        <Form.Button content="Sauvegarder" onClick={handleAddRevenue} />
                    </div>
                    <Message error content="Veilleuz ajouter une date de debut avant" />
                </Form>
            </div>
    )
}
export default FormRevenue;
