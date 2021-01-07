import React from 'react'
import moment from 'moment'
import 'moment/locale/fr';

export default function VerificationLogs(props) {
    const {dossierData,verificationData} = props;
    moment.locale('fr');
    return (
        <div className="card_info">
        {
            dossierData.date_debut_verification ? 
            <div className="item">
                <p className="debut_fin">Début verification</p>
                <p className="debut_fin">{moment(dossierData.date_debut_verification).format("LLL")}</p>
            </div>
            :
            <div className="item">
                <p className="debut_fin">Début verification</p>
                <p className="debut_fin">Pas encore débuté</p>
            </div>
        }
        
        {
            verificationData.map(verification=>
                (
                    <div>
                        <div className="item">
                        <p className="date_treat">{moment(verification.createdAt).format("LLL")}</p>

                        </div>
                        {
                            verification.date_envoie_bordoreau && 
                            <div className="item">
                                <p>Date envoi Bordoreau</p>
                                <p>{moment(verification.date_envoie_bordoreau).format("LLL")} </p>
                            </div>
                        }
                        {
                            verification.num_bordoreau && 
                            <div className="item">
                                <p>Numero Bordoreau</p>
                                <p>{verification.num_bordoreau}  </p>
                            </div>
                        }
                        {
                            verification.is_piece_manque !== null && 
                            <div className="item">
                                <p>Pièces manquantes</p>
                                <p>{verification.is_piece_manque ? "OUI" : "NON"}</p>
                            </div>
                        }
                        {
                            verification.is_dossier_bloque !== null && 
                            <div className="item">
                                <p>Dossier est bloquer</p>
                                <p>{verification.is_dossier_bloque ? "OUI" : "NON"}</p>
                            </div>
                        }
                        {
                            verification.is_dossier_avec_reserve !== null && 
                            <div className="item">
                                <p>Dossier avec reserves</p>
                                <p>{verification.is_dossier_avec_reserve ? "OUI" : "NON"}</p>
                            </div>
                        }
                        {
                            verification.date_reception_reserve && 
                            <div className="item">
                                <p>Date Reception reserves</p>
                                <p>{moment(verification.date_reception_reserve).format("LLL")} </p>
                            </div>
                        }
                        {
                            verification.date_bloque && <div className="item">
                                <p>Date Dossier Bloque</p>
                                <p>{moment(verification.date_bloque).format("LLL")}  </p>
                            </div>
                        }
                        {
                            verification.date_debloque && <div className="item">
                                 <p>Date Dossier Debloque</p>
                                 <p>{moment(verification.date_debloque).format("LLL")}  </p>
                            </div>
                        }
                        <br/>
                    </div>
                    
                )
                )
        }
        {
            dossierData.date_debut_verification && 
            (dossierData.date_fin_verification ? 
            <div className="item">
                <p className="debut_fin">Date Fin de verification</p>
                <p className="debut_fin"> {moment(dossierData.date_fin_verification).format("LLL")}</p>
            </div>
            :
            <div className="item">
                <p className="debut_fin">Date Fin de verification</p>
                <p className="debut_fin">Pas encore terminé</p>
            </div>
            )
        }
        </div>
    )
}
