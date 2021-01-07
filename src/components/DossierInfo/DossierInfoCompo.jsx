import React,{useState,useEffect} from 'react';
import "./DossierInfoCompo.css";

const DossierInfoCompo = (props)=>{
    const { dossier } = props;
    const [dossierData,setDossierData] = useState(null);

    useEffect(()=>{
        setDossierData(dossier);
    },[dossier])
    return (
        dossierData ?  <div className="dossier_info">
            <div className="item_join">
            <p>
                Postulant : 
            </p>
            <p>
                {dossierData.Postulant &&  dossierData.Postulant.first_name +  " " + dossier.Postulant.last_name }
            </p>
            </div>
            <div className="item_join">
            <p>
                Pére Postulant
            </p>
            <p>
                {dossierData.Postulant &&  dossierData.Postulant.first_name +  " " + dossier.Postulant.last_name }
            </p>
            </div>
            <p>
                Mére Postulant
            </p>
            <p>
                Date de naissance
            </p>
            <p>
                Conjoint
            </p>
            <p>
                Situation familiale
            </p>
            <p>
                Adresse
            </p>
            <p>
                Réference liste
            </p>
            <p>
                Intitulé projet
            </p>
            <p>
                Promoteur
            </p>
            <p>
                Status Dossier
            </p>
            
        </div>
        : null
    )
}

export default DossierInfoCompo;
