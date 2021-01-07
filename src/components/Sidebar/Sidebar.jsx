import React, { useState } from 'react';
import { Image,Icon, Button } from "semantic-ui-react";
import {Link, useHistory} from "react-router-dom";


//? import css
import "./Sidebar.css";

import Img from "../../assets/img.jpg";
import {ReactComponent as Dashboard} from "../../assets/icons/dashboard.svg";
import {ReactComponent as Messages} from "../../assets/icons/mail.svg";
import {ReactComponent as Folder} from "../../assets/icons/open-folder.svg";
import {ReactComponent as Params} from "../../assets/icons/settings.svg";   
import {ReactComponent as List} from "../../assets/icons/list.svg";
import {ReactComponent as Promoteur} from "../../assets/icons/user.svg";   
import Logo from "../../assets/logo_cnl.png";

//? redux
import { connect } from "react-redux";

const Sidebar = (props) => {
    const { owner, active,isOpen,username } = props;
    const [file,setFile] = useState(null);
    const history = useHistory();
    const handleAddProject = ()=>{
        return history.push("/admin/add/project")
    }
    return (
        <div className={isOpen?"sidebar_sip opened":"sidebar_sip"}>
            <div className="row">
                <div className="header">
                    <Image src={Img} alt="profile picture" />
                    <h2>{username}</h2>
                </div>
                <div className="items">
                    <ul>
                    {
                            owner === 1
                            &&
                            <li className={active === "self_account" ?"active":""}>
                            <Promoteur />
                            <Link to="/agent/account/self">
                                Compte
                            </Link>
                            {active === "self_account" && <div className="active-elm"></div>}
                        </li>
                        }
                        {
                            owner === 0
                            &&
                            <li className={active === "dashboard" ?"active":""}>
                            <Dashboard />
                            <Link to="/admin">
                            Analytique
                            </Link>
                            {active === "dashboard" && <div className="active-elm"></div>}
                        </li>
                        }
                        {
                            owner === 0 &&
                            <li className={active === "promoteur" ?"active":""}>
                                <Promoteur />
                                <Link to="/admin/promoteur">
                                Promoteurs
                                </Link>
                                {active === "promoteur" && <div className="active-elm"></div>}
                            </li>
                        }
                        {
                            owner === 0 && 
                            <li className={active === "projects" ?"active":""}>
                            <Params />
                            <a href="/admin/projects">
                            Projets
                            </a>
                            {active === "projects" && <div className="active-elm"></div>}
                        </li>
                        }
                        {
                            owner === 0 &&
                                <li className={active === "liste" ?"active":""}>
                                    <List />
                                    <Link to="/admin/liste">
                                    Listes
                                    </Link>
                                    {active === "liste" && <div className="active-elm"></div>}
                                </li>
                        }
                        <li className={active === "dossiers" ?"active":""}>
                            <Folder />
                            <Link to={owner === 0?"/admin/dossier":"/agent/dossier"}>
                            Dossiers
                            </Link>
                            {active === "dossiers" && <div className="active-elm"></div>}
                        </li>
                        {
                            owner === 0 &&
                            <li className={active === "accounts" ?"active":""}>
                                <Messages />
                                <Link to="/admin/account">
                                Comptes
                                </Link>
                                {active === "accounts" && <div className="active-elm"></div>}
                            </li>
                        }
                        
                    </ul>
                </div>
                <div className="actions">
                {
                    owner === 0 && 
                    <Button className="primary" icon labelPosition='right' onClick={handleAddProject} >
                        Nouveau Projet
                        <Icon name='right plus' />
                    </Button>
                }
                </div>
                <div className="logo">
                    <Image style={{
                        width:"100px",
                        height:"100px"
                    }} id="logo_sidebar" src={Logo} />
                    <h4>Besoin d'aide?</h4> 
                    <a href="/help">cliquez ici</a>
                </div>
            </div>
        </div>
    );
}

Sidebar.propTypes = {
};
const mapStateToProps = (state) => ({
});

export default connect(mapStateToProps, {  })(Sidebar);
