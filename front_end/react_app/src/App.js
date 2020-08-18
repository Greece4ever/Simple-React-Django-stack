import React from 'react';
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom';
import RepositoryCreate from "./pages/Repository_Creation/new_repository";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/repositories/new" exact component={RepositoryCreate} />
      </Switch>
    </Router>
  )
}


export default App;