import React from 'react'
import moment from 'moment'
import 'moment/locale/fr';  

export default function AffLogs(props) {
    const {dossier,affData} = props;
    moment.locale('fr');
    return (
        <div className="card_info">
        {
            dossier.date_debut_aff ? 
            <div className="item">
                <p className="debut_fin">Début Affiliation</p>
                <p className="debut_fin">{moment(dossier.date_debut_aff).format("LLL")}</p>
            </div>
            :
            <div className="item">
                <p className="debut_fin">Début Affiliation</p>
                <p className="debut_fin">Pas encore débuté</p>
            </div>
        }
        
        {
            affData.map(aff=>
                (
                    <div>
                        <div className="item">
                        <p className="date_treat">{moment(aff.createdAt).format("LLL")}</p>

                        </div>
                        
                        {
                            aff.date_aff && 
                            <div className="item">
                                <p>Date Affiliation</p>
                                <p>{moment(aff.date_aff).format('LL')}</p>
                            </div>
                        }
                        
                        {
                            aff.resultat_aff !== null && 
                            <div className="item">
                                <p>Date Résultat Affiliation</p>
                                <p>{aff.resultat_aff ? "OUI" : "NON"} </p>
                            </div>
                        }
                        {
                            aff.comformite !== null && 
                            <div className="item">
                                <p>Comformite Affiliation</p>
                                <p>{aff.comformite ? "OUI": "NON"} </p>
                            </div>
                        }
                        {
                            aff.num_aff && 
                            <div className="item">
                                <p>Numéro Affiliation</p>
                                <p>{aff.num_aff} </p>
                            </div>
                        }
                        {
                            aff.caisse && 
                            <div className="item">
                                <p>Caisse Affiliation</p>
                                <p>{aff.caisse} </p>
                            </div>
                        }
                        <br/>
                    </div>
                    
                )
                )
        }
        {
            dossier.date_debut_aff &&
            (dossier.date_fin_aff ? 
            <div className="item">
                <p className="debut_fin">Date Fin Affiliation</p>
                <p className="debut_fin"> {moment(dossier.date_fin_aff).format("LLL")}</p>
            </div>
            :
            <div className="item">
                <p className="debut_fin">Date Fin Affiliation</p>
                <p className="debut_fin">Pas encore terminé</p>
            </div>
            )
        }
        </div>
    
    )
}
