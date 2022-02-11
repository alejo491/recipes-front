import React from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { history } from '../utils/history';
import { RecipesPage } from '../pages/RecipesPage';
import { RecipePage } from '../pages/RecipePage';
import { CreateRecipePage } from '../pages/CreateRecipePage';
import { UpdateRecipePage } from '../pages/UpdateRecipePage';
import Button from 'react-bootstrap/Button';
import { useDispatch } from 'react-redux';
import { authActions } from '../actions/authActions';


const PrivateApp =() => { 
  const dispatch = useDispatch();
  const logout = (e) => {
    e.preventDefault()
    dispatch(authActions.logout())

  }
  return (
    <div>
      <div>
      <Button variant="primary" onClick={logout}>
          Log Out
      </Button>
      </div>
      <Router history={history}>
        <Switch>
            <Route exact path="/recipes" component={RecipesPage} />
            <Route exact path="/recipes/create" component={CreateRecipePage} />
            <Route exact path="/recipes/:id" component={RecipePage} />
            <Route exact path="/recipes/:id/edit" component={UpdateRecipePage} />
            <Route exact path="/">
              <Redirect to="/recipes" />
            </Route>
            
        </Switch>
      </Router>
    </div>
  );
}

export default PrivateApp;
