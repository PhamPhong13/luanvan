import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { createform, getformbyid, updateform, deleteform } from "../../../../services/userService"
import QuestionForm from './QuestionForm';
class Form extends Component {
    constructor(props) {
        super(props);
        this.state = {
            textareaHeight: 'auto', // Chiều cao ban đầu của textarea
            nameForm: '',
            descForm: '',
            key: 'create',
            formId: "",
            openClose: false,

        };
    }

    async componentDidMount() {
        await this.getform();
    }

    getform = async () => {
        let res = await getformbyid(this.props.match.params.id)

        if (res && res.errCode === 0) {
            const textareaLineHeight = 28; // Độ cao của mỗi dòng trong textarea
            const textareaRows = res.data.desc.split('\n').length+2; // Số hàng trong textarea
            const newHeight = textareaRows * textareaLineHeight; // Chiều cao mới
            this.setState({
                form: res.data,
                formId: res.data.id,
                key: 'update',
                nameForm: res.data.name,
                descForm: res.data.desc,
                textareaHeight: newHeight + 'px',
                openClose: true,
            })
        }
        else this.setState({
            nameForm: '',
            descForm: '',
            key: 'create',
            formId: "",
            openClose: false
        })
    }




    // Hàm này được gọi mỗi khi nội dung trong textarea thay đổi
    handleTextareaChange = (event, id) => {
        let stateCopy = { ...this.state };
        stateCopy[ id ] = event.target.value;
        this.setState( {
            ...stateCopy
        })
        const textareaLineHeight = 28; // Độ cao của mỗi dòng trong textarea
        const textareaRows = event.target.value.split('\n').length+2; // Số hàng trong textarea
        const newHeight = textareaRows * textareaLineHeight; // Chiều cao mới

        // Đặt state mới cho textareaHeight để render lại component với chiều cao mới
        this.setState({ textareaHeight: newHeight + 'px' });
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
            if (this.state.nameForm.length > 0 && this.state.descForm.length > 0) {
                await this.handleCreateFormbydesc();
                }
        }
        else {
            if (this.state.nameForm.length > 0 && this.state.descForm.length > 0) {
                await this.handleUpdateFormbydesc();
                }
        }
        
    }

    handleUpdateFormbydesc = async () => { 
        let res = await updateform({
            id: this.state.form.id,
            name: this.state.nameForm,
            desc: this.state.descForm,
        })
        if (res && res.errCode === 0) { 
            await this.getform();
        }
    }


    handleCreateFormbydesc = async () => { 
        let res = await createform({
            postId: this.props.match.params.id,
            name: this.state.nameForm,
            desc: this.state.descForm,
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


    render() {
        const { textareaHeight, nameForm, descForm, formId } = this.state;
        console.log(formId)
        return (
            <>
                <title>Tạo Form</title>
                <div className='container formgoogle'>
                    <div className='title my-3'>Tạo biểu mẫu</div>
                    <div className='formgoogle-content-name'>
                        <div className='name desc'>
                            <textarea
                                placeholder='Tiêu đề'
                                value={nameForm}
                                onChange={(event) => this.handleTextareaChange(event, "nameForm")} 
                            ></textarea>
                        </div>
                        <div className='desc'>
                            <textarea 
                                style={{ height: textareaHeight }}
                                placeholder='Mô tả'

                                onBlur={() => this.handleOnblurdesc()}
                                onChange={(event) => this.handleTextareaChange(event, "descForm")} // Sự kiện onChange thay đổi
                                value={descForm}
                            >
                                
                            </textarea>
                        </div>
                    </div>

                    {formId && <QuestionForm formId={formId}
                        openClose={ this.state.openClose} />}

                    <div onClick={() => this.handleDeleteForm(formId)}>Xoa bieu mau</div>
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
