import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { createform, getformbyid, updateform, deleteform } from "../../../../services/userService"
import QuestionForm from './QuestionForm';
import DatePicker from '../../../../components/Input/DatePicker';
class Form extends Component {
    constructor(props) {
        super(props);
        this.textareaRef = React.createRef();
        this.state = {
            textareaHeight: 'auto', // Chiều cao ban đầu của textarea
            nameForm: '',
            descForm: '',
            key: 'create',
            formId: "",
            openClose: false,
            removeForm: false,
            currentDate: '',
            quantity: '0'

        };
    }

    async componentDidMount() {
        await this.getform();
        this.adjustTextareaHeight();
    }

    componentDidUpdate() {
        this.adjustTextareaHeight();
    }

    adjustTextareaHeight() {
        const textarea = this.textareaRef.current;
        if (textarea) {
            textarea.style.height = 'auto'; // Đặt lại chiều cao thành 'auto' trước khi tính toán lại chiều cao thực tế
            textarea.style.height = `${textarea.scrollHeight + 10}px`; // Đặt chiều cao của textarea thành chiều cao thực tế của nội dung
        }
    }

    getform = async () => {
        let res = await getformbyid(this.props.match.params.id)
        if (res && res.errCode === 0) {
            this.setState({
                form: res.data,
                formId: res.data.id,
                key: 'update',
                nameForm: res.data.name,
                descForm: res.data.desc,
                currentDate: res.data.date,
                quantity: res.data.quantity,
                openClose: true,
                removeForm: true
            })
        }
        else this.setState({
            nameForm: '',
            descForm: '',
            key: 'create',
            formId: "",
            openClose: false,
            removeForm: false
        })
    }




    // Hàm này được gọi mỗi khi nội dung trong textarea thay đổi
    handleTextareaChange = (event, id) => {
        let stateCopy = { ...this.state };
        stateCopy[ id ] = event.target.value;
        this.setState( {
            ...stateCopy
        })
    }

    handleOnchangeForm = async (event, id) => {
        let stateCopy = { ...this.state };
        stateCopy[ id ] = event.target.value;
        this.setState( {
            ...stateCopy
        })
    }

    
    handleOnblurdesc = async () => {
        if (this.state.key === 'create') {
            if (this.state.nameForm.length > 0 ) {
                await this.handleCreateFormbydesc();
                }
        }
        else await this.handleUpdateFormbydesc();
        
    }

    handleUpdateFormbydesc = async () => { 
        let res = await updateform({
            id: this.state.form.id,
            adminId: this.props.userInfo.id,
            name: this.state.nameForm,
            desc: this.state.descForm,
            date: this.state.currentDate,
            quantity: this.state.quantity,
        })
        if (res && res.errCode === 0) { 
            await this.getform();
        }
    }


    handleCreateFormbydesc = async () => { 
        let res = await createform({
            postId: this.props.match.params.id,
            adminId: this.props.userInfo.id,
            name: this.state.nameForm,
            desc: this.state.descForm,
            date: this.state.currentDate,
            quantity: this.state.quantity,
        })
        if (res && res.errCode === 0) { 
           await this.getform();
        }
    }


    handleDeleteForm = async (id) => {
        let res = await deleteform(id);
        if (res && res.errCode === 0) { 
            await this.getform();
        }
    }

    handleOnchangeDatePicker = ( date ) =>
    {
        this.setState( {
            currentDate: date[ 0 ],
        } )
    }


    render() {
        const { textareaHeight, nameForm, descForm, formId, removeForm, quantity } = this.state;
        return (
            <>
                <title>Tạo Form</title>
                <div className='container formgoogle'>
                    <div className='title my-3'>Biểu mẫu</div>
                    <div className='formgoogle-content-name'>
                        <div className='name desc'>
                            <textarea
                                placeholder='Tiêu đề'
                                value={nameForm}
                                ref={this.textareaRef}
x                                onChange={(event) => this.handleTextareaChange(event, "nameForm")} 
                                onBlur={() => this.handleOnblurdesc()}
                            ></textarea>
                        </div>
                        <div className='desc'>
                            <textarea 
                                ref={this.textareaRef}
                                placeholder='Mô tả'
                                onBlur={() => this.handleOnblurdesc()}
                                onChange={(event) => this.handleTextareaChange(event, "descForm")} // Sự kiện onChange thay đổi
                                value={descForm}
                            >
                                
                            </textarea>
                        </div>
                    </div>

                    <div className='date_quantity'>
                        <div className='date'>
                            <label>Ngày hết hạn </label>
                            <DatePicker className="form-control"
                                            onChange={ this.handleOnchangeDatePicker }
                                            value={this.state.currentDate}
                                            selected={ this.state.currentDate }
                                minDate={new Date(new Date().setDate(new Date().getDate() - 1))}
                                onBlur={() => this.handleOnblurdesc()}
                                        />
                        </div>
                        <div className='date'>
                            <label>Số lượng:  </label>
                            <input type='text'
                                onBlur={() => this.handleOnblurdesc()}
                                value={this.state.quantity}
                               onChange={(event) => this.handleTextareaChange(event, "quantity")}  />
                        </div>
                    </div>

                        {formId && <QuestionForm formId={formId}
                        openClose={this.state.openClose} />}
                    
                    {removeForm && 
                    <div className='removeform' title='Xóa biểu mẫu' onClick={() => this.handleDeleteForm(formId)}>
                        <i className='fas fa-trash'></i>
                    </div>}
                </div>
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        userInfo: state.user.userInfo,
    };
};

const mapDispatchToProps = dispatch => {
    return {

    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Form));
