import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from "../../store/actions";
import Navigator from '../../components/Navigator';
import { adminMenu, doctorMenu } from './menuApp';
import './Header.scss';
import { FormattedMessage } from 'react-intl'; // fomat language
import { LANGUAGE, USER_ROLE } from '../../utils';
import _ from 'lodash';

import logo from "../../assets/logo.jpg";
class Header extends Component
{

    constructor ( props )
    {
        super( props );
        this.state = {
            menuApp: [],
        }
    }

    handleChangeLanguage = ( language ) =>
    {
        this.props.changeLanguageApp( language );
    }

    componentDidMount ()
    {
        let { userInfo } = this.props;
        let menu = adminMenu;
        this.setState( {
            menuApp: menu
        } );
    }

    render ()
    {
        const { processLogout, language, userInfo } = this.props;

        return (
            <div className='header-s'> 
                <div className='header-img'>
                    <div className='header-img-left'>
                        <img src={logo} />
                    <div className='name'>
                        <div className='name-top'>
                        CHI HỘI SINH VIÊN BÌNH TÂN
                        </div>
                        <div className='name-bottom'>
                            ĐẠI HỌC CẦN THƠ
                        </div>
                    </div>
                    </div>

                    <div className='header-img-right'>
                        <div className='language'>
                    <span className='welcom'><FormattedMessage id="system.welcome" /> <b>{ userInfo && userInfo.fullName ? userInfo.fullName : `${ userInfo.firstName } ${ userInfo.lastName }` } !</b></span>
                    <span onClick={ () => { this.handleChangeLanguage( LANGUAGE.VI ) } } className={ language === LANGUAGE.VI ? "language-vi active" : "language-vi " }>VI</span>
                    <span onClick={ () => { this.handleChangeLanguage( LANGUAGE.EN ) } } className={ language === LANGUAGE.EN ? "language-en active" : "language-en " }>EN</span>
                    {/* nút logout */ }
                    <div className="btn btn-logout" onClick={ processLogout } title="Logout">
                        <i className="fas fa-sign-out-alt"></i>
                    </div>
                </div>
                    </div>
                </div>
                <div className="header-container">
                    {/* thanh navigator */ }
                    <div className="header-tabs-container">
                        <Navigator menus={ this.state.menuApp } />
                    </div>
                    {/* language */ }
                
                </div>
            </div>
        );
    }

}

const mapStateToProps = state =>
{
    return {
        isLoggedIn: state.user.isLoggedIn,
        userInfo: state.user.userInfo,
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch =>
{
    return {
        processLogout: () => dispatch( actions.processLogout() ),
        changeLanguageApp: ( language ) => dispatch( actions.changeLanguage( language ) ) // truyền action
    };
};

export default connect( mapStateToProps, mapDispatchToProps )( Header );
