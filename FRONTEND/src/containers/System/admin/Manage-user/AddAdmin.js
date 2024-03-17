import React, { Component } from 'react';
import { connect } from 'react-redux';
import "./Manage.scss";
import { FormattedMessage } from 'react-intl';
import { createAdmin, getAllcode , getAllnhiemky} from "../../../../services/userService"
import { CommonUtils } from '../../../../utils'; // vi or en
import Select from 'react-select';
import { toast } from 'react-toastify';
import { withRouter } from 'react-router';
class AddAdmin extends Component
{
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            fullName: "",
            phone: "",
            position: "",
            image: "",
            desc: "",
            listPosition: [],
            selectedPosition: "",
            nhiemky: ""
        }
    }

    

    async componentDidMount() {
        await this.getnhiemky();
        await this.getAllPosition();

        
    }

    async componentDidUpdate(prevProps) {
        if (prevProps.language !== this.props.language) { 
            await this.getAllPosition();
        }
    }

    getnhiemky = async () => {
        let res = await getAllnhiemky();
        if (res && res.errCode === 0 && res.data.length > 0) {
            this.setState({
                nhiemky: res.data[res.data.length - 1].name
            })
        }
    }

    getAllPosition = async() => {
        let res = await getAllcode("POSITION");
        let result = [];
        if (res && res.data) {
            res.data.map((item, index) => {
                let object = {};
                object.label = this.props.language === "vi" ? item.valueVi : item.valueEn;
                object.value = item.keyMap;
                result.push(object);
            })
        }

        this.setState({
            listPosition: result
        })
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
    
    handleChangeSelect = (selected) => {
        this.setState({
            selectedPosition: selected,
            position: selected.value
        })
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
            let res = await createAdmin({
                email: this.state.email,
                password: this.state.password,
                fullName: this.state.fullName,
                phone: this.state.phone,
                position: this.state.position,
                image: this.state.image,
                desc: this.state.desc,
                tunure: this.state.nhiemky,
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
        else if (this.state.position === null) { 
            alert("Vui lòng chọn chức vụ!");
            result = false;
        }
        return result;
    }

    linkToManageAdmin = () => {
        if ( this.props.history )
        {
            this.props.history.push( `/system/manage-admin` );
        }
    }

    render ()
    {
        return (
            <>
                <title>
                    <FormattedMessage id="system.manage.add-admin"></FormattedMessage>
                </title>
                <div className='container manage'>

                    <div className='title'><FormattedMessage id="system.manage.add-admin"></FormattedMessage></div>

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
                                <div className='form-phone-position'>
                                    <div className='form-group'>
                                    <label><FormattedMessage id="key.phone"></FormattedMessage>:</label>
                                    <input type='text'
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
                            <textarea onChange={(event) => this.handleOnchangeInput(event, "desc")}>
                                
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

export default withRouter(connect( mapStateToProps, mapDispatchToProps )( AddAdmin ));
