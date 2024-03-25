import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HomePage.scss';
import _ from 'lodash';
import Header from './Header';
import * as actions from '../../store/actions'
import { handleLoginUser } from '../../services/userService';
import { toast } from 'react-toastify';
import { withRouter } from 'react-router';

class Login extends Component
{

    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            checkstatus: "",
        }
    }
    handleOnchangeInput = ( event, id ) =>
    {
        let stateCopy = { ...this.state };
        stateCopy[ id ] = event.target.value;
        this.setState( {
            ...stateCopy
        } )
    }


    login = async () => {
        /* let res = await handleLoginUser(this.state.email, this.state.password);
        if (res && res.errCode === 0) {
            this.props.userLoginSuccess_U(res.user);
            toast.success("Đăng nhập thành công!");
            this.linktoProfile();
        }
        else {
            toast.error("Đăng nhập không thành công!");
        } */
    }

    linktoProfile = () => {
        if ( this.props.history )
        {
            this.props.history.push( `/profile` );
        }
    }

    linktoSignup = () => {
        if ( this.props.history )
        {
            this.props.history.push( `/signup` );
        }
    }
    render ()
    {
        return (
            <>
                <title>
                    Đăng nhập
                </title>
                <Header />

                <div className='container login-user'>
                    <div className='login-user-content'>
                        <div className='form-content'>
                            <div className='title text-center'>
                                Đăng nhập
                            </div>
                            <div className='form-group'>
                                <lable>Email: </lable>
                                <input type='text'
                                onChange={(event) => this.handleOnchangeInput(event, 'email')}/>
                            </div>

                            <div className='form-group'>
                                <lable>Mật khẩu: </lable>
                                <input type='password'
                                 onChange={(event) => this.handleOnchangeInput(event, 'password')}/>
                            </div>

                            <div className='btn-submit'>
                                <div className='btn btn-primary'
                                    onClick={() => this.login()} 
                                    
                             >Đăng nhập</div>
                            </div>
                            <div className='logintosignup'>
                                Bạn chưa có tài khoản! <span onClick={() => this.linktoSignup()}>Đăng ký tại đây</span>
                            </div>
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
        userInfo: state.user1.users,
    };
};

const mapDispatchToProps = dispatch =>
{
    return {
userLoginSuccess_U: (userInfo) => dispatch(actions.userLoginSuccess_U(userInfo))
    };
};

export default withRouter(connect( mapStateToProps, mapDispatchToProps )( Login ));
