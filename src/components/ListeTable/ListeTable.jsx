import React,{useState,useEffect} from 'react';
import { Input, Button,Pagination,Table,Icon } from "semantic-ui-react";
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

const ListeTable = (props)=>{
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
    const [activeItem,setActiveItem] = useState("in progress");
    const [searchBtn,setSearchBtn] = useState(false);
    const [loadingBtn,setLoadingBtn] = useState(false);

    useEffect(()=>{
        setLoading(true);
        searchBtn && setLoadingBtn(true);
        API.get(`/api/liste/all?size=${limit}&page=${page}&search=${searchField}&ordering=-createdAt`)
        .then(res=>{
            console.log(res);
            setData(res.data.results);
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
            return history.push('/error')
        })
    },[page,searchBtn,history])
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
        history.push("/admin/add/liste")
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
                        <Input icon='search' name="search_input" value={searchField} onChange={handleInputSearch} iconPosition='left' placeholder='Rechercher par Réference, type ou intitulé du projet ...' />
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
                        boundaryRange={0}
                        siblingRange={0}
                        />
                        </div>
                        </div>
                        <div className="search_part inverted">
                            <Button  content="Ajouter une liste" onClick={handleAddListe} />
                        </div>
                    </div>
                </div>
                <div className="table_part">
                <Table basic>
                    <Table.Header>
                        <Table.Row>
                        <Table.HeaderCell width={2} className="first">Réference<Icon  data-name="ref" /> </Table.HeaderCell>
                        <Table.HeaderCell width={2} className="first">Projet<Icon  data-name="intitulé" /> </Table.HeaderCell>
                        <Table.HeaderCell width={2} className="first">Date creation<Icon  data-name="createdAt" /> </Table.HeaderCell>
                        <Table.HeaderCell width={2} className="first">Date accusé<Icon  data-name="date_accuse" /> </Table.HeaderCell>
                        <Table.HeaderCell width={2} className="first">Numéro accusé<Icon  data-name="num_accuse" /> </Table.HeaderCell>
                        <Table.HeaderCell width={1} className="first">Type<Icon  data-name="type" /> </Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                <Table.Body>
                    {
                        data.map((liste,index)=>
                        <Table.Row key={index}>
                            <Table.Cell>{liste.ref ? liste.ref :"/"}</Table.Cell>
                            <Table.Cell>{liste.Project && liste.Project.intitulé ? liste.Project.intitulé : "/"}</Table.Cell>
                            <Table.Cell>{moment(liste.createdAt).format('LL')}</Table.Cell>
                            <Table.Cell>{liste.date_accuse ? moment(liste.date_accuse).format("LL") : "/"}</Table.Cell>
                            <Table.Cell>{liste.num_accuse ? liste.num_accuse : "/"}</Table.Cell>
                            <Table.Cell>{liste.type ? liste.type : "/"}</Table.Cell>
                    </Table.Row>
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
export default ListeTable;