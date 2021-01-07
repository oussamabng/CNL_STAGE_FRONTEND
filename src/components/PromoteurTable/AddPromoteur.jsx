import React,{useState,useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import { Dropdown, Form, Message } from "semantic-ui-react";
import API from '../../API/API.js';

const AddPromoteur = ()=>{
    const history = useHistory();
    const [first_name,setFirstName] = useState("");
    const [last_name,setLastName] = useState("");
    const [phone1,setPhone1] = useState("");
    const [phone2,setPhone2] = useState("");
    const [adr,setAdr] = useState("");
    const [email,setEmail] = useState("");
    const [loadingBtn,setLoadingBtn] = useState(false);
    const [success,setSuccess] = useState(null);
    const [year,setYear] = useState();


    let y = (new Date()).getFullYear()
    const years = Array.from(new Array(20),( val, index) => {
        return (
            {
                key:index,
                value:index + y,
                text:index + y
            }
        )
    });

    //? handle input changes
    const handleInput = (e,{name,value})=>{
        setSuccess(null);
        switch (name) {
            case "first_name":
                setFirstName(value);
                break;
            case "last_name":
                setLastName(value);
                break;
            case "email":
                setEmail(value);
                break;
            case "adr":
                setAdr(value);
                break;
            case "phone1":
                setPhone1(value);
                break;
            case "phone2":
                setPhone2(value);
                break;
            default:
                break;
        }
    }

    //? add project 
    const handleAddPromoteur = ()=>{
        setLoadingBtn(true);
        const body = {
            first_name,
            last_name,
            email,
            phone1,
            phone2,
            adr,
            year:new Date(year,0)
        }
        API.post("/api/promoteur",body)
        .then(res=>{
            console.log(res);
            setSuccess(true);
            setLoadingBtn(false);
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
                            <Form.Input value={first_name} onChange={handleInput} size="big" name="first_name" label='Nom' />
                            <Form.Input value={last_name} onChange={handleInput} size="big" name="last_name" label='Prenom' />
                        </Form.Group>
                        <Form.Group>
                            <Form.Input onChange={handleInput} size="big" name="email" label='Email' value={email} />
                            <Form.Input onChange={handleInput} size="big" name="adr" label='Adresse' value={adr} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Input onChange={handleInput} size="big" name="phone1" label='Tel 1' value={phone1} />
                            <Form.Input onChange={handleInput} size="big" name="phone2" label='Tel 2' value={phone2} />
                        </Form.Group>
                        <Form.Group>
                        <div className="date_input other_input">
                            <label>
                            Année
                            </label>
                            <Dropdown className="dropdown_input_treat" size="big" selection options={years} value={year} onChange={(e,{value})=>setYear(value)} />
                    </div>
                        </Form.Group>
                        <Form.Button loading={loadingBtn} className="actions" content="Confirmer" onClick={handleAddPromoteur} />
                        <div className="message_project">
                        {success === false && <Message  error={!success} content='Veuillez remplir tous les champs obligatoires'  />}
                        { success &&  <Message  color='green ' content='Promoteur ajouté avec succée'  />}
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    )
}
export default AddPromoteur;
