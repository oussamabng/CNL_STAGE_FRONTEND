import React,{useState,useEffect} from 'react';
import { Input, Button,Pagination,Table,Icon, Segment } from "semantic-ui-react";
import {useHistory} from "react-router-dom";

import moment from 'moment'
import 'moment/locale/fr';  

//? redux 
import { setLoading } from "../../actions/loadingAction";

import {ReactComponent as ArrowSvg} from "../../assets/icons/arrow.svg";
import LoadingPage from "../../screens/Loading/Loading";
import API from '../../API/API.js';

const Arrow = (props)=>{
    const {isRight,status,onClick} = props;

    const handleClick = ()=>{
        if (status){
            onClick(isRight)
        }
    }
    return (
        <div className={isRight?status?"arrow_ right":"arrow_ right gray":status?"arrow_ left":"arrow_ left gray"} onClick={handleClick} >
            <ArrowSvg />
        </div>
    )
}

const DossierTable = (props)=>{
    moment.locale('fr');

    const history = useHistory();
    const [loaded,setLoaded] = useState(false);
    const [data,setData] = useState([]);
    const [searchField,setSearchField] = useState("");
    const [page,setPage] = useState(0);
    const [limit,setLimit] = useState(6);
    const [totalPages,setTotalPages] = useState(null);
    const [isNext,setIsNext] = useState(null);
    const [isPrev,setIsPrev] = useState(null);
    const [searchBtn,setSearchBtn] = useState(false);
    const [loadingBtn,setLoadingBtn] = useState(false);
    const [loadingTable,setLoadingTable] = useState(false);

    useEffect(()=>{
        setLoadingTable(true);
        setData([]);
        setLoading(true);
        searchBtn && setLoadingBtn(true);
        API.get(`/api/dossier?size=${limit}&page=${page}&search=${searchField}&ordering=-createdAt`)
        .then(res=>{
            res.data.results.map((dossier,index)=>{
                API.get(`/api/conjoint?PostulantId=${dossier.Postulant.id}`)
                .then(res=>{
                    const conjoints = res.data.results;
                   API.get(`/api/transmition?DossierId=${dossier.id}`)
                   .then(res=>{
                    if (index===0){
                        setData([{Conjoint:conjoints,...dossier,Transmition:res.data.results[0]}]);

                    }else{
                        setData((prevState=>[...prevState,{Conjoint:conjoints,...dossier,Transmition:res.data.results[0]}]));
                    }
                    setLoadingTable(false);
                })
                   .catch(err=>{
                       console.log(err.response);
                       setLoadingTable(false);
                   })
                })
                .catch(err=>{
                        console.log(err.response);
                        setLoadingTable(false);
                })

            })
            setPage(res.data.currentPage);
            setTotalPages(res.data.totalPages);
            if (res.data.count>res.data.currentPage+limit){
                setIsNext(res.data.currentPage+1)
            }else{
                setIsNext(null);
            }
            if (res.data.currentPage === 0){
                setIsPrev(null)
            }else setIsPrev(res.data.currentPage)
            setSearchBtn(false);
            searchBtn && setLoadingBtn(false);
            setLoadingTable(false);
            setTimeout(()=>{
                setLoaded(true);
            },500)
        })
        .catch(err=>{
            searchBtn && setLoadingBtn(false);
            setSearchBtn(false);
            setLoadingTable(false);
            console.log(err.response)
        })
    },[page,searchBtn])
    const handlePagination = (isRight)=>{
          if (isRight){
            setPage(isNext);
          }
          else {
              setPage(isPrev)
          }
    }
    const handlePaginationChange = (e, { activePage })=>{
        setPage(activePage-1)
    }
    const handleInputSearch = (e,{name,value})=>{
        setSearchField(value)
    }
    const handleSearch = ()=>{
        setSearchBtn(true);
    }
    const handleAddListe = ()=>{
        history.push("/admin/add/dossier")
    }
    const seeHistoryDossier = (dossier)=>{
        history.push({
            pathname:"/admin/dossier/history",
            state:{dossier}
        })
    }
    return (
        (
            <>
            {
                loaded ?(
                    <div className="projet_sip">
                <div className="header_table">
                    <div className="row">
                        <div className="search_part">
                        <Input icon='search' name="search_input" value={searchField} onChange={handleInputSearch} iconPosition='left' placeholder='Rechercher par Postulant, reférence liste ou commune ...' />
                        <Button loading={loadingBtn} content="Recherche" onClick={handleSearch} />
                        <div className="pagination_part">
                        <Pagination
                        onPageChange={handlePaginationChange}
                        firstItem={null}
                        lastItem={null}
                        prevItem={{ content: <Arrow status={isPrev} onClick={handlePagination} />, icon: true }}
                        nextItem={{ content: <Arrow status={isNext} isRight onClick={handlePagination} />, icon: true }}
                        activePage={page+1}
                        totalPages={totalPages}
                        boundaryRange={1}
                        siblingRange={0}
                        />
                        </div>
                        </div>
                        <div className="search_part inverted">
                            <Button  content="Ajouter des dossiers" onClick={handleAddListe} />
                        </div>
                    </div>
                </div>
                <div className="table_part">
                    <Segment loading={loadingTable}>
                    <Table basic >
                    <Table.Header>
                        <Table.Row>
                        <Table.HeaderCell width={2} className="first">Postulant<Icon  data-name="postulant" /> </Table.HeaderCell>
                        <Table.HeaderCell width={2} className="first">Conjoint<Icon  data-name="conjoint" /> </Table.HeaderCell>
                        <Table.HeaderCell width={2} className="first">Commune<Icon  data-name="place_of_bird" /> </Table.HeaderCell>
                        <Table.HeaderCell width={2} className="first">Situation familiale<Icon  data-name="family_situation" /> </Table.HeaderCell>
                        <Table.HeaderCell width={1} className="first">Agent responsable<Icon  data-name="agent" /> </Table.HeaderCell>
                        <Table.HeaderCell width={2} className="first">Réference liste<Icon  data-name="ref" /> </Table.HeaderCell>
                        <Table.HeaderCell width={1} className="last"></Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                <Table.Body>
                    {
                        data.map((dossier,index)=>
                        {
                            return (
                    <Table.Row key={index}>
                            <Table.Cell>{dossier.Postulant && dossier.Postulant ? `${dossier.Postulant.first_name} ${dossier.Postulant.last_name}` : "/"}</Table.Cell>
                            <Table.Cell>{dossier.Conjoint && dossier.Conjoint ? `${dossier.Conjoint[0].first_name} ${dossier.Conjoint[0].last_name}` : "/"}</Table.Cell>
                            <Table.Cell>{dossier.Postulant && dossier.Postulant.place_of_birth ? dossier.Postulant.place_of_birth : "/"}</Table.Cell>
                                <Table.Cell>{dossier.Postulant && dossier.Postulant.family_situation ? dossier.Postulant.family_situation : "/"}</Table.Cell>
                                <Table.Cell>{dossier.Transmition && dossier.Transmition.Agent ? dossier.Transmition.Agent.username : "/"}</Table.Cell>
                            <Table.Cell>{dossier.Liste && dossier.Liste.ref ? dossier.Liste.ref : "/"}</Table.Cell>
                            <Table.Cell>
                                <div className="actions_dossier">
                                    <Button content="Voir historique" color="green" onClick={()=>seeHistoryDossier(dossier)} />
                                </div>
                            </Table.Cell>
                    </Table.Row>
                            )
                        }
                        )
                    }
                </Table.Body>
                </Table>
                
                    </Segment>
                </div>
            </div>
            
                )
                :
                (
                    <LoadingPage />
                )
            }
            </>
        )
    )
}
export default DossierTable;