import React, { Component } from 'react';
import './App.css';
import {
  Route,
  withRouter,
  Switch
} from 'react-router-dom';

import { getCurrentUser } from '../util/APIUtils';
import { ACCESS_TOKEN } from '../constants';


import Signin from '../user/signin/Signin';
import ChangePassword from '../user/changepass/changepass';
import Signup from '../user/signup/Signup';
import Profile from '../user/profile/Profile';
import Admin from '../user/admin/Admin';
import AppHeader from '../common/AppHeader';
import UnAuthorizedAccess from '../common/UnAuthorizedAccess';
import NotFound from '../common/NotFound';
import LoadingIndicator from '../common/LoadingIndicator';
import PrivateRoute from '../common/PrivateRoute';

import { Layout, notification } from 'antd';
const { Content } = Layout;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: null,
      isAuthenticated: false,
      isLoading: false
    }
    this.handleLogout = this.handleLogout.bind(this);
    this.loadCurrentUser = this.loadCurrentUser.bind(this);
    this.handleLogin = this.handleLogin.bind(this);

    notification.config({
      placement: 'topRight',
      top: 70,
      duration: 3,
    });    
  }

  loadCurrentUser() {
    this.setState({
      isLoading: true
    });
    getCurrentUser()
    .then(response => {
      this.setState({
        currentUser: response,
        isAuthenticated: true,
        isLoading: false
      });
    }).catch(error => {
      this.setState({
        isLoading: false
      });  
    });
  }

  componentDidMount() {
    this.loadCurrentUser();
  }

  handleLogout(redirectTo="/", notificationType="success", description="You're successfully logged out.") {
    localStorage.removeItem(ACCESS_TOKEN);

    this.setState({
      currentUser: null,
      isAuthenticated: false
    });

    this.props.history.push(redirectTo);
    
    notification[notificationType]({
      message: 'Second Class Project',
      description: description,
    });
  }

  handleLogin() {
    notification.success({
      message: 'Second Class Project',
      description: "You're successfully logged in.",
    });
    this.loadCurrentUser();
    this.props.history.push("/utilisateur");
  }

  render() {
    if(this.state.isLoading) {
      return <LoadingIndicator />
    }
    return (
        <Layout className="app-container">
          <AppHeader isAuthenticated={this.state.isAuthenticated} 
            currentUser={this.state.currentUser} 
            onLogout={this.handleLogout} />

          <Content className="app-content">
            <div className="container">
              <Switch>      
               
                <Route  path="/signin"
                  render={(props) => <Signin onSignin={this.handleLogin} {...props} />}></Route>
                <Route path="/signup" component={Signup}></Route>
                <Route authenticated={this.state.isAuthenticated} path="/changepass" component={ChangePassword}></Route>
          <Route path="/utilisateur/:username"
            render={(props) => <Profile isAuthenticated={this.state.isAuthenticated} currentUser={this.state.currentUser} {...props}  />}>
            </Route>
          <Route authenticated={this.state.isAuthenticated} path="/admin" component={Admin}></Route>

              </Switch>
            </div>
          </Content>
        </Layout>
    );
  }
}

export default withRouter(App);
