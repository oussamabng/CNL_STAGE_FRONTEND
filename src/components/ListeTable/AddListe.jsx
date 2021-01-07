import React,{useState,useEffect} from 'react';
import DatePicker from "react-datepicker";
import { useHistory } from 'react-router-dom';
import { Form, Message } from "semantic-ui-react";
import API from '../../API/API.js';

const AddListe = ()=>{
    const history = useHistory();
    const [projects,setProjects] = useState([]);
    const [ProjectId,setProjectId] = useState(null);
    const [ref,setRef] = useState('');
    const [date_accuse,setdate_accuse] = useState(null);
    const [num_accuse,setnum_accuse] = useState("");
    const [type,settype] = useState("");
    const [nbr_postulant,setnbr_postulant] = useState("");
    const [loadingBtn,setLoadingBtn] = useState(false);
    const [success,setSuccess] = useState(null);

    //? GET Promoteurs
    useEffect(()=>{
        projects && projects.length>0 && setProjects([]);
        API.get("/api/project?size=9999999999")
        .then(res=>{
            res.data.results.map(project=>setProjects(prevState=>[...prevState,{
                key:project.id,
                text:project.intitulé,
                value:project.id
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
            case "ref":
                setRef(value);
                break;
            case "date_accuse":
                setdate_accuse(value);
                break;
            case "num_accuse":
                setnum_accuse(value);
                break;
            case "type":
                settype(value);
                break; 
            case "nbr_postulant":
                setnbr_postulant(value);
                break; 
            default:
                break;
        }
    }

    //? handle promoteur dropdown
    const handleChangePromoteur = (e,{value})=>{
       setProjectId(value)
    }

    //? add project 
    const handleAddProject = ()=>{
        setLoadingBtn(true);
        const body = {
            ProjectId,
            ref,
            num_accuse,
            type,
            date_accuse,
            nbr_postulant:parseInt(nbr_postulant),
        }
        API.post("/api/liste",body)
        .then(res=>{
            setSuccess(true);
            setLoadingBtn(false);
            setRef("");
            settype("");
            setnum_accuse("");
            setdate_accuse("");
            setnbr_postulant("");
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
                            <Form.Dropdown onChange={handleChangePromoteur} size="big" label="Projet" selection options={projects} />
                            <Form.Input value={ref} onChange={handleInput} size="big" name="ref" label='Réference' />
                        </Form.Group>
                        <Form.Group>
                            <Form.Input onChange={handleInput} size="big" name="type" label='Type' value={type} />
                            <Form.Input onChange={handleInput} size="big" name="nbr_postulant" label='Nombre de postulans' value={nbr_postulant} />
                        </Form.Group>
                        <Form.Group>
                            <div className="date_input">
                                <label>
                                    Date accusé
                                </label>
                                <DatePicker selected={date_accuse} onChange={date => setdate_accuse(date)} />
                            </div>
                            <Form.Input onChange={handleInput} size="big" name="num_accuse" label='Numéro accusé' value={num_accuse} />
                        </Form.Group>
                        <Form.Button loading={loadingBtn} className="actions" content="Confirmer" onClick={handleAddProject} />
                        <div className="message_project">
                        {success === false && <Message  error={!success} content='Veuillez remplir tous les champs obligatoires'  />}
                        { success &&  <Message  color='green ' content='Liste ajouté avec succée'  />}
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    )
}
export default AddListe;
