import React,{useState} from 'react';
import { Form , Checkbox , Button,Image } from "semantic-ui-react";
import { useHistory } from "react-router-dom"
import API from "../../API/API.js";

//? import css
import "./FormLogin.css";

import Logo from "../../assets/logo_cnl.png"

//? redux 
import { connect } from "react-redux";

const FormLogin = (props)=> {
    const {owner} = props;
    //? owner 0 admin
    //? owner 1 agent
    const history = useHistory();
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [emailError,setEmailError] = useState(false);
    const [emailErrorText,setEmailErrorText] = useState("");
    const [passwordError,setPasswordError] = useState(false);
    const [passwordErrorText,setPasswordErrorText] = useState("");
    const [isLoading,setIsLoading] = useState(false);

    const handleInput = (e,{name,value})=>{
        if (emailError) setEmailError(false);
        if (passwordError) setPasswordError(false);
        switch (name) {
            case "email":
                setEmail(value)
                break;
            case "password":
                setPassword(value);
                break;
            default:
                break;
        }
    }
    console.log({owner})
    const handleLogin = ()=>{
        if (owner === 0){
            loginAdmin()
        }
        else {
            loginAgent()
        }
    }
    const loginAdmin = ()=>{
        setIsLoading(true)
        const data = {
            email,
            password
        }
        API.post("/api/auth/login",data)
        .then(res=>{
            localStorage.setItem("token",res.data.accessToken);
            return history.push("/admin");
        })
        .catch(err=>{
            const errors = err.response;
            setEmailError(true);
            setPasswordError(true);
            errors && setEmailErrorText(errors.data.message);
            errors && setPasswordErrorText(errors.data.message);
            setIsLoading(false)
        })
    }
    const loginAgent = ()=>{
        setIsLoading(true)
        const data = {
            email,
            password
        }
        API.post("/api/auth/login",data)
        .then(res=>{
            localStorage.setItem("token",res.data.accessToken);
            API.get("/api/agents/self")
            .then(res=>{
                const is_active = res.data.is_active;
                const is_admin = res.data.is_admin;
                if (is_admin){
                    setEmailError(true);
                    setPasswordError(true);
                    setEmailErrorText("incorrect Email ou mot de passe");
                    setPasswordErrorText("incorrect Email ou mot de passe");
                    setIsLoading(false)
                }else {
                    if (!is_active){
                        setEmailError(true);
                        setPasswordError(true);
                        setEmailErrorText("Compte bannie par l'administrateur");
                        setPasswordErrorText("Compte bannie par l'administrateur");
                        setIsLoading(false)
                    } else {
                        return history.push("/agent/dossier");
                    }
                }
                
            })
            .catch(err=>{
                console.log(err.response);
            })
        })
        .catch(err=>{
            const errors = err.response;
            setEmailError(true);
            setPasswordError(true);
            errors && setEmailErrorText(errors.data.message);
            errors && setPasswordErrorText(errors.data.message);
            setIsLoading(false)
        })
    }
    return (
        <div className="form_login">
            <div className="header">
                <Image src={Logo} />
                <h3>
                Se connecter
                </h3>
            </div>
            <Form>
                <div style={{
                    position:"relative"
                }}>
                <Form.Input icon={emailError?"info circle":"none"} name="email" value={email} onChange={handleInput} type="text" label="Email" placeholder='email@gmail.com' className={emailError?"err":''} />
                    {emailError && <p className="err_text">{emailErrorText}</p>}
                </div>
                <div style={{
                    position:"relative"
                }}>
                <Form.Input icon={passwordError?"info circle":"none"} name="password" value={password} onChange={handleInput} type="password" label="Mot de passe" placeholder='*********' className={passwordError?"err":''} />
                    {passwordError&& <p className="err_text">{passwordErrorText}</p>}
                </div>
                <div className="actions" style={{
                    justifyContent:"center"
                }} >
                    <Button loading={isLoading} content="S'identifier" onClick={handleLogin} />
                </div>
                <div className="help">
                <p>besoin d'aide ?</p>
                <a href="/help">cliquer ici</a>
                </div>
            </Form>
        </div>
    )
}

FormLogin.propTypes = {
};
const mapStateToProps = (state) => ({
    //TODO
});

export default connect(mapStateToProps, {  })(FormLogin);