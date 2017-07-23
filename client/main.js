import React from 'react';
import ReactDOM from 'react-dom';

import {Router, Route, browserHistory} from 'react-router';

import RegisterComponent from './components/Register';
import SignInComponent from './components/SignIn';
import DashboardComponent from './components/Dashboard';

import '../node_modules/font-awesome/css/font-awesome.min.css';
import Bootstrap from 'bootstrap/dist/css/bootstrap.min.css';
import './assets/main.scss';

import App from './components/App';

ReactDOM.render(
    <Router history={browserHistory}>
       <Route path="/" component={App} >
               <Route path="register" component={RegisterComponent} name="test" />
               <Route path="sign-in" component={SignInComponent} />
               <Route path="dashboard" component={DashboardComponent} />
       </Route>
    </Router>, document.getElementById("root"));