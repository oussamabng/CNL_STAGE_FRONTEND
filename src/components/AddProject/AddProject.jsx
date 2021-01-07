import React,{useState,useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import { Form, Message } from "semantic-ui-react";
import API from '../../API/API.js';
import "./AddProject.css";

const AddProject = ()=>{
    const history = useHistory();
    const [promoteurs,setPromoteurs] = useState([]);
    const [PromoteurId,setPromoteurId] = useState(null);
    const [code,setCode] = useState("");
    const [intitulé,setIntitule] = useState("");
    const [quota,setQuota] = useState("");
    const [site,setSite] = useState("");
    const [commune,setCommune] = useState("");
    const [loadingBtn,setLoadingBtn] = useState(false);
    const [success,setSuccess] = useState(null);

    //? GET Promoteurs
    useEffect(()=>{
        promoteurs && promoteurs.length>0 && setPromoteurs([]);
        API.get("/api/promoteur/all?size=9999999999")
        .then(res=>{
            res.data.results.map(promoteur=>setPromoteurs(prevState=>[...prevState,{
                key:promoteur.id,
                text:promoteur.first_name+" "+promoteur.last_name,
                value:promoteur.id
            }]))
        })
        .catch(err=>{
            history.push("/error");
        })
    },[]);

    //? handle input changes
    const handleInput = (e,{name,value})=>{
        setSuccess(null);
        switch (name) {
            case "code":
                setCode(value);
                break;
            case "intitulé":
                setIntitule(value);
                break;
            case "quota":
                setQuota(value);
                break;
            case "site":
                setSite(value);
                break;
            case "commune":
                setCommune(value);
                break;
            default:
                break;
        }
    }

    //? handle promoteur dropdown
    const handleChangePromoteur = (e,{value})=>{
       setPromoteurId(value)
    }

    //? add project 
    const handleAddProject = ()=>{
        setLoadingBtn(true);
        const body = {
            PromoteurId,
            code:parseInt(code),
            intitulé,
            site,
            commune,
            quota:parseInt(quota)
        }
        API.post("/api/project",body)
        .then(res=>{
            console.log(res);
            setSuccess(true);
            setLoadingBtn(false);
            setCode("");
            setQuota("");
            setCommune("");
            setSite("");
            setIntitule("");
        })
        .catch(err=>{
            console.log(err.response);
            setSuccess(false);
            setLoadingBtn(false);
        })
    }
    return (
        <div className="projet_sip add_project">
            <div className="header_table">
                <div className="row">
                    <Form error={!success} className="form_add_project">
                        <Form.Group>
                            <Form.Dropdown onChange={handleChangePromoteur} size="big" label="Promoteur" selection options={promoteurs} />
                            <Form.Input value={code} onChange={handleInput} size="big" name="code" label='Code' />
                        </Form.Group>
                        <Form.Group>
                            <Form.Input onChange={handleInput} size="big" name="intitulé" label='Intitulé' value={intitulé } />
                            <Form.Input onChange={handleInput} size="big" name="quota" label='Quota' value={quota} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Input onChange={handleInput} size="big" name="site" label='Site' value={site} />
                            <Form.Input onChange={handleInput} size="big" name="commune" label='Commune' value={commune} />
                        </Form.Group>
                        <Form.Button loading={loadingBtn} className="actions" content="Confirmer" onClick={handleAddProject} />
                        <div className="message_project">
                        {success === false && <Message  error={!success} content='Veuillez remplir tous les champs obligatoires'  />}
                        { success &&  <Message  color='green ' content='Projet ajouté avec succée'  />}
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    )
}
export default AddProject;
