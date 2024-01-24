import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HomePage.scss';
import _ from 'lodash';
class HomePage extends Component
{

    render ()
    {

        return (
            <>
                fhkukfgufqiukfhqkqfh</>
        );
    }

}

const mapStateToProps = state =>
{
    return {
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch =>
{
    return {

    };
};

export default connect( mapStateToProps, mapDispatchToProps )( HomePage );
