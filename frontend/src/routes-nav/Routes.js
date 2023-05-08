import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Home from "../home/Home";
import LoginForm from "../auth/LoginForm";
import PrivateRoute from "./PrivateRoute";
import SignupForm from "../auth/SignupForm";
import CoinList from "../coins/CoinList";
import ProfileForm from "../profiles/ProfileForm";


function Routes( {login, signup} ){

    return (
        <div>
          <Switch>
  
            <Route exact path="/">
              <Home />
            </Route>
  
            <Route exact path="/login">
              <LoginForm login={login} />
            </Route>
  
            <Route exact path="/signup">
              <SignupForm signup={signup} />
            </Route>

            <PrivateRoute exact path="/coins">
              <CoinList />
            </PrivateRoute>

            <PrivateRoute path="/profile">
              <ProfileForm />
            </PrivateRoute>
  
            <Redirect to="/" />
          </Switch>
        </div>
    );
}

export default Routes;
