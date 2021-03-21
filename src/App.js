import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Redirect
} from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import AgroioNavbar from "./components/AgroioNavbar/AgroioNavbar";
import SignUpPage from "./views/SignUpPage/SignUpPage";
import DevicesPage from "./views/DevicesPage/DevicesPage";
import LoginPage from "./views/LoginPage/LoginPage";
import DevicePage from "./views/DevicePage/DevicePage";
import DashboardPage from "./views/DashboardPage/DashboardPage";

const App = () => {
  const isLoggedIn = localStorage.getItem("agroioToken");
  return (
    <Router>
      <div className="App">
        <div className="app-content">
          {isLoggedIn ? <AgroioNavbar/> : null}
          <Switch>
            <PrivateRoute exact path="/devices" component={DevicesPage}/>
            <PrivateRoute path="/login" component={LoginPage}/>
            <PrivateRoute path="/signUp" component={SignUpPage}/>
            <PrivateRoute path="/device/:id" component={DevicePage}/>
            <PrivateRoute path="/dashboard" component={DashboardPage}/>
            <Redirect from="*" to="/devices"/>
          </Switch>
        </div>
      </div>
    </Router>
  );
};

export default App;
