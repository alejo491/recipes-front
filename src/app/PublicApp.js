import React, { useEffect } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { history } from '../utils/history';
import { messagesActions } from '../actions/messageActions';
import { LoginPage } from '../pages/LoginPage';
import { RegisterPage } from '../pages/RegisterPage';



const PublicApp =() => { 
  return (
    <div>
      
      <Router history={history}>
        <Switch>
            <Route exact path="/register" component={RegisterPage} />
            <Route exact path="/" component={LoginPage} />
            
        </Switch>
      </Router>
    </div>
  );
}

export default PublicApp;
