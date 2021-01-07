import React from 'react'
import moment from 'moment'
import 'moment/locale/fr';  

export default function DossierInfo(props) {
    const {dossierData,transmition} = props;
    moment.locale('fr');
    return (
        <div className="card_info">
                <div className="item">
                    <p>Postulant</p>
                    <p>{dossierData.postulant}</p>
                </div>
                <div className="item">
                    <p>Conjoint</p>
                    <p>{dossierData.conjoint}</p>
                </div>
                <div className="item">
                    <p>Commune</p>
                    <p>{dossierData.place}</p>
                </div>
                <div className="item">
                    <p>Situation familialle</p>
                    <p>{dossierData.family_situation}</p>
                </div>
                <div className="item">
                    <p>Date de transmition</p>
                    <p>{moment(transmition.date).format("LL")}</p>
                </div>
                <div className="item">
                    <p>Agent responsable</p>
                    <p>{transmition.agent}</p>
                </div>
               </div>
               
    )
}
