import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HomePage.scss';
import _ from 'lodash';
import { FormattedMessage } from 'react-intl';
import Header from './Header';
class HomePage extends Component
{

    render ()
    {

        return (
            <>
                <title>
                    <FormattedMessage id="system.homepage"></FormattedMessage>
                </title>
                <Header />  

            </>
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
