import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { createform, getformbyid, updateform } from "../../../../services/userService"
import QuestionForm from './QuestionForm';
class Form extends Component {
    constructor(props) {
        super(props);
        this.state = {
            textareaHeight: 'auto', // Chiều cao ban đầu của textarea
            nameForm: '',
            descForm: '',
            form: "",
            key: 'create',
            formId: ""
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
                textareaHeight: newHeight + 'px'
            })
        }
        else this.setState({
            form: [],
            key: 'create'
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

    handleOnblurName = async (event) => {
        if (this.state.key === 'create') {
            if (event.target.value.length > 0) {
                await this.handleCreateFormbyname();
            
                }
        }
        else {
            if (event.target.value.length > 0) {
                await this.handleUpdateFormbyname();
                }
        }
        
        
    }
    
    handleOnblurdesc = async (event) => {
        if (this.state.key === 'create') {
            if (event.target.value.length > 0) {
                await this.handleCreateFormbydesc();
                }
        }
        else {
            if (event.target.value.length > 0) {
                await this.handleUpdateFormbydesc();
                }
        }
        
    }
    
    handleUpdateFormbyname = async () => {
        let res = await updateform({
            id: this.state.form.id,
            name: this.state.nameForm,
        })
        if (res && res.errCode === 0) { 
            await this.getform();
        }
    }

    handleUpdateFormbydesc = async () => { 
        let res = await updateform({
            id: this.state.form.id,
            desc: this.state.descForm,
        })
        if (res && res.errCode === 0) { 
            await this.getform();
        }
    }

    handleCreateFormbyname = async () => { 
        let res = await createform({
            postId: this.state.postId,
            name: this.state.nameForm,
        })
        if (res && res.errCode === 0) { 
           await this.getform();
        }
    }

    handleCreateFormbydesc = async () => { 
        let res = await createform({
            postId: this.state.postId,
            desc: this.state.descForm,
        })
        if (res && res.errCode === 0) { 
           await this.getform();
        }
    }




    render() {
        const { textareaHeight, nameForm, descForm, form, formId } = this.state;
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
                                onBlur={(event) => this.handleOnblurName(event)}
                                onChange={(event) => this.handleTextareaChange(event, "nameForm")} 
                            ></textarea>
                        </div>
                        <div className='desc'>
                            <textarea 
                                style={{ height: textareaHeight }}
                                placeholder='Mô tả'

                                onBlur={(event) => this.handleOnblurdesc(event)}
                                onChange={(event) => this.handleTextareaChange(event, "descForm")} // Sự kiện onChange thay đổi
                                value={descForm}
                            >
                                
                            </textarea>
                        </div>
                    </div>

                    {formId && <QuestionForm formId={ formId} /> }
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
