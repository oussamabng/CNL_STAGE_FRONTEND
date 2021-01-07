import React from 'react';

//? import components
import Index from "../../components/index.jsx";
import ListeTable from "../../components/ListeTable/ListeTable.jsx";
import AddListe from "../../components/ListeTable/AddListe.jsx";

const Liste = (props) => {
    const {add} = props;
    return (
        <>
        <Index title={add?"Ajouter une liste":"Les listes"} owner={0}  active="liste" >
            {!add && <ListeTable />}
            {add && <AddListe />}
        </Index>
        </>
    );
}

export default Liste;
