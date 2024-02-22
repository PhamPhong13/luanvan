import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter as Router } from 'connected-react-router';
import { history } from '../redux'
import { ToastContainer } from 'react-toastify';


import { userIsAuthenticated, userIsNotAuthenticated } from '../hoc/authentication';

import { path } from '../utils'

import Home from '../routes/Home';
// import Login from '../routes/Login';
import Login from './Auth/Login';

import Header from './Header/Header';
import System from '../routes/System';

import { CustomToastCloseButton } from '../components/CustomToast';
import ConfirmModal from '../components/ConfirmModal';
import HomePage from './HomePage/HomePage';
import Profile from './HomePage/Profile';
import LoginUser from './HomePage/Login';
import Signup from './HomePage/Signup';
import Post from './HomePage/Post';
import Cat from './HomePage/Cat';
import Tunure from './HomePage/Tunure';
import lienhe from './HomePage/lienhe';

class App extends Component
{

    handlePersistorState = () =>
    {
        const { persistor } = this.props;
        let { bootstrapped } = persistor.getState();
        if ( bootstrapped )
        {
            if ( this.props.onBeforeLift )
            {
                Promise.resolve( this.props.onBeforeLift() )
                    .then( () => this.setState( { bootstrapped: true } ) )
                    .catch( () => this.setState( { bootstrapped: true } ) );
            } else
            {
                this.setState( { bootstrapped: true } );
            }
        }
    };

    componentDidMount ()
    {
        this.handlePersistorState();
    }

    render ()
    {
        return (
            <Fragment>
                <Router history={ history }>
                    <div className="main-container">
                        <ConfirmModal />


                        <span className="content-container">
                            <Switch>
                                <Route path={ path.HOME } exact component={ ( Home ) } />
                                <Route path={ path.LOGIN } component={ userIsNotAuthenticated( Login ) } />
                                <Route path={ path.SYSTEM } component={ userIsAuthenticated( System ) } />
                                <Route path={ path.HOMEPAGE } component={ HomePage } />
                                <Route path={path.PROFILE} component={Profile} />
                                <Route path={'/login-user'} component={LoginUser} />
                                <Route path={'/signup'} component={Signup} />
                                <Route path={'/post/:id'} component={Post} />
                                <Route path={'/cat/:id'} component={Cat} />
                                <Route path={'/Tunure'} component={Tunure} />
                                <Route path={'/lienhe'} component={lienhe} />
                            </Switch>
                        </span>



                        <ToastContainer
                            position="top-right"
                            autoClose={ 5000 }
                            hideProgressBar={ false }
                            newestOnTop={ false }
                            closeOnClick
                            rtl={ false }
                            pauseOnFocusLoss
                            draggable
                            pauseOnHover
                            theme="light"
                        />
                    </div>
                </Router>
            </Fragment>
        )
    }
}

const mapStateToProps = state =>
{
    return {
        started: state.app.started,
        isLoggedIn: state.user.isLoggedIn,
        isLoggedInUser: state.user1.isLoggedInUser,

    };
};

const mapDispatchToProps = dispatch =>
{
    return {
    };
};

export default connect( mapStateToProps, mapDispatchToProps )( App );