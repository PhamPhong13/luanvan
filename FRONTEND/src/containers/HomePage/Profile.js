import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HomePage.scss';
import _ from 'lodash';
import Header from './Header';
import * as actions from '../../store/actions'
import { handleLoginUser, updateUser, getUserById } from '../../services/userService';
import { CommonUtils } from '../../utils'; // vi or en
import pen from "../../assets/pen.png"
import { toast } from 'react-toastify';
class Profile extends Component
{

    constructor(props) {
        super(props);
        this.state = {
            email: "",
            fullName: "",
            phone: "",
            image: "",
            desc: "",
            user: "",
            id: "",
            openChange: false
        }
    }

    componentDidMount() {
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


    handleOnchange = async () => {
        this.setState({
            user: this.props.userInfo,
            email: this.props.userInfo.email,
            fullName: this.props.userInfo.fullName,
            phone: this.props.userInfo.phone,
            image: this.props.userInfo.image,
            desc: this.props.userInfo.desc,
            id: this.props.userInfo.id,
            openChange:!this.state.openChange
        })
        
    }

    handleOnchangeUser = async () => {
        let res = await updateUser({
            email: this.state.email,
            fullName: this.state.fullName,
            phone: this.state.phone,
            image: this.state.image,
            desc: this.state.desc,
            id: this.state.id,
        })

        if (res && res.errCode === 0) {
            toast.success("Cập nhật thông tin tài khoản thành công!");
            await this.props.processLogout_U();
            let user = await getUserById(this.state.id);
            await this.props.userLoginSuccess_U(user.data);
            this.handleOnchange();
        }
        else {
            toast.error("Cập nhật thông tin tài khoản không thành công!");
        }
    }

    
   
    render ()
    {
        let profile = this.props.userInfo;
        let { user, email, fullName, image, phone, desc } = this.state;
        console.log(this.state)
        return (
            <>
                 <title>
                    Tài khoản
                </title>
                <Header />
                <div className='container manage_container' id='top'>
                    <div className='manage_container-content'>
                        {user === '' && profile &&
                            <div className='profile'>
                            <div className='left'>
                            <div className='top'>
                                    <img src={profile.image} />
                                        <span onClick={() => this.handleOnchange()}><img src={pen } /></span>        
                            </div>
                                <div className='down'>
                                    <div className='form-group'>
                                        <label>Họ tên: </label>
                                        <input type='text' value={profile.fullName} readonly class="no-cursor" />
                                    </div>
                                    <div className='form-group'>
                                        <label>Email: </label>
                                        <input type='text' value={profile.email} readonly class="no-cursor email" />
                                    </div>
                                    <div className='form-group'>
                                        <label>Điện thoại:</label>
                                        <input type='text' value={profile.phone} readonly class="no-cursor" />
                                    </div>
                                    <div className='form-group bio'>
                                        <label>Tiểu sử:</label>
                                        <textarea >
                                            {profile.desc}
                                        </textarea>
                                        </div>
                                        
                            </div>
                        </div>
                        <div className='right'></div>
                        </div>
                        }

                        {user !== '' && 
                            <div className='profile'>
                            <div className='left'>
                            <div className='top'>
                                    <img src={image} />
                                    <input type="file" className="form-control" id="reviewImg" hidden
                                            onChange={(event) => this.handleOnchangeImg(event)} />
                                        {this.state.openChange === true && 
                                            <label className='label_upload-img' htmlFor='reviewImg'>Thay đổi ảnh  <i className='fas fa-upload'></i></label>
                                        }
                                    

                                        <span onClick={() => this.handleOnchange()}><img src={pen } /></span>        
                            </div>
                                <div className='down'>
                                    <div className='form-group'>
                                        <label>Họ tên: </label>
                                        <input type='text' value={fullName} 
                                        onChange={(event) => this.handleOnchangeInput(event, 'fullName')} />
                                    </div>
                                    <div className='form-group '>
                                        <label>Email: </label>
                                        <input type='text' value={email}  className='email'
                                        onChange={(event) => this.handleOnchangeInput(event, 'email')} />
                                    </div>
                                    <div className='form-group'>
                                        <label>Điện thoại:</label>
                                        <input type='text' value={phone} 
                                        onChange={(event) => this.handleOnchangeInput(event, 'phone')} />
                                    </div>
                                    <div className='form-group bio'>
                                        <label>Tiểu sử:</label>
                                        <textarea onChange={(event) => this.handleOnchangeInput(event, 'desc')}>
                                           {desc}
                                        </textarea>
                                        </div>
                                        
                                        {this.state.openChange === true
                                            && 
                                        <div className='btn-submit'>
                                            <div className='btn btn-primary'
                                                onClick={() => this.handleOnchangeUser()}
                                                
                                        >Lưu</div>
                                    </div>}
                                    
                            </div>
                        </div>
                        <div className='right'></div>
                        </div>
                        }
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
        userLoginSuccess_U: (userInfo) => dispatch(actions.userLoginSuccess_U(userInfo)),
        processLogout_U: () => dispatch(actions.processLogout_U()),
    };
};

export default connect( mapStateToProps, mapDispatchToProps )( Profile );
