import React, { Component } from 'react';
import { connect } from 'react-redux';
import "./Manage.scss";
import { FormattedMessage } from 'react-intl';
import { getUserById, updateUser } from "../../../../services/userService"
import { CommonUtils } from '../../../../utils'; // vi or en
import Select from 'react-select';
import { toast } from 'react-toastify';
import { withRouter } from 'react-router';
class EditUser extends Component
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
            desc: res.data.desc
        });

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
            let res = await updateUser({
                email: this.state.email,
                fullName: this.state.fullName,
                phone: this.state.phone,
                image: this.state.image,
                desc: this.state.desc,
                id: this.props.match.params.id
            })

            if (res && res.errCode === 0) {
                this.linkToManageAdmin();
                toast.success("Sửa người dùng thành công!");
                
            }
            else toast.error("Sửa người dùng không thành công!");
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
                    <FormattedMessage id="system.manage.edit-user"></FormattedMessage>
                </title>
                <div className='container manage'>

                    <div className='title'><FormattedMessage id="system.manage.edit-user"></FormattedMessage></div>

                </div>

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
                                <div className='form-group'>
                                    <label><FormattedMessage id="key.position"></FormattedMessage>:</label>
                                    <Select
                                        value={ this.state.selectedPosition }
                                        onChange={ this.handleChangeSelect }
                                        options={ this.state.listPosition }
                                        placeholder={ <FormattedMessage id="key.position" /> }
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
                                <FormattedMessage id="key.change"></FormattedMessage></div>
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

export default withRouter(connect( mapStateToProps, mapDispatchToProps )( EditUser ));
