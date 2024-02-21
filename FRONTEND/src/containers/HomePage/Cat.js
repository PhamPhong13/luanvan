import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HomePage.scss';
import _, { isEmpty } from 'lodash';
import * as actions from '../../store/actions'
import logo from "../../assets/logo.jpg"
import avatar from "../../assets/410251206_697829015774464_3697217710754640905_n.jpg"
import { withRouter } from 'react-router';
import {getAllpostById,   getcatById, getpostById} from '../../services/userService';
import Header from './Header';
import Comment from './Comment';
class Cat extends Component
{

    constructor(props) {
        super(props);
        this.state = {
          
        }
    }

    async componentDidMount() {
    }

    
    
    render ()
    {
        return (
            <>
                <title>
                     Chuyên mục
                </title>
                <Header /> 
                
            </>
        );
    }

}

const mapStateToProps = state =>
{
    return {
        language: state.app.language,
        isLoggedInUser: state.user.isLoggedInUser,
        userInfo: state.user1.users,
    };
};

const mapDispatchToProps = dispatch =>
{
    return {
        processLogout_U: () => dispatch( actions.processLogout_U() ),
    };
};  

export default withRouter(connect( mapStateToProps, mapDispatchToProps )( Cat ));
