import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { createkeyform, getkeyform , updatekeyform} from "../../../../services/userService"
import { toast } from 'react-toastify';
import QuestionFormItem from './QuestionFormItem';

class QuestionForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            openkey: false,
            key: "",
            desc: "",
            listkey: [],
            formId: this.props.formId,
            idkeyform: "",
        };
    }

    async componentDidMount() {
        this.setState({
            formId: this.props.formId
        });
        await this.getkeyformservice(this.props.formId);
    }

    getkeyformservice = async (id) => {
        let res = await getkeyform(id);
        if (res && res.errCode === 0 && res.data.length > 0) { 
            this.setState({
                listkey: res.data
            })
        }
    }

    handleOpenkeyForm = () => {
        this.setState({
            openkey:!this.state.openkey,
        });
    }

    handleCreateKeyform = async (event) => {
        if (event.target.value.length > 0) {
            let res = await createkeyform({
                formId: this.props.formId,
                key: this.state.key,
                desc: this.state.desc
            });
            if (res && res.errCode === 0) {
                await this.getkeyformservice(this.props.formId);
                this.setState({
                    openkey: false,
                    key: "",
                    desc: "",
                });
            }
        }
    }
    
    handleOnchangeInput = async (event, id) => {
        let stateCopy = { ...this.state };
        stateCopy[id] = event.target.value;
        this.setState({
            ...stateCopy
        })
    }

    render() {
        let { openkey, listkey } = this.state;
        return (
            <> 
                <div className='mt-3'>Nội dung biểu mẫu</div>
                {listkey && listkey.map((item, index) => {
                    return (
                        <QuestionFormItem keyform={item}
                            getkeyformservice={this.getkeyformservice}
                            
                        />
                    )
                })}
                {openkey === true && 
                    <div className='formgoogle-content-item-add'>
                        <div className='item'>
                            <input
                                type='text'
                                placeholder='Câu hỏi'
                                onChange={(event) => this.handleOnchangeInput(event, "key")}
                            />
                        </div>
                        <div className='item'>
                            <input
                                type='text'
                                onChange={(event) => this.handleOnchangeInput(event, "desc")}
                                onBlur={(event) => this.handleCreateKeyform(event)}
                                placeholder='Gợi ý trả lời'
                                className='suggestion'
                            />
                        </div>
                    </div>
                }
                <div className='addform' title='Thêm câu hỏi' onClick={() => this.handleOpenkeyForm()}>+</div>
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
    return {};
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(QuestionForm));
