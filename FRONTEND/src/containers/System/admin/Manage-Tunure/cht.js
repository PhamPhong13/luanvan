import React, { Component } from 'react';
import { connect } from 'react-redux';
import "./Manage.scss";
import {getadmintunure} from "../../../../services/userService"
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
            fullName: "",
            email: "",
            phone: "",
            desc: "",
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
        console.log(this.props)
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

    handleEdit = () => {
        this.setState({
            openEdit: !this.state.openEdit
        })
    }
    

    render ()
    {
        let { admin, openEdit } = this.state;
        return (
            <>
                <div className='menber'>
                    {admin && isEmpty(admin) && 
                                <div className='btn-add'>
                                        <div className='btn btn-primary'
                                        onClick={() => this.openAdd()}
                                        >
                                            Thêm thành viên    
                                        </div>
                        </div>} 
                    
                    {admin && openEdit === false && !isEmpty(admin) && admin.map((item) => {
                        return (
                            <div className='position-content'>
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
                            <div className='label'>phone:</div><input type='text' value={ item.phone}/>
                            </div>

                        <div className='name label'>
                            <label>Thông tin:</label>
                            <textarea 
                            ref={this.textareaRef}                                    >
                            { item.desc}
                            </textarea>
                        </div>
                        <div className='btn-sumit'>
                            <div className='btn btn-warning btn-edit' onClick={() => this.handleEdit()}>Sửa</div>
                            <div className='btn btn-danger btn-delete' /* onClick={() => this.deleteUser(user.id)} */>Xóa</div>
                        </div>
                    </div>
                        )
                    })}

                    {openEdit === true && 
                     <div className='position-content'>
                                <div className='nameposition'>
                                    Chi hội trưởng
                                </div>
            
                                
                        <img src={logo} />
                        
                        <div className='name'>
                                    <div className='label'>Họ tên:</div><input type='text' />
                        </div>
                         <div className='name'>
                            <div className='label'>Email:</div><input type='text'/>
                            </div>

                         <div className='name'>
                            <div className='label'>phone:</div><input type='text'/>
                            </div>

                        <div className='name label'>
                            <label>Thông tin:</label>
                            <textarea 
                            ref={this.textareaRef}                                    >

                            </textarea>
                        </div>
                        <div className='btn-sumit'>
                            <div className='btn btn-warning btn-edit' >Lưu</div>
                            <div className='btn btn-danger btn-delete' onClick={() => this.handleEdit()}>Hủy</div>
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
