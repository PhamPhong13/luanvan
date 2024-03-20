import React, { Component } from 'react';
import { connect } from 'react-redux';
import "./Manage.scss";
import {getadmintunure, deleteAdmin, createAdmin, updateAdmin} from "../../../../services/userService"
import { CommonUtils } from '../../../../utils'; // vi or en
import { toast } from 'react-toastify';
import { withRouter } from 'react-router';
import logo from "../../../../assets/logo.png";
import { isEmpty } from 'lodash';
class cht extends Component
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
            openEdit: false
        }
    }

    

    async componentDidMount() {
        await this.getadmin();
        this.adjustTextareaHeight();
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
        let res = await getadmintunure(this.props.tunure, "P1");
        if (res && res.errCode === 0 && res.data.length > 0) {
            this.setState({
                admin: res.data
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

    handleopenEdit = () => {
        this.setState({
            openEdit: true,
            fullName: this.state.admin[0].fullName,
            email: this.state.admin[0].email,
            phone: this.state.admin[0].phone,
            desc: this.state.admin[0].desc,
            image: this.state.admin[0].image,
            id: this.state.admin[0].id
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
    
    handlesave = async (id) => {
        if (this.state.openAdd === true) {
            let res = await createAdmin({
                email: this.state.email,
                password: this.state.password,
                fullName: this.state.fullName,
                phone: this.state.phone,
                position: "P1",
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
                id: this.state.id
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

    render ()
    {
        let { admin, openEdit, image, fullName, phone, desc, email, openAdd , password, id} = this.state;
        return (
            <>
                <div className='menber'>
                    {admin && isEmpty(admin) && 
                    <div className='nameposition'>
                                    Chi hội trưởng
                                </div>
                    }
                    {admin && isEmpty(admin) && 
                                <>
                        <div className='nameposition'>
                                    Chi hội trưởng
                                </div>
                        <div className='btn-add'>
                                        <div className='btn btn-primary'
                                        onClick={() => this.openAdd()}
                                        >
                                            Thêm thành viên    
                                        </div>
                        </div>
                        </>} 
                    
                    {admin && openEdit === false && !isEmpty(admin) && admin.map((item) => {
                        return (
                            <div className='position-content screen'>
                                <div className='nameposition'>
                                    Chi hội trưởng
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

                        <div className='name label'>
                            <label>Thông tin:</label>
                            <textarea 
                            ref={this.textareaRef}                                    >
                            { item.desc}
                            </textarea>
                        </div>
                        <div className='btn-sumit'>
                            <div className='btn btn-warning btn-edit' onClick={() => this.handleopenEdit()}>Sửa</div>
                            <div className='btn btn-danger btn-delete' onClick={() => this.handledeleteAdmin(item.id)}>Xóa</div>
                        </div>
                    </div>
                        )
                    })}

                    {(openEdit === true || openAdd === true) && 
                     <div className='position-content '>
                                <div className='nameposition'>
                                    Chi hội trưởng
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

                        <div className='name label'>
                            <label>Thông tin:</label>
                            <textarea 
                                    ref={this.textareaRef}
                            onChange={(event) => this.handleOnchangeInput(event, 'desc')}    >
                                {desc}
                            </textarea>
                        </div>
                        <div className='btn-sumit'>
                            <div className='btn btn-warning btn-edit' onClick={() => this.handlesave(id)} >Lưu</div>
                            <div className='btn btn-danger btn-delete' onClick={() => this.handlecloseEdit()}>Hủy</div>
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

export default withRouter(connect( mapStateToProps, mapDispatchToProps )( cht ));
