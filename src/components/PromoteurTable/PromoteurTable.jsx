import React from 'react'
import GeneralTable from '../GeneralTable/GeneralTable'


const PromoteurTable = ()=>{
    return (
        <GeneralTable
            url="/api/promoteur/all"
            urlAdd="/admin/add/promoteur"
            searchPlaceholder="Rechercher par Nom, Prenom ou Email ..."
            cols={[
                {
                    width:2,
                    title:"Nom",
                    name:"first_name"
                },
                {
                    width:2,
                    title:"Prenom",
                    name:"last_name"
                },
                {
                    width:2,
                    title:"Email",
                    name:"email"
                },
                {
                    width:2,
                    title:"Phone",
                    name:"phone"
                },
                
                {
                    width:2,
                    title:"Adresse",
                    name:"adr"
                },
            ]}
            colsData={["first_name","last_name","email","phone1","adr"]}
            addText="Ajouter un promoteur"
            no_filter
        />
    )
}
export default PromoteurTable;