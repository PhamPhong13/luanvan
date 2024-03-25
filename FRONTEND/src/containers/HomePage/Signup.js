import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HomePage.scss';
import _ from 'lodash';
import Header from './Header';
import * as actions from '../../store/actions'
import { handleLoginUser, createUser } from '../../services/userService';
import { toast } from 'react-toastify';
import { withRouter } from 'react-router';
import { CommonUtils } from '../../utils'; // vi or en

class Signup extends Component
{

    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            phone: "",
            image: "",
            fullName: "",
            openSign: false,
            openLog: false,
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
    handleOnchangeImg = async (event) => {
        let file = event.target.files[0];
        if (file) {
            let getBase64 = await CommonUtils.getBase64(file);
            this.setState({
                image: getBase64
            })
        }
    }

    Signup = async () => {
        let res = await createUser({
            email: this.state.email,
            password: this.state.password,
            phone: this.state.phone,
            fullName: this.state.fullName,
            image: this.state.image,
            status: '0'
        })

        if (res && res.errCode === 0) {
            this.setState({
                openLog: !this.state.openLog
            })
        }
        else if (res && res.errCode === 3) {
            toast.error("Email đã tồn tại!");
            }
        else toast.error("Đăng ký tài khoản không thành công!");
    
    }

    linktohome = () => {
        if ( this.props.history )
        {
            this.props.history.push( `/home` );
        }
    }

    handleOpenSign = () => {
        this.setState({
            openSign: !this.state.openSign
        })
    }

    render ()
    {
        let { openSign , openLog} = this.state;
        return (
            <>
                 <title>
                    Đăng ký
                </title>
                <Header />
                <div className='container signup'>
                    <div className='signup-content'>
                        <div className='form-content'>
                            <div className='title text-center'>
                                Đăng ký
                            </div>
                            <p className='dieukhoan'>
                                Bằng việc đăng ký tài khoản, bạn phải đồng ý với một số điều khoản sử dụng của chúng tôi.
                                <ol>
                                    <li>Yêu cầu phải thể hiện hành vi lịch sự, tôn trọng người khách trên cộng đồng.</li>
                                    <li>Không chia sẻ bất kỳ thông tin nhạy cảm trên cổng thông tin.</li>
                                    <li>Chụi trách nhiệm về những thông tin bạn chia sẻ.</li>
                                    <li>Bạn có thể báo cáo các hành vi vi phạm trên cộng đồng.</li>
                                    <li>Bạn có thể bị vô hiệu hóa hoặc bị xóa tài khoản nếu bạn vi phạm điều khoản nhiều lần.</li>
                                </ol>
                            </p>
                            <div className='form'>
                                <div className='form-group'>
                                <lable>Email: </lable>
                                <input type='email'
                                onChange={(event) => this.handleOnchangeInput(event, 'email')}/>
                            </div>

                            <div className='form-group'>
                                <lable>Mật khẩu: </lable>
                                <input type='password'
                                onChange={(event) => this.handleOnchangeInput(event, 'password')}/>
                                </div>
                                
                            </div>
                            <div className='form-image'>
                                <div className='form-image-left'>
                                    <div className='form-group'>
                                <lable>Họ tên: </lable>
                                <input type='text'
                                onChange={(event) => this.handleOnchangeInput(event, 'fullName')}/>
                                    </div>
                                    <div className='form-group'>
                                <lable>Số điện thoại: </lable>
                                <input type='text'
                                onChange={(event) => this.handleOnchangeInput(event, 'phone')}/>
                                </div>
                                </div>
                                <div className='form-image-right'>
                                    <input type="file" className="form-control" id="reviewImg" hidden
                                                onChange={(event) => this.handleOnchangeImg(event)} />
                                    <div className='reviewImage'
                                                style={{ backgroundImage: `url(${this.state.image})` }}
                                                ></div>
                                <label className='label_upload-img' htmlFor='reviewImg'>Tải ảnh <i className='fas fa-upload'></i></label>
                                </div>
                            </div>
                            <p className='mt-3'><input type='checkbox'
                            onClick={() => this.handleOpenSign()}
                            /> Bạn đồng ý với điều khoản của chúng tôi.</p>

                            {openSign === true ? <div className='btn-submit'>
                                <div className='btn btn-primary'
                                    onClick={() => this.Signup()} 
                                    
                             >Đăng ký</div>
                            </div>: 
                            <div className='btn-submit'>
                                <div className='btn btn-secondary'
                             >Đăng ký</div>
                            </div>
                        }
                            <div className='logintosignup'>
                                Bạn đã có tài khoản! <span onClick={() => this.linktoLogin()}>Đăng nhập tại đây</span>
                            </div>
                        </div>
                        
                    </div>
                </div>
                
                {openLog === true &&
                <div className='signupsuccess'>
                    <div className='signupsuccess-content'>
                        <div className='     text-center'>
                            Bạn vừa đăng ký tài khoản để truy cập vào cổng điện
                            tử của chúng tôi! Nhưng bạn chưa có thể đăng nhập 
                            trước khi quản trị viên duyệt yêu cầu đăng ký của bạn.
                            Giờ bạn có thể truy cập vào bằng tài khoản khách.
                        </div>
                        <div className='btn-submit mt-3'>
                            <div className='btn btn-primary'
                                onClick={() => this.linktohome()} 
                                
                             >Ok</div>
                        </div>
                    </div>
                </div>
                }
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

export default withRouter(connect( mapStateToProps, mapDispatchToProps )( Signup ));
