import React,{useState,useEffect} from 'react';
//? react excel
import readXlsxFile from 'read-excel-file';
import { SheetJSFT } from "../../types.js";
import { schema } from "../../helpers/schemaExcel";
import { useHistory } from 'react-router-dom';
import {  Form, Message,Modal, Table } from "semantic-ui-react";
import API from '../../API/API.js';

const AddDossier = ()=>{
    const history = useHistory();
    const [listes,setListes] = useState([]);
    const [listeId,setListe] = useState(null);
    const [file,setFile] = useState(null);
    const [loadingBtn,setLoadingBtn] = useState(false);
    const [success,setSuccess] = useState(null);
    const [open,setOpen] = useState(false);
    const [de,setDe] = useState("");
    const [errorDe,setErrorDe] = useState(false);
    const [a,setA] = useState("");
    const [errorA,setErrorA] = useState(false);
    const [agents,setAgents] = useState("");
    const [agentId,setAgentId] = useState("");
    const [transmition,setTransmition] = useState([]);
    const [errorAgent,seterrorAgent] = useState(false);
    const [dossierLength,setDossierLength] = useState(0);
    const [dossiersId,setDossierId] = useState([]);
    
    const handleDossierId = (id,num,date)=>{
       setDossierId(prevState=>[...prevState,{
           n:num,
           id,
           date
       }])
    }
    //? GET Promoteurs
    useEffect(()=>{
        listes && listes.length>0 && setListes([]);
        API.get("/api/liste/all?size=9999999999")
        .then(res=>{
            res.data.results.map(liste=>setListes(prevState=>[...prevState,{
                key:liste.id,
                text:liste.type+ " "+liste.ref,
                value:liste.id
            }]))
        })
        .catch(err=>{
            history.push("/error");
        })
    },[]);

    //? check if all dossier done then fetch transmition
    useEffect(()=>{
        if ( (dossierLength === dossiersId.length) && dossierLength >0 ){
            console.log({
                message:"DossierLength === DossierId.Length",
                dossierLength,
                dossiersId:dossiersId.length
            })
            transmition.map(t=>{
                const from = t.from;
                const to = t.to;
                console.log({
                    message:"Mapping transmitions",
                    from:from,
                    to:to
                })
                for (let i = from; i <= to; i++) {
                    const {AgentId} = t
                    dossiersId.map(dossier=>{
                        if (dossier.n === i){
                            console.log({
                                message:"num dossier === i",
                                i,
                                num:dossier.n
                            })
                            AddTransmition( AgentId,dossier.date,dossier.id)
                        }
                    })
                }
            });
            setSuccess(true);
            setLoadingBtn(false);
        }
    },[dossiersId])

    //? GET Agents
    useEffect(()=>{
        API.get("/api/agents?size=9999999999")
        .then(res=>{
            res.data.results.map(agent=>setAgents(prevState=>[...prevState,{
                key:agent.id,
                text:agent.username,
                value:agent.id
            }]))
        })
        .catch(err=>{
            history.push("/error");
        })
    },[]);

    const AddTransmition = (AgentId,date,DossierId)=>{
        const body = {
            AgentId,
            date,
            DossierId
        }
        API.post('/api/transmition',body)
        .then(res=>{
            console.log(res);
        })
        .catch(err=>{
            console.log(err.response);
        })
    }

    //? handle file
    const handleFile = (e)=>{
        setSuccess(null);
        e.target.files && e.target.files[0] && setFile(e.target.files[0]);
        e.target.files && e.target.files[0] && checkDossierLength(e.target.files[0]);
    }
    //? get familly situation
    const getFamilySituation = (situation)=>{
        switch (situation) {
            case "D":
                return "Divorced";
            case "V":
                return "Widower";
            case "M":
                return "Married";
            case "C":
                return "Single"
            default:
                break;
        }
    }
    const handlePostulant = (dossier)=>{
        const {adr,c_date_place,c_first_name,c_last_name,date_of_birth,father,first_name,last_name,mother,num,place_of_birth} = dossier;
        const family_situation = dossier.family_situation=== "/" ? null : dossier.family_situation.split("+")[0];
        const number_childs = dossier.family_situation === "/" ? null : parseInt(dossier.family_situation.split("+")[1]);

        const motherLastName = mother.split(" ");
        if (motherLastName.length > 2){
            motherLastName.splice(-1,1)
        }

        let bodyPostulant = {
            first_name,
            last_name,
            place_of_birth,
            date_of_birth,
            first_name_father:father,
            first_name_mother:mother === "/" ? null : mother.split(" ")[mother.split(" ").length - 1],
            last_name_mother:mother === "/" ? null : motherLastName.join(" "),
            family_situation:getFamilySituation(family_situation),
            number_childs,
            adr
        }

        let bodyConjoint = {
            first_name:c_first_name,
            last_name:c_last_name,
            date_of_birth:c_date_place === "/" ? null : new Date( c_date_place.split(" ")[0].split("/")[2]+"/"+c_date_place.split(" ")[0].split("/")[1]+"/"+c_date_place.split(" ")[0].split("/")[0]),
            place_of_birth: c_date_place === "/" ? null : c_date_place.split(" ")[1]
        }

        FetchPostDossier(bodyPostulant,bodyConjoint,num);
    }
    //? handle promoteur dropdown
    const handleChangeListe = (e,{value})=>{
        setSuccess(null);
        setListe(value);
    }

    const handleChangeAgent = (e,{value})=>{
        errorAgent && seterrorAgent(false);
        setAgentId(value);
    }


    const checkDossierLength = (file)=>{
        readXlsxFile(file, { schema }).then(({ rows, errors }) => {
            setDossierLength(rows.length);
          })
    }

    //? add project 
    const handleAddProject = ()=>{
        setLoadingBtn(true);
        if (!listeId || !file){
            setLoadingBtn(false);
            return setSuccess(false);
        }
        if (file){
            readXlsxFile(file, { schema }).then(({ rows, errors }) => {
                setDossierLength(rows.length);
                rows.map(dossier=>{
                    handlePostulant(dossier)
                })
              })
        }
    }

    const FetchPostDossier = (bodyP,bodyC,num)=>{
        API.post("/api/postulant",bodyP)
        .then(res=>{
            const PostulantId = res.data.id;
            API.post("/api/conjoint",{...bodyC,PostulantId})
            .then(res=>{
                console.log(res);
                API.post("/api/dossier",{PostulantId,ListeId:listeId,status:"Nouveau",n:num})
                .then(res=>{
                    const date = res.data.createdAt
                    handleDossierId(res.data.id,num,date);
                })
                .catch(err=>{
                    console.log(err.response);
                    setSuccess(false)
                    setLoadingBtn(false);
                })
            })
            .catch(err=>{
                console.log(err.response);
                setSuccess(false)
                setLoadingBtn(false);
            })
        })
        .catch(err=>{
            console.log(err.response);
            setSuccess(false);
            setLoadingBtn(false);
        })
        
    }
    const handleFormModalInput = (e,{name,value})=>{
        errorA && setErrorA(false);
        errorDe && setErrorDe(false);
        switch (name) {
            case "de":
                setDe(value)
                break;
            case "a":
                setA(value);
                break;
            default:
                break;
        }

    }
    const isNumber = (n)=> /^-?[\d.]+(?:e-?\d+)?$/.test(n);
    const handleAddAgent = ()=>{
        let success = true;
        if (!isNumber(a)){
            setErrorA(true);
            success = false;
        }
        if (!isNumber(de)){
            setErrorDe(true);
            success = false;
        }
        if (!agentId){
            seterrorAgent(true);
            success = false;
        }
        if (isNumber(a) && isNumber(de) && parseInt(de) > parseInt(a)){
            setErrorDe(true);
            setErrorA(true);
            success = false;
        }
         if (transmition.length>0){
            if (transmition[transmition.length-1].to > parseInt(de) ){
                setErrorDe(true);
                success = false;
            }
         } 
        if (parseInt(a) > dossierLength){
            setErrorA(true);
            success = false;
        }
        success && setTransmition(prevState=>
            [...prevState,{
                AgentId:agentId,
                from:parseInt(de),
                to:parseInt(a)
            }]
            );
        success && setOpen(false);
    }
    return (
        <div className="projet_sip add_project">
            <div className="header_table dossier">
                <div className="row">
                    <Form error={!success} className="form_add_project">
                        <Form.Group>
                            <Form.Dropdown onChange={handleChangeListe}  size="big" label="Liste" selection options={listes}  />
                            <div className="file_input">
                                
                                <Form.Input value={file ? file.name : ""} disabled type="text" label="Fichier Excel" />
                                <label htmlFor="file_dossier" >
                                    Ajouter le fichier
                                    <input id="file_dossier" style={{
                                        display:"none"
                                        }} type="file" onChange={handleFile} accept={SheetJSFT}  />
                                </label>
                            </div>
                        </Form.Group>
                        <div className="actions_dossier">
                        <Form.Button loading={loadingBtn} className="actions" content="Confirmer" onClick={handleAddProject} />
                        <Form.Button  className="actions" content="Ajouter agent" color="orange" onClick={()=>setOpen(true)}  />
                        </div>
                        {
                            <Table>
                                    <Table.Header>
                                         <Table.Row>
                                                <Table.HeaderCell width={2} className="first">Nom d'utilisateur </Table.HeaderCell>
                                                <Table.HeaderCell width={2} className="first">Début numéro dossier</Table.HeaderCell>
                                                <Table.HeaderCell width={2} className="first">Fin numéro dossier</Table.HeaderCell>
                                        </Table.Row>
                                    </Table.Header>
                                   {
                                       transmition.length === 0 &&
                                       <div className="no_data_agents">
                                            <h1>
                                            Pas d'agents ajoutées 
                                        </h1>
                                        </div>
                                   }
                                    {
                                        transmition.length > 0 &&
                                        <Table.Body>
                                        {
                                            transmition.map((t,index)=>
                                            {
                                                let username;
                                                agents.map(agent=>{
                                                    if (agent.key === t.AgentId){
                                                        username = agent.text
                                                    }
                                                })
                                                return (
                                            <Table.Row key={index}>
                                                <Table.Cell>{username}</Table.Cell>
                                                <Table.Cell>{t.from}</Table.Cell>
                                                <Table.Cell>{t.to}</Table.Cell>
                                            </Table.Row>
                                                )
                                            }
                                            )
                                        }
                                    </Table.Body>
                                    }
                            </Table>
                        }
                        
                <div className="message_project">
                        {success === false && <Message  error={!success} content='Veuillez remplir tous les champs obligatoires'  />}
                        { success &&  <Message  color='green ' content='Dossiers ajouté avec succée'  />}
                </div>
                    </Form>
                    
                    <Modal
                    open={open}
                    onClose={()=>setOpen(false)}
                >
                    
                        
            <div className="form_agent_add">
            <Form>
                <Form.Dropdown error={errorAgent} onChange={handleChangeAgent}  size="big" label="Agent" selection options={agents}  />
                <Form.Input error={errorDe} label="De" name="de" type="text"  value={de} onChange={handleFormModalInput} />
                <Form.Input error={errorA} label="A" name="a"  type="text" value={a} onChange={handleFormModalInput} />
                <Form.Button className="btn" onClick={handleAddAgent} >
                    Confirmer
                </Form.Button>
            </Form>
            </div>
            
      </Modal>
      
                </div>
                
            </div>
        </div>
    )
}
export default AddDossier;
