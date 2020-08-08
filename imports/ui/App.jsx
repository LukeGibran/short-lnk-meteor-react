import React, { Component } from 'react';
import Signup from './Signup.jsx';
import Link from './Link.jsx';
import Login from './Login.jsx';
import NotFound from './NotFound.jsx';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <Switch>
            <Route exact path="/" component={Login} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/link" component={Link} />
            <Route exact path="/*" component={NotFound} />
          </Switch>
        </Router>
      </div>
    );
  }
}
export default App;
