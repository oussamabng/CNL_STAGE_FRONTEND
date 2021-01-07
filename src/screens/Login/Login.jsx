import React,{useEffect,useState} from 'react';
import { Grid,Container,Image } from "semantic-ui-react";
import {useHistory} from "react-router-dom";

//? import css
import "./Login.css";
import LogoLogin from "../../assets/logo_login.png";
import FormLogin from "../../components/FormLogin/FormLogin";

//? redux 
import { connect } from "react-redux";
import propTypes from "prop-types";

const Deco = ()=>{
    return (
        <div className="decoration_shapes">
            <div className="deco"></div>
            <div className="deco"></div>
            <div className="deco"></div>
            <div className="deco"></div>
            <div className="deco"></div>
        </div>
        
    )
}
const DecoBig = ()=>{
    return (
        <div className="decoration_shapes">
            <div className="deco"></div>
            <div className="deco"></div>
            <div className="deco"></div>
            <div className="deco"></div>
            <div className="deco"></div>
            <div className="deco"></div>
            <div className="deco"></div>
            <div className="deco"></div>
            <div className="deco"></div>
            <div className="deco"></div>
            <div className="deco"></div>
        </div>
        
    )
}

const Login = (props) =>{
    const { owner } = props;

    return (
       <>
       {<div className="login_sip">
            <Container fluid>
                <Grid>
                    <Grid.Row columns="equal">
                        <Grid.Column style={{
                            background:"white"
                        }}>
                            <FormLogin owner={owner}  />
                        </Grid.Column>
                        <Grid.Column className="hero_section" style={{
                            padding:"0",
                            background:"white"
                        }}>
                        <div className="image_login">
                            <div className="overlay">
                                <Image src={LogoLogin} alt="logologin" />
                                <div className="slogan">
                                <h4>Bienvenue à</h4>
                                <h1>Suivie Cnl</h1>
                                <h1>{owner === 0 ?"Administrateur" : " agent"}</h1>
                                </div><div className="sub_slogan">
                                    <p>Connectez-vous pour accéder <br/> au tableau de bord</p>
                                </div>
                                <div className="pos">
                                    <Deco />
                                    <Deco />
                                    <Deco />
                                    <Deco />
                                    <Deco />
                                    <Deco />
                                    <Deco />
                                    <DecoBig />
                                    <DecoBig />
                                </div>
                            </div>
                        </div>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Container>
        </div>}
       </>
    )
}


Login.propTypes = {
};
const mapStateToProps = (state) => ({
});

export default connect(mapStateToProps, {  })(Login);
