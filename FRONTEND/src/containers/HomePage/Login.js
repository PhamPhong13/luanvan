import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HomePage.scss';
import _ from 'lodash';
import Header from './Header';
import * as actions from '../../store/actions'
import { handleLoginUser , getuserstatus} from '../../services/userService';
import { toast } from 'react-toastify';
import { withRouter } from 'react-router';
import Footer from './Footer'

class Login extends Component
{

    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            checkstatus: "",
            opencheck: false
        }
    }

    componentDidMount() {
        console.log(this.props);
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
        let res = await getuserstatus(this.state.email);
        if (res && res.errCode === 1) {
            this.setState({
                checkstatus: '3',
                opencheck: true
            })
        }
        else  if (res && res.errCode === 0) {
            if (res.data && res.data.status === '0') {
                this.setState({
                checkstatus: '0',
                opencheck: true
            })
            }
            else if (res.data && res.data.status === '2') {
                this.setState({
                checkstatus: '2',
                opencheck: true
            })
            }
            else if (res.data && res.data.status === '1') {
                let res = await handleLoginUser(this.state.email, this.state.password);
            if (res && res.errCode === 0) {
                this.props.userLoginSuccess_U(res.user);
                toast.success("Đăng nhập thành công!");
                this.linktoProfile();
            }
            else {
                toast.error("Đăng nhập không thành công!");
            } 
                }
                
        }
    }

    linktoProfile = () => {
        this.props.history.goBack();
    }

    linktoSignup = () => {
        if ( this.props.history )
        {
            this.props.history.push( `/signup` );
        }
    }
    opencheck = () => {
        this.setState({
            opencheck: !this.state.opencheck
        })
    }

    linktolienhe = () => {
        if ( this.props.history )
        {
            this.props.history.push( `/lienhe` );
        }
    }
    render ()
    {
        let {checkstatus , opencheck} = this.state;
        return (
            <>
                <title>
                    Đăng nhập
                </title>
                <Header />

                {checkstatus && checkstatus === '3' && opencheck === true &&
                    <div className='checkstatususer'>
                        <div className='checkstatususer-content'>
                            <div className='my-2'>
                                <p style={{color: "red"}}>Tài khoản không tồn tại!</p>
                            </div>
                            <div className='btn-submit'>
                                <div className='btn btn-primary'
                                    onClick={() => this.opencheck()} 
                                    
                             >Ok</div>
                            </div>
                        </div>

                        
                </div>
                }

                {checkstatus && checkstatus === '0' && opencheck === true &&
                    <div className='checkstatususer'>
                        <div className='checkstatususer-content'>
                            <div className='my-2' style={{color: "red"}}>Tài khoản của bạn chưa được phê duyệt!</div>
                            <div className='btn-submit'>
                                <div className='btn btn-primary'
                                    onClick={() => this.opencheck()} 
                                    
                             >Ok</div>
                            </div>
                        </div>

                        
                </div>
                }

                {checkstatus && checkstatus === '2' && opencheck === true &&
                    <div className='checkstatususer'>
                        <div className='checkstatususer-content'>
                            <div className='my-2'>
                                <p style={{color: "red"}}>Tài khoản của bạn đã bị khóa!</p>
                                <p>Bạn có thể phản hồi với người quản trị để mở khóa!
                                    <span onClick={() => this.linktolienhe()}> Tại đây</span>  </p>
                            </div>
                            <div className='btn-submit'>
                                <div className='btn btn-primary'
                                    onClick={() => this.opencheck()} 
                                    
                             >Ok</div>
                            </div>
                        </div>

                        
                </div>
                }

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
                <Footer />
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
