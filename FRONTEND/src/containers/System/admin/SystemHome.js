import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import "./HomeSystem.scss";
import { FormattedMessage } from 'react-intl';
import Footer from '../footer';
class SystemHome extends Component
{

    render ()
    {

        return (
            <>
                <title> <FormattedMessage id="system.home.home" /></title>
                <div className='homesystem'>
                    <div className=' welcome'>
                        <FormattedMessage id="system.home.welcome" />
                    </div>
                </div>
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

export default connect( mapStateToProps, mapDispatchToProps )( SystemHome );
