import React from 'react';

import AdminHome from "./screens/Admin/Home";
import AdminLogin from "./screens/Admin/Login";
import AdminDossier from "./screens/Admin/Dossier";
import AdminAccount from './screens/Admin/Account';
import AdminProject from "./screens/Admin/Project";
import AdminPromoteur from "./screens/Admin/Promoteur";
import AdminListe from "./screens/Admin/Liste";
import AdminDossierHistory from "./screens/Admin/DossierHistory";

import AgentLogin from "./screens/Agent/Login";
import AgentDossier from "./screens/Agent/Dossier";
import AgentDossierTreatement from "./components/DossiertTreatment/DossiertTreatment";
import AgentDossierInfo from './screens/Agent/DossierInfo';


import ErrorPage from "./screens/404/404.jsx";
import LoadingPage from "./screens/Loading/Loading.jsx";

//? redux
import { Provider } from "react-redux";
import { store, persistor } from "./store.js";
import { PersistGate } from "redux-persist/integration/react";

import "react-datepicker/dist/react-datepicker.css";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
const App = ()=>{
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
    <Switch>
      {/* //? admin routes */}
      <Route exact path="/admin" component={AdminHome} />
      <Route exact path="/admin/login" component={AdminLogin} />

      <Route exact path="/admin/dossier" component={AdminDossier} />
      <Route exact path="/admin/add/dossier" component={()=><AdminDossier add={true} />} />

      <Route exact path="/admin/account" component={AdminAccount} />
      <Route exact path="/admin/add/account" component={()=><AdminAccount add={true} />} />

      <Route exact path="/admin/projects" component={AdminProject} />
      <Route exact path="/admin/add/project" component={()=><AdminProject add={true} />} />

      <Route exact path="/admin/promoteur" component={AdminPromoteur} />
      <Route exact path="/admin/add/promoteur" component={()=><AdminPromoteur add={true} />} />
      
      <Route exact path="/admin/liste" component={AdminListe} />
      <Route exact path="/admin/add/liste" component={()=><AdminListe add={true} />} />

      <Route exact path="/admin/dossier/history" component={AdminDossierHistory} />

      {/* //? agent routes */}
      <Route exact path="/agent/login" component={AgentLogin} />
      <Route exact path="/agent/dossier" component={AgentDossier} />
      <Route exact path="/agent/dossier/treat" component={AgentDossierTreatement} />
      <Route exact path="/agent/dossier/info" component={AgentDossierInfo} />


      <Route exact path="/error" component={ErrorPage} />
      <Route exact path="/loading" component={LoadingPage} />
      
      <Redirect to="/admin/login" />
    </Switch>
    </Router>
    </PersistGate>
    </Provider>
    
  );
}






export default App;
