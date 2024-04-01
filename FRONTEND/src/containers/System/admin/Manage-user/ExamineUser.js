import React, { Component } from 'react';
import { connect } from 'react-redux';
import "./Manage.scss";
import { FormattedMessage } from 'react-intl';
import { getUserById, examineUser, deleteUser } from "../../../../services/userService"
import { CommonUtils } from '../../../../utils'; // vi or en
import Select from 'react-select';
import { toast } from 'react-toastify';
import { withRouter } from 'react-router';
class ExamineUser extends Component
{
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            fullName: "",
            phone: "",
            image: "",
            desc: "",
            openloading: false,
        }
    }

    async componentDidMount() {
        await this.getUserById();
        
    }

    getUserById = async () => {
        let id = this.props.match.params.id;
        let res = await getUserById(id);
        this.setState({
            email: res.data.email,
            fullName: res.data.fullName,
            phone: res.data.phone,
            image: res.data.image,
            desc: res.data.desc,
            status: "1"
        });

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
   
    handleOnchangeInput = ( event, id ) =>
    {
        let stateCopy = { ...this.state };
        stateCopy[ id ] = event.target.value;
        this.setState( {
            ...stateCopy
        } )
    }

    handleSave = async () => {
        this.setState({
             openloading: true,
         })
        if (this.checkstate() === true) {
            let res = await examineUser({
                email: this.state.email,
                fullName: this.state.fullName,
                phone: this.state.phone,
                image: this.state.image,
                desc: this.state.desc,
                status: '1',
                id: this.props.match.params.id
            })

            if (res && res.errCode === 0) {
                this.linkToManageExamine();
                toast.success("Duyệt yêu cầu người dùng thành công!");
                
            }
            else toast.error("Duyệt yêu cầu người dùng không thành công!");
        }
        this.setState({
             openloading: false,
         })
    } 

    checkstate = () => { 
        let result = true;
        let reg = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        if (!reg.test(this.state.email)) {
            alert("Email không đúng định dạng!");
            result = false;
        }
        else if (this.state.email.length <= 0) {
            alert("Vui lòng nhập email!");
            result = false;
        }
        else if (this.state.fullName.length <= 0) { 
            alert("Vui lòng nhập họ tên!");
            result = false;
        }
        else if (this.state.phone.length <= 0) { 
            alert("Vui lòng nhập số điện thoại!");
            result = false;
        }
        else if (this.state.phone.length > 11) { 
            alert("Số điện thoại không đúng dịnh dạng!");
            result = false;
        }
        return result;
    }

    linkToManageExamine = () => {
        if ( this.props.history )
        {
            this.props.history.push( `/system/examine` );
        }
    }

    handleDeleteUser = async () => {
        alert("Bạn có chắc rằng bạn không chấp nhận yêu cầu duyệt đăng ký tài khoàn này phải không?");
        this.linkToManageExamine();
        await deleteUser(this.props.match.params.id);
        toast.success("Bạn vừa hủy yêu cầu duyệt thành viên thành công!");

    }

    linkTouser = (link) => {
        if ( this.props.history )
        {
            this.props.history.push( `${link}` );
        }
    }

    render ()
    {
        let {openloading} = this.state;
        return (
            <>
                <title>
                    Duyệt yêu cầu đăng ký tài khoản
                </title>
                <div className=' manage'>
                    <div className='left'>
                        <div className='content'>
                            <li onClick={() => this.linkTouser("/system/manage-admin")}><span><i className='fas fa-user-tie'></i><FormattedMessage id="system.manage.manage-admin"></FormattedMessage></span></li>
                            <li ><span><i className='fas fa-user'></i><FormattedMessage id="system.manage.manage-user"></FormattedMessage></span>
                                <ul className='ul-link'>
                                    <li onClick={() => this.linkTouser("/system/manage-user")}><i className='fas fa-user'></i><span>Quản lý hội viên</span></li>
                                    <li onClick={() => this.linkTouser("/system/examine")}><i className='fas fa-check'></i><span>Duyệt hội viên</span></li>
                            </ul>
                            </li>
                        </div>
                    </div>
                    <div className='right'>
                    <div className='title'>Duyệt yêu cầu đăng ký tài khoản</div>

                    <div className='container form-add'>
                    <form>
                        <div className='form-group'>
                            <label><FormattedMessage id="key.email"></FormattedMessage>:</label>
                            <input type='text'
                                value={this.state.email}
                            onChange={(event) => this.handleOnchangeInput(event, "email")}
                            />
                        </div>

                        <div className='form-group'>
                            <label><FormattedMessage id="key.password"></FormattedMessage>:</label>
                            <input type='password'
                                value="hashcode"
                                disabled
                            onChange={(event) => this.handleOnchangeInput(event, "password")}
                            />
                        </div>

                        <div className='form-group-botom'>
                            <div className='left'>
                                <div className='form-group'>
                                    <label><FormattedMessage id="key.fullname"></FormattedMessage>:</label>
                                    <input type='text'
                                value={this.state.fullName}
                                        
                                        onChange={(event) => this.handleOnchangeInput(event, "fullName")}
                                    />
                                </div>
                                <div className='form-phone-position'>
                                    <div className='form-group'>
                                    <label><FormattedMessage id="key.phone"></FormattedMessage>:</label>
                                    <input type='text'
                                value={this.state.phone}
                                        
                            onChange={(event) => this.handleOnchangeInput(event, "phone")}
                                    
                                    />
                                </div>
                                    
                                </div>
                                    <div className='form-group'>
                                    <label><FormattedMessage id="key.desc"></FormattedMessage>:</label>
                            <textarea value={this.state.desc} onChange={(event) => this.handleOnchangeInput(event, "desc")}>
                                
                                    </textarea>
                                </div>
                                
                            </div>
                            <div className='right'>
                                <input type="file" className="form-control" id="reviewImg" hidden
                                                onChange={(event) => this.handleOnchangeImg(event)} />
                                <div className='reviewImage'
                                                style={{ backgroundImage: `url(${this.state.image})` }}
                                                ></div>
                            </div>
                        </div>

                        <div className='button-sumit'>
                            <div className='btn btn-primary btn-submit'
                             onClick={() => this.handleSave()} 
                            >
                                Chấp nhận
                            </div>
                            <div className='btn btn-danger mx-3'
                             onClick={() => this.handleDeleteUser()} 
                            >
                                Không duyệt
                            </div>
                            <div className='btn btn-secondary'
                             onClick={() => this.linkToManageExamine()} 
                            >
                                Hủy
                            </div>
                        </div>
                    </form>
                </div>

                {openloading === true && 
                <div className='loading'>
                    <div className="loading-spinner"></div>
                </div>}
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

export default withRouter(connect( mapStateToProps, mapDispatchToProps )( ExamineUser ));
