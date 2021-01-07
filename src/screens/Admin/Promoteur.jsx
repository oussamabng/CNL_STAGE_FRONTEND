import React from 'react';

//? import components
import Index from "../../components/index.jsx";
import PromoteurTable from "../../components/PromoteurTable/PromoteurTable.jsx";
import AddPromoteur from "../../components/PromoteurTable/AddPromoteur.jsx";

const Dossier = (props) => {
    const {add} = props;
    return (
        <>
        <Index title={add?"Ajouter un promoteur":"Les promoteurs"} owner={0}  active="promoteur" >
            {!add && <PromoteurTable />}
            {add && <AddPromoteur />}
        </Index>
        </>
    );
}

export default Dossier;
