import React from 'react';

//? import components
import Index from "../../components/index.jsx";
import ProjectTable from "../../components/ProjectTable/ProjectTable.jsx";
import AddProject from "../../components/AddProject/AddProject.jsx";

const Project = (props) => {
    const { add } = props;
    return (
        <>
        <Index title={add?"Ajouter un projet":"Les projects"} owner={0}  active="projects">
            {!add && <ProjectTable />}
            {add && <AddProject />}
        </Index>
        </>
    );
}

export default Project;
