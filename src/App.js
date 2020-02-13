import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import Dashboard from './Components/Dashboard/Dashboard';

function App() {
   
  return (
    <div className="App">
      <div className="app-content">
        <Router>
          <Switch>
            <Route path='/login' component={Login} />
            <Route path='/register' component={Register} />
            <Route path='/' component={Dashboard} />
          </Switch>
        </Router>
      </div>
    </div>
  );
}

export default App;
