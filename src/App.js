import React, { useState, useEffect } from 'react';
import Home  from './pages/home/home.component';
import Dashboard  from './pages/dashboard/dashboard.component';
import Login from './pages/login/login.component';
import Registro from './pages/register/register.component';
import AppHeader from './components/header/header.component';
import { getToken } from './services/storage.service';
import { doLogin, getActiveUser, doLogout } from './services/users.service';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';

function App() {
  const [isUserAuthenticated, setIsUserAuthenticated] = useState(false);
  const [activeUser, setActiveUser] = useState({});
  
  useEffect(() => {
    let token = getToken();
    if(token) {
      setIsUserAuthenticated(true)
      setActiveUser(getActiveUser());
    }
  }, []);

  const handleLogin = async (data) => {
    let loginResponse = await doLogin(data).then(resp => resp);

    if(loginResponse) {
      setIsUserAuthenticated(true)
      getActiveUser()
      setActiveUser(getActiveUser());
    } else {
      setIsUserAuthenticated(false)
    }
  }

  const handleLogout = async (userId) => {
    try {
      await doLogout(userId);
      setIsUserAuthenticated(false);
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div className="App">
      <Router>
        <AppHeader
          className="App-header"
          isAuth={isUserAuthenticated}
          activeUser={activeUser}
          handleLogout={handleLogout}
        />
        <Switch>
          <Route exact path="/">
            <Redirect to="/home" />  
          </Route>
          <Route exact path="/home" component={Home} />
          <Route exact path="/dashboard"
            render={() => {
              return (
                isUserAuthenticated ?
                <Dashboard/> : 
                <Redirect to="/login" />
              )
            }}/>
          <Route exact path="/registro" component={Registro} />
          <Route exact path="/login">
            <Login 
              isAuth={isUserAuthenticated}
              handleLogin={handleLogin}
            />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
