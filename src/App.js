import React from 'react';
import './App.css';

import { BrowserRouter as Router, Route, Switch, Redirect, useHistory, useLocation} from 'react-router-dom';
import { Security, SecureRoute, ImplicitCallback } from '@okta/okta-react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import store from './redux';
import Home from './components/Frame';
import Login from './components/Login';
import Logout from './components/Logout';

function onAuthRequired({history}) {
  history.push('/login');
}


function App() {
  return (
    <Provider store={store}>
    <Router >
        <Route path='/' component={Home} />
    </Router>
    </Provider>
  );
}

export default App;
