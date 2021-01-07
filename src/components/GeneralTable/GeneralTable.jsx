import React,{useState,useEffect} from 'react';
import { Input, Button,Pagination,Table,Icon,Modal } from "semantic-ui-react";
import {useHistory} from "react-router-dom"
//? import css
import "../ProjectTable/ProjectTable.css";

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

const GeneralTable = (props)=>{
    const {url,urlAdd,searchPlaceholder,cols,colsData,addText,action,accounts,no_filter} = props;
    function exampleReducer(state, action) {
        switch (action.type) {
          case 'close':
            return { open: false }
          case 'open':
            return { open: true, size: action.size,is_active:action.is_active, id:action.id }
          default:
            throw new Error('Unsupported action...')
        }
      }
    const [state, dispatch] = React.useReducer(exampleReducer, {
        open: false,
        size: undefined,
        is_active:undefined,
        id: undefined
    })
    const { open, size, is_active,id } = state
    const handleAction = ()=>{
        let body = {
            is_active : !is_active
        }
        API.put("/api/agents/"+id,body)
        .then(res=>{
            window.location.reload();
        })
        .catch(err=>{
            console.log(err.response);
        })
        dispatch({ type: 'close' });
    }
    const history = useHistory();
    const [data,setData] = useState([]);
    const [loaded,setLoaded] = useState(false);
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
        searchBtn && setLoadingBtn(true);
        API.get(`${url}?size=${limit}&page=${page}&search=${searchField}&ordering=-createdAt`)
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
    const handleAddProject = ()=>{
        urlAdd && history.push(urlAdd);
    }
    return (
        <>
        {
            loaded ? (
                <div className="projet_sip">
                <>
                {
                    !no_filter && 
                <div className="header">
                <p name="in progress" className={activeItem === "in progress" ? "active":""} onClick={()=>{}} >En Cours
                    {activeItem === "in progress" && <div className="active_line"></div>}
                    </p>
                <p name="finished" className={activeItem === "finished" ? "active":""} onClick={()=>{}} >Terminés
                {activeItem === "finished" && <div className="active_line"></div>}
                </p>
            </div>
                }
                </>
                <div className="header_table">
                    <div className="row">
                        <div className="search_part">
                        <Input icon='search' name="search_input" value={searchField} onChange={handleInputSearch} iconPosition='left' placeholder={searchPlaceholder} />
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
                            <Button  content={addText} onClick={handleAddProject} />
                        </div>
                    </div>
                </div>
                <div className="table_part">
                <Table basic>
                    <Table.Header>
                        <Table.Row>
                            <>
                            {
                                cols.map(col=>
                                    <Table.HeaderCell width={col.width} className="first">{col.title}<Icon  data-name={col.name} /> </Table.HeaderCell>
                                    )
                            }
                            <>
                            {
                                action && <Table.HeaderCell width={1} className="last"></Table.HeaderCell>
                            }
                            </>
                            </>
                     </Table.Row>
                    </Table.Header>
                <Table.Body>
                    {
                        data.map((project,index)=>
                        <Table.Row key={index}>
                            <>
                            {
                                colsData.map(colData=>
                                    <Table.Cell>{typeof(project[colData]) === "boolean" ? project[colData] ? "Active" : "Non Active"  : project[colData]}</Table.Cell>
                                    )
                            }
                            <>
                            { action && 
                                <Table.Cell>
                                    {accounts && <Button onClick={(e) => {
                                        dispatch({ type: 'open', size: 'tiny',is_active:project["is_active"] ,id:e.currentTarget.attributes[0].nodeValue })
                                    } } content={ project["is_active"] ? "Bannir" : "Activer"} data-id={project["id"]} className={project["is_active"] ? "red":"orange" }  />}
                                </Table.Cell>
                            }
                            </>
                            </>
                    </Table.Row>
                        )
                    }
                </Table.Body>
                </Table>
                <>
                {
                    accounts && 
                    <Modal
            size={size}
            open={open}
            onClose={() => dispatch({ type: 'close' })}
          >
            <Modal.Header>{is_active ? "Bannir":"Activer"} le compte </Modal.Header>
            <Modal.Content>
              <p>Vous êtes sur de vouloir continuer votre action</p>
            </Modal.Content>
            <Modal.Actions>
              <Button negative onClick={() => dispatch({ type: 'close' })}>
                Annuler
              </Button>
              <Button positive onClick={handleAction}>
                Confirmer
              </Button>
            </Modal.Actions>
          </Modal>
                }
                </>
                </div>
            </div> 
        
            ) : (
                <LoadingPage />
            )
        }
        </>
     )
}
export default GeneralTable;