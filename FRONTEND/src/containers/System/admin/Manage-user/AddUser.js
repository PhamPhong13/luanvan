import React, { Component } from 'react';
import { connect } from 'react-redux';
import "./Manage.scss";
import { FormattedMessage } from 'react-intl';
import { createUser, getAllcode } from "../../../../services/userService"
import { CommonUtils } from '../../../../utils'; // vi or en
import Select from 'react-select';
import { toast } from 'react-toastify';
import { withRouter } from 'react-router';
class AddUser extends Component
{
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            fullName: "",
            phone: "",
            image: "",
            desc: ""
        }
    }

    

    async componentDidMount() {
        
    }

    async componentDidUpdate(prevProps) {
        
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
        if (this.checkstate() === true) {
            let res = await createUser({
                email: this.state.email,
                password: this.state.password,
                fullName: this.state.fullName,
                phone: this.state.phone,
                image: this.state.image,
                desc: this.state.desc,
                status: '1',

            })

            if (res && res.errCode === 0) {
                this.linkToManageAdmin();
                toast.success("Tạo nười dùng mới thành công!");
                
            }
            else toast.error("Tạo người dùng mới không thành công!");
        }
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
        else if (this.state.password.length <= 0) {
            alert("Vui lòng nhập password!");
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

    linkToManageAdmin = () => {
        if ( this.props.history )
        {
            this.props.history.push( `/system/manage-user` );
        }
    }

    render ()
    {
        return (
            <>
                <title>
                    <FormattedMessage id="system.manage.add-user"></FormattedMessage>
                </title>
                <div className='container manage'>

                    <div className='title'><FormattedMessage id="system.manage.add-user"></FormattedMessage></div>

                </div>

                <div className='container form-add'>
                    <form>
                        <div className='form-group'>
                            <label><FormattedMessage id="key.email"></FormattedMessage>:</label>
                            <input type='text'
                            onChange={(event) => this.handleOnchangeInput(event, "email")}
                            />
                        </div>

                        <div className='form-group'>
                            <label><FormattedMessage id="key.password"></FormattedMessage>:</label>
                            <input type='password'
                            onChange={(event) => this.handleOnchangeInput(event, "password")}
                            />
                        </div>

                        <div className='form-group-botom'>
                            <div className='left'>
                                <div className='form-group'>
                                    <label><FormattedMessage id="key.fullname"></FormattedMessage>:</label>
                                    <input type='text'
                                        onChange={(event) => this.handleOnchangeInput(event, "fullName")}
                                    />
                                </div>
                                <div className='form-group'>
                                    <label><FormattedMessage id="key.phone"></FormattedMessage>:</label>
                                    <input type='text'
                            onChange={(event) => this.handleOnchangeInput(event, "phone")}
                                    
                                    />
                                </div>
                                <div className='form-group'>
                                    <label><FormattedMessage id="key.desc"></FormattedMessage>:</label>
                                    <textarea onChange={(event) => this.handleOnchangeInput(event, "desc")}></textarea>
                                </div>
                            </div>
                            <div className='right'>
                                <input type="file" className="form-control" id="reviewImg" hidden
                                                onChange={(event) => this.handleOnchangeImg(event)} />
                                <label className='label_upload-img' htmlFor='reviewImg'>Tải ảnh <i className='fas fa-upload'></i></label>
                                <div className='reviewImage'
                                                style={{ backgroundImage: `url(${this.state.image})` }}
                                                ></div>
                            </div>
                        </div>

                        <div className='button-sumit'>
                            <div className='btn btn-primary btn-submit'
                            onClick={() => this.handleSave()}
                            >
                                <FormattedMessage id="key.add"></FormattedMessage></div>
                        </div>
                    </form>
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

export default withRouter(connect( mapStateToProps, mapDispatchToProps )( AddUser ));
