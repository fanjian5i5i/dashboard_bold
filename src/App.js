import React from 'react';
import './App.css';

import { BrowserRouter as Router, Route, Switch, Redirect, useHistory, useLocation} from 'react-router-dom';
import { Security, SecureRoute, ImplicitCallback } from '@okta/okta-react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import store from './redux';
import Frame from './components/Frame';
import Login from './components/Login';
import Logout from './components/Logout';
import Popup from './components/Popup'

function onAuthRequired({history}) {
  history.push('/');
}
//pkce={true}
  
function App() {
  return (
    <Provider store={store}>
    <Router >
      
        <Route path="/:id" component={Frame}/>
    </Router>

    </Provider>
  );
}

export default App;
