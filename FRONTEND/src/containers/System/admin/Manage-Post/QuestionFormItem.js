import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { deletekeyform, updatekeyform} from "../../../../services/userService"
import { toast } from 'react-toastify';

class QuestionFormItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            key: "",
            desc: "",
            id: "",
            formId: ""
        };
    }

    async componentDidMount() {
        console.log(this.props)
        this.setState({
          key: this.props.keyform.key,
            desc: this.props.keyform.desc,
            id: this.props.keyform.id,
          formId: this.props.keyform.formId
        });
    }

   
    handleOnchangeInput = async (event, id) => {
        let stateCopy = { ...this.state };
        stateCopy[id] = event.target.value;
        this.setState({
            ...stateCopy
        })
        console.log(this.state)
    }

    handleDeleteKeyform = async (id) => { 
        await deletekeyform(id)
        await this.props.getkeyformservice(this.state.formId)
    }

    handleUpdateKeyform = async (id) => {
        await updatekeyform(id, this.state.key, this.state.desc)
        await this.props.getkeyformservice(this.state.formId)
    }

    


    

    render() {
        let { key, desc, id } = this.state;
        return (
            <> 
               <div className='formgoogle-content-item' >
                    <div className='left'>
                        <div className='item'>
                                <input
                                    type='text'
                                    placeholder='Câu hỏi'
                                    onChange={(event) => this.handleOnchangeInput(event, "key")}
                                    onBlur={() => this.handleUpdateKeyform(id)} 
                                    value={key}
                                />
                            </div>
                            <div className='item'>
                                <input
                                    type='text'
                                    onChange={(event) => this.handleOnchangeInput(event, "desc")}
                                    onBlur={() => this.handleUpdateKeyform(id)} 
                                    value={desc}
                                    placeholder='Gợi ý trả lời'
                                    className='suggestion'
                                />
                    </div>
                    </div>
                    <div className='closekeyform'
                    onClick={() => this.handleDeleteKeyform(id)}
                    ><span>x</span></div>
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
    return {};
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(QuestionFormItem));
