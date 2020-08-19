import React from 'react';
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom';
import RepositoryCreate from "./pages/Repository_Creation/new_repository";
import RepoView from "./pages/Repository_view/RepoView";
import RepoViewDetail from "./pages/Repository_view/RepoViewDetail";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/repositories/new" exact component={RepositoryCreate} />
        <Route path="/repositories/:user" component={RepoViewDetail} />
        <Route path="/repository/:user_id/:repo_id" component={RepoView} />
      </Switch>
    </Router>
  )
}


export default App;