import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

class Home extends Component
{

    render ()
    {
        const { isLoggedIn,  isLoggedInUser} = this.props;
        let linkToRedirect = isLoggedIn ? '/system/home' : '/home';
        /* let linkToRedirect = isLoggedInUser ? '/home' : '/home'; */

        return (
            <Redirect to={ linkToRedirect } />
        );
    }

}

const mapStateToProps = state =>
{
    return {
        isLoggedIn: state.user.isLoggedIn,
        isLoggedInUser: state.user1.isLoggedInUser
    };
};

const mapDispatchToProps = dispatch =>
{
    return {
    };
};

export default connect( mapStateToProps, mapDispatchToProps )( Home );
