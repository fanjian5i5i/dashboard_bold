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
    <Security issuer='https://bpda.okta.com/'
                  clientId='0oa1iav3pcdA8nNLg0h8'
                  redirectUri={window.location.origin + '/implicit/callback'}
                  onAuthRequired={onAuthRequired}
                  pkce={true}
                  >

        <Route path='/' exact={true} render={() => <Login baseUrl='https://bpda.okta.com' />} />
        <SecureRoute path="/:id" component={Frame}/>
        <Route path='/implicit/callback' component={ImplicitCallback}/>

      </Security>
    </Router>

    </Provider>
  );
}

export default App;
