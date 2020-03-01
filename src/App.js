import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import Dashboard from "./Components/Dashboard/Dashboard";

function App() {
  return (
    <>
      <div className="App">
        <div className="app-content">
          <Router>
            <Switch>
              <Route path="/login" component={Login} />
              <Route path="/register" component={Register} />
              <Route path="/" component={Dashboard} />
            </Switch>
          </Router>
        </div>
      </div>
      <div className="for-pc">
        <div>
          <h2 style={{ color: "red" }}>
            {" "}
            <i className="fas fa-exclamation-triangle"></i> SMALL SCREEN
            DETECTED
          </h2>
          <h5>
            Small screens are not currently supported
            <br />
            Rotate your screen on a tab, if you still get this error
            <br />
            Use a laptop/Desktop
          </h5>
        </div>
      </div>
    </>
  );
}

export default App;
