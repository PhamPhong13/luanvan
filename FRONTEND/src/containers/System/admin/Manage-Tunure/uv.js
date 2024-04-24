import React, { Component } from 'react';
import { connect } from 'react-redux';
import "./Manage.scss";
import {getadmintunure, deleteAdmin, createAdmin, updateAdmin, updatePositionAdmin, getAllcode} from "../../../../services/userService"
import { CommonUtils } from '../../../../utils'; // vi or en
import { toast } from 'react-toastify';
import { withRouter } from 'react-router';
import logo from "../../../../assets/logo.png";
import { isEmpty } from 'lodash';
import Select from 'react-select';

class uv extends Component
{
    constructor(props) {
        super(props);
        this.textareaRef = React.createRef();
        this.state = {
            image: "",
            fullName: "",
            email: "",
            phone: "",
            desc: "",
            password: "",
            id: "",
            admin: [],
            openAdd: false, 
            openEdit: false,
            selectedPosition: "",
            listPosition:""
        }
    }

    

    async componentDidMount() {
        await this.getpossition();
        await this.getadmin();
        this.adjustTextareaHeight();
    }

    getpossition = async() =>  {
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
    adjustTextareaHeight() {
        const textarea = this.textareaRef.current;
        if (textarea) {
            textarea.style.height = 'auto'; // Đặt lại chiều cao thành 'auto' trước khi tính toán lại chiều cao thực tế
            textarea.style.height = `${textarea.scrollHeight + 10}px`; // Đặt chiều cao của textarea thành chiều cao thực tế của nội dung
        }
    }

    componentDidUpdate() {
        this.adjustTextareaHeight();
    }

    getadmin = async () => {
        let res = await getadmintunure(this.props.tunure, "P3");
        if (res && res.errCode === 0 && res.data.length > 0) {
            this.setState({
                admin: res.data
            })
            let select = this.state.listPosition.find( item =>
                {
                    return item && item.value === res.data[0].position
        })
        
        this.setState({
            selectedPosition: select
        })
        }
        else {
            this.setState({
                admin: []
            })
        }
    }

    openAdd = () => {
        this.setState({
            openAdd: true
        })
    }

    handleopenEdit = (item) => {
        this.setState({
            openEdit: true,
            fullName: item.fullName,
            email: item.email,
            phone: item.phone,
            desc: item.desc,
            image: item.image,
            id: item.id
        })
    }

    handlecloseEdit = () => {
        this.setState({
            openEdit: false,
            fullName: "",
            email: "",
            phone: "",
            desc: "",
            image: ""
        })
    }

    handledeleteAdmin = async (id) => {
        await deleteAdmin(id);
        await this.getadmin();
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
    
    handlesave = async () => {
        if (this.state.openAdd === true) {
            let res = await createAdmin({
                email: this.state.email,
                password: this.state.password,
                fullName: this.state.fullName,
                phone: this.state.phone,
                position: "P3",
                image: this.state.image,
                desc: this.state.desc,
                tunure: this.props.tunure
            })

            if (res && res.errCode === 0) {
                this.setState({
                    openAdd: false,
                    image: "",
                    fullName: "",
                    email: "",
                    phone: "",
                    desc: "",
                    password: "",
                })
                toast.success("Thêm thành viên thành công!");
                await this.getadmin();
            }
            else {
                this.setState({
                    openAdd: false,
                    image: "",
                    fullName: "",
                    email: "",
                    phone: "",
                    desc: "",
                    password: "",
                })
                toast.error("Thêm thành viên không thành công!");
                await this.getadmin();
            }
        }
        else {
            let res = await updateAdmin({
                email: this.state.email,
                fullName: this.state.fullName,
                phone: this.state.phone,
                image: this.state.image,
                desc: this.state.desc,
                id: this.state.id,
                position: this.state.position

            })
            if (res && res.errCode === 0) {
                this.setState({
                    openEdit: false,
                    image: "",
                    fullName: "",
                    email: "",
                    phone: "",
                    desc: "",
                    password: "",
                    position: ""
                })
                toast.success("Cập nhật thành viên thành công!");
                await this.getadmin();
            }
            else {
                this.setState({
                    openEdit: false,
                    image: "",
                    fullName: "",
                    email: "",
                    phone: "",
                    desc: "",
                    password: "",
                })
                toast.error("Cập nhật thành viên không thành công!");
                await this.getadmin();
            }
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

    handleresignAdmin = async (id) => {
        alert("Bạn có chắc rằng thành viên này đã từ nhiệm không!");
        let res = await updatePositionAdmin({
            id: id,
            position: "P7"
        });
        toast.success("Cập nhật nhiệm kỳ thành công!");
                        await this.getadmin();

    }

     handleChangeSelect = async(selected) => {
        this.setState({
            selectedPosition: selected,
            position: selected.value

        })
        await this.getadmin();

    }


    render ()
    {
        let { admin, openEdit, image, fullName, phone, desc, email, openAdd, password, id } = this.state;
        return (
            <>
                <div className='menber'>
                    
                    {admin && isEmpty(admin) && 
                    <div className='nameposition'>
                                    Ủy viên ban chấp hành
                                </div>
                    }
                    
                    {admin && openEdit === false && !isEmpty(admin) && admin.map((item) => {
                        return (
                            <div className='position-content screen'>
                                <div className='nameposition'>
                                    Ủy viên ban chấp hành
                                </div>
            
                                
                        <img src={item.image} />
                        
                        <div className='name'>
                                    <div className='label'>Họ tên:</div><input type='text' value={ item.fullName} />
                        </div>
                         <div className='name'>
                            <div className='label'>Email:</div><input type='text' value={ item.email}/>
                            </div>

                         <div className='name'>
                            <div className='label'>Phone:</div><input type='text' value={ item.phone}/>
                                </div>
                                
                                <div className='name'>
                                    <div className='label' style={{width: "13%", transform: "translateY(6px)"}}>Từ nhiệm:</div>
                                    <button className='btn btn-danger'
                                    
                                        onClick={() => this.handleresignAdmin(item.id)}>Có </button>
                            </div>

                        <div className='name label'>
                            <label>Thông tin:</label>
                            <textarea 
                            ref={this.textareaRef}                                    >
                            { item.desc}
                            </textarea>
                        </div>
                        <div className='btn-sumit'>
                            <div className='btn btn-warning btn-edit' onClick={() => this.handleopenEdit(item)}>Sửa</div>
                            <div className='btn btn-danger btn-delete' onClick={() => this.handledeleteAdmin(item.id)}>Xóa</div>
                                    </div>
                            </div>
                        )
                    })}
                        
                        

                    {(openEdit === true || openAdd === true) && 
                     <div className='position-content '>
                                <div className='nameposition'>
                                    Ủy viên 
                                </div>
            
                                
                            <img src={image} />
                            <label className='label_upload-img' htmlFor='reviewImg'>Tải ảnh <i className='fas fa-upload'></i></label>
                                <input hidden type='file' className='form-controll-file' id="reviewImg"
                                    onChange={(event) => this.handleOnchangeImg(event)}
                                />
                        
                        <div className='name'>
                                    <div className='label'>Họ tên:</div><input type='fullName'
                                    onChange={(event) => this.handleOnchangeInput(event, 'fullName')}
                                    value={fullName} />
                            </div>
                        
                            {openAdd === true && 
                        <div className='name'>
                                    <div className='label'>Mật khẩu:</div><input type='password'
                                    onChange={(event) => this.handleOnchangeInput(event, 'password')}
                                    value={password} />
                            </div>
                        }
                            
                         <div className='name'>
                            <div className='label'>Email:</div><input type='text'
                            onChange={(event) => this.handleOnchangeInput(event, 'email')}
                            value={email}/>
                            </div>

                         <div className='name'>
                            <div className='label'>Phone:</div><input type='text'
                            onChange={(event) => this.handleOnchangeInput(event, 'phone')}
                            value={phone}/>
                            </div>


                            <div className='name'>
                                <div className='label'>Chức vụ:</div>
                                <div style={{width: "425px", textAlign: "left"}}>
                                    <Select 
                                        value={ this.state.selectedPosition }
                                        onChange={ this.handleChangeSelect }
                                        options={ this.state.listPosition }
                                        placeholder="Chọn chức vụ"
                                    />
                                </div>
                            </div>

                        <div className='name label'>
                            <label>Thông tin:</label>
                            <textarea 
                                    ref={this.textareaRef}
                            onChange={(event) => this.handleOnchangeInput(event, 'desc')}    >
                                {desc}
                            </textarea>
                        </div>
                        <div className='btn-sumit'>
                            <div className='btn btn-warning btn-edit' onClick={() => this.handlesave()} >Lưu</div>
                            <div className='btn btn-danger btn-delete' onClick={() => this.handlecloseEdit()}>Hủy</div>
                        </div>
                    </div>
                    }

                    {
                        openAdd === false && <div className='btn-add'>
                                        <div className='btn btn-primary'
                                        onClick={() => this.openAdd()}
                                        >
                                            Thêm thành viên    
                                        </div>
                        </div>
                    }

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

export default withRouter(connect( mapStateToProps, mapDispatchToProps )( uv ));
