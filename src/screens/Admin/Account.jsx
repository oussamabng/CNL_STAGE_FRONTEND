import React from 'react';

//? import components
import Index from "../../components/index.jsx";
import AccountsTable from "../../components/AccountsTable/AccountsTable.jsx";
import AddAccount from '../../components/AccountsTable/AddAccount.jsx';

const Account = (props) => {
    const {add} = props;
    return (
        <>
        <Index title={add ? 'Ajouter un compte' :"Les comptes"} owner={0}  active="accounts" >
            {!add && <AccountsTable />}
            {add && <AddAccount />}

        </Index>
        </>
    );
}

export default Account;
