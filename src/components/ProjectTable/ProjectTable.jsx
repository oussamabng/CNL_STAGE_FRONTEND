import React,{useState,useEffect} from 'react';
import { Input, Button,Pagination,Table,Icon } from "semantic-ui-react";
import {useHistory} from "react-router-dom"
//? import css
import "./ProjectTable.css";

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

const ProjectTable = (props)=>{
    const history = useHistory();
    const [loaded,setLoaded] = useState(false);
    const [data,setData] = useState([]);
    const [searchField,setSearchField] = useState("");
    const [page,setPage] = useState(0);
    const [totalPages,setTotalPages] = useState(null);
    const [isNext,setIsNext] = useState(null);
    const [isPrev,setIsPrev] = useState(null);
    const [activeItem,setActiveItem] = useState("in progress");
    const [searchBtn,setSearchBtn] = useState(false);
    const [loadingBtn,setLoadingBtn] = useState(false);
    const limit = 6;

    useEffect(()=>{
        setLoading(true);
        searchBtn && setLoadingBtn(true);
        API.get(`/api/project?size=${limit}&page=${page}&search=${searchField}&ordering=-createdAt`)
        .then(res=>{
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
    const handleAddProject = ()=>{
        history.push("/admin/add/project")
    }
    return (
        (
            <>
            {
                loaded ?(
                    <div className="projet_sip">
                <div className="header">
                    <p name="in progress" className={activeItem === "in progress" ? "active":""} onClick={()=>{
                        setActiveItem("in progress")
                    }} >En Cours
                        {activeItem === "in progress" && <div className="active_line"></div>}
                        </p>
                    <p name="finished" className={activeItem === "finished" ? "active":""} onClick={()=>{
                        setActiveItem("finished")
                    }} >Terminés
                    {activeItem === "finished" && <div className="active_line"></div>}
                    </p>
                </div>
                <div className="header_table">
                    <div className="row">
                        <div className="search_part">
                        <Input icon='search' name="search_input" value={searchField} onChange={handleInputSearch} iconPosition='left' placeholder=' ' />
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
                            <Button  content="Ajouter un projet" onClick={handleAddProject} />
                        </div>
                    </div>
                </div>
                <div className="table_part">
                <Table basic>
                    <Table.Header>
                        <Table.Row>
                        <Table.HeaderCell width={2} className="first">Promoteur<Icon  data-name="promoteur" /> </Table.HeaderCell>
                        <Table.HeaderCell width={2} className="first">Code<Icon  data-name="code" /> </Table.HeaderCell>
                        <Table.HeaderCell width={2} className="first">Intitulé<Icon  data-name="intitule" /> </Table.HeaderCell>
                        <Table.HeaderCell width={2} className="first">Site<Icon  data-name="site" /> </Table.HeaderCell>
                        <Table.HeaderCell width={2} className="first">Commune<Icon  data-name="commune" /> </Table.HeaderCell>
                        <Table.HeaderCell width={1} className="first">Quota<Icon  data-name="quota" /> </Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                <Table.Body>
                    {
                        data.map((project,index)=>
                        <Table.Row key={index}>
                            <Table.Cell>{project.Promoteur ? project.Promoteur.first_name+" "+project.Promoteur.last_name : "/"}</Table.Cell>
                            <Table.Cell>{project.code}</Table.Cell>
                            <Table.Cell>{project.intitulé}</Table.Cell>
                            <Table.Cell>{project.site}</Table.Cell>
                            <Table.Cell>{project.commune}</Table.Cell>
                            <Table.Cell>{project.quota}</Table.Cell>
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
export default ProjectTable;