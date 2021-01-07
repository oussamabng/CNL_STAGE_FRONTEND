import React,{useState,useEffect} from 'react';
import { Input, Button,Pagination,Table,Icon, Dropdown } from "semantic-ui-react";
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

const AgentDossierTable = (props)=>{
    const {AgentId} = props;
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
    const [year,setYear] = useState(null);
    const [promoteur,setPromoteur] = useState(null);
    const [project,setProject] = useState(null);

    const [projects,setProjects] = useState([]);
    const [promoteurs,setPromoteurs] = useState([]);

    /* let y = (new Date()).getFullYear() */
    const y = 2020;
    const years = Array.from(new Array(20),( val, index ) => {

        return (
            {
                key:index,
                value:index + y,
                text:index + y
            }
        )
    });

    //? get all projects with PromoteurId choosed
    useEffect(()=>{
        const condition = promoteur ? `&PromoteurId=${promoteur}` : ``
        promoteur && promoteur && API.get(`/api/project?limit=9999999999999999999999999999999${condition}`)
        .then(res=> res.data.results.map(project=>{
            setProjects(prevState=>[...prevState,
            {
                key:project.id,
                value:project.intitulé,
                text:project.intitulé
            }
            ])
        }))
        .catch(err=>console.log(err.response))
    },[promoteur]);


    //? get all promoteur with year choosed 
    useEffect(()=>{
        const condition = year ? `&year=${year}` : ``

        year && API.get(`/api/promoteur/all?limit=9999999999999999999999999999999${condition}`)
        .then(res=> res.data.results.map(promoteur=>{
            setPromoteurs(prevState=>[...prevState,
            {
                key:promoteur.id,
                value:promoteur.id,
                text:promoteur.first_name+" "+promoteur.last_name
            }
            ])
        }))
        .catch(err=>console.log(err.response))
    },[year])


    useEffect(()=>{
        setData([]);
        setLoading(true);
        searchBtn && setLoadingBtn(true);
        API.get(`/api/dossier/agent/${AgentId}?size=${limit}&page=${page}&search=${searchField}&ordering=-createdAt`)
        .then(res=>{
            res.data.results.map(dossier=>{
                API.get(`/api/conjoint?PostulantId=${dossier.Postulant.id}`)
                .then(res=>{
                    const conjoints = res.data.results;
                    const condition = project ? `?intitulé=${project}` : ``
                    API.get(`/api/project/${dossier.Liste.ProjectId}${condition}`)
                    .then(res=>{
                        const projectData = res.data;
                        API.get(`/api/promoteur/${promoteur?promoteur:projectData.PromoteurId}`)
                        .then(res=>{
                            const promoteurData = res.data;
                            setData((prevState=>[...prevState,{Conjoint:conjoints,...dossier,Project:projectData,Promoteur:promoteurData}]));
                        })
                        .catch(err=>{
                            console.log(err.response);
                        })
                    })
                    .catch(err=>{
                        console.log(err.response);
                    })
                })
                .catch(err=>{
                        console.log(err.response);
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
            setTimeout(()=>{
                setLoaded(true);
            },500)
        })
        .catch(err=>{
            searchBtn && setLoadingBtn(false);
            setSearchBtn(false);
            console.log(err.response)
        })
    },[page,searchBtn,AgentId,project]);

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
    const handleTreatDossier = (dossier)=>{
        history.push({
            pathname:"/agent/dossier/treat",
            state:{dossier}
        })
    }
    const handleInfoDossier = (dossier)=>{
        history.push({
            pathname:"/agent/dossier/info",
            state:{dossier:dossier}
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
                        <Input name="search_input" value={searchField} onChange={handleInputSearch}  placeholder='Rechercher par Postulant, reférence liste ou commune ...' />
                        <Button loading={loadingBtn} onClick={handleSearch} icon="search" />
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
                        <div className="filter_dossier">
                            <Dropdown options={years} selection onChange={(e,{value})=>{
                                setPromoteurs([]);
                                setProjects([]);
                                setYear(value);
                            }} placeholder="Année" />
                            <Dropdown options={promoteurs} selection onChange={(e,{value})=>{
                                setProjects([]);
                                setPromoteur(value);
                            }} placeholder="Promoteur" />
                            <Dropdown options={projects} selection onChange={(e,{value})=>{
                                setProject(value);
                            }} placeholder="Intitulé projet" />
                        </div>
                        </div>
                    </div>
                </div>
                <div className="table_part">
                <Table basic>
                    <Table.Header>
                        <Table.Row>
                        <Table.HeaderCell width={2} className="first">Postulant<Icon  data-name="postulant" /> </Table.HeaderCell>
                        <Table.HeaderCell width={2} className="first">Conjoint<Icon  data-name="conjoint" /> </Table.HeaderCell>
                        <Table.HeaderCell width={2} className="first">Commune<Icon  data-name="place_of_bird" /> </Table.HeaderCell>
                        <Table.HeaderCell width={2} className="first">Situation familiale<Icon  data-name="family_situation" /> </Table.HeaderCell>
                        <Table.HeaderCell width={2} className="first">Réference liste<Icon  data-name="ref" /> </Table.HeaderCell>
                        <Table.HeaderCell width={1} className="last"></Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                <Table.Body>
                    {
                        data && data.map((dossier,index)=>
                        {
                            return (
                    <Table.Row key={index}>
                            <Table.Cell>{dossier.Postulant && dossier.Postulant ? `${dossier.Postulant.first_name} ${dossier.Postulant.last_name}` : "/"}</Table.Cell>
                            <Table.Cell>{dossier.Conjoint && dossier.Conjoint ? `${dossier.Conjoint[0].first_name} ${dossier.Conjoint[0].last_name}` : "/"}</Table.Cell>
                            <Table.Cell>{dossier.Postulant && dossier.Postulant.place_of_birth ? dossier.Postulant.place_of_birth : "/"}</Table.Cell>
                                <Table.Cell>{dossier.Postulant && dossier.Postulant.family_situation ? dossier.Postulant.family_situation : "/"}</Table.Cell>
                            <Table.Cell>{dossier.Liste && dossier.Liste.ref ? dossier.Liste.ref : "/"}</Table.Cell>
                            <Table.Cell>
                                <div className="actions_dossier">
                                    <Button content="Voir plus" color="blue" onClick={()=>handleInfoDossier(dossier)} />
                                    <Button content="Crée decision" color="green" />
                                    <Button content="Traiter" color="black" onClick={()=>handleTreatDossier(dossier)} />
                                </div>
                            </Table.Cell>
                    </Table.Row>
                            )
                        }
                        )
                    }
                </Table.Body>
                </Table>
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
export default AgentDossierTable;