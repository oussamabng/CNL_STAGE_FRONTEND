import React,{useState,useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import { Form, Message } from "semantic-ui-react";
import API from '../../API/API.js';

const AddAccount = ()=>{
    const history = useHistory();
    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");
    const [password2,setPassword2] = useState("");
    const [email,setEmail] = useState("");
    const [loadingBtn,setLoadingBtn] = useState(false);
    const [success,setSuccess] = useState(null);

    //? handle input changes
    const handleInput = (e,{name,value})=>{
        setSuccess(null);
        switch (name) {
            case "username":
                setUsername(value);
                break;
            case "email":
                setEmail(value);
                break;
            case "password":
                setPassword(value);
                break;
            case "password2":
                setPassword2(value);
                break;
            default:
                break;
        }
    }

    //? add project 
    const handleAddPromoteur = ()=>{
        if (password !== password2){
            return setSuccess(false);
        }
        setLoadingBtn(true);
        const body = {
            username,
            email,
            password,
        }
        API.post("/api/auth/register",body)
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
                            <Form.Input value={username} onChange={handleInput} size="big" name="username" label="Nom d'utilisateur" />
                            <Form.Input onChange={handleInput} size="big" name="email" label='Email' value={email} />
                        </Form.Group>
                        <Form.Group>
                        <Form.Input value={password} onChange={handleInput} size="big" type="password" name="password" label='Mot de passe' />
                        <Form.Input value={password2} onChange={handleInput} size="big" type="password" name="password2" label='Confimation Mot de passe' />
                        </Form.Group>
                        <Form.Button loading={loadingBtn} className="actions" content="Confirmer" onClick={handleAddPromoteur} />
                        <div className="message_project">
                        {success === false && <Message  error={!success} content='Veuillez remplir tous les champs obligatoires'  />}
                        { success &&  <Message  color='green ' content='Compte ajouté avec succée'  />}
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    )
}
export default AddAccount;
