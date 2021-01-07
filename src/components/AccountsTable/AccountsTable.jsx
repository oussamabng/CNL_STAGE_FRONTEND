import React from 'react'
import GeneralTable from '../GeneralTable/GeneralTable'


const PromoteurTable = ()=>{
    return (
        <GeneralTable
            url="/api/agents"
            urlAdd="/admin/add/account"
            searchPlaceholder="Rechercher par Nom d'utilisateur ou Email ..."
            cols={[
                {
                    width:2,
                    title:"Nom d'utilisateur",
                    name:"username"
                },
                {
                    width:2,
                    title:"Email",
                    name:"email"
                },
                {
                    width:2,
                    title:"Status Active",
                    name:"is_active"
                },
                
            ]}
            colsData={["username","email","is_active"]}
            addText="Ajouter un compte"
            action
            no_filter
            accounts
        />
    )
}
export default PromoteurTable;