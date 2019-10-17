import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch, Redirect, useHistory, useLocation} from 'react-router-dom';
import { Security, SecureRoute, ImplicitCallback } from '@okta/okta-react';

import Frame from './components/Frame';
import Home from './components/Home.js';
import Login from './components/Login';

function onAuthRequired({history}) {
  history.push('/login');
}
function App() {
  return (
    
    <Router>
      <Security issuer='https://bostontest.okta.com/oauth2/default'
                  clientId='0oa1lcice3pBtcAiE357'
                  redirectUri={window.location.origin + '/implicit/callback'}
                  onAuthRequired={onAuthRequired}
                  pkce={true}>
        {/* <Route path='/' exact={true} render={() => <div>M</div>}/> */}
        <Route path='/' exact={true} render={() => <Login baseUrl='https://bostontest.okta.com' />} />
        <SecureRoute path='/protected' component={Frame} />
        <Route path='/login' render={() => <Login baseUrl='https://bostontest.okta.com' />} />
        <Route path='/implicit/callback' component={ImplicitCallback}/>
      </Security>
    </Router>
  );
}

export default App;
