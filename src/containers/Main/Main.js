import React from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Homepage from '../../components/Homepage/Homepage';
import AuthForm from '../../components/AuthForm/AuthForm'
import { authUser } from '../../store/actions/auth';
import { removeError } from '../../store/actions/errors';
import withAuth from '../../hocs/withAuth';
import MessageForm from '../MessageForm/MessageForm';
import IndividualMessage from '../IndividualMessage/IndividualMessage.js';
import MyMessageTimeline from '../../components/MyMessageTimeline/MyMessageTimeline';
import NotFound from '../../components/NotFound/NotFound';

const Main = props => {
    const {currentUser, authUser, errors, removeError} = props;
    return (
        <div className="container">
            <Switch>
                <Route exact path="/" render={ props => <Homepage currentUser={currentUser} {...props} /> } />
                
                <Route 
                  exact
                  path="/signin"
                  render={ props => {
                    return (
                      <AuthForm removeError={removeError} errors={errors} onAuth={authUser} buttonText="Login" heading="Welcome Back!" {...props} />
                    );
                  }} 
                />

                <Route 
                  exact
                  path="/signup"
                  render={ props => {
                    return (
                      <AuthForm removeError={removeError} errors={errors} onAuth={authUser} signUp buttonText="Sign me up" heading="Join Interact Today" {...props} />
                    );
                  }}  
                />  

                <Route 
                  exact
                  path="/users/:id/messages"
                  render={props => <MyMessageTimeline 
                    isAuthenticated= {currentUser.isAuthenticated}
                    username={currentUser.user.username} 
                    profileImageUrl={currentUser.user.profileImageUrl}
                    key={Date.now()} 
                  />}
                />

                <Route
                  path="/users/:id/messages/new"
                  exact
                  component={withAuth(MessageForm)} 
                />

                <Route 
                  path="/users/:id/messages/:message_id"
                  exact
                  render= {props => <IndividualMessage 
                    username= {currentUser.user.username} 
                    profileImageUrl= {currentUser.user.profileImageUrl} 
                  />}
                />

                <Route component={NotFound}/>
            </Switch>
        </div>
    );
}

function mapStateToProps(state) {
    return {
        currentUser: state.currentUser,
        errors: state.errors
    }
}

export default withRouter(connect(mapStateToProps, { authUser, removeError })(Main));