import React,{ useState } from 'react';
import {Button,Icon, Input} from "semantic-ui-react"
import {useHistory} from "react-router-dom";

//? import css
import "./Header.css";

//? redux ";
import { connect } from "react-redux";
import API from '../../API/API.js';

const Header = (props) => {
    const { title,owner } = props;
    const history = useHistory();


    //? for handling searchBar
    const [isOpen,setOpen] = useState(false);
    const [inputRef,setInputRef] = useState();

    const handleSearch = ()=> {
        inputRef.focus();
        setOpen(prevState=>!prevState);
    }
    const Logout = ()=>{
        API.get("/api/auth/logout")
        .then(res=>{
            localStorage.clear();
            owner === 0 ?  history.push("/admin/login") :  history.push("/agent/login");
        })
        .catch(err=>{
            console.log(err.response);
        })
    }
    return (
        <div className="header_sip">
            <div className="row">
                <h1>{title}</h1>
                <div className="right_part">
                <div className="search_box">
                </div>
                <Button icon labelPosition='left' onClick={Logout}>
                        Se Deconnecter
                        <Icon name='left log out' />
                    </Button>
                </div>
            </div>
        </div>
    );
}

Header.propTypes = {
};
const mapStateToProps = (state) => ({
});

export default connect(mapStateToProps, {  })(Header);
