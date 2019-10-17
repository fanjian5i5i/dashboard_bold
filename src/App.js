import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Security, ImplicitCallback } from '@okta/okta-react';

import Frame from './components/Frame';
import Home from './components/Home';

const config = {
  issuer: 'https://bostontest.okta.com/oauth2/default',
  redirectUri: window.location.origin + '/implicit/callback',
  clientId: '0oa1lcice3pBtcAiE357',
  pkce: true
}

//<div className="App">
//<Frame/>
//</div>
function App() {
  return (
    
    <Router>
      <Security {...config}>
        <Route path='/' exact={true} component={Home}/>
        <Route path='/implicit/callback' component={ImplicitCallback}/>
      </Security>
    </Router>
  );
}

export default App;
