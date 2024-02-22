import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HomePage.scss';
import _, { isEmpty } from 'lodash';
import * as actions from '../../store/actions'
import logo from "../../assets/logo.jpg"
import { withRouter } from 'react-router';
import {userSendEmail} from '../../services/userService';
import Header from './Header';
import { toast } from 'react-toastify';
import Footer from './Footer';
class lienhe extends Component
{

    constructor(props) {
        super(props);
        this.state = {
            name: "",
            email: "",
            content: ""
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

    handleSend = async () => {
        let res = await userSendEmail({
            name: this.state.name,
            email: this.state.email,
            content: this.state.content
        })
        if (res && res.errCode === 0) {
            toast.success("Gửi mail thành công! Cảm con bạn đã phản hôi!");
            this.setState({
                name: "",
                email: "",
                content: ""
            })
        }
        else {
            toast.error("Gửi mail không thành công!");
        }
    }

    
    render ()
    {
        return (
            <>
                <title>
                Liên hệ
                </title>
                <Header /> 
                <div className='container manage_container'id='top'>
                    <div className='manage_container-content' >
                        <div className='lienhe'>
                            <div className='left'>
                                <p>CHSV Bình Tân - Nơi Tự nguyện được đặt lên hàng đầu và Nguồn sống là tình</p>
                                <p>Cảm ơn bạn đã đến thăm website của Chi hội Sinh viên Bình Tân</p>
                                <div className='top'>Bạn có vấn đề hoặc có những ý kiến cho Chi hội Sinh viên Bình Tân vui lòng điền vào form bên dưới!</div>

                                <div className='form-group'>
                                    <label>Họ tên:</label>
                                    
                                    <input type='text' className='form-control'
                                    onChange={(event) => this.handleOnchangeInput(event, "name")}/>
                                </div>

                                <div className='form-group'>
                                    <label>Email:</label>
                                    
                                    <input type='text' className='form-control'
                                    onChange={(event) => this.handleOnchangeInput(event, "email")}/>
                                </div>

                                <div className='form-group'>
                                    <label>Nội dung:</label>
                                    <textarea
                                    onChange={(event) => this.handleOnchangeInput(event, "content")}></textarea>
                                </div>
                                <div className='btn-submit'>
                                    <div className='btn btn-primary' onClick={() => this.handleSend()}>Gửi</div>
                                </div>
                            </div>
                            <div className='right'>
                                <img src={logo } />
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

export default withRouter(connect( mapStateToProps, mapDispatchToProps )( lienhe ));
