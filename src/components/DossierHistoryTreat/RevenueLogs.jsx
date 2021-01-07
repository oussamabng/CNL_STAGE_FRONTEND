import React from 'react'
import moment from 'moment'
import 'moment/locale/fr';  

export default function RevenueLogs(props) {
    const {dossier,revenueData} = props;
    moment.locale('fr');
    return (
        <div className="card_info">
        {
            dossier.date_debut_revenue ?
            <div className="item">
                <p className="debut_fin">Début Revenue</p>
                <p className="debut_fin">{moment(dossier.date_debut_revenue).format("LLL")}</p>
            </div>
            :
            <div className="item">
                <p className="debut_fin">Début Revenue</p>
                <p className="debut_fin">Pas encore débuté</p>
            </div>
        }
        
        {
            revenueData.map(revenue=>
                (
                    <div>
                        <div className="item">
                        <p className="date_treat">{moment(revenue.createdAt).format("LLL")}</p>

                        </div>
                        
                        {
                            revenue.revenue_postulant && 
                            <div className="item">
                                <p>Revenue Postulant</p>
                                <p>{revenue.revenue_postulant} DA </p>
                            </div>
                        }
                        
                        {
                            revenue.revenue_conjoint  && 
                            <div className="item">
                                <p>Revenue Conjoint</p>
                                <p>{revenue.revenue_conjoint} DA</p>
                            </div>
                        }
                        {
                            revenue.date_revenue_rejet && 
                            <div className="item">
                                <p>Date Revenue Rejet</p>
                                <p>{moment(revenue.date_revenue_rejet).format("LLL")} </p>
                            </div>
                        }
                        {
                            revenue.rejet_revenue !== null && 
                            <div className="item">
                                <p>Rejet pour le revenue</p>
                                <p>{revenue.rejet_revenue ? "OUI" : "NON"}</p>
                            </div>
                        }
                        <br/>
                    </div>
                    
                )
                )
        }
        {
            dossier.date_debut_revenue &&
            ( dossier.date_fin_revenue ? 
            <div className="item">
                <p className="debut_fin">Date Fin Revenue</p>
                <p className="debut_fin"> {moment(dossier.date_fin_revenue).format("LLL")}</p>
            </div>
            :
            <div className="item">
                <p className="debut_fin">Date Fin Revenue</p>
                <p className="debut_fin">Pas encore terminé</p>
            </div>
            )
        }
        </div>
    
    )
}
