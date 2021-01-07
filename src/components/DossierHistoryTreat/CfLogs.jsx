import React from 'react'
import moment from 'moment'
import 'moment/locale/fr';  

export default function CfLogs(props) {
    const {dossier,cfData} = props;
    moment.locale('fr');
    return (
        <div className="card_info">
        {
            dossier.date_debut_cf ? 
            <div className="item">
                <p className="debut_fin">Début Cf</p>
                <p className="debut_fin">{moment(dossier.date_debut_cf).format("LLL")}</p>
            </div>
            :
            <div className="item">
                <p className="debut_fin">Début Cf</p>
                <p className="debut_fin">Pas encore débuté</p>
            </div>
        }
        
        {
            cfData.map(controle=>
                (
                    <div>
                        <div className="item">
                        <p className="date_treat">{moment(controle.createdAt).format("LLL")}</p>

                        </div>
                        
                        {
                            controle.date_cf && 
                            <div className="item">
                                <p>Date Cf</p>
                                <p>{moment(controle.date_cf).format('LL')}</p>
                            </div>
                        }
                        
                        {
                            controle.date_rejet_cf  && 
                            <div className="item">
                                <p>Date rejet cf</p>
                                <p>{moment(controle.date_rejet_cf).format("LL")}</p>
                            </div>
                        }
                        {
                            controle.date_resultat_cf && 
                            <div className="item">
                                <p>Date Résultat cf</p>
                                <p>{moment(controle.date_resultat_cf).format("LLL")} </p>
                            </div>
                        }
                        {
                            controle.rejet_cf   !== null && 
                            <div className="item">
                                <p>Rejet pour le cf</p>
                                <p>{controle.rejet_cf ? "OUI" : "NON"}</p>
                            </div>
                        }
                        {
                            controle.num_cf && 
                            <div className="item">
                                <p>Numéro cf</p>
                                <p>{controle.num_cf} </p>
                            </div>
                        }
                        {
                            controle.resultat_cf !== null && 
                            <div className="item">
                                <p>Resultat cf</p>
                                <p>{controle.resultat_cf ? "OUI" : "NON"} </p>
                            </div>
                        }
                        <br/>
                    </div>
                    
                )
                )
        }
        {
            dossier.date_debut_cf &&
            (dossier.date_fin_cf ? 
            <div className="item">
                <p className="debut_fin">Date Fin Cf</p>
                <p className="debut_fin"> {moment(dossier.date_fin_cf).format("LLL")}</p>
            </div>
            :
            <div className="item">
                <p className="debut_fin">Date Fin Cf</p>
                <p className="debut_fin">Pas encore terminé</p>
            </div>
            )
        }
        </div>
    
    )
}
