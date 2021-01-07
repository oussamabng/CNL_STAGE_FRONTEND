import React from 'react'
import moment from 'moment'
import 'moment/locale/fr';  

export default function ControleInfo(props) {
    const {dossier,controleData} = props;
    moment.locale('fr');
    return (
        <div className="card_info">
        {
            dossier.date_debut_ctrl ? 
            <div className="item">
                <p className="debut_fin">Début Controle</p>
                <p className="debut_fin">{moment(dossier.date_debut_ctrl).format("LLL")}</p>
            </div>
            :
            <div className="item">
                <p className="debut_fin">Début Controle</p>
                <p className="debut_fin">Pas encore débuté</p>
            </div>
        }
        
        {
            controleData.map(controle=>
                (
                    <div>
                        <div className="item">
                        <p className="date_treat">{moment(controle.createdAt).format("LLL")}</p>

                        </div>
                        
                        {
                            controle.date_ctrl && 
                            <div className="item">
                                <p>Date Controle</p>
                                <p>{moment(controle.date_ctrl).format('LL')}</p>
                            </div>
                        }
                        
                        {
                            controle.date_rejet_ctrl  && 
                            <div className="item">
                                <p>Date rejet controle</p>
                                <p>{moment(controle.date_rejet_ctrl).format("LL")}</p>
                            </div>
                        }
                        {
                            controle.date_resultat_ctrl && 
                            <div className="item">
                                <p>Date Résultat Controle</p>
                                <p>{moment(controle.date_resultat_ctrl).format("LLL")} </p>
                            </div>
                        }
                        {
                            controle.is_ctrl_rejet !== null && 
                            <div className="item">
                                <p>Rejet pour le controlle</p>
                                <p>{controle.is_ctrl_rejet ? "OUI" : "NON"}</p>
                            </div>
                        }
                        {
                            controle.num_ctrl && 
                            <div className="item">
                                <p>Numéro Controle</p>
                                <p>{controle.num_ctrl} </p>
                            </div>
                        }
                        {
                            controle.nature_ctrl && 
                            <div className="item">
                                <p>Nature Controle</p>
                                <p>{controle.nature_ctrl} </p>
                            </div>
                        }
                        {
                            controle.resultat_ctrl && 
                            <div className="item">
                                <p>Resultat Controle</p>
                                <p>{controle.resultat_ctrl} </p>
                            </div>
                        }
                        {
                            controle.rejet_ctrl && 
                            <div className="item">
                                <p>Rejet Controle</p>
                                <p>{controle.rejet_ctrl} </p>
                            </div>
                        }
                        <br/>
                    </div>
                    
                )
                )
        }
        {
            dossier.date_debut_ctrl &&
            (dossier.date_fin_ctrl ? 
            <div className="item">
                <p className="debut_fin">Date Fin Controle</p>
                <p className="debut_fin"> {moment(dossier.date_fin_ctrl).format("LLL")}</p>
            </div>
            :
            <div className="item">
                <p className="debut_fin">Date Fin Controle</p>
                <p className="debut_fin">Pas encore terminé</p>
            </div>
            )
        }
        </div>
    
    )
}
