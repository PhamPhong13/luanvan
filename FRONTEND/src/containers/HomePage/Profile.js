import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HomePage.scss';
import _ from 'lodash';
import Header from './Header';
import * as actions from '../../store/actions'
import { handleLoginUser } from '../../services/userService';
class Profile extends Component
{

    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: ""
        }
    }
   
    render ()
    {
        return (
            <>
                <Header />

                
            </>
        );
    }

}

const mapStateToProps = state =>
{
    return {
        language: state.app.language,
        userInfo: state.user1.users,
    };
};

const mapDispatchToProps = dispatch =>
{
    return {
userLoginSuccess_U: (userInfo) => dispatch(actions.userLoginSuccess_U(userInfo))
    };
};

export default connect( mapStateToProps, mapDispatchToProps )( Profile );
