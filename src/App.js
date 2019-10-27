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
      <Security issuer='https://bostontest.okta.com/oauth2/default'
                  clientId='0oa1lcice3pBtcAiE357'
                  redirectUri={window.location.origin + '/implicit/callback'}
                  onAuthRequired={onAuthRequired}
                  pkce={true}>
        {/* <Route path='/' exact={true} render={() => <div>M</div>}/> */}
        <Route path='/' exact={true} render={() => <Login baseUrl='https://bostontest.okta.com' />} />
        <SecureRoute path='/protected' component={Home} />
        <Route path='/login' render={() => <Login baseUrl='https://bostontest.okta.com' />} />
        <Route path='/implicit/callback' component={ImplicitCallback}/>
      </Security>
    </Router>
    </Provider>
  );
}

export default App;
