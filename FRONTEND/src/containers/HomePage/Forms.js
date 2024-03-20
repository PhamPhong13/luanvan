import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HomePage.scss';
import { withRouter } from 'react-router';
import Header from './Header';
import {getkeyform,getformbyid, createformusersubmit, getformusersubmit, updateformusersubmit} from '../../services/userService';
class Forms extends Component
{

    constructor(props) {
        super(props);
        this.textareaRef = React.createRef();
        this.state = {
        }
    }


    render ()
    {
        return (
            <>
                <title>Biểu mẩu  </title>

                <Header />
                 <div className='container manage_container' id='top'>
                    <div className='manage_container-content' >
                        <div className='form'>
                            qqjfqwjfqwfoi
                    </div>
                    </div>
                </div>
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
    };
};  

export default withRouter(connect( mapStateToProps, mapDispatchToProps )( Forms ));
